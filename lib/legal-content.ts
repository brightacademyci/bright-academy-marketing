// Legal/policy pages — added as structured drafts 2026-08-13 (site
// improvement pass, Priority 13), filled in with real content 2026-08-17
// at Patrick's request ("it says waiting on approval for the legal
// mentions... improve the legal mentions and publish").
//
// Provenance, for whoever edits this next: the facts below that are
// business decisions (data retention, the safeguarding contact address,
// staff background-check policy, how consent is withdrawn) are Patrick's
// own confirmed answers, given directly in chat on 2026-08-17 — not
// invented, and not independently verified against Bright Academy's actual
// internal practice beyond what he stated. Everything else (published
// pricing/cancellation facts, the safety-pillar wording) is imported from
// content.ts rather than duplicated, so a future correction there only has
// one place to make it. This content has NOT been reviewed by a lawyer —
// it's real, Patrick-approved wording, but if Bright Academy wants
// certainty about compliance with Ivorian data-protection law (Loi
// n°2013-450 du 19 juin 2013) or anything else here, that still needs an
// actual legal review. Worth a fresh discussion before any page here makes
// a new binding promise that isn't already reflected in how the academy
// actually operates.
import { content, type Lang, SAFEGUARDING_EMAIL, WHATSAPP_DISPLAY } from "./content";

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
// CENTRALISED 2026-08-16 (Priority 2) — now imports content.ts's
// `safety.pillars[2]` body directly instead of a hand-copied duplicate
// (see the comment above this file's import for the full history).
const MEDICAL_INFO_COLLECTED: Record<Lang, string> = {
  en: content.en.safety.pillars[2]!.body,
  fr: content.fr.safety.pillars[2]!.body,
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

// Replaces the old DRAFT_NOTICE/getDraftNotice (2026-08-13 through
// 2026-08-17) now that these pages carry real content rather than
// placeholders — see this file's top comment for what "real" means here.
// Kept as a visible, permanent note (not removed outright) because a
// contact line for policy questions is worth keeping on every legal page
// regardless of content status.
const POLICY_NOTICE: Record<Lang, string> = {
  en: `Last reviewed August 2026. Questions about any policy on this page? Contact us at ${SAFEGUARDING_EMAIL} or via WhatsApp (${WHATSAPP_DISPLAY}).`,
  fr: `Dernière révision : août 2026. Une question sur l'une de ces politiques ? Contactez-nous à ${SAFEGUARDING_EMAIL} ou via WhatsApp (${WHATSAPP_DISPLAY}).`,
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
            "Billing information: which programme and billing cycle a family is enrolled in, and related payment or invoice records.",
          ],
        },
        {
          heading: "Why we collect it",
          body: [
            "To register and enroll a child in a Bright Academy programme, to run training sessions safely, to respond quickly in a medical emergency, to manage billing, and to communicate with parents about their child's participation.",
          ],
        },
        {
          heading: "Who can access it",
          body: [
            "Bright Academy staff who need it for their role. Medical information is confidential and accessible only to authorised personnel, and is never shared publicly. We do not sell personal information. We only share it with service providers who help us run the academy and the parent portal (for example, our database and hosting provider), under confidentiality obligations, or when required by law.",
          ],
        },
        {
          heading: "How long we keep it",
          body: [
            "We keep a family's information for as long as a child is enrolled at the academy. After a child leaves, we keep it only until a parent asks us to delete it — see Your rights below.",
          ],
        },
        {
          heading: "Your rights",
          body: [`Parents can request to view, correct, or delete their own and their child's information at any time by contacting us at ${SAFEGUARDING_EMAIL} or via WhatsApp (${WHATSAPP_DISPLAY}).`],
        },
        {
          heading: "Governing law",
          body: ["This policy is governed by the laws of Côte d'Ivoire, including Law No. 2013-450 of 19 June 2013 on the protection of personal data."],
        },
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
            "Informations de facturation : le programme et la formule de facturation choisis, ainsi que les documents de paiement ou de facturation associés.",
          ],
        },
        {
          heading: "Pourquoi nous les collectons",
          body: [
            "Pour inscrire un enfant à un programme Bright Academy, encadrer les entraînements en toute sécurité, réagir rapidement en cas d'urgence médicale, gérer la facturation, et communiquer avec les parents au sujet de la participation de leur enfant.",
          ],
        },
        {
          heading: "Qui peut y accéder",
          body: [
            "Le personnel de Bright Academy qui en a besoin pour son rôle. Les informations médicales sont confidentielles et accessibles uniquement aux personnes autorisées, et ne sont jamais partagées publiquement. Nous ne vendons pas d'informations personnelles. Nous ne les partageons qu'avec les prestataires qui nous aident à faire fonctionner l'académie et le portail parent (par exemple notre fournisseur de base de données et d'hébergement), sous obligation de confidentialité, ou lorsque la loi l'exige.",
          ],
        },
        {
          heading: "Durée de conservation",
          body: [
            "Nous conservons les informations d'une famille aussi longtemps que l'enfant est inscrit à l'académie. Une fois l'enfant parti, nous ne les conservons que jusqu'à ce qu'un parent nous demande de les supprimer — voir Vos droits ci-dessous.",
          ],
        },
        {
          heading: "Vos droits",
          body: [`Les parents peuvent demander à consulter, corriger ou supprimer leurs informations et celles de leur enfant à tout moment, en nous contactant à ${SAFEGUARDING_EMAIL} ou via WhatsApp (${WHATSAPP_DISPLAY}).`],
        },
        {
          heading: "Droit applicable",
          body: ["Cette politique est régie par le droit ivoirien, notamment la loi n°2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel."],
        },
      ],
    },
  },
  terms: {
    en: {
      title: "Terms & Conditions",
      intro:
        "These terms govern your use of the Bright Academy website and parent portal. By using either, you agree to them. For terms specific to enrolling a child, see our Enrollment Terms.",
      sections: [
        {
          heading: "Who these terms are for",
          body: ["These terms apply to anyone visiting brightacademyci.com or using the Bright Academy parent portal. A parent or guardian must be at least 18 years old to create an account."],
        },
        {
          heading: "Using the website and portal",
          body: [
            "You agree to use the website and portal only for their intended purpose — learning about Bright Academy, managing your child's enrollment, and communicating with the academy — and not to attempt to disrupt them or access another family's information.",
          ],
        },
        {
          heading: "Accounts",
          body: ["You're responsible for keeping your login details secure and for activity on your account. Contact us straight away if you think someone else has accessed it."],
        },
        {
          heading: "Content and trademarks",
          body: [
            "The Bright Academy name, crest, and the photos, videos and text on this site belong to Bright Academy or are used with permission. You may not copy or reuse them for commercial purposes without asking us first.",
          ],
        },
        {
          heading: "No warranty",
          body: ["We do our best to keep this site and the portal accurate and available, but we don't guarantee they'll be error-free or uninterrupted."],
        },
        {
          heading: "Changes to these terms",
          body: ["We may update these terms from time to time. The version published here is the current one."],
        },
        {
          heading: "Governing law and contact",
          body: [`These terms are governed by the laws of Côte d'Ivoire. Questions? Contact us at ${SAFEGUARDING_EMAIL} or via WhatsApp (${WHATSAPP_DISPLAY}).`],
        },
      ],
    },
    fr: {
      title: "Conditions générales",
      intro:
        "Ces conditions régissent votre utilisation du site Bright Academy et du portail parent. En les utilisant, vous les acceptez. Pour les conditions propres à l'inscription d'un enfant, consultez nos Conditions d'inscription.",
      sections: [
        {
          heading: "À qui s'appliquent ces conditions",
          body: ["Ces conditions s'appliquent à toute personne visitant brightacademyci.com ou utilisant le portail parent Bright Academy. Un parent ou tuteur doit avoir au moins 18 ans pour créer un compte."],
        },
        {
          heading: "Utilisation du site et du portail",
          body: [
            "Vous vous engagez à utiliser le site et le portail uniquement dans le but pour lequel ils sont prévus — découvrir Bright Academy, gérer l'inscription de votre enfant, et communiquer avec l'académie — et à ne pas tenter de les perturber ni d'accéder aux informations d'une autre famille.",
          ],
        },
        {
          heading: "Comptes",
          body: ["Vous êtes responsable de la sécurité de vos identifiants de connexion et de l'activité sur votre compte. Contactez-nous immédiatement si vous pensez qu'une autre personne y a accédé."],
        },
        {
          heading: "Contenu et marques",
          body: [
            "Le nom Bright Academy, son emblème, ainsi que les photos, vidéos et textes présents sur ce site appartiennent à Bright Academy ou sont utilisés avec autorisation. Vous ne pouvez pas les copier ni les réutiliser à des fins commerciales sans notre accord préalable.",
          ],
        },
        {
          heading: "Aucune garantie",
          body: ["Nous faisons de notre mieux pour que ce site et le portail restent exacts et disponibles, mais nous ne garantissons pas qu'ils seront exempts d'erreurs ou d'interruptions."],
        },
        {
          heading: "Modifications de ces conditions",
          body: ["Nous pouvons modifier ces conditions de temps à autre. La version publiée ici est la version en vigueur."],
        },
        {
          heading: "Droit applicable et contact",
          body: [`Ces conditions sont régies par le droit ivoirien. Une question ? Contactez-nous à ${SAFEGUARDING_EMAIL} ou via WhatsApp (${WHATSAPP_DISPLAY}).`],
        },
      ],
    },
  },
  "enrollment-terms": {
    en: {
      title: "Enrollment Terms",
      intro: "Terms specific to enrolling a child at Bright Academy — already referenced in our FAQ's cancellation-policy answer.",
      sections: [
        {
          heading: "What's already published elsewhere on the site",
          body: [
            "A one-time annual enrollment fee applies per sporting season (September–May): 30,000 XOF for new players, 25,000 XOF for returning ones.",
            "Two official training kits are required each season and billed separately at a total of 40,000 XOF.",
            "Withdrawal takes effect at the end of the current billing month; registration fees and subscriptions already paid aren't refunded for a voluntary withdrawal during the season.",
          ],
        },
        {
          heading: "Before your child can train",
          body: [
            "A parent or guardian must complete registration, agree to these terms, and provide any medical information we ask for (see our Child Safeguarding and Privacy Policy pages) before a child joins a training session.",
          ],
        },
        {
          heading: "Fees and kits",
          body: ["Fees and kit costs are as published above and on our pricing and FAQ pages. By enrolling, you agree to keep your account in good standing for the programme and billing cycle you choose."],
        },
        {
          heading: "Changing a child's programme or site",
          body: ["Moving a child to a different site or age programme is subject to space being available and academy approval."],
        },
        {
          heading: "Conduct",
          body: ["Players and parents are expected to treat coaches, staff, and other families with respect. The academy may end a child's enrollment for serious or repeated breaches of this."],
        },
        {
          heading: "Governing law and contact",
          body: [`These terms are governed by the laws of Côte d'Ivoire. Questions? Contact us at ${SAFEGUARDING_EMAIL} or via WhatsApp (${WHATSAPP_DISPLAY}).`],
        },
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
        {
          heading: "Avant que votre enfant puisse s'entraîner",
          body: [
            "Un parent ou tuteur doit avoir complété l'inscription, accepté ces conditions, et fourni les informations médicales demandées (voir nos pages Protection de l'enfant et Politique de confidentialité) avant qu'un enfant ne participe à une séance d'entraînement.",
          ],
        },
        {
          heading: "Frais et tenues",
          body: [
            "Les frais et le coût des tenues sont ceux publiés ci-dessus et sur nos pages tarifs et FAQ. En vous inscrivant, vous vous engagez à maintenir votre compte à jour pour le programme et la formule de facturation choisis.",
          ],
        },
        {
          heading: "Changement de programme ou de site",
          body: ["Le changement de site ou de programme d'âge d'un enfant est soumis à la disponibilité des places et à l'accord de l'académie."],
        },
        {
          heading: "Comportement",
          body: ["Les joueurs et les parents sont tenus de traiter les entraîneurs, le personnel et les autres familles avec respect. L'académie peut mettre fin à l'inscription d'un enfant en cas de manquement grave ou répété."],
        },
        {
          heading: "Droit applicable et contact",
          body: [`Ces conditions sont régies par le droit ivoirien. Une question ? Contactez-nous à ${SAFEGUARDING_EMAIL} ou via WhatsApp (${WHATSAPP_DISPLAY}).`],
        },
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
        {
          heading: "How to withdraw",
          body: [`Written notice can be given at any time by emailing ${SAFEGUARDING_EMAIL} or messaging us on WhatsApp (${WHATSAPP_DISPLAY}). We'll confirm receipt and the effective date.`],
        },
        {
          heading: "What's refunded",
          body: ["Registration fees and subscription payments already made are not refunded for a voluntary withdrawal during the season, as stated above."],
        },
        {
          heading: "Governing law and contact",
          body: [`This policy is governed by the laws of Côte d'Ivoire. Questions? Contact us at ${SAFEGUARDING_EMAIL} or via WhatsApp (${WHATSAPP_DISPLAY}).`],
        },
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
        {
          heading: "Comment se retirer",
          body: [`La notification écrite peut être envoyée à tout moment par e-mail à ${SAFEGUARDING_EMAIL} ou par WhatsApp (${WHATSAPP_DISPLAY}). Nous confirmerons la réception et la date d'effet.`],
        },
        {
          heading: "Ce qui est remboursé",
          body: ["Les frais d'inscription et cotisations déjà réglés ne sont pas remboursés en cas de retrait volontaire en cours de saison, comme indiqué ci-dessus."],
        },
        {
          heading: "Droit applicable et contact",
          body: [`Cette politique est régie par le droit ivoirien. Une question ? Contactez-nous à ${SAFEGUARDING_EMAIL} ou via WhatsApp (${WHATSAPP_DISPLAY}).`],
        },
      ],
    },
  },
  "child-safeguarding": {
    en: {
      title: "Child Safeguarding",
      intro: "How Bright Academy approaches child safety, supervision, and emergency response — full detail already published in the Safety & Wellbeing section of the homepage.",
      sections: [
        { heading: "During training", body: [SAFETY_DURING_TRAINING.en] },
        { heading: "Safety and incident management", body: [SAFETY_INCIDENT_MANAGEMENT.en] },
        { heading: "Medical information we collect", body: [MEDICAL_INFO_COLLECTED.en] },
        {
          heading: "Staff vetting and reporting a concern",
          body: [
            "All coaching and medical staff go through a formal background check before joining Bright Academy.",
            `If you have any concern about a child's safety or wellbeing, contact us straight away at ${SAFEGUARDING_EMAIL} or via WhatsApp (${WHATSAPP_DISPLAY}). We take every report seriously and follow up promptly.`,
          ],
        },
      ],
    },
    fr: {
      title: "Protection de l'enfant",
      intro: "L'approche de Bright Academy en matière de sécurité, d'encadrement et de réponse aux urgences — le détail complet est déjà publié dans la section Sécurité & bien-être de la page d'accueil.",
      sections: [
        { heading: "Pendant les entraînements", body: [SAFETY_DURING_TRAINING.fr] },
        { heading: "Sécurité et gestion des incidents", body: [SAFETY_INCIDENT_MANAGEMENT.fr] },
        { heading: "Informations médicales collectées", body: [MEDICAL_INFO_COLLECTED.fr] },
        {
          heading: "Vérification du personnel et signalement d'un problème",
          body: [
            "L'ensemble du personnel encadrant et médical fait l'objet d'une vérification de ses antécédents avant de rejoindre Bright Academy.",
            `Pour tout signalement lié à la sécurité ou au bien-être d'un enfant, contactez-nous immédiatement à ${SAFEGUARDING_EMAIL} ou via WhatsApp (${WHATSAPP_DISPLAY}). Chaque signalement est pris au sérieux et suivi rapidement.`,
          ],
        },
      ],
    },
  },
  "photo-video-consent": {
    en: {
      title: "Photo & Video Consent",
      intro:
        "Bright Academy photographs and films training sessions, matches, and events, and may use these for the website, gallery, and social media. This consent is separate from, and optional relative to, the consent required to register a child.",
      sections: [
        {
          heading: "What we ask",
          body: [
            "Consent is requested separately from required registration consent, and is not pre-checked by default. Parents can decline photo/video use without affecting their child's registration.",
          ],
        },
        {
          heading: "How images are used",
          body: [
            "Photos and videos may be used on the Bright Academy website, our public gallery, and our official social media channels (Facebook, Instagram, TikTok, YouTube) to show training, matches, and events. We do not sell or license them to third parties, and do not use them in paid advertising for other companies.",
          ],
        },
        {
          heading: "Withdrawing consent later",
          body: [`You can withdraw photo/video consent at any time from the Settings page of the parent portal, or by contacting us at ${SAFEGUARDING_EMAIL} or via WhatsApp (${WHATSAPP_DISPLAY}).`],
        },
      ],
    },
    fr: {
      title: "Consentement photo et vidéo",
      intro:
        "Bright Academy photographie et filme les entraînements, matchs et événements, et peut les utiliser pour le site, la galerie et les réseaux sociaux. Ce consentement est distinct du consentement requis pour inscrire un enfant, et optionnel.",
      sections: [
        {
          heading: "Ce que nous demandons",
          body: [
            "Le consentement est demandé séparément du consentement obligatoire à l'inscription, et n'est jamais pré-coché par défaut. Les parents peuvent refuser l'utilisation photo/vidéo sans que cela affecte l'inscription de leur enfant.",
          ],
        },
        {
          heading: "Utilisation des images",
          body: [
            "Les photos et vidéos peuvent être utilisées sur le site Bright Academy, notre galerie publique, et nos réseaux sociaux officiels (Facebook, Instagram, TikTok, YouTube) pour illustrer les entraînements, matchs et événements. Nous ne les vendons ni ne les cédons à des tiers, et ne les utilisons pas dans des publicités payantes pour d'autres entreprises.",
          ],
        },
        {
          heading: "Retrait du consentement",
          body: [`Vous pouvez retirer votre consentement photo/vidéo à tout moment depuis la page Paramètres du portail parent, ou en nous contactant à ${SAFEGUARDING_EMAIL} ou via WhatsApp (${WHATSAPP_DISPLAY}).`],
        },
      ],
    },
  },
};

export function getPolicyNotice(lang: Lang): string {
  return POLICY_NOTICE[lang];
}
