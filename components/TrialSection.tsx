"use client";

import { Suspense } from "react";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { PitchDiagram } from "./PitchDiagram";
import { TrialRequestForm } from "./TrialRequestForm";

// TrialRequestForm reads `useSearchParams()` (to prefill site/programme from
// a TrialButton link) — Next requires a Suspense boundary around any client
// component that does, so a statically-rendered page doesn't bail out.
export function TrialSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      <PitchDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <div className="relative mx-auto grid max-w-content gap-10 px-5 md:grid-cols-2 md:items-start md:gap-14">
        <Reveal>
          <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.trialRequest.eyebrow}</span>
          <h1 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{t.trialRequest.title}</h1>
          <p className="mt-3 text-[14px] leading-relaxed text-white/75">{t.trialRequest.subtitle}</p>
          <p className="mt-4 rounded-xl bg-orange/10 px-4 py-3 text-[12.5px] text-orange/90 ring-1 ring-orange/20">
            {t.trialRequest.paidNotice}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <Suspense fallback={<div className="h-[520px] animate-pulse rounded-2xl bg-white/5" />}>
            <TrialRequestForm />
          </Suspense>
        </Reveal>
      </div>
    </section>
  );
}
