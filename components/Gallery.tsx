"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { Lightbox } from "./Lightbox";
import { GallerySlideshow } from "./GallerySlideshow";
import { PitchDiagram } from "./PitchDiagram";

// Distinct alt text per photo rather than one generic caption repeated 8
// times — better for screen readers and image search alike.
const IMAGES = [
  { file: "gallery-1.jpg", alt: "Bright Academy player waiting on the pitch before training" },
  { file: "gallery-2.jpg", alt: "Bright Academy players seated on the bench ahead of a match" },
  { file: "gallery-3.jpg", alt: "Bright Academy player in orange kit focused on the ball" },
  { file: "gallery-4.jpg", alt: "A Bright Academy coach helping a young player with their boots" },
  { file: "gallery-5.jpg", alt: "Young Bright Academy player on the sideline during a session" },
  { file: "gallery-6.jpg", alt: "Bright Academy player training near the goal" },
  { file: "gallery-7.jpg", alt: "Bright Academy players running a passing drill with their coach" },
  { file: "gallery-8.jpg", alt: "Bright Academy player wearing the club jersey, seen from behind" },
  { file: "gallery-9.jpg", alt: "Young Bright Academy player working on ball control through cones" },
  { file: "gallery-10.jpg", alt: "Bright Academy players in training bibs chatting together on the pitch" },
  { file: "gallery-11.jpg", alt: "Bright Academy player smiling while running during a match" },
  { file: "gallery-12.jpg", alt: "Bright Academy players sitting together pitch-side near the goal" },
  { file: "gallery-13.jpg", alt: "Bright Academy player dribbling the ball on the stadium pitch" },
  { file: "gallery-14.jpg", alt: "Young Bright Academy players holding footballs before a session" },
];

export function Gallery() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      <PitchDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <div className="relative mx-auto max-w-content px-5">
        <Reveal className="max-w-2xl">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.gallery.eyebrow}</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{t.gallery.title}</h2>
        </Reveal>

        <Reveal className="mt-8">
          <GallerySlideshow />
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {IMAGES.map((img, i) => (
            <button
              key={img.file}
              onClick={() => setOpenIndex(i)}
              className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-white/10"
              aria-label={`Open photo: ${img.alt}`}
            >
              <Image
                src={`/images/${img.file}`}
                alt={img.alt}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(min-width: 768px) 25vw, 50vw"
                loading={i < 4 ? "eager" : "lazy"}
              />
              <span className="absolute inset-0 bg-navy-deep/0 transition group-hover:bg-navy-deep/20" />
            </button>
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox
          images={IMAGES.map((img) => img.file)}
          alts={IMAGES.map((img) => img.alt)}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </section>
  );
}
