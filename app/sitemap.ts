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
// /videos added 2026-08-29 (audit fix — it had been live and populated
// since the 2026-08-25 Videos launch with no sitemap entry and no comment
// explaining the omission, unlike every other excluded route above).
// Priority/changeFrequency mirror /gallery: same short-revalidate-window
// "meant to feel live" content (see lib/api.ts's VIDEOS_REVALIDATE_SECONDS,
// same 60s window as the gallery's own).
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
    // /trial added 2026-08-17 — the new trial-request form (see
    // TrialRequestForm.tsx), a real, populated, high-intent conversion page.
    { url: `${SITE_URL}/trial`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    // /gallery and /faq added 2026-08-13 (Priority 6) — real, populated
    // pages now that the homepage sections link out to them.
    { url: `${SITE_URL}/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${SITE_URL}/videos`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${SITE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/careers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    // /partners added 2026-08-30 — a real, populated corporate-partnership
    // page (see PartnersSection.tsx), same "real page, add it" bar as
    // every other route here.
    { url: `${SITE_URL}/partners`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    // /founder added 2026-08-30, homepage-length audit fix — the founder's
    // full bio moved off the homepage to this dedicated route (see
    // app/founder/page.tsx). changeFrequency/priority mirror /careers:
    // real, populated, but not high-turnover content.
    { url: `${SITE_URL}/founder`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    ...LEGAL_SLUGS.map((slug) => ({
      url: `${SITE_URL}/legal/${slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
