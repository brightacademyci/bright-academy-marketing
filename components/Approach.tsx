"use client";

import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { PitchDiagram } from "./PitchDiagram";

export function Approach() {
  const { t } = useLanguage();

  return (
    <section id="approach" className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      <PitchDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <div className="relative mx-auto max-w-content px-5">
        <Reveal className="max-w-2xl">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.approach.eyebrow}</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{t.approach.title}</h2>
          <p className="mt-3 text-[14px] text-white/70">{t.approach.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.approach.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="h-full rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:ring-orange/30">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-[13px] font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-3 font-display text-[15px] font-semibold text-white">{p.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/70">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
