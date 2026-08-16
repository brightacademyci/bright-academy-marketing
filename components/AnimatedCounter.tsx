"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  /** e.g. "600+", "5", "7", "1:15" — the leading integer is animated (when safe to), any suffix is preserved as-is. */
  value: string;
  durationMs?: number;
}

// BUG FIX 2026-08-13 (external review): this component used to initialize
// its displayed text to "0" for every numeric stat and only reach the real
// value once an IntersectionObserver fired and a requestAnimationFrame loop
// finished. That meant the real number was never in the server-rendered
// HTML, never shown with JS disabled, and never shown under
// prefers-reduced-motion until a matching effect happened to run — for the
// "1:15" coach ratio it produced the literal "0:15" the review flagged, and
// for "600+", "5", "7" it produced permanent "0+"/"0"/"0" for any crawler,
// slow connection, or automated check that didn't wait for/trigger the
// scroll-triggered animation.
//
// Fixed by flipping the model: `display` now *starts* at the true final
// `value` — that's what's in the SSR HTML, what shows with JS off, and
// what shows under reduced motion. The count-up-from-zero effect below is
// a pure progressive enhancement layered on top after mount: it can only
// ever replace a correct value with a *different, still-eventually-correct*
// sequence of numbers, never with a placeholder that might get stuck.
//
// Ratio-style values ("1:15") are deliberately excluded from the animation
// entirely (see `canAnimate` below) rather than counted up — animating "1"
// up from 0 while ":15" stays fixed is a single-frame flicker through
// "0:15" that adds no real motion and is exactly the string the review
// flagged as unacceptable, even transiently.
export function AnimatedCounter({ value, durationMs = 1400 }: AnimatedCounterProps) {
  const match = value.match(/^(\d+)(\+?)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const canAnimate = target !== null;

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!canAnimate || target === null) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(`${Math.round(eased * target)}${suffix}`);
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            // Land exactly on the source string, not a reconstruction of
            // it — guards against any future suffix this regex doesn't
            // anticipate ever being silently dropped.
            setDisplay(value);
          }
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [canAnimate, target, suffix, value, durationMs]);

  return <span ref={ref}>{display}</span>;
}
