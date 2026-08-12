"use client";

import { useLanguage } from "./LanguageProvider";
import { ENROLL_URL } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Programs() {
  const { t } = useLanguage();

  return (
    <section id="programs" className="mx-auto max-w-content px-5 py-16 md:py-24">
      <Reveal className="max-w-2xl">
        <span className="text-[12px] font-semibold uppercase tracking-wide text-orange-text">{t.programs.eyebrow}</span>
        <h2 className="mt-2 font-display text-2xl font-bold text-navy md:text-3xl">{t.programs.title}</h2>
        <p className="mt-3 text-[14px] text-navy-deep/70">{t.programs.subtitle}</p>
      </Reveal>

      <div className="mt-10 space-y-12">
        {t.programs.groups.map((group) => (
          <div key={group.tagline}>
            <Reveal className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-navy/10 pb-3">
              <h3 className="font-display text-lg font-bold text-navy">{group.tagline}</h3>
              <span className="text-[12px] font-semibold text-orange-text">{group.ageRange}</span>
            </Reveal>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.categories.map((c, i) => (
                <Reveal key={c.name} delay={i * 60}>
                  <div className="h-full rounded-2xl border border-navy/10 p-5 transition duration-300 hover:-translate-y-1 hover:border-navy/25 hover:shadow-md">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-display text-[15px] font-semibold text-navy">{c.name}</h4>
                      <span className="whitespace-nowrap text-[11px] font-semibold text-orange-text">{c.range}</span>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-navy-deep/70">{c.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Reveal className="mt-10">
        <a
          href={ENROLL_URL}
          className="flex flex-col items-start justify-center rounded-2xl bg-navy p-6 text-white transition duration-300 hover:-translate-y-1 hover:bg-navy-dark hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="font-display text-[16px] font-semibold">{t.hero.ctaPrimary}</span>
          <span className="mt-2 text-[13px] text-white/70 sm:mt-0">{t.programs.subtitle}</span>
        </a>
      </Reveal>
    </section>
  );
}
