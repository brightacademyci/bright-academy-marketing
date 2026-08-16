"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { BrandDiagram } from "./BrandDiagram";

interface FAQProps {
  /** Show only the first N questions with a "see full FAQ" link — added 2026-08-13, Priority 6 ("keep only the five or six highest-value questions" on the homepage). Omit for the full list (used on the dedicated /faq page). */
  limit?: number;
  /** Render the section title as the page's <h1> instead of an <h2> —
   *  added 2026-08-13, Priority 8 verification pass. On the homepage this
   *  section sits under Hero's own <h1>, so <h2> is correct there; the
   *  dedicated /faq page (app/faq/page.tsx) has no other heading at all,
   *  and was shipping with zero <h1> tags until this prop existed. */
  asH1?: boolean;
}

export function FAQ({ limit, asH1 = false }: FAQProps) {
  const { t, lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = limit ? t.faq.items.slice(0, limit) : t.faq.items;
  const isTruncated = limit != null && t.faq.items.length > limit;
  const TitleTag = asH1 ? "h1" : "h2";

  return (
    // Reverted to dark 2026-08-13 — same uniformity follow-up as
    // About.tsx/KitShowcase.tsx/Sites.tsx: Patrick wants navy-deep
    // throughout rather than mixing light and dark sections.
    <section id="faq" className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      {/* FAQPage structured data — lets Google show these Q&As as rich
          results directly in search, not just render the accordion. Still
          server-rendered on first paint despite "use client" (that only
          opts into hydration/interactivity, not client-only rendering), so
          crawlers see it without running JS. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
      <BrandDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <div className="relative mx-auto max-w-content px-5">
        <Reveal className="max-w-2xl">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.faq.eyebrow}</span>
          <TitleTag className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{t.faq.title}</TitleTag>
          <p className="mt-3 text-[14px] text-white/70">{t.faq.subtitle}</p>
        </Reveal>

        <div className="mt-10 max-w-3xl divide-y divide-white/10 rounded-2xl bg-white/5 ring-1 ring-white/10">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            // Stable per-item ids for aria-controls/aria-labelledby — added
            // 2026-08-13, Priority 11. The button previously had
            // aria-expanded with nothing for it to point at, so a screen
            // reader had no way to associate the trigger with its panel.
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    id={buttonId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-white/5 sm:px-6 sm:py-5"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="font-display text-[15px] font-semibold text-white">{item.q}</span>
                    <span
                      aria-hidden
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-orange transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-[13px] leading-relaxed text-white/70 sm:px-6 sm:pb-5">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {isTruncated && (
          <Link href="/faq" className="mt-5 inline-block text-[13px] font-semibold text-orange hover:underline">
            {lang === "fr" ? "Voir toute la FAQ →" : "See the full FAQ →"}
          </Link>
        )}
      </div>
    </section>
  );
}
