"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { ENROLL_URL, LOGIN_URL } from "@/lib/content";

// Anchor sections that belong on the homepage. Split into two groups: the
// "About" group (about/approach/achievements/sites/faq) is tucked into a
// dropdown so the top-level bar doesn't have to hold all 7 anchors plus 4
// route pages side by side — that's what was causing the nav to wrap onto
// two uneven lines in production (11 flat items at 13px simply don't fit a
// normal viewport width once First Team joined the bar). Programs/Gallery
// stay flat since they're core, frequently-clicked sections.
//
// The dropdown's first item uses the "aboutUs" label, not "about" — the
// trigger button itself already reads "About", so the first entry inside
// the menu re-used the exact same word (a real bug reported live: "we have
// two about"). "aboutUs" is a distinct nav-dict key with its own copy
// ("About Us"/"Qui sommes-nous") so the two never collide again, while the
// section id stays "about" (unchanged — the href still targets #about).
const ABOUT_GROUP: { id: string; key: "aboutUs" | "approach" | "achievements" | "sites" | "faq" }[] = [
  { id: "about", key: "aboutUs" },
  { id: "approach", key: "approach" },
  { id: "achievements", key: "achievements" },
  { id: "sites", key: "sites" },
  { id: "faq", key: "faq" },
];

const TOP_SECTIONS: { id: string; key: "programs" | "gallery" }[] = [
  { id: "programs", key: "programs" },
  { id: "gallery", key: "gallery" },
];

// Real routes, not anchor sections — these pages exist outside the
// single-page home layout, so unlike the anchors above they're always a
// <Link>, on every page including the home page itself. "home" leads the
// list — added because the only prior way back to "/" from a non-home
// route was the logo mark, which wasn't even a working link (see the fix
// on the brand block below). Its active-state check needs to be exact
// (pathname === "/"), not startsWith, since every route starts with "/".
//
// "our-coaches" and "news" were dropped from primary nav 2026-08-13 (site
// improvement pass, Priority 3) — both pages currently render their empty
// state ("Coach profiles are being added…" / "No news posted yet…"),
// confirmed live against the OS app's public API (GET /api/public/coaches
// and /api/public/news both return an empty array as of this pass). An
// empty page shouldn't get top-level billing on a first-time visitor's
// nav bar. The routes, pages, and their data-fetching (lib/api.ts) are
// completely untouched — the moment Patrick publishes real coach bios or a
// news post, these two routes are ready and just need re-adding here. Not
// deleted, not gated behind a flag — simply not linked from the header.
// "careers" moved out of primary nav to the footer (see Footer.tsx) — it's
// an evergreen "send us your application" page with no listed openings,
// not a page a first-time parent visitor needs one click away.
const ROUTES: { href: string; key: "home" | "firstTeam" }[] = [
  { href: "/", key: "home" },
  { href: "/first-team", key: "firstTeam" },
];

// Split out from ROUTES so "Home" can render first in the bar (Patrick,
// 2026-08-13: "Accueil should come before About") while the other routes
// still render after Programs/Gallery, same as before.
const HOME_ROUTE = ROUTES[0];
const OTHER_ROUTES = ROUTES.slice(1);

const isRouteActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 8" fill="none" className={className} aria-hidden>
      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Header() {
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape-to-close + focus management for the mobile menu, added 2026-08-14
  // (second site improvement pass, Priority 10/14) — the panel already had
  // correct aria-expanded/aria-controls on its toggle button, but Escape did
  // nothing (only the separate "About" dropdown handled it) and closing the
  // menu by any means never returned focus to the button that opened it, so
  // a keyboard user lost their place. Moves focus into the panel's first
  // link on open (so Tab continues naturally from there) and back to the
  // toggle button whenever the menu closes, by any path — Escape, a nav
  // link click, or the toggle button itself.
  useEffect(() => {
    if (!open) return;
    const firstLink = mobilePanelRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        mobileToggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Close the "About" dropdown on an outside click or Escape — standard
  // dropdown-menu behavior, needed since this is a click-toggle menu (more
  // reliable across trackpad/touch than hover-only) rather than a native
  // <select>.
  useEffect(() => {
    if (!aboutOpen) return;
    const onClick = (e: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) setAboutOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAboutOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [aboutOpen]);

  // On the home page, a section nav item is a plain in-page anchor. On any
  // other route (e.g. /news, /careers), there's no #about on the current
  // page to jump to — the link needs to go back to the home page first,
  // then land on the anchor once there.
  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? "border-white/10 bg-navy-deep/95 shadow-sm backdrop-blur-md" : "border-transparent bg-navy-deep backdrop-blur"
      }`}
    >
      <div
        className={`mx-auto flex max-w-content items-center justify-between px-5 transition-[padding] duration-300 ${
          scrolled ? "py-2.5" : "py-3.5"
        }`}
      >
        {/* Was a plain <a href="#top">, which only worked on the home page
         *  itself — on any other route it tried (and failed) to find #top
         *  on the current page, so the logo silently did nothing from
         *  /news, /careers, etc. Now a real Link so the brand mark always
         *  gets you home, matching the new "Home" nav item added alongside. */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/logo/crest.png" alt="Bright Academy" width={36} height={36} className="rounded" />
          <span className="font-display text-[15px] font-bold tracking-tight text-white">Bright Academy</span>
        </Link>

        {/* gap-4 → gap-3 (2026-08-13): adding the "Home" link as a full
         *  flat item pushed total header width to exactly fill the
         *  container, collapsing justify-between's gaps to zero (Home was
         *  rendering flush against the logo). Trimming the nav's internal
         *  gap restores breathing room without losing an item. */}
        <nav className="hidden items-center gap-3 lg:flex">
          <Link
            href={HOME_ROUTE.href}
            className={`text-[13px] font-medium hover:text-orange ${
              isRouteActive(pathname, HOME_ROUTE.href) ? "text-orange" : "text-white/80"
            }`}
          >
            {t.nav[HOME_ROUTE.key]}
          </Link>

          <div className="relative" ref={aboutRef}>
            <button
              type="button"
              onClick={() => setAboutOpen((v) => !v)}
              className="flex items-center gap-1 text-[13px] font-medium text-white/80 hover:text-orange"
              aria-expanded={aboutOpen}
              aria-controls="about-dropdown-menu"
            >
              {t.nav.about}
              <ChevronDown className={`h-2 w-2.5 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`} />
            </button>
            {aboutOpen && (
              <div id="about-dropdown-menu" className="absolute left-0 top-full mt-3 w-52 overflow-hidden rounded-xl border border-white/10 bg-navy-deep py-1.5 shadow-xl">
                {ABOUT_GROUP.map((s) => (
                  <a
                    key={s.id}
                    href={sectionHref(s.id)}
                    onClick={() => setAboutOpen(false)}
                    className="block px-4 py-2 text-[13px] font-medium text-white/80 transition hover:bg-white/5 hover:text-orange"
                  >
                    {t.nav[s.key]}
                  </a>
                ))}
              </div>
            )}
          </div>

          {TOP_SECTIONS.map((s) => (
            <a key={s.id} href={sectionHref(s.id)} className="text-[13px] font-medium text-white/80 hover:text-orange">
              {t.nav[s.key]}
            </a>
          ))}
          {OTHER_ROUTES.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className={`text-[13px] font-medium hover:text-orange ${
                isRouteActive(pathname, r.href) ? "text-orange" : "text-white/80"
              }`}
            >
              {t.nav[r.key]}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          {/* Priority 11: a bare "FR"/"EN" told a sighted user which
           *  language they'd switch TO, but nothing told a screen reader
           *  user which language is currently active. aria-label now
           *  states both explicitly; lang on the button text itself so a
           *  screen reader pronounces "FR"/"EN" in the right voice instead
           *  of trying to read it as the surrounding page language. */}
          <button
            onClick={() => setLang(lang === "en" ? "fr" : "en")}
            aria-label={lang === "en" ? "Switch to French" : "Passer en anglais"}
            className="rounded-full border border-white/30 px-2.5 py-1 text-[11px] font-semibold text-white"
          >
            <span lang={lang === "en" ? "fr" : "en"}>{lang === "en" ? "FR" : "EN"}</span>
          </button>
          {/* Fixed 2026-08-13, Priority 14/15 verification pass: these two
           *  links (and their mobile-menu equivalents below) previously
           *  used the bare LOGIN_URL/ENROLL_URL constants with no `lang`
           *  param — the OS portal's own middleware (confirmed by reading
           *  that repo) defaults to French and only preserves a different
           *  language when `?lang=` is explicitly present, so an
           *  English-reading visitor clicking "Login"/"Enroll" from the
           *  header — the two most-used links on the site — silently
           *  landed back in French. The per-programme Enroll links in
           *  Programs.tsx/ProgramComparison.tsx already did this
           *  correctly; this makes every ENROLL_URL/LOGIN_URL link
           *  consistent. */}
          <a href={`${LOGIN_URL}?lang=${lang}`} className="text-[13px] font-medium text-white/80 hover:text-orange">
            {t.nav.login}
          </a>
          <a
            href={`${ENROLL_URL}?lang=${lang}`}
            className="rounded-full bg-orange px-4 py-2 text-[13px] font-semibold text-navy-deep hover:bg-orange/90"
          >
            {t.nav.enroll}
          </a>
        </div>

        <button
          ref={mobileToggleRef}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
        >
          <span className="text-white">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div ref={mobilePanelRef} id="mobile-nav-panel" className="border-t border-white/10 bg-navy-deep px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3" aria-label={lang === "fr" ? "Menu mobile" : "Mobile menu"}>
            <Link
              href={HOME_ROUTE.href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium hover:text-orange ${isRouteActive(pathname, HOME_ROUTE.href) ? "text-orange" : "text-white/90"}`}
            >
              {t.nav[HOME_ROUTE.key]}
            </Link>
            <div>
              <button
                type="button"
                onClick={() => setMobileAboutOpen((v) => !v)}
                className="flex w-full items-center justify-between text-sm font-medium text-white/90 hover:text-orange"
                aria-expanded={mobileAboutOpen}
              >
                {t.nav.about}
                <ChevronDown className={`h-2.5 w-3 transition-transform duration-200 ${mobileAboutOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileAboutOpen && (
                <div className="mt-2 flex flex-col gap-2.5 border-l border-white/10 pl-3.5">
                  {ABOUT_GROUP.map((s) => (
                    <a
                      key={s.id}
                      href={sectionHref(s.id)}
                      onClick={() => {
                        setOpen(false);
                        setMobileAboutOpen(false);
                      }}
                      className="text-sm font-medium text-white/80 hover:text-orange"
                    >
                      {t.nav[s.key]}
                    </a>
                  ))}
                </div>
              )}
            </div>
            {TOP_SECTIONS.map((s) => (
              <a key={s.id} href={sectionHref(s.id)} onClick={() => setOpen(false)} className="text-sm font-medium text-white/90 hover:text-orange">
                {t.nav[s.key]}
              </a>
            ))}
            {OTHER_ROUTES.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium hover:text-orange ${isRouteActive(pathname, r.href) ? "text-orange" : "text-white/90"}`}
              >
                {t.nav[r.key]}
              </Link>
            ))}
            <a href={`${LOGIN_URL}?lang=${lang}`} className="text-sm font-medium text-white/90 hover:text-orange">
              {t.nav.login}
            </a>
            <div className="mt-1 flex items-center gap-3">
              <button
                onClick={() => setLang(lang === "en" ? "fr" : "en")}
                aria-label={lang === "en" ? "Switch to French" : "Passer en anglais"}
                className="rounded-full border border-white/30 px-2.5 py-1 text-[11px] font-semibold text-white"
              >
                <span lang={lang === "en" ? "fr" : "en"}>{lang === "en" ? "FR" : "EN"}</span>
              </button>
              <a
                href={`${ENROLL_URL}?lang=${lang}`}
                className="flex-1 rounded-full bg-orange px-4 py-2 text-center text-[13px] font-semibold text-navy-deep"
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
