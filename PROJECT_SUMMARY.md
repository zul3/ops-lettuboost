# LettuBoost Ops: project summary

Read this first in a new session. It says what the app is, how it is built, and where things live.

## What it is

An internal operations console for LettuBoost, built from the design file
`LettuBoost_Payments_Standalone.html` (a single-file prototype). It covers:

| Module | Routes (`state.route`) | Main screens |
| --- | --- | --- |
| Payments | `dashboard`, `new`, `approvals`, `dual`, `history`, `employees`, `payslips`, `tasks`, `settings`, `notify` | Founder two-key approval loop, piece rates, payslips with EPF/SOCSO/EIS/PCB/zakat |
| Claims | `cl-overview`, `cl-new`, `cl-mine`, `cl-review` | Expense claims with receipts, founder review |
| Reports | `rp-dash`, `rp-new`, `rp-all`, `rp-export` | Field reports with photos, HTML / PDF / Word export |
| Human resources | `hr-dir`, `hr-form` | Staff directory and profiles |
| Stock | `st-dash`, `st-items`, `st-move` | Items, low-stock alerts, movements |
| Sales & orders | `sa-dash`, `sa-docs`, `sa-new`, `sa-view`, `sa-cust` | Quotes, invoices, receipts, customers |
| Purchasing | `pu-dash`, `pu-orders`, `pu-new`, `pu-sup` | Purchase orders (receiving updates stock), suppliers |
| Tasks | `tk-board`, `tk-list` | Kanban board and list |
| Project plan | `pp-list`, `pp-gantt` | Projects and Gantt chart |
| System admin | `ad-users`, `ad-access`, `ad-log` | Users, roles, per-module access, audit log |
| Account | `account` | Profile, photo, password, preferences |

Key business rules (from the design):
- Staff payment: one founder approves and it is approved on entry.
- Founder payment: the payee founder is locked out; the other founders each key an amount; the average is final.
- Founders = active users with role `Founder`. Roles: `Founder`, `Staff`, `System admin` (defaults in `ROLE_MODS`).
- Module access per user lives in `users[].mods`; the sidebar only shows modules a user has.

## Stack

- React 19 + Vite 7, plain JavaScript (no TypeScript, no router, no CSS framework).
- Supabase: Auth (email + password), Postgres (all data), Storage (bucket `ops-uploads`), Realtime (live sync).
- Hosted on Vercel (`vercel.json`). Env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
- No Supabase env vars = local mode: starts blank, the first email to sign in becomes the system admin (any password),
  saved to `localStorage` only. `VITE_DEMO_DATA=true` loads the design's sample data instead.

## Code map

```
index.html                 fonts, favicon, #root
src/main.jsx               mounts <OpsApp/>
src/logic/OpsApp.jsx       React class component: all state, actions, sign-in, sync wiring
src/logic/vm/*.js          view models. renderVals() builds one flat object `v` for the views
                           renderVals (shell, payments) + extraVals (claims, reports, admin, sub-nav)
                           + moreVals (account, HR, stock) + newVals (sales, purchasing, tasks, plan)
                           loginVals() = values for splash / sign-in / toast before data loads
src/logic/constants.js     CATS, ROUTES, MODS, ROLE_MODS, status colours... (mixed into OpsApp.prototype)
src/logic/icons.js         SVG path strings for <Icon/>
src/logic/seed.js          sample data (anchored on 2026-09-07, shifted to "today" by seedState(today)); emptyState() = blank console
src/logic/samples.js       canvas-drawn sample receipts/photos ({ sample: [label, hue, kind] })
src/logic/helpers.js       todayIso, yymm, stamp, uid, rollup
src/lib/supabase.js        Supabase client ("remember me" picks localStorage vs sessionStorage)
src/lib/store.tables.js    state key -> table map (must match supabase/schema.sql)
src/lib/store.js           load / diff / upsert / delete / realtime merge / file upload
src/components/Shell.jsx   app frame: sidebar, header, sub-nav, picks the screen and overlays
src/components/Icon.jsx
src/screens/<module>/*.jsx one file per screen, all take ({ v })
src/overlays/*.jsx         drawers, modals, login, splash, toast
src/styles/global.css      base + animations + print
src/styles/pseudo.css      hover/focus classes (hv*, fc*, ac*) used by the views
src/styles/responsive.css  phone layout (<= 860px): drawer sidebar, stacked tables, etc.
supabase/schema.sql        tables, RLS, guards, sign-up gate, storage bucket, realtime
supabase/seed.sql          demo data (regenerate: npm run gen:seed)
supabase/bootstrap.sql     first admin account for an empty start
scripts/gen-seed-sql.mjs   writes seed.sql from src/logic/seed.js
```

### How data flows

1. `OpsApp` holds everything in `this.state` (same shape as the design prototype).
2. `render()` calls `renderVals()` and passes `v` to `<Shell v={v}/>`; screens read `v.something`.
3. Actions call `setState` with immutable updates (new object for any changed record).
4. `componentDidUpdate` sees a persisted slice changed and calls `store.schedule(state)`.
5. `Store.diff` compares each record by reference, then JSON, against the last saved snapshot,
   and upserts / deletes only changed rows. New rows get an `ord` between their neighbours.
6. Realtime events from other users are merged with `applyRemote` (own echoes are ignored).

Persisted slices: `users, employees, requests, notifications, tasks (piece rates), uoms, statutory, claims,
reports, audit, items, moves, customers, docs, sups, pos, projects, works` (tables `ops_*`), maps
`hr, photos, prefs`, and settings `catRates, zakatOn` (`ops_settings`). Every table is `{ id, ord, data jsonb }`.

### Security model

- Sign-up only works for emails already in `ops_users` (trigger `ops_signup_gate` on `auth.users`).
- RLS: only active console users can read or write `ops_*` tables (`ops_is_member()`).
- Only system admins can add/remove users or change role, modules or active (`ops_users_guard`).
- Module visibility inside the app is UI-level; any member can technically read all `ops_*` rows.
- Uploads go to the public bucket `ops-uploads` (unguessable paths); only members can upload.

## Adding or changing things

- New screen: add a route in `ROUTES` / `PAGE_ICONS` (`constants.js`), an `is<Name>` flag and values in a
  view model, a component in `src/screens/<module>/`, and a line in `Shell.jsx`. Sub-nav entries live in
  `SUB` inside `extraVals.js`.
- New persisted collection: add it to `store.tables.js`, add the table name to both loops in
  `supabase/schema.sql`, give it an initial value in `emptyData()` / `seed.js`.
- Views were generated from the design HTML, so styles are inline objects. Hover styles use classes in
  `pseudo.css`. Phone overrides use classes `lb-tbl`, `lb-th`, `lb-wide`, `lb-g3`, `lb-scroll`, `lb-sheet`.

## Testing notes

- `npm run build` must pass. `VITE_TEST_HOOKS=1 npm run build` exposes `window.__ops` for browser tests.
- Sample-data logins (`VITE_DEMO_DATA=true` or `seed.sql`): `zul@`, `pj@`, `neil@` (founders), `aina@`, `haziq@`,
  `melissa@` (staff), `admin@lettuboost.com` (system admin), all `@lettuboost.com`. Local mode accepts any password.
- Blank-state test: sign in with any email on a fresh browser profile; all routes were crawled with no errors.

## Known gaps / next steps

- "Emails" (notifications) are in-app records only; no email is sent yet (could add a Supabase Edge Function).
- Payslip months list comes from request dates; there is no locked monthly payroll run yet.
- Concurrent edits to the same record: last write wins.
- "Next modules" in the menu (Attendance, Leave, KPI reviews) are placeholders from the design.
