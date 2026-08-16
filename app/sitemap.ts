import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

// CORRECTED 2026-08-14 — was the apex (non-www) domain, which redirects
// to www at the Vercel platform level (see layout.tsx's SITE_URL comment
// for the full story). Listing a redirecting URL in the sitemap sends
// Google a self-contradicting canonical signal; www is the real, live,
// already-indexed domain.
// CENTRALISED 2026-08-16 (Priority 1) — now imported from lib/content.ts
// instead of a locally-duplicated copy.

// Corrected 2026-08-13, site improvement pass, Priority 8. This was stale —
// its own comment called the project a "single-page site" and only listed
// "/", even though /careers and /first-team have existed as real routes for
// a while (and /our-coaches, /news, /news/[id], /legal/[slug] exist too).
// Deliberately still NOT listing every route that exists in app/:
//   - /our-coaches and /news are real pages but currently render their
//     empty state (confirmed live: the OS app's public coaches/news API
//     both return zero entries as of this pass) — thin/placeholder content
//     doesn't belong in a sitemap. Add them back once Patrick publishes
//     real coach bios or a news post.
//   - /legal/* pages are explicit drafts awaiting review (see
//     lib/legal-content.ts) and are marked noindex on the page itself;
//     omitted here for the same reason, and to avoid the two mechanisms
//     disagreeing with each other.
//   - /news/[id] is dynamic and has no published posts to enumerate yet.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/first-team`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    // /gallery and /faq added 2026-08-13 (Priority 6) — real, populated
    // pages now that the homepage sections link out to them.
    { url: `${SITE_URL}/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${SITE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/careers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];
}
