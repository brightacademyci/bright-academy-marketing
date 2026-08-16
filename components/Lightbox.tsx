"use client";

import { useEffect, useRef } from "react";

interface LightboxProps {
  // Full src strings, not bare filenames — either a local "/images/x.jpg"
  // path or a remote URL (the live gallery feed's signed Supabase Storage
  // URLs, see components/Gallery.tsx). A plain <img> handles both uniformly
  // without needing next/image's remote-domain allowlist for a signed URL
  // whose host isn't knowable at build time.
  images: string[];
  alts?: string[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

// Accessibility pass 2026-08-13 (Priority 11): this dialog already closed
// on Escape and supported arrow-key navigation, but had no focus trap (Tab
// could escape into the page behind it) and never returned focus to the
// gallery thumbnail that opened it — a keyboard user who closed the
// lightbox lost their place entirely. Both fixed below via closeButtonRef
// (focus moves here on open) and triggerRef (the previously-focused
// element, restored on close/unmount).
export function Lightbox({ images, alts, index, onClose, onNavigate }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    triggerRef.current = document.activeElement;
    closeButtonRef.current?.focus();
    return () => {
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
    };
    // Intentionally runs once (mount/unmount only) — re-focusing the close
    // button on every image navigation would be disorienting, not helpful.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowRight") onNavigate((index + 1) % images.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + images.length) % images.length);
      if (e.key === "Tab") {
        // Simple trap: this dialog only ever has 3 focusable elements
        // (close, previous, next) — cycle Tab/Shift+Tab between them
        // instead of letting focus escape to the page underneath.
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, images.length, onClose, onNavigate]);

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <button
        ref={closeButtonRef}
        aria-label="Close"
        onClick={onClose}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        ✕
      </button>

      <button
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index - 1 + images.length) % images.length);
        }}
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:left-6"
      >
        ‹
      </button>

      <div
        className="relative aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[index]}
          alt={alts?.[index] ?? "Bright Academy players"}
          className="h-full w-full object-cover"
        />
      </div>

      <button
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index + 1) % images.length);
        }}
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:right-6"
      >
        ›
      </button>
    </div>
  );
}
