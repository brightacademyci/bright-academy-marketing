"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";

function TrophyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 4h8v4a4 4 0 01-8 0V4z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 5H5a1 1 0 00-1 1v1a3 3 0 003 3M16 5h3a1 1 0 011 1v1a3 3 0 01-3 3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12v3M9 20h6M10 17h4v3h-4z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Achievements() {
  const { t } = useLanguage();

  return (
    <section id="achievements" className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-orange/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-content px-5">
        <Reveal className="max-w-2xl">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.achievements.eyebrow}</span>
          <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">{t.achievements.title}</h2>
          <p className="mt-3 text-[14px] text-white/70">{t.achievements.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {t.achievements.trophies.map((trophy, i) => (
            <Reveal key={`${trophy.tournament}-${trophy.location}-${i}`} delay={i * 90}>
              <div className="group h-full overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/10">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={trophy.image}
                    alt={`${trophy.tournament} — ${trophy.results.join(", ")}`}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(min-width: 640px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/10 to-transparent" />
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
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
