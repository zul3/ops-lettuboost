import { isSupabase } from '../../lib/supabase.js';

// View model: shell, navigation and payments. Merges the other view models.
// Builds the flat values object the screens render from. Runs with `this` bound to the OpsApp instance.

export function renderVals() {
  const s = this.state;
  const me = s.me;
  const rt = (this.modOf(s.route) && !this.hasMod(this.modOf(s.route))) ? 'none' : s.route;
  const thisMonth = this.TODAY.slice(0, 7);
  const reqs = s.requests;
  const rows = reqs.map(r => this.vm(r));
  const byId = (id) => reqs.find(r => r.id === id);

  const nav = [
    { title: 'FINANCIAL', items: [['dashboard', 'Payments'], ['cl-overview', 'Claims'], ['sa-dash', 'Sales & orders']] },
    { title: 'PEOPLE', items: [['hr-dir', 'Human resources']] },
    { title: 'OPERATIONS', items: [['rp-dash', 'Reports'], ['st-dash', 'Stock'], ['pu-dash', 'Purchasing']] },
    { title: 'WORK', items: [['tk-board', 'Tasks'], ['pp-list', 'Project plan']] },
    { title: 'SYSTEM', items: [['ad-users', 'System admin']] }
  ].map(g => ({ title: g.title, items: g.items.filter(([k]) => this.hasMod(this.modOf(k))) })).filter(g => g.items.length);
  const myQueueReqs = reqs.filter(r => this.isFounder(r.payeeId) && this.missing(r).indexOf(me) >= 0);
  const unread = s.notifications.filter(n => n.unread).length;

  const bdg = (k) => { const m = this.modOf(k); return m === 'payments' ? myQueueReqs.length + unread : (m === 'claims' && this.isFounder(me) ? s.claims.filter(c => c.status === 'pending' && c.by !== me).length : 0); };
  const navGroups = nav.map(g => {
    const groupCount = g.items.reduce((t, [k]) => t + bdg(k), 0);
    const open = s.openGroup === g.title;
    return {
    title: g.title,
    open,
    count: (!open && groupCount) ? String(groupCount) : '',
    caret: open ? 'rotate(0deg)' : 'rotate(-90deg)',
    headBg: open ? 'rgba(255,255,255,.1)' : 'transparent',
    toggle: () => this.setState(st => ({ openGroup: st.openGroup === g.title ? '' : g.title })),
    items: g.items.map(([k, label]) => {
      const on = this.modOf(rt) === this.modOf(k);
      const bn = bdg(k); const badge = bn ? String(bn) : '';
      return {
        label, badge, go: this.go(k), icon: this.modIcon(this.modOf(k)),
        bg: on ? 'rgba(255,255,255,.17)' : 'transparent',
        fg: on ? '#ffffff' : 'rgba(255,255,255,.74)',
        fw: on ? '800' : '500',
        dot: on ? '#80cc28' : 'rgba(255,255,255,.3)'
      };
    })
    };
  });

  const monthReqs = reqs.filter(r => this.monthOf(r) === thisMonth && this.approved(r));
  const monthTotal = monthReqs.reduce((t, r) => t + this.finalAmount(r), 0);
  const paidTotal = monthReqs.filter(r => r.paid).reduce((t, r) => t + this.finalAmount(r), 0);
  const awaiting = reqs.filter(r => !this.approved(r));

  const catTotals = this.CATS.map(c => {
    const list = monthReqs.filter(r => r.cat === c.id);
    const total = list.reduce((t, r) => t + this.finalAmount(r), 0);
    return { id: c.id, label: c.label, count: list.length + (list.length === 1 ? ' payment' : ' payments'), raw: total, total: this.rm(total) };
  });
  const maxCat = Math.max.apply(null, catTotals.map(c => c.raw).concat([1]));

  const light = { cardBg: '#ffffff', labelFg: '#6b7f71', noteFg: '#6b7f71' };
  const green = { cardBg: '#097c3e', labelFg: 'rgba(255,255,255,.66)', noteFg: 'rgba(255,255,255,.78)' };

  const f = s.f;
  const fTask = this.task(f.taskId);
  const previewAmt = this.baseAmount(this.fReq(f));
  const payee = this.emp(f.payeeId);
  const founderPayee = this.isFounder(f.payeeId);
  const otherTwo = this.FOUNDERS.filter(x => x !== f.payeeId && x !== me);

  const slipE = this.emp(s.slipEmp);
  const slipReqs = reqs.filter(r => r.payeeId === s.slipEmp && this.monthOf(r) === s.slipMonth && this.approved(r));
  const slipTotal = slipReqs.reduce((t, r) => t + this.finalAmount(r), 0);
  const months = Array.from(new Set(reqs.map(r => this.monthOf(r)).concat([thisMonth, s.slipMonth]))).sort().reverse();
  const cs = this.calcStat(slipE, slipTotal, !!s.zakatOn[s.slipEmp]);
  const zk = s.statutory.find(i => i.id === 'zakat' && i.on && i.types.indexOf(slipE.type) >= 0);
  const setSt = (id, patch) => this.setState(st => ({ statutory: st.statutory.map(x => x.id === id ? Object.assign({}, x, patch) : x) }));
  const ALLT = ['Director', 'Full time', 'Part time', 'Contract', 'Fellowship', 'Volunteer'];
  const stRow = (i) => ({
    name: i.name, note: i.note, on: i.on, rate: i.rate, cap: i.cap, relief: i.relief,
    isPct: i.mode === 'pct', showRate: i.mode !== 'pcb', isFixed: i.mode === 'fixed', isPcb: i.mode === 'pcb', isOpt: !!i.optional,
    unit: i.mode === 'fixed' ? 'RM' : '%', rateLabel: i.mode === 'fixed' ? 'AMOUNT (RM)' : 'RATE (%)',
    toggle: (e) => setSt(i.id, { on: e.target.checked }),
    setName: (e) => setSt(i.id, { name: e.target.value }),
    setRate: (e) => setSt(i.id, { rate: e.target.value }),
    setCap: (e) => setSt(i.id, { cap: e.target.value }),
    setRelief: (e) => setSt(i.id, { relief: e.target.value }),
    types: ALLT.map(t => { const on = i.types.indexOf(t) >= 0; return { label: t, bg: on ? '#097c3e' : '#f7faf4', fg: on ? '#ffffff' : '#6b7f71', toggle: () => setSt(i.id, { types: on ? i.types.filter(x => x !== t) : i.types.concat([t]) }) }; }),
    remove: () => { this.setState(st => ({ statutory: st.statutory.filter(x => x.id !== i.id) })); this.toastNow('Removed ' + i.name + '.'); }
  });

  const hRows = rows.filter(v => {
    const r = byId(v.id);
    if (s.hMonth !== 'all' && this.monthOf(r) !== s.hMonth) return false;
    if (s.hCat !== 'all' && r.cat !== s.hCat) return false;
    if (s.hStatus !== 'all' && this.statusOf(r) !== s.hStatus) return false;
    if (s.hq) {
      const q = s.hq.toLowerCase();
      if ((this.emp(r.payeeId).name + ' ' + r.note).toLowerCase().indexOf(q) < 0) return false;
    }
    return true;
  });
  const hTotal = hRows.reduce((t, v) => t + this.finalAmount(byId(v.id)), 0);

  const types = ['All', 'Director', 'Full time', 'Part time', 'Contract', 'Fellowship', 'Volunteer'];
  const empRows = s.employees.filter(e => s.empType === 'All' || e.type === s.empType).map(e => {
    const tot = reqs.filter(r => r.payeeId === e.id && this.monthOf(r) === thisMonth && this.approved(r)).reduce((t, r) => t + this.finalAmount(r), 0);
    return {
      name: e.name, email: e.email, type: e.type, unit: e.unit, initials: this.initials(e.id),
      term: (this.TERMS[e.type] || '—'), monthTotal: tot ? this.rm(tot) : '—',
      avBg: this.isFounder(e.id) ? '#097c3e' : '#edf5e8', avFg: this.isFounder(e.id) ? '#ffffff' : '#12241a',
      typeFg: this.isFounder(e.id) ? '#097c3e' : '#6b7f71',
      openSlip: () => this.setState({ route: 'payslips', slipEmp: e.id, slipMonth: thisMonth })
    };
  });

  const nSel = s.notifications.find(n => n.id === s.notifyId) || s.notifications[0] || null;
  const nReq = nSel ? byId(nSel.requestId) : null;
  const nAmt = nReq ? this.finalAmount(nReq) : 0;
  const needKey = nSel && nSel.kind === 'need_key';
  const mailBody = !nSel ? [] : (needKey
    ? [{ t: 'Hi ' + (nSel.to.length === 1 ? ((s.employees.find(e => e.email === nSel.to[0]) || s.users.find(u => u.email === nSel.to[0]) || { name: 'there' }).name.split(' ')[0]) : 'team') + ',' },
       { t: 'A payment request for ' + (nReq ? this.emp(nReq.payeeId).name : 'a founder') + ' is open. Because the payee is one of the three founders, they cannot set their own amount — you and the other founder each approve independently, and the average of your two numbers becomes the final payment.' },
       { t: 'Please approve with what you think is fair. Nothing is paid until both numbers are in.' }]
    : [{ t: 'Hi team,' },
       { t: 'A payment has been approved and is now queued for payout. Full basis and the approval trail are on the request.' },
       { t: nReq && this.isFounder(nReq.payeeId) ? 'This was a founder payment: the final figure is the average of the two independent approvals.' : 'This was approved by a single founder, which is all a staff payment needs.' }]);

  return Object.assign({
    rootRef: (n) => { this._root = n; },
    ...this.loginVals(),
    showSoon: true,
    soonItems: [{ label: 'Attendance' }, { label: 'Leave' }, { label: 'KPI reviews' }],
    soonOpen: s.openGroup === 'SOON',
    soonCaret: s.openGroup === 'SOON' ? 'rotate(0deg)' : 'rotate(-90deg)',
    soonHeadBg: s.openGroup === 'SOON' ? 'rgba(255,255,255,.1)' : 'transparent',
    toggleSoon: () => this.setState(st => ({ openGroup: st.openGroup === 'SOON' ? '' : 'SOON' })),
    navGroups,
    crumb: this.crumbOf(rt),
    pageTitle: (this.ROUTES[rt] || ['', ''])[1],
    meName: this.emp(me).name,
    goNotify: this.go('notify'), goDual: this.go('dual'), goHistory: this.go('history'), goTasks: this.go('tasks'),
    inboxCount: String(unread), inboxBg: unread ? '#80cc28' : '#edf5e8', inboxFg: '#12241a',
    isDash: rt === 'dashboard', isNew: rt === 'new', isApprovals: rt === 'approvals',
    isDual: rt === 'dual', isTasks: rt === 'tasks', isPayslip: rt === 'payslips',
    isEmployees: rt === 'employees', isHistory: rt === 'history', isNotify: rt === 'notify',
    isSettings: rt === 'settings',

    stats: [
      Object.assign({ label: 'APPROVED THIS MONTH', value: this.rm(monthTotal).replace('RM ', 'RM'), note: monthReqs.length + ' payments across ' + new Set(monthReqs.map(r => r.payeeId)).size + ' people', color: '#ffffff' }, green),
      Object.assign({ label: 'WAITING ON APPROVALS', value: String(awaiting.length), note: awaiting.length ? 'Founder payments mid-loop' : 'Loop is clear', color: awaiting.length ? '#8a5a00' : '#097c3e' }, light),
      Object.assign({ label: 'NEEDS YOU', value: String(myQueueReqs.length), note: 'Signed in as ' + this.first(me), color: myQueueReqs.length ? '#097c3e' : '#6b7f71' }, light),
      Object.assign({ label: 'PAID OUT', value: this.rm(paidTotal).replace('RM ', 'RM'), note: 'Settled of ' + this.rm(monthTotal), color: '#12241a' }, light)
    ],
    monthLabel: this.monthLabelOf(thisMonth),
    myQueue: myQueueReqs.map(r => this.vm(r)),
    queueEmpty: myQueueReqs.length === 0,
    catBars: catTotals.map(c => ({ label: c.label, count: c.count, total: c.total, pct: Math.round((c.raw / maxCat) * 100) + '%', color: c.id === 'custom' ? '#d9a53a' : (c.id === 'piece' ? '#80cc28' : '#097c3e') })),
    recent: rows.slice(0, 6),

    employeeOptions: s.employees.map(e => ({ id: e.id, label: e.name + ' — ' + e.type })),
    taskOptions: s.tasks.map(t => ({ id: t.id, label: t.name + ' · ' + this.rm(t.rate) + ' ' + t.unit })),
    catOptions: this.CATS.map(c => {
      const on = f.cat === c.id;
      const sub = c.id === 'piece' ? 'task × quantity' : (c.id === 'custom' ? 'any amount — careful' : this.rm(s.catRates[c.id]));
      return { label: c.label, sub, pick: () => this.setF({ cat: c.id }), bg: on ? '#097c3e' : '#f7faf4', fg: on ? '#ffffff' : '#12241a' };
    }),
    f: { payeeId: f.payeeId, taskId: f.taskId, qty: f.qty, custom: f.custom, cqty: f.cqty, uomId: f.uomId, note: f.note, isPiece: f.cat === 'piece', isCustom: f.cat === 'custom' },
    setPayee: (e) => this.setF({ payeeId: e.target.value }),
    setTask: (e) => this.setF({ taskId: e.target.value }),
    setQty: (e) => this.setF({ qty: e.target.value }),
    setCustom: (e) => this.setF({ custom: e.target.value }),
    setCqty: (e) => this.setF({ cqty: e.target.value }),
    setUom: (e) => this.setF({ uomId: e.target.value }),
    openUom: () => this.setState({ uomOpen: true }),
    closeUom: () => this.setState({ uomOpen: false }),
    uomOpen: s.uomOpen,
    uomSummary: s.uoms.map(u => u.name).join(' · '),
    uomOptions: s.uoms.map(u => ({ id: u.id, name: u.name })),
    customMath: (() => { const q = this.fReq(f); return q.cRate > 0 ? q.cQty + ' × ' + this.rm(q.cRate) + ' per ' + (q.uom || 'unit').toLowerCase() + ' = ' + this.rm(q.amount) : 'Enter a rate to see the total.'; })(),
    nu: s.nu,
    setNu: (e) => this.setState({ nu: e.target.value }),
    addUom: () => {
      const n = (this.state.nu || '').trim();
      if (!n) { this.toastNow('Type a unit name first.'); return; }
      if (this.state.uoms.some(u => u.name.toLowerCase() === n.toLowerCase())) { this.toastNow(n + ' already exists.'); return; }
      this.setState(st => ({ uoms: st.uoms.concat([{ id: 'u' + Date.now(), name: n }]), nu: '' }));
      this.toastNow('Added ' + n + ' to the units of measure.');
    },
    uomRows: s.uoms.map(u => ({
      name: u.name,
      usage: reqs.filter(r => r.uom === u.name).length + ' requests',
      setName: (e) => this.setState(st => ({ uoms: st.uoms.map(x => x.id === u.id ? Object.assign({}, x, { name: e.target.value }) : x) })),
      remove: () => {
        if (this.state.uoms.length <= 1) { this.toastNow('Keep at least one unit of measure.'); return; }
        this.setState(st => { const rest = st.uoms.filter(x => x.id !== u.id); return { uoms: rest, f: st.f.uomId === u.id ? Object.assign({}, st.f, { uomId: rest[0].id }) : st.f }; });
        this.toastNow('Removed ' + u.name + '. Past requests keep it.');
      }
    })),
    setNote: (e) => this.setF({ note: e.target.value }),
    payeeHint: founderPayee
      ? payee.name + ' is a founder — the two-key rule applies.'
      : payee.type + ' · ' + payee.unit + ' · paid as ' + (this.TERMS[payee.type] || '').toLowerCase(),
    pieceMath: fTask ? Number(f.qty || 0) + ' × ' + this.rm(fTask.rate) + ' ' + fTask.unit + ' = ' + this.rm(previewAmt) : '',
    previewAmount: previewAmt > 0 ? this.rm(previewAmt) : 'RM —',
    previewBasis: f.cat === 'piece' ? 'Piece rated' : (f.cat === 'custom' ? 'Custom, entered by hand' + (this.fReq(f).uom ? ' · per ' + this.fReq(f).uom.toLowerCase() : '') : this.catLabel(f.cat) + ' band'),
    previewRows: [
      { k: 'PAYEE', v: payee.name },
      { k: 'TYPE', v: payee.type + ' · ' + (this.TERMS[payee.type] || '—') },
      { k: 'BASIS', v: this.basisLine(this.fReq(f)) },
      { k: 'APPROVED BY', v: this.emp(me).name }
    ],
    ruleText: founderPayee
      ? (f.payeeId === me
        ? 'You cannot approve your own payment. One of the other two founders has to open it.'
        : 'Founder payee — your amount counts as one of two approvals. ' + otherTwo.map(x => this.first(x)).join(' and ') + ' will be emailed to approve, and the average of the two becomes final.')
      : 'Staff payment — one approval is enough. Submitting this approves it straight away and notifies the other two founders.',
    ruleBg: founderPayee ? '#fdf3e0' : '#edf5e8',
    ruleFg: founderPayee ? '#7a4f00' : '#0a5c2f',
    submit: this.submit,
    submitDisabled: false,
    submitOpacity: previewAmt > 0 ? '1' : '.55',
    submitLabel: founderPayee ? 'OPEN FOUNDER REQUEST →' : 'APPROVE →',

    approvalStats: [
      Object.assign({ label: 'OPEN REQUESTS', value: String(awaiting.length), note: 'Waiting on a second approval', color: awaiting.length ? '#8a5a00' : '#097c3e' }, light),
      Object.assign({ label: 'APPROVED, UNPAID', value: String(reqs.filter(r => this.approved(r) && !r.paid).length), note: this.rm(reqs.filter(r => this.approved(r) && !r.paid).reduce((t, r) => t + this.finalAmount(r), 0)) + ' queued', color: '#ffffff' }, green),
      Object.assign({ label: 'YOUR APPROVALS', value: String(reqs.filter(r => (r.keys || []).some(k => k.by === me)).length), note: 'Signed by ' + this.first(me), color: '#097c3e' }, light)
    ],
    awaitingList: awaiting.map(r => this.vm(r)),
    awaitingEmpty: awaiting.length === 0,
    approvedList: reqs.filter(r => this.approved(r)).slice(0, 8).map(r => this.vm(r)),

    ruleSteps: [
      { n: '01', t: 'A founder opens the request and approves an amount. For staff, that is the whole loop — approved immediately.' },
      { n: '02', t: 'If the payee is ' + (this.FOUNDERS.map(x => this.first(x)).join(', ').replace(/, ([^,]*)$/, ' or $1') || 'a founder') + ', that founder is locked out of their own request.' },
      { n: '03', t: 'The other two each get an email and approve independently — neither sees the other as a target to match.' },
      { n: '04', t: 'The average of the two numbers is the final payment, and all three get the approval email.' }
    ],
    founderRequests: reqs.filter(r => this.isFounder(r.payeeId)).map(r => {
      const v = this.vm(r);
      const keys = r.keys || [];
      v.slots = this.FOUNDERS.filter(x => x !== r.payeeId).map(fid => {
        const k = keys.find(x => x.by === fid);
        const isMe = fid === me;
        return {
          role: 'KEY ' + (this.FOUNDERS.filter(x => x !== r.payeeId).indexOf(fid) + 1) + (isMe ? ' — YOU' : ''),
          who: this.emp(fid).name,
          hasAmount: false, amount: '',
          hiddenFromPayee: !!k,
          canKey: !k && isMe, waiting: !k && !isMe,
          waitText: 'Emailed ' + this.emp(fid).email + ' — not approved yet',
          draft: s.drafts[r.id] || '',
          onDraft: (e) => this.setState(st => ({ drafts: Object.assign({}, st.drafts, { [r.id]: e.target.value }) })),
          commit: () => this.addKey(r.id, s.drafts[r.id]),
          bg: (!k && isMe) ? '#edf5e8' : '#f7faf4'
        };
      });
      v.avgMath = keys.length === 2
        ? 'Both approvals in — averaged and settled'
        : (keys.length === 1 ? 'One approval in — needs the second before it settles' : 'No approvals yet');
      return v;
    }),
    founderEmpty: reqs.filter(r => this.isFounder(r.payeeId)).length === 0,

    taskRows: s.tasks.map(t => ({
      name: t.name, unit: t.unit, rate: t.rate,
      usage: reqs.filter(r => r.taskId === t.id && r.cat === 'piece').length + ' requests',
      setName: (e) => this.setState(st => ({ tasks: st.tasks.map(x => x.id === t.id ? Object.assign({}, x, { name: e.target.value }) : x) })),
      setUnit: (e) => this.setState(st => ({ tasks: st.tasks.map(x => x.id === t.id ? Object.assign({}, x, { unit: e.target.value }) : x) })),
      setRate: (e) => this.setState(st => ({ tasks: st.tasks.map(x => x.id === t.id ? Object.assign({}, x, { rate: Number(e.target.value) }) : x) })),
      remove: () => { this.setState(st => ({ tasks: st.tasks.filter(x => x.id !== t.id) })); this.toastNow('Removed ' + t.name + ' from the rate card.'); }
    })),
    nt: s.nt,
    setNtName: (e) => this.setState(st => ({ nt: Object.assign({}, st.nt, { name: e.target.value }) })),
    setNtUnit: (e) => this.setState(st => ({ nt: Object.assign({}, st.nt, { unit: e.target.value }) })),
    setNtRate: (e) => this.setState(st => ({ nt: Object.assign({}, st.nt, { rate: e.target.value }) })),
    addTask: () => {
      const nt = this.state.nt;
      if (!nt.name || !(Number(nt.rate) > 0)) { this.toastNow('A task needs a name and a rate above zero.'); return; }
      this.setState(st => ({ tasks: st.tasks.concat([{ id: 't' + Date.now(), name: nt.name, unit: nt.unit || 'per piece', rate: Number(nt.rate) }]), nt: { name: '', unit: '', rate: '' } }));
      this.toastNow('Added ' + nt.name + ' at ' + this.rm(nt.rate) + '. It is selectable in new requests now.');
    },

    slipEmp: s.slipEmp, slipMonth: s.slipMonth,
    setSlipEmp: (e) => this.setState({ slipEmp: e.target.value }),
    setSlipMonth: (e) => this.setState({ slipMonth: e.target.value }),
    monthOptions: months.map(m => ({ id: m, label: this.monthLabelOf(m) })),
    printSlip: () => window.print(),
    slipRef: 'PS/' + s.slipMonth.replace('-', '') + '/' + s.slipEmp.toUpperCase(),
    slipIssued: this.dateLabel(this.TODAY),
    slipMeta: [
      { k: 'EMPLOYEE', v: slipE.name },
      { k: 'TYPE', v: slipE.type },
      { k: 'UNIT', v: slipE.unit },
      { k: 'PAY PERIOD', v: this.monthLabelOf(s.slipMonth) }
    ],
    slipItems: slipReqs.map(r => ({
      desc: r.note, sub: r.id + ' · ' + this.dateLabel(r.date),
      basis: this.catLabel(r.cat) + (r.cat === 'custom' && r.uom ? ' · ' + r.cQty + ' ' + r.uom.toLowerCase() : '') + (r.cat === 'piece' ? ' · ' + r.qty + ' ' + (this.task(r.taskId) ? this.task(r.taskId).unit.replace('per ', '') : 'units') : ''),
      amount: this.rm(this.finalAmount(r))
    })),
    slipEmpty: slipReqs.length === 0,
    slipTotal: this.rm(slipTotal),
    slipTotalLabel: 'GROSS ' + (this.TERMS[slipE.type] || 'PAYMENT').toUpperCase(),
    slipDed: cs.ded.map(x => ({ name: x.name, basis: x.basis, amount: '− ' + this.rm(x.n) })),
    slipHasDed: cs.ded.length > 0, slipDedTotal: '− ' + this.rm(cs.totalDed),
    slipNet: this.rm(cs.net),
    slipEr: cs.er.map(x => ({ name: x.name, basis: x.basis, amount: this.rm(x.n) })),
    slipHasEr: cs.er.length > 0, slipErTotal: this.rm(cs.erTotal),
    slipZakatShow: !!zk && slipTotal > 0, zakatChecked: !!s.zakatOn[s.slipEmp],
    onZakat: (e) => { const v = e.target.checked; this.setState(st => ({ zakatOn: Object.assign({}, st.zakatOn, { [st.slipEmp]: v }) })); },
    statOpen: s.statOpen, openStat: () => this.setState({ statOpen: true }), closeStat: () => this.setState({ statOpen: false }),
    statSummary: s.statutory.filter(i => i.on).length + ' of ' + s.statutory.length + ' active',
    statEmpRows: s.statutory.filter(i => i.side === 'employee').map(stRow),
    statErRows: s.statutory.filter(i => i.side === 'employer').map(stRow),
    ns: s.ns,
    setNsName: (e) => this.setState(st => ({ ns: Object.assign({}, st.ns, { name: e.target.value }) })),
    setNsSide: (e) => this.setState(st => ({ ns: Object.assign({}, st.ns, { side: e.target.value }) })),
    setNsMode: (e) => this.setState(st => ({ ns: Object.assign({}, st.ns, { mode: e.target.value }) })),
    setNsRate: (e) => this.setState(st => ({ ns: Object.assign({}, st.ns, { rate: e.target.value }) })),
    addStat: () => {
      const n = this.state.ns;
      if (!n.name.trim() || !(Number(n.rate) > 0)) { this.toastNow('A deduction needs a name and a value above zero.'); return; }
      this.setState(st => ({ statutory: st.statutory.concat([{ id: 's' + Date.now(), name: n.name.trim(), note: 'Custom item', side: n.side, mode: n.mode, rate: n.rate, cap: '', on: true, types: ['Director', 'Full time', 'Part time', 'Contract'] }]), ns: { name: '', side: n.side, mode: n.mode, rate: '' } }));
      this.toastNow('Added ' + n.name.trim() + '. It now appears on matching payslips.');
    },
    slipApprovers: slipReqs.length ? Array.from(new Set(slipReqs.flatMap(r => (r.keys || []).map(k => this.emp(k.by).name)))).join(', ') : '—',

    typeFilters: types.map(t => {
      const on = s.empType === t;
      return { label: t, pick: () => this.setState({ empType: t }), bg: on ? '#097c3e' : '#ffffff', fg: on ? '#ffffff' : '#12241a' };
    }),
    empRows, empMonthCol: this.monthLabelOf(thisMonth).toUpperCase(),

    hq: s.hq, hMonth: s.hMonth, hCat: s.hCat, hStatus: s.hStatus,
    setHq: (e) => this.setState({ hq: e.target.value }),
    setHMonth: (e) => this.setState({ hMonth: e.target.value }),
    setHCat: (e) => this.setState({ hCat: e.target.value }),
    setHStatus: (e) => this.setState({ hStatus: e.target.value }),
    monthFilterOptions: [{ id: 'all', label: 'All months' }].concat(months.map(m => ({ id: m, label: this.monthLabelOf(m) }))),
    catFilterOptions: [{ id: 'all', label: 'All categories' }].concat(this.CATS.map(c => ({ id: c.id, label: c.label }))),
    statusFilterOptions: [{ id: 'all', label: 'All statuses' }, { id: 'awaiting', label: 'Awaiting keys' }, { id: 'approved', label: 'Approved' }, { id: 'paid', label: 'Paid' }],
    historyRows: hRows, historyEmpty: hRows.length === 0, historyTotal: this.rm(hTotal),

    notifyRows: s.notifications.map(n => ({
      subject: n.subject, time: n.time, to: n.to.join(', '),
      preview: n.kind === 'need_key' ? 'Two of three keys are needed — your number is one of them.' : 'Approved and queued for payout.',
      dot: n.id === s.notifyId ? '#097c3e' : (n.unread ? '#80cc28' : '#d7e0d6'),
      bg: n.id === s.notifyId ? '#edf5e8' : '#ffffff',
      fw: n.unread ? '800' : '600',
      open: () => this.setState(st => ({ notifyId: n.id, notifications: st.notifications.map(x => x.id === n.id ? Object.assign({}, x, { unread: false }) : x) }))
    })),
    markAllRead: () => this.setState(st => ({ notifications: st.notifications.map(x => Object.assign({}, x, { unread: false })) })),
    mailHead: nSel ? [
      { k: 'FROM', v: 'LettuBoost Payments <payments@lettuboost.com>' },
      { k: 'TO', v: nSel.to.join(', ') },
      { k: 'SUBJECT', v: nSel.subject }
    ] : [],
    mailTitle: nSel ? (needKey ? 'Your approval is needed' : 'Payment approved') : 'No notification selected',
    mailBody,
    mailFacts: nReq ? [
      { k: 'REQUEST', v: nReq.id },
      { k: 'PAYEE', v: this.emp(nReq.payeeId).name + ' · ' + this.emp(nReq.payeeId).type },
      { k: 'BASIS', v: this.basisLine(nReq) },
      { k: needKey ? 'APPROVALS IN' : 'FINAL AMOUNT', v: needKey ? ((nReq.keys || []).length + ' of ' + this.needed(nReq).length) : this.rm(nAmt) }
    ] : [],
    mailCta: needKey ? 'OPEN AND APPROVE YOUR AMOUNT' : 'VIEW THE PAYMENT RECORD',

    rateRows: [['low', 'Low'], ['mid', 'Mid'], ['high', 'High'], ['vhigh', 'Very High']].map(([k, label]) => ({
      label, value: s.catRates[k],
      set: (e) => this.setState(st => ({ catRates: Object.assign({}, st.catRates, { [k]: Number(e.target.value) }) }))
    })),
    founderRows: this.FOUNDERS.map(id => ({ name: this.emp(id).name, email: this.emp(id).email, initials: this.initials(id) })),
    ruleCards: [
      { t: 'Staff payment — one approval', d: 'Any one of the three approves the amount and the request is approved on entry. The other two are emailed for visibility, not for sign-off.' },
      { t: 'Founder payment — two approvals, averaged', d: 'The payee is locked out. The other two approve independently and the average is final. Nothing is payable until both are in.' },
      { t: 'Custom amounts', d: 'Allowed but flagged, with the discuss-internally warning shown at entry and the basis printed on the payslip.' }
    ],
    techNotes: [
      { t: 'Stack: React (Vite) web app hosted on Vercel, with Supabase for sign-in, the Postgres database, file storage and live updates.' },
      { t: isSupabase ? 'Connected to Supabase. Every change is saved to the ops_* tables and pushed to everyone signed in.' : 'Demo mode: no Supabase keys are set, so data is kept in this browser only.' },
      { t: 'Payment tables: ops_employees, ops_piece_tasks, ops_payment_requests (approval keys inside each request), ops_notifications, ops_statutory, ops_settings.' },
      { t: 'Nav is grouped so the next modules — attendance, leave, inventory, KPI — drop in as new groups without touching this one.' }
    ],

    hasDetail: !!s.detailId,
    detail: (() => {
      const r = byId(s.detailId);
      if (!r) return { rows: [], trail: [] };
      const v = this.vm(r);
      const canKey = this.isFounder(r.payeeId) && this.missing(r).indexOf(me) >= 0;
      return Object.assign(v, {
        amountCaption: this.isFounder(r.payeeId) ? 'FINAL — AVERAGE OF TWO KEYS' : 'AMOUNT',
        rows: [
          { k: 'REQUEST', v: r.id },
          { k: 'BASIS', v: this.basisLine(r) },
          { k: 'NOTE', v: r.note },
          { k: 'UNIT', v: this.emp(r.payeeId).unit },
          { k: 'PAY TERM', v: (this.TERMS[this.emp(r.payeeId).type] || '—') },
          { k: 'RULE', v: this.isFounder(r.payeeId) ? 'Founder payee — two independent approvals, averaged' : 'Staff payee — single approval' }
        ],
        canKey, keyHelp: 'Approve with what you think is fair. It is averaged with ' + this.missing(r).filter(x => x !== me).concat(this.FOUNDERS.filter(x => x !== r.payeeId && x !== me)).slice(0, 1).map(x => this.first(x)) + "'s number.",
        draft: s.drafts[r.id] || '',
        onDraft: (e) => this.setState(st => ({ drafts: Object.assign({}, st.drafts, { [r.id]: e.target.value }) })),
        commit: () => this.addKey(r.id, s.drafts[r.id]),
        trail: [{ t: 'Request opened', d: this.dateLabel(r.date) + ' · ' + this.basisLine(r) }]
          .concat((r.keys || []).map(k => ({ t: this.emp(k.by).name + (r.payeeId === me ? ' submitted their approval' : ' approved ' + this.rm(k.amount)), d: k.at, dot: '#097c3e' })))
          .concat(this.approved(r) ? [{ t: 'Approved at ' + this.rm(this.finalAmount(r)), d: r.paid ? 'Paid out' : 'Queued for payout', dot: '#80cc28' }] : [{ t: 'Waiting on ' + this.missing(r).map(x => this.first(x)).join(' and '), d: 'Email sent', dot: '#d7e0d6' }])
          .map(x => Object.assign({ dot: '#12241a' }, x))
      });
    })(),
    closeDetail: () => this.setState({ detailId: null }),
    stop: (e) => e.stopPropagation(),
    toast: s.toast
  }, this.extraVals(rt, s), this.moreVals(rt, s), this.newVals(rt, s));
}

// Values for the signed-out screens (splash, sign-in, toast). Safe to build before any data loads.
export function loginVals() {
  const s = this.state;
  return {
    splash: s.splash || (s.booting && !s.authed),
    authed: s.authed,
    showLogin: !s.authed && !s.splash && !s.booting,
    loginEmail: s.loginEmail, loginPassword: s.loginPassword, loginError: s.loginError, loginInfo: s.loginInfo,
    rememberMe: s.rememberMe, employeeCount: s.employees.length || '—', founderCount: this.FOUNDERS.length || 3,
    doLogin: this.doLogin,
    onLoginEmail: (e) => this.setState({ loginEmail: e.target.value, loginError: '' }),
    onLoginPassword: (e) => this.setState({ loginPassword: e.target.value, loginError: '' }),
    onRemember: (e) => this.setState({ rememberMe: e.target.checked }),
    onForgot: this.onForgot,
    isSignup: s.loginMode === 'signup',
    loginKicker: s.loginMode === 'signup' ? 'FIRST TIME HERE' : 'WELCOME BACK',
    loginTitle: s.loginMode === 'signup' ? 'Create your password' : 'Sign in to your account',
    loginCta: s.loginBusy ? 'PLEASE WAIT…' : (s.loginMode === 'signup' ? 'CREATE ACCOUNT' : 'SIGN IN'),
    loginBusyOp: s.loginBusy ? '.6' : '1',
    loginSwitchText: s.loginMode === 'signup' ? 'Already set a password?' : 'First time here?',
    loginSwitchLabel: s.loginMode === 'signup' ? 'Sign in instead' : 'Create your password',
    toggleLoginMode: this.toggleLoginMode,
    showSignup: isSupabase,
    loginHint: isSupabase ? 'Your email must be on the team list. Contact your ops admin for access.' : 'Demo mode: data stays in this browser. Sign in as zul@lettuboost.com (founder) or admin@lettuboost.com with any password.',
    // mobile navigation
    isMobile: s.isMobile, mobileNavOpen: s.isMobile && s.navOpen,
    navClose: () => this.setState({ navOpen: false }),
    toast: s.toast
  };
}
