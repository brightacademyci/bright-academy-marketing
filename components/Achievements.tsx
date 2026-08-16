"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { BrandDiagram } from "./BrandDiagram";

function TrophyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 4h8v4a4 4 0 01-8 0V4z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 5H5a1 1 0 00-1 1v1a3 3 0 003 3M16 5h3a1 1 0 011 1v1a3 3 0 01-3 3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12v3M9 20h6M10 17h4v3h-4z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

// Highlight-reel links — added 2026-08-13, Patrick's follow-up: he wants
// each "competitions won" card to link out (new tab) to the YouTube
// highlights from that tournament. He sent two links; both are for the Abu
// Dhabi Cup trip specifically (he corrected an earlier assumption that one
// was for Surf Cup International — that card has no video for now).
//
// Corrected 2026-08-13: Patrick clarified both links are general recaps of
// the whole Abu Dhabi trip, not one-per-age-group — "both videos on links
// are for both teams, so U14 and U16... just a recap of our journey." So
// both Abu Dhabi cards now offer both videos, rather than the earlier
// (wrong) guess of one video per card by upload order. Keyed by
// trophy.image since that's the one field in lib/content.ts that's already
// unique per card and identical across the EN/FR translations (no need to
// touch content.ts in two languages for a language-independent URL).
const ABU_DHABI_VIDEOS = [
  "https://youtu.be/kRlVYM3jLmU?si=WUnzCkC9mNjH0IxN",
  "https://youtu.be/xItyMOGWP7Y?si=_jqB68th_e4BlFfw",
];
const TROPHY_VIDEOS: Record<string, string[]> = {
  "/images/achievements/abu-dhabi-u14.jpg": ABU_DHABI_VIDEOS,
  "/images/achievements/abu-dhabi-u16.jpg": ABU_DHABI_VIDEOS,
};

export function Achievements() {
  const { t } = useLanguage();

  return (
    <section id="achievements" className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-orange/10 blur-3xl"
      />
      <BrandDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.07]" />
      <div className="relative mx-auto max-w-content px-5">
        <Reveal className="max-w-2xl">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.achievements.eyebrow}</span>
          <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">{t.achievements.title}</h2>
          <p className="mt-3 text-[14px] text-white/70">{t.achievements.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {t.achievements.trophies.map((trophy, i) => {
            const videos = TROPHY_VIDEOS[trophy.image] ?? [];
            // A card with 2+ videos can't be one single <a> the way the
            // old one-video-per-card version was — the whole card is now a
            // plain div, and each video gets its own small link at the
            // bottom instead. The image's hover play-icon stays purely
            // decorative (no href of its own) to signal "video content
            // here" without implying a single click target.
            return (
              <Reveal key={`${trophy.tournament}-${trophy.location}-${i}`} delay={i * 90}>
                <div className="group block h-full overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/10">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={trophy.image}
                      alt={`${trophy.tournament} — ${trophy.results.join(", ")}`}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(min-width: 640px) 33vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/10 to-transparent" />
                    {videos.length > 0 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-navy-deep/0 transition duration-300 group-hover:bg-navy-deep/30">
                        <span className="flex h-12 w-12 scale-90 items-center justify-center rounded-full bg-white/90 text-navy-deep opacity-0 shadow-lg transition duration-300 group-hover:scale-100 group-hover:opacity-100">
                          <PlayIcon />
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5">
                      {trophy.results.map((result) => (
                        <span
                          key={result}
                          className="inline-flex items-center gap-1 rounded-full bg-orange/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-orange"
                        >
                          <TrophyIcon />
                          {result}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-3 font-display text-[16px] font-semibold text-white">{trophy.tournament}</h3>
                    <p className="mt-1 text-[13px] text-white/60">{trophy.location}</p>
                    {videos.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                        {videos.map((video, vi) => (
                          <a
                            key={video}
                            href={video}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-orange hover:text-orange/80"
                          >
                            <PlayIcon size={13} />
                            {videos.length > 1 ? `${t.achievements.watchHighlights} ${vi + 1}` : t.achievements.watchHighlights}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
