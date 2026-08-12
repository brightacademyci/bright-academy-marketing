"use client";

import { useLanguage } from "./LanguageProvider";
import { ENROLL_URL } from "@/lib/content";
import { Reveal } from "./Reveal";
import { PitchDiagram } from "./PitchDiagram";

export function EnrollCta() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
      />
      <PitchDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.07]" />
      <Reveal className="relative mx-auto flex max-w-content flex-col items-center px-5 text-center">
        <h2 className="max-w-xl font-display text-2xl font-bold md:text-3xl">{t.enrollCta.title}</h2>
        <p className="mt-3 max-w-md text-[14px] text-white/75">{t.enrollCta.subtitle}</p>
        <a
          href={ENROLL_URL}
          className="mt-7 rounded-full bg-orange px-8 py-3.5 text-[14px] font-semibold text-navy-deep transition hover:-translate-y-0.5 hover:bg-orange/90 hover:shadow-lg"
        >
          {t.enrollCta.cta}
        </a>
      </Reveal>
    </section>
  );
}
