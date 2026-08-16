"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";

export function Philosophy() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-20">
      {/* Photo backdrop (2026-08-13 PSG.fr-inspired revamp) — same reasoning
       *  as Programs.tsx: a real photo behind the quote instead of flat
       *  navy + texture, kept heavily overlaid since the quote itself is
       *  the whole point of this section and needs to stay fully legible. */}
      <div className="absolute inset-0">
        <Image src="/images/gallery-11.jpg" alt="" aria-hidden fill className="object-cover opacity-20" sizes="100vw" />
        <div className="absolute inset-0 bg-navy-deep/90" />
      </div>
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
