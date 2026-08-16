import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

// CORRECTED 2026-08-14 — see layout.tsx's SITE_URL comment: www is the
// real, live, already-indexed domain (apex redirects to it at the
// platform level), so the sitemap directive here now points at it too.
// CENTRALISED 2026-08-16 (Priority 1) — now imported from lib/content.ts
// instead of a locally-duplicated copy.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
