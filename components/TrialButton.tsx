"use client";

import type { ReactNode } from "react";
import { useLanguage } from "./LanguageProvider";
import { buildTrialWhatsAppUrl } from "@/lib/whatsapp";
import { getProgramPricing } from "@/lib/pricing";

interface TrialButtonProps {
  /** Pass a programme name (e.g. "Bright Kids") when the visitor has already picked one — this drives the confirmed single-session price into the WhatsApp message. Omit for a generic entry point (hero, final CTA). */
  programName?: string;
  className?: string;
  children?: ReactNode;
}

// Every trial button on the site — generic or programme-specific — routes
// through here so the pricing rule (trial price = that programme's
// confirmed single-session price) and the WhatsApp fallback (see
// lib/whatsapp.ts for why WhatsApp rather than a portal flow) are applied
// in exactly one place. Added 2026-08-13, site improvement pass, Priority 4.
export function TrialButton({ programName, className, children }: TrialButtonProps) {
  const { lang, t } = useLanguage();
  const pricing = programName ? getProgramPricing(programName) : undefined;
  const href = buildTrialWhatsAppUrl({ lang, programName, priceXOF: pricing?.singleSessionXOF });

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children ?? t.hero.ctaTrial}
    </a>
  );
}
