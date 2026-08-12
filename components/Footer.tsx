"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { FOOTER_SOCIAL, LOGIN_URL, WHATSAPP_DISPLAY } from "@/lib/content";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy-deep py-12 text-white/70">
      <div className="mx-auto max-w-content px-5">
        <div className="grid gap-8 md:grid-cols-3">
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
            <p className="text-[12px] font-semibold uppercase tracking-wide text-white/50">{t.footer.contact}</p>
            <ul className="mt-3 space-y-2 text-[13px]">
              <li>
                <a href={FOOTER_SOCIAL.whatsapp} className="hover:text-white transition">
                  {t.footer.whatsapp}: {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a href={LOGIN_URL} className="hover:text-white transition">
                  {t.footer.parentLogin}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wide text-white/50">{t.footer.social}</p>
            <ul className="mt-3 space-y-2 text-[13px]">
              <li>
                <a href={FOOTER_SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  Facebook
                </a>
              </li>
              <li>
                <a href={FOOTER_SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  Instagram
                </a>
              </li>
              <li>
                <a href={FOOTER_SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  TikTok
                </a>
              </li>
              <li>
                <a href={FOOTER_SOCIAL.whatsapp} className="hover:text-white transition">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-[12px] text-white/55">{t.footer.copyright}</div>
      </div>
    </footer>
  );
}
