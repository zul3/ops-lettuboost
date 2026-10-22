import { createClient } from '@supabase/supabase-js';

const env = import.meta.env || {};
const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_ANON_KEY;

// "Remember me" decides whether the session survives closing the browser.
const REMEMBER = 'lb-remember';
export function setRemember(on) {
  try { localStorage.setItem(REMEMBER, on ? '1' : '0'); } catch (e) { /* storage blocked */ }
}
function remembered() {
  try { return localStorage.getItem(REMEMBER) !== '0'; } catch (e) { return true; }
}
const authStorage = {
  getItem: (k) => { try { return localStorage.getItem(k) ?? sessionStorage.getItem(k); } catch (e) { return null; } },
  setItem: (k, v) => {
    try {
      if (remembered()) { localStorage.setItem(k, v); sessionStorage.removeItem(k); }
      else { sessionStorage.setItem(k, v); localStorage.removeItem(k); }
    } catch (e) { /* storage blocked */ }
  },
  removeItem: (k) => { try { localStorage.removeItem(k); sessionStorage.removeItem(k); } catch (e) { /* storage blocked */ } }
};

export const supabase = url && key
  ? createClient(url, key, { auth: { storage: authStorage, persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } })
  : null;

export const isSupabase = !!supabase;

// Public bucket for receipts, report photos and profile pictures.
export const UPLOAD_BUCKET = 'ops-uploads';
