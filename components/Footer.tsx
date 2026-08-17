"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { FOOTER_SOCIAL, LOGIN_URL, WHATSAPP_DISPLAY } from "@/lib/content";

// LEGAL_PAGES — added 2026-08-13, site improvement pass, Priority 13.
// Filled in with real content 2026-08-17 (see lib/legal-content.ts's top
// comment for provenance — Patrick's confirmed answers, not yet
// lawyer-reviewed). Bright Academy collects contact and medical
// information about children, so these pages matter — see
// app/legal/[slug]/page.tsx.
const LEGAL_PAGES: { href: string; key: "privacy" | "terms" | "enrollmentTerms" | "cancellation" | "safeguarding" | "photoConsent" }[] = [
  { href: "/legal/privacy-policy", key: "privacy" },
  { href: "/legal/terms", key: "terms" },
  { href: "/legal/enrollment-terms", key: "enrollmentTerms" },
  { href: "/legal/cancellation-policy", key: "cancellation" },
  { href: "/legal/child-safeguarding", key: "safeguarding" },
  { href: "/legal/photo-video-consent", key: "photoConsent" },
];

export function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="bg-navy-deep py-12 text-white/70">
      <div className="mx-auto max-w-content px-5">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/logo/crest.png" alt="Bright Academy" width={32} height={32} className="rounded" />
              <span className="font-display text-[14px] font-bold text-white">Bright Academy</span>
            </div>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed">{t.footer.tagline}</p>
          </div>

          <div>
            {/* Column label, not a document heading — footer nav doesn't
                need its own place in the page's h1-h3 outline, and forcing
                one in just to skip straight to h4 breaks heading order. */}
            <p className="text-[12px] font-semibold uppercase tracking-wide text-white/50">{t.footer.quickLinks}</p>
            <ul className="mt-3 space-y-2 text-[13px]">
              {/* Moved out of the primary header nav 2026-08-13 (Priority
               *  3) — an evergreen "send your application" page with no
               *  listed openings doesn't need top-level nav billing, but
               *  the page itself (and its form) is untouched and still
               *  fully reachable here. */}
              <li>
                <Link href="/careers" className="hover:text-orange transition">
                  {t.nav.careers}
                </Link>
              </li>
              <li>
                <a href={FOOTER_SOCIAL.whatsapp} className="hover:text-orange transition">
                  {t.footer.whatsapp}: {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                {/* Fixed 2026-08-13, Priority 14/15 — see Header.tsx's
                 *  fuller note on why every LOGIN_URL/ENROLL_URL link now
                 *  carries ?lang=. */}
                <a href={`${LOGIN_URL}?lang=${lang}`} className="hover:text-orange transition">
                  {t.footer.parentLogin}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wide text-white/50">{t.footer.social}</p>
            <ul className="mt-3 space-y-2 text-[13px]">
              <li>
                <a href={FOOTER_SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-orange transition">
                  Facebook
                </a>
              </li>
              <li>
                <a href={FOOTER_SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-orange transition">
                  Instagram
                </a>
              </li>
              <li>
                <a href={FOOTER_SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-orange transition">
                  TikTok
                </a>
              </li>
              <li>
                <a href={FOOTER_SOCIAL.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-orange transition">
                  YouTube
                </a>
              </li>
              <li>
                <a href={FOOTER_SOCIAL.whatsapp} className="hover:text-orange transition">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wide text-white/50">{t.footer.legal}</p>
            <ul className="mt-3 space-y-2 text-[13px]">
              {LEGAL_PAGES.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className="hover:text-orange transition">
                    {t.footer.legalLinks[page.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-[12px] text-white/55">{t.footer.copyright}</div>
      </div>
    </footer>
  );
}
