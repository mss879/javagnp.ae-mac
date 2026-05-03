import { createBrowserClient } from "@/lib/supabase";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import {
  sanitizeText,
  isValidEmail,
  isAllowedValue,
  LIMITS,
  ALLOWED_INQUIRY_TYPES,
} from "@/lib/sanitize";

/* ──────────────────────────────────────────
   POST /api/contact — Contact form submission
   Hardened with:
   • Rate limiting (3 req / 15 min per IP)
   • Honeypot field detection
   • Time-based bot detection
   • Input sanitization & validation
   ────────────────────────────────────────── */

// Rate limit: 3 submissions per 15 minutes per IP
const CONTACT_LIMIT = 3;
const CONTACT_WINDOW = 15 * 60 * 1000; // 15 minutes

// Minimum time (ms) a real human needs to fill the form
const MIN_FORM_TIME_MS = 3000; // 3 seconds

export async function POST(request: Request) {
  try {
    // ── Rate Limiting ──
    const ip = getClientIp(request.headers);
    const { allowed, resetIn } = rateLimit(
      `contact:${ip}`,
      CONTACT_LIMIT,
      CONTACT_WINDOW
    );
    if (!allowed) {
      return Response.json(
        {
          error: "Too many submissions. Please try again later.",
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
    const { firstName, lastName, email, inquiryType, message } = body;

    // ── Honeypot Check ──
    // If the hidden "website" field is filled, it's a bot
    if (body.website) {
      // Return 200 to not alert the bot, but silently discard
      return Response.json({ ok: true, message: "Inquiry submitted successfully" });
    }

    // ── Time-Based Bot Detection ──
    // If the form was submitted too quickly, likely a bot
    if (body._formLoadedAt) {
      const loadedAt = Number(body._formLoadedAt);
      const elapsed = Date.now() - loadedAt;
      if (elapsed < MIN_FORM_TIME_MS) {
        // Silently discard — looks like success to the bot
        return Response.json({ ok: true, message: "Inquiry submitted successfully" });
      }
    }

    // ── Sanitize Inputs ──
    const cleanFirstName = sanitizeText(firstName, LIMITS.NAME);
    const cleanLastName = sanitizeText(lastName, LIMITS.NAME);
    const cleanEmail = sanitizeText(email, LIMITS.EMAIL);
    const cleanInquiryType = sanitizeText(inquiryType, LIMITS.INQUIRY_TYPE);
    const cleanMessage = sanitizeText(message, LIMITS.MESSAGE);

    // ── Validate Required Fields ──
    if (
      !cleanFirstName ||
      !cleanLastName ||
      !cleanEmail ||
      !cleanInquiryType ||
      !cleanMessage
    ) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // ── Email Validation ──
    if (!isValidEmail(cleanEmail)) {
      return Response.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // ── Whitelist Inquiry Type ──
    if (
      !isAllowedValue(cleanInquiryType, [...ALLOWED_INQUIRY_TYPES])
    ) {
      return Response.json(
        { error: "Invalid inquiry type" },
        { status: 400 }
      );
    }

    // ── Insert into Supabase ──
    const supabase = createBrowserClient();
    const { error } = await supabase.from("inquiries").insert({
      first_name: cleanFirstName,
      last_name: cleanLastName,
      email: cleanEmail,
      inquiry_type: cleanInquiryType,
      message: cleanMessage,
      status: "new",
    });

    if (error) {
      console.error("Contact insert error:", error);
      return Response.json(
        { error: "Failed to submit inquiry" },
        { status: 500 }
      );
    }

    return Response.json({ ok: true, message: "Inquiry submitted successfully" });
  } catch (err) {
    console.error("Contact error:", err);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
