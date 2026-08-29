// Shared boilerplate for per-page <head> metadata. Every marketing page
// under app/ was hand-rolling the same canonical/hreflang-stub/Open Graph
// shape (see the individual page files' own git history — 2026-08-20/21
// passes — for why each of those pieces exists); this factors the
// repeated structure into one call so a page only supplies what's actually
// distinct about it: its title, description, path, and any indexing
// override.
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/content";

const OG_IMAGE = { url: "/images/og/social-share.jpg", width: 1200, height: 630 };

export type PageMetadataOptions = {
  /** Site-relative path, e.g. "/news". Used for canonical, hreflang stubs, and the OG url. */
  path: string;
  title: string;
  /** Omitted by /legal/[slug], which has no per-page description today. */
  description?: string;
  /**
   * True for thin/placeholder pages that shouldn't be indexed yet (matches
   * the `robots: { index: false, follow: true }` pattern used on /news and
   * /our-coaches while their upstream content lists are still empty).
   */
  noindex?: boolean;
  /**
   * Self-referencing hreflang stub (fr/en/x-default all pointing at the
   * same URL) — see app/layout.tsx's comment for why this is a deliberate
   * approximation rather than real per-language routing. Every page opts
   * in except /our-coaches, which predates this being added consistently;
   * default true, pass false to omit.
   */
  languages?: boolean;
  /**
   * Per-page Open Graph block — needed because Next doesn't deep-merge
   * openGraph with the root layout's, so without this every shared link
   * showed the homepage's title/description (see first-team/page.tsx's
   * original comment on this). Every page opts in except /our-coaches;
   * default true, pass false to omit.
   */
  openGraph?: boolean;
};

export function buildPageMetadata({
  path,
  title,
  description,
  noindex,
  languages = true,
  openGraph = true,
}: PageMetadataOptions): Metadata {
  return {
    title,
    ...(description ? { description } : {}),
    alternates: {
      canonical: path,
      ...(languages ? { languages: { fr: path, en: path, "x-default": path } } : {}),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    ...(openGraph
      ? {
          openGraph: {
            title,
            ...(description ? { description } : {}),
            url: `${SITE_URL}${path}`,
            images: [OG_IMAGE],
            type: "website",
          },
        }
      : {}),
  };
}
