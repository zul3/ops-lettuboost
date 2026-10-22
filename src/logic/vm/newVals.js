// View model: sales, purchasing, tasks and project plan.
// Builds the flat values object the screens render from. Runs with `this` bound to the OpsApp instance.

export function newVals(rt, s) {
  const me = s.me, rm = this.rm, dl = this.dateLabel, TODAY = this.TODAY, sh = this.short, D = this.dayN;
  const nm = (id) => this.emp(id).name;
  const ini = (id) => nm(id).split(' ').map(w => w[0]).slice(0, 2).join('');
  const light = { cardBg: '#ffffff', labelFg: '#6b7f71', noteFg: '#6b7f71' };
  const green = { cardBg: '#097c3e', labelFg: 'rgba(255,255,255,.66)', noteFg: 'rgba(255,255,255,.78)' };
  const chip = (on) => ({ bg: on ? '#097c3e' : '#ffffff', fg: on ? '#ffffff' : '#12241a' });
  const opts = (arr) => arr.map(x => ({ id: x, label: x }));
  const lc = (v) => String(v || '').toLowerCase();
  const sorted = (a) => a.slice().sort((x, y) => x.date < y.date ? 1 : (x.date > y.date ? -1 : (x.id < y.id ? 1 : -1)));
  const empOpts = s.employees.map(e => ({ id: e.id, label: e.name }));
  const METHODS = opts(['Bank transfer', 'Online banking', 'Cash', 'Cheque', 'Card']);

  // ---- sales ----
  const cust = (id) => s.customers.find(c => c.id === id) || { name: '(deleted customer)', contact: '', email: '', phone: '' };
  const DST = { draft: { l: 'DRAFT', fg: '#6b7f71', bg: '#eef1ed' }, sent: { l: 'SENT', fg: '#12241a', bg: '#e4ebdf' }, accepted: { l: 'ACCEPTED', fg: '#0a5c2f', bg: '#edf5e8' }, declined: { l: 'DECLINED', fg: '#b3261e', bg: '#fdeceb' }, invoiced: { l: 'INVOICED', fg: '#0a5c2f', bg: '#edf5e8' }, unpaid: { l: 'UNPAID', fg: '#8a5a00', bg: '#fdf3e0' }, partial: { l: 'PART PAID', fg: '#8a5a00', bg: '#fdf3e0' }, overdue: { l: 'OVERDUE', fg: '#b3261e', bg: '#fdeceb' }, paid: { l: 'PAID', fg: '#0a5c2f', bg: '#edf5e8' }, issued: { l: 'ISSUED', fg: '#0a5c2f', bg: '#edf5e8' } };
  const TL = { quote: 'Quotation', invoice: 'Invoice', receipt: 'Receipt' }, TI = { quote: 'file', invoice: 'receipt', receipt: 'check' };
  const dvm = (d) => {
    const t = this.dTot(d), m = DST[this.dStatus(d)], bal = d.type === 'invoice' ? t.total - this.dPaid(d) : 0;
    return { id: d.id, icon: TI[d.type], typeLabel: TL[d.type], cust: cust(d.custId).name, sub: d.lines.length + (d.lines.length === 1 ? ' line' : ' lines') + (d.from ? ' \u00b7 from ' + d.from : ''), dateLabel: dl(d.date), dueLabel: d.type === 'invoice' ? 'Due ' + sh(d.due) : (d.type === 'quote' && d.due ? 'Valid to ' + sh(d.due) : ''), statusLabel: m.l, statusFg: m.fg, statusBg: m.bg, total: rm(t.total), balLabel: bal > 0.004 ? rm(bal) + ' due' : '', open: () => this.setState({ docId: d.id, route: 'sa-view' }) };
  };
  const invs = s.docs.filter(d => d.type === 'invoice');
  const balOf = (d) => Math.max(0, this.dTot(d).total - this.dPaid(d));
  const outst = invs.filter(d => balOf(d) > 0.004), over = invs.filter(d => this.dStatus(d) === 'overdue');
  const openQ = s.docs.filter(d => d.type === 'quote' && (d.status === 'draft' || d.status === 'sent'));
  const sum = (a, f) => a.reduce((t, d) => t + f(d), 0);
  const monthInv = invs.filter(d => d.date.slice(0, 7) === TODAY.slice(0, 7));
  const dq = lc(s.dq);
  const dList = sorted(s.docs).filter(d => (s.dFilter === 'all' || d.type === s.dFilter) && (!dq || lc(d.id + ' ' + cust(d.custId).name).indexOf(dq) >= 0));
  const sf = s.sf, setSf = (p) => this.setState(st => ({ sf: Object.assign({}, st.sf, p) }));
  const setSfL = (id, p) => this.setState(st => ({ sf: Object.assign({}, st.sf, { lines: st.sf.lines.map(l => l.id === id ? Object.assign({}, l, p) : l) }) }));
  const sfT = sf ? this.dTot({ lines: sf.lines, taxPct: sf.taxPct }) : { sub: 0, tax: 0, total: 0 };
  const dd = s.docs.find(d => d.id === s.docId);
  let dv = { lines: [], meta: [], links: [] };
  if (dd) {
    const t = this.dTot(dd), c = cust(dd.custId), paid = this.dPaid(dd), bal = t.total - paid, v = dvm(dd), isInv = dd.type === 'invoice';
    const meta = [{ k: 'DATE', v: dl(dd.date) }];
    if (isInv) meta.push({ k: 'DUE DATE', v: dl(dd.due) });
    if (dd.type === 'quote') meta.push({ k: 'VALID UNTIL', v: dl(dd.due) });
    if (dd.type === 'receipt') meta.push({ k: 'PAID BY', v: dd.method });
    if (dd.from) meta.push({ k: 'REFERENCE', v: dd.from });
    const links = [];
    if (dd.from) { const o = s.docs.find(x => x.id === dd.from); if (o) links.push({ id: o.id, icon: TI[o.type], note: TL[o.type] + ' \u00b7 source', open: () => this.setState({ docId: o.id }) }); }
    s.docs.filter(x => x.from === dd.id).forEach(o => links.push({ id: o.id, icon: TI[o.type], note: TL[o.type] + ' \u00b7 ' + rm(this.dTot(o).total), open: () => this.setState({ docId: o.id }) }));
    dv = Object.assign(v, {
      title: { quote: 'QUOTATION', invoice: 'TAX INVOICE', receipt: 'OFFICIAL RECEIPT' }[dd.type], custInfo: [c.contact, c.email, c.phone].filter(Boolean).join(' \u00b7 '), meta,
      lines: dd.lines.map(l => ({ desc: l.desc, qty: String(l.qty), price: rm(l.price), amount: rm(l.qty * l.price) })),
      sub: rm(t.sub), hasTax: Number(dd.taxPct) > 0, taxLabel: 'Tax (' + dd.taxPct + '%)', tax: rm(t.tax), total: rm(t.total), totalLabel: dd.type === 'receipt' ? 'AMOUNT RECEIVED' : 'TOTAL',
      showBal: isInv, showPaid: isInv && paid > 0, paid: rm(paid), balance: rm(Math.max(0, bal)), balanceRaw: bal > 0 ? bal.toFixed(2) : '0.00', hasNotes: !!dd.notes, notes: dd.notes,
      terms: { quote: 'This quotation is valid until the date shown. Prices exclude delivery unless stated.', invoice: 'Payment is due by the date shown. Please quote the invoice number on your transfer.', receipt: 'Thank you. This receipt confirms payment received and is computer generated.' }[dd.type] + ' LettuBoost \u00b7 payments@lettuboost.com',
      canSend: dd.type === 'quote' && dd.status === 'draft', canAccept: dd.type === 'quote' && dd.status === 'sent', canDecline: dd.type === 'quote' && dd.status === 'sent',
      canConvert: dd.type === 'quote' && dd.status !== 'invoiced' && dd.status !== 'declined', canDelete: (dd.type === 'quote' && dd.status !== 'invoiced') || (isInv && !dd.payments.length && !s.docs.some(x => x.from === dd.id)),
      canPay: isInv && bal > 0.004, hasLinks: links.length > 0, links,
      send: () => this.docSet(dd.id, { status: 'sent' }), accept: () => this.docSet(dd.id, { status: 'accepted' }), decline: () => this.docSet(dd.id, { status: 'declined' }),
      convert: () => this.docConvert(dd.id), pay: () => this.docPay(dd.id), remove: () => this.docRemove(dd.id)
    });
  }
  const saV = (k, l) => ({ label: l, pick: () => this.setState({ dFilter: k }), bg: s.dFilter === k ? '#097c3e' : '#f7faf4', fg: s.dFilter === k ? '#ffffff' : '#12241a' });

  // ---- purchasing ----
  const sup = (id) => s.sups.find(x => x.id === id) || { name: '(deleted supplier)', terms: '' };
  const PST = { draft: { l: 'DRAFT', fg: '#6b7f71', bg: '#eef1ed' }, ordered: { l: 'ORDERED', fg: '#8a5a00', bg: '#fdf3e0' }, received: { l: 'RECEIVED', fg: '#0a5c2f', bg: '#edf5e8' }, cancelled: { l: 'CANCELLED', fg: '#b3261e', bg: '#fdeceb' } };
  const pvm = (po) => {
    const m = PST[po.status], lt = po.lines.slice(0, 2).map(l => l.desc).join(', ') + (po.lines.length > 2 ? ' +' + (po.lines.length - 2) + ' more' : '');
    const late = po.status === 'ordered' && po.expected < TODAY;
    return { id: po.id, icon: 'truck', typeLabel: 'Purchase order', cust: sup(po.supId).name, sub: lt, dateLabel: dl(po.date), dueLabel: po.status === 'received' ? 'Received ' + sh(po.receivedOn) : (po.status === 'cancelled' ? '' : (late ? 'Late \u00b7 due ' : 'Expected ') + sh(po.expected)), statusLabel: m.l, statusFg: m.fg, statusBg: m.bg, total: rm(this.poTot(po)), balLabel: '', open: () => this.setState({ poId: po.id }) };
  };
  const posS = sorted(s.pos.map(p => Object.assign({}, p)));
  const ordered = s.pos.filter(p => p.status === 'ordered');
  const lowItems = s.items.filter(i => i.qty <= i.reorder);
  const recvMonth = s.pos.filter(p => p.status === 'received' && p.receivedOn.slice(0, 7) === TODAY.slice(0, 7));
  const pf = s.pf, setPf = (p) => this.setState(st => ({ pf: Object.assign({}, st.pf, p) }));
  const setPfL = (id, p) => this.setState(st => ({ pf: Object.assign({}, st.pf, { lines: st.pf.lines.map(l => l.id === id ? Object.assign({}, l, p) : l) }) }));
  const pfTotal = pf ? pf.lines.reduce((t, l) => t + Number(l.qty || 0) * Number(l.cost || 0), 0) : 0;
  const dp = s.pos.find(p => p.id === s.poId);
  let pdet = { lines: [] };
  if (dp) {
    pdet = Object.assign(pvm(dp), { hasNotes: !!dp.notes, notes: dp.notes,
      lines: dp.lines.map(l => { const it = s.items.find(i => i.id === l.itemId); return { desc: l.desc, qty: l.qty + (it ? ' ' + it.unit : ''), cost: rm(l.cost), amount: rm(l.qty * l.cost), stock: it ? 'IN STOCK LIST' : 'NOT STOCKED', fg: it ? '#0a5c2f' : '#9aa89e' }; }),
      canOrder: dp.status === 'draft', canReceive: dp.status === 'ordered', canCancel: dp.status === 'draft' || dp.status === 'ordered',
      order: () => this.poSet(dp.id, { status: 'ordered' }, dp.id + ' placed with the supplier.'), receive: () => this.poReceive(dp.id), cancel: () => this.poSet(dp.id, { status: 'cancelled' }, dp.id + ' cancelled.') });
  }
  const puV = (k, l) => ({ label: l, pick: () => this.setState({ poFilter: k }), bg: s.poFilter === k ? '#097c3e' : '#f7faf4', fg: s.poFilter === k ? '#ffffff' : '#12241a' });
  const poList = posS.filter(p => s.poFilter === 'all' || p.status === s.poFilter);

  // ---- tasks ----
  const W = s.works, PJ = s.projects, pj = (id) => PJ.find(p => p.id === id);
  const subsOf = (id) => W.filter(w => w.parentId === id);
  const isLeaf = (w) => !W.some(x => x.parentId === w.id);
  const late = (w) => w.status !== 'done' && w.end < TODAY;
  const WST = { todo: { l: 'TO DO', fg: '#6b7f71', bg: '#eef1ed' }, doing: { l: 'IN PROGRESS', fg: '#8a5a00', bg: '#fdf3e0' }, done: { l: 'DONE', fg: '#0a5c2f', bg: '#edf5e8' } };
  const PRI = { Low: { fg: '#0a5c2f', bg: '#edf5e8' }, Medium: { fg: '#8a5a00', bg: '#fdf3e0' }, High: { fg: '#b3261e', bg: '#fdeceb' } };
  const ORDER = ['todo', 'doing', 'done'];
  const tkA = s.tkA === 'me' ? me : s.tkA, tq = lc(s.tkQ);
  const tkMatch = (w) => isLeaf(w) && (tkA === 'all' || w.assignee === tkA) && (s.tkP === 'all' || (s.tkP === 'none' ? !w.projId : w.projId === s.tkP)) && (s.tkS === 'all' || w.status === s.tkS) && (!tq || lc(w.title).indexOf(tq) >= 0);
  const cvm = (w) => {
    const p = pj(w.projId), par = w.parentId ? W.find(x => x.id === w.parentId) : null, pr = PRI[w.priority], st = WST[w.status], i = ORDER.indexOf(w.status), lt = late(w);
    return { title: w.title, projName: p ? p.name : 'No project', projColor: p ? p.color : '#c9d6c6', hasProj: !!p, noProj: !p, parentLabel: par ? par.title : '', hasParent: !!par, initials: ini(w.assignee), who: nm(w.assignee), dueLabel: (w.status === 'done' ? 'Done \u00b7 ' : (lt ? 'Late \u00b7 ' : 'Due ')) + sh(w.end), dueFg: lt ? '#b3261e' : '#6b7f71', prio: w.priority.toUpperCase(), prioFg: pr.fg, prioBg: pr.bg, progress: w.progress, showProg: w.status === 'doing', stLabel: st.l, stFg: st.fg, stBg: st.bg, canPrev: i > 0, canNext: i < 2,
      prev: (e) => { e.stopPropagation(); this.wStatus(w.id, ORDER[i - 1]); }, next: (e) => { e.stopPropagation(); this.wStatus(w.id, ORDER[i + 1]); }, open: () => this.openTask(w.id) };
  };
  const tkAll = W.filter(isLeaf), mine = tkAll.filter(w => w.assignee === me);
  const wk = D(TODAY) + 6;
  const tkLeaves = W.filter(tkMatch);
  const COLS = [['todo', 'TO DO', 'clock', '#6b7f71'], ['doing', 'IN PROGRESS', 'taskcheck', '#8a5a00'], ['done', 'DONE', 'check', '#0a5c2f']];
  const tkCols = COLS.map(([k, title, icon, fg]) => { const cs = tkLeaves.filter(w => w.status === k); return { title, icon, fg, count: cs.length, cards: cs.map(cvm), empty: cs.length === 0 }; });
  const tf = s.taskForm || {};
  const setTf = (p) => this.setState(st => ({ taskForm: Object.assign({}, st.taskForm, p) }));
  const tfHasSubs = !!tf.id && W.some(x => x.parentId === tf.id);
  const tfParents = [{ id: '', label: 'None (top-level task)' }].concat(W.filter(x => !x.parentId && x.id !== tf.id && (x.projId || '') === (tf.projId || '')).map(x => ({ id: x.id, label: x.title })));

  // ---- plan ----
  const PJST = { Planning: { fg: '#12241a', bg: '#e4ebdf' }, Active: { fg: '#0a5c2f', bg: '#edf5e8' }, 'On hold': { fg: '#8a5a00', bg: '#fdf3e0' }, Done: { fg: '#6b7f71', bg: '#eef1ed' } };
  const progOf = (p) => { const tops = W.filter(w => w.projId === p.id && !w.parentId); return tops.length ? Math.round(tops.reduce((t, w) => t + w.progress, 0) / tops.length) : 0; };
  const ppCards = PJ.map(p => {
    const ts = W.filter(w => w.projId === p.id), leaves = ts.filter(isLeaf), lateN = leaves.filter(late).length, pr = progOf(p), st = PJST[p.status];
    const team = Array.from(new Set(ts.map(w => w.assignee))).slice(0, 6).map(id => ({ initials: ini(id), name: nm(id) }));
    return { name: p.name, desc: p.desc, color: p.color, status: p.status.toUpperCase(), stFg: st.fg, stBg: st.bg, range: sh(p.start) + ' \u2013 ' + dl(p.end), prog: pr, progLabel: pr + '%', counts: leaves.filter(w => w.status === 'done').length + ' of ' + leaves.length + ' tasks done', team, hasLate: lateN > 0, lateText: lateN + ' late',
      open: () => this.setState({ gProj: p.id, gA: 'all', gS: 'all', route: 'pp-gantt' }), edit: (e) => { e.stopPropagation(); this.openProj(p.id); } };
  });
  const allLeaves = W.filter(w => w.projId && isLeaf(w));
  const pjf = s.projForm || {}, setPj = (p) => this.setState(st => ({ projForm: Object.assign({}, st.projForm, p) }));
  const PCOL = ['#097c3e', '#d9a53a', '#4a7fa8', '#12241a', '#80cc28'];
  const gp = s.gProj, gA = s.gA, gS = s.gS, dw = { day: 34, week: 15, month: 5 }[s.zoom] || 15, LW = 280;
  const gAct = gA !== 'all' || gS !== 'all';
  const gMatch = (w) => (gA === 'all' || w.assignee === gA) && (gS === 'all' || w.status === gS);
  const src = [];
  (gp === 'all' ? PJ : PJ.filter(p => p.id === gp)).forEach(p => {
    const tops = W.filter(w => w.projId === p.id && !w.parentId).filter(t => !gAct || gMatch(t) || subsOf(t.id).some(gMatch));
    if (gp === 'all' && tops.length) src.push({ kind: 'proj', p });
    tops.forEach(t => {
      const subs = subsOf(t.id), open = !!s.gx[t.id] || (gAct && subs.some(gMatch));
      src.push({ kind: 'task', w: t, level: 0, hasSubs: subs.length > 0, open });
      if (subs.length && open) subs.filter(x => !gAct || gMatch(x)).forEach(x => src.push({ kind: 'task', w: x, level: 1, hasSubs: false, open: false }));
    });
  });
  const pts = []; src.forEach(r => { if (r.kind === 'proj') pts.push(D(r.p.start), D(r.p.end)); else pts.push(D(r.w.start), D(r.w.end)); });
  if (!pts.length) pts.push(D(TODAY), D(TODAY) + 30);
  const lo0 = Math.min.apply(null, pts) - 3, hi = Math.max.apply(null, pts) + 10;
  const lo = lo0 - ((new Date(lo0 * 864e5).getUTCDay() + 6) % 7), days = hi - lo + 1, chartW = days * dw;
  const MN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const gMonths = [];
  for (let n = lo; n <= hi;) { const dt = new Date(n * 864e5), y = dt.getUTCFullYear(), m = dt.getUTCMonth(), nx = Math.min(hi + 1, Date.UTC(y, m + 1, 1) / 864e5); gMonths.push({ left: (n - lo) * dw, w: (nx - n) * dw, label: (nx - n) * dw < 90 ? MN[m] : MN[m] + ' ' + y }); n = nx; }
  const step = dw >= 30 ? 1 : (dw >= 10 ? 7 : 14), todayN = D(TODAY), gTicks = [];
  for (let n = lo; n <= hi; n += step) { const dt = new Date(n * 864e5); gTicks.push({ left: (n - lo) * dw, w: step * dw, label: step === 1 ? String(dt.getUTCDate()) : dt.getUTCDate() + ' ' + MN[dt.getUTCMonth()], fg: (step === 1 && n === todayN) ? '#b3261e' : '#6b7f71' }); }
  const gRows = src.map(r => {
    if (r.kind === 'proj') {
      const p = r.p, l = (D(p.start) - lo) * dw, w = (D(p.end) - D(p.start) + 1) * dw, pr = progOf(p);
      return { label: p.name, pad: 12, hasSubs: false, noSubs: true, caret: 'none', toggle: () => {}, dot: p.color, fw: '800', rowBg: '#f7faf4', labelBg: '#f7faf4', hasAv: false, avName: '', initials: '', left: l, width: w, barTop: 15, barH: 10, barBg: '#dfe9d9', fillBg: p.color, fill: pr, ring: 'none', progLabel: pr + '%', labelLeft: l + w + 8, tip: p.name, open: () => this.setState({ gProj: p.id }) };
    }
    const w = r.w, p = pj(w.projId) || { color: '#6b7f71' }, left = (D(w.start) - lo) * dw, width = (D(w.end) - D(w.start) + 1) * dw, lt = late(w), pb = r.hasSubs;
    return { label: w.title, pad: 12 + r.level * 26, hasSubs: r.hasSubs, noSubs: !r.hasSubs, caret: r.open ? 'rotate(0deg)' : 'rotate(-90deg)', toggle: () => this.setState(st => ({ gx: Object.assign({}, st.gx, { [w.id]: !st.gx[w.id] }) })), dot: p.color, fw: r.level ? '500' : '700', rowBg: '#ffffff', labelBg: '#ffffff', hasAv: true, avName: nm(w.assignee), initials: ini(w.assignee), left, width, barTop: pb ? 12 : 9, barH: pb ? 16 : 22, barBg: pb ? '#c9d6c6' : '#dfe9d9', fillBg: w.status === 'done' ? '#097c3e' : (pb ? '#12241a' : p.color), fill: w.progress, ring: lt ? '0 0 0 2px #b3261e' : 'none', progLabel: w.progress + '%' + (lt ? ' \u00b7 late' : ''), labelLeft: left + width + 8, tip: w.title + ' \u00b7 ' + nm(w.assignee) + ' \u00b7 ' + sh(w.start) + ' to ' + sh(w.end), open: () => this.openTask(w.id) };
  });

  return {
    isSaDash: rt === 'sa-dash', isSaDocs: rt === 'sa-docs', isSaNew: rt === 'sa-new' && !!sf, isSaView: rt === 'sa-view' && !!dd, isSaCust: rt === 'sa-cust',
    isPuDash: rt === 'pu-dash', isPuOrders: rt === 'pu-orders', isPuNew: rt === 'pu-new' && !!pf, isPuSup: rt === 'pu-sup',
    isTkBoard: rt === 'tk-board', isTkList: rt === 'tk-list', isPpList: rt === 'pp-list', isPpGantt: rt === 'pp-gantt',
    printDoc: () => window.print(),
    goSaDocs: this.go('sa-docs'), goPuOrders: this.go('pu-orders'),
    saStats: [
      Object.assign({ label: 'INVOICED', value: rm(sum(monthInv, d => this.dTot(d).total)).replace('RM ', 'RM'), note: monthInv.length + ' invoices this month', color: '#ffffff' }, green),
      Object.assign({ label: 'OUTSTANDING', value: rm(sum(outst, balOf)).replace('RM ', 'RM'), note: outst.length + ' unpaid invoices', color: '#12241a' }, light),
      Object.assign({ label: 'OVERDUE', value: rm(sum(over, balOf)).replace('RM ', 'RM'), note: over.length ? over.length + ' past due date' : 'Nothing late', color: over.length ? '#b3261e' : '#097c3e' }, light),
      Object.assign({ label: 'OPEN QUOTES', value: String(openQ.length), note: rm(sum(openQ, d => this.dTot(d).total)) + ' pending', color: '#12241a' }, light)
    ],
    saDue: outst.slice().sort((a, b) => a.due < b.due ? -1 : 1).slice(0, 5).map(dvm), saDueEmpty: outst.length === 0,
    saQuotes: openQ.slice(0, 5).map(dvm), saQuotesEmpty: openQ.length === 0,
    saRecent: sorted(s.docs).slice(0, 5).map(dvm),
    saFilters: [['all', 'All'], ['quote', 'Quotations'], ['invoice', 'Invoices'], ['receipt', 'Receipts']].map(([k, l]) => saV(k, l)),
    dq: s.dq, setDq: (e) => this.setState({ dq: e.target.value }),
    saRows: dList.map(dvm), saRowsEmpty: dList.length === 0,
    saNewQuote: () => this.sfNew('quote'), saNewInv: () => this.sfNew('invoice'), saNewRc: () => this.sfNew('receipt'),
    sfTypes: [['quote', 'Quotation'], ['invoice', 'Invoice'], ['receipt', 'Receipt']].map(([k, l]) => Object.assign({ label: l, icon: TI[k], pick: () => setSf({ type: k }) }, { bg: sf && sf.type === k ? '#097c3e' : '#f7faf4', fg: sf && sf.type === k ? '#ffffff' : '#12241a' })),
    custOpts: s.customers.map(c => ({ id: c.id, label: c.name })), methodOpts: METHODS,
    sfv: sf ? { custId: sf.custId, date: sf.date, due: sf.due, method: sf.method, taxPct: sf.taxPct, notes: sf.notes, showDue: sf.type !== 'receipt', dueLabel: sf.type === 'quote' ? 'VALID UNTIL' : 'DUE DATE', showMethod: sf.type === 'receipt', total: rm(sfT.total), sub: rm(sfT.sub), summary: TL[sf.type] + ' \u00b7 ' + sf.lines.length + (sf.lines.length === 1 ? ' line' : ' lines') + (sfT.tax ? ' \u00b7 incl. ' + rm(sfT.tax) + ' tax' : ''), submitLabel: 'CREATE ' + TL[sf.type].toUpperCase() } : {},
    sfCust: (e) => setSf({ custId: e.target.value }), sfDate: (e) => setSf({ date: e.target.value }), sfDue: (e) => setSf({ due: e.target.value }), sfMethod: (e) => setSf({ method: e.target.value }), sfTax: (e) => setSf({ taxPct: e.target.value }), sfNotes: (e) => setSf({ notes: e.target.value }),
    sfLines: sf ? sf.lines.map(l => ({ desc: l.desc, qty: l.qty, price: l.price, amount: rm(Number(l.qty || 0) * Number(l.price || 0)), setDesc: (e) => setSfL(l.id, { desc: e.target.value }), setQty: (e) => setSfL(l.id, { qty: e.target.value }), setPrice: (e) => setSfL(l.id, { price: e.target.value }), remove: () => { if (sf.lines.length > 1) setSf({ lines: sf.lines.filter(x => x.id !== l.id) }); } })) : [],
    sfAddLine: () => setSf({ lines: sf.lines.concat([this.dLine()]) }), sfSave: this.sfSave,
    dv, payf: s.payF, payAmount: (e) => this.setState(st => ({ payF: Object.assign({}, st.payF, { amount: e.target.value }) })), payMethod: (e) => this.setState(st => ({ payF: Object.assign({}, st.payF, { method: e.target.value }) })), payDate: (e) => this.setState(st => ({ payF: Object.assign({}, st.payF, { date: e.target.value }) })),
    custRows: s.customers.map(c => { const mine2 = s.docs.filter(d => d.custId === c.id), bal = sum(mine2.filter(d => d.type === 'invoice'), balOf); return { name: c.name, initials: c.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase(), contact: c.contact || '\u2014', email: c.email, phone: c.phone, docs: mine2.length + ' documents', balance: bal > 0.004 ? rm(bal) : '\u2014', balFg: bal > 0.004 ? '#8a5a00' : '#6b7f71', remove: () => { if (mine2.length) { this.toastNow(c.name + ' has documents and cannot be removed.'); return; } this.setState(st => ({ customers: st.customers.filter(x => x.id !== c.id) })); } }; }),
    custNew: s.custNew, cnName: (e) => this.setState(st => ({ custNew: Object.assign({}, st.custNew, { name: e.target.value }) })), cnContact: (e) => this.setState(st => ({ custNew: Object.assign({}, st.custNew, { contact: e.target.value }) })), cnEmail: (e) => this.setState(st => ({ custNew: Object.assign({}, st.custNew, { email: e.target.value }) })), cnPhone: (e) => this.setState(st => ({ custNew: Object.assign({}, st.custNew, { phone: e.target.value }) })), custAdd: this.custAdd,

    puStats: [
      Object.assign({ label: 'OPEN ORDERS', value: String(ordered.length), note: ordered.filter(p => p.expected < TODAY).length + ' running late', color: '#12241a' }, light),
      Object.assign({ label: 'ON ORDER', value: rm(ordered.reduce((t, p) => t + this.poTot(p), 0)).replace('RM ', 'RM'), note: 'Awaiting delivery', color: '#ffffff' }, green),
      Object.assign({ label: 'RECEIVED', value: rm(recvMonth.reduce((t, p) => t + this.poTot(p), 0)).replace('RM ', 'RM'), note: recvMonth.length + ' orders this month', color: '#12241a' }, light),
      Object.assign({ label: 'SUPPLIERS', value: String(s.sups.length), note: 'On your vendor list', color: '#12241a' }, light)
    ],
    puSoon: ordered.slice().sort((a, b) => a.expected < b.expected ? -1 : 1).slice(0, 5).map(pvm), puSoonEmpty: ordered.length === 0,
    puLow: lowItems.map(i => ({ name: i.name, qtyLabel: i.qty + ' ' + i.unit + ' left', reorderLabel: 'reorder at ' + i.reorder, status: i.qty <= 0 ? 'OUT' : 'LOW', fg: i.qty <= 0 ? '#b3261e' : '#8a5a00', bg: i.qty <= 0 ? '#fdeceb' : '#fdf3e0', order: () => this.poNew(i.id) })), puLowEmpty: lowItems.length === 0,
    puRecent: posS.slice(0, 5).map(pvm),
    puFilters: [['all', 'All'], ['draft', 'Draft'], ['ordered', 'Ordered'], ['received', 'Received'], ['cancelled', 'Cancelled']].map(([k, l]) => puV(k, l)),
    puRows: poList.map(pvm), puRowsEmpty: poList.length === 0, puNewH: () => this.poNew(),
    supOpts: s.sups.map(x => ({ id: x.id, label: x.name })),
    poItemOpts: [{ id: '', label: 'Other item (not stocked)' }].concat(s.items.map(i => ({ id: i.id, label: i.name + ' (' + i.qty + ' ' + i.unit + ' on hand)' }))),
    pfv: pf ? { supId: pf.supId, date: pf.date, expected: pf.expected, notes: pf.notes, total: rm(pfTotal), summary: pf.lines.length + (pf.lines.length === 1 ? ' line' : ' lines') + ' \u00b7 ' + sup(pf.supId).name } : {},
    pfSup: (e) => setPf({ supId: e.target.value }), pfDate: (e) => setPf({ date: e.target.value }), pfExp: (e) => setPf({ expected: e.target.value }), pfNotes: (e) => setPf({ notes: e.target.value }),
    pfLines: pf ? pf.lines.map(l => ({ itemId: l.itemId, desc: l.desc, qty: l.qty, cost: l.cost,
      setItem: (e) => { const it = s.items.find(i => i.id === e.target.value); setPfL(l.id, it ? { itemId: it.id, desc: it.name, cost: l.cost === '' ? String(it.cost) : l.cost } : { itemId: '' }); },
      setDesc: (e) => setPfL(l.id, { desc: e.target.value }), setQty: (e) => setPfL(l.id, { qty: e.target.value }), setCost: (e) => setPfL(l.id, { cost: e.target.value }), remove: () => { if (pf.lines.length > 1) setPf({ lines: pf.lines.filter(x => x.id !== l.id) }); } })) : [],
    pfAddLine: () => setPf({ lines: pf.lines.concat([this.pLine('')]) }), pfPlace: () => this.poSave('ordered'), pfDraft: () => this.poSave('draft'),
    hasPo: !!dp, pdet, closePo: () => this.setState({ poId: null }),
    supRows: s.sups.map(x => ({ name: x.name, initials: x.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase(), terms: x.terms, category: x.category, contact: x.contact || '\u2014', email: x.email, phone: x.phone, orders: s.pos.filter(p => p.supId === x.id).length + ' orders', remove: () => { if (s.pos.some(p => p.supId === x.id)) { this.toastNow(x.name + ' has orders and cannot be removed.'); return; } this.setState(st => ({ sups: st.sups.filter(y => y.id !== x.id) })); } })),
    supNew: s.supNew, snName: (e) => this.setState(st => ({ supNew: Object.assign({}, st.supNew, { name: e.target.value }) })), snCat: (e) => this.setState(st => ({ supNew: Object.assign({}, st.supNew, { category: e.target.value }) })), snContact: (e) => this.setState(st => ({ supNew: Object.assign({}, st.supNew, { contact: e.target.value }) })), snEmail: (e) => this.setState(st => ({ supNew: Object.assign({}, st.supNew, { email: e.target.value }) })), snPhone: (e) => this.setState(st => ({ supNew: Object.assign({}, st.supNew, { phone: e.target.value }) })), snTerms: (e) => this.setState(st => ({ supNew: Object.assign({}, st.supNew, { terms: e.target.value }) })), supAdd: this.supAdd,

    tkStats: [
      Object.assign({ label: 'MY OPEN', value: String(mine.filter(w => w.status !== 'done').length), note: 'Assigned to ' + this.first(me), color: '#ffffff' }, green),
      Object.assign({ label: 'DUE THIS WEEK', value: String(mine.filter(w => w.status !== 'done' && w.end >= TODAY && D(w.end) <= wk).length), note: 'Next 7 days', color: '#12241a' }, light),
      Object.assign({ label: 'LATE', value: String(mine.filter(late).length), note: mine.filter(late).length ? 'Past their end date' : 'All on time', color: mine.filter(late).length ? '#b3261e' : '#097c3e' }, light),
      Object.assign({ label: 'DONE', value: String(mine.filter(w => w.status === 'done').length), note: 'Of ' + mine.length + ' assigned', color: '#097c3e' }, light)
    ],
    tkA: s.tkA, tkP: s.tkP, tkS: s.tkS, tkQ: s.tkQ,
    setTkA: (e) => this.setState({ tkA: e.target.value }), setTkP: (e) => this.setState({ tkP: e.target.value }), setTkS: (e) => this.setState({ tkS: e.target.value }), setTkQ: (e) => this.setState({ tkQ: e.target.value }),
    tkAOpts: [{ id: 'me', label: 'My tasks' }, { id: 'all', label: 'Everyone' }].concat(empOpts),
    tkAOpts2: [{ id: 'all', label: 'All assignees' }].concat(empOpts),
    tkPOpts: [{ id: 'all', label: 'All projects' }].concat(PJ.map(p => ({ id: p.id, label: p.name }))).concat([{ id: 'none', label: 'No project' }]),
    tkSOpts: [{ id: 'all', label: 'Any status' }, { id: 'todo', label: 'To do' }, { id: 'doing', label: 'In progress' }, { id: 'done', label: 'Done' }],
    tkNewH: () => this.newTask(s.tkP !== 'all' && s.tkP !== 'none' ? s.tkP : ''),
    tkCols, tkRows: tkLeaves.map(cvm), tkRowsEmpty: tkLeaves.length === 0,
    hasTf: !!s.taskForm, tf, tfv: { title: tf.id ? 'Edit task' : 'New task', canDelete: !!tf.id, canParent: !tfHasSubs && !!tf.projId, canStatus: !tfHasSubs, showProg: !tfHasSubs && tf.status === 'doing', hasSubs: tfHasSubs, canAddSub: !!tf.id && !tf.parentId, hasProj: !!(tf.id && tf.projId) },
    tfProjOpts: [{ id: '', label: 'No project' }].concat(PJ.map(p => ({ id: p.id, label: p.name }))),
    tfParentOpts: tfParents, tfEmpOpts: empOpts, prioOpts: opts(['Low', 'Medium', 'High']), wStatusOpts: [{ id: 'todo', label: 'To do' }, { id: 'doing', label: 'In progress' }, { id: 'done', label: 'Done' }],
    tfSetTitle: (e) => setTf({ title: e.target.value }), tfSetProj: (e) => setTf({ projId: e.target.value, parentId: '' }), tfSetParent: (e) => { const par = W.find(x => x.id === e.target.value); setTf(par ? { parentId: par.id, projId: par.projId } : { parentId: '' }); },
    tfSetAssignee: (e) => setTf({ assignee: e.target.value }), tfSetPrio: (e) => setTf({ priority: e.target.value }), tfSetStart: (e) => setTf({ start: e.target.value }), tfSetEnd: (e) => setTf({ end: e.target.value }), tfSetStatus: (e) => setTf({ status: e.target.value }), tfSetProg: (e) => setTf({ progress: e.target.value }), tfSetNotes: (e) => setTf({ notes: e.target.value }),
    tfCancel: () => this.setState({ taskForm: null }), tfSave: this.tfSave, tfDelete: this.tfDelete,
    tfAddSub: () => this.newTask(tf.projId, tf.id), tfPlan: () => this.setState({ gProj: tf.projId, gA: 'all', gS: 'all', gx: Object.assign({}, s.gx, { [tf.parentId || tf.id]: true }), taskForm: null, route: 'pp-gantt', openGroup: 'WORK' }),

    ppStats: [
      Object.assign({ label: 'PROJECTS', value: String(PJ.length), note: 'On the plan', color: '#ffffff' }, green),
      Object.assign({ label: 'ACTIVE', value: String(PJ.filter(p => p.status === 'Active').length), note: 'In progress now', color: '#097c3e' }, light),
      Object.assign({ label: 'AT RISK', value: String(allLeaves.filter(late).length), note: 'Late tasks across projects', color: allLeaves.filter(late).length ? '#b3261e' : '#097c3e' }, light),
      Object.assign({ label: 'AVG PROGRESS', value: (PJ.length ? Math.round(PJ.reduce((t, p) => t + progOf(p), 0) / PJ.length) : 0) + '%', note: 'Across all projects', color: '#12241a' }, light)
    ],
    ppCards, ppEmpty: PJ.length === 0, ppNewH: this.newProj,
    hasPf: !!s.projForm, pj: pjf, pjv: { title: pjf.id ? 'Edit project' : 'New project', canDelete: !!pjf.id },
    pjStatusOpts: opts(['Planning', 'Active', 'On hold', 'Done']),
    pjColors: PCOL.map(c => ({ color: c, ring: pjf.color === c ? '0 0 0 3px #ffffff, 0 0 0 5px ' + c : 'none', pick: () => setPj({ color: c }) })),
    pjSetName: (e) => setPj({ name: e.target.value }), pjSetDesc: (e) => setPj({ desc: e.target.value }), pjSetOwner: (e) => setPj({ owner: e.target.value }), pjSetStatus: (e) => setPj({ status: e.target.value }), pjSetStart: (e) => setPj({ start: e.target.value }), pjSetEnd: (e) => setPj({ end: e.target.value }),
    pjCancel: () => this.setState({ projForm: null }), pjSave: this.pjSave, pjDelete: this.pjDelete,
    gProj: s.gProj, gA: s.gA, gS: s.gS,
    gProjOpts: [{ id: 'all', label: 'All projects' }].concat(PJ.map(p => ({ id: p.id, label: p.name }))),
    setGProj: (e) => this.setState({ gProj: e.target.value }), setGA: (e) => this.setState({ gA: e.target.value }), setGS: (e) => this.setState({ gS: e.target.value }),
    gZoom: [['day', 'Day'], ['week', 'Week'], ['month', 'Month']].map(([k, l]) => Object.assign({ label: l, pick: () => this.setState({ zoom: k }) }, { bg: s.zoom === k ? '#097c3e' : '#f7faf4', fg: s.zoom === k ? '#ffffff' : '#12241a' })),
    gExpand: () => this.setState({ gx: W.filter(w => subsOf(w.id).length).reduce((o, w) => Object.assign(o, { [w.id]: true }), {}) }), gCollapse: () => this.setState({ gx: {} }),
    gNewTask: () => this.newTask(gp === 'all' ? (PJ[0] || {}).id : gp),
    gg: { totalW: LW + chartW, chartW, gridBg: 'repeating-linear-gradient(to right, #eef3ea 0px, #eef3ea 1px, transparent 1px, transparent ' + (dw * 7) + 'px)', showToday: todayN >= lo && todayN <= hi, todayLeft: LW + (todayN - lo) * dw + dw / 2 },
    gMonths, gTicks, gRows, gEmpty: gRows.length === 0
  };
}
