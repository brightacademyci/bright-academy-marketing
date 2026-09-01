"use client";

import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { ENROLL_URL } from "@/lib/content";
import { Reveal } from "./Reveal";
import { TrophyDiagram, WhistleDiagram, GoalNetDiagram, WreathDiagram, CornerFlagDiagram } from "./ProgramIcons";
import { TrialButton } from "./TrialButton";
import { ProgramComparison } from "./ProgramComparison";
import { getProgramPricing } from "@/lib/pricing";

// Category badges — added 2026-08-13, Patrick's follow-up: he circled six
// of the seven Programs cards on a live screenshot asking for each "Bright"
// category to be illustrated with an image so parents can visually confirm
// the category exists. He sent real category-badge graphics (his own
// BrightFit-style crest + category name, one background color per age
// group) and, when asked, chose "small badge next to the existing text"
// over a full-image card redesign. Keyed by c.name, which is identical
// across the EN/FR translations in lib/content.ts, so one map covers both
// languages. Bright Kicks and Bright Elite only came through in the older
// navy-background style (no colored background of their own yet) — Patrick
// confirmed shipping those two as-is for now and sending matching versions
// later. Every source graphic also had an age-range subtitle burned into
// the image; those were cropped out during processing because a couple of
// them (Pro, Elite) don't match the age range already shown as text on the
// card (content.ts) — this avoids putting two conflicting ages on one card.
const CATEGORY_BADGES: Record<string, string> = {
  "Bright Babies": "/images/programs/badge-babies.jpg",
  "Bright Kicks": "/images/programs/badge-kicks.jpg",
  "Bright Junior": "/images/programs/badge-junior.jpg",
  "Bright Kids": "/images/programs/badge-kids.jpg",
  "Bright Youth": "/images/programs/badge-youth.jpg",
  "Bright Elite": "/images/programs/badge-elite.jpg",
  "Bright Pro": "/images/programs/badge-pro.jpg",
};

// Category diagrams — Patrick's next follow-up after the badges shipped: he
// noticed each colored-background source graphic has its own decorative
// line-art icon behind the crest (a trophy for Bright Pro, a whistle for
// Bright Babies, a goal net for Bright Youth, a laurel/cord swirl for
// Bright Junior, a pitch corner for Bright Kids) and wanted those "added to
// what we have already" in the background, not just cropped away. Redrawn
// as vector icons (see ProgramIcons.tsx) rather than lifted from his JPEGs
// — see that file for why. Rendered here as a low-opacity corner watermark
// per card, same restrained "texture, not decoration" treatment as
// PitchDiagram elsewhere on the site, just category-specific instead of
// generic. Bright Kicks and Bright Elite had no such icon in their
// (plainer) source graphics, so those two cards fall back to no watermark.
const CATEGORY_DIAGRAMS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "Bright Babies": WhistleDiagram,
  "Bright Junior": WreathDiagram,
  "Bright Kids": CornerFlagDiagram,
  "Bright Youth": GoalNetDiagram,
  "Bright Pro": TrophyDiagram,
};

export function Programs() {
  const { t, lang } = useLanguage();

  return (
    <section id="programs" className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      {/* Photo backdrop, added as part of the 2026-08-13 PSG.fr-inspired
       *  revamp — this section was previously flat navy + a faint pitch
       *  texture, the one major card-grid block on the homepage with no
       *  real photography behind it. A real training photo + a strong
       *  gradient (fading to solid navy toward the bottom, where the dense
       *  card grid needs full contrast) reads closer to PSG's own
       *  imagery-led sections without touching the card content itself. */}
      <div className="absolute inset-0">
        <Image
          src="/images/gallery-7.jpg"
          alt=""
          aria-hidden
          fill
          className="object-cover object-top opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-navy-deep/90 to-navy-deep" />
      </div>
      <div className="relative mx-auto max-w-content px-5">
        <Reveal className="max-w-2xl">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.programs.eyebrow}</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{t.programs.title}</h2>
          <p className="mt-3 text-[14px] text-white/70">{t.programs.subtitle}</p>
        </Reveal>

        <div className="mt-10 space-y-12">
          {t.programs.groups.map((group) => (
            <div key={group.tagline}>
              <Reveal className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-white/15 pb-3">
                <h3 className="font-display text-lg font-bold text-white">{group.tagline}</h3>
                <span className="text-[12px] font-semibold text-orange">{group.ageRange}</span>
              </Reveal>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.categories.map((c, i) => {
                  const DiagramIcon = CATEGORY_DIAGRAMS[c.name];
                  return (
                  <Reveal key={c.name} delay={i * 60}>
                    <div className="relative h-full overflow-hidden rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:ring-orange/30">
                      {DiagramIcon && (
                        <DiagramIcon className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 text-white/[0.14]" />
                      )}
                      <div className="relative flex items-center gap-3">
                        {CATEGORY_BADGES[c.name] && (
                          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
                            <Image src={CATEGORY_BADGES[c.name]} alt="" aria-hidden fill className="object-cover" sizes="44px" />
                          </span>
                        )}
                        <div className="flex flex-1 items-baseline justify-between gap-2">
                          <h4 className="font-badge text-[16px] font-semibold tracking-wide text-white">{c.name}</h4>
                          <span className="flex items-center gap-1.5">
                            <span className="whitespace-nowrap text-[11px] font-semibold text-orange">{c.range}</span>
                            {/* Added 2026-09-01, Patrick's ask — the free
                             *  Bright Babies programme should be visible
                             *  here too, not just the schedule/comparison
                             *  table. Same tag styling as Sites.tsx and
                             *  ProgramComparison.tsx use for pricing.free. */}
                            {getProgramPricing(c.name)?.free && (
                              <span className="whitespace-nowrap rounded-full bg-emerald-400/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-300">
                                {t.comparison.free}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                      <p className="relative mt-2 text-[13px] leading-relaxed text-white/70">{c.note}</p>
                      {/* Per-card enroll button — added 2026-08-13, Patrick's
                       *  explicit ask ("rendre les boutons de chaque
                       *  programme fonctionnel"): these cards previously had
                       *  no button of their own at all, only the general
                       *  "Enroll Your Child" CTA at the bottom of the whole
                       *  section. This links to the same parent-signup flow
                       *  (ENROLL_URL), carrying the current site language —
                       *  the signup app doesn't yet accept a param to
                       *  pre-select a specific age category (checked
                       *  app/(auth)/signup/parent/page.tsx in the OS repo,
                       *  it only reads `lang`), so each button opens signup
                       *  generally rather than landing pre-filtered to this
                       *  one category. Worth a follow-up in bright-academy-os
                       *  if Patrick wants true per-category deep links. */}
                      <div className="relative mt-4 flex items-center gap-4">
                        <a
                          href={`${ENROLL_URL}?lang=${lang}`}
                          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-orange transition hover:text-orange/80"
                        >
                          {t.nav.enroll}
                          <span aria-hidden>→</span>
                        </a>
                        {/* Added 2026-08-13, Priority 4 — this card already
                         *  knows its own programme (c.name), so its trial
                         *  button carries the real confirmed single-session
                         *  price straight into the WhatsApp message rather
                         *  than the generic hero one. */}
                        <TrialButton
                          programName={c.name}
                          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white/60 transition hover:text-white"
                        >
                          {t.comparison.bookTrial}
                        </TrialButton>
                      </div>
                    </div>
                  </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <Reveal className="mt-10">
          <a
            // Fixed 2026-08-13, Priority 14/15 — see Header.tsx's note; this
            // full-width banner was the one Enroll link in this file that
            // didn't already carry ?lang= (the per-card links above do).
            href={`${ENROLL_URL}?lang=${lang}`}
            className="flex flex-col items-start justify-center rounded-2xl bg-white/5 p-6 text-white ring-1 ring-orange/40 transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:ring-orange/70 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="font-display text-[16px] font-semibold">{t.hero.ctaPrimary}</span>
            <span className="mt-2 flex items-center gap-2 text-[13px] text-white/70 sm:mt-0">
              {t.programs.subtitle}
              <span aria-hidden className="text-orange">→</span>
            </span>
          </a>
        </Reveal>

        {/* Comparison table — Priority 5. Lives inside the Programs
         *  section (same #programs anchor) rather than as its own
         *  top-level section, since it's a practical-info layer on top of
         *  the cards above, not a separate topic. */}
        <ProgramComparison />
      </div>
    </section>
  );
}
