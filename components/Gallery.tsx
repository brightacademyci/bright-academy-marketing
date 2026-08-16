"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { Lightbox } from "./Lightbox";
import { BrandDiagram } from "./BrandDiagram";
import type { PublicGalleryItem } from "@/lib/api";

// Distinct alt text per photo rather than one generic caption repeated 8
// times — better for screen readers and image search alike.
const IMAGES = [
  { file: "gallery-1.jpg", alt: "Bright Academy player waiting on the pitch before training" },
  { file: "gallery-2.jpg", alt: "Bright Academy players seated on the bench ahead of a match" },
  { file: "gallery-3.jpg", alt: "Bright Academy player in orange kit focused on the ball" },
  { file: "gallery-4.jpg", alt: "A Bright Academy coach helping a young player with their boots" },
  { file: "gallery-5.jpg", alt: "Young Bright Academy player on the sideline during a session" },
  { file: "gallery-6.jpg", alt: "Bright Academy player training near the goal" },
  { file: "gallery-7.jpg", alt: "Bright Academy players running a passing drill with their coach" },
  { file: "gallery-8.jpg", alt: "Bright Academy player wearing the club jersey, seen from behind" },
  { file: "gallery-9.jpg", alt: "Young Bright Academy player working on ball control through cones" },
  { file: "gallery-10.jpg", alt: "Bright Academy players in training bibs chatting together on the pitch" },
  { file: "gallery-11.jpg", alt: "Bright Academy player smiling while running during a match" },
  { file: "gallery-12.jpg", alt: "Bright Academy players sitting together pitch-side near the goal" },
  { file: "gallery-13.jpg", alt: "Bright Academy player dribbling the ball on the stadium pitch" },
  { file: "gallery-14.jpg", alt: "Young Bright Academy players holding footballs before a session" },
];

interface GalleryEntry {
  src: string;
  alt: string;
  isLive: boolean;
}

interface GalleryProps {
  liveItems?: PublicGalleryItem[];
  /** Cap the grid to the N strongest/most-recent photos and show a "see full gallery" link — added 2026-08-13, Priority 6/9. Omit for the full, uncapped grid (used on the dedicated /gallery page). */
  limit?: number;
  /** Render the section title as the page's <h1> instead of an <h2> —
   *  added 2026-08-13, Priority 8 verification pass, same reasoning as
   *  FAQ.tsx's asH1 prop: the dedicated /gallery page had no <h1> at all. */
  asH1?: boolean;
}

export function Gallery({ liveItems = [], limit, asH1 = false }: GalleryProps) {
  const { t, lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const TitleTag = asH1 ? "h1" : "h2";

  // Live session photos (published by a Content Manager through the OS
  // app's "publish to gallery" flow — see lib/api.ts's getGalleryItems())
  // lead the grid, most recent first, ahead of the curated static set below
  // — the merge point between "what's actually happening at the academy
  // right now" and the hand-picked hero shots. Live entries carry a full
  // remote (signed Storage) URL rather than a local /images/ path, so they
  // render via a plain <img> instead of next/image (see the isLive check
  // below and Lightbox.tsx's own note) — no build-time remote-domain
  // allowlist needed for a URL whose host isn't knowable ahead of time.
  const allEntries = useMemo<GalleryEntry[]>(
    () => [
      ...liveItems.map((item) => ({ src: item.photoUrl, alt: item.title || "Bright Academy training photo", isLive: true })),
      ...IMAGES.map((img) => ({ src: `/images/${img.file}`, alt: img.alt, isLive: false })),
    ],
    [liveItems]
  );
  // Added 2026-08-13, Priority 9 ("avoid loading the full gallery on
  // initial page load"): the homepage passes limit={8} so it only ever
  // mounts 8 <img>/<Image> nodes instead of every live item plus all 14
  // static photos. The full, unlimited grid still exists — see
  // app/gallery/page.tsx — this component just decides how much of it to
  // render, in one place, rather than duplicating the merge logic above.
  const entries = limit ? allEntries.slice(0, limit) : allEntries;
  const isTruncated = limit != null && allEntries.length > limit;

  return (
    <section id="gallery" className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      <BrandDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <div className="relative mx-auto max-w-content px-5">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.gallery.eyebrow}</span>
            <TitleTag className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{t.gallery.title}</TitleTag>
          </div>
          {isTruncated && (
            <Link href="/gallery" className="shrink-0 text-[13px] font-semibold text-orange hover:underline">
              {lang === "fr" ? "Voir toute la galerie →" : "See full gallery →"}
            </Link>
          )}
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {entries.map((entry, i) => (
            <button
              key={entry.src}
              onClick={() => setOpenIndex(i)}
              className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-white/10"
              aria-label={`Open photo: ${entry.alt}`}
            >
              {entry.isLive ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={entry.src}
                  alt={entry.alt}
                  loading={i < 4 ? "eager" : "lazy"}
                  className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              ) : (
                <Image
                  src={entry.src}
                  alt={entry.alt}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(min-width: 768px) 25vw, 50vw"
                  loading={i < 4 ? "eager" : "lazy"}
                />
              )}
              <span className="absolute inset-0 bg-navy-deep/0 transition group-hover:bg-navy-deep/20" />
            </button>
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox
          images={entries.map((entry) => entry.src)}
          alts={entries.map((entry) => entry.alt)}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </section>
  );
}
