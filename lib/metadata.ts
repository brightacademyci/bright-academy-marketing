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

/**
 * A page's own share image (what WhatsApp, Facebook, LinkedIn, X and
 * iMessage show when its link is posted). Files live in public/images/og/
 * and should be 1200x630 so no platform crops them. Pages that don't pass
 * one keep the site-wide default above.
 */
export type ShareImage = { path: string; alt?: string };

export function shareImage(image?: ShareImage) {
  return image ? { url: image.path, width: 1200, height: 630, ...(image.alt ? { alt: image.alt } : {}) } : OG_IMAGE;
}

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
  /** This page's own share image; see ShareImage. Defaults to the site-wide image. */
  image?: ShareImage;
};

export function buildPageMetadata({
  path,
  title,
  description,
  noindex,
  languages = true,
  openGraph = true,
  image,
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
            images: [shareImage(image)],
            type: "website",
          },
          // Next doesn't merge twitter with the layout's either: without
          // this, X/Twitter would keep showing the site-wide image.
          ...(image
            ? {
                twitter: {
                  card: "summary_large_image" as const,
                  title,
                  ...(description ? { description } : {}),
                  images: [image.path],
                },
              }
            : {}),
        }
      : {}),
  };
}
