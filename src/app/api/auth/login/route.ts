import { createClient } from "@supabase/supabase-js";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { sanitizeText } from "@/lib/sanitize";

/* ──────────────────────────────────────────
   POST /api/auth/login — Admin login
   Hardened with:
   • Rate limiting (5 attempts / 15 min per IP)
   • Generic error messages (don't leak user existence)
   • Input length limits
   ────────────────────────────────────────── */

// Rate limit: 5 login attempts per 15 minutes per IP
const LOGIN_LIMIT = 5;
const LOGIN_WINDOW = 15 * 60 * 1000; // 15 minutes

export async function POST(request: Request) {
  try {
    // ── Rate Limiting ──
    const ip = getClientIp(request.headers);
    const { allowed, resetIn } = rateLimit(
      `login:${ip}`,
      LOGIN_LIMIT,
      LOGIN_WINDOW
    );
    if (!allowed) {
      return Response.json(
        {
          error:
            "Too many login attempts. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(resetIn / 1000)),
          },
        }
      );
    }

    const body = await request.json();

    // ── Sanitize & Validate ──
    const email = sanitizeText(body.email, 254);
    const password =
      typeof body.password === "string"
        ? body.password.slice(0, 128)
        : "";

    if (!email || !password) {
      return Response.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Use anon key for auth (not service role)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Generic error message — don't reveal if account exists
      return Response.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Return session tokens — the client stores them
    return Response.json({
      ok: true,
      session: {
        access_token: data.session?.access_token,
        refresh_token: data.session?.refresh_token,
        expires_at: data.session?.expires_at,
      },
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
