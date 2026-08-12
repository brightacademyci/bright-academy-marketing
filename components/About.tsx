"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="mx-auto max-w-content px-5 py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm">
          <Image
            src="/images/about.jpg"
            alt="Bright Academy players huddled together on the pitch"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 500px, 100vw"
          />
        </Reveal>
        <Reveal delay={120}>
          <span className="text-[12px] font-semibold uppercase tracking-wide text-orange-text">{t.about.eyebrow}</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-navy md:text-3xl">{t.about.title}</h2>
          <div className="mt-4 space-y-4">
            {t.about.body.map((p, i) => (
              <p key={i} className="text-[14px] leading-relaxed text-navy-deep/80">
                {p}
              </p>
            ))}
          </div>

          <ul className="mt-6 flex flex-col gap-2.5">
            {t.about.highlights.map((h) => (
              <li key={h.title} className="flex items-center gap-2.5 text-[13px] font-medium text-navy-deep/90">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange/15 text-orange-text">
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
