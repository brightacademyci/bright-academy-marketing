"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  /** e.g. "600+", "5", "7" — the leading integer is animated, any suffix is preserved as-is. */
  value: string;
  durationMs?: number;
}

// Counts up from 0 to the numeric prefix of `value` once it scrolls into
// view, keeping any trailing suffix ("+", etc.) static. Falls back to the
// raw string immediately for values with no leading number, and skips the
// animation entirely under prefers-reduced-motion.
export function AnimatedCounter({ value, durationMs = 1400 }: AnimatedCounterProps) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(target === null ? value : "0");

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(String(target));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(String(Math.round(eased * target)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, durationMs]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
