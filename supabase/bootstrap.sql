-- Start with an empty console: creates only your first System admin account.
-- Use this instead of seed.sql if you don't want the demo data.
-- 1. Replace the name and email below, then run it after schema.sql.
-- 2. Open the app, choose "Create your password", and sign up with that email.
-- 3. In System admin -> Users, add the founders and staff. In HR, add staff profiles.

insert into public.ops_users (id, ord, data) values (
  'admin', 0,
  jsonb_build_object(
    'id', 'admin',
    'name', 'Your Name',
    'email', 'you@lettuboost.com',
    'role', 'System admin',
    'active', true,
    'mods', jsonb_build_object('payments', true, 'claims', true, 'reports', true, 'hr', true, 'stock', true,
      'sales', true, 'purchasing', true, 'tasks', true, 'plan', true, 'admin', true)
  )
) on conflict (id) do update set data = excluded.data;
