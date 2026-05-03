import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ──────────────────────────────────────────
     SECURITY HEADERS
     Applied to every response from the app.
     ────────────────────────────────────────── */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking — only your own site can frame pages
          { key: "X-Frame-Options", value: "DENY" },

          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },

          // Control referrer information sent with requests
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

          // Legacy XSS protection (modern browsers use CSP, but this helps older ones)
          { key: "X-XSS-Protection", value: "1; mode=block" },

          // Restrict browser features (camera, microphone, geolocation, etc.)
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },

          // Enforce HTTPS for 1 year (including subdomains)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },

          // Content Security Policy — restrict resource loading origins
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://*.supabase.co https://ip-api.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },

          // Prevent browsers from DNS-prefetching third-party domains
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
