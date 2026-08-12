"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
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
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const value = useMemo(() => ({ lang, setLang, t: content[lang] }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
