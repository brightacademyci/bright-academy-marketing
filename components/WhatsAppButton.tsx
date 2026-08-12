"use client";

import { useLanguage } from "./LanguageProvider";
import { WHATSAPP_LINK } from "@/lib/content";

// Floating chat entry point — WhatsApp is the primary way families in
// Côte d'Ivoire actually reach the academy day-to-day (see the footer
// contact link), but buried at the bottom of the page it's easy to miss.
// A persistent, always-reachable button gives parents who aren't ready
// for the full enrollment flow yet a lower-commitment way to just ask a
// question. Kept in the site's own orange/navy palette (rather than
// WhatsApp's brand green) so it reads as part of Bright Academy, not a
// generic third-party widget bolted on — the glyph alone is recognizable
// enough to signal "chat" regardless of color.
export function WhatsAppButton() {
  const { t } = useLanguage();
  // WHATSAPP_LINK is already the correctly-formatted international wa.me
  // URL (country code, no leading 0) — WHATSAPP_NUMBER by itself is the
  // local-format display number and isn't valid as a wa.me path segment.
  const href = `${WHATSAPP_LINK}?text=${encodeURIComponent(t.chat.prefill)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.chat.label}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-orange text-navy-deep shadow-lg shadow-navy-deep/40 transition hover:-translate-y-0.5 hover:bg-orange/90 hover:shadow-xl md:bottom-6 md:right-6"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.763.464 3.48 1.345 4.997L2 22l5.146-1.335a9.96 9.96 0 0 0 4.858 1.237h.004c5.514 0 9.997-4.483 9.997-9.997 0-2.67-1.04-5.18-2.928-7.07a9.935 9.935 0 0 0-7.073-2.832zm5.845 15.842c-.244.687-1.426 1.35-1.966 1.43-.502.075-1.135.107-1.83-.115-.422-.134-.964-.312-1.66-.61-2.92-1.261-4.828-4.192-4.975-4.388-.146-.196-1.192-1.586-1.192-3.026 0-1.44.756-2.148 1.024-2.44.269-.293.586-.366.782-.366.196 0 .391.002.562.01.18.009.42-.068.657.501.244.586.828 2.024.9 2.171.073.147.122.319.024.517-.098.198-.147.32-.293.492-.147.171-.309.383-.44.514-.147.147-.3.306-.13.601.171.294.762 1.259 1.635 2.038 1.123 1.002 2.07 1.312 2.365 1.46.294.147.465.123.637-.075.171-.196.735-.858.93-1.152.196-.294.392-.245.66-.147.269.098 1.703.803 1.996.949.294.147.489.22.562.343.073.123.073.71-.171 1.393z" />
      </svg>
    </a>
  );
}
