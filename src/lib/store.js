// Persistence for the ops console.
//
// The app keeps one in-memory state object (see OpsApp). Every persisted slice maps to a Supabase
// table shaped { id text, ord float, data jsonb }. After each state change the store diffs the
// slices against what it last saved and upserts / deletes only the rows that changed. Changes made
// by other people arrive through Supabase Realtime and are merged back into state.
//
// Without Supabase env vars the app runs in local demo mode and saves to localStorage.

import { supabase, isSupabase, UPLOAD_BUCKET } from './supabase.js';
import { hydrate, dehydrate } from '../logic/samples.js';
import { seedState, defaultConfig } from '../logic/seed.js';
import { uid, todayIso } from '../logic/helpers.js';
import { COLLECTIONS, MAPS, SETTINGS_TABLE, SETTINGS_KEYS, ALL_TABLES, PERSISTED } from './store.tables.js';

export { COLLECTIONS, MAPS, SETTINGS_TABLE, SETTINGS_KEYS, ALL_TABLES, PERSISTED };

const LOCAL_KEY = 'lettuboost-ops-demo-v1';
const TABLE_KEY = Object.assign({}, ...Object.entries(COLLECTIONS).map(([k, t]) => ({ [t]: k })), ...Object.entries(MAPS).map(([k, t]) => ({ [t]: k })));

// Rows of one slice, as [{ id, data }], in display order.
function rowsOf(key, s) {
  if (COLLECTIONS[key]) return (s[key] || []).map(item => ({ id: String(item.id), item }));
  if (MAPS[key]) return Object.keys(s[key] || {}).map(id => ({ id, item: s[key][id] }));
  return [{ id: key, item: s[key] }];
}
function tableOf(key) { return COLLECTIONS[key] || MAPS[key] || SETTINGS_TABLE; }

export class Store {
  constructor({ onRemote, onError, client } = {}) {
    this.db = client || supabase;
    this.mode = this.db ? 'supabase' : 'local';
    this.onRemote = onRemote || (() => {});
    this.onError = onError || (() => {});
    this.snap = {};        // key -> Map(id -> { ref, json, ord })
    this.active = false;
    this.timer = null;
    this.pending = null;
    this.busy = false;
    this.channel = null;
  }

  // ---------- loading ----------

  async load() {
    if (this.mode === 'local') return this.loadLocal();
    const out = {}, rowsByTable = {};
    await Promise.all(ALL_TABLES.map(async t => { rowsByTable[t] = await this.fetchAll(t); }));
    for (const key of Object.keys(COLLECTIONS)) out[key] = rowsByTable[COLLECTIONS[key]].map(r => hydrate(r.data));
    for (const key of Object.keys(MAPS)) { out[key] = {}; rowsByTable[MAPS[key]].forEach(r => { out[key][r.id] = hydrate(r.data); }); }
    const settings = {}; rowsByTable[SETTINGS_TABLE].forEach(r => { settings[r.id] = r.data; });
    SETTINGS_KEYS.forEach(k => { if (k in settings) out[k] = settings[k]; });
    // Snapshot what the database holds so the first diff only sends real changes.
    this.snap = {};
    for (const key of PERSISTED) {
      const m = new Map();
      const rows = COLLECTIONS[key] || MAPS[key] ? rowsByTable[tableOf(key)] : rowsByTable[SETTINGS_TABLE].filter(r => r.id === key);
      const live = rowsOf(key, out);
      const liveById = new Map(live.map(x => [x.id, x.item]));
      rows.forEach(r => m.set(String(r.id), { ref: liveById.get(String(r.id)), json: JSON.stringify(r.data), ord: Number(r.ord) || 0 }));
      this.snap[key] = m;
    }
    // Config the app cannot run without gets sensible defaults (saved on the first push).
    const def = defaultConfig();
    for (const k of Object.keys(def)) {
      const empty = out[k] == null || (Array.isArray(out[k]) && out[k].length === 0);
      if (empty) out[k] = def[k];
    }
    return out;
  }

  async fetchAll(table) {
    const page = 1000, rows = [];
    for (let from = 0; ; from += page) {
      const { data, error } = await this.db.from(table).select('id, ord, data').order('ord', { ascending: true }).order('id', { ascending: true }).range(from, from + page - 1);
      if (error) throw new Error(table + ': ' + error.message);
      rows.push(...data);
      if (data.length < page) break;
    }
    return rows;
  }

  loadLocal() {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(LOCAL_KEY) || 'null'); } catch (e) { saved = null; }
    const base = seedState(todayIso());
    if (!saved) return hydrate(base);
    const out = {};
    for (const k of PERSISTED) out[k] = k in saved ? saved[k] : base[k];
    return hydrate(out);
  }

  resetLocal() {
    try { localStorage.removeItem(LOCAL_KEY); } catch (e) { /* ignore */ }
  }

  // ---------- saving ----------

  start(state) {
    this.active = true;
    if (this.mode === 'local') return;
    this.subscribe();
    // Push anything that differs from the database right away (e.g. default config).
    this.schedule(state, 50);
  }

  stop() {
    this.active = false;
    clearTimeout(this.timer);
    if (this.channel) { this.db.removeChannel(this.channel); this.channel = null; }
    this.snap = {};
  }

  schedule(state, wait) {
    if (!this.active) return;
    this.pending = state;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.flush(), wait == null ? 350 : wait);
  }

  async flush() {
    const s = this.pending;
    if (!s || !this.active) return;
    if (this.mode === 'local') {
      const out = {};
      PERSISTED.forEach(k => { out[k] = dehydrate(s[k]); });
      try { localStorage.setItem(LOCAL_KEY, JSON.stringify(out)); }
      catch (e) { this.onError('Browser storage is full, so the last change was not saved locally.'); }
      return;
    }
    if (this.busy) { this.schedule(s); return; }
    this.busy = true;
    this.pending = null;
    try {
      const jobs = [];
      for (const key of PERSISTED) {
        const ch = this.diff(key, s);
        if (ch.upserts.length || ch.deletes.length) jobs.push(this.send(key, ch));
      }
      await Promise.all(jobs);
    } finally {
      this.busy = false;
    }
  }

  diff(key, s) {
    const snap = this.snap[key] || (this.snap[key] = new Map());
    const rows = rowsOf(key, s);
    const seen = new Set(), upserts = [], deletes = [];
    // Order: keep saved ords, slot new rows between their neighbours.
    const ords = rows.map(r => (snap.has(r.id) ? snap.get(r.id).ord : null));
    for (let i = 0; i < rows.length; i++) {
      if (ords[i] != null) continue;
      const prev = i > 0 ? ords[i - 1] : null;
      let next = null;
      for (let j = i + 1; j < rows.length; j++) if (ords[j] != null) { next = ords[j]; break; }
      ords[i] = prev != null && next != null ? (prev + next) / 2 : (next != null ? next - 1 : (prev != null ? prev + 1 : 0));
    }
    rows.forEach((r, i) => {
      seen.add(r.id);
      const cur = snap.get(r.id);
      if (cur && cur.ref === r.item) return;
      const data = dehydrate(r.item === undefined ? null : r.item);
      const json = JSON.stringify(data);
      if (cur && cur.json === json) { cur.ref = r.item; return; }
      upserts.push({ row: { id: r.id, ord: ords[i], data }, json, ref: r.item, prev: cur });
    });
    for (const id of snap.keys()) if (!seen.has(id)) deletes.push({ id, prev: snap.get(id) });
    // Optimistically record the new state; rolled back if the request fails.
    upserts.forEach(u => snap.set(u.row.id, { ref: u.ref, json: u.json, ord: u.row.ord }));
    deletes.forEach(d => snap.delete(d.id));
    return { upserts, deletes };
  }

  async send(key, ch) {
    const table = tableOf(key), snap = this.snap[key];
    try {
      if (ch.upserts.length) {
        const { error } = await this.db.from(table).upsert(ch.upserts.map(u => u.row), { onConflict: 'id' });
        if (error) throw error;
      }
      if (ch.deletes.length) {
        const { error } = await this.db.from(table).delete().in('id', ch.deletes.map(d => d.id));
        if (error) throw error;
      }
    } catch (e) {
      // Roll the snapshot back so the next change retries these rows.
      ch.upserts.forEach(u => { if (u.prev) snap.set(u.row.id, u.prev); else snap.delete(u.row.id); });
      ch.deletes.forEach(d => snap.set(d.id, d.prev));
      this.onError('Could not save ' + key + ': ' + (e.message || e));
    }
  }

  // ---------- realtime ----------

  subscribe() {
    if (this.channel) return;
    this.channel = this.db.channel('ops-sync')
      .on('postgres_changes', { event: '*', schema: 'public' }, (p) => this.onChange(p))
      .subscribe();
  }

  onChange(p) {
    const key = p.table === SETTINGS_TABLE ? (p.new && p.new.id) || (p.old && p.old.id) : TABLE_KEY[p.table];
    if (!key || !this.active) return;
    const snap = this.snap[key] || (this.snap[key] = new Map());
    if (p.eventType === 'DELETE') {
      const id = String(p.old && p.old.id);
      if (!snap.has(id)) return;
      snap.delete(id);
      this.onRemote(key, { type: 'delete', id });
      return;
    }
    const row = p.new, id = String(row.id), json = JSON.stringify(row.data), cur = snap.get(id);
    if (cur && cur.json === json) return;
    const item = hydrate(row.data), ord = Number(row.ord) || 0;
    snap.set(id, { ref: item, json, ord });
    this.onRemote(key, { type: 'upsert', id, item, ord });
  }

  // Where a remote row belongs in a collection, by saved order.
  indexFor(key, arr, ord) {
    const snap = this.snap[key];
    for (let i = 0; i < arr.length; i++) {
      const o = snap && snap.get(String(arr[i].id));
      if (o && o.ord > ord) return i;
    }
    return arr.length;
  }
}

// Apply a remote change to one state slice and return the new slice.
export function applyRemote(store, key, cur, ch) {
  if (COLLECTIONS[key]) {
    const arr = (cur || []).filter(x => String(x.id) !== ch.id);
    if (ch.type === 'delete') return arr;
    const at = (cur || []).findIndex(x => String(x.id) === ch.id);
    if (at >= 0) { const copy = (cur || []).slice(); copy[at] = ch.item; return copy; }
    arr.splice(store.indexFor(key, arr, ch.ord), 0, ch.item);
    return arr;
  }
  if (MAPS[key]) {
    const o = Object.assign({}, cur);
    if (ch.type === 'delete') delete o[ch.id]; else o[ch.id] = ch.item;
    return o;
  }
  return ch.type === 'delete' ? cur : ch.item;
}

// ---------- file uploads ----------

function dataUrlToBlob(url) {
  const [head, b64] = url.split(',');
  const mime = (/data:([^;]+)/.exec(head) || [])[1] || 'application/octet-stream';
  const bin = atob(b64), arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

// Uploads a data URL to Supabase Storage and returns its public URL.
// In local demo mode the data URL itself is returned.
export async function uploadDataUrl(dataUrl, folder, name) {
  if (!isSupabase || !dataUrl || dataUrl.indexOf('data:') !== 0) return dataUrl;
  const blob = dataUrlToBlob(dataUrl);
  const ext = (/\.([a-z0-9]+)$/i.exec(name || '') || [])[1] || (blob.type.split('/')[1] || 'bin').replace('jpeg', 'jpg');
  const path = folder + '/' + new Date().toISOString().slice(0, 7) + '/' + uid() + '.' + ext.toLowerCase();
  const { error } = await supabase.storage.from(UPLOAD_BUCKET).upload(path, blob, { contentType: blob.type, upsert: false });
  if (error) throw error;
  return supabase.storage.from(UPLOAD_BUCKET).getPublicUrl(path).data.publicUrl;
}
