"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { content, type ContentShape, type Lang } from "@/lib/content";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: ContentShape;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

// Client-side only toggle — no cookie/URL persistence, deliberately simpler
// than the OS app's lang-cookie middleware since this is a single static
// page with no navigations to carry the choice across.
// Default set to "fr" on 2026-08-13, Patrick's explicit ask ("can the first
// language of the site... be French?"). Visitors still see the toggle and
// can switch to English at any time — this only changes what loads first.
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  // Added 2026-08-13, site improvement pass, Priority 8 — an external
  // review flagged that the visible homepage is French but the technical
  // page language was detected as English. Root cause: app/layout.tsx
  // hardcoded <html lang="en"> regardless of which language actually
  // renders (this component defaults to "fr" and the toggle is entirely
  // client-side, so the server has no way to know the visitor's choice at
  // request time). This keeps the <html lang> attribute in sync with
  // whatever's actually on screen — "fr" immediately on mount (matching
  // the SSR default, so no flash/mismatch) and again on every toggle.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: content[lang] }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
