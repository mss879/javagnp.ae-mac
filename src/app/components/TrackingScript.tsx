"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* ──────────────────────────────────────────
   TrackingScript – fires a POST /api/track
   on every client-side page navigation.
   Sets a persistent visitor_id cookie and a
   session_id (per browser session).
   ────────────────────────────────────────── */

function getOrCreateId(key: string, persistent: boolean): string {
  if (typeof window === "undefined") return "";

  if (persistent) {
    // Use localStorage for persistent visitor ID
    let id = localStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(key, id);
    }
    return id;
  } else {
    // Use sessionStorage for session ID
    let id = sessionStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(key, id);
    }
    return id;
  }
}

export default function TrackingScript() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin pages
    if (pathname?.startsWith("/admin")) return;

    const visitorId = getOrCreateId("_jgnp_vid", true);
    const sessionId = getOrCreateId("_jgnp_sid", false);

    // Fire and forget — non-blocking
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pagePath: pathname,
        referrer: document.referrer || null,
        visitorId,
        sessionId,
      }),
    }).catch(() => {
      // Silently fail — tracking should never break UX
    });
  }, [pathname]);

  return null; // This component renders nothing
}
