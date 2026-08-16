"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { BrandDiagram } from "./BrandDiagram";

// Added 2026-08-16, Patrick's explicit request — a founder bio section built
// from the professional bio text and photos he sent directly. Follows
// About.tsx's photo+text grid pattern, with a Philosophy.tsx-style pull
// quote underneath for the closing line. Content lives in lib/content.ts
// (t.founder) so EN/FR stay in sync with the rest of the site's copy.
export function Founder() {
  const { t } = useLanguage();

  return (
    <section id="founder" className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      <BrandDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <div className="relative mx-auto max-w-content px-5">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
          <Reveal className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-2xl ring-1 ring-white/10 md:mx-0">
            <Image
              src="/images/founder-patrick.jpg"
              alt={t.founder.photoAlt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 400px, 100vw"
            />
          </Reveal>
          <Reveal delay={120}>
            <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.founder.eyebrow}</span>
            <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{t.founder.name}</h2>
            <p className="mt-1 text-[13px] font-medium uppercase tracking-wide text-white/60">{t.founder.role}</p>
            <div className="mt-4 space-y-4">
              {t.founder.body.map((p, i) => (
                <p key={i} className="text-[14px] leading-relaxed text-white/75">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={80} className="mx-auto mt-12 max-w-2xl text-center md:mt-16">
          <p className="font-display text-xl font-semibold leading-snug text-white md:text-2xl">
            &ldquo;{t.founder.quote}&rdquo;
          </p>
          <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-orange" />
          <p className="mt-4 text-[13px] font-medium text-white/60">{t.founder.quoteAttribution}</p>
        </Reveal>
      </div>
    </section>
  );
}
