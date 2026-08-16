// Trial-session WhatsApp booking — added 2026-08-13, site improvement
// pass, Priority 4. The OS app's parent portal has no self-service trial
// request flow (checked: its "leads"/trial-scheduling tooling in
// bright-academy-os is staff-only, behind login, for front-desk/admin
// roles logging an inquiry on a parent's behalf — there's no public
// endpoint a parent can hit directly). Per Patrick's brief, the fallback
// is WhatsApp with a prefilled message, which is what this builds.
//
// CONFIRMED PAID TRIAL POLICY: a trial session is billed at the selected
// programme's normal single-session ("à la carte") price — never free,
// never a flat universal price. trialSessionPrice === singleSessionXOF by
// construction (see lib/pricing.ts); there is no separately-editable trial
// price anywhere in this codebase, so a fee_plans price change there
// automatically flows through here without a second edit.
import { WHATSAPP_LINK } from "./content";
import type { Lang } from "./content";
import { CURRENCY } from "./pricing";

function formatXOF(amount: number, lang: Lang): string {
  // "6 000" (fr) / "6,000" (en) — matches the grouping convention the FAQ
  // already established for every other price on this site ("22 000 XOF"
  // in French, "22,000 XOF" in English). Was hardcoded to en-US grouping
  // for both languages until this fix, which put a comma-grouped number
  // ("6,000 FCFA") inside an otherwise all-French WhatsApp message.
  return amount.toLocaleString(lang === "fr" ? "fr-FR" : "en-US");
}

interface TrialMessageArgs {
  lang: Lang;
  /** Localized programme name as shown on the card the visitor clicked from, if any. */
  programName?: string;
  /** The confirmed single-session price for that programme, in XOF — omit only if genuinely unconfirmed. */
  priceXOF?: number;
}

export function buildTrialMessage({ lang, programName, priceXOF }: TrialMessageArgs): string {
  if (!programName) {
    // CORRECTED 2026-08-16 (audit-corrections pass, Priority 5) — this
    // generic (no programme picked yet) message never mentioned the trial
    // is paid at all, unlike the programme-specific messages below it,
    // which already state the price. An external audit flagged this as
    // the one place on the site that could read as implying a free
    // trial. Now Patrick's own approved provisional wording, stating the
    // paid policy and the trialSessionPrice = singleSessionPrice rule
    // explicitly, without needing a specific programme/price yet.
    return lang === "fr"
      ? "Bonjour Bright Academy, je souhaite réserver une séance d'essai payante pour mon enfant. J'ai compris que le tarif correspond au prix d'une séance individuelle du programme choisi. Pouvez-vous m'aider à choisir le programme et le site adaptés et me confirmer le montant et les horaires disponibles ?"
      : "Hello Bright Academy, I would like to book a paid trial session for my child. I understand that the fee is the same as the single-session price of the selected programme. Could you help me choose the appropriate programme and location and confirm the price and available times?";
  }

  if (priceXOF != null) {
    return lang === "fr"
      ? `Bonjour Bright Academy, je souhaite réserver une séance d'essai payante pour mon enfant dans le programme ${programName}, au tarif de ${formatXOF(priceXOF, lang)} FCFA correspondant au prix d'une séance individuelle. Pouvez-vous me confirmer le site et les horaires disponibles ?`
      : `Hello Bright Academy, I would like to book a paid trial session for my child in the ${programName} programme at ${formatXOF(priceXOF, lang)} ${CURRENCY}, corresponding to the normal single-session price. Could you confirm the available location and schedule?`;
  }

  return lang === "fr"
    ? `Bonjour Bright Academy, je souhaite réserver une séance d'essai payante pour mon enfant dans le programme ${programName}. Pouvez-vous me confirmer le tarif d'une séance individuelle, le site et les horaires disponibles ?`
    : `Hello Bright Academy, I would like to book a paid trial session for my child in the ${programName} programme. Could you confirm the normal single-session price, the available location and the schedule?`;
}

export function buildTrialWhatsAppUrl(args: TrialMessageArgs): string {
  return `${WHATSAPP_LINK}?text=${encodeURIComponent(buildTrialMessage(args))}`;
}
