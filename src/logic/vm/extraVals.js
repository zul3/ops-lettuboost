// View model: claims, reports, system admin and module sub-navigation.
// Builds the flat values object the screens render from. Runs with `this` bound to the OpsApp instance.

export function extraVals(rt, s) {
  const me = s.me, rm = this.rm, mod = this.modOf(rt), founder = this.isFounder(me), dl = this.dateLabel;
  const nm = (id) => this.emp(id).name;
  const ini = (id) => nm(id).split(' ').map(w => w[0]).slice(0, 2).join('');
  const light = { cardBg: '#ffffff', labelFg: '#6b7f71', noteFg: '#6b7f71' };
  const green = { cardBg: '#097c3e', labelFg: 'rgba(255,255,255,.66)', noteFg: 'rgba(255,255,255,.78)' };
  const chip = (on) => ({ bg: on ? '#097c3e' : '#ffffff', fg: on ? '#ffffff' : '#12241a' });
  const opt = (arr) => arr.map(x => ({ id: x }));
  const unread = s.notifications.filter(n => n.unread).length;
  const myQ = s.requests.filter(r => this.isFounder(r.payeeId) && this.missing(r).indexOf(me) >= 0).length;
  const pendOthers = s.claims.filter(c => c.status === 'pending' && c.by !== me);

  const SUB = {
    payments: [{ label: 'PAY', items: [['dashboard', 'Dashboard'], ['new', 'New request'], ['approvals', 'Approval inbox'], ['dual', 'Founder approval', myQ], ['history', 'History']] }, { label: 'PEOPLE', items: [['employees', 'Employees'], ['payslips', 'Payslips']] }, { label: 'SETUP', items: [['tasks', 'Tasks & rates'], ['settings', 'Settings']] }],
    claims: [{ label: 'CLAIMS', items: [['cl-overview', 'Overview'], ['cl-new', 'New claim'], ['cl-mine', 'My claims']] }].concat(founder ? [{ label: 'REVIEW', items: [['cl-review', 'Review queue', pendOthers.length]] }] : []),
    reports: [{ label: 'REPORTS', items: [['rp-dash', 'Dashboard'], ['rp-new', 'New report'], ['rp-all', 'All reports']] }, { label: 'OUTPUT', items: [['rp-export', 'Print & export']] }],
    admin: [{ label: 'ACCESS', items: [['ad-users', 'Users'], ['ad-access', 'Module access']] }, { label: 'AUDIT', items: [['ad-log', 'Activity log']] }]
  };
  const lowN = s.items.filter(i => i.qty <= i.reorder).length;
  SUB.hr = [{ label: 'STAFF', items: [['hr-dir', 'Directory'], ['hr-form', 'Add staff']] }];
  SUB.stock = [{ label: 'STOCK', items: [['st-dash', 'Dashboard'], ['st-items', 'Items', lowN], ['st-move', 'Movements']] }];
  const ovN = s.docs.filter(d => d.type === 'invoice' && this.dStatus(d) === 'overdue').length, poN = s.pos.filter(p => p.status === 'ordered').length;
  SUB.sales = [{ label: 'SALES', items: [['sa-dash', 'Dashboard'], ['sa-docs', 'Documents', ovN], ['sa-new', 'New document']] }, { label: 'CLIENTS', items: [['sa-cust', 'Customers']] }];
  SUB.purchasing = [{ label: 'BUYING', items: [['pu-dash', 'Dashboard'], ['pu-orders', 'Orders', poN], ['pu-new', 'New order']] }, { label: 'VENDORS', items: [['pu-sup', 'Suppliers']] }];
  SUB.tasks = [{ label: 'TASKS', items: [['tk-board', 'Board'], ['tk-list', 'List']] }];
  SUB.plan = [{ label: 'PLAN', items: [['pp-list', 'Projects'], ['pp-gantt', 'Gantt chart']] }];
  const SUBT = { payments: 'PAYMENTS', claims: 'CLAIMS', reports: 'REPORTS', admin: 'SYSTEM ADMIN', hr: 'HUMAN RESOURCES', stock: 'STOCK', sales: 'SALES & ORDERS', purchasing: 'PURCHASING', tasks: 'TASKS', plan: 'PROJECT PLAN' };
  const subGroups = (SUB[mod] || []).map(g => ({ label: g.label, items: g.items.map(([k, label, badge]) => { const on = rt === k; return { label, icon: this.pageIcon(k), badge: badge ? String(badge) : '', go: k === 'hr-form' ? this.hrNewH : (k === 'sa-new' ? () => this.sfNew('invoice') : (k === 'pu-new' ? () => this.poNew() : this.go(k))), bg: on ? '#097c3e' : 'transparent', fg: on ? '#ffffff' : '#12241a', fw: on ? '800' : '600' }; }) }));

  // claims
  const setCf = (p) => this.setState(st => ({ cf: Object.assign({}, st.cf, p) }));
  const setL = (id, p) => this.setState(st => ({ cf: Object.assign({}, st.cf, { lines: st.cf.lines.map(l => l.id === id ? Object.assign({}, l, p) : l) }) }));
  const addR = (id, rs) => this.setState(st => ({ cf: Object.assign({}, st.cf, { lines: st.cf.lines.map(l => l.id === id ? Object.assign({}, l, { receipts: l.receipts.concat(rs) }) : l) }) }));
  const cvm = (c) => {
    const st = this.CST[c.status], cats = Array.from(new Set(c.lines.map(l => l.cat))), rc = c.lines.reduce((t, l) => t + l.receipts.length, 0);
    return { id: c.id, title: c.title, byName: nm(c.by), initials: ini(c.by), dateLabel: dl(c.submitted), cats: cats.length > 2 ? cats.slice(0, 2).join(', ') + ' +' + (cats.length - 2) : cats.join(', '), receipts: rc + (rc === 1 ? ' receipt' : ' receipts'), lines: c.lines.length + (c.lines.length === 1 ? ' item' : ' items'), total: rm(this.claimTotal(c)), statusLabel: st.label, statusFg: st.fg, open: () => this.setState({ claimId: c.id, cComment: '' }), payClick: (e) => { e.stopPropagation(); this.claimPay(c.id); } };
  };
  const vis = founder ? s.claims : s.claims.filter(c => c.by === me);
  const sum = (a) => a.reduce((t, c) => t + this.claimTotal(c), 0);
  const pend = vis.filter(c => c.status === 'pending'), appr = vis.filter(c => c.status === 'approved'), paid = vis.filter(c => c.status === 'paid'), rej = vis.filter(c => c.status === 'rejected');
  const catTot = this.CL_CATS.map(c => ({ label: c, raw: vis.filter(x => x.status !== 'rejected').reduce((t, cl) => t + cl.lines.filter(l => l.cat === c).reduce((a, l) => a + Number(l.amount || 0), 0), 0) })).filter(x => x.raw > 0).sort((a, b) => b.raw - a.raw).slice(0, 6);
  const maxC = Math.max.apply(null, catTot.map(x => x.raw).concat([1]));
  const mine = s.claims.filter(c => c.by === me && (s.cFilter === 'all' || c.status === s.cFilter));
  const queue = pendOthers, ready = s.claims.filter(c => c.status === 'approved' && c.by !== me);
  const cf = s.cf, allFl = cf.lines.map(l => this.lineFlags(l)), cfTotal = this.claimTotal(cf);
  const blocks = [], warns = [];
  allFl.forEach((fl, i) => fl.forEach(f => (f.block ? blocks : warns).push('Item ' + (i + 1) + ' — ' + f.t)));
  if (!cf.title.trim()) blocks.unshift('Claim title needed');
  const checks = blocks.map(t => ({ t, fg: '#b3261e', bg: '#fdeceb' })).concat(warns.map(t => ({ t, fg: '#7a4f00', bg: '#fdf3e0' })));
  const dc = s.claims.find(c => c.id === s.claimId);
  let cdet = { rows: [], lines: [], trail: [] };
  if (dc) {
    const st = this.CST[dc.status];
    cdet = { id: dc.id, title: dc.title, byName: nm(dc.by), total: rm(this.claimTotal(dc)), statusLabel: st.label,
      rows: [{ k: 'CLAIMANT', v: nm(dc.by) }, { k: 'SUBMITTED', v: dl(dc.submitted) }, { k: 'PURPOSE', v: dc.purpose || '—' }, { k: 'PAID BY', v: dc.paidBy === 'own' ? 'Own pocket — to be reimbursed' : 'Company card — record only' }, { k: 'REVIEWER', v: dc.reviewer ? nm(dc.reviewer) : '—' }],
      lines: dc.lines.map(l => { const fl = this.lineFlags(l).filter(f => !f.block); return { merchant: l.merchant, cat: l.cat, desc: l.desc || '—', dateLabel: dl(l.date), amount: rm(l.amount), flags: fl, hasFlags: fl.length > 0, receipts: l.receipts.map(r => ({ name: r.name, url: r.url, isImg: r.isImg, notImg: !r.isImg, open: () => this.setState({ lightbox: r }) })) }; }),
      canReview: founder && dc.by !== me && dc.status === 'pending', selfNote: founder && dc.by === me && dc.status === 'pending', canPay: founder && dc.status === 'approved',
      comment: s.cComment, setComment: (e) => this.setState({ cComment: e.target.value }),
      approve: () => this.claimReview(dc.id, true), reject: () => this.claimReview(dc.id, false), pay: () => this.claimPay(dc.id), trail: dc.trail };
  }

  // reports
  const rvm = (r) => { const sv = this.SEV[r.sev], imgs = r.images.filter(i => i.isImg); return { id: r.id, title: r.title, type: r.type, sevLabel: r.sev.toUpperCase(), sevFg: sv.fg, sevBg: sv.bg, statusLabel: r.status.toUpperCase(), statusFg: this.RST[r.status].fg, byName: nm(r.by), dateLabel: dl(r.date), unit: r.unit, excerpt: r.body.length > 150 ? r.body.slice(0, 150) + '…' : r.body, thumbs: imgs.slice(0, 3).map(i => ({ url: i.url })), more: imgs.length > 3 ? '+' + (imgs.length - 3) : '', hasThumbs: imgs.length > 0, photoCount: r.images.length + (r.images.length === 1 ? ' photo' : ' photos'), open: () => this.setState({ repId: r.id }) }; };
  const inP = (r) => s.rPeriod === 'all' || this.daysAgo(r.date) <= Number(s.rPeriod);
  const pr = s.reports.filter(inP);
  const openN = pr.filter(r => r.status !== 'Resolved').length, highOpen = pr.filter(r => r.sev === 'High' && r.status !== 'Resolved').length, withPh = pr.filter(r => r.images.length).length;
  const weeks = []; let mx = 1;
  for (let i = 7; i >= 0; i--) { const n = s.reports.filter(r => { const d = this.daysAgo(r.date); return d >= i * 7 && d < i * 7 + 7; }).length; weeks.push({ raw: n, label: dl(this.shiftDay(this.TODAY, -(i * 7 + 6))).slice(0, 6) }); mx = Math.max(mx, n); }
  weeks.forEach(w => { w.n = String(w.raw); w.h = Math.round(w.raw / mx * 130) + 'px'; w.bg = w.raw === mx ? '#097c3e' : '#80cc28'; });
  const typeN = this.REP_TYPES.map(t => ({ label: t, raw: pr.filter(r => r.type === t).length })), maxT = Math.max.apply(null, typeN.map(x => x.raw).concat([1]));
  const segCol = { 'Open': '#d9a53a', 'In review': '#12241a', 'Resolved': '#097c3e' };
  const segs = this.REP_STATUS.map(t => { const n = pr.filter(r => r.status === t).length; return { label: t, n, pct: (pr.length ? n / pr.length * 100 : 0) + '%', bg: segCol[t] }; });
  const rcount = {}; pr.forEach(r => { rcount[r.by] = (rcount[r.by] || 0) + 1; });
  const reporters = Object.keys(rcount).sort((a, b) => rcount[b] - rcount[a]).slice(0, 4).map(id => ({ name: nm(id), initials: ini(id), n: rcount[id] + (rcount[id] === 1 ? ' report' : ' reports') }));
  const rf = s.rf;
  const setRf = (p) => this.setState(st => ({ rf: Object.assign({}, st.rf, p) }));
  const addImgs = (rs) => this.setState(st => ({ rf: Object.assign({}, st.rf, { images: st.rf.images.concat(rs) }) }));
  const q = (s.rq || '').toLowerCase();
  const allR = s.reports.filter(r => (s.rType === 'all' || r.type === s.rType) && (s.rStatus === 'all' || r.status === s.rStatus) && (!q || (r.title + ' ' + r.body).toLowerCase().indexOf(q) >= 0));
  const dr = s.reports.find(r => r.id === s.repId);
  let rdet = { images: [], trail: [] };
  if (dr) {
    const sv = this.SEV[dr.sev];
    rdet = Object.assign(rvm(dr), { sevBg: sv.bg, sevFg: sv.fg, body: dr.body, status: dr.status, hasImages: dr.images.length > 0,
      images: dr.images.map(i => ({ url: i.url, isImg: i.isImg, cap: i.cap || i.name, open: () => this.setState({ lightbox: i }) })),
      setStatus: (e) => { const v = e.target.value; this.setState(st => ({ reports: st.reports.map(x => x.id === dr.id ? Object.assign({}, x, { status: v, log: x.log.concat([{ t: 'Status set to ' + v + ' by ' + nm(st.me), d: this.stamp(), dot: '#097c3e' }]) }) : x) })); },
      trail: [{ t: 'Filed by ' + nm(dr.by), d: dl(dr.date), dot: '#80cc28' }].concat(dr.log) });
  }
  const ex = s.ex, exl = this.exportList();
  const setEx = (p) => this.setState(st => ({ ex: Object.assign({}, st.ex, p) }));
  const groups = [];
  exl.forEach(r => { let g = groups[groups.length - 1]; if (!g || g.iso !== r.date) { g = { iso: r.date, label: dl(r.date).toUpperCase(), entries: [] }; groups.push(g); } const sv = this.SEV[r.sev], ims = ex.images ? r.images.filter(i => i.isImg).map(i => ({ url: i.url, cap: i.cap || '' })) : []; g.entries.push({ id: r.id, title: r.title, type: r.type, sevLabel: r.sev.toUpperCase() + ' SEVERITY', sevFg: sv.fg, statusLabel: r.status.toUpperCase(), statusFg: this.RST[r.status].fg, byName: nm(r.by), unit: r.unit, body: r.body, images: ims, hasImages: ims.length > 0 }); });
  const exPhotos = exl.reduce((t, r) => t + r.images.filter(i => i.isImg).length, 0);
  const FN = { html: 'A single .html file with all images embedded. Opens in any browser.', pdf: 'Opens the print dialog — choose Save as PDF. Images and page breaks are kept.', word: 'A .doc file with images embedded. Opens and edits in Microsoft Word.' };
  const exBtn = { html: 'DOWNLOAD HTML', pdf: 'PRINT / SAVE AS PDF', word: 'DOWNLOAD WORD (.DOC)' };

  // admin
  const uq = (s.uq || '').toLowerCase();
  const avFor = (u) => ({ avBg: u.role === 'System admin' ? '#12241a' : (u.role === 'Founder' ? '#097c3e' : '#edf5e8'), avFg: u.role === 'Staff' ? '#12241a' : '#ffffff' });
  const aduIni = (u) => u.name.split(' ').map(w => w[0]).slice(0, 2).join('');
  const adRows = s.users.filter(u => !uq || (u.name + ' ' + u.email).toLowerCase().indexOf(uq) >= 0).map(u => Object.assign({ name: u.name, email: u.email, initials: aduIni(u), role: u.role, setRole: (e) => this.adminRole(u.id, e.target.value), activeBg: u.active ? '#097c3e' : '#c9d6c6', activeKnob: u.active ? '21px' : '3px', statusLabel: u.active ? 'Active' : 'Deactivated', toggleActive: () => this.adminActive(u.id), remove: () => this.adminRemove(u.id), mods: this.MODS.filter(m => u.mods[m.id]).map(m => ({ label: m.label })) }, avFor(u)));

  const rpPeriods = [['7', '7 days'], ['30', '30 days'], ['90', '90 days'], ['all', 'All time']].map(([k, label]) => Object.assign({ label, pick: () => this.setState({ rPeriod: k }) }, chip(s.rPeriod === k)));
  return {
    sideW: s.isMobile ? (s.navOpen ? '248px' : '0px') : ((s.navLock || s.navOpen) ? '248px' : '20px'),
    navEnter: this.navEnter, navLeave: this.navLeave, navToggle: this.navToggle,
    hasSub: !!(mod && SUB[mod]), subTitle: SUBT[mod] || '', subIcon: this.modIcon(mod), subGroups,
    showInbox: false,
    meId: me, setMe: this.setMe, showPersona: this.personaSwitch,
    personaOptions: s.users.filter(u => u.active).map(u => ({ id: u.id, label: u.name.split(' ')[0] + ' · ' + u.role })),
    stop: (e) => e.stopPropagation(),
    isNone: rt === 'none',
    isClOverview: rt === 'cl-overview', isClNew: rt === 'cl-new', isClMine: rt === 'cl-mine', isClReview: rt === 'cl-review' && founder,
    isRpDash: rt === 'rp-dash', isRpNew: rt === 'rp-new', isRpAll: rt === 'rp-all', isRpExport: rt === 'rp-export',
    isAdUsers: rt === 'ad-users', isAdAccess: rt === 'ad-access', isAdLog: rt === 'ad-log',
    goClNew: this.go('cl-new'), goClMine: this.go('cl-mine'), goRpAll: this.go('rp-all'),

    clStats: [
      Object.assign({ label: founder ? 'AWAITING REVIEW' : 'IN REVIEW', value: String(pend.length), note: rm(sum(pend)) + ' pending', color: pend.length ? '#8a5a00' : '#097c3e' }, light),
      Object.assign({ label: 'APPROVED, UNPAID', value: rm(sum(appr)).replace('RM ', 'RM'), note: appr.length + (appr.length === 1 ? ' claim' : ' claims') + ' queued for payout', color: '#ffffff' }, green),
      Object.assign({ label: 'PAID OUT', value: rm(sum(paid)).replace('RM ', 'RM'), note: paid.length + ' settled', color: '#12241a' }, light),
      Object.assign({ label: 'REJECTED', value: String(rej.length), note: rej.length ? 'Fix and resubmit' : 'None', color: rej.length ? '#b3261e' : '#6b7f71' }, light)
    ],
    clCatBars: catTot.map(c => ({ label: c.label, total: rm(c.raw), pct: Math.round(c.raw / maxC * 100) + '%' })), clCatEmpty: catTot.length === 0,
    clPolicy: [{ t: 'Every item needs a receipt — a clear photo or PDF.' }, { t: 'Claim within 60 days of the receipt date.' }, { t: 'Meals above RM60 per item are flagged for the reviewer.' }, { t: 'A founder reviews each claim; founders cannot review their own.' }, { t: 'Approved claims are paid in the next payout run.' }],
    clRecent: vis.slice(0, 5).map(cvm), clRecentEmpty: vis.length === 0,
    cfv: { title: cf.title, purpose: cf.purpose, ownBg: cf.paidBy === 'own' ? '#097c3e' : '#f7faf4', ownFg: cf.paidBy === 'own' ? '#ffffff' : '#12241a', cardBg: cf.paidBy === 'card' ? '#097c3e' : '#f7faf4', cardFg: cf.paidBy === 'card' ? '#ffffff' : '#12241a', total: rm(cfTotal), summary: cf.lines.length + (cf.lines.length === 1 ? ' item · ' : ' items · ') + cf.lines.reduce((t, l) => t + l.receipts.length, 0) + ' receipts attached' + (cf.paidBy === 'own' ? ' · reimbursable' : ''), allClear: checks.length === 0, op: blocks.length ? '.55' : '1', submitLabel: 'SUBMIT CLAIM · ' + rm(cfTotal) },
    cfChecks: checks,
    cfSetTitle: (e) => setCf({ title: e.target.value }), cfSetPurpose: (e) => setCf({ purpose: e.target.value }),
    cfPaidOwn: () => setCf({ paidBy: 'own' }), cfPaidCard: () => setCf({ paidBy: 'card' }),
    cfAddLine: () => this.setState(st => ({ cf: Object.assign({}, st.cf, { lines: st.cf.lines.concat([this.blankLine()]) }) })),
    cfSubmit: this.cfSubmit,
    clCatOptions: opt(this.CL_CATS),
    cfLines: cf.lines.map((l, i) => { const fl = allFl[i]; return {
      n: String(i + 1).padStart(2, '0'), date: l.date, cat: l.cat, merchant: l.merchant, desc: l.desc, amount: l.amount, canRemove: cf.lines.length > 1,
      setDate: (e) => setL(l.id, { date: e.target.value }), setCat: (e) => setL(l.id, { cat: e.target.value }), setMerchant: (e) => setL(l.id, { merchant: e.target.value }), setDesc: (e) => setL(l.id, { desc: e.target.value }), setAmount: (e) => setL(l.id, { amount: e.target.value }),
      remove: () => this.setState(st => ({ cf: Object.assign({}, st.cf, { lines: st.cf.lines.filter(x => x.id !== l.id) }) })),
      receipts: l.receipts.map((r, j) => ({ name: r.name, url: r.url, isImg: r.isImg, notImg: !r.isImg, open: () => this.setState({ lightbox: r }), remove: () => setL(l.id, { receipts: l.receipts.filter((_, x) => x !== j) }) })),
      onFiles: (e) => { const fs = e.target.files; this.ingest(fs).then(rs => addR(l.id, rs)); e.target.value = ''; },
      onDrop: (e) => { e.preventDefault(); this.ingest(e.dataTransfer.files).then(rs => addR(l.id, rs)); }, onOver: (e) => e.preventDefault(),
      flags: fl.map(f => ({ t: f.t, fg: f.block ? '#b3261e' : '#8a5a00', bg: f.block ? '#fdeceb' : '#fdf3e0' })), hasFlags: fl.length > 0 }; }),
    clFilters: [['all', 'All'], ['pending', 'Pending'], ['approved', 'Approved'], ['paid', 'Paid'], ['rejected', 'Rejected']].map(([k, label]) => Object.assign({ label, pick: () => this.setState({ cFilter: k }) }, chip(s.cFilter === k))),
    clMine: mine.map(cvm), clMineEmpty: mine.length === 0,
    clQueue: queue.map(cvm), clQueueEmpty: queue.length === 0, clReady: ready.map(cvm), clReadyEmpty: ready.length === 0,
    hasClaim: !!dc, cdet, closeClaim: () => this.setState({ claimId: null }),
    hasLb: !!s.lightbox && !!s.lightbox.isImg, lb: s.lightbox ? { url: s.lightbox.url, name: s.lightbox.cap || s.lightbox.name } : { url: '', name: '' }, closeLb: () => this.setState({ lightbox: null }),

    rpPeriods,
    rpStats: [
      Object.assign({ label: 'REPORTS', value: String(pr.length), note: 'In the selected period', color: '#ffffff' }, green),
      Object.assign({ label: 'NOT RESOLVED', value: String(openN), note: 'Open or in review', color: openN ? '#8a5a00' : '#097c3e' }, light),
      Object.assign({ label: 'HIGH SEVERITY OPEN', value: String(highOpen), note: highOpen ? 'Needs attention' : 'Nothing urgent', color: highOpen ? '#b3261e' : '#097c3e' }, light),
      Object.assign({ label: 'WITH PHOTOS', value: (pr.length ? Math.round(withPh / pr.length * 100) : 0) + '%', note: withPh + ' of ' + pr.length + ' reports', color: '#12241a' }, light)
    ],
    rpWeeks: weeks, rpTypeBars: typeN.map(t => ({ label: t.label, n: String(t.raw), pct: Math.round(t.raw / maxT * 100) + '%' })), rpStatusSegs: segs.map(g => ({ label: g.label, n: String(g.n), pct: g.pct, bg: g.bg })), rpReporters: reporters,
    rpRecent: s.reports.slice(0, 4).map(rvm),
    rfv: { title: rf.title, body: rf.body, unit: rf.unit, date: rf.date, previewTitle: rf.title || 'Untitled report', previewMeta: rf.type + ' · ' + rf.sev + ' severity · ' + rf.unit + ' · ' + rf.images.length + (rf.images.length === 1 ? ' photo' : ' photos') },
    rfTypes: this.REP_TYPES.map(t => Object.assign({ label: t, pick: () => setRf({ type: t }) }, chip(rf.type === t))),
    rfSevs: this.REP_SEVS.map(t => Object.assign({ label: t, pick: () => setRf({ sev: t }) }, chip(rf.sev === t))),
    rpUnits: opt(this.REP_UNITS),
    rfSetTitle: (e) => setRf({ title: e.target.value }), rfSetBody: (e) => setRf({ body: e.target.value }), rfSetUnit: (e) => setRf({ unit: e.target.value }), rfSetDate: (e) => setRf({ date: e.target.value }),
    rfImages: rf.images.map((im, j) => ({ name: im.name, url: im.url, isImg: im.isImg, notImg: !im.isImg, cap: im.cap, open: () => this.setState({ lightbox: im }), remove: () => setRf({ images: rf.images.filter((_, x) => x !== j) }), setCap: (e) => { const v = e.target.value; this.setState(st => ({ rf: Object.assign({}, st.rf, { images: st.rf.images.map((x, k) => k === j ? Object.assign({}, x, { cap: v }) : x) }) })); } })),
    rfOnFiles: (e) => { const fs = e.target.files; this.ingest(fs).then(addImgs); e.target.value = ''; },
    rfDrop: (e) => { e.preventDefault(); this.ingest(e.dataTransfer.files).then(addImgs); }, rfOver: (e) => e.preventDefault(),
    rfSubmit: this.rfSubmit,
    rq: s.rq, rType: s.rType, rStatus: s.rStatus,
    setRq: (e) => this.setState({ rq: e.target.value }), setRType: (e) => this.setState({ rType: e.target.value }), setRStatus: (e) => this.setState({ rStatus: e.target.value }),
    rpTypeFilter: [{ id: 'all', label: 'All types' }].concat(this.REP_TYPES.map(t => ({ id: t, label: t }))),
    rpStatusFilter: [{ id: 'all', label: 'All statuses' }].concat(this.REP_STATUS.map(t => ({ id: t, label: t }))),
    rpSevFilter: [{ id: 'all', label: 'All severity' }].concat(this.REP_SEVS.map(t => ({ id: t, label: t }))),
    rpStatusOptions: opt(this.REP_STATUS),
    rpAll: allR.map(rvm), rpAllCount: String(allR.length), rpAllEmpty: allR.length === 0,
    hasRep: !!dr, rdet, closeRep: () => this.setState({ repId: null }),

    ex,
    exSetFrom: (e) => setEx({ from: e.target.value }), exSetTo: (e) => setEx({ to: e.target.value }), exSetType: (e) => setEx({ type: e.target.value }), exSetStatus: (e) => setEx({ status: e.target.value }), exSetSev: (e) => setEx({ sev: e.target.value }),
    exSetImages: (e) => setEx({ images: e.target.checked }), exSetSummary: (e) => setEx({ summary: e.target.checked }),
    exPresets: [['7', 'Last 7 days', this.shiftDay(this.TODAY, -6), this.TODAY], ['30', 'Last 30 days', this.shiftDay(this.TODAY, -29), this.TODAY], ['m', 'This month', this.TODAY.slice(0, 8) + '01', this.monthEnd(this.TODAY)], ['all', 'All time', s.reports.reduce((m, r) => r.date < m ? r.date : m, this.TODAY), this.TODAY]].map(([k, label, from, to]) => ({ label, pick: () => setEx({ from, to }) })),
    exFormats: [['html', 'HTML'], ['pdf', 'PDF'], ['word', 'WORD']].map(([k, label]) => Object.assign({ label, pick: () => setEx({ format: k }) }, chip(ex.format === k))),
    exFormatNote: FN[ex.format], exButton: exBtn[ex.format] + ' · ' + exl.length + (exl.length === 1 ? ' REPORT' : ' REPORTS'), doExport: this.doExport,
    exRange: dl(ex.from) + ' – ' + dl(ex.to), exGenerated: dl(this.TODAY),
    exTiles: [{ v: String(exl.length), k: 'REPORTS' }, { v: String(exPhotos), k: 'PHOTOS' }, { v: String(exl.filter(r => r.sev === 'High').length), k: 'HIGH SEVERITY' }, { v: String(exl.filter(r => r.status !== 'Resolved').length), k: 'NOT RESOLVED' }],
    exGroups: groups, exEmpty: exl.length === 0,

    adStats: [
      Object.assign({ label: 'USERS', value: String(s.users.length), note: s.users.filter(u => u.active).length + ' active', color: '#ffffff' }, green),
      Object.assign({ label: 'SYSTEM ADMINS', value: String(s.users.filter(u => u.role === 'System admin').length), note: 'Can manage users and access', color: '#12241a' }, light),
      Object.assign({ label: 'DEACTIVATED', value: String(s.users.filter(u => !u.active).length), note: 'Cannot sign in', color: '#6b7f71' }, light)
    ],
    uq: s.uq, setUq: (e) => this.setState({ uq: e.target.value }),
    adRoles: opt(['Founder', 'Staff', 'System admin']), adRows, adEmpty: adRows.length === 0,
    nuser: s.nuser,
    setNuName: (e) => this.setState(st => ({ nuser: Object.assign({}, st.nuser, { name: e.target.value }) })), setNuEmail: (e) => this.setState(st => ({ nuser: Object.assign({}, st.nuser, { email: e.target.value }) })), setNuRole: (e) => this.setState(st => ({ nuser: Object.assign({}, st.nuser, { role: e.target.value }) })),
    addUser: this.addUser,
    adMods: this.MODS.map(m => ({ label: m.label, desc: m.desc })),
    adMatrix: s.users.map(u => Object.assign({ name: u.name, initials: aduIni(u), role: u.role, inactive: u.active ? '' : ' · deactivated', op: u.active ? '1' : '.55', cells: this.MODS.map(m => { const on = !!u.mods[m.id], lock = u.id === me && m.id === 'admin'; return { bg: on ? '#097c3e' : '#c9d6c6', knob: on ? '21px' : '3px', cursor: lock ? 'not-allowed' : 'pointer', toggle: () => this.adminMod(u.id, m.id) }; }) }, avFor(u))),
    adLog: s.audit
  };
}
