"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { BrandDiagram } from "./BrandDiagram";
import type { PublicVideo } from "@/lib/api";

interface VideosProps {
  items?: PublicVideo[];
  /** Cap the grid to the N most recent videos and show a "see all videos"
   *  link — mirrors Gallery.tsx's own limit prop. Omit for the full,
   *  uncapped grid (used on the dedicated /videos page). */
  limit?: number;
  /** Render the section title as the page's <h1> — mirrors Gallery.tsx's
   *  asH1 prop, used on the dedicated /videos page. */
  asH1?: boolean;
}

/**
 * Added 2026-08-25, Patrick's follow-up to the photo gallery ask: a video
 * option "on the website both for the first team and for the academy."
 * This renders the Academy-wide videos (see lib/api.ts's getVideos()) —
 * the First Team's own videos render inside FirstTeamSection.tsx's Videos
 * tab instead, same split as the two photo galleries already use.
 *
 * Unlike Gallery.tsx there's no curated static fallback content (no stock
 * video reel exists for this site) — so when there are no live videos yet,
 * this renders nothing at all rather than an empty section, same
 * "acknowledge and skip" convention lib/api.ts's own doc comment
 * describes for every other optional section on this site.
 */
export function Videos({ items = [], limit, asH1 = false }: VideosProps) {
  const { t, lang } = useLanguage();
  const TitleTag = asH1 ? "h1" : "h2";

  // The homepage teaser (limit set, not asH1) keeps the original
  // "acknowledge and skip" behavior described above — no live videos yet
  // means no section at all. The dedicated /videos page (asH1) can't do
  // that: it needs a real <h1> in the DOM for accessibility/SEO regardless
  // of whether there's anything to show yet, so that case always renders
  // the section — fixed 2026-08-29 after an audit caught /videos rendering
  // with no heading at all whenever the list was empty (this early return
  // used to skip the whole section, TitleTag included, before either case
  // got a chance to render).
  if (items.length === 0 && !asH1) return null;

  const entries = limit ? items.slice(0, limit) : items;
  const isTruncated = limit != null && items.length > limit;

  return (
    <section id="videos" className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      <BrandDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <div className="relative mx-auto max-w-content px-5">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.videos.eyebrow}</span>
            <TitleTag className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{t.videos.title}</TitleTag>
          </div>
          {isTruncated && (
            <Link href="/videos" className="shrink-0 text-[13px] font-semibold text-orange hover:underline">
              {lang === "fr" ? "Voir toutes les vidéos →" : "See all videos →"}
            </Link>
          )}
        </Reveal>

        {entries.length === 0 ? (
          <p className="mt-8 text-[13px] text-white/60">{t.videos.none}</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {entries.map((video) => (
              <div key={video.id} className="overflow-hidden rounded-xl ring-1 ring-white/10">
                <div className="aspect-video">
                  <iframe
                    src={video.videoUrl}
                    title={video.title || "Bright Academy video"}
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {(video.title || video.caption) && (
                  <div className="bg-white/5 px-4 py-3">
                    {video.title && <p className="font-display text-[14px] font-semibold text-white">{video.title}</p>}
                    {video.caption && <p className="text-[12px] text-white/60">{video.caption}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
