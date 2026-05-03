/* ──────────────────────────────────────────
   POST /api/auth/logout — Admin logout
   ────────────────────────────────────────── */

export async function POST() {
  // Client-side handles token removal from localStorage.
  // This endpoint exists as a clean API contract.
  return Response.json({ ok: true, message: "Logged out" });
}
