// Static domain constants. Mixed into OpsApp.prototype so view models can read them as this.X.
export const CONSTANTS = {
  CATS: [
    { id: 'low', label: 'Low' }, { id: 'mid', label: 'Mid' }, { id: 'high', label: 'High' },
    { id: 'vhigh', label: 'Very High' }, { id: 'piece', label: 'Piece Rated' }, { id: 'custom', label: 'Custom' }
  ],
  TERMS: { 'Director': 'Director fee', 'Full time': 'Salary', 'Part time': 'Wage', 'Contract': 'Contract fee', 'Fellowship': 'Stipend', 'Volunteer': 'Allowance' },
  ROUTES: {
    dashboard: ['PAYMENTS', 'Today at LettuBoost'],
    new: ['PAYMENTS', 'New payment request'],
    approvals: ['PAYMENTS', 'Approval inbox'],
    dual: ['PAYMENTS', 'Founder approval loop'],
    history: ['PAYMENTS', 'Payment history'],
    employees: ['PEOPLE', 'Employees'],
    payslips: ['PEOPLE', 'Payslip report'],
    tasks: ['SETUP', 'Tasks & piece rates'],
    notify: ['SETUP', 'Notifications'],
    settings: ['SETUP', 'Settings'],
    none: ['', 'No access'], account: ['', 'My account'],
    'sa-dash': ['SALES', 'Sales dashboard'], 'sa-docs': ['SALES', 'Documents'], 'sa-new': ['SALES', 'New document'], 'sa-view': ['SALES', 'Document'], 'sa-cust': ['SALES', 'Customers'],
    'pu-dash': ['PURCHASING', 'Purchasing dashboard'], 'pu-orders': ['PURCHASING', 'Purchase orders'], 'pu-new': ['PURCHASING', 'New purchase order'], 'pu-sup': ['PURCHASING', 'Suppliers'],
    'tk-board': ['TASKS', 'Task board'], 'tk-list': ['TASKS', 'Task list'], 'pp-list': ['PLAN', 'Projects'], 'pp-gantt': ['PLAN', 'Gantt chart'],
    'hr-dir': ['HR', 'Staff directory'], 'hr-form': ['HR', 'Staff profile'],
    'st-dash': ['STOCK', 'Stock dashboard'], 'st-items': ['STOCK', 'Items'], 'st-move': ['STOCK', 'Stock movements'],
    'cl-overview': ['CLAIMS', 'Claims overview'], 'cl-new': ['CLAIMS', 'New claim'], 'cl-mine': ['CLAIMS', 'My claims'], 'cl-review': ['CLAIMS', 'Review queue'],
    'rp-dash': ['REPORTS', 'Reports dashboard'], 'rp-new': ['REPORTS', 'New report'], 'rp-all': ['REPORTS', 'All reports'], 'rp-export': ['REPORTS', 'Print & export'],
    'ad-users': ['ADMIN', 'Users'], 'ad-access': ['ADMIN', 'Module access'], 'ad-log': ['ADMIN', 'Activity log']
  },
  PAGE_ICONS: { dashboard: 'grid', new: 'plus', approvals: 'check', dual: 'key', history: 'clock', employees: 'users', payslips: 'file', tasks: 'list', settings: 'gear', 'cl-overview': 'grid', 'cl-new': 'plus', 'cl-mine': 'receipt', 'cl-review': 'check', 'rp-dash': 'chart', 'rp-new': 'plus', 'rp-all': 'clipboard', 'rp-export': 'printer', 'ad-users': 'users', 'ad-access': 'key', 'ad-log': 'clock', 'hr-dir': 'users', 'hr-form': 'plus', 'st-dash': 'grid', 'st-items': 'box', 'st-move': 'swap', 'sa-dash': 'grid', 'sa-docs': 'file', 'sa-new': 'plus', 'sa-view': 'file', 'sa-cust': 'users', 'pu-dash': 'grid', 'pu-orders': 'list', 'pu-new': 'plus', 'pu-sup': 'users', 'tk-board': 'grid', 'tk-list': 'list', 'pp-list': 'folder', 'pp-gantt': 'gantt' },
  MOD_ICONS: { payments: 'wallet', claims: 'receipt', hr: 'users', reports: 'clipboard', stock: 'box', sales: 'cart', purchasing: 'truck', tasks: 'taskcheck', plan: 'gantt', admin: 'shield' },
  CL_CATS: ['Travel & transport', 'Fuel & toll', 'Meals', 'Farm supplies', 'Equipment & repair', 'Office & stationery', 'Utilities & telco', 'Medical', 'Other'],
  CST: { pending: { label: 'PENDING', fg: '#8a5a00', bg: '#fdf3e0' }, approved: { label: 'APPROVED', fg: '#0a5c2f', bg: '#edf5e8' }, paid: { label: 'PAID', fg: '#12241a', bg: '#eef1ed' }, rejected: { label: 'REJECTED', fg: '#b3261e', bg: '#fdeceb' } },
  REP_TYPES: ['Daily ops', 'Incident', 'Maintenance', 'Harvest', 'Safety', 'Customer'],
  REP_UNITS: ['Farm — Pond A', 'Farm — Pond B', 'Nursery', 'Feed lab', 'Logistics', 'Office', 'Community'],
  REP_SEVS: ['Low', 'Medium', 'High'],
  REP_STATUS: ['Open', 'In review', 'Resolved'],
  SEV: { Low: { fg: '#0a5c2f', bg: '#edf5e8' }, Medium: { fg: '#8a5a00', bg: '#fdf3e0' }, High: { fg: '#b3261e', bg: '#fdeceb' } },
  RST: { 'Open': { fg: '#8a5a00' }, 'In review': { fg: '#12241a' }, 'Resolved': { fg: '#0a5c2f' } },
  MODS: [
    { id: 'payments', label: 'Payments', desc: 'Approvals, payslips, deductions', home: 'dashboard' },
    { id: 'claims', label: 'Claims', desc: 'Expense claims with receipts', home: 'cl-overview' },
    { id: 'reports', label: 'Reports', desc: 'Field reports with photos', home: 'rp-dash' },
    { id: 'hr', label: 'Human resources', desc: 'Staff profiles and records', home: 'hr-dir' },
    { id: 'stock', label: 'Stock', desc: 'Inventory and movements', home: 'st-dash' },
    { id: 'sales', label: 'Sales & orders', desc: 'Quotes, invoices, receipts', home: 'sa-dash' },
    { id: 'purchasing', label: 'Purchasing', desc: 'Suppliers and purchase orders', home: 'pu-dash' },
    { id: 'tasks', label: 'Tasks', desc: 'Team task board', home: 'tk-board' },
    { id: 'plan', label: 'Project plan', desc: 'Projects and Gantt', home: 'pp-list' },
    { id: 'admin', label: 'System admin', desc: 'Users and module access', home: 'ad-users' }
  ],
  GRP: { payments: 'FINANCIAL', claims: 'FINANCIAL', hr: 'PEOPLE', reports: 'OPERATIONS', stock: 'OPERATIONS', sales: 'FINANCIAL', purchasing: 'OPERATIONS', tasks: 'WORK', plan: 'WORK', admin: 'SYSTEM' },
  CRUMB: { admin: 'SYSTEM ADMIN', hr: 'HUMAN RESOURCES', sales: 'SALES & ORDERS', purchasing: 'PURCHASING', plan: 'PROJECT PLAN' },
  ROLE_MODS: { 'Founder': { payments: true, claims: true, reports: true, hr: true, stock: true, sales: true, purchasing: true, tasks: true, plan: true, admin: false }, 'Staff': { payments: false, claims: true, reports: true, hr: false, stock: true, sales: false, purchasing: false, tasks: true, plan: true, admin: false }, 'System admin': { payments: false, claims: true, reports: true, hr: true, stock: false, sales: false, purchasing: false, tasks: true, plan: true, admin: true } }
};
