"use client";

import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { PitchDiagram } from "./PitchDiagram";
import { CareersForm } from "./CareersForm";

// Deliberately generic/evergreen copy — no specific open positions are
// listed here, since fabricating job postings on a live public site isn't
// something to guess at. This is a standing "send us your application" form
// (posts to app/api/public/careers on the OS app), reviewed by staff there.
export function CareersSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      <PitchDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <div className="relative mx-auto grid max-w-content gap-10 px-5 md:grid-cols-2 md:items-start md:gap-14">
        <Reveal>
          <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.careers.eyebrow}</span>
          <h1 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{t.careers.title}</h1>
          <p className="mt-3 text-[14px] leading-relaxed text-white/75">{t.careers.subtitle}</p>

          <h2 className="mt-8 font-display text-[15px] font-semibold text-white">{t.careers.whyJoinTitle}</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {t.careers.whyJoin.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/80">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange/15 text-orange">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <CareersForm />
        </Reveal>
      </div>
    </section>
  );
}
