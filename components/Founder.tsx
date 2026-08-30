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
//
// MOVED off the homepage 2026-08-30, homepage-length audit fix — this full
// bio used to render directly on the homepage, immediately followed by a
// separate standalone Philosophy section: two large, visually near-identical
// pull-quote blocks back-to-back, which is what the audit flagged as the
// homepage's real redundancy (an ~11,500px/~13-screen page). This component
// (full bio) now lives only on the dedicated /founder page (see
// app/founder/page.tsx); the homepage instead shows a short teaser (see
// FounderTeaser.tsx) that links here — same teaser-plus-dedicated-page
// pattern already used for Gallery/Videos/News. The former standalone
// Philosophy.tsx section is folded into the end of THIS section as a
// secondary, visually distinct "Our Philosophy" note (see the second Reveal
// block below) rather than being deleted or left as its own homepage
// moment — Philosophy.tsx itself is now unused and was removed.
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

        {/* Folded in from the former standalone Philosophy.tsx section (see
         *  the file-header comment above). Deliberately smaller and quieter
         *  than the founder quote above it — same content depth, but styled
         *  as a closing note rather than a second identical pull-quote, so
         *  the two don't read as redundant back-to-back blocks the way they
         *  did as separate homepage sections. */}
        <Reveal delay={100} className="mx-auto mt-10 max-w-xl border-t border-white/10 pt-10 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-orange/80">{t.philosophy.eyebrow}</span>
          <p className="mt-3 font-display text-lg font-semibold leading-snug text-white/90 md:text-xl">
            &ldquo;{t.philosophy.quote}&rdquo;
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-white/60">{t.philosophy.subtitle}</p>
        </Reveal>
      </div>
    </section>
  );
}
