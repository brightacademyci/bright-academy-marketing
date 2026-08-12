"use client";

import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";

export function Philosophy() {
  const { t } = useLanguage();

  return (
    <section className="bg-navy/[0.03] py-16 md:py-20">
      <Reveal className="mx-auto max-w-2xl px-5 text-center">
        <span className="text-[12px] font-semibold uppercase tracking-wide text-orange-text">{t.philosophy.eyebrow}</span>
        <p className="mt-4 font-display text-2xl font-semibold leading-snug text-navy md:text-3xl">
          “{t.philosophy.quote}”
        </p>
        <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-orange" />
        <p className="mt-5 text-[14px] leading-relaxed text-navy-deep/70">{t.philosophy.subtitle}</p>
      </Reveal>
    </section>
  );
}
