"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { ENROLL_URL } from "@/lib/content";
import { AnimatedCounter } from "./AnimatedCounter";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden bg-navy-deep text-white">
      <div className="absolute inset-0 animate-kenburns">
        <Image
          src="/images/hero.jpg"
          alt="Bright Academy goalkeeper making a save during training"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center opacity-45"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 via-navy-deep/70 to-navy-deep" />

      <div className="relative mx-auto flex max-w-content flex-col items-start px-5 py-20 md:py-28">
        <span className="animate-fadeInUp rounded-full bg-white/10 px-3 py-1 text-[12px] font-medium tracking-wide text-white/80">
          {t.hero.eyebrow}
        </span>
        <h1
          className="mt-4 max-w-2xl animate-fadeInUp font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl"
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
            href={ENROLL_URL}
            className="rounded-full bg-orange px-6 py-3 text-[14px] font-semibold text-navy-deep transition hover:-translate-y-0.5 hover:bg-orange/90 hover:shadow-lg"
          >
            {t.hero.ctaPrimary}
          </a>
          <a
            href="#programs"
            className="rounded-full border border-orange/30 px-6 py-3 text-[14px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange/10"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>

        <div
          className="mt-12 grid w-full max-w-xl animate-fadeInUp grid-cols-3 gap-4 border-t border-white/15 pt-6"
          style={{ animationDelay: "320ms" }}
        >
          {t.hero.stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-2xl font-bold md:text-3xl">
                <AnimatedCounter value={s.value} />
              </div>
              <div className="mt-1 text-[12px] leading-snug text-white/70">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-float text-white/60 hover:text-white/90 md:block"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
