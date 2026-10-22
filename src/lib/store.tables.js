// Which state slices are saved, and to which Supabase table. Must match supabase/schema.sql.

// State key -> table. Arrays of objects with an id.
export const COLLECTIONS = {
  users: 'ops_users',
  employees: 'ops_employees',
  requests: 'ops_payment_requests',
  notifications: 'ops_notifications',
  tasks: 'ops_piece_tasks',
  uoms: 'ops_uoms',
  statutory: 'ops_statutory',
  claims: 'ops_claims',
  reports: 'ops_reports',
  audit: 'ops_audit',
  items: 'ops_stock_items',
  moves: 'ops_stock_moves',
  customers: 'ops_customers',
  docs: 'ops_sales_docs',
  sups: 'ops_suppliers',
  pos: 'ops_purchase_orders',
  projects: 'ops_projects',
  works: 'ops_work_items'
};
// State key -> table. Objects keyed by id (employee / user id).
export const MAPS = { hr: 'ops_hr_profiles', photos: 'ops_photos', prefs: 'ops_user_prefs' };
// Single values, one row each in ops_settings.
export const SETTINGS_TABLE = 'ops_settings';
export const SETTINGS_KEYS = ['catRates', 'zakatOn'];
export const ALL_TABLES = Object.values(COLLECTIONS).concat(Object.values(MAPS), [SETTINGS_TABLE]);
export const PERSISTED = Object.keys(COLLECTIONS).concat(Object.keys(MAPS), SETTINGS_KEYS);
