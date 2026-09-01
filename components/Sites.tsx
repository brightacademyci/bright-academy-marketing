"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { BrandDiagram } from "./BrandDiagram";
import { TrialButton } from "./TrialButton";
import { SITE_URL } from "@/lib/content";
import { getSiteSchedule, type Weekday } from "@/lib/schedule";
import { getProgramPricing } from "@/lib/pricing";

// react-leaflet touches `window` at import time, so it can only ever run in
// the browser — ssr:false keeps it out of the server bundle entirely rather
// than hydration-mismatching.
const SiteMap = dynamic(() => import("./SiteMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-white/10" />,
});

const DAY_ORDER: Weekday[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export function Sites() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(0);
  const mapWrapRef = useRef<HTMLDivElement>(null);
  // The Leaflet/react-leaflet chunk is sizeable and this section sits well
  // below the fold — deferring the dynamic import until the map is about to
  // scroll into view keeps that JS off the critical path for first paint.
  const [mapNearView, setMapNearView] = useState(false);

  useEffect(() => {
    const el = mapWrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapNearView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    // Reverted to dark 2026-08-13 — same uniformity follow-up as About.tsx
    // and KitShowcase.tsx: Patrick wants navy-deep throughout rather than
    // mixing light and dark sections.
    <section id="sites" className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      {/* SportsActivityLocation structured data — added 2026-08-13, Priority
       *  8 ("add LocalBusiness/SportsActivityLocation structured data for
       *  verified locations"). Built only from data already published on
       *  this page (name/area/coordinates from lib/content.ts's sites list,
       *  the same values SiteMap.tsx renders) — no address, phone, or
       *  hours invented for any individual site. Same "use client" +
       *  server-rendered-on-first-paint pattern as FAQ.tsx's FAQPage
       *  schema. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": t.sites.list.map((s) => ({
              "@type": "SportsActivityLocation",
              name: `Bright Academy — ${s.name}`,
              address: {
                "@type": "PostalAddress",
                addressLocality: s.area,
                addressRegion: /bassam/i.test(s.area) ? "Grand-Bassam" : "Abidjan",
                addressCountry: "CI",
              },
              geo: { "@type": "GeoCoordinates", latitude: s.lat, longitude: s.lng },
              hasMap: s.mapsUrl,
              // CORRECTED 2026-08-16 (Priority 1) — was hardcoded to the
              // apex domain, which 301-redirects to www at the platform
              // level (see lib/content.ts's SITE_URL comment) — the exact
              // self-contradicting canonical signal this whole priority
              // was scoped to eliminate everywhere in the repo.
              url: `${SITE_URL}/#sites`,
              parentOrganization: { "@type": "SportsOrganization", name: "Bright Academy", url: `${SITE_URL}/` },
            })),
          }),
        }}
      />
      <BrandDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <div className="relative mx-auto max-w-content px-5">
        <Reveal className="max-w-2xl">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.sites.eyebrow}</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{t.sites.title}</h2>
          <p className="mt-3 text-[14px] text-white/70">{t.sites.subtitle}</p>
          {/* Added 2026-08-13, Priority 4 — trial booking near locations,
           *  as specified. No single programme is implied by "pick a
           *  site", but the currently-selected site card does drive which
           *  site the /trial form's own picker pre-fills (2026-08-17). */}
          <TrialButton siteName={t.sites.list[selected]?.name} className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-orange hover:text-orange/80" />
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_1.3fr] lg:items-stretch">
          <div className="order-2 grid gap-3 sm:grid-cols-2 lg:order-1 lg:grid-cols-1">
            {t.sites.list.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setSelected(i)}
                className={`flex items-start gap-3 rounded-2xl p-5 text-left ring-1 transition ${
                  i === selected
                    ? "bg-white/10 text-white ring-2 ring-orange"
                    : "bg-white/5 text-white ring-white/10 hover:ring-orange/30"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
                    i === selected ? "bg-orange/20 text-orange" : "bg-white/10 text-white"
                  }`}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[14px] font-semibold">{s.name}</h3>
                  <p className="mt-0.5 text-[13px] text-white/70">{s.area}</p>
                </div>
              </button>
            ))}
          </div>

          <div
            ref={mapWrapRef}
            className="order-1 h-[320px] overflow-hidden rounded-2xl ring-1 ring-white/10 lg:order-2 lg:h-auto lg:min-h-[420px]"
          >
            {mapNearView ? (
              <SiteMap sites={t.sites.list} selected={selected} onSelect={setSelected} directionsLabel={t.sites.directions} />
            ) : (
              <div className="h-full w-full animate-pulse bg-white/10" />
            )}
          </div>
        </div>

        {/* Weekly schedule for the selected site — added 2026-08-30, from
         *  the four official site graphics Patrick confirmed for the new
         *  2026-2027 season (lib/schedule.ts has the full sourcing note).
         *  Any site with no confirmed schedule falls back to the same
         *  "contact us" posture already used in ProgramComparison.tsx's
         *  Schedule column, rather than guessing. */}
        <Reveal className="mt-6 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-[14px] font-semibold text-white">{t.sites.schedule.heading}</h3>
            <span className="rounded-full bg-orange/15 px-3 py-1 text-[11px] font-semibold text-orange">{t.sites.schedule.newSeason}</span>
          </div>
          {(() => {
            const schedule = getSiteSchedule(t.sites.list[selected]?.name ?? "");
            if (!schedule || schedule.blocks.length === 0) {
              return <p className="mt-3 text-[13px] text-white/60">{t.sites.schedule.noSchedule}</p>;
            }
            const byDay = DAY_ORDER.map((day) => ({
              day,
              blocks: schedule.blocks.filter((b) => b.day === day),
            })).filter((d) => d.blocks.length > 0);
            return (
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {byDay.map(({ day, blocks }) => (
                  <div key={day} className="rounded-xl bg-white/5 p-3.5 ring-1 ring-white/10">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-white/50">{t.sites.schedule.days[day]}</p>
                    <div className="mt-2 space-y-2">
                      {blocks.map((b, i) => (
                        <div key={i} className="text-[13px]">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">
                              {b.start}–{b.end}
                            </span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                                b.type === "futsal" ? "bg-orange/20 text-orange" : "bg-white/10 text-white/70"
                              }`}
                            >
                              {b.type === "futsal" ? t.sites.schedule.futsal : t.sites.schedule.training}
                            </span>
                          </div>
                          {/* Per-group "Free" tag added 2026-09-01 — mirrors
                           *  the "★ SÉANCE GRATUITE" badge on Patrick's own
                           *  site graphics for a programme with
                           *  pricing.free true (currently only Bright
                           *  Babies), even when it shares a block with a
                           *  paid programme (e.g. Angré Château's combined
                           *  Sat 16:00–17:00 slot). */}
                          <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-white/60">
                            {b.groups.map((g, gi) => (
                              <span key={g} className="inline-flex items-center gap-1">
                                {gi > 0 && <span className="text-white/30">·</span>}
                                <span>{g}</span>
                                {getProgramPricing(g)?.free && (
                                  <span className="rounded-full bg-emerald-400/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-300">
                                    {t.comparison.free}
                                  </span>
                                )}
                              </span>
                            ))}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </Reveal>
      </div>
    </section>
  );
}
