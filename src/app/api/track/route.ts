import { createBrowserClient } from "@/lib/supabase";
import { NextRequest } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { sanitizeText, isValidUUID, LIMITS } from "@/lib/sanitize";

/* ──────────────────────────────────────────
   POST /api/track — Visitor page-view tracking
   Hardened with:
   • Rate limiting (60 req / min per IP)
   • Input sanitization & length limits
   • UUID format validation
   ────────────────────────────────────────── */

// Rate limit: 60 page-view tracks per minute per IP
const TRACK_LIMIT = 60;
const TRACK_WINDOW = 60 * 1000; // 1 minute

// Parse user-agent into device type, browser, and OS
function parseUserAgent(ua: string) {
  const isMobile = /Mobile|Android|iPhone|iPod/i.test(ua);
  const isTablet = /Tablet|iPad/i.test(ua);
  const deviceType = isTablet ? "tablet" : isMobile ? "mobile" : "desktop";

  let browser = "Unknown";
  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/Chrome/i.test(ua)) browser = "Chrome";
  else if (/Firefox/i.test(ua)) browser = "Firefox";
  else if (/Safari/i.test(ua)) browser = "Safari";
  else if (/Opera|OPR/i.test(ua)) browser = "Opera";

  let os = "Unknown";
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Mac OS/i.test(ua)) os = "macOS";
  else if (/Linux/i.test(ua)) os = "Linux";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iOS|iPhone|iPad/i.test(ua)) os = "iOS";

  return { deviceType, browser, os };
}

// Resolve country from IP using free geo API
async function resolveGeo(ip: string) {
  try {
    // Skip localhost / private IPs
    if (
      ip === "127.0.0.1" ||
      ip === "::1" ||
      ip.startsWith("192.168.") ||
      ip.startsWith("10.")
    ) {
      return { country: "Local", city: "Local" };
    }
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=country,city`, {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      return { country: data.country || "Unknown", city: data.city || "Unknown" };
    }
  } catch {
    // Geo lookup failed — non-critical
  }
  return { country: "Unknown", city: "Unknown" };
}

export async function POST(request: NextRequest) {
  try {
    // ── Rate Limiting ──
    const ip = getClientIp(request.headers);
    const { allowed } = rateLimit(`track:${ip}`, TRACK_LIMIT, TRACK_WINDOW);
    if (!allowed) {
      return Response.json({ error: "Rate limited" }, { status: 429 });
    }

    const body = await request.json();
    const { pagePath, referrer, visitorId, sessionId } = body;

    // ── Sanitize Inputs ──
    const cleanPagePath = sanitizeText(pagePath, LIMITS.PAGE_PATH);
    const cleanReferrer = sanitizeText(referrer || "", LIMITS.REFERRER) || null;

    if (!cleanPagePath) {
      return Response.json({ error: "pagePath is required" }, { status: 400 });
    }

    // Validate UUID formats (if provided)
    const cleanVisitorId =
      visitorId && isValidUUID(visitorId) ? visitorId : null;
    const cleanSessionId =
      sessionId && isValidUUID(sessionId) ? sessionId : null;

    // Extract and parse user agent (sanitized to max length)
    const rawUA = request.headers.get("user-agent") || "";
    const userAgent = rawUA.slice(0, LIMITS.USER_AGENT);
    const { deviceType, browser, os } = parseUserAgent(userAgent);

    // Resolve geo (non-blocking — we still insert even if this fails)
    const { country, city } = await resolveGeo(ip);

    // Insert into Supabase using Anon Key
    const supabase = createBrowserClient();
    const { error } = await supabase.from("page_views").insert({
      page_path: cleanPagePath,
      referrer: cleanReferrer,
      user_agent: userAgent,
      ip_address: ip === "::1" ? "127.0.0.1" : ip,
      country,
      city,
      device_type: deviceType,
      browser,
      os,
      session_id: cleanSessionId,
      visitor_id: cleanVisitorId,
    });

    if (error) {
      console.error("Track insert error:", error);
      return Response.json({ error: "Failed to track" }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Track error:", err);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
