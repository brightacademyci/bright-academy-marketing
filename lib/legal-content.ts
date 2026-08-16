// Draft legal/policy pages — added 2026-08-13, site improvement pass,
// Priority 13. Bright Academy collects contact and medical information
// about children through the parent portal (see the existing, previously-
// approved `safety` section in content.ts), which means the site needs
// linked policy pages even before final legal wording exists. Every page
// here is explicitly marked as a draft awaiting Patrick's (and, for
// anything legally binding, a lawyer's) review — per working rule 5, this
// is a structured placeholder, not invented legal language presented as
// final. Nothing on these pages asserts a specific retention period, a
// specific data processor, or a specific legal jurisdiction's requirement
// that isn't already stated elsewhere in this project.
//
// The sections that ISN'T a placeholder are the safety/medical ones on the
// Child Safeguarding and Privacy pages — pulled directly from content.ts's
// `safety.pillars` copy (Patrick's own approved provisional wording from
// the 2026-08-16 audit-corrections pass), imported rather than duplicated,
// so a future correction to that wording only has one place to make it.
import { content, type Lang } from "./content";

// CENTRALISED 2026-08-16 (audit-corrections pass, Priority 2) — was a
// hand-copied duplicate of content.ts's `safety.pillars` body text that
// had drifted out of sync with it (still said "our coaching and medical
// staff" and listed blood type after the safety section itself was
// corrected). Now imports the pillar bodies directly instead of
// re-describing them, so the two can never disagree again.
const SAFETY_DURING_TRAINING: Record<Lang, string> = {
  en: content.en.safety.pillars[0]!.body,
  fr: content.fr.safety.pillars[0]!.body,
};
const SAFETY_INCIDENT_MANAGEMENT: Record<Lang, string> = {
  en: content.en.safety.pillars[1]!.body,
  fr: content.fr.safety.pillars[1]!.body,
};

export type LegalSlug =
  | "privacy-policy"
  | "terms"
  | "enrollment-terms"
  | "cancellation-policy"
  | "child-safeguarding"
  | "photo-video-consent";

export const LEGAL_SLUGS: LegalSlug[] = [
  "privacy-policy",
  "terms",
  "enrollment-terms",
  "cancellation-policy",
  "child-safeguarding",
  "photo-video-consent",
];

interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalPageContent {
  title: string;
  intro: string;
  sections: LegalSection[];
}

const DRAFT_NOTICE: Record<Lang, string> = {
  en: "DRAFT — awaiting review. This page is a structured placeholder, not Bright Academy's final policy. Nothing below should be treated as a binding commitment until an approved version replaces it.",
  fr: "BROUILLON — en attente de validation. Cette page est un modèle structuré, pas la politique définitive de Bright Academy. Aucun élément ci-dessous ne doit être considéré comme un engagement définitif tant qu'une version validée ne l'aura pas remplacé.",
};

// CENTRALISED 2026-08-16 (Priority 2) — now imports content.ts's
// `safety.pillars[2]` body directly instead of a hand-copied duplicate
// (see the comment above this file's import for the full history).
const MEDICAL_INFO_COLLECTED: Record<Lang, string> = {
  en: content.en.safety.pillars[2]!.body,
  fr: content.fr.safety.pillars[2]!.body,
};

const TBD: Record<Lang, string> = {
  en: "[To be confirmed by Bright Academy before this page is published as final.]",
  fr: "[À confirmer par Bright Academy avant la publication définitive de cette page.]",
};

export const LEGAL_CONTENT: Record<LegalSlug, Record<Lang, LegalPageContent>> = {
  "privacy-policy": {
    en: {
      title: "Privacy Policy",
      intro:
        "This page explains what personal information Bright Academy collects about parents and children through our website and parent portal, why we collect it, who can access it, and how parents can request changes.",
      sections: [
        {
          heading: "What we collect",
          body: [
            "Parent account information: full name, email address, and phone number, collected when a parent creates an account.",
            "Child registration information: full name, date of birth, training site and programme, and emergency contact details.",
            `Medical information: ${MEDICAL_INFO_COLLECTED.en}`,
            `Billing information: which programme and billing cycle a family is enrolled in, and payment/invoice records. ${TBD.en}`,
          ],
        },
        { heading: "Why we collect it", body: [`To register and enroll a child in a Bright Academy programme, to run training sessions safely, to respond quickly in a medical emergency, and to manage billing. ${TBD.en}`] },
        { heading: "Who can access it", body: [`Bright Academy staff who need it for their role. Medical information is confidential and accessible only to authorised personnel, not shared publicly. ${TBD.en}`] },
        { heading: "How long we keep it", body: [TBD.en] },
        { heading: "Your rights", body: [`Parents can request to view, correct, or delete their and their child's information on file. ${TBD.en}`] },
      ],
    },
    fr: {
      title: "Politique de confidentialité",
      intro:
        "Cette page explique quelles informations personnelles Bright Academy collecte auprès des parents et des enfants via notre site et le portail parent, pourquoi nous les collectons, qui peut y accéder, et comment les parents peuvent demander des modifications.",
      sections: [
        {
          heading: "Ce que nous collectons",
          body: [
            "Informations du compte parent : nom complet, adresse e-mail et numéro de téléphone, recueillis à la création du compte.",
            "Informations d'inscription de l'enfant : nom complet, date de naissance, site et programme d'entraînement, et coordonnées d'urgence.",
            `Informations médicales : ${MEDICAL_INFO_COLLECTED.fr}`,
            `Informations de facturation : le programme et la formule de facturation choisis, ainsi que l'historique de paiement/facturation. ${TBD.fr}`,
          ],
        },
        { heading: "Pourquoi nous les collectons", body: [`Pour inscrire un enfant à un programme Bright Academy, encadrer les entraînements en toute sécurité, réagir rapidement en cas d'urgence médicale, et gérer la facturation. ${TBD.fr}`] },
        { heading: "Qui peut y accéder", body: [`Le personnel de Bright Academy qui en a besoin pour son rôle. Les informations médicales sont confidentielles et accessibles uniquement aux personnes autorisées, jamais partagées publiquement. ${TBD.fr}`] },
        { heading: "Durée de conservation", body: [TBD.fr] },
        { heading: "Vos droits", body: [`Les parents peuvent demander à consulter, corriger ou supprimer leurs informations et celles de leur enfant. ${TBD.fr}`] },
      ],
    },
  },
  terms: {
    en: {
      title: "Terms & Conditions",
      intro: "General terms governing use of the Bright Academy website and parent portal.",
      sections: [{ heading: "Draft", body: [TBD.en] }],
    },
    fr: {
      title: "Conditions générales",
      intro: "Conditions générales régissant l'utilisation du site Bright Academy et du portail parent.",
      sections: [{ heading: "Brouillon", body: [TBD.fr] }],
    },
  },
  "enrollment-terms": {
    en: {
      title: "Enrollment Terms",
      intro: "Terms specific to enrolling a child at Bright Academy — referenced today in our FAQ's cancellation-policy answer.",
      sections: [
        {
          heading: "What's already published elsewhere on the site",
          body: [
            "A one-time annual enrollment fee applies per sporting season (September–May): 30,000 XOF for new players, 25,000 XOF for returning ones.",
            "Two official training kits are required each season and billed separately at a total of 40,000 XOF.",
            "Withdrawal takes effect at the end of the current billing month; registration fees and subscriptions already paid aren't refunded for a voluntary withdrawal during the season.",
          ],
        },
        { heading: "Full terms", body: [TBD.en] },
      ],
    },
    fr: {
      title: "Conditions d'inscription",
      intro: "Conditions propres à l'inscription d'un enfant à Bright Academy — déjà référencées dans la réponse de la FAQ sur la politique d'annulation.",
      sections: [
        {
          heading: "Ce qui est déjà publié ailleurs sur le site",
          body: [
            "Des frais d'adhésion annuelle s'appliquent pour la saison sportive (septembre à mai) : 30 000 XOF pour un nouveau joueur, 25 000 XOF pour un joueur qui revient.",
            "Deux tenues d'entraînement officielles sont requises chaque saison, facturées séparément pour un total de 40 000 XOF.",
            "Le retrait prend effet à la fin du mois de cotisation en cours ; les frais d'inscription et cotisations déjà réglés ne sont pas remboursés en cas de retrait volontaire en cours de saison.",
          ],
        },
        { heading: "Conditions complètes", body: [TBD.fr] },
      ],
    },
  },
  "cancellation-policy": {
    en: {
      title: "Cancellation & Refund Policy",
      intro: "Bright Academy's policy on withdrawing a child and refunds.",
      sections: [
        {
          heading: "What's already published elsewhere on the site",
          body: [
            "You can withdraw your child at any time with written notice to the academy; it takes effect at the end of the current billing month unless agreed otherwise.",
            "Registration fees and subscriptions already paid aren't refunded for a voluntary withdrawal during the season.",
          ],
        },
        { heading: "Full policy", body: [TBD.en] },
      ],
    },
    fr: {
      title: "Politique d'annulation et de remboursement",
      intro: "Politique de Bright Academy concernant le retrait d'un enfant et les remboursements.",
      sections: [
        {
          heading: "Ce qui est déjà publié ailleurs sur le site",
          body: [
            "Vous pouvez retirer votre enfant à tout moment par simple notification écrite à l'académie ; le retrait prend effet à la fin du mois de cotisation en cours, sauf accord contraire.",
            "Les frais d'inscription et cotisations déjà réglés ne sont pas remboursés en cas de retrait volontaire en cours de saison.",
          ],
        },
        { heading: "Politique complète", body: [TBD.fr] },
      ],
    },
  },
  "child-safeguarding": {
    en: {
      title: "Child Safeguarding",
      intro: "How Bright Academy approaches child safety, supervision, and emergency response — full detail already published in the Safety & Wellbeing section of the homepage.",
      sections: [
        {
          heading: "During training",
          body: [SAFETY_DURING_TRAINING.en],
        },
        {
          heading: "Safety and incident management",
          body: [SAFETY_INCIDENT_MANAGEMENT.en],
        },
        { heading: "Medical information we collect", body: [MEDICAL_INFO_COLLECTED.en] },
        { heading: "Formal safeguarding policy (reporting a concern, staff vetting, code of conduct)", body: [TBD.en] },
      ],
    },
    fr: {
      title: "Protection de l'enfant",
      intro: "L'approche de Bright Academy en matière de sécurité, d'encadrement et de réponse aux urgences — le détail complet est déjà publié dans la section Sécurité & bien-être de la page d'accueil.",
      sections: [
        {
          heading: "Pendant les entraînements",
          body: [SAFETY_DURING_TRAINING.fr],
        },
        {
          heading: "Sécurité et gestion des incidents",
          body: [SAFETY_INCIDENT_MANAGEMENT.fr],
        },
        { heading: "Informations médicales collectées", body: [MEDICAL_INFO_COLLECTED.fr] },
        { heading: "Politique de protection formelle (signalement d'un problème, vérification du personnel, code de conduite)", body: [TBD.fr] },
      ],
    },
  },
  "photo-video-consent": {
    en: {
      title: "Photo & Video Consent",
      intro:
        "Bright Academy photographs and films training sessions, matches, and events, and may use these for the website, gallery, and social media. This consent is separate from, and optional relative to, the consent required to register a child.",
      sections: [
        { heading: "What we ask", body: [`Consent is requested separately from required registration consent, and is not pre-checked by default. Parents can decline photo/video use without affecting their child's registration. ${TBD.en}`] },
        { heading: "How images are used", body: [TBD.en] },
        { heading: "Withdrawing consent later", body: [TBD.en] },
      ],
    },
    fr: {
      title: "Consentement photo et vidéo",
      intro:
        "Bright Academy photographie et filme les entraînements, matchs et événements, et peut les utiliser pour le site, la galerie et les réseaux sociaux. Ce consentement est distinct du consentement requis pour inscrire un enfant, et optionnel.",
      sections: [
        { heading: "Ce que nous demandons", body: [`Le consentement est demandé séparément du consentement obligatoire à l'inscription, et n'est jamais pré-coché par défaut. Les parents peuvent refuser l'utilisation photo/vidéo sans que cela affecte l'inscription de leur enfant. ${TBD.fr}`] },
        { heading: "Utilisation des images", body: [TBD.fr] },
        { heading: "Retrait du consentement", body: [TBD.fr] },
      ],
    },
  },
};

export function getDraftNotice(lang: Lang): string {
  return DRAFT_NOTICE[lang];
}
