"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { ENROLL_URL } from "@/lib/content";
import { AnimatedCounter } from "./AnimatedCounter";
import { BrandDiagram } from "./BrandDiagram";
import { TrialButton } from "./TrialButton";

// Rebuilt 2026-08-13, Patrick's explicit feedback: the photo was a dimmed
// full-bleed background behind the text (opacity-45 + a heavy navy
// gradient on top of it), which read as flat rather than "captivating" —
// his words were that he wanted the image to feel like something *in* the
// hero, not just a wash in the back, picturing a parent bringing their
// child to the site. There's no literal parent+child photo in the current
// asset library (every gallery shot is a training/match action photo) —
// swap `/images/hero.jpg` below for one if Patrick sends it later. What
// changed here instead: the same goalkeeper-save photo now sits in its own
// bright, un-dimmed framed card on the right (desktop) so it actually reads
// as a real photograph rather than a backdrop, and the stat row (his other
// note — "too small for the space available") moved into its own full-width
// band with real card treatment and much bigger numbers.
export function Hero() {
  const { t, lang } = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden bg-navy-deep text-white">
      <BrandDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-orange/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-content items-center gap-10 px-5 pb-14 pt-14 md:grid-cols-[1.05fr_0.95fr] md:gap-12 md:pb-20 md:pt-20">
        {/* Text column */}
        <div className="relative z-10 flex flex-col items-start">
          <span className="animate-fadeInUp rounded-full bg-white/10 px-3 py-1 text-[12px] font-medium tracking-wide text-white/80">
            {t.hero.eyebrow}
          </span>
          <h1
            className="mt-4 animate-fadeInUp font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl"
            style={{ animationDelay: "80ms" }}
          >
            {t.hero.title}
          </h1>
          <p
            className="mt-4 max-w-xl animate-fadeInUp text-[15px] leading-relaxed text-white/80"
            style={{ animationDelay: "160ms" }}
          >
            {t.hero.subtitle}
          </p>

          <div className="mt-7 flex animate-fadeInUp flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
            <a
              // Fixed 2026-08-13, Priority 14/15 — carry the site's current
              // language into the portal (see Header.tsx's fuller note);
              // this is the single most-clicked link on the page.
              href={`${ENROLL_URL}?lang=${lang}`}
              className="rounded-full bg-orange px-6 py-3 text-[14px] font-semibold text-navy-deep transition hover:-translate-y-0.5 hover:bg-orange/90 hover:shadow-lg"
            >
              {t.hero.ctaPrimary}
            </a>
            {/* Added 2026-08-13, Priority 4 — a lower-commitment second
             *  path next to full enrollment. No programme is known yet at
             *  this entry point, so TrialButton sends the generic
             *  "help me choose a programme" WhatsApp message (see
             *  lib/whatsapp.ts) rather than a specific price. */}
            <TrialButton className="rounded-full border border-orange/30 px-6 py-3 text-[14px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange/10" />
            <a
              href="#programs"
              className="rounded-full px-6 py-3 text-[14px] font-semibold text-white/70 underline decoration-white/30 underline-offset-4 transition hover:text-white"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Photo column — a real framed photo, not a dimmed backdrop. Full
         *  brightness, only a light bottom scrim so it stays legible against
         *  its own rounded card, not the heavy 55%-navy wash the old
         *  full-bleed background version used.
         *
         *  Fixed 2026-08-13, Priority 9 (Lighthouse pass): this wrapper
         *  used to carry `animate-fadeInUp` + a 120ms delay — the same
         *  entrance animation as the text column. But the <Image> inside
         *  is the page's LCP element (priority + fetchPriority="high"),
         *  and fadeInUp animates opacity 0→1 over 0.7s starting only after
         *  its delay elapses. A local Lighthouse run measured 1.17s of
         *  "element render delay" on this exact image — almost entirely
         *  explained by this animation making the browser wait to paint it
         *  at full opacity. Loading it with priority and then deliberately
         *  fading it in was working against itself. The Ken Burns
         *  zoom on the <Image> itself (animate-kenburns, a pure
         *  `transform: scale()`, no opacity change) is untouched — that
         *  doesn't block paint the way an opacity fade does. */}
        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/15 sm:aspect-[5/4] md:aspect-[4/5]">
            <Image
              src="/images/hero.jpg"
              alt="Bright Academy goalkeeper making a save during training"
              fill
              priority
              fetchPriority="high"
              className="animate-kenburns object-cover object-center"
              sizes="(min-width: 768px) 45vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/35 via-transparent to-transparent" />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-5 -right-5 -z-10 h-full w-full rounded-3xl border-2 border-orange/30"
          />
        </div>
      </div>

      {/* Stats band — 2026-08-13: previously a small inline row under the
       *  text column (grid-cols-2/4, text-2xl numbers) that read as an
       *  afterthought given how much width was available. Now a full-width
       *  band of real cards with much larger numbers, matching the visual
       *  weight of a stat row on a professional club site. */}
      <div className="relative border-t border-white/10 bg-white/[0.03]">
        <div
          className="mx-auto grid max-w-content animate-fadeInUp grid-cols-2 gap-3 px-5 py-8 sm:grid-cols-4 sm:gap-4 md:py-10"
          style={{ animationDelay: "320ms" }}
        >
          {t.hero.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white/5 p-5 text-center ring-1 ring-white/10 transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:ring-orange/30 sm:text-left"
            >
              <div className="font-display text-3xl font-bold md:text-4xl">
                <AnimatedCounter value={s.value} />
              </div>
              <div className="mt-1.5 text-[13px] leading-snug text-white/70">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll hint — used to sit absolutely pinned to the bottom of the
         *  whole section back when the hero was one tall image block; now
         *  that the stats band is real in-flow content below the grid
         *  (not layered over a background photo), an absolutely-positioned
         *  arrow would sit on top of the stat cards instead of below them.
         *  Rendered as a normal centered row under the stats instead. */}
        <a
          href="#about"
          aria-label="Scroll down"
          className="mx-auto hidden w-fit animate-float pb-3 text-white/50 hover:text-white/80 md:block"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
