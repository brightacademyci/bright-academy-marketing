"use client";

import { useLanguage } from "./LanguageProvider";
import { ENROLL_URL, WHATSAPP_LINK } from "@/lib/content";
import { Reveal } from "./Reveal";
import { BrandDiagram } from "./BrandDiagram";
import { TrialButton } from "./TrialButton";

export function EnrollCta() {
  const { t, lang } = useLanguage();
  const whatsappHref = `${WHATSAPP_LINK}?text=${encodeURIComponent(t.chat.prefill)}`;

  return (
    <section id="contact" className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
      />
      <BrandDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.07]" />
      <Reveal className="relative mx-auto flex max-w-content flex-col items-center px-5 text-center">
        <h2 className="max-w-xl font-display text-2xl font-bold md:text-3xl">{t.enrollCta.title}</h2>
        <p className="mt-3 max-w-md text-[14px] text-white/75">{t.enrollCta.subtitle}</p>
        {/* Three conversion paths, per Priority 6's final-section spec:
         *  trial booking, full enrollment, and a direct WhatsApp line for
         *  anyone not ready for either yet. */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            // Fixed 2026-08-13, Priority 14/15 — see Header.tsx's note;
            // this is the final-CTA enroll link, the same fix applies.
            href={`${ENROLL_URL}?lang=${lang}`}
            className="rounded-full bg-orange px-8 py-3.5 text-[14px] font-semibold text-navy-deep transition hover:-translate-y-0.5 hover:bg-orange/90 hover:shadow-lg"
          >
            {t.enrollCta.cta}
          </a>
          <TrialButton className="rounded-full border border-orange/30 px-8 py-3.5 text-[14px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange/10" />
        </div>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-4 text-[13px] font-medium text-white/60 underline decoration-white/30 underline-offset-4 hover:text-white">
          {t.chat.label}
        </a>
      </Reveal>
    </section>
  );
}
