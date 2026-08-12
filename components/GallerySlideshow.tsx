"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

// A small curated highlight reel, not a full browsing tool — the complete
// set of photos still lives in the grid below. Keeping this to five strong
// shots is what keeps it feeling professional rather than like a wall of
// content squeezed into one frame.
const SLIDES = [
  { file: "gallery-13.jpg", alt: "Bright Academy player dribbling the ball on the stadium pitch" },
  { file: "gallery-9.jpg", alt: "Young Bright Academy player working on ball control through cones" },
  { file: "gallery-11.jpg", alt: "Bright Academy player smiling while running during a match" },
  { file: "gallery-7.jpg", alt: "Bright Academy players running a passing drill with their coach" },
  { file: "gallery-4.jpg", alt: "A Bright Academy coach helping a young player with their boots" },
];

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 40;

export function GallerySlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:aspect-[21/9]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current !== null) {
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (dx > SWIPE_THRESHOLD) goTo(index - 1);
          if (dx < -SWIPE_THRESHOLD) goTo(index + 1);
        }
        touchStartX.current = null;
        setPaused(false);
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Bright Academy photo highlights"
    >
      {SLIDES.map((s, i) => (
        <div
          key={s.file}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={`/images/${s.file}`}
            alt={s.alt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 90vw, 100vw"
            priority={i === 0}
          />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/35 via-transparent to-transparent" />

      <button
        aria-label="Previous slide"
        onClick={() => goTo(index - 1)}
        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30 md:left-5 md:h-10 md:w-10"
      >
        ‹
      </button>
      <button
        aria-label="Next slide"
        onClick={() => goTo(index + 1)}
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30 md:right-5 md:h-10 md:w-10"
      >
        ›
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 md:bottom-4">
        {SLIDES.map((s, i) => (
          <button
            key={s.file}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
