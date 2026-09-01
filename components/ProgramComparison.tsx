"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { TrialButton } from "./TrialButton";
import { ENROLL_URL } from "@/lib/content";
import { getProgramPricing, CURRENCY } from "@/lib/pricing";

function formatPrice(amount: number, lang: "en" | "fr"): string {
  return `${amount.toLocaleString(lang === "fr" ? "fr-FR" : "en-US")} ${CURRENCY}`;
}

// Programme comparison table — added 2026-08-13, site improvement pass,
// Priority 5. Every number comes from lib/pricing.ts (confirmed against
// the live fee_plans table, see that file's header comment); nothing here
// is estimated. The "Schedule" column is deliberately always "Contact us"
// rather than a specific day/time — see lib/pricing.ts's closing comment
// for why per-programme time slots aren't reliably derivable from the OS
// app's current site-level schedule data.
export function ProgramComparison() {
  const { t, lang } = useLanguage();

  const rows = t.programs.groups.flatMap((group) =>
    group.categories.map((category) => ({
      name: category.name,
      range: category.range,
      pricing: getProgramPricing(category.name),
    }))
  );

  // Detect real overflow instead of assuming "only phones need the hint" —
  // caught 2026-08-13 during verification: at 9 columns wide, this table
  // scrolls even on a 1400px desktop viewport (scrollWidth ~1727px vs a
  // ~1140px container), so a `sm:hidden` hint was invisible on exactly the
  // screens where people were most likely to miss it (no touch affordance,
  // and macOS/Windows both auto-hide the scrollbar until you hover it).
  // Now the hint — and a right-edge fade so the cut-off reads as
  // "more here" rather than "the table just ends" — shows at every
  // viewport width whenever the content genuinely doesn't fit.
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      setCanScroll(el.scrollWidth > el.clientWidth + 1);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    };
    update();

    el.addEventListener("scroll", update, { passive: true });
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      resizeObserver.disconnect();
    };
  }, [rows.length]);

  return (
    <Reveal className="mt-14">
      <div className="max-w-2xl">
        <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.comparison.eyebrow}</span>
        <h3 className="mt-2 font-display text-xl font-bold text-white md:text-2xl">{t.comparison.title}</h3>
        <p className="mt-2 text-[13px] text-white/70">{t.comparison.subtitle}</p>
      </div>

      {/* Approved paid-trial wording (Priority 4), placed right above the
       *  table so the "price varies by programme" policy is visible before
       *  anyone reads programme-specific numbers below it. */}
      <div className="mt-5 rounded-xl border border-orange/40 bg-orange/10 px-4 py-3">
        <p className="text-[11px] font-bold uppercase tracking-wide text-orange">{t.trial.badge}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-white/80">{t.trial.notice}</p>
      </div>

      {/* Horizontally scrollable table — explicit "scroll for more" hint
       *  (Priority 5's "clear visual indication" requirement) shown at any
       *  width where the content actually overflows, not just on phones. */}
      {canScroll && (
        <p className="mt-5 text-[11px] font-medium text-white/50">{lang === "fr" ? "← Faites glisser pour voir plus →" : "← Swipe to see more →"}</p>
      )}
      <div className="relative mt-2">
        <div
          ref={scrollRef}
          className="overflow-x-auto rounded-2xl ring-1 ring-white/10"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
        <table className="w-full min-w-[860px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="bg-white/10 text-[11px] uppercase tracking-wide text-white/60">
              <th scope="col" className="px-4 py-3 font-semibold">{t.comparison.colProgram}</th>
              <th scope="col" className="px-4 py-3 font-semibold">{t.comparison.colAgeRange}</th>
              <th scope="col" className="px-4 py-3 font-semibold">{t.comparison.colLocations}</th>
              <th scope="col" className="px-4 py-3 font-semibold">{t.comparison.colSessions}</th>
              <th scope="col" className="px-4 py-3 font-semibold">{t.comparison.colSchedule}</th>
              <th scope="col" className="px-4 py-3 font-semibold">{t.comparison.colMonthly}</th>
              <th scope="col" className="px-4 py-3 font-semibold">{t.comparison.colQuarterly}</th>
              <th scope="col" className="px-4 py-3 font-semibold">{t.comparison.colTrial}</th>
              <th scope="col" className="px-4 py-3 font-semibold">{t.comparison.colAction}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row) => (
              <tr key={row.name} className="bg-white/[0.02] text-white/85 hover:bg-white/5">
                <th scope="row" className="whitespace-nowrap px-4 py-3 font-semibold text-white">{row.name}</th>
                <td className="whitespace-nowrap px-4 py-3">{row.range}</td>
                {/* whitespace-nowrap here too — this column wrapping
                 *  independently of the others made rows with 5 sites
                 *  listed nearly 3x taller than rows with 1, which read as
                 *  broken rather than "some programmes run at more sites".
                 *  The table already scrolls horizontally, so a wider
                 *  column here is fine; an uneven row grid isn't. */}
                <td className="whitespace-nowrap px-4 py-3">{row.pricing ? row.pricing.sites.join(", ") : t.comparison.contactUs}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  {row.pricing?.eliteFormula ? t.comparison.sessionsRange : t.comparison.sessionsRangeNoElite}
                </td>
                <td className="px-4 py-3 text-white/60">{t.comparison.contactUs}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  {row.pricing?.free
                    ? t.comparison.free
                    : row.pricing
                      ? `${formatPrice(row.pricing.classique.monthly1x, lang)}${t.comparison.perMonth}`
                      : t.comparison.contactUs}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {row.pricing?.free
                    ? t.comparison.free
                    : row.pricing
                      ? `${formatPrice(row.pricing.classique.quarterly1x, lang)}${t.comparison.perQuarter}`
                      : t.comparison.contactUs}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {row.pricing?.free ? t.comparison.free : row.pricing ? formatPrice(row.pricing.singleSessionXOF, lang) : t.trial.priceUnconfirmed}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-3">
                    <a href={`${ENROLL_URL}?lang=${lang}`} className="font-semibold text-orange hover:text-orange/80">
                      {t.comparison.enroll}
                    </a>
                    <TrialButton programName={row.name} className="font-semibold text-white/60 hover:text-white">
                      {t.comparison.bookTrial}
                    </TrialButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {/* Right-edge fade — a visual "there's more" cue that doesn't
         *  depend on someone noticing a thin scrollbar. Hidden once
         *  scrolled to the end so it never looks like a rendering glitch. */}
        {canScroll && !atEnd && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-10 rounded-r-2xl bg-gradient-to-l from-navy-deep to-transparent"
          />
        )}
      </div>
      <p className="mt-3 text-[12px] text-white/50">{t.comparison.eliteNote}</p>
    </Reveal>
  );
}
