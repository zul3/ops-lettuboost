// Demo seed data from the LettuBoost Ops design. Used for local demo mode and to generate supabase/seed.sql.
// Images are stored as { sample: [label, hue, kind] } and drawn on a canvas at load time (see samples.js).
import { rollup } from './helpers.js';

export const seedUsers = () => [
  { id: 'zul', name: 'Zulhilmi Rashid', email: 'zul@lettuboost.com', role: 'Founder', active: true, mods: { payments: true, claims: true, reports: true, hr: true, stock: true, sales: true, purchasing: true, tasks: true, plan: true, admin: false } },
  { id: 'pj', name: 'PJ Anandan', email: 'pj@lettuboost.com', role: 'Founder', active: true, mods: { payments: true, claims: true, reports: true, hr: true, stock: true, sales: true, purchasing: true, tasks: true, plan: true, admin: false } },
  { id: 'neil', name: 'Neil Farhan', email: 'neil@lettuboost.com', role: 'Founder', active: true, mods: { payments: true, claims: true, reports: true, hr: true, stock: true, sales: true, purchasing: true, tasks: true, plan: true, admin: false } },
  { id: 'e04', name: 'Aina Sofea', email: 'aina@lettuboost.com', role: 'Staff', active: true, mods: { payments: false, claims: true, reports: true, hr: false, stock: true, sales: false, purchasing: false, tasks: true, plan: true, admin: false } },
  { id: 'e05', name: 'Haziq Rahman', email: 'haziq@lettuboost.com', role: 'Staff', active: true, mods: { payments: false, claims: true, reports: true, hr: false, stock: true, sales: false, purchasing: false, tasks: true, plan: true, admin: false } },
  { id: 'e06', name: 'Melissa Tan', email: 'melissa@lettuboost.com', role: 'Staff', active: true, mods: { payments: false, claims: true, reports: false, hr: false, stock: true, sales: false, purchasing: false, tasks: true, plan: true, admin: false } },
  { id: 'admin', name: 'Siti Admin', email: 'admin@lettuboost.com', role: 'System admin', active: true, mods: { payments: false, claims: true, reports: true, hr: true, stock: false, sales: false, purchasing: false, tasks: true, plan: true, admin: true } }
];

export const seedAudit = () => [
  { id: 'a1', t: 'Granted Reports access to Haziq Rahman', by: 'Siti Admin', d: '04 Sep, 10:12' },
  { id: 'a2', t: 'Created account for Melissa Tan', by: 'Siti Admin', d: '28 Aug, 09:40' },
  { id: 'a3', t: 'Set Aina Sofea role to Staff', by: 'Siti Admin', d: '20 Aug, 14:05' }
];

export const seedStatutory = () => [
  { id: 'epf', name: 'EPF (KWSP)', note: 'Employees Provident Fund, employee share', side: 'employee', mode: 'pct', rate: 11, cap: '', on: true, types: ['Director','Full time','Part time','Contract'] },
  { id: 'socso', name: 'SOCSO (PERKESO)', note: 'Employment injury and invalidity scheme, employee share', side: 'employee', mode: 'pct', rate: 0.5, cap: 6000, on: true, types: ['Full time','Part time','Contract'] },
  { id: 'eis', name: 'EIS (SIP)', note: 'Employment Insurance System, employee share', side: 'employee', mode: 'pct', rate: 0.2, cap: 6000, on: true, types: ['Full time','Part time','Contract'] },
  { id: 'pcb', name: 'Income tax (PCB / MTD)', note: 'Monthly tax deduction, estimated from annualised pay on the LHDN resident scale. EPF relief (up to RM4,000) and the RM400 rebate are applied.', side: 'employee', mode: 'pcb', rate: 0, relief: 9000, cap: '', on: true, types: ['Director','Full time','Part time','Contract','Fellowship','Volunteer'] },
  { id: 'zakat', name: 'Zakat (optional)', note: 'Voluntary. Opt in per employee on the payslip. Offsets income tax ringgit for ringgit.', side: 'employee', mode: 'pct', rate: 2.5, cap: '', on: true, optional: true, types: ['Director','Full time','Part time','Contract','Fellowship','Volunteer'] },
  { id: 'epf-er', name: 'EPF (KWSP), employer', note: 'Employer share: 13% for pay up to RM5,000, 12% above', side: 'employer', mode: 'pct', rate: 13, cap: '', on: true, types: ['Director','Full time','Part time','Contract'] },
  { id: 'socso-er', name: 'SOCSO (PERKESO), employer', note: 'Employer share of both SOCSO schemes', side: 'employer', mode: 'pct', rate: 1.75, cap: 6000, on: true, types: ['Full time','Part time','Contract'] },
  { id: 'eis-er', name: 'EIS (SIP), employer', note: 'Employer share', side: 'employer', mode: 'pct', rate: 0.2, cap: 6000, on: true, types: ['Full time','Part time','Contract'] },
  { id: 'hrdf', name: 'HRD Corp levy', note: 'Applies to employers with 10 or more Malaysian employees. Switch on if it covers you.', side: 'employer', mode: 'pct', rate: 0.5, cap: '', on: false, types: ['Full time','Part time','Contract'] }
];

export const seedUoms = () => [{ id: 'u1', name: 'Job' }, { id: 'u2', name: 'Trip' }, { id: 'u3', name: 'Hour' }, { id: 'u4', name: 'Day' }, { id: 'u5', name: 'Kg' }, { id: 'u6', name: 'Piece' }];

export const seedEmployees = () => [
  { id: 'zul',  name: 'Zulhilmi Rashid', type: 'Director',  unit: 'Founders office', email: 'zul@lettuboost.com' },
  { id: 'pj',   name: 'PJ Anandan',      type: 'Director',  unit: 'Founders office', email: 'pj@lettuboost.com' },
  { id: 'neil', name: 'Neil Farhan',     type: 'Director',  unit: 'Founders office', email: 'neil@lettuboost.com' },
  { id: 'e04',  name: 'Aina Sofea',      type: 'Full time', unit: 'Operations',      email: 'aina@lettuboost.com' },
  { id: 'e05',  name: 'Haziq Rahman',    type: 'Full time', unit: 'Farm — Pond A',   email: 'haziq@lettuboost.com' },
  { id: 'e06',  name: 'Melissa Tan',     type: 'Part time', unit: 'Brand & design',  email: 'melissa@lettuboost.com' },
  { id: 'e07',  name: 'Ridzuan Aziz',    type: 'Contract',  unit: 'Logistics',       email: 'ridzuan@lettuboost.com' },
  { id: 'e08',  name: 'Nurul Izzah',     type: 'Fellowship',unit: 'R&D — feeds',     email: 'nurul@lettuboost.com' },
  { id: 'e09',  name: 'Kamal Hassan',    type: 'Volunteer', unit: 'Community',       email: 'kamal@lettuboost.com' },
  { id: 'e10',  name: 'Sarah Lim',       type: 'Part time', unit: 'Admin',           email: 'sarah@lettuboost.com' },
  { id: 'e11',  name: 'Tengku Aiman',    type: 'Contract',  unit: 'Build & repair',  email: 'aiman@lettuboost.com' }
];

export const seedPieceTasks = () => [
  { id: 't1', name: 'Water lettuce propagation', unit: 'per piece', rate: 2.5 },
  { id: 't2', name: 'Fish feed production',      unit: 'per kg',    rate: 4 },
  { id: 't3', name: 'Design work',               unit: 'per hour',  rate: 25 },
  { id: 't4', name: 'Nursery tray cleaning',     unit: 'per tray',  rate: 1.8 },
  { id: 't5', name: 'Harvest packing',           unit: 'per box',   rate: 3.2 },
  { id: 't6', name: 'Social content post',       unit: 'per post',  rate: 15 }
];

export const seedRequests = () => [
  { id: 'PR-2609-018', payeeId: 'zul', cat: 'custom', amount: 0, note: 'Two site visits to the Kedah grow-out partner, plus travel', date: '2026-09-05', keys: [{ by: 'pj', amount: 320, at: '05 Sep, 09:12' }], paid: false },
  { id: 'PR-2609-017', payeeId: 'e04', cat: 'vhigh', amount: 100, note: 'Ran the full week of harvest scheduling', date: '2026-09-05', keys: [{ by: 'pj', amount: 100, at: '05 Sep, 08:40' }], paid: false },
  { id: 'PR-2609-016', payeeId: 'e09', cat: 'low', amount: 30, note: 'Weekend open-day helper', date: '2026-09-04', keys: [{ by: 'neil', amount: 30, at: '04 Sep, 17:22' }], paid: false },
  { id: 'PR-2609-015', payeeId: 'e06', cat: 'piece', taskId: 't3', qty: 3, note: 'Three hours on the new feed-bag label', date: '2026-09-03', keys: [{ by: 'pj', amount: 75, at: '03 Sep, 11:05' }], paid: true },
  { id: 'PR-2609-014', payeeId: 'e05', cat: 'mid', amount: 60, note: 'Pond B water change and pump swap', date: '2026-09-02', keys: [{ by: 'zul', amount: 60, at: '02 Sep, 16:48' }], paid: true },
  { id: 'PR-2609-013', payeeId: 'pj', cat: 'custom', amount: 0, note: 'Negotiated and closed the feed-mill supply contract', date: '2026-09-01', keys: [{ by: 'zul', amount: 500, at: '01 Sep, 10:02' }, { by: 'neil', amount: 420, at: '01 Sep, 14:30' }], paid: false },
  { id: 'PR-2608-012', payeeId: 'e08', cat: 'piece', taskId: 't1', qty: 40, note: 'Propagation batch for the September restock', date: '2026-08-28', keys: [{ by: 'zul', amount: 100, at: '28 Aug, 15:10' }], paid: true },
  { id: 'PR-2608-011', payeeId: 'e07', cat: 'custom', amount: 0, note: 'Three lorry runs to Selangor — fuel and toll included', date: '2026-08-20', keys: [{ by: 'neil', amount: 250, at: '20 Aug, 09:30' }], paid: true },
  { id: 'PR-2608-010', payeeId: 'e05', cat: 'high', amount: 80, note: 'Emergency aeration repair, stayed overnight', date: '2026-08-18', keys: [{ by: 'pj', amount: 80, at: '18 Aug, 22:05' }], paid: true },
  { id: 'PR-2608-009', payeeId: 'e11', cat: 'piece', taskId: 't2', qty: 10, note: '10kg trial batch of the black soldier fly feed', date: '2026-08-12', keys: [{ by: 'zul', amount: 40, at: '12 Aug, 13:44' }], paid: true },
  { id: 'PR-2608-008', payeeId: 'e10', cat: 'mid', amount: 60, note: 'Month-end filing and invoice chase', date: '2026-08-08', keys: [{ by: 'neil', amount: 60, at: '08 Aug, 18:00' }], paid: true }
];

export const seedNotifications = () => [
  { id: 'n1', kind: 'need_key', requestId: 'PR-2609-018', to: ['neil@lettuboost.com'], subject: 'Action needed — approve your amount for Zulhilmi Rashid', time: '05 Sep, 09:12', unread: true },
  { id: 'n2', kind: 'approved', requestId: 'PR-2609-013', to: ['zul@lettuboost.com', 'pj@lettuboost.com', 'neil@lettuboost.com'], subject: 'Approved — PJ Anandan, RM 460.00 (average of two keys)', time: '01 Sep, 14:30', unread: true },
  { id: 'n3', kind: 'approved', requestId: 'PR-2609-017', to: ['zul@lettuboost.com', 'neil@lettuboost.com'], subject: 'Approved — Aina Sofea, RM 100.00 approved by PJ', time: '05 Sep, 08:40', unread: false },
  { id: 'n4', kind: 'need_key', requestId: 'PR-2609-013', to: ['neil@lettuboost.com'], subject: 'Action needed — approve your amount for PJ Anandan', time: '01 Sep, 10:02', unread: false }
];

export const seedCatRates = () => ({ low: 30, mid: 60, high: 80, vhigh: 100 });

export function seedClaims() {
    const R = (n, l) => ({ name: n, sample: [l, 0, 'receipt'], isImg: true });
    const hw = R('receipt-hardware.jpg', 'Kedai Besi Maju'), fuel = R('petron-0903.jpg', 'Petron'), toll = R('toll-statement.jpg', 'Touch n Go'), farm = R('agro-supply.jpg', 'Agro Supply'), cafe = R('kopitiam.jpg', 'Kopitiam Sri'), prt = R('print-shop.jpg', 'Print Hub');
    const L = (id, date, cat, merchant, desc, amount, receipts) => ({ id, date, cat, merchant, desc, amount: String(amount), receipts });
    const T = (t, d, dot) => ({ t, d, dot: dot || '#097c3e' });
    return [
  { id: 'CL-2609-007', by: 'zul', title: 'KL supplier visit', purpose: 'Feed-mill supply contract follow-up', paidBy: 'own', submitted: '2026-09-06', status: 'pending', reviewer: '', comment: '', lines: [L('a1', '2026-09-05', 'Fuel & toll', 'Petron / PLUS', 'Return trip Kedah to KL', 162, [fuel, toll]), L('a2', '2026-09-05', 'Meals', 'Kopitiam Sri', 'Lunch with mill buyer', 74.2, [cafe])], trail: [T('Claim submitted', '06 Sep, 08:15')] },
  { id: 'CL-2609-006', by: 'e05', title: 'Pond B pump parts', purpose: 'Replace failed pump on Pond B', paidBy: 'own', submitted: '2026-09-04', status: 'pending', reviewer: '', comment: '', lines: [L('b1', '2026-09-02', 'Equipment & repair', 'Kedai Besi Maju', 'Impeller and seal kit', 148.5, [hw]), L('b2', '2026-09-02', 'Fuel & toll', 'Petron', 'Fuel for supplier run', 32, [fuel])], trail: [T('Claim submitted', '04 Sep, 17:30')] },
  { id: 'CL-2609-005', by: 'e04', title: 'Harvest week supplies', purpose: 'Crates and crew lunch for harvest week', paidBy: 'own', submitted: '2026-09-03', status: 'approved', reviewer: 'pj', comment: '', lines: [L('c1', '2026-09-01', 'Farm supplies', 'Agro Supply Sdn Bhd', 'Harvest crates x12', 86.4, [farm]), L('c2', '2026-09-02', 'Meals', 'Kopitiam Sri', 'Crew lunch', 41, [cafe])], trail: [T('Claim submitted', '03 Sep, 10:02'), T('Approved by PJ Anandan', '03 Sep, 15:40')] },
  { id: 'CL-2609-004', by: 'e06', title: 'Feed-bag label printing', purpose: 'Proof run of new feed-bag labels', paidBy: 'card', submitted: '2026-09-01', status: 'paid', reviewer: 'neil', comment: '', lines: [L('d1', '2026-08-30', 'Office & stationery', 'Print Hub', 'A3 label proofs x20', 120, [prt])], trail: [T('Claim submitted', '01 Sep, 09:10'), T('Approved by Neil Farhan', '01 Sep, 11:25'), T('Marked paid', '02 Sep, 16:00', '#80cc28')] },
  { id: 'CL-2608-003', by: 'e05', title: 'Fuel to supplier', purpose: 'Delivery to Perak supplier', paidBy: 'own', submitted: '2026-08-21', status: 'rejected', reviewer: 'zul', comment: 'Receipt is unreadable — please reattach a clear photo.', lines: [L('e1', '2026-08-20', 'Fuel & toll', 'Petron', 'Fuel for Perak run', 58, [fuel])], trail: [T('Claim submitted', '21 Aug, 08:45'), T('Rejected by Zulhilmi Rashid', '21 Aug, 12:10', '#b3261e'), T('“Receipt is unreadable — please reattach a clear photo.”', 'Reviewer note', '#d7e0d6')] }
];
}
export function seedReports() {
    const P = (l, h) => ({ name: l.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.jpg', sample: [l, h, 'photo'], isImg: true, cap: l });
    const R = (n, date, by, title, type, sev, status, unit, body, images) => ({ id: 'RP-' + String(n).padStart(4, '0'), date, by, title, type, sev, status, unit, body, images, log: [] });
    return [
      R(11, '2026-09-06', 'e05', 'Pond B pump replaced', 'Maintenance', 'Medium', 'Resolved', 'Farm — Pond B', 'Failed pump swapped with the spare. Water flow back to normal after 40 minutes. Old pump kept for parts; impeller is cracked.', [P('Pump housing', 200), P('New pump installed', 170)]),
      R(10, '2026-09-05', 'e04', 'Weekly harvest summary', 'Harvest', 'Low', 'Resolved', 'Nursery', 'Harvest scheduled and completed on time across both ponds. Crates were short on Thursday; borrowed from the packing line.', [P('Harvest crates', 100)]),
      R(9, '2026-09-04', 'e08', 'BSF feed batch 3 trial results', 'Daily ops', 'Low', 'In review', 'Feed lab', 'Third batch pelleted at the lower moisture level. Fish uptake looks better than batch 2; need one more week of observation before changing the recipe.', [P('Feed batch 3', 40), P('Pellet sample', 30), P('Fish response', 190)]),
      R(8, '2026-09-03', 'e05', 'Algae bloom in Pond A', 'Incident', 'High', 'Open', 'Farm — Pond A', 'Surface bloom covering roughly a third of the pond since the weekend. Test strip shows high nitrates. Aeration raised; recommend a partial water change and reduced feeding until it clears.', [P('Pond A surface', 120), P('Water test strip', 150), P('Inlet pipe', 210)]),
      R(7, '2026-09-01', 'e11', 'Nursery roof leak', 'Maintenance', 'Medium', 'Open', 'Nursery', 'Leak above tray rack 3 after heavy rain. Trays moved. Needs sealant and two replacement panels.', [P('Nursery roof', 20)]),
      R(6, '2026-08-27', 'e09', 'Open day visitor feedback', 'Customer', 'Low', 'Resolved', 'Community', 'About 60 visitors. Most asked about home-scale kits and bulk pricing. Three schools asked for a tour.', []),
      R(5, '2026-08-22', 'e07', 'Delivery cooler failure', 'Incident', 'High', 'Resolved', 'Logistics', 'Cooler unit stopped mid-route; part of the load was lost. Backup ice used for the rest. Unit serviced and tested.', [P('Cooler unit', 210), P('Spoiled stock', 0)]),
      R(4, '2026-08-18', 'e05', 'Aeration repair overnight', 'Incident', 'Medium', 'Resolved', 'Farm — Pond A', 'Aerator motor tripped at night. Replaced the capacitor and restored oxygen levels before morning.', [P('Aerator motor', 220), P('Repair at night', 250)]),
      R(3, '2026-08-11', 'e04', 'Monthly safety walk', 'Safety', 'Low', 'Resolved', 'Farm — Pond A', 'Walkways cleaned and edges marked. Two loose boards replaced. Fire extinguisher dates checked.', [P('Walkway', 60)]),
      R(2, '2026-08-04', 'e06', 'Packaging label proofs', 'Daily ops', 'Low', 'Resolved', 'Office', 'Two label options printed for the feed bag. Option B chosen for readability.', [P('Label proof A', 300), P('Label proof B', 330)]),
      R(1, '2026-07-29', 'e10', 'Stock count variance', 'Daily ops', 'Medium', 'In review', 'Office', 'Month-end count is 12 bags short against the ledger. Checking delivery notes.', [])
];
}
export function seedHr() {
    const H = (position, joined, status) => ({ position, joined, status: status || 'Active', phone: '', nric: '', bank: '', acct: '', epf: '', socso: '', tax: '', ecName: '', ecPhone: '', notes: '' });
    return { zul: H('Co-founder', '2023-03-01'), pj: H('Co-founder', '2023-03-01'), neil: H('Co-founder', '2023-03-01'), e04: H('Operations Executive', '2024-02-12'), e05: H('Pond Technician', '2024-06-03'), e06: H('Brand Designer', '2025-01-20'), e07: H('Logistics Driver', '2025-03-10'), e08: H('R&D Fellow', '2025-09-01'), e09: H('Community Volunteer', '2025-11-15'), e10: H('Admin Assistant', '2025-05-05', 'On leave'), e11: H('Maintenance Technician', '2026-01-12') };
}
export function seedItems() {
    const I = (id, name, sku, cat, unit, loc, qty, reorder, cost) => ({ id, name, sku, cat, unit, loc, qty, reorder, cost });
    return [
      I('i1', 'BSF fish feed pellets', 'FD-001', 'Feed', 'kg', 'Feed lab', 240, 150, 3.2), I('i2', 'Fish feed premix', 'FD-002', 'Feed', 'kg', 'Feed lab', 38, 60, 4.5),
      I('i3', 'Water lettuce seedlings', 'PL-001', 'Plants', 'pcs', 'Nursery', 420, 200, 1.2), I('i4', 'Nursery trays', 'PK-001', 'Packaging', 'pcs', 'Nursery', 96, 80, 2.8),
      I('i5', 'Harvest crates', 'PK-002', 'Packaging', 'pcs', 'Pond A shed', 24, 30, 7.2), I('i6', 'Delivery boxes', 'PK-003', 'Packaging', 'box', 'Logistics', 0, 50, 1.9),
      I('i7', 'Pump impeller kits', 'EQ-001', 'Equipment & spares', 'pcs', 'Workshop', 3, 2, 148.5), I('i8', 'Aerator capacitors', 'EQ-002', 'Equipment & spares', 'pcs', 'Workshop', 1, 2, 24),
      I('i9', 'Water test strips', 'TR-001', 'Treatments', 'box', 'Pond A shed', 12, 5, 18), I('i10', 'Sealant tubes', 'EQ-003', 'Equipment & spares', 'pcs', 'Workshop', 8, 4, 12.5)
];
}
export function seedMoves() {
    const M = (id, itemId, kind, delta, after, note, by, date) => ({ id, itemId, kind, delta, after, note, by, date });
    return [
      M('m10', 'i2', 'out', -22, 38, 'Batch 3 trial', 'e08', '2026-09-05'), M('m9', 'i6', 'out', -40, 0, 'Weekly deliveries', 'e07', '2026-09-04'), M('m8', 'i8', 'out', -1, 1, 'Aerator repair, Pond A', 'e05', '2026-09-03'),
      M('m7', 'i1', 'in', 300, 240, 'PO-1042 from feed mill', 'e04', '2026-09-02'), M('m6', 'i7', 'out', -1, 3, 'Pond B pump swap', 'e05', '2026-09-02'), M('m5', 'i5', 'adjust', -3, 24, 'Count correction', 'e04', '2026-09-01'),
      M('m4', 'i3', 'out', -60, 420, 'Pond B restock', 'e05', '2026-08-30'), M('m3', 'i4', 'in', 50, 96, 'Supplier delivery', 'e04', '2026-08-28'), M('m2', 'i9', 'in', 6, 12, 'Reorder', 'e04', '2026-08-25'), M('m1', 'i10', 'out', -2, 8, 'Nursery roof patch', 'e11', '2026-08-22')
];
}
export function seedCust() {
    const C = (id, name, contact, email, phone) => ({ id, name, contact, email, phone });
    return [C('c1', 'Kebun Hijau Sdn Bhd', 'Hafiz Omar', 'hafiz@kebunhijau.my', '012-334 5521'), C('c2', 'Aquamart Wholesale', 'Linda Wong', 'orders@aquamart.my', '011-2208 4410'), C('c3', 'SK Taman Maju', 'Pn Rohani', 'sktamanmaju@moe.edu.my', '04-722 1180'), C('c4', 'Pak Man Fish Farm', 'Osman Ali', 'osman@pakman.my', '019-441 7032'), C('c5', 'Greenleaf Cafe', 'Mei Ling', 'hello@greenleaf.cafe', '017-889 2250')];
}
export function seedDocs() {
    const L = (id, desc, qty, price) => ({ id, desc, qty, price });
    const D = (id, type, custId, date, due, lines, extra) => Object.assign({ id, type, custId, date, due, lines, taxPct: 0, notes: '', status: type === 'quote' ? 'draft' : (type === 'invoice' ? 'unpaid' : 'issued'), from: '', payments: [], method: 'Bank transfer' }, extra || {});
    return [
      D('QT-2609-004', 'quote', 'c1', '2026-09-07', '2026-09-21', [L('a', 'Pond B feed supply trial', 100, 6.5)], { status: 'draft', notes: 'Delivery within 3 working days of acceptance.' }),
      D('QT-2609-003', 'quote', 'c5', '2026-09-05', '2026-09-19', [L('a', 'Water lettuce weekly supply (4 weeks)', 4, 180)], { status: 'sent' }),
      D('QT-2609-002', 'quote', 'c3', '2026-09-02', '2026-09-16', [L('a', 'Home-scale starter kit', 3, 450), L('b', 'Teacher workshop session', 1, 200)], { status: 'invoiced' }),
      D('INV-2609-004', 'invoice', 'c3', '2026-09-03', '2026-09-17', [L('a', 'Home-scale starter kit', 3, 450), L('b', 'Teacher workshop session', 1, 200)], { from: 'QT-2609-002' }),
      D('INV-2609-003', 'invoice', 'c1', '2026-08-28', '2026-09-04', [L('a', 'BSF feed pellets', 150, 6.5), L('b', 'Delivery to Kedah', 1, 60)], { payments: [{ id: 'p3', date: '2026-09-01', amount: 500, method: 'Bank transfer', receipt: 'RC-2609-003' }] }),
      D('INV-2609-002', 'invoice', 'c2', '2026-09-01', '2026-09-15', [L('a', 'Water lettuce seedlings', 300, 1.8), L('b', 'Nursery trays', 20, 3.5)], { payments: [{ id: 'p2', date: '2026-09-05', amount: 610, method: 'Online banking', receipt: 'RC-2609-002' }] }),
      D('INV-2609-001', 'invoice', 'c4', '2026-08-20', '2026-09-03', [L('a', 'Fish feed premix', 80, 6)], { payments: [{ id: 'p1', date: '2026-08-30', amount: 480, method: 'Bank transfer', receipt: 'RC-2609-001' }] }),
      D('RC-2609-003', 'receipt', 'c1', '2026-09-01', '', [L('a', 'Payment for INV-2609-003', 1, 500)], { from: 'INV-2609-003', method: 'Bank transfer' }),
      D('RC-2609-002', 'receipt', 'c2', '2026-09-05', '', [L('a', 'Payment for INV-2609-002', 1, 610)], { from: 'INV-2609-002', method: 'Online banking' }),
      D('RC-2609-001', 'receipt', 'c4', '2026-08-30', '', [L('a', 'Payment for INV-2609-001', 1, 480)], { from: 'INV-2609-001', method: 'Bank transfer' })
];
}
export function seedSups() {
    const S = (id, name, category, contact, email, phone, terms) => ({ id, name, category, contact, email, phone, terms });
    return [S('s1', 'Felda Feed Mill', 'Feed', 'Encik Ramli', 'sales@feldafeed.my', '04-441 2290', 'Net 30'), S('s2', 'Agro Supply Sdn Bhd', 'Farm supplies', 'Jason Lee', 'jason@agrosupply.my', '012-771 0934', 'Net 14'), S('s3', 'Kedai Besi Maju', 'Hardware', 'Ah Seng', 'maju@kedaibesi.my', '04-733 1188', 'Cash'), S('s4', 'Print Hub', 'Printing', 'Farah', 'orders@printhub.my', '011-5503 2217', 'Net 7'), S('s5', 'ColdChain Logistics', 'Transport', 'Raju', 'ops@coldchain.my', '016-220 8841', 'Net 30')];
}
export function seedPos() {
    const L = (id, itemId, desc, qty, cost) => ({ id, itemId, desc, qty, cost });
    const P = (id, supId, date, expected, status, lines, extra) => Object.assign({ id, supId, date, expected, status, lines, notes: '', receivedOn: '' }, extra || {});
    return [
      P('PO-1045', 's4', '2026-09-07', '2026-09-12', 'draft', [L('a', '', 'A3 label proofs', 20, 6)]),
      P('PO-1044', 's2', '2026-09-06', '2026-09-10', 'ordered', [L('a', 'i5', 'Harvest crates', 40, 7.2), L('b', 'i6', 'Delivery boxes', 200, 1.9)]),
      P('PO-1043', 's1', '2026-09-03', '2026-09-12', 'ordered', [L('a', 'i2', 'Fish feed premix', 100, 4.5)]),
      P('PO-1042', 's1', '2026-08-30', '2026-09-02', 'received', [L('a', 'i1', 'BSF fish feed pellets', 300, 3.2)], { receivedOn: '2026-09-02' }),
      P('PO-1041', 's3', '2026-08-20', '2026-08-24', 'received', [L('a', 'i7', 'Pump impeller kits', 2, 148.5)], { receivedOn: '2026-08-24' })
];
}
export function seedProjects() {
    return [
  { id: 'p1', name: 'Pond B expansion', desc: 'Dig, line and stock a third grow-out pond.', owner: 'pj', start: '2026-08-24', end: '2026-10-30', status: 'Active', color: '#097c3e' },
  { id: 'p2', name: 'BSF feed recipe v2', desc: 'Trial three batches and sign off a cheaper recipe.', owner: 'e08', start: '2026-08-10', end: '2026-10-09', status: 'Active', color: '#d9a53a' },
  { id: 'p3', name: 'Brand relaunch and labels', desc: 'New feed-bag labels, packaging and web refresh.', owner: 'neil', start: '2026-09-01', end: '2026-11-13', status: 'Planning', color: '#4a7fa8' }
];
}
export function seedWorks() {
    const W = (id, projId, parentId, title, assignee, start, end, status, progress, priority) => ({ id, projId, parentId, title, assignee, start, end, status, progress, priority, notes: '' });
    return [
      W('w1', 'p1', '', 'Site survey and permits', 'e04', '2026-08-24', '2026-09-04', 'done', 100, 'High'),
      W('w2', 'p1', 'w1', 'Soil and water test', 'e05', '2026-08-24', '2026-08-30', 'done', 100, 'Medium'),
      W('w3', 'p1', 'w1', 'Council permit', 'e04', '2026-08-28', '2026-09-04', 'done', 100, 'High'),
      W('w4', 'p1', '', 'Excavate and line pond', 'e11', '2026-09-02', '2026-09-25', 'doing', 45, 'High'),
      W('w5', 'p1', 'w4', 'Excavation', 'e11', '2026-09-02', '2026-09-14', 'doing', 80, 'High'),
      W('w6', 'p1', 'w4', 'Liner install', 'e11', '2026-09-14', '2026-09-22', 'todo', 0, 'Medium'),
      W('w7', 'p1', 'w4', 'Inlet and outlet pipework', 'e05', '2026-09-18', '2026-09-25', 'todo', 0, 'Medium'),
      W('w8', 'p1', '', 'Aeration and pump setup', 'e05', '2026-09-24', '2026-10-06', 'todo', 0, 'Medium'),
      W('w9', 'p1', '', 'Fill, cycle and stock fish', 'pj', '2026-10-06', '2026-10-30', 'todo', 0, 'Low'),
      W('w10', 'p2', '', 'Trial batches 1 to 3', 'e08', '2026-08-10', '2026-09-12', 'doing', 75, 'High'),
      W('w11', 'p2', 'w10', 'Batch 1', 'e08', '2026-08-10', '2026-08-20', 'done', 100, 'Medium'),
      W('w12', 'p2', 'w10', 'Batch 2', 'e08', '2026-08-21', '2026-09-02', 'done', 100, 'Medium'),
      W('w13', 'p2', 'w10', 'Batch 3 moisture trial', 'e08', '2026-09-03', '2026-09-12', 'doing', 60, 'High'),
      W('w14', 'p2', '', 'Fish uptake observation', 'e05', '2026-09-10', '2026-09-24', 'doing', 20, 'Medium'),
      W('w15', 'p2', '', 'Costing and recipe sign-off', 'neil', '2026-09-24', '2026-10-09', 'todo', 0, 'Medium'),
      W('w16', 'p3', '', 'Label design options', 'e06', '2026-09-01', '2026-09-12', 'doing', 70, 'Medium'),
      W('w17', 'p3', 'w16', 'Option A and B proofs', 'e06', '2026-09-01', '2026-09-06', 'done', 100, 'Medium'),
      W('w18', 'p3', 'w16', 'Printing proof run', 'e06', '2026-09-07', '2026-09-12', 'doing', 40, 'Medium'),
      W('w19', 'p3', '', 'Packaging order', 'e04', '2026-09-14', '2026-10-02', 'todo', 0, 'Medium'),
      W('w20', 'p3', '', 'Website and social refresh', 'e06', '2026-10-01', '2026-11-13', 'todo', 0, 'Low'),
      W('w21', '', '', 'Month-end stock count', 'e10', '2026-09-28', '2026-09-30', 'todo', 0, 'Medium'),
      W('w22', '', '', 'Get nursery roof repair quote', 'e11', '2026-09-08', '2026-09-15', 'todo', 0, 'High')
];
}

// The design's demo data is anchored on 7 Sep 2026. Shift every date so the demo always looks current.
export const SEED_ANCHOR = '2026-09-07';
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function shiftDates(v, days, year) {
  if (!days) return v;
  if (typeof v === 'string') {
    if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return new Date(Date.parse(v + 'T00:00:00Z') + days * 864e5).toISOString().slice(0, 10);
    const m = /^(\d{2}) ([A-Z][a-z]{2}), (\d{2}:\d{2})$/.exec(v);
    if (m && MON.indexOf(m[2]) >= 0) {
      const d = new Date(Date.UTC(year, MON.indexOf(m[2]), +m[1]) + days * 864e5);
      return String(d.getUTCDate()).padStart(2, '0') + ' ' + MON[d.getUTCMonth()] + ', ' + m[3];
    }
    return v;
  }
  if (Array.isArray(v)) return v.map(x => shiftDates(x, days, year));
  if (v && typeof v === 'object') { const o = {}; for (const k in v) o[k] = shiftDates(v[k], days, year); return o; }
  return v;
}

// Everything the app persists, in demo form, with dates moved so that SEED_ANCHOR becomes `today`.
export function seedState(today) {
  const days = today ? Math.round((Date.parse(today + 'T00:00:00Z') - Date.parse(SEED_ANCHOR + 'T00:00:00Z')) / 864e5) : 0;
  return shiftDates(rawSeedState(), days, 2026);
}

function rawSeedState() {
  return {
    users: seedUsers(), audit: seedAudit(), statutory: seedStatutory(), uoms: seedUoms(), employees: seedEmployees(),
    tasks: seedPieceTasks(), requests: seedRequests(), notifications: seedNotifications(), catRates: seedCatRates(), zakatOn: {},
    hr: seedHr(), photos: {}, prefs: {}, items: seedItems(), moves: seedMoves(), customers: seedCust(), docs: seedDocs(),
    sups: seedSups(), pos: seedPos(), projects: seedProjects(), works: rollup(seedWorks()), claims: seedClaims(), reports: seedReports()
  };
}

// Config that should exist even in an empty database.
export function defaultConfig() {
  return { statutory: seedStatutory(), uoms: seedUoms(), tasks: seedPieceTasks(), catRates: seedCatRates(), zakatOn: {} };
}

// A blank console: no people, no records. Only the settings the app needs to run (pay bands, statutory items, units).
export function emptyState() {
  const o = { users: [], audit: [], employees: [], requests: [], notifications: [], claims: [], reports: [], items: [], moves: [], customers: [], docs: [], sups: [], pos: [], projects: [], works: [], hr: {}, photos: {}, prefs: {} };
  return Object.assign(o, defaultConfig());
}
