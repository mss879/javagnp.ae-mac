/* ──────────────────────────────────────────
   Input Sanitization Utilities
   ────────────────────────────────────────── */

/**
 * Strip HTML tags and trim whitespace.
 */
export function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")  // Remove HTML tags
    .replace(/&[#\w]+;/g, "") // Remove HTML entities
    .trim();
}

/**
 * Sanitize a text field: strip HTML, enforce max length.
 */
export function sanitizeText(input: unknown, maxLength: number): string {
  if (typeof input !== "string") return "";
  return stripHtml(input).slice(0, maxLength);
}

/**
 * Validate an email address (RFC 5322 simplified).
 */
export function isValidEmail(email: string): boolean {
  if (email.length > 254) return false;
  // More thorough than the basic regex — checks TLD exists, no consecutive dots
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return re.test(email);
}

/**
 * Validate a value is one of the allowed options.
 */
export function isAllowedValue(value: string, allowed: string[]): boolean {
  return allowed.includes(value);
}

/**
 * Validate a UUID v4 format.
 */
export function isValidUUID(value: string): boolean {
  if (typeof value !== "string") return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

/* ── Field length constants ── */
export const LIMITS = {
  NAME: 100,
  EMAIL: 254,
  MESSAGE: 5000,
  INQUIRY_TYPE: 50,
  PAGE_PATH: 500,
  REFERRER: 2000,
  USER_AGENT: 500,
} as const;

/* ── Allowed inquiry types ── */
export const ALLOWED_INQUIRY_TYPES = [
  "enterprise",
  "cloud",
  "consulting",
  "other",
] as const;
