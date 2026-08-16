"use client";

import { useMemo } from "react";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { PitchDiagram } from "./PitchDiagram";
import type { PublicCoach } from "@/lib/api";

// Both language variants are fetched server-side (see app/our-coaches/page.tsx)
// and handed down as props, since this site's language toggle is
// client-side-only with no URL/cookie signal a server component could use
// to know which one to fetch at request time — same pattern this repo's
// own README documents for any page needing server-fetched, language-aware
// content. This component just picks the active one via useLanguage().
export function OurCoachesSection({ coachesEn, coachesFr }: { coachesEn: PublicCoach[]; coachesFr: PublicCoach[] }) {
  const { lang, t } = useLanguage();
  const coaches = useMemo(() => (lang === "fr" ? coachesFr : coachesEn), [lang, coachesEn, coachesFr]);

  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      <PitchDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <div className="relative mx-auto max-w-content px-5">
        <Reveal className="max-w-2xl">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.ourCoaches.eyebrow}</span>
          <h1 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{t.ourCoaches.title}</h1>
          <p className="mt-3 text-[14px] text-white/70">{t.ourCoaches.subtitle}</p>
        </Reveal>

        {coaches.length === 0 ? (
          <p className="mt-10 text-[13px] text-white/60">{t.ourCoaches.none}</p>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coaches.map((coach, i) => (
              <Reveal key={coach.id} delay={i * 60}>
                {/* Photo-forward card, redesigned 2026-08-13 (PSG.fr-inspired
                 *  revamp) — a real coach photo is now the lead element of
                 *  the card (matching how PSG's own staff/squad cards work),
                 *  not a small 56px avatar next to text. A coach with no
                 *  photo on file still gets the same card shape via a
                 *  gradient + large initials placeholder at the same aspect
                 *  ratio, so the grid stays visually consistent either way. */}
                <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:ring-orange/30">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    {coach.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={coach.avatarUrl} alt={coach.fullName} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange/20 via-navy-deep to-navy-deep font-display text-3xl font-bold text-white/60">
                        {coach.fullName
                          .split(" ")
                          .map((p) => p[0])
                          .filter(Boolean)
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-display text-[15px] font-semibold text-white">{coach.fullName}</h3>
                      <p className="text-[12px] font-semibold text-orange">{coach.roleLabel}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    {coach.siteName && <p className="text-[12px] font-medium text-white/55">{coach.siteName}</p>}
                    {coach.bio && <p className="mt-2 flex-1 text-[13px] leading-relaxed text-white/75">{coach.bio}</p>}
                    {coach.yearsExperience !== null && (
                      <p className="mt-3 text-[12px] font-medium text-white/55">
                        {coach.yearsExperience} {t.ourCoaches.yearsExperience}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
