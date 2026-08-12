"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { ENROLL_URL, LOGIN_URL } from "@/lib/content";

const SECTIONS: { id: string; key: "about" | "approach" | "achievements" | "programs" | "sites" | "gallery" }[] = [
  { id: "about", key: "about" },
  { id: "approach", key: "approach" },
  { id: "achievements", key: "achievements" },
  { id: "programs", key: "programs" },
  { id: "sites", key: "sites" },
  { id: "gallery", key: "gallery" },
];

export function Header() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? "border-white/10 bg-navy-dark/95 shadow-sm backdrop-blur-md" : "border-transparent bg-navy-dark backdrop-blur"
      }`}
    >
      <div
        className={`mx-auto flex max-w-content items-center justify-between px-5 transition-[padding] duration-300 ${
          scrolled ? "py-2.5" : "py-3.5"
        }`}
      >
        <a href="#top" className="flex items-center gap-2">
          <Image src="/logo/crest.png" alt="Bright Academy" width={36} height={36} className="rounded" />
          <span className="font-display text-[15px] font-bold tracking-tight text-white">Bright Academy</span>
        </a>

        <nav className="hidden items-center gap-5 lg:flex">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="text-[13px] font-medium text-white/80 hover:text-white">
              {t.nav[s.key]}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={() => setLang(lang === "en" ? "fr" : "en")}
            className="rounded-full border border-white/30 px-2.5 py-1 text-[11px] font-semibold text-white"
          >
            {lang === "en" ? "FR" : "EN"}
          </button>
          <a href={LOGIN_URL} className="text-[13px] font-medium text-white/80 hover:text-white">
            {t.nav.login}
          </a>
          <a
            href={ENROLL_URL}
            className="rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-navy hover:bg-white/90"
          >
            {t.nav.enroll}
          </a>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <span className="text-white">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy-dark px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)} className="text-sm font-medium text-white/90">
                {t.nav[s.key]}
              </a>
            ))}
            <a href={LOGIN_URL} className="text-sm font-medium text-white/90">
              {t.nav.login}
            </a>
            <div className="mt-1 flex items-center gap-3">
              <button
                onClick={() => setLang(lang === "en" ? "fr" : "en")}
                className="rounded-full border border-white/30 px-2.5 py-1 text-[11px] font-semibold text-white"
              >
                {lang === "en" ? "FR" : "EN"}
              </button>
              <a
                href={ENROLL_URL}
                className="flex-1 rounded-full bg-white px-4 py-2 text-center text-[13px] font-semibold text-navy"
              >
                {t.nav.enroll}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
