import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";
import { LEGAL_SLUGS } from "@/lib/legal-content";

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
//   - /news/[id] is dynamic and has no published posts to enumerate yet.
//
// /legal/* pages added 2026-08-17 — they carried real drafts-awaiting-
// review content and were marked noindex/omitted here until then; now that
// lib/legal-content.ts has real content and generateMetadata no longer
// sets noindex (see app/legal/[slug]/page.tsx), they're listed here too so
// the two mechanisms agree with each other.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/first-team`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    // /gallery and /faq added 2026-08-13 (Priority 6) — real, populated
    // pages now that the homepage sections link out to them.
    { url: `${SITE_URL}/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${SITE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/careers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    ...LEGAL_SLUGS.map((slug) => ({
      url: `${SITE_URL}/legal/${slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
