import { createClient } from "@supabase/supabase-js";

/* ──────────────────────────────────────────
   BROWSER CLIENT (client components)
   Uses the anon key — respects RLS policies.
   ────────────────────────────────────────── */
export function createBrowserClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/* ──────────────────────────────────────────
   SERVER CLIENT (API routes / server actions)
   Uses the service-role key — BYPASSES RLS.
   Never import this on the client side.
   ────────────────────────────────────────── */
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
