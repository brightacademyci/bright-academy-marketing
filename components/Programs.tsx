"use client";

import { useLanguage } from "./LanguageProvider";
import { ENROLL_URL } from "@/lib/content";
import { Reveal } from "./Reveal";
import { PitchDiagram } from "./PitchDiagram";

export function Programs() {
  const { t } = useLanguage();

  return (
    <section id="programs" className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      <PitchDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
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
                {group.categories.map((c, i) => (
                  <Reveal key={c.name} delay={i * 60}>
                    <div className="h-full rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:ring-orange/30">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-display text-[15px] font-semibold text-white">{c.name}</h4>
                        <span className="whitespace-nowrap text-[11px] font-semibold text-orange">{c.range}</span>
                      </div>
                      <p className="mt-2 text-[13px] leading-relaxed text-white/70">{c.note}</p>
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
            className="flex flex-col items-start justify-center rounded-2xl bg-white/5 p-6 text-white ring-1 ring-orange/40 transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:ring-orange/70 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="font-display text-[16px] font-semibold">{t.hero.ctaPrimary}</span>
            <span className="mt-2 flex items-center gap-2 text-[13px] text-white/70 sm:mt-0">
              {t.programs.subtitle}
              <span aria-hidden className="text-orange">→</span>
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
