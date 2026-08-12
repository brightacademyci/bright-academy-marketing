"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { PitchDiagram } from "./PitchDiagram";

// react-leaflet touches `window` at import time, so it can only ever run in
// the browser — ssr:false keeps it out of the server bundle entirely rather
// than hydration-mismatching.
const SiteMap = dynamic(() => import("./SiteMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-white/10" />,
});

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
    <section id="sites" className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      <PitchDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <div className="relative mx-auto max-w-content px-5">
        <Reveal className="max-w-2xl">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.sites.eyebrow}</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{t.sites.title}</h2>
          <p className="mt-3 text-[14px] text-white/70">{t.sites.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_1.3fr] lg:items-stretch">
          <div className="order-2 grid gap-3 sm:grid-cols-2 lg:order-1 lg:grid-cols-1">
            {t.sites.list.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setSelected(i)}
                className={`flex items-start gap-3 rounded-2xl p-5 text-left shadow-sm ring-1 transition ${
                  i === selected
                    ? "bg-navy text-white ring-2 ring-orange"
                    : "bg-white text-navy ring-black/5 hover:ring-navy/25"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
                    i === selected ? "bg-white/15 text-white" : "bg-navy/10 text-navy"
                  }`}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[14px] font-semibold">{s.name}</h3>
                  <p className={`mt-0.5 text-[13px] ${i === selected ? "text-white/75" : "text-navy-deep/70"}`}>
                    {s.area}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div
            ref={mapWrapRef}
            className="order-1 h-[320px] overflow-hidden rounded-2xl shadow-sm ring-1 ring-white/10 lg:order-2 lg:h-auto lg:min-h-[420px]"
          >
            {mapNearView ? (
              <SiteMap sites={t.sites.list} selected={selected} onSelect={setSelected} directionsLabel={t.sites.directions} />
            ) : (
              <div className="h-full w-full animate-pulse bg-white/10" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
