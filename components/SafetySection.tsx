"use client";

import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { BrandDiagram } from "./BrandDiagram";

// Icons for the three pillars — shield (training safety), a pulse/alert
// mark (emergency response), and a clipboard (medical info on file).
// Deliberately simple line icons, same stroke convention as the rest of
// the site's inline icons (TrophyIcon in Achievements.tsx, etc.).
function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PulseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 12h4l2 7 4-14 2 7h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1" strokeLinecap="round" />
      <path d="M9 11h6M9 15h6M9 19h3" strokeLinecap="round" />
    </svg>
  );
}

const ICONS = [ShieldIcon, PulseIcon, ClipboardIcon];

// Added 2026-08-13, Patrick's explicit ask: a dedicated "Sécurité et
// bien-être de l'enfant" section covering training safety, emergency
// handling, and the medical information the academy collects — he called
// it out as important, so it sits with real visual weight (its own section
// with three full pillar cards, same treatment as Approach right above it)
// rather than as one more FAQ line. See lib/content.ts's `safety` block for
// the grounding note on where each claim comes from — nothing here is
// invented, and it's flagged for Patrick's review before being treated as
// final since it's a safety/medical representation to parents.
export function SafetySection() {
  const { t } = useLanguage();

  return (
    <section id="safety" className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      <BrandDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <div className="relative mx-auto max-w-content px-5">
        <Reveal className="max-w-2xl">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.safety.eyebrow}</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{t.safety.title}</h2>
          <p className="mt-3 text-[14px] text-white/70">{t.safety.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {t.safety.pillars.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={p.title} delay={i * 90}>
                <div className="h-full rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:ring-orange/30">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange/15 text-orange">
                    <Icon />
                  </div>
                  <h3 className="mt-3 font-display text-[15px] font-semibold text-white">{p.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/70">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
