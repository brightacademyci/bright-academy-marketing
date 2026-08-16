"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { LEGAL_CONTENT, getDraftNotice, type LegalSlug } from "@/lib/legal-content";

// Renders one draft legal/policy page — see lib/legal-content.ts for why
// every page here is explicitly marked as a draft rather than final wording.
export function LegalPageContent({ slug }: { slug: LegalSlug }) {
  const { lang } = useLanguage();
  const page = LEGAL_CONTENT[slug][lang];

  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      <div className="relative mx-auto max-w-3xl px-5">
        <Link href="/" className="text-[12px] font-semibold uppercase tracking-wide text-orange hover:text-orange/80">
          {lang === "fr" ? "← Retour à l'accueil" : "← Back to home"}
        </Link>
        <div
          role="note"
          className="mt-5 rounded-xl border border-orange/40 bg-orange/10 px-4 py-3 text-[13px] font-medium leading-relaxed text-orange"
        >
          {getDraftNotice(lang)}
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-white md:text-3xl">{page.title}</h1>
        <p className="mt-3 text-[14px] leading-relaxed text-white/70">{page.intro}</p>

        <div className="mt-8 space-y-6">
          {page.sections.map((section) => (
            <div key={section.heading} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
              <h2 className="font-display text-[15px] font-semibold text-white">{section.heading}</h2>
              <div className="mt-2 space-y-2">
                {section.body.map((paragraph, i) => (
                  <p key={i} className="text-[13px] leading-relaxed text-white/70">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
