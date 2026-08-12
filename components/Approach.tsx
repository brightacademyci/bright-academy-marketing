"use client";

import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";

export function Approach() {
  const { t } = useLanguage();

  return (
    <section id="approach" className="bg-navy/[0.03] py-16 md:py-24">
      <div className="mx-auto max-w-content px-5">
        <Reveal className="max-w-2xl">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-orange-text">{t.approach.eyebrow}</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-navy md:text-3xl">{t.approach.title}</h2>
          <p className="mt-3 text-[14px] text-navy-deep/70">{t.approach.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.approach.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="h-full rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-[13px] font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-3 font-display text-[15px] font-semibold text-navy">{p.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-navy-deep/70">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
