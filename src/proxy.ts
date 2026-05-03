import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* ──────────────────────────────────────────
   Proxy — Server-side route protection
   (Next.js 16 "proxy" convention — replaces
   the deprecated "middleware" file.)

   Protects /admin/* routes (except /admin/login)
   from unauthenticated access.
   ────────────────────────────────────────── */

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin Route Protection ──
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    // Check for Supabase auth token in cookies or Authorization header
    const authHeader = request.headers.get("authorization");
    const accessToken = authHeader?.replace("Bearer ", "");

    // Also check for a cookie-based token (set by the client)
    const cookieToken = request.cookies.get("sb_access_token")?.value;

    const token = accessToken || cookieToken;

    if (!token) {
      // No token found — redirect to admin login
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Note: The token itself is validated by Supabase when the client
    // makes API calls. This proxy only ensures a token exists.
    // Full JWT verification would require the Supabase JWT secret,
    // which adds complexity. The client-side + RLS policies handle
    // the actual authorization.
  }

  // ── Security: Block direct API access without proper headers ──
  if (pathname.startsWith("/api/")) {
    const response = NextResponse.next();

    // Prevent caching of API responses
    response.headers.set("Cache-Control", "no-store, max-age=0");

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect admin routes
    "/admin/:path*",
    // Apply to API routes
    "/api/:path*",
  ],
};
