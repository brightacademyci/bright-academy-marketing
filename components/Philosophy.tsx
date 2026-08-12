"use client";

import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { PitchDiagram } from "./PitchDiagram";

export function Philosophy() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-20">
      <PitchDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <Reveal className="relative mx-auto max-w-2xl px-5 text-center">
        <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.philosophy.eyebrow}</span>
        <p className="mt-4 font-display text-2xl font-semibold leading-snug text-white md:text-3xl">
          “{t.philosophy.quote}”
        </p>
        <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-orange" />
        <p className="mt-5 text-[14px] leading-relaxed text-white/70">{t.philosophy.subtitle}</p>
      </Reveal>
    </section>
  );
}
