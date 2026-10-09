// Copy and data for the "Prenez votre place" page (campaign CHEZ NOUS).
//
// Source: "Bright Academy FC — Campagne CHEZ NOUS" (working document, chapters
// 01, 04 and 07) and the nine offer posters Patrick supplied on 2026-10-09.
// Where the document text and a poster differ (offer headlines for RSE,
// technical and performance), the poster wording is used because it is the
// later, finished artwork.
//
// Rules this file must keep (document chapters 00, 04 and 07, and the
// overnight mission rules):
//   - FCFA amounts are always "à partir de" and "hors taxes"; contreparties are
//     indicative and defined in the partnership agreement.
//   - No offer includes kit-supplier rights (reserved to the Tielo Sport SAS /
//     PUMA agreement).
//   - Nothing says a company is already a partner, the pitch is finished, or
//     promotion to the 3rd division is acquired.
//   - No collected amount, donor, counter or testimonial is shown. The
//     community contribution is disabled until a payment provider and legal
//     structure are validated.
//   - The sporting status lives in ONE place (SPORT_STATUS). Patrick's mission
//     brief and the campaign document disagree on the 2026-27 division; the
//     wording below is limited to what both accept.

import type { Lang } from "@/lib/content";

export const CHEZ_NOUS_PATH = "/prenez-votre-place";
export const CHEZ_NOUS_PHONE_DISPLAY = "07 99 84 47 58";
export const CHEZ_NOUS_PHONE_TEL = "+2250799844758";
export const CHEZ_NOUS_EMAIL = "brightacademyci@gmail.com";

export type OfferId =
  | "principal"
  | "sponsor-maillot"
  | "officiel"
  | "infrastructure"
  | "technique"
  | "performance"
  | "rse"
  | "match"
  | "mvp";

export interface Offer {
  id: OfferId;
  image: string;
  /** Amount in FCFA, no spaces. */
  amountXof: number;
  unit: { fr: string; en: string };
  name: { fr: string; en: string };
  headline: { fr: string; en: string };
  idea: { fr: string; en: string };
  perks: { fr: string; en: string };
}

export const OFFERS: Offer[] = [
  {
    id: "principal",
    image: "/images/chez-nous/offer-partenaire-principal.jpg",
    amountXof: 12_000_000,
    unit: { fr: "par saison", en: "per season" },
    name: { fr: "Partenaire principal", en: "Main partner" },
    headline: { fr: "La face avant est libre.", en: "The shirt front is free." },
    idea: {
      fr: "Une seule entreprise portera la face avant du maillot de Bright Academy FC en 2026–2027.",
      en: "A single company will carry the front of the Bright Academy FC shirt in 2026–2027.",
    },
    perks: {
      fr: "Face avant, nom associé au club, présence sur nos supports, journées partenaires.",
      en: "Shirt front, name associated with the club, presence on our materials, partner days.",
    },
  },
  {
    id: "sponsor-maillot",
    image: "/images/chez-nous/offer-sponsor-maillot.jpg",
    amountXof: 4_000_000,
    unit: { fr: "par saison", en: "per season" },
    name: { fr: "Sponsor maillot", en: "Shirt sponsor" },
    headline: { fr: "La manche. Le dos. Votre nom ?", en: "The sleeve. The back. Your name?" },
    idea: {
      fr: "Deux emplacements : la manche, le dos au-dessus du numéro.",
      en: "Two placements: the sleeve and the back above the number.",
    },
    perks: { fr: "Contenus de jour de match et invitations.", en: "Match-day content and invitations." },
  },
  {
    id: "officiel",
    image: "/images/chez-nous/offer-partenaire-officiel.jpg",
    amountXof: 3_000_000,
    unit: { fr: "par saison", en: "per season" },
    name: { fr: "Partenaire officiel", en: "Official partner" },
    headline: { fr: "Rentrez dans la photo d'équipe.", en: "Step into the team photo." },
    idea: {
      fr: "Dos bas ou short, et le titre de partenaire officiel.",
      en: "Lower back or shorts, and the official partner title.",
    },
    perks: {
      fr: "Présence sur la photo d'équipe et sur la page partenaires du site.",
      en: "Presence in the team photo and on the website's partners page.",
    },
  },
  {
    id: "infrastructure",
    image: "/images/chez-nous/offer-infrastructure.jpg",
    amountXof: 2_000_000,
    unit: { fr: "par lot, sur devis", en: "per lot, on quote" },
    name: { fr: "Partenaire infrastructure", en: "Infrastructure partner" },
    headline: { fr: "Ce lot n'a pas encore de nom.", en: "This lot has no name yet." },
    idea: {
      fr: "Topographie, nivellement, clôture, pelouse, irrigation, vestiaires : chaque lot peut porter un nom.",
      en: "Surveying, levelling, fencing, turf, irrigation, changing rooms: each lot can carry a name.",
    },
    perks: {
      fr: "Plaque sur site, bilan photo avant/après, contenus de chantier, invitation à l'inauguration.",
      en: "On-site plaque, before/after photo review, works content, invitation to the opening.",
    },
  },
  {
    id: "technique",
    image: "/images/chez-nous/offer-partenaire-technique.jpg",
    amountXof: 2_000_000,
    unit: { fr: "de valeur, en nature", en: "in value, in kind" },
    name: { fr: "Partenaire technique", en: "Technical partner" },
    headline: { fr: "Votre savoir-faire compte.", en: "Your know-how counts." },
    idea: {
      fr: "Produits ou services dans votre catégorie, hors équipement sportif.",
      en: "Products or services in your category, excluding sports equipment.",
    },
    perks: {
      fr: "Mention « fournisseur officiel » dans votre catégorie.",
      en: "“Official supplier” mention in your category.",
    },
  },
  {
    id: "performance",
    image: "/images/chez-nous/offer-partenaire-performance.jpg",
    amountXof: 3_000_000,
    unit: { fr: "par saison", en: "per season" },
    name: { fr: "Partenaire performance", en: "Performance partner" },
    headline: { fr: "La performance a un nom.", en: "Performance has a name." },
    idea: { fr: "Physique, médical, nutrition.", en: "Physical, medical, nutrition." },
    perks: {
      fr: "Visibilité sur les supports d'entraînement et contenus coulisses.",
      en: "Visibility on training materials and behind-the-scenes content.",
    },
  },
  {
    id: "rse",
    image: "/images/chez-nous/offer-partenaire-rse.jpg",
    amountXof: 5_000_000,
    unit: { fr: "par saison", en: "per season" },
    name: { fr: "Partenaire RSE", en: "CSR partner" },
    headline: { fr: "Un joueur. Une famille. Une génération.", en: "One player. One family. One generation." },
    idea: {
      fr: "Un programme jeunesse identifié, des actions avec vos collaborateurs, un bilan.",
      en: "An identified youth programme, activities with your staff, a review.",
    },
    perks: { fr: "Bilan de fin de saison.", en: "End-of-season review." },
  },
  {
    id: "match",
    image: "/images/chez-nous/offer-match-partner.jpg",
    amountXof: 300_000,
    unit: { fr: "par match", en: "per match" },
    name: { fr: "Match Partner", en: "Match Partner" },
    headline: { fr: "Ce match est présenté par…", en: "This match is presented by…" },
    idea: { fr: "Votre marque associée à une rencontre.", en: "Your brand associated with a match." },
    perks: { fr: "Annonce, contenus du match, invitations.", en: "Announcement, match content, invitations." },
  },
  {
    id: "mvp",
    image: "/images/chez-nous/offer-mvp-partner.jpg",
    amountXof: 1_500_000,
    unit: { fr: "par saison", en: "per season" },
    name: { fr: "MVP Partner", en: "MVP Partner" },
    headline: { fr: "Le meilleur joueur. Votre nom.", en: "The best player. Your name." },
    idea: {
      fr: "Le trophée du joueur du match à votre nom, toute la saison.",
      en: "The player-of-the-match trophy in your name, all season.",
    },
    perks: { fr: "Remise, photo et publication à chaque match.", en: "Presentation, photo and post after each match." },
  },
];

export function formatXof(n: number, lang: Lang): string {
  // Fixed grouping with a non-breaking space so server and client render identically.
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const IN_KIND_TYPES: { value: string; fr: string; en: string }[] = [
  { value: "materials", fr: "Matériaux", en: "Materials" },
  { value: "works", fr: "Travaux", en: "Works" },
  { value: "transport", fr: "Transport", en: "Transport" },
  { value: "services", fr: "Services", en: "Services" },
  { value: "equipment", fr: "Équipements ou produits", en: "Equipment or products" },
  { value: "other", fr: "Autre", en: "Other" },
];

// The ONE place the sporting status is written. See the note at the top.
const SPORT_STATUS = {
  fr: {
    achieved: "Champions de District 2025–2026, montée en Division Régionale.",
    goal: "Objectif : recevoir nos matchs à Attinguié et accéder à la 3e division.",
  },
  en: {
    achieved: "District champions 2025–2026, promoted to the Regional Division.",
    goal: "Goal: host our matches in Attinguié and reach the 3rd division.",
  },
};

export const copy = {
  fr: {
    meta: {
      title: "Prenez votre place — Bright Academy FC",
      description:
        "Le club du village doit jouer chez lui. Entreprises : découvrez les offres de partenariat. Communauté : choisissez votre geste.",
    },
    hero: {
      eyebrow: "Attinguié",
      title: "Le club du village doit jouer chez lui",
      sub: "Le terrain se construit. La place est libre.",
      ctaCompanies: "Entreprises",
      ctaCommunity: "Communauté",
    },
    project: {
      eyebrow: "Le projet",
      title: "Un club né à Attinguié, qui n'a pas encore de maison",
      intro:
        "Bright Academy forme des centaines de jeunes, a déjà gagné et a déjà vu un joueur partir à l'étranger. Mais le club du village ne joue pas encore au village.",
      sport: SPORT_STATUS.fr,
      siteTitle: "Le terrain d'Attinguié",
      siteFacts: "Terrain de 100 m × 60 m, environ 1,11 hectare.",
      stages: [
        { status: "done", label: "Réalisé", items: ["Décapage du terrain"] },
        {
          status: "next",
          label: "À venir",
          items: ["Topographie et bornage", "Nivellement", "Retrait des anciens poteaux", "Clôture"],
        },
        { status: "later", label: "Ensuite", items: ["Pelouse", "Irrigation", "Buts", "Vestiaires"] },
      ],
      money:
        "Budget global du projet : 126 millions de FCFA, à engager par phases. Premiers lots identifiés : environ 25 millions de FCFA, sur devis.",
      moneyNote:
        "Ce sont des budgets prévisionnels, pas des fonds collectés. Aucun lot n'est présenté ici comme financé.",
    },
    companies: {
      eyebrow: "Entreprises",
      title: "La place vide : prenez la vôtre",
      intro:
        "Neuf façons de s'associer à Bright Academy FC en 2026–2027, de 300 000 FCFA HT par match jusqu'au partenariat principal.",
      from: "À partir de",
      currency: "FCFA",
      ht: "HT",
      perksLabel: "Contreparties indicatives",
      cta: "Demander un rendez-vous",
      mandatory:
        "Montants hors taxes, à partir de. Contreparties indicatives, définies dans la convention de partenariat.",
      kit:
        "Aucune offre ne comprend de droit d'équipementier : ces droits sont réservés à l'accord avec Tielo Sport SAS.",
      notPartner: "Aucune entreprise n'est présentée ici comme partenaire : un partenariat n'existe qu'après signature d'une convention.",
    },
    meeting: {
      title: "Demande de rendez-vous",
      lead: "Donnez-nous trente minutes. Nous vous montrerons où votre marque peut prendre place.",
      contactName: "Nom et prénom",
      companyName: "Entreprise",
      jobTitle: "Fonction",
      email: "E-mail",
      phone: "Téléphone",
      offers: "Offre(s) qui vous intéressent",
      message: "Message",
      consent:
        "J'accepte que Bright Academy FC conserve ces informations pour me recontacter au sujet d'un partenariat. Je peux demander leur suppression à tout moment.",
      submit: "Envoyer la demande",
    },
    inKind: {
      title: "Contribution en nature",
      lead: "Matériaux, travaux, transport, services : une contribution en nature est un partenariat à part entière.",
      type: "Type de contribution",
      typePlaceholder: "Choisir",
      value: "Valeur estimée (FCFA, facultatif)",
      deadline: "Délai envisagé (facultatif)",
      contactName: "Nom et prénom",
      companyName: "Entreprise",
      email: "E-mail",
      phone: "Téléphone",
      message: "Détail de la contribution",
      consent:
        "J'accepte que Bright Academy FC conserve ces informations pour me recontacter au sujet de cette contribution. Je peux demander leur suppression à tout moment.",
      submit: "Proposer une contribution",
    },
    community: {
      eyebrow: "Communauté · Sans maillot",
      title: "Tu n'as pas besoin de porter le maillot pour faire partie de l'équipe",
      intro:
        "Partage. Présente-nous une entreprise. Choisis ton action. Aucun de ces gestes n'est obligatoire, et aucune contribution financière n'est demandée aux joueurs ni à leurs familles.",
      gestures: [
        { title: "Partager", body: "Transférer le film ou le visuel du jour à quelqu'un d'Attinguié ou qui y a grandi." },
        { title: "Présenter une entreprise", body: "Nom de l'entreprise, secteur, votre lien avec elle." },
        { title: "Transmettre un contact", body: "Uniquement avec l'accord de la personne concernée." },
        { title: "Choisir une action", body: "Parmi les actions que le club affichera ici une fois validées." },
        { title: "Contribuer, si tu le souhaites", body: "Selon des modalités publiées et vérifiées, avec reçu. Pas encore ouvert." },
      ],
    },
    actions: {
      title: "Actions à soutenir",
      empty:
        "Aucune action n'est ouverte à contribution pour le moment. Chaque action sera publiée ici avec son objectif, son budget et l'usage prévu, une fois validée par le club.",
    },
    contribute: {
      title: "Contribuer",
      button: "Pas encore disponible",
      body:
        "Les moyens de paiement ne sont pas configurés : aucune contribution ne peut être versée depuis ce site pour le moment. Ne transmettez aucun numéro de compte ou de mobile money en réponse à un message prétendant venir du club.",
    },
    referral: {
      title: "J'ai une entreprise à vous présenter",
      lead: "Un contact que vous connaissez pourrait s'associer au projet ? Dites-nous qui. Nous le contacterons de votre part, avec respect.",
      contactName: "Votre nom et prénom",
      email: "Votre e-mail",
      phone: "Votre téléphone",
      companyName: "Entreprise à présenter",
      sector: "Secteur",
      relationship: "Votre lien avec cette entreprise",
      message: "Message",
      referredConsent:
        "La personne dont je transmets le contact est d'accord pour être contactée par Bright Academy FC.",
      consent:
        "J'accepte que Bright Academy FC conserve ces informations pour donner suite à cette présentation. Je peux demander leur suppression à tout moment.",
      submit: "Envoyer la présentation",
    },
    transparency: {
      title: "Transparence",
      body:
        "Le bilan public (sommes reçues, affectées, dépensées, justificatifs, date de mise à jour) sera publié ici dès l'ouverture d'une action. Il ne contiendra que des montants vérifiés.",
    },
    contact: {
      title: "Contact",
      body: "Une question avant de remplir un formulaire ?",
    },
    form: {
      sending: "Envoi en cours…",
      required: "Merci de remplir les champs obligatoires et d'accepter la conservation de vos informations.",
      success: "Votre demande a bien été enregistrée par Bright Academy FC. Nous reviendrons vers vous.",
      error:
        "Votre demande n'a pas pu être enregistrée. Aucune information n'a été conservée. Merci de réessayer ou de nous écrire directement.",
      writeUs: "Nous écrire",
      call: "Appeler",
    },
  },
  en: {
    meta: {
      title: "Take your place — Bright Academy FC",
      description:
        "The village club must play at home. Companies: discover the partnership offers. Community: choose your action.",
    },
    hero: {
      eyebrow: "Attinguié",
      title: "The village club must play at home",
      sub: "The pitch is being built. The place is free.",
      ctaCompanies: "Companies",
      ctaCommunity: "Community",
    },
    project: {
      eyebrow: "The project",
      title: "A club born in Attinguié that has no home yet",
      intro:
        "Bright Academy trains hundreds of young players, has already won, and has already seen a player move abroad. But the village club does not yet play in the village.",
      sport: SPORT_STATUS.en,
      siteTitle: "The Attinguié pitch",
      siteFacts: "A 100 m × 60 m pitch, about 1.11 hectares.",
      stages: [
        { status: "done", label: "Done", items: ["Site clearing"] },
        {
          status: "next",
          label: "Coming up",
          items: ["Surveying and boundary marking", "Levelling", "Removal of the old goalposts", "Fencing"],
        },
        { status: "later", label: "Then", items: ["Turf", "Irrigation", "Goals", "Changing rooms"] },
      ],
      money:
        "Overall project budget: 126 million FCFA, to be committed in phases. First identified lots: about 25 million FCFA, on quote.",
      moneyNote: "These are planned budgets, not funds raised. No lot is presented here as funded.",
    },
    companies: {
      eyebrow: "Companies",
      title: "The empty place: take yours",
      intro:
        "Nine ways to join Bright Academy FC in 2026–2027, from 300,000 FCFA excl. tax per match up to the main partnership.",
      from: "From",
      currency: "FCFA",
      ht: "excl. tax",
      perksLabel: "Indicative benefits",
      cta: "Request a meeting",
      mandatory:
        "Amounts exclude tax and are starting prices. Benefits are indicative and defined in the partnership agreement.",
      kit: "No offer includes kit-supplier rights: these rights are reserved to the agreement with Tielo Sport SAS.",
      notPartner: "No company is presented here as a partner: a partnership exists only once an agreement is signed.",
    },
    meeting: {
      title: "Meeting request",
      lead: "Give us thirty minutes. We will show you where your brand can take its place.",
      contactName: "Full name",
      companyName: "Company",
      jobTitle: "Job title",
      email: "Email",
      phone: "Phone",
      offers: "Offer(s) you are interested in",
      message: "Message",
      consent:
        "I agree that Bright Academy FC keeps this information to contact me about a partnership. I can ask for its deletion at any time.",
      submit: "Send the request",
    },
    inKind: {
      title: "In-kind contribution",
      lead: "Materials, works, transport, services: an in-kind contribution is a partnership in its own right.",
      type: "Type of contribution",
      typePlaceholder: "Choose",
      value: "Estimated value (FCFA, optional)",
      deadline: "Expected timing (optional)",
      contactName: "Full name",
      companyName: "Company",
      email: "Email",
      phone: "Phone",
      message: "Details of the contribution",
      consent:
        "I agree that Bright Academy FC keeps this information to contact me about this contribution. I can ask for its deletion at any time.",
      submit: "Offer a contribution",
    },
    community: {
      eyebrow: "Community · Without the shirt",
      title: "You don't need to wear the shirt to be part of the team",
      intro:
        "Share. Introduce us to a company. Choose your action. None of these is compulsory, and no financial contribution is asked of players or their families.",
      gestures: [
        { title: "Share", body: "Forward the film or the visual of the day to someone from Attinguié or who grew up there." },
        { title: "Introduce a company", body: "Company name, sector, your link with it." },
        { title: "Pass on a contact", body: "Only with the agreement of the person concerned." },
        { title: "Choose an action", body: "From the actions the club will display here once validated." },
        { title: "Contribute, if you wish", body: "Under published and verified terms, with a receipt. Not open yet." },
      ],
    },
    actions: {
      title: "Actions to support",
      empty:
        "No action is open for contributions at the moment. Each action will be published here with its goal, budget and planned use once validated by the club.",
    },
    contribute: {
      title: "Contribute",
      button: "Not available yet",
      body:
        "Payment methods are not configured: no contribution can be paid from this site for now. Do not send any account or mobile money number in reply to a message claiming to come from the club.",
    },
    referral: {
      title: "I have a company to introduce",
      lead: "Someone you know could join the project? Tell us who. We will contact them on your behalf, respectfully.",
      contactName: "Your full name",
      email: "Your email",
      phone: "Your phone",
      companyName: "Company to introduce",
      sector: "Sector",
      relationship: "Your link with this company",
      message: "Message",
      referredConsent: "The person whose contact I am passing on agrees to be contacted by Bright Academy FC.",
      consent:
        "I agree that Bright Academy FC keeps this information to follow up on this introduction. I can ask for its deletion at any time.",
      submit: "Send the introduction",
    },
    transparency: {
      title: "Transparency",
      body:
        "The public review (amounts received, allocated, spent, supporting documents, update date) will be published here as soon as an action opens. It will only contain verified amounts.",
    },
    contact: {
      title: "Contact",
      body: "A question before filling in a form?",
    },
    form: {
      sending: "Sending…",
      required: "Please fill in the required fields and accept the retention of your information.",
      success: "Your request has been recorded by Bright Academy FC. We will get back to you.",
      error:
        "Your request could not be recorded. No information was kept. Please try again or write to us directly.",
      writeUs: "Write to us",
      call: "Call",
    },
  },
} as const;
