// LettuBoost Ops console: app state, actions and data sync.
//
// The design's logic lives here almost unchanged. renderVals() (plus the view models in ./vm)
// turns state into one flat object `v` that the screens in src/screens render from.

import React from 'react';
import Shell from '../components/Shell.jsx';
import { CONSTANTS } from './constants.js';
import { renderVals, loginVals } from './vm/renderVals.js';
import { extraVals } from './vm/extraVals.js';
import { moreVals } from './vm/moreVals.js';
import { newVals } from './vm/newVals.js';
import { rollup, todayIso, yymm, stamp, uid } from './helpers.js';
import { supabase, isSupabase, setRemember } from '../lib/supabase.js';
import { Store, PERSISTED, applyRemote, uploadDataUrl } from '../lib/store.js';

const DEMO_USER = 'lb-demo-user';
const MOBILE_Q = '(max-width: 860px)';

export default class OpsApp extends React.Component {
  constructor(props) {
    super(props);
    const TODAY = todayIso();
    this.store = new Store({
      onRemote: (key, ch) => this.setState(st => ({ [key]: applyRemote(this.store, key, st[key], ch) })),
      onError: (msg) => this.toastNow(msg)
    });
    this.ready = false;
    this.state = Object.assign({
      splash: true,
      booting: true,
      loginEmail: '',
      loginPassword: '',
      loginError: '',
      loginInfo: '',
      loginMode: 'signin',
      loginBusy: false,
      rememberMe: true,
      recovery: false,
      isMobile: typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(MOBILE_Q).matches : false,
      navLock: true,
      prefs: {}, pw: { cur: '', next: '', conf: '' }, acct: null,
      photos: {}, hr: {}, hrq: '', hrType: 'All', hrStatus: 'all', hrId: null, hrForm: null,
      sq: '', sCat: 'all', sLow: false, itemForm: null, mvForm: null, mvKind: 'all',
      sf: null, docId: null, dFilter: 'all', dq: '', payF: { amount: '', method: 'Bank transfer', date: TODAY }, custNew: { name: '', contact: '', email: '', phone: '' },
      pf: null, poId: null, poFilter: 'all', supNew: { name: '', category: '', contact: '', email: '', phone: '', terms: 'Net 30' },
      gProj: 'all', gA: 'all', gS: 'all', zoom: 'week', gx: {}, taskForm: null, projForm: null, tkA: 'me', tkP: 'all', tkS: 'all', tkQ: '',
      drafts: {},
      toast: '',
      slipEmp: '',
      slipMonth: TODAY.slice(0, 7),
      hq: '', hMonth: 'all', hCat: 'all', hStatus: 'all',
      empType: 'All',
      notifyId: '',
      nt: { name: '', unit: '', rate: '' },
      nu: '', uomOpen: false, statOpen: false,
      ns: { name: '', side: 'employee', mode: 'pct', rate: '' },
      uq: '', nuser: { name: '', email: '', role: 'Staff' },
      cf: { title: '', purpose: '', paidBy: 'own', lines: [this.blankLine(TODAY)] },
      cFilter: 'all', cComment: '', lightbox: null,
      rf: { title: '', type: 'Daily ops', sev: 'Low', unit: 'Farm — Pond A', date: TODAY, body: '', images: [] },
      rq: '', rType: 'all', rStatus: 'all', rPeriod: '30',
      ex: { from: this.shiftDay(TODAY, -30), to: TODAY, type: 'all', status: 'all', sev: 'all', images: true, summary: true, format: 'html' },
      f: { payeeId: '', cat: 'mid', taskId: '', qty: 20, custom: '', cqty: 1, uomId: '', note: '' }
    }, this.loggedOutState(), this.emptyData());
  }

  // ---------- derived constants ----------

  get TODAY() { return todayIso(); }
  // Founders are the active users with the Founder role (Zul, PJ and Neil in the demo data).
  get FOUNDERS() { return (this.state.users || []).filter(u => u.role === 'Founder' && u.active !== false).map(u => u.id); }
  // The "AS" persona switcher in the header is a demo tool, so it is hidden once real sign-in is on.
  get personaSwitch() { return !isSupabase || import.meta.env.VITE_ENABLE_PERSONA_SWITCH === 'true'; }
  stamp() { return stamp(); }
  monthEnd(iso) { const p = iso.split('-'); return this.isoN(Date.UTC(+p[0], +p[1], 1) / 864e5 - 1); }
  nextSeq(list, prefix, width) {
    const mx = list.filter(x => String(x.id).indexOf(prefix) === 0).reduce((m, x) => Math.max(m, parseInt(String(x.id).slice(prefix.length), 10) || 0), 0);
    return prefix + String(mx + 1).padStart(width, '0');
  }

  loggedOutState() {
    return { authed: false, me: '', route: 'dashboard', openGroup: 'FINANCIAL', navOpen: false, detailId: null, claimId: null, repId: null, hrId: null, docId: null, poId: null, taskForm: null, projForm: null, sf: null, pf: null, loginPassword: '', toast: '', recovery: false };
  }
  emptyData() {
    const o = {};
    PERSISTED.forEach(k => { o[k] = ['hr', 'photos', 'prefs', 'zakatOn', 'catRates'].indexOf(k) >= 0 ? {} : []; });
    o.catRates = { low: 30, mid: 60, high: 80, vhigh: 100 };
    return o;
  }

  // Point form defaults at records that exist in the loaded data.
  afterLoad(d, meId) {
    const emps = d.employees || [], others = emps.filter(e => e.id !== meId);
    return {
      f: Object.assign({}, this.state.f, { payeeId: (others[0] || emps[0] || {}).id || '', taskId: ((d.tasks || [])[0] || {}).id || '', uomId: ((d.uoms || [])[0] || {}).id || '' }),
      slipEmp: (others.find(e => e.type !== 'Director') || emps[0] || {}).id || '',
      notifyId: ((d.notifications || [])[0] || {}).id || '',
      gProj: ((d.projects || [])[0] || {}).id || 'all'
    };
  }

  // ---------- lifecycle ----------

  componentDidMount() {
    if (import.meta.env.VITE_TEST_HOOKS) window.__ops = this;
    this._t = setTimeout(() => this.setState({ splash: false }), 2250);
    if (window.matchMedia) {
      this._mq = window.matchMedia(MOBILE_Q);
      this._mqh = (e) => this.setState({ isMobile: e.matches, navOpen: false });
      this._mq.addEventListener ? this._mq.addEventListener('change', this._mqh) : this._mq.addListener(this._mqh);
    }
    if (isSupabase) this.bootSupabase();
    else this.bootLocal();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.ready && PERSISTED.some(k => prevState[k] !== this.state[k])) this.store.schedule(this.state);
  }
  componentWillUnmount() {
    clearTimeout(this._t); clearTimeout(this._tt); clearTimeout(this._nt);
    if (this._mq) this._mq.removeEventListener ? this._mq.removeEventListener('change', this._mqh) : this._mq.removeListener(this._mqh);
    if (this._auth) this._auth.unsubscribe();
    this.store.flush();
    this.store.stop();
  }

  async bootLocal() {
    const data = await this.store.load();
    let who = null;
    try { who = localStorage.getItem(DEMO_USER); } catch (e) { who = null; }
    const u = who && data.users.find(x => x.id === who && x.active);
    this.setState(Object.assign({}, data, { booting: false }, u ? Object.assign({ authed: true, me: u.id, route: this.firstHome(u) }, this.afterLoad(data, u.id)) : {}), () => {
      this.ready = true;
      this.store.start(this.state);
    });
  }

  async bootSupabase() {
    const { data } = await supabase.auth.getSession();
    const sub = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') this.setState({ recovery: true, route: 'account' }, () => this.toastNow('Choose a new password under Security.'));
      if (event === 'SIGNED_IN' && session && !this.state.authed && !this._loading) this.openSession(session);
      if (event === 'SIGNED_OUT' && this.state.authed) { this.store.stop(); this.ready = false; this.setState(Object.assign(this.loggedOutState(), this.emptyData())); }
    });
    this._auth = sub.data.subscription;
    if (data.session) await this.openSession(data.session);
    this.setState({ booting: false });
  }

  // Load everything for a signed-in Supabase user and match them to a console account by email.
  async openSession(session) {
    if (this._loading) return;
    this._loading = true;
    try {
      const data = await this.store.load();
      const email = String(session.user.email || '').toLowerCase();
      const u = data.users.find(x => String(x.email).toLowerCase() === email);
      if (!u || !u.active) {
        await supabase.auth.signOut();
        this.setState({ loginBusy: false, loginError: u ? 'This account is deactivated. Contact a system admin.' : 'No console account uses ' + email + '. Ask a system admin to add you.' });
        return;
      }
      this.setState(Object.assign({}, data, { authed: true, loginBusy: false, loginError: '', loginInfo: '', loginPassword: '', me: u.id, route: this.state.recovery ? 'account' : this.firstHome(u) }, this.afterLoad(data, u.id)), () => {
        this.ready = true;
        this.store.start(this.state);
      });
    } catch (e) {
      this.setState({ loginBusy: false, loginError: 'Could not load the console data: ' + (e.message || e) });
    } finally {
      this._loading = false;
    }
  }

  // ---------- sign in ----------

  doLogin = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const { loginEmail, loginPassword, loginMode } = this.state;
    const email = String(loginEmail).trim().toLowerCase();
    if (!email || !loginPassword) { this.setState({ loginError: 'Enter your email and password to continue.' }); return; }
    if (!isSupabase) {
      const u = this.state.users.find(x => String(x.email).toLowerCase() === email);
      if (!u) { this.setState({ loginError: 'No console account uses that email. Try zul@lettuboost.com.' }); return; }
      if (!u.active) { this.setState({ loginError: 'This account is deactivated. Contact a system admin.' }); return; }
      try { if (this.state.rememberMe) localStorage.setItem(DEMO_USER, u.id); } catch (er) { /* ignore */ }
      this.setState(Object.assign({ authed: true, loginError: '', loginPassword: '', me: u.id, route: this.firstHome(u) }, this.afterLoad(this.state, u.id)));
      return;
    }
    setRemember(this.state.rememberMe);
    this.setState({ loginBusy: true, loginError: '', loginInfo: '' });
    if (loginMode === 'signup') {
      if (loginPassword.length < 8) { this.setState({ loginBusy: false, loginError: 'Use at least 8 characters for your password.' }); return; }
      const { data, error } = await supabase.auth.signUp({ email, password: loginPassword, options: { emailRedirectTo: window.location.origin } });
      if (error) {
        const notListed = /database error|not invited|not on the team/i.test(error.message);
        this.setState({ loginBusy: false, loginError: notListed ? 'That email is not on the team list yet. Ask a system admin to add you first.' : error.message });
        return;
      }
      if (data.session) { await this.openSession(data.session); return; }
      this.setState({ loginBusy: false, loginMode: 'signin', loginPassword: '', loginInfo: 'Check your inbox to confirm your email, then sign in.' });
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: loginPassword });
    if (error) { this.setState({ loginBusy: false, loginError: /invalid login/i.test(error.message) ? 'Wrong email or password. First time here? Create your password below.' : error.message }); return; }
    await this.openSession(data.session);
  };

  onForgot = async () => {
    if (!isSupabase) { this.toastNow('Password reset link sent to your inbox.'); return; }
    const email = String(this.state.loginEmail).trim();
    if (!email) { this.setState({ loginError: 'Type your email above, then tap Forgot password.' }); return; }
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin });
    if (error) { this.setState({ loginError: error.message }); return; }
    this.setState({ loginError: '', loginInfo: 'If that email has an account, a reset link is on its way.' });
  };

  toggleLoginMode = () => this.setState(st => ({ loginMode: st.loginMode === 'signin' ? 'signup' : 'signin', loginError: '', loginInfo: '' }));

  // ---------- design logic ----------

  modIcon(m) { return this.MOD_ICONS[m] || 'grid'; }
  pageIcon(k) { return this.PAGE_ICONS[k] || 'grid'; }

  rm = (n) => 'RM ' + Number(n || 0).toFixed(2);
  emp = (id) => this.state.employees.find(e => e.id === id) || (() => { const u = this.state.users.find(x => x.id === id); return u ? { name: u.name, type: u.role, unit: 'Console', email: u.email } : { name: '—', type: '—', unit: '—', email: '—' }; })();
  task = (id) => this.state.tasks.find(t => t.id === id) || null;
  first = (id) => this.emp(id).name.split(' ')[0];
  initials = (id) => this.emp(id).name.split(' ').map(w => w[0]).slice(0, 2).join('');
  isFounder = (id) => this.FOUNDERS.indexOf(id) >= 0;
  catLabel = (id) => (this.CATS.find(c => c.id === id) || { label: id }).label;
  dateLabel = (iso) => {
    const M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const p = String(iso).split('-');
    return p[2] + ' ' + M[Number(p[1]) - 1] + ' ' + p[0];
  };
  monthLabelOf = (key) => {
    const M = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const p = String(key).split('-');
    return M[Number(p[1]) - 1] + ' ' + p[0];
  };
  monthOf = (r) => String(r.date).slice(0, 7);

  calcStat(e, gross, zakatOn) {
    const out = { ded: [], er: [], totalDed: 0, erTotal: 0, net: gross };
    if (!(gross > 0)) return out;
    const rd = (x) => Math.round(x * 100) / 100;
    const rows = this.state.statutory.filter(i => i.on && i.types.indexOf(e.type) >= 0 && !(i.optional && !zakatOn));
    const amt = (i) => i.mode === 'fixed' ? Number(i.rate || 0) : (i.cap ? Math.min(gross, Number(i.cap)) : gross) * Number(i.rate || 0) / 100;
    const basis = (i) => i.mode === 'fixed' ? 'Fixed' : i.mode === 'pcb' ? 'Estimated MTD' : Number(i.rate) + '%' + (i.cap && gross > Number(i.cap) ? ' of ' + this.rm(i.cap) + ' ceiling' : '');
    const mk = (i) => ({ id: i.id, name: i.name, basis: basis(i), n: i.mode === 'pcb' ? 0 : rd(amt(i)), item: i });
    out.ded = rows.filter(i => i.side === 'employee').map(mk);
    out.er = rows.filter(i => i.side === 'employer').map(mk);
    const pcb = out.ded.find(x => x.item.mode === 'pcb');
    if (pcb) {
      const epf = out.ded.find(x => x.id === 'epf'), zk = out.ded.find(x => x.id === 'zakat');
      const c = Math.max(0, gross * 12 - Number(pcb.item.relief || 0) - Math.min(4000, epf ? epf.n * 12 : 0));
      const B = [[5000, 0], [20000, 1], [35000, 3], [50000, 6], [70000, 11], [100000, 19], [400000, 25], [600000, 26], [2000000, 28], [Infinity, 30]];
      let prev = 0, tax = 0;
      B.forEach(b => { if (c > prev) tax += (Math.min(c, b[0]) - prev) * b[1] / 100; prev = b[0]; });
      if (c <= 35000) tax = Math.max(0, tax - 400);
      tax = Math.max(0, tax - (zk ? zk.n * 12 : 0));
      pcb.n = rd(tax / 12);
    }
    out.totalDed = out.ded.reduce((t, x) => t + x.n, 0);
    out.erTotal = out.er.reduce((t, x) => t + x.n, 0);
    out.net = gross - out.totalDed;
    return out;
  }
  fReq(f) {
    const u = this.state.uoms.find(x => x.id === f.uomId);
    const rate = Number(f.custom || 0), q = Number(f.cqty || 0);
    return { cat: f.cat, taskId: f.taskId, qty: f.qty, amount: rate * q, cRate: rate, cQty: q, uom: u ? u.name : '' };
  }
  baseAmount(r) {
    if (r.cat === 'piece') {
      const t = this.task(r.taskId);
      return t ? t.rate * Number(r.qty || 0) : 0;
    }
    if (r.cat === 'custom') return Number(r.amount || 0);
    return Number(this.state.catRates[r.cat] || 0);
  }
  needed(r) { return this.isFounder(r.payeeId) ? this.FOUNDERS.filter(f => f !== r.payeeId) : []; }
  missing(r) { const k = (r.keys || []).map(x => x.by); return this.needed(r).filter(f => k.indexOf(f) < 0); }
  approved(r) { return this.isFounder(r.payeeId) ? this.missing(r).length === 0 : (r.keys || []).length > 0; }
  finalAmount(r) {
    if (!this.isFounder(r.payeeId)) return this.baseAmount(r);
    const k = r.keys || [];
    if (k.length === 0) return 0;
    return k.reduce((s, x) => s + Number(x.amount), 0) / k.length;
  }
  statusOf(r) {
    if (!this.approved(r)) return 'awaiting';
    return r.paid ? 'paid' : 'approved';
  }
  statusMeta(s) {
    if (s === 'awaiting') return { label: 'AWAITING KEYS', fg: '#8a5a00', bg: '#fdf3e0', onDark: '#ffffff' };
    if (s === 'paid') return { label: 'PAID', fg: '#12241a', bg: '#eef1ed', onDark: '#ffffff' };
    return { label: 'APPROVED', fg: '#0a5c2f', bg: '#edf5e8', onDark: '#ffffff' };
  }
  basisLine(r) {
    if (r.cat === 'piece') {
      const t = this.task(r.taskId);
      if (!t) return 'Piece rated';
      return 'Piece rated · ' + r.qty + ' × ' + t.name + ' @ ' + this.rm(t.rate) + ' ' + t.unit;
    }
    if (r.cat === 'custom') return r.uom ? 'Custom · ' + r.cQty + ' × ' + this.rm(r.cRate) + ' per ' + r.uom.toLowerCase() + ' · discussed internally' : 'Custom amount · discussed internally';
    return this.catLabel(r.cat) + ' band · ' + this.rm(this.state.catRates[r.cat]);
  }
  approverLine(r) {
    const k = r.keys || [];
    if (k.length === 0) return '—';
    return k.map(x => this.first(x.by)).join(' + ');
  }

  toastNow(msg) {
    clearTimeout(this._tt);
    this.setState({ toast: msg });
    this._tt = setTimeout(() => this.setState({ toast: '' }), 3600);
  }
  GROUP_OF = {
    dashboard: 'PAYMENTS', new: 'PAYMENTS', approvals: 'PAYMENTS', dual: 'PAYMENTS', history: 'PAYMENTS',
    employees: 'PEOPLE', payslips: 'PEOPLE',
    tasks: 'SETUP', notify: 'SETUP', settings: 'SETUP'
  };
  go = (route) => () => this.setState(st => ({ navOpen: st.isMobile ? false : st.navOpen, route, detailId: null, claimId: null, repId: null, poId: null, openGroup: this.groupOf(route) }));
  setF = (patch) => this.setState(s => ({ f: Object.assign({}, s.f, patch) }));

  addKey(id, amount) {
    const amt = Number(amount);
    if (!(amt > 0)) { this.toastNow('Enter an amount above zero before approving.'); return; }
    if (!this.isFounder(this.state.me)) { this.toastNow('Only founders can approve payments.'); return; }
    const me = this.state.me;
    this.setState(s => {
      const requests = s.requests.map(r => {
        if (r.id !== id) return r;
        if ((r.keys || []).some(k => k.by === me)) return r;
        return Object.assign({}, r, { keys: (r.keys || []).concat([{ by: me, amount: amt, at: this.stamp() }]) });
      });
      const r = requests.find(x => x.id === id);
      const notifications = s.notifications.slice();
      if (this.approved(r)) {
        notifications.unshift({
          id: 'n' + Date.now(), kind: 'approved', requestId: id,
          to: this.FOUNDERS.filter(f => f !== r.payeeId).map(f => this.emp(f).email),
          subject: 'Approved — ' + this.emp(r.payeeId).name + ', ' + this.rm(this.finalAmount(r)) + (this.isFounder(r.payeeId) ? ' (average of two keys)' : ''),
          time: this.stamp(), unread: true
        });
      } else {
        notifications.unshift({
          id: 'n' + Date.now(), kind: 'need_key', requestId: id,
          to: this.missing(r).map(f => this.emp(f).email),
          subject: 'Action needed — approve your amount for ' + this.emp(r.payeeId).name,
          time: this.stamp(), unread: true
        });
      }
      const drafts = Object.assign({}, s.drafts); delete drafts[id];
      return { requests, notifications, drafts };
    }, () => {
      const r = this.state.requests.find(x => x.id === id);
      this.toastNow(this.approved(r)
        ? 'Approved — final amount ' + this.rm(this.finalAmount(r)) + ' for ' + this.emp(r.payeeId).name + '. Everyone has been emailed.'
        : 'Your approval is recorded. ' + this.missing(r).map(f => this.first(f)).join(' and ') + ' has been emailed to approve.');
    });
  }

  submit = () => {
    const f = this.state.f;
    const fr = this.fReq(f);
    const amt = this.baseAmount(fr);
    if (!(amt > 0)) { this.toastNow('That request has no amount yet — pick a band, a task quantity, or type a custom figure.'); return; }
    if (!this.isFounder(this.state.me)) { this.toastNow('Only founders can approve payments.'); return; }
    if (f.payeeId === this.state.me) { this.toastNow('You cannot approve your own payment. Ask one of the other two founders to start it.'); return; }
    const me = this.state.me;
    const now = new Date();
    const id = 'PR-' + String(now.getFullYear()).slice(2) + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(100 + Math.floor(Math.random() * 899));
    const req = {
      id, payeeId: f.payeeId, cat: f.cat, amount: f.cat === 'custom' ? amt : 0,
      cRate: f.cat === 'custom' ? fr.cRate : undefined, cQty: f.cat === 'custom' ? fr.cQty : undefined, uom: f.cat === 'custom' ? fr.uom : undefined,
      taskId: f.taskId, qty: Number(f.qty || 0), note: f.note || 'No note given',
      date: this.TODAY, keys: [{ by: me, amount: amt, at: this.stamp() }], paid: false
    };
    const founderPayee = this.isFounder(f.payeeId);
    const miss = this.FOUNDERS.filter(x => x !== f.payeeId && x !== me);
    const notif = founderPayee
      ? { id: 'n' + Date.now(), kind: 'need_key', requestId: id, to: miss.map(x => this.emp(x).email), subject: 'Action needed — approve your amount for ' + this.emp(f.payeeId).name, time: this.stamp(), unread: true }
      : { id: 'n' + Date.now(), kind: 'approved', requestId: id, to: this.FOUNDERS.filter(x => x !== me).map(x => this.emp(x).email), subject: 'Approved — ' + this.emp(f.payeeId).name + ', ' + this.rm(amt) + ' keyed by ' + this.first(me), time: this.stamp(), unread: true };
    this.setState(s => ({
      requests: [req].concat(s.requests),
      notifications: [notif].concat(s.notifications),
      route: founderPayee ? 'dual' : 'approvals',
      f: Object.assign({}, s.f, { note: '', custom: '', cqty: 1 })
    }));
    this.toastNow(founderPayee
      ? 'Founder request opened. ' + miss.map(x => this.first(x)).join(' and ') + ' must approve — the average of the two becomes final.'
      : 'Approved on the spot — ' + this.rm(amt) + ' for ' + this.emp(f.payeeId).name + '. The other two founders were notified.');
  };

  vm(r) {
    const st = this.statusOf(r);
    const meta = this.statusMeta(st);
    const keys = r.keys || [];
    const miss = this.missing(r);
    const isF = this.isFounder(r.payeeId);
    const mine = isF && miss.indexOf(this.state.me) >= 0;
    const isPayeeViewing = r.payeeId === this.state.me;
    return {
      id: r.id, ref: r.id, payee: this.emp(r.payeeId).name, initials: this.initials(r.payeeId),
      typeLabel: this.emp(r.payeeId).type, dateLabel: this.dateLabel(r.date),
      catLine: this.basisLine(r), note: r.note,
      statusLabel: meta.label, statusFg: meta.fg, statusBg: meta.bg, statusOnDark: meta.onDark,
      amountLabel: st === 'awaiting' ? (isPayeeViewing || !keys.length ? '—' : this.rm(this.finalAmount(r)) + '*') : this.rm(this.finalAmount(r)),
      approverLine: this.approverLine(r),
      keyLine: isF
        ? (miss.length ? 'Waiting on ' + miss.map(f => this.first(f)).join(' and ') + ' · ' + keys.length + ' of ' + this.needed(r).length + ' approvals in' : 'Both approvals in — averaged and approved')
        : 'Single approval — approved on entry',
      avgLabel: miss.length === 0 ? this.rm(this.finalAmount(r)) : '—',
      open: () => this.setState({ detailId: r.id }),
      pay: () => this.setState(s => ({ requests: s.requests.map(x => x.id === r.id ? Object.assign({}, x, { paid: !x.paid }) : x) })),
      payLabel: r.paid ? 'PAID' : 'MARK PAID',
      payBg: r.paid ? '#12241a' : '#edf5e8',
      payFg: r.paid ? '#ffffff' : '#0a5c2f',
      ctaLabel: mine ? 'APPROVE YOUR AMOUNT' : 'VIEW DETAIL',
      ctaBg: mine ? '#80cc28' : '#ffffff',
      ctaFg: '#12241a',
      ledger: this.FOUNDERS.filter(f => f !== r.payeeId).map(f => {
        const k = keys.find(x => x.by === f);
        return { who: this.emp(f).name, amount: k ? 'Approved' : 'not approved', dot: k ? '#097c3e' : '#d7e0d6', fg: k ? '#0a5c2f' : '#6b7f71' };
      })
    };
  }
  daysAgo = (iso) => Math.round((new Date(this.TODAY) - new Date(iso)) / 864e5);
  shiftDay = (iso, n) => new Date(new Date(iso).getTime() + n * 864e5).toISOString().slice(0, 10);
  claimTotal = (c) => c.lines.reduce((t, l) => t + Number(l.amount || 0), 0);
  modOf(route) { if (route === 'none' || route === 'account' || route === 'notify') return ''; const r = String(route); if (r.indexOf('cl-') === 0) return 'claims'; if (r.indexOf('rp-') === 0) return 'reports'; if (r.indexOf('ad-') === 0) return 'admin'; if (r.indexOf('hr-') === 0) return 'hr'; if (r.indexOf('st-') === 0) return 'stock'; if (r.indexOf('sa-') === 0) return 'sales'; if (r.indexOf('pu-') === 0) return 'purchasing'; if (r.indexOf('tk-') === 0) return 'tasks'; if (r.indexOf('pp-') === 0) return 'plan'; return 'payments'; }
  hasMod(m) { const u = this.state.users.find(x => x.id === this.state.me); return !!(u && u.active && u.mods[m]); }
  groupOf(route) { return this.GRP[this.modOf(route)] || ''; }
  crumbOf(rt) { if (rt === 'account') return 'MY ACCOUNT'; if (rt === 'notify') return 'NOTIFICATIONS'; const m = this.modOf(rt); return m ? this.GRP[m] + ' / ' + (this.CRUMB[m] || m.toUpperCase()) : ''; }
  firstHome(u) { if (u.role === 'System admin' && u.mods.admin) return 'ad-users'; const f = this.MODS.find(m => u.mods[m.id]); return f ? f.home : 'none'; }
  blankLine() { this._ln = (this._ln || 0) + 1; return { id: 'l' + Date.now() + '-' + this._ln, date: this.TODAY, cat: 'Travel & transport', merchant: '', desc: '', amount: '', receipts: [] }; }
  ingest(files, folder) {
    return Promise.all(Array.from(files).map(f => new Promise(res => {
      const fr = new FileReader();
      fr.onload = () => {
        if (!/^image\//.test(f.type)) return res({ name: f.name, url: fr.result, isImg: false, cap: '' });
        const im = new Image();
        im.onload = () => { const k = Math.min(1, 1280 / Math.max(im.width, im.height)); const c = document.createElement('canvas'); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); res({ name: f.name, url: c.toDataURL('image/jpeg', 0.8), isImg: true, cap: '' }); };
        im.onerror = () => res({ name: f.name, url: fr.result, isImg: true, cap: '' });
        im.src = fr.result;
      };
      fr.readAsDataURL(f);
    }))).then(list => this.uploadAll(list, folder || 'uploads'));
  }
  // Moves picked files to Supabase Storage so rows only keep a link.
  uploadAll(list, folder) {
    if (!isSupabase || !list.length) return Promise.resolve(list);
    this.toastNow('Uploading ' + list.length + (list.length === 1 ? ' file…' : ' files…'));
    return Promise.all(list.map(x => uploadDataUrl(x.url, folder, x.name).then(url => Object.assign({}, x, { url }))))
      .then(out => { this.toastNow(out.length === 1 ? 'File attached.' : out.length + ' files attached.'); return out; })
      .catch(e => { this.toastNow('Upload failed: ' + (e.message || e)); return []; });
  }
  lineFlags(l) {
    const out = [], a = Number(l.amount || 0), d = this.daysAgo(l.date);
    if (!l.receipts.length) out.push({ block: true, t: 'Receipt missing' });
    if (!(a > 0)) out.push({ block: true, t: 'Amount needed' });
    if (!String(l.merchant).trim()) out.push({ block: true, t: 'Merchant needed' });
    if (d < 0) out.push({ block: true, t: 'Date is in the future' }); else if (d > 60) out.push({ t: 'Older than 60 days' });
    if (l.cat === 'Meals' && a > 60) out.push({ t: 'Above RM60 meal limit' });
    if (a > 500) out.push({ t: 'High value — extra scrutiny' });
    return out;
  }
  claimReview(id, ok) {
    const me = this.state.me, c = this.state.claims.find(x => x.id === id), note = (this.state.cComment || '').trim();
    if (!c || c.by === me || !this.isFounder(me)) { this.toastNow('You cannot review this claim.'); return; }
    if (!ok && !note) { this.toastNow('Add a reason so the claimant knows what to fix.'); return; }
    const nm = this.emp(me).name;
    this.setState(st => ({ claims: st.claims.map(x => x.id !== id ? x : Object.assign({}, x, { status: ok ? 'approved' : 'rejected', reviewer: me, comment: note, trail: x.trail.concat([{ t: (ok ? 'Approved by ' : 'Rejected by ') + nm, d: this.stamp(), dot: ok ? '#097c3e' : '#b3261e' }], note ? [{ t: '“' + note + '”', d: 'Reviewer note', dot: '#d7e0d6' }] : []) })), cComment: '', claimId: null }));
    this.toastNow(ok ? 'Claim approved. It is queued for payout.' : 'Claim rejected. ' + this.first(c.by) + ' can fix and resubmit.');
  }
  claimPay(id) {
    this.setState(st => ({ claims: st.claims.map(x => x.id !== id ? x : Object.assign({}, x, { status: 'paid', trail: x.trail.concat([{ t: 'Marked paid', d: this.stamp(), dot: '#80cc28' }]) })), claimId: null }));
    this.toastNow('Marked as paid.');
  }
  exportList() {
    const ex = this.state.ex;
    return this.state.reports.filter(r => r.date >= ex.from && r.date <= ex.to && (ex.type === 'all' || r.type === ex.type) && (ex.status === 'all' || r.status === ex.status) && (ex.sev === 'all' || r.sev === ex.sev)).sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : a.id < b.id ? -1 : 1);
  }
  docHtml(word, imgs) {
    const ex = this.state.ex, list = this.exportList();
    const esc = (t) => String(t == null ? '' : t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const photos = list.reduce((t, r) => t + r.images.filter(i => i.isImg).length, 0);
    const open = list.filter(r => r.status !== 'Resolved').length, high = list.filter(r => r.sev === 'High').length;
    const css = 'body{font-family:Arial,Helvetica,sans-serif;color:#12241a;font-size:11pt;line-height:1.5;max-width:780px;margin:24px auto;padding:0 16px}h1{font-size:24pt;margin:0 0 4pt;color:#097c3e}h2{font-size:11pt;letter-spacing:1px;color:#097c3e;border-bottom:2px solid #80cc28;padding-bottom:3pt;margin:20pt 0 8pt}h3{font-size:13pt;margin:0 0 3pt}.m{color:#6b7f71;font-size:9.5pt}.e{border:1px solid #d6e2d0;border-radius:8px;padding:10pt 12pt;margin:0 0 12pt;page-break-inside:avoid;break-inside:avoid}.i{display:inline-block;margin:0 8pt 8pt 0;vertical-align:top}.i span{display:block;font-size:8.5pt;color:#6b7f71}table{border-collapse:collapse;width:100%}td{padding:6pt 10pt;border:1px solid #d6e2d0;font-size:10pt}';
    let b = '<p class="m" style="margin:0;letter-spacing:2px">LETTUBOOST · OPS CONSOLE</p><h1>Field report</h1><p class="m">' + esc(this.dateLabel(ex.from)) + ' – ' + esc(this.dateLabel(ex.to)) + ' · generated ' + this.dateLabel(this.TODAY) + ' by ' + esc(this.emp(this.state.me).name) + '</p>';
    if (ex.summary) b += '<table><tr><td><b style="font-size:16pt">' + list.length + '</b><br>Reports</td><td><b style="font-size:16pt">' + photos + '</b><br>Photos</td><td><b style="font-size:16pt">' + high + '</b><br>High severity</td><td><b style="font-size:16pt">' + open + '</b><br>Not yet resolved</td></tr></table>';
    let day = '';
    list.forEach(r => {
      if (r.date !== day) { day = r.date; b += '<h2>' + esc(this.dateLabel(day).toUpperCase()) + '</h2>'; }
      b += '<div class="e"><h3>' + esc(r.title) + '</h3><p class="m" style="margin:0 0 6pt">' + esc(r.id) + ' · ' + esc(r.type) + ' · ' + esc(r.sev) + ' severity · ' + esc(r.status) + ' · ' + esc(this.emp(r.by).name) + ' · ' + esc(r.unit) + '</p><p style="margin:0 0 8pt">' + esc(r.body) + '</p>';
      if (ex.images) r.images.filter(i => i.isImg).forEach(im => {
        let src = im.url;
        if (word) { const n = 'img' + (imgs.length + 1) + '.jpg'; imgs.push({ n, data: im.url }); src = 'file:///C:/lettuboost/' + n; }
        b += '<div class="i"><img src="' + src + '" width="300" alt="' + esc(im.cap) + '"><span>' + esc(im.cap) + '</span></div>';
      });
      b += '</div>';
    });
    if (!list.length) b += '<p>No reports fall inside this timeline.</p>';
    return '<!DOCTYPE html><html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>LettuBoost field report</title><style>' + css + '</style></head><body>' + b + '</body></html>';
  }
  save(name, mime, text) {
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: mime })); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 600);
  }
  doExport = () => {
    const ex = this.state.ex, list = this.exportList();
    if (!list.length) { this.toastNow('No reports in that timeline — widen the dates or filters.'); return; }
    const base = 'LettuBoost-field-report-' + ex.from + '_to_' + ex.to;
    if (ex.format === 'pdf') { this.toastNow('In the print dialog, choose Save as PDF as the destination.'); setTimeout(() => window.print(), 350); return; }
    if (ex.format === 'html') { this.save(base + '.html', 'text/html', this.docHtml(false, [])); this.toastNow('HTML report downloaded with images embedded.'); return; }
    const imgs = [], html = this.docHtml(true, imgs);
    const wrap = (t) => t.replace(/.{76}/g, '$&\r\n');
    let out = 'MIME-Version: 1.0\r\nContent-Type: multipart/related; boundary="LBX"; type="text/html"\r\n\r\n--LBX\r\nContent-Type: text/html; charset="utf-8"\r\nContent-Transfer-Encoding: base64\r\nContent-Location: file:///C:/lettuboost/report.htm\r\n\r\n' + wrap(btoa(unescape(encodeURIComponent(html)))) + '\r\n';
    imgs.forEach(i => { out += '--LBX\r\nContent-Type: image/jpeg\r\nContent-Transfer-Encoding: base64\r\nContent-Location: file:///C:/lettuboost/' + i.n + '\r\n\r\n' + wrap(i.data.split(',')[1]) + '\r\n'; });
    out += '--LBX--';
    this.save(base + '.doc', 'application/msword', out);
    this.toastNow('Word report downloaded with images embedded.');
  };
  navEnter = () => { if (this.state.isMobile) return; clearTimeout(this._nt); if (!this.state.navOpen) this.setState({ navOpen: true }); };
  navLeave = () => { if (this.state.isMobile) return; clearTimeout(this._nt); this._nt = setTimeout(() => this.setState({ navOpen: false }), 180); };
  navToggle = () => this.setState(st => ({ navOpen: !st.navOpen }));
  setMe = (e) => {
    const id = e.target.value;
    this.setState(st => { const u = st.users.find(x => x.id === id), m = this.modOf(st.route); return { me: id, route: (m === '' || (u && u.mods[m])) ? st.route : this.firstHome(u), detailId: null, claimId: null, repId: null }; });
  };
  audited(t) { return { id: uid('a'), t, by: this.emp(this.state.me).name, d: this.stamp() }; }
  adminRole(id, role) {
    if (id === this.state.me && role !== 'System admin') { this.toastNow("You can't remove your own admin role."); this.forceUpdate(); return; }
    const u = this.state.users.find(x => x.id === id);
    this.setState(st => ({ users: st.users.map(x => x.id === id ? Object.assign({}, x, { role, mods: Object.assign({}, this.ROLE_MODS[role]) }) : x), audit: [this.audited('Set ' + u.name + ' role to ' + role)].concat(st.audit) }));
    this.toastNow(u.name + ' is now ' + role + '. Modules reset to that role.');
  }
  adminActive(id) {
    if (id === this.state.me) { this.toastNow("You can't deactivate your own account."); return; }
    const u = this.state.users.find(x => x.id === id);
    this.setState(st => ({ users: st.users.map(x => x.id === id ? Object.assign({}, x, { active: !x.active }) : x), audit: [this.audited((u.active ? 'Deactivated ' : 'Reactivated ') + u.name)].concat(st.audit) }));
    this.toastNow(u.name + (u.active ? ' deactivated.' : ' reactivated.'));
  }
  adminRemove(id) {
    if (id === this.state.me) { this.toastNow("You can't remove your own account."); return; }
    const u = this.state.users.find(x => x.id === id);
    this.setState(st => ({ users: st.users.filter(x => x.id !== id), audit: [this.audited('Removed ' + u.name)].concat(st.audit) }));
    this.toastNow('Removed ' + u.name + '.');
  }
  adminMod(id, m) {
    if (id === this.state.me && m === 'admin') { this.toastNow("You can't take away your own admin access."); return; }
    const u = this.state.users.find(x => x.id === id), mm = this.MODS.find(x => x.id === m);
    this.setState(st => ({ users: st.users.map(x => x.id === id ? Object.assign({}, x, { mods: Object.assign({}, x.mods, { [m]: !x.mods[m] }) }) : x), audit: [this.audited((u.mods[m] ? 'Removed ' : 'Granted ') + mm.label + ' access ' + (u.mods[m] ? 'from ' : 'to ') + u.name)].concat(st.audit) }));
  }
  addUser = () => {
    const n = this.state.nuser, em = n.email.trim().toLowerCase();
    if (!n.name.trim() || em.indexOf('@') < 1) { this.toastNow('Enter a name and a valid email.'); return; }
    if (this.state.users.some(u => u.email.toLowerCase() === em)) { this.toastNow('That email already has an account.'); return; }
    this.setState(st => ({ users: st.users.concat([{ id: (st.employees.find(e => String(e.email).toLowerCase() === em) || {}).id || uid('u'), name: n.name.trim(), email: em, role: n.role, active: true, mods: Object.assign({}, this.ROLE_MODS[n.role]) }]), nuser: { name: '', email: '', role: n.role }, audit: [this.audited('Created account for ' + n.name.trim() + ' (' + n.role + ')')].concat(st.audit) }));
    this.toastNow('Added ' + n.name.trim() + '. ' + (isSupabase ? 'They can create their password from the sign-in page. ' : '') + 'Fine-tune modules under Module access.');
  };
  cfSubmit = () => {
    const cf = this.state.cf, me = this.state.me;
    if (!cf.title.trim()) { this.toastNow('Give the claim a title.'); return; }
    const blk = [];
    cf.lines.forEach((l, i) => this.lineFlags(l).filter(f => f.block).forEach(f => blk.push('Item ' + (i + 1) + ': ' + f.t)));
    if (blk.length) { this.toastNow(blk[0] + (blk.length > 1 ? ' (+' + (blk.length - 1) + ' more)' : '')); return; }
    const c = { id: this.nextSeq(this.state.claims, 'CL-' + yymm(this.TODAY) + '-', 3), by: me, title: cf.title.trim(), purpose: cf.purpose, paidBy: cf.paidBy, submitted: this.TODAY, status: 'pending', reviewer: '', comment: '', lines: cf.lines.map(l => Object.assign({}, l)), trail: [{ t: 'Claim submitted', d: this.stamp(), dot: '#097c3e' }] };
    this.setState(st => ({ claims: [c].concat(st.claims), cf: { title: '', purpose: '', paidBy: 'own', lines: [this.blankLine()] }, route: 'cl-mine', cFilter: 'all' }));
    this.toastNow('Claim ' + c.id + ' submitted for ' + this.rm(this.claimTotal(c)) + '. A founder will review it.');
  };
  rfSubmit = () => {
    const rf = this.state.rf;
    if (!rf.title.trim() || !rf.body.trim()) { this.toastNow('A report needs a title and a description.'); return; }
    const r = { id: this.nextSeq(this.state.reports, 'RP-', 4), date: rf.date, by: this.state.me, title: rf.title.trim(), type: rf.type, sev: rf.sev, status: 'Open', unit: rf.unit, body: rf.body.trim(), images: rf.images.map(i => Object.assign({}, i)), log: [] };
    this.setState(st => ({ reports: [r].concat(st.reports), rf: Object.assign({}, st.rf, { title: '', body: '', images: [], sev: 'Low' }), route: 'rp-all' }));
    this.toastNow('Report ' + r.id + ' filed with ' + r.images.length + (r.images.length === 1 ? ' photo.' : ' photos.'));
  };

  avatarFrom(files) {
    const f = files && files[0]; if (!f) return Promise.resolve('');
    return new Promise(res => { const fr = new FileReader(); fr.onload = () => { const im = new Image(); im.onload = () => { const S = Math.min(im.width, im.height), c = document.createElement('canvas'); c.width = c.height = 360; c.getContext('2d').drawImage(im, (im.width - S) / 2, (im.height - S) / 2, S, S, 0, 0, 360, 360); res(c.toDataURL('image/jpeg', 0.85)); }; im.onerror = () => res(''); im.src = fr.result; }; fr.readAsDataURL(f); })
      .then(u => (u ? this.uploadAll([{ name: 'avatar.jpg', url: u }], 'avatars').then(l => (l[0] ? l[0].url : '')) : ''));
  }
  logout = async () => {
    this.ready = !isSupabase;
    if (isSupabase) { this.store.stop(); try { await supabase.auth.signOut(); } catch (e) { /* already signed out */ } }
    else { this.store.flush(); try { localStorage.removeItem(DEMO_USER); } catch (e) { /* ignore */ } }
    this.setState(Object.assign(this.loggedOutState(), isSupabase ? this.emptyData() : {}));
  };
  toggleLock = () => this.setState(st => ({ navLock: !st.navLock, navOpen: true }));
  blankStaff() { return { id: null, name: '', email: '', phone: '', nric: '', type: 'Full time', unit: '', position: '', joined: this.TODAY, status: 'Active', bank: '', acct: '', epf: '', socso: '', tax: '', ecName: '', ecPhone: '', notes: '', photo: '' }; }
  hrNewH = () => this.setState({ hrForm: this.blankStaff(), route: 'hr-form', hrId: null });
  hrSave = () => {
    const F = this.state.hrForm;
    if (!F.name.trim() || F.email.indexOf('@') < 1) { this.toastNow('Staff need a name and a valid email.'); return; }
    const id = F.id || (this.state.users.find(u => String(u.email).toLowerCase() === F.email.trim().toLowerCase()) || {}).id || uid('e');
    const e = { id, name: F.name.trim(), type: F.type, unit: F.unit || '—', email: F.email.trim().toLowerCase() };
    const h = { position: F.position, joined: F.joined, status: F.status, phone: F.phone, nric: F.nric, bank: F.bank, acct: F.acct, epf: F.epf, socso: F.socso, tax: F.tax, ecName: F.ecName, ecPhone: F.ecPhone, notes: F.notes };
    this.setState(st => ({ employees: F.id ? st.employees.map(x => x.id === id ? e : x) : st.employees.concat([e]), users: st.users.map(u => u.id === id ? Object.assign({}, u, { name: e.name, email: e.email }) : u), hr: Object.assign({}, st.hr, { [id]: h }), photos: F.photo ? Object.assign({}, st.photos, { [id]: F.photo }) : (() => { const p = Object.assign({}, st.photos); delete p[id]; return p; })(), hrForm: null, route: 'hr-dir' }));
    this.toastNow(F.id ? 'Saved ' + e.name + '.' : 'Added ' + e.name + ' to the directory. They are now available in Payments.');
  };
  itemNew = () => this.setState({ itemForm: { id: null, name: '', sku: '', cat: 'Feed', unit: 'kg', loc: '', reorder: '', cost: '', qty: '' } });
  itemSave = () => {
    const f = this.state.itemForm;
    if (!f.name.trim()) { this.toastNow('Give the item a name.'); return; }
    const it = { id: f.id || 'i' + Date.now(), name: f.name.trim(), sku: f.sku.trim() || 'NEW-' + String(this.state.items.length + 1).padStart(3, '0'), cat: f.cat, unit: f.unit, loc: f.loc || '—', reorder: Number(f.reorder || 0), cost: Number(f.cost || 0), qty: f.id ? Number(this.state.items.find(x => x.id === f.id).qty) : Number(f.qty || 0) };
    this.setState(st => ({ items: f.id ? st.items.map(x => x.id === it.id ? it : x) : st.items.concat([it]), moves: f.id || !it.qty ? st.moves : [{ id: 'm' + Date.now(), itemId: it.id, kind: 'in', delta: it.qty, after: it.qty, note: 'Opening balance', by: st.me, date: this.TODAY }].concat(st.moves), itemForm: null }));
    this.toastNow('Saved ' + it.name + '.');
  };
  itemDelete = () => { const f = this.state.itemForm; this.setState(st => ({ items: st.items.filter(x => x.id !== f.id), moves: st.moves.filter(m => m.itemId !== f.id), itemForm: null })); this.toastNow('Deleted ' + f.name + ' and its history.'); };
  mvNew = (itemId) => this.setState(st => ({ mvForm: { itemId: itemId || (st.items[0] || {}).id, kind: 'in', qty: '', note: '', date: this.TODAY } }));
  mvSave = () => {
    const f = this.state.mvForm, it = this.state.items.find(i => i.id === f.itemId), q = Number(f.qty);
    if (!it || f.qty === '' || !(f.kind === 'adjust' ? q >= 0 : q > 0)) { this.toastNow('Enter a quantity.'); return; }
    if (f.kind === 'out' && q > it.qty) { this.toastNow('Only ' + it.qty + ' ' + it.unit + ' on hand.'); return; }
    const r2 = (x) => Math.round(x * 100) / 100;
    const after = r2(f.kind === 'in' ? it.qty + q : (f.kind === 'out' ? it.qty - q : q));
    this.setState(st => ({ items: st.items.map(x => x.id === it.id ? Object.assign({}, x, { qty: after }) : x), moves: [{ id: 'm' + Date.now(), itemId: it.id, kind: f.kind, delta: r2(after - it.qty), after, note: f.note || '—', by: st.me, date: f.date }].concat(st.moves), mvForm: null }));
    this.toastNow(it.name + ' is now ' + after + ' ' + it.unit + '.');
  };
  acctSave = () => {
    const A = this.state.acct, me = this.state.me;
    if (!A) { this.toastNow('No changes to save.'); return; }
    if (!A.name.trim() || A.email.indexOf('@') < 1) { this.toastNow('Enter a name and a valid email.'); return; }
    if (isSupabase && A.email.trim().toLowerCase() !== String((this.state.users.find(u => u.id === me) || {}).email).toLowerCase()) { this.toastNow('Your sign-in email can only be changed by a system admin.'); return; }
    this.setState(st => ({ users: st.users.map(u => u.id === me ? Object.assign({}, u, { name: A.name.trim(), email: A.email.trim() }) : u), employees: st.employees.map(e => e.id === me ? Object.assign({}, e, { name: A.name.trim(), email: A.email.trim() }) : e), hr: st.hr[me] ? Object.assign({}, st.hr, { [me]: Object.assign({}, st.hr[me], { phone: A.phone }) }) : st.hr, acct: null }));
    this.toastNow('Profile saved.');
  };
  pwSave = async () => {
    const p = this.state.pw, recovery = this.state.recovery;
    if (!p.cur && !recovery) { this.toastNow('Enter your current password.'); return; }
    if (p.next.length < 8) { this.toastNow('New password needs at least 8 characters.'); return; }
    if (p.next !== p.conf) { this.toastNow("The new passwords don't match."); return; }
    if (isSupabase) {
      const email = (this.state.users.find(u => u.id === this.state.me) || {}).email;
      if (!recovery) {
        const chk = await supabase.auth.signInWithPassword({ email, password: p.cur });
        if (chk.error) { this.toastNow('Your current password is not right.'); return; }
      }
      const { error } = await supabase.auth.updateUser({ password: p.next });
      if (error) { this.toastNow('Could not update the password: ' + error.message); return; }
    }
    this.setState({ pw: { cur: '', next: '', conf: '' }, recovery: false });
    this.toastNow('Password updated.');
  };
  signOutOthers = async () => {
    if (isSupabase) { const { error } = await supabase.auth.signOut({ scope: 'others' }); if (error) { this.toastNow(error.message); return; } }
    this.toastNow('Signed out of all other devices.');
  };

  short = (iso) => this.dateLabel(iso).slice(0, 6);
  dayN = (iso) => { const p = String(iso).split('-'); return Date.UTC(+p[0], +p[1] - 1, +p[2]) / 864e5; };
  isoN = (n) => new Date(n * 864e5).toISOString().slice(0, 10);
  setWorks(fn) { this.setState(st => ({ works: rollup(fn(st.works)) })); }
  wStatus(id, status) {
    this.setWorks(ws => ws.map(w => { if (w.id !== id) return w; let p = w.progress; if (status === 'done') p = 100; else if (status === 'todo') p = 0; else if (p === 0 || p === 100) p = 25; return Object.assign({}, w, { status, progress: p }); }));
  }
  dTot(d) { const sub = d.lines.reduce((t, l) => t + Number(l.qty || 0) * Number(l.price || 0), 0); const tax = sub * Number(d.taxPct || 0) / 100; return { sub, tax, total: sub + tax }; }
  dPaid(d) { return (d.payments || []).reduce((t, p) => t + Number(p.amount), 0); }
  dStatus(d) {
    if (d.type === 'quote') return d.status;
    if (d.type === 'receipt') return 'issued';
    const bal = this.dTot(d).total - this.dPaid(d);
    if (bal <= 0.004) return 'paid';
    if (d.due < this.TODAY) return 'overdue';
    return this.dPaid(d) > 0 ? 'partial' : 'unpaid';
  }
  poTot(po) { return po.lines.reduce((t, l) => t + Number(l.qty || 0) * Number(l.cost || 0), 0); }
  nextDocId(type) {
    const pre = { quote: 'QT', invoice: 'INV', receipt: 'RC' }[type];
    return this.nextSeq(this.state.docs, pre + '-' + yymm(this.TODAY) + '-', 3);
  }
  dLine() { this._dl = (this._dl || 0) + 1; return { id: 'dl' + Date.now() + '-' + this._dl, desc: '', qty: '1', price: '' }; }
  blankDoc(type) { return { type, custId: (this.state.customers[0] || {}).id || '', date: this.TODAY, due: this.isoN(this.dayN(this.TODAY) + 14), method: 'Bank transfer', taxPct: '0', notes: '', lines: [this.dLine()] }; }
  sfNew = (type) => this.setState({ sf: this.blankDoc(type || 'invoice'), route: 'sa-new', docId: null, openGroup: 'FINANCIAL' });
  sfSave = () => {
    const f = this.state.sf;
    if (!f.custId) { this.toastNow('Pick a customer first.'); return; }
    if (f.lines.some(l => !String(l.desc).trim() || !(Number(l.qty) > 0) || l.price === '' || !(Number(l.price) >= 0))) { this.toastNow('Every line needs a description, quantity and price.'); return; }
    const id = this.nextDocId(f.type);
    const d = { id, type: f.type, custId: f.custId, date: f.date, due: f.type === 'receipt' ? '' : f.due, lines: f.lines.map(l => ({ id: l.id, desc: l.desc.trim(), qty: Number(l.qty), price: Number(l.price) })), taxPct: Number(f.taxPct || 0), notes: f.notes, status: f.type === 'quote' ? 'draft' : (f.type === 'invoice' ? 'unpaid' : 'issued'), from: '', payments: [], method: f.method };
    this.setState(st => ({ docs: [d].concat(st.docs), sf: null, docId: id, route: 'sa-view' }));
    this.toastNow(id + ' created for ' + this.rm(this.dTot(d).total) + '.');
  };
  docSet(id, patch) { this.setState(st => ({ docs: st.docs.map(d => d.id === id ? Object.assign({}, d, patch) : d) })); }
  docConvert(id) {
    const q = this.state.docs.find(d => d.id === id), nid = this.nextDocId('invoice');
    const inv = { id: nid, type: 'invoice', custId: q.custId, date: this.TODAY, due: this.isoN(this.dayN(this.TODAY) + 14), lines: q.lines.map(l => Object.assign({}, l)), taxPct: q.taxPct, notes: q.notes, status: 'unpaid', from: q.id, payments: [], method: 'Bank transfer' };
    this.setState(st => ({ docs: [inv].concat(st.docs.map(d => d.id === id ? Object.assign({}, d, { status: 'invoiced' }) : d)), docId: nid }));
    this.toastNow('Invoice ' + nid + ' created from ' + id + '.');
  }
  docPay(id) {
    const d = this.state.docs.find(x => x.id === id), pf = this.state.payF;
    const bal = this.dTot(d).total - this.dPaid(d);
    const amt = pf.amount === '' ? bal : Number(pf.amount);
    if (!(amt > 0)) { this.toastNow('Enter an amount above zero.'); return; }
    if (amt > bal + 0.004) { this.toastNow('That is more than the balance of ' + this.rm(bal) + '.'); return; }
    const rid = this.nextDocId('receipt'), a = Math.round(amt * 100) / 100;
    const rc = { id: rid, type: 'receipt', custId: d.custId, date: pf.date, due: '', lines: [{ id: 'r1', desc: 'Payment for ' + d.id, qty: 1, price: a }], taxPct: 0, notes: '', status: 'issued', from: d.id, payments: [], method: pf.method };
    this.setState(st => ({ docs: [rc].concat(st.docs.map(x => x.id === id ? Object.assign({}, x, { payments: x.payments.concat([{ id: 'p' + Date.now(), date: pf.date, amount: a, method: pf.method, receipt: rid }]) }) : x)), payF: Object.assign({}, st.payF, { amount: '' }) }));
    this.toastNow('Payment of ' + this.rm(a) + ' recorded. Receipt ' + rid + ' issued.');
  }
  docRemove(id) { this.setState(st => ({ docs: st.docs.filter(d => d.id !== id), docId: null, route: 'sa-docs' })); this.toastNow('Deleted ' + id + '.'); }
  custAdd = () => {
    const n = this.state.custNew;
    if (!n.name.trim()) { this.toastNow('Enter a customer name.'); return; }
    this.setState(st => ({ customers: st.customers.concat([{ id: 'c' + Date.now(), name: n.name.trim(), contact: n.contact, email: n.email, phone: n.phone }]), custNew: { name: '', contact: '', email: '', phone: '' } }));
    this.toastNow('Added ' + n.name.trim() + '.');
  };
  supAdd = () => {
    const n = this.state.supNew;
    if (!n.name.trim()) { this.toastNow('Enter a supplier name.'); return; }
    this.setState(st => ({ sups: st.sups.concat([{ id: 's' + Date.now(), name: n.name.trim(), category: n.category || 'General', contact: n.contact, email: n.email, phone: n.phone, terms: n.terms || 'Net 30' }]), supNew: { name: '', category: '', contact: '', email: '', phone: '', terms: 'Net 30' } }));
    this.toastNow('Added ' + n.name.trim() + '.');
  };
  pLine(itemId) { this._pl = (this._pl || 0) + 1; const it = itemId ? this.state.items.find(i => i.id === itemId) : null; return { id: 'pl' + Date.now() + '-' + this._pl, itemId: itemId || '', desc: it ? it.name : '', qty: it ? String(Math.max(1, it.reorder * 2 - it.qty)) : '1', cost: it ? String(it.cost) : '' }; }
  poNew = (itemId) => this.setState({ pf: { supId: (this.state.sups[0] || {}).id || '', date: this.TODAY, expected: this.isoN(this.dayN(this.TODAY) + 7), notes: '', lines: [this.pLine(itemId)] }, route: 'pu-new', poId: null, openGroup: 'OPERATIONS' });
  poSave(status) {
    const f = this.state.pf;
    if (!f.supId) { this.toastNow('Pick a supplier.'); return; }
    if (f.lines.some(l => !String(l.desc).trim() || !(Number(l.qty) > 0) || l.cost === '' || !(Number(l.cost) >= 0))) { this.toastNow('Every line needs a description, quantity and cost.'); return; }
    const mx = this.state.pos.reduce((m, p) => Math.max(m, parseInt(p.id.split('-')[1], 10) || 0), 1040);
    const po = { id: 'PO-' + (mx + 1), supId: f.supId, date: f.date, expected: f.expected, status, notes: f.notes, receivedOn: '', lines: f.lines.map(l => ({ id: l.id, itemId: l.itemId, desc: l.desc.trim(), qty: Number(l.qty), cost: Number(l.cost) })) };
    this.setState(st => ({ pos: [po].concat(st.pos), pf: null, route: 'pu-orders', poId: po.id }));
    this.toastNow(po.id + (status === 'ordered' ? ' placed with the supplier.' : ' saved as a draft.'));
  }
  poSet(id, patch, msg) { this.setState(st => ({ pos: st.pos.map(p => p.id === id ? Object.assign({}, p, patch) : p) })); if (msg) this.toastNow(msg); }
  poReceive(id) {
    const po = this.state.pos.find(x => x.id === id);
    if (!po || po.status !== 'ordered') return;
    const me = this.state.me, tracked = po.lines.filter(l => this.state.items.some(i => i.id === l.itemId)).length;
    this.setState(st => {
      const items = st.items.map(i => Object.assign({}, i)), mv = [];
      po.lines.forEach(l => { const it = items.find(i => i.id === l.itemId); if (it) { it.qty = Math.round((it.qty + Number(l.qty)) * 100) / 100; mv.push({ id: 'm' + Date.now() + '-' + mv.length, itemId: it.id, kind: 'in', delta: Number(l.qty), after: it.qty, note: po.id + ' received', by: me, date: this.TODAY }); } });
      return { items, moves: mv.reverse().concat(st.moves), pos: st.pos.map(x => x.id === id ? Object.assign({}, x, { status: 'received', receivedOn: this.TODAY }) : x) };
    });
    this.toastNow(po.id + ' received.' + (tracked ? ' ' + tracked + ' stock item' + (tracked === 1 ? '' : 's') + ' updated.' : ''));
  }
  openTask(id) { const w = this.state.works.find(x => x.id === id); if (w) this.setState({ taskForm: Object.assign({}, w, { progress: String(w.progress) }) }); }
  newTask(projId, parentId) {
    const me = this.state.me, e = this.state.employees;
    this.setState({ taskForm: { id: null, projId: projId || '', parentId: parentId || '', title: '', assignee: e.some(x => x.id === me) ? me : e[0].id, start: this.TODAY, end: this.isoN(this.dayN(this.TODAY) + 6), status: 'todo', progress: '0', priority: 'Medium', notes: '' } });
  }
  tfSave = () => {
    const f = this.state.taskForm;
    if (!f.title.trim()) { this.toastNow('Give the task a title.'); return; }
    if (!f.start || !f.end || f.end < f.start) { this.toastNow('End date must be on or after the start date.'); return; }
    const par = f.parentId ? this.state.works.find(x => x.id === f.parentId) : null;
    const projId = par ? par.projId : f.projId;
    const prog = f.status === 'done' ? 100 : (f.status === 'todo' ? 0 : Math.max(0, Math.min(100, Number(f.progress || 0))));
    const w = { id: f.id || 'w' + Date.now(), projId, parentId: f.parentId || '', title: f.title.trim(), assignee: f.assignee, start: f.start, end: f.end, status: f.status, progress: prog, priority: f.priority, notes: f.notes || '' };
    this.setWorks(ws => (f.id ? ws.map(x => x.id === w.id ? w : (x.parentId === w.id ? Object.assign({}, x, { projId }) : x)) : ws.concat([w])));
    this.setState({ taskForm: null });
    this.toastNow(f.id ? 'Task saved.' : 'Task added.' );
  };
  tfDelete = () => { const f = this.state.taskForm; this.setWorks(ws => ws.filter(x => x.id !== f.id && x.parentId !== f.id)); this.setState({ taskForm: null }); this.toastNow('Task deleted.'); };
  openProj(id) { const p = this.state.projects.find(x => x.id === id); if (p) this.setState({ projForm: Object.assign({}, p) }); }
  newProj = () => this.setState({ projForm: { id: null, name: '', desc: '', owner: this.state.employees[0].id, start: this.TODAY, end: this.isoN(this.dayN(this.TODAY) + 60), status: 'Planning', color: '#097c3e' } });
  pjSave = () => {
    const f = this.state.projForm;
    if (!f.name.trim()) { this.toastNow('Name the project.'); return; }
    if (!f.start || !f.end || f.end < f.start) { this.toastNow('End date must be on or after the start date.'); return; }
    const p = Object.assign({}, f, { id: f.id || 'p' + Date.now(), name: f.name.trim() });
    this.setState(st => ({ projects: f.id ? st.projects.map(x => x.id === p.id ? p : x) : st.projects.concat([p]), projForm: null, gProj: f.id ? st.gProj : p.id }));
    this.toastNow(f.id ? 'Project saved.' : 'Project created. Add its first task from the Gantt chart.');
  };
  pjDelete = () => {
    const f = this.state.projForm;
    if (this.state.works.some(w => w.projId === f.id)) { this.toastNow('Delete or move its tasks first.'); return; }
    this.setState(st => ({ projects: st.projects.filter(x => x.id !== f.id), projForm: null, gProj: st.gProj === f.id ? 'all' : st.gProj }));
    this.toastNow('Project deleted.');
  };
  render() {
    return <Shell v={this.state.authed ? this.renderVals() : this.loginVals()} />;
  }
}

Object.assign(OpsApp.prototype, CONSTANTS, { renderVals, loginVals, extraVals, moreVals, newVals });
