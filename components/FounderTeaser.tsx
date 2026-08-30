"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { BrandDiagram } from "./BrandDiagram";

// Homepage teaser — added 2026-08-30, homepage-length audit fix. The old
// homepage rendered Founder.tsx's full 5-paragraph bio, then a separate
// Philosophy pull-quote section, back-to-back — two large, visually similar
// blocks that made the "About → Founder → Philosophy" stretch feel
// redundant on an already ~13-screen page. The full bio (with the former
// Philosophy content folded into its closing note — see Founder.tsx) now
// lives at /founder; this is a short teaser that links there. Same
// teaser-plus-dedicated-page pattern already used for Gallery/Videos/News.
// Keeps id="founder" so About.tsx's existing "#founder" CTA still lands
// here unchanged.
export function FounderTeaser() {
  const { t } = useLanguage();

  return (
    <section id="founder" className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-20">
      <BrandDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <div className="relative mx-auto max-w-content px-5">
        <div className="grid gap-8 md:grid-cols-[220px_1fr] md:items-center md:gap-12">
          <Reveal className="relative mx-auto aspect-[2/3] w-40 overflow-hidden rounded-2xl ring-1 ring-white/10 md:mx-0 md:w-full">
            <Image
              src="/images/founder-patrick.jpg"
              alt={t.founder.photoAlt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 220px, 160px"
            />
          </Reveal>
          <Reveal delay={100}>
            <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.founder.eyebrow}</span>
            <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{t.founder.name}</h2>
            <p className="mt-1 text-[13px] font-medium uppercase tracking-wide text-white/60">{t.founder.role}</p>
            <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/75">{t.founder.body[0]}</p>
            <Link
              href="/founder"
              className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-orange hover:text-orange/80"
            >
              {t.founder.teaserCta}
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
