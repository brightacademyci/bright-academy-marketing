"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";

// Added 2026-08-13, Patrick's explicit ask ("put the jerseys on the
// website"). Originally used two candid training/match photos as a
// stand-in; swapped 2026-08-13 for the real BrightFit product renders
// Patrick sent — the actual kit designs (crest + sponsor branding visible),
// not an approximation. Briefly a light section, reverted back to dark
// navy the same day — Patrick wants the site uniform in navy-deep rather
// than mixing light and dark sections, so this now matches the card
// treatment used by Achievements right below it (bg-white/5 card, ring-
// white/10, white caption text instead of a white caption strip).
const KIT_IMAGES = [
  { file: "kit-home.jpg", alt: "Bright Academy home kit — orange jersey and shorts with navy/blue side panels, official BrightFit product render" },
  { file: "kit-away.jpg", alt: "Bright Academy away kit — navy jersey and shorts with orange trim and blue side panels, official BrightFit product render" },
];

export function KitShowcase() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-20">
      <div className="relative mx-auto max-w-content px-5">
        <Reveal className="max-w-2xl">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.kit.eyebrow}</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{t.kit.title}</h2>
          <p className="mt-3 text-[14px] text-white/70">{t.kit.subtitle}</p>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {t.kit.images.map((img, i) => (
            <Reveal key={img.caption} delay={i * 100}>
              <div className="overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={`/images/${KIT_IMAGES[i].file}`}
                    alt={KIT_IMAGES[i].alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <p className="px-4 py-3 text-[13px] font-semibold text-white">{img.caption}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
