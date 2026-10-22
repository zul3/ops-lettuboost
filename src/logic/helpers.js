// Pure helpers shared by the app logic and the seed data.

const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Local calendar date as YYYY-MM-DD.
export function todayIso() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

// "yymm" for document numbers, e.g. 2610.
export function yymm(iso) {
  const p = String(iso || todayIso()).split('-');
  return p[0].slice(2) + p[1];
}

// Timestamp in the style the design uses for audit trails, e.g. "05 Sep, 09:12".
export function stamp(d) {
  d = d || new Date();
  return String(d.getDate()).padStart(2, '0') + ' ' + MON[d.getMonth()] + ', ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}

export function uid(prefix) {
  const r = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID().replace(/-/g, '').slice(0, 10) : Math.random().toString(36).slice(2, 12);
  return (prefix || '') + r;
}

// Parent tasks take their progress and status from their subtasks.
export function rollup(ws) {
  const ps = new Set(ws.filter(w => w.parentId).map(w => w.parentId));
  return ws.map(w => {
    if (!ps.has(w.id)) return w;
    const subs = ws.filter(x => x.parentId === w.id);
    const prog = Math.round(subs.reduce((t, x) => t + x.progress, 0) / subs.length);
    const all = subs.every(x => x.status === 'done'), any = subs.some(x => x.status !== 'todo');
    const status = all ? 'done' : (any ? 'doing' : 'todo');
    if (w.progress === prog && w.status === status) return w;
    return Object.assign({}, w, { progress: prog, status });
  });
}
