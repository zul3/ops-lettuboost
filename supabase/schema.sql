-- LettuBoost Ops: Supabase schema.
-- Run this once in the Supabase SQL editor (Dashboard -> SQL Editor -> New query -> paste -> Run).
-- Then run seed.sql for the demo data, or bootstrap.sql to start empty with just your admin account.
--
-- Every app collection lives in its own table with the same shape:
--   id   text primary key   -- the record id used by the app (e.g. 'PR-2609-018')
--   ord  double precision   -- display order inside the collection
--   data jsonb              -- the full record
-- The app diffs its state and upserts / deletes rows, and listens to Realtime for other people's edits.

create extension if not exists pgcrypto;

-- ---------- tables ----------
do $$
declare t text;
begin
  foreach t in array array[
    'ops_users', 'ops_employees', 'ops_payment_requests', 'ops_notifications', 'ops_piece_tasks', 'ops_uoms',
    'ops_statutory', 'ops_claims', 'ops_reports', 'ops_audit', 'ops_stock_items', 'ops_stock_moves',
    'ops_customers', 'ops_sales_docs', 'ops_suppliers', 'ops_purchase_orders', 'ops_projects', 'ops_work_items',
    'ops_hr_profiles', 'ops_photos', 'ops_user_prefs', 'ops_settings'
  ] loop
    execute format('create table if not exists public.%I (
      id text primary key,
      ord double precision not null default 0,
      data jsonb not null,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      updated_by uuid default auth.uid()
    )', t);
    execute format('create index if not exists %I on public.%I (ord)', t || '_ord_idx', t);
  end loop;
end $$;

-- Handy lookup for sign-in checks.
create unique index if not exists ops_users_email_idx on public.ops_users ((lower(data->>'email')));

-- ---------- helpers ----------

-- Is the signed-in person an active console user?
create or replace function public.ops_is_member() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.ops_users u
    where lower(u.data->>'email') = lower(coalesce(auth.jwt()->>'email', ''))
      and coalesce((u.data->>'active')::boolean, true)
  );
$$;

-- Does the signed-in person have the System admin module?
create or replace function public.ops_is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.ops_users u
    where lower(u.data->>'email') = lower(coalesce(auth.jwt()->>'email', ''))
      and coalesce((u.data->>'active')::boolean, true)
      and coalesce((u.data->'mods'->>'admin')::boolean, false)
  );
$$;

-- Keep updated_at / updated_by current.
create or replace function public.ops_touch() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end $$;

-- Only system admins may change roles, module access or active flags, or add / remove users.
-- Everyone else may still edit names and emails (HR and My account do this).
create or replace function public.ops_users_guard() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null or public.ops_is_admin() then
    return coalesce(new, old);
  end if;
  if tg_op = 'INSERT' or tg_op = 'DELETE' then
    raise exception 'Only a system admin can add or remove console users';
  end if;
  if (new.data->'role') is distinct from (old.data->'role')
     or (new.data->'mods') is distinct from (old.data->'mods')
     or (new.data->'active') is distinct from (old.data->'active') then
    raise exception 'Only a system admin can change roles or module access';
  end if;
  return new;
end $$;

-- Sign-up is only allowed for emails a system admin has added to ops_users.
create or replace function public.ops_signup_gate() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.ops_users u where lower(u.data->>'email') = lower(new.email)) then
    raise exception 'This email is not on the team list (not invited)';
  end if;
  return new;
end $$;

drop trigger if exists ops_signup_gate on auth.users;
create trigger ops_signup_gate before insert on auth.users
  for each row execute function public.ops_signup_gate();

-- ---------- triggers, RLS, realtime ----------
do $$
declare t text;
begin
  foreach t in array array[
    'ops_users', 'ops_employees', 'ops_payment_requests', 'ops_notifications', 'ops_piece_tasks', 'ops_uoms',
    'ops_statutory', 'ops_claims', 'ops_reports', 'ops_audit', 'ops_stock_items', 'ops_stock_moves',
    'ops_customers', 'ops_sales_docs', 'ops_suppliers', 'ops_purchase_orders', 'ops_projects', 'ops_work_items',
    'ops_hr_profiles', 'ops_photos', 'ops_user_prefs', 'ops_settings'
  ] loop
    execute format('drop trigger if exists %I on public.%I', t || '_touch', t);
    execute format('create trigger %I before update on public.%I for each row execute function public.ops_touch()', t || '_touch', t);

    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "members read" on public.%I', t);
    execute format('drop policy if exists "members write" on public.%I', t);
    execute format('create policy "members read" on public.%I for select to authenticated using (public.ops_is_member())', t);
    execute format('create policy "members write" on public.%I for all to authenticated using (public.ops_is_member()) with check (public.ops_is_member())', t);

    -- Realtime: send full rows (so deletes carry the id) and publish the table.
    execute format('alter table public.%I replica identity full', t);
    begin
      execute format('alter publication supabase_realtime add table public.%I', t);
    exception when duplicate_object then null;
    end;
  end loop;
end $$;

-- Users must be able to read their own row before they are a "member" (to sign in).
drop policy if exists "read own user row" on public.ops_users;
create policy "read own user row" on public.ops_users for select to authenticated
  using (lower(data->>'email') = lower(coalesce(auth.jwt()->>'email', '')));

drop trigger if exists ops_users_guard on public.ops_users;
create trigger ops_users_guard before insert or update or delete on public.ops_users
  for each row execute function public.ops_users_guard();

-- ---------- storage for receipts, report photos and avatars ----------
insert into storage.buckets (id, name, public)
values ('ops-uploads', 'ops-uploads', true)
on conflict (id) do nothing;

drop policy if exists "ops uploads read" on storage.objects;
drop policy if exists "ops uploads write" on storage.objects;
create policy "ops uploads read" on storage.objects for select
  using (bucket_id = 'ops-uploads');
create policy "ops uploads write" on storage.objects for insert to authenticated
  with check (bucket_id = 'ops-uploads' and public.ops_is_member());
