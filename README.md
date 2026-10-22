# LettuBoost Ops

Internal operations console for LettuBoost: payments and founder approvals, payslips, claims, field reports,
HR, stock, sales, purchasing, tasks and project plans. React + Vite front end, Supabase back end, hosted on Vercel.
Works on phones (sidebar becomes a slide-out menu below 860px).

See [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for how the code is organised.

## Run locally

```bash
git clone https://github.com/zul3/ops-lettuboost.git
cd ops-lettuboost
git checkout claude/serene-carson-gp0dp7   # until it is merged
npm install
npm run dev                                 # opens http://localhost:5173
```

With no Supabase keys the app runs in **local mode**. It starts **blank** (no sample data):
the first email you sign in with becomes the system admin (any password), then add people under
**System admin -> Users** and **Human resources**. Data is saved in this browser only.

To try the design's sample data instead, create `.env.local` containing `VITE_DEMO_DATA=true`
and clear the site data for localhost (or use a private window).

To run locally against Supabase (blank data, real sign-in), copy `.env.example` to `.env.local` and fill in the two
Supabase keys, then restart `npm run dev`.

## 1. Set up Supabase

1. Create a project at https://supabase.com.
2. Open **SQL Editor** and run, in order:
   - `supabase/schema.sql` (tables, security rules, storage bucket, realtime).
   - `supabase/bootstrap.sql` after editing the name and email to **your** email. This makes you the system admin
     and keeps everything else blank. (Skip `supabase/seed.sql`; it is only sample data.)
3. **Authentication -> Sign In / Providers -> Email**: keep Email enabled. Turn off "Confirm email" if you
   want people to sign in right after creating a password; leave it on to require a confirmation link.
4. **Authentication -> URL Configuration**: set **Site URL** to your Vercel URL (e.g. `https://lettuboost-ops.vercel.app`)
   and add it under Redirect URLs (also `http://localhost:5173` for local dev). Password reset links use this.
5. **Project Settings -> API**: copy the Project URL and the `anon` public key.

Only if you loaded `seed.sql` and want your own emails on the sample founders, run for example:

```sql
update ops_users set data = jsonb_set(data, '{email}', '"real.zul@yourmail.com"') where id = 'zul';
update ops_employees set data = jsonb_set(data, '{email}', '"real.zul@yourmail.com"') where id = 'zul';
```

### Who can sign in

Only emails listed in **System admin -> Users** (table `ops_users`) can create a password. Each person opens
the app, taps **Create your password**, and signs up with that email. Deactivated users cannot sign in.

## 2. Deploy to Vercel

1. Push this repo to GitHub and import it in Vercel (framework preset: Vite; `vercel.json` is included).
2. In **Settings -> Environment Variables** add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy. Redeploy after changing env vars (Vite bakes them in at build time).

For local dev against Supabase, copy `.env.example` to `.env.local` and fill in the same two keys.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:5173 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build |
| `npm run gen:seed` | Regenerate `supabase/seed.sql` from `src/logic/seed.js` (dates moved to today) |
