"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

interface TrialButtonProps {
  /** Pass a programme name (e.g. "Bright Kids") when the visitor has already picked one — prefills the /trial form's programme field. Omit for a generic entry point (hero, final CTA). */
  programName?: string;
  /** Pass a site name when the visitor clicked from a specific site's card — prefills the /trial form's site field. */
  siteName?: string;
  className?: string;
  children?: ReactNode;
}

// Every trial button on the site — generic, programme-specific, or
// site-specific — routes through here to a single /trial page with a real
// form (see TrialRequestForm.tsx), which lands the request on the OS app
// as a Leads entry addressed to that site's receptionist. Previously this
// jumped straight to a prefilled WhatsApp message (see lib/whatsapp.ts's
// still-present buildTrialMessage — kept as the secondary "chat with us"
// option on the /trial page itself, not deleted) — changed 2026-08-17 per
// Patrick's explicit ask that a trial request land on the platform rather
// than only ever reaching WhatsApp.
export function TrialButton({ programName, siteName, className, children }: TrialButtonProps) {
  const { t } = useLanguage();
  const params = new URLSearchParams();
  if (programName) params.set("program", programName);
  if (siteName) params.set("site", siteName);
  const query = params.toString();
  const href = query ? `/trial?${query}` : "/trial";

  return (
    <Link href={href} className={className}>
      {children ?? t.hero.ctaTrial}
    </Link>
  );
}
