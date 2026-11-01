"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Change the wrapper tag when a <div> would be invalid here (e.g. inside a <p>). */
  as?: "div" | "span";
}

// Lightweight scroll-reveal: fades + slides an element up the first time it
// enters the viewport. Plain IntersectionObserver rather than a motion
// library — keeps the bundle small for what's just a one-shot reveal.
export function Reveal({ children, className = "", delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion preference — show immediately, no animation.
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    // A block taller than the screen (the 35-player squad on a phone) can
    // never be 15% visible at once, so it would stay invisible forever.
    // Cap the threshold to the share of the block a screen can show.
    const height = el.offsetHeight || 1;
    const threshold = Math.min(0.15, (window.innerHeight * 0.5) / height);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      className={`${className} ${visible ? "animate-fadeInUp" : "opacity-0"}`}
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
