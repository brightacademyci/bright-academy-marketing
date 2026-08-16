"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { BrandDiagram } from "./BrandDiagram";

export function About() {
  const { t } = useLanguage();

  return (
    // Reverted to dark 2026-08-13 — Patrick's follow-up: he'd asked for a
    // "professional and light" treatment on About/Kit/FAQ/Sites, but after
    // seeing it live he wants the site uniform in navy-deep instead, so this
    // (along with KitShowcase, Sites, FAQ) is back to matching every other
    // section on the page.
    <section id="about" className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      <BrandDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <div className="relative mx-auto grid max-w-content gap-10 px-5 md:grid-cols-2 md:items-center md:gap-14">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10">
          <Image
            src="/images/about.jpg"
            alt="Bright Academy players huddled together on the pitch"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 500px, 100vw"
          />
        </Reveal>
        <Reveal delay={120}>
          <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.about.eyebrow}</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{t.about.title}</h2>
          <div className="mt-4 space-y-4">
            {t.about.body.map((p, i) => (
              <p key={i} className="text-[14px] leading-relaxed text-white/75">
                {p}
              </p>
            ))}
          </div>

          <ul className="mt-6 flex flex-col gap-2.5">
            {t.about.highlights.map((h) => (
              <li key={h.title} className="flex items-center gap-2.5 text-[13px] font-medium text-white/90">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange/15 text-orange">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {h.title}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
