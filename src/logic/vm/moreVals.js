// View model: account, human resources and stock.
// Builds the flat values object the screens render from. Runs with `this` bound to the OpsApp instance.

export function moreVals(rt, s) {
  const me = s.me, rm = this.rm, dl = this.dateLabel;
  const nm = (id) => this.emp(id).name;
  const ini = (id) => nm(id).split(' ').map(w => w[0]).slice(0, 2).join('');
  const light = { cardBg: '#ffffff', labelFg: '#6b7f71', noteFg: '#6b7f71' };
  const green = { cardBg: '#097c3e', labelFg: 'rgba(255,255,255,.66)', noteFg: 'rgba(255,255,255,.78)' };
  const chip = (on) => ({ bg: on ? '#097c3e' : '#ffffff', fg: on ? '#ffffff' : '#12241a' });
  const opt = (arr) => arr.map(x => ({ id: x }));
  const meU = s.users.find(u => u.id === me) || { mods: {} };
  const unread = s.notifications.filter(n => n.unread).length;
  const TYPES = ['Director', 'Full time', 'Part time', 'Contract', 'Fellowship', 'Volunteer'];
  const HS = ['Active', 'On leave', 'Resigned'];
  const hst = { 'Active': '#0a5c2f', 'On leave': '#8a5a00', 'Resigned': '#6b7f71' };
  const photoOf = (id) => s.photos[id] || '';
  const ph = (id) => ({ photo: photoOf(id), hasPhoto: !!photoOf(id), noPhoto: !photoOf(id) });
  const avc = (id) => this.isFounder(id) ? { avBg: '#097c3e', avFg: '#ffffff' } : { avBg: '#edf5e8', avFg: '#12241a' };
  const hrOf = (id) => s.hr[id] || {};

  // account
  const A = s.acct || { name: nm(me), email: meU.email || '', phone: hrOf(me).phone || '' };
  const setA = (p) => this.setState(st => ({ acct: Object.assign({}, st.acct || A, p) }));
  const pr = s.prefs[me] || {};
  const PREF = [['emailApprovals', true, 'Approval requests', 'Email me when a payment or claim needs my review'], ['emailClaims', true, 'Claim updates', 'Email me when my claim is approved, rejected or paid'], ['emailReports', false, 'High-severity reports', 'Email me when a high-severity report is filed'], ['digest', true, 'Monday summary', 'A weekly roundup of claims, reports and stock'], ['twoFactor', false, 'Two-step sign-in', 'Ask for a code when signing in on a new device']];
  const prefRows = PREF.map(([k, def, t, d]) => { const on = k in pr ? pr[k] : def; return { t, d, bg: on ? '#097c3e' : '#c9d6c6', knob: on ? '21px' : '3px', toggle: () => this.setState(st => ({ prefs: Object.assign({}, st.prefs, { [me]: Object.assign({}, st.prefs[me] || {}, { [k]: !on }) }) })) }; });

  // hr
  const q = (s.hrq || '').toLowerCase();
  const people = s.employees.filter(e => (s.hrType === 'All' || e.type === s.hrType) && (s.hrStatus === 'all' || (hrOf(e.id).status || 'Active') === s.hrStatus) && (!q || (e.name + ' ' + e.email + ' ' + (hrOf(e.id).position || '')).toLowerCase().indexOf(q) >= 0));
  const stOf = (id) => hrOf(id).status || 'Active';
  const card = (e) => Object.assign({ id: e.id, name: e.name, initials: ini(e.id), position: hrOf(e.id).position || e.type, unit: e.unit, type: e.type, email: e.email, status: stOf(e.id).toUpperCase(), statusFg: hst[stOf(e.id)], open: () => this.setState({ hrId: e.id }) }, avc(e.id), ph(e.id));
  const F = s.hrForm;
  const setF = (p) => this.setState(st => ({ hrForm: Object.assign({}, st.hrForm, p) }));
  const T = (label, key, type) => ({ label, value: F[key], type: type || 'text', isText: true, isSel: false, isArea: false, span: 'auto', options: [], set: (e) => setF({ [key]: e.target.value }) });
  const S = (label, key, arr) => ({ label, value: F[key], type: '', isText: false, isSel: true, isArea: false, span: 'auto', options: opt(arr), set: (e) => setF({ [key]: e.target.value }) });
  const AR = (label, key) => ({ label, value: F[key], type: '', isText: false, isSel: false, isArea: true, span: '1 / -1', options: [], set: (e) => setF({ [key]: e.target.value }) });
  const hrSections = F ? [
    { title: 'PROFILE', fields: [T('FULL NAME', 'name'), T('EMAIL', 'email', 'email'), T('PHONE', 'phone'), T('NRIC / PASSPORT NO.', 'nric')] },
    { title: 'EMPLOYMENT', fields: [S('EMPLOYMENT TYPE', 'type', TYPES), T('UNIT / DEPARTMENT', 'unit'), T('JOB TITLE', 'position'), T('DATE JOINED', 'joined', 'date'), S('STATUS', 'status', HS)] },
    { title: 'PAYROLL DETAILS', fields: [T('BANK', 'bank'), T('ACCOUNT NO.', 'acct'), T('EPF NO.', 'epf'), T('SOCSO NO.', 'socso'), T('INCOME TAX NO.', 'tax')] },
    { title: 'EMERGENCY CONTACT', fields: [T('NAME', 'ecName'), T('PHONE', 'ecPhone')] },
    { title: 'NOTES', fields: [AR('NOTES', 'notes')] }
  ] : [];
  const hrfv = F ? { photo: F.photo, hasPhoto: !!F.photo, noPhoto: !F.photo, initials: (F.name || '?').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase(), title: F.name || 'New staff member', sub: [F.position, F.type, F.unit].filter(Boolean).join(' · ') || 'Fill in the details', saveLabel: F.id ? 'SAVE CHANGES' : 'ADD TO DIRECTORY' } : {};
  const hd = s.employees.find(e => e.id === s.hrId);
  let hdet = { rows: [] };
  if (hd) {
    const h = hrOf(hd.id);
    hdet = Object.assign({ name: hd.name, initials: ini(hd.id), position: h.position || hd.type, unit: hd.unit, status: stOf(hd.id),
      setStatus: (e) => { const v = e.target.value; this.setState(st => ({ hr: Object.assign({}, st.hr, { [hd.id]: Object.assign({}, st.hr[hd.id] || {}, { status: v }) }) })); },
      rows: [{ k: 'EMAIL', v: hd.email }, { k: 'PHONE', v: h.phone || '—' }, { k: 'EMPLOYMENT', v: hd.type + ' · paid as ' + (this.TERMS[hd.type] || '').toLowerCase() }, { k: 'JOINED', v: h.joined ? dl(h.joined) : '—' }, { k: 'NRIC / PASSPORT', v: h.nric || '—' }, { k: 'BANK', v: h.bank ? h.bank + (h.acct ? ' · ' + h.acct : '') : '—' }, { k: 'EPF / SOCSO', v: (h.epf || '—') + ' / ' + (h.socso || '—') }, { k: 'TAX NO.', v: h.tax || '—' }, { k: 'EMERGENCY', v: h.ecName ? h.ecName + (h.ecPhone ? ' · ' + h.ecPhone : '') : '—' }, { k: 'NOTES', v: h.notes || '—' }],
      edit: () => this.setState({ hrForm: Object.assign(this.blankStaff(), { id: hd.id, name: hd.name, email: hd.email, type: hd.type, unit: hd.unit === '—' ? '' : hd.unit, photo: photoOf(hd.id) }, h), route: 'hr-form', hrId: null }),
      remove: () => {
        if (this.isFounder(hd.id) || s.requests.some(r => r.payeeId === hd.id)) { this.toastNow(hd.name + ' has payment records — set status to Resigned instead.'); return; }
        this.setState(st => ({ employees: st.employees.filter(e => e.id !== hd.id), hrId: null })); this.toastNow('Removed ' + hd.name + '.');
      } }, avc(hd.id), ph(hd.id));
  }

  // stock
  const SCATS = ['Feed', 'Plants', 'Packaging', 'Equipment & spares', 'Treatments', 'Other'];
  const stt = (i) => i.qty <= 0 ? { l: 'OUT', fg: '#b3261e', bg: '#fdeceb' } : (i.qty <= i.reorder ? { l: 'LOW', fg: '#8a5a00', bg: '#fdf3e0' } : { l: 'OK', fg: '#0a5c2f', bg: '#edf5e8' });
  const ivm = (i) => { const t = stt(i); return { name: i.name, sku: i.sku, cat: i.cat, loc: i.loc, qtyLabel: i.qty + ' ' + i.unit, reorderLabel: 'Reorder at ' + i.reorder, pct: Math.min(100, Math.round(i.qty / Math.max(1, i.reorder * 2) * 100)) + '%', costLabel: rm(i.cost), valueLabel: rm(i.qty * i.cost), statusLabel: t.l, statusFg: t.fg, statusBg: t.bg,
    edit: () => this.setState({ itemForm: Object.assign({}, i, { qty: String(i.qty), reorder: String(i.reorder), cost: String(i.cost) }) }),
    move: (e) => { e.stopPropagation(); this.mvNew(i.id); }, restock: () => this.mvNew(i.id) }; };
  const sqq = (s.sq || '').toLowerCase();
  const stItems = s.items.filter(i => (s.sCat === 'all' || i.cat === s.sCat) && (!s.sLow || i.qty <= i.reorder) && (!sqq || (i.name + ' ' + i.sku).toLowerCase().indexOf(sqq) >= 0));
  const value = s.items.reduce((t, i) => t + i.qty * i.cost, 0);
  const lowL = s.items.filter(i => i.qty <= i.reorder);
  const catV = SCATS.map(c => ({ label: c, raw: s.items.filter(i => i.cat === c).reduce((t, i) => t + i.qty * i.cost, 0) })).filter(x => x.raw > 0).sort((a, b) => b.raw - a.raw);
  const maxV = Math.max.apply(null, catV.map(x => x.raw).concat([1]));
  const KIND = { in: { l: 'STOCK IN', fg: '#0a5c2f', bg: '#edf5e8' }, out: { l: 'STOCK OUT', fg: '#b3261e', bg: '#fdeceb' }, adjust: { l: 'COUNT ADJUST', fg: '#8a5a00', bg: '#fdf3e0' } };
  const mvm = (m) => { const it = s.items.find(i => i.id === m.itemId) || { name: '(deleted item)', unit: '' }; const k = KIND[m.kind]; return { dateLabel: dl(m.date).slice(0, 6), name: it.name, kindLabel: k.l, kindFg: k.fg, qty: (m.delta > 0 ? '+' : '') + m.delta + ' ' + it.unit, after: m.after + ' ' + it.unit, by: nm(m.by), note: m.note }; };
  const mvList = s.moves.filter(m => s.mvKind === 'all' || m.kind === s.mvKind);
  const itf = s.itemForm || {};
  const setIt = (p) => this.setState(st => ({ itemForm: Object.assign({}, st.itemForm, p) }));
  const mvf0 = s.mvForm || {};
  const mvIt = s.items.find(i => i.id === mvf0.itemId);
  const setMv = (p) => this.setState(st => ({ mvForm: Object.assign({}, st.mvForm, p) }));
  const HINT = { in: 'Adds to what is on hand.', out: 'Removes from what is on hand.', adjust: 'Sets the on-hand quantity to what you counted.' };

  return {
    notifItem: { go: this.go('notify'), bg: rt === 'notify' ? 'rgba(255,255,255,.2)' : 'rgba(255,255,255,.08)', badge: unread ? String(unread) : '' },
    navHoverMode: !s.navLock && !s.isMobile, toggleLock: this.toggleLock, lockLabel: s.navLock ? 'Unlock menu (auto-hide)' : 'Lock menu open', lockIcon: s.navLock ? 'lock' : 'unlock',
    goAccount: this.go('account'), logout: this.logout,
    mePhoto: photoOf(me), meHasPhoto: !!photoOf(me), meNoPhoto: !photoOf(me), meInitials: ini(me), meRole: meU.role || '',
    isAccount: rt === 'account',
    acct: A, acSetName: (e) => setA({ name: e.target.value }), acSetEmail: (e) => setA({ email: e.target.value }), acSetPhone: (e) => setA({ phone: e.target.value }), acctSave: this.acctSave,
    acctPhoto: (e) => { const fs = e.target.files; this.avatarFrom(fs).then(u => { if (u) this.setState(st => ({ photos: Object.assign({}, st.photos, { [me]: u }) })); }); e.target.value = ''; },
    acctPhotoClear: () => this.setState(st => { const p = Object.assign({}, st.photos); delete p[me]; return { photos: p }; }),
    pw: s.pw, pwCur: (e) => this.setState(st => ({ pw: Object.assign({}, st.pw, { cur: e.target.value }) })), pwNext: (e) => this.setState(st => ({ pw: Object.assign({}, st.pw, { next: e.target.value }) })), pwConf: (e) => this.setState(st => ({ pw: Object.assign({}, st.pw, { conf: e.target.value }) })), pwSave: this.pwSave,
    prefRows, signOutOthers: this.signOutOthers,
    lockOn: () => this.setState({ navLock: true }), lockOff: () => this.setState({ navLock: false, navOpen: false }),
    lockOnBg: s.navLock ? '#097c3e' : '#f7faf4', lockOnFg: s.navLock ? '#ffffff' : '#12241a', lockOffBg: !s.navLock ? '#097c3e' : '#f7faf4', lockOffFg: !s.navLock ? '#ffffff' : '#12241a',
    accessChips: this.MODS.map(m => ({ label: m.label, bg: meU.mods[m.id] ? '#edf5e8' : '#f1f3f0', fg: meU.mods[m.id] ? '#0a5c2f' : '#9aa89e' })),

    isHrDir: rt === 'hr-dir', isHrForm: rt === 'hr-form' && !!F,
    hrStats: [
      Object.assign({ label: 'HEADCOUNT', value: String(s.employees.length), note: 'Everyone on file', color: '#ffffff' }, green),
      Object.assign({ label: 'ACTIVE', value: String(s.employees.filter(e => stOf(e.id) === 'Active').length), note: 'Currently working', color: '#097c3e' }, light),
      Object.assign({ label: 'ON LEAVE', value: String(s.employees.filter(e => stOf(e.id) === 'On leave').length), note: 'Away right now', color: '#8a5a00' }, light),
      Object.assign({ label: 'JOINED THIS YEAR', value: String(s.employees.filter(e => String(hrOf(e.id).joined || '').slice(0, 4) === this.TODAY.slice(0, 4)).length), note: 'Since 1 Jan ' + this.TODAY.slice(0, 4), color: '#12241a' }, light)
    ],
    hrq: s.hrq, hrType: s.hrType, hrStatus: s.hrStatus,
    setHrq: (e) => this.setState({ hrq: e.target.value }), setHrType: (e) => this.setState({ hrType: e.target.value }), setHrStatus: (e) => this.setState({ hrStatus: e.target.value }),
    hrTypeOpts: opt(['All'].concat(TYPES)), hrStatusOpts: [{ id: 'all', label: 'All statuses' }].concat(HS.map(x => ({ id: x, label: x }))), hrStatusPick: opt(HS),
    hrCards: people.map(card), hrEmpty: people.length === 0, hrNewH: this.hrNewH,
    hrSections, hrfv, hrCancel: () => this.setState({ hrForm: null, route: 'hr-dir' }), hrSave: this.hrSave,
    hrPhoto: (e) => { const fs = e.target.files; this.avatarFrom(fs).then(u => { if (u) setF({ photo: u }); }); e.target.value = ''; }, hrPhotoClear: () => setF({ photo: '' }),
    hasHr: !!hd, hdet, closeHr: () => this.setState({ hrId: null }),

    isStDash: rt === 'st-dash', isStItems: rt === 'st-items', isStMove: rt === 'st-move',
    goStMove: this.go('st-move'),
    stStats: [
      Object.assign({ label: 'ITEMS', value: String(s.items.length), note: 'Across ' + new Set(s.items.map(i => i.cat)).size + ' categories', color: '#12241a' }, light),
      Object.assign({ label: 'STOCK VALUE', value: rm(value).replace('RM ', 'RM'), note: 'On hand at unit cost', color: '#ffffff' }, green),
      Object.assign({ label: 'LOW OR OUT', value: String(lowL.length), note: lowL.length ? 'Needs restocking' : 'All healthy', color: lowL.length ? '#8a5a00' : '#097c3e' }, light),
      Object.assign({ label: 'MOVEMENTS', value: String(s.moves.length), note: 'Recorded in the log', color: '#12241a' }, light)
    ],
    stLow: lowL.map(ivm), stLowEmpty: lowL.length === 0,
    stCatBars: catV.map(c => ({ label: c.label, total: rm(c.raw), pct: Math.round(c.raw / maxV * 100) + '%' })),
    stRecent: s.moves.slice(0, 5).map(mvm),
    sq: s.sq, sCat: s.sCat, sLow: s.sLow,
    setSq: (e) => this.setState({ sq: e.target.value }), setSCat: (e) => this.setState({ sCat: e.target.value }), setSLow: (e) => this.setState({ sLow: e.target.checked }),
    stCatOpts: [{ id: 'all', label: 'All categories' }].concat(SCATS.map(c => ({ id: c, label: c }))),
    stItems: stItems.map(ivm), stItemsEmpty: stItems.length === 0, itemNew: this.itemNew,
    mvFilters: [['all', 'All'], ['in', 'Stock in'], ['out', 'Stock out'], ['adjust', 'Adjustments']].map(([k, label]) => Object.assign({ label, pick: () => this.setState({ mvKind: k }) }, chip(s.mvKind === k))),
    mvRows: mvList.map(mvm), mvEmpty: mvList.length === 0, mvNew: () => this.mvNew(),
    hasItemForm: !!s.itemForm, itf: Object.assign({ title: itf.id ? 'Edit item' : 'Add stock item', isNew: !itf.id, canDelete: !!itf.id }, itf),
    itSetName: (e) => setIt({ name: e.target.value }), itSetSku: (e) => setIt({ sku: e.target.value }), itSetCat: (e) => setIt({ cat: e.target.value }), itSetUnit: (e) => setIt({ unit: e.target.value }), itSetLoc: (e) => setIt({ loc: e.target.value }), itSetReorder: (e) => setIt({ reorder: e.target.value }), itSetCost: (e) => setIt({ cost: e.target.value }), itSetQty: (e) => setIt({ qty: e.target.value }),
    stCats: opt(SCATS), stUnits: opt(['kg', 'pcs', 'box', 'bag', 'litre', 'roll']),
    itemCancel: () => this.setState({ itemForm: null }), itemSave: this.itemSave, itemDelete: this.itemDelete,
    hasMv: !!s.mvForm, mvf: Object.assign({}, mvf0, { qtyLabel: mvf0.kind === 'adjust' ? 'COUNTED QUANTITY' : 'QUANTITY', hint: mvIt ? 'On hand now: ' + mvIt.qty + ' ' + mvIt.unit + '. ' + HINT[mvf0.kind] : '' }),
    mvItemOpts: s.items.map(i => ({ id: i.id, label: i.name + ' (' + i.qty + ' ' + i.unit + ')' })),
    mvKinds: [['in', 'Stock in'], ['out', 'Stock out'], ['adjust', 'Count adjust']].map(([k, label]) => Object.assign({ label, pick: () => setMv({ kind: k }) }, { bg: mvf0.kind === k ? '#097c3e' : '#ffffff', fg: mvf0.kind === k ? '#ffffff' : '#12241a' })),
    mvSetItem: (e) => setMv({ itemId: e.target.value }), mvSetQty: (e) => setMv({ qty: e.target.value }), mvSetDate: (e) => setMv({ date: e.target.value }), mvSetNote: (e) => setMv({ note: e.target.value }),
    mvCancel: () => this.setState({ mvForm: null }), mvSave: this.mvSave
  };
}
