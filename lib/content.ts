// Site copy, EN/FR. Plain object, no i18n routing — a lightweight client-side
// language toggle (see components/LanguageProvider.tsx) is enough for a
// single-page marketing site with no auth/session state to persist across
// navigations, unlike the OS app's cookie-based lang persistence.
//
// Every number here is real, pulled from the live Bright Academy OS
// database on 2026-08-10 (602 active players, 5 active training sites, 7
// age programs) — nothing fabricated. Two things Patrick should fill in
// before this goes live: the real Facebook page URL (FOOTER.social.facebook
// below is a placeholder "#"), and, once the domain is restructured, the
// APP_URL the Enroll button points to.

// Where "Enroll Now" and every other app-handoff link goes. The domain
// restructuring moved the OS app to portal.brightacademyci.com and gave
// brightacademyci.com to this marketing site — this constant now points at
// its permanent home.
export const APP_URL = "https://portal.brightacademyci.com";
export const ENROLL_URL = `${APP_URL}/signup/parent`;
export const LOGIN_URL = `${APP_URL}/login`;

export const WHATSAPP_NUMBER = "0716478625";
export const WHATSAPP_DISPLAY = "+225 07 16 47 86 25";
export const WHATSAPP_LINK = "https://wa.me/2250716478625";

export type Lang = "en" | "fr";

export const content = {
  en: {
    nav: {
      about: "About",
      programs: "Programs",
      approach: "Our Approach",
      achievements: "Achievements",
      sites: "Our Sites",
      gallery: "Gallery",
      faq: "FAQ",
      contact: "Contact",
      login: "Parent / Staff Login",
      enroll: "Enroll Now",
    },
    hero: {
      eyebrow: "Abidjan & Grand-Bassam, Côte d'Ivoire",
      title: "Building Champions, On and Off the Pitch",
      subtitle: "Join us today and have a unique training experience.",
      ctaPrimary: "Enroll Your Child",
      ctaSecondary: "See Our Programs",
      stats: [
        { value: "600+", label: "Active players" },
        { value: "5", label: "Training sites" },
        { value: "7", label: "Age programs, 14 mo – 17 yrs" },
      ],
    },
    about: {
      eyebrow: "About Bright Academy",
      title: "More than a football club",
      body: [
        "Every Bright Academy session runs on real methodology, not improvisation — built on Horst Wein's Funino and Formino principles, proven play-based frameworks for developing young players.",
        "We teach through play: motor skills, technique, and social skills all build together, session after session. Our goal is simple — give every child the best possible start, a strong character, real confidence, and above all, fun at every training.",
      ],
      highlights: [
        { title: "Qualified coaches" },
        { title: "Sessions run in English and French" },
        { title: "Purely educational, play-based learning" },
      ],
      // Reserved for a future "Meet the Team" section — not built yet since
      // there's no bio/photo content for it. Once Patrick sends that, this
      // becomes a real link instead of dead content (currently unused by
      // About.tsx).
      cta: "Meet the coaching staff",
    },
    philosophy: {
      eyebrow: "Our Philosophy",
      quote: "Every child leaves our sessions with a smile.",
      subtitle:
        "Fun first, good sportsmanship, and a safe, inclusive environment — open to every child, regardless of gender or ability.",
    },
    approach: {
      eyebrow: "Our Approach",
      title: "A real curriculum, not just practice",
      subtitle:
        "Every session is built around four pillars, evaluated for every player at every age.",
      pillars: [
        {
          title: "Technical",
          body: "Ball control, passing, first touch, and finishing — the foundations drilled and re-drilled at every age.",
        },
        {
          title: "Game Intelligence",
          body: "Reading the game, decision-making under pressure, and understanding shape and space, not just kicking a ball.",
        },
        {
          title: "Mental",
          body: "Confidence, discipline, and resilience — built through structure, feedback, and real accountability.",
        },
        {
          title: "Physical",
          body: "Age-appropriate conditioning and health tracking, supervised by our own medical staff.",
        },
      ],
    },
    achievements: {
      eyebrow: "Our Achievements",
      title: "Winning on the world stage",
      subtitle: "Real results from real competition — our players have already brought trophies home from two continents.",
      trophies: [
        {
          tournament: "Surf Cup International 2025",
          location: "Morocco",
          results: ["U17 Champions", "U15 Runners-up"],
          image: "/images/achievements/morocco-surf-cup.jpg",
        },
        {
          tournament: "Abu Dhabi Cup 2025",
          location: "United Arab Emirates",
          results: ["U14 Champions"],
          image: "/images/achievements/abu-dhabi-u14.jpg",
        },
        {
          tournament: "Abu Dhabi Cup 2025",
          location: "United Arab Emirates",
          results: ["U16 Champions"],
          image: "/images/achievements/abu-dhabi-u16.jpg",
        },
      ],
    },
    programs: {
      eyebrow: "Programs",
      title: "A pathway for every age",
      subtitle: "Seven age categories, each with its own curriculum and coaching focus.",
      groups: [
        {
          tagline: "Learn Through Play",
          ageRange: "14 months – 5 years",
          categories: [
            { name: "Bright Babies", range: "14–23 months", note: "First contact with a ball, parent-and-child play." },
            { name: "Bright Kicks", range: "2–3 years", note: "Movement, coordination, and fun with the ball." },
            { name: "Bright Junior", range: "4–5 years", note: "Early technique, games-based learning." },
          ],
        },
        {
          tagline: "A Unique Training Experience",
          ageRange: "6 – 17 years",
          categories: [
            { name: "Bright Kids", range: "6–8 years", note: "Foundational technical skills, first real training rhythm." },
            { name: "Bright Youth", range: "9–11 years", note: "Technique sharpens, tactical basics introduced." },
            { name: "Bright Elite", range: "12–14 years", note: "Competitive structure, individual development plans." },
            { name: "Bright Pro", range: "15–17 years", note: "Full competitive pathway, match preparation." },
          ],
        },
      ],
    },
    sites: {
      eyebrow: "Our Sites",
      title: "Five training sites across Abidjan & Grand-Bassam",
      subtitle: "Find the location closest to your family.",
      directions: "Get Directions",
      list: [
        { name: "Angré Château", area: "Angré", lat: 5.409762, lng: -3.9800891, mapsUrl: "https://maps.app.goo.gl/FgCkyAng6u51p9F37" },
        { name: "Arena Bassam", area: "Mockey, Grand-Bassam", lat: 5.218917, lng: -3.750877, mapsUrl: "https://maps.app.goo.gl/urHCHE8xGc2puHqP6" },
        { name: "Complexe Sportif de Biafra", area: "Treichville", lat: 5.312437, lng: -4.00648, mapsUrl: "https://maps.app.goo.gl/sS5KBZsMiTbhFNJ19" },
        { name: "Elite Club", area: "Marcory", lat: 5.298617, lng: -3.988997, mapsUrl: "https://maps.app.goo.gl/AUKmNsCHxvoLGXJdA" },
        { name: "Palais des Sports de Treichville", area: "Treichville", lat: 5.298087, lng: -4.005465, mapsUrl: "https://maps.app.goo.gl/JBqzgTx7jr6RmZ1i9" },
      ],
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Life at Bright Academy",
    },
    // Every answer here restates a fact already published elsewhere on the
    // site (age range, sites, languages, curriculum, enrollment flow,
    // tournament results) — deliberately no pricing/trial/cancellation
    // questions yet, since we don't have confirmed answers for those and
    // this is a real parent-facing page, not a place to guess.
    faq: {
      eyebrow: "FAQ",
      title: "Questions parents ask us",
      subtitle: "Everything you need to know before you enroll.",
      items: [
        {
          q: "What ages do you accept?",
          a: "Children from 14 months to 17 years old, across seven age-specific programs — from Bright Babies (14–23 months) through Bright Pro (15–17 years).",
        },
        {
          q: "Where do you train?",
          a: "Five sites across Abidjan and Grand-Bassam. See the Our Sites section above to find the one closest to you.",
        },
        {
          q: "What languages are sessions run in?",
          a: "All sessions run in both English and French.",
        },
        {
          q: "What's your coaching approach?",
          a: "A real curriculum, not improvised drills — built on Horst Wein's Funino and Formino frameworks, with every session evaluated across four pillars: technical, game intelligence, mental, and physical.",
        },
        {
          q: "How do I enroll my child?",
          a: "Create a parent account through our portal, register your child, and choose their training site — no invite link needed. It takes a few minutes.",
        },
        {
          q: "Do your players compete?",
          a: "Yes — Bright Academy players have already won titles at international tournaments, including the Surf Cup International in Morocco and the Abu Dhabi Cup.",
        },
      ],
    },
    chat: {
      prefill: "Hi! I'd like to know more about enrolling my child at Bright Academy.",
      label: "Chat on WhatsApp",
    },
    enrollCta: {
      title: "Ready to get your child started?",
      subtitle:
        "Registration takes a few minutes. Create a parent account, register your child, and pick their site — no invite link needed.",
      cta: "Enroll Now",
    },
    footer: {
      tagline: "A real football education for every age, across Abidjan & Grand-Bassam.",
      quickLinks: "Quick Links",
      contact: "Contact",
      whatsapp: "WhatsApp",
      social: "Follow Us",
      parentLogin: "Already a parent? Sign in",
      copyright: `© ${new Date().getFullYear()} Bright Academy. All rights reserved.`,
    },
  },
  fr: {
    nav: {
      about: "À propos",
      programs: "Programmes",
      approach: "Notre approche",
      achievements: "Palmarès",
      sites: "Nos sites",
      gallery: "Galerie",
      faq: "FAQ",
      contact: "Contact",
      login: "Connexion parent / staff",
      enroll: "Inscrire mon enfant",
    },
    hero: {
      eyebrow: "Abidjan & Grand-Bassam, Côte d'Ivoire",
      title: "Former des champions, sur et en dehors du terrain",
      subtitle: "Rejoignez-nous dès aujourd'hui et vivez une expérience d'entraînement unique.",
      ctaPrimary: "Inscrire mon enfant",
      ctaSecondary: "Voir nos programmes",
      stats: [
        { value: "600+", label: "Joueurs actifs" },
        { value: "5", label: "Sites d'entraînement" },
        { value: "7", label: "Programmes, 14 mois – 17 ans" },
      ],
    },
    about: {
      eyebrow: "À propos de Bright Academy",
      title: "Bien plus qu'un club de football",
      body: [
        "Chaque séance à Bright Academy repose sur une vraie méthodologie, pas sur l'improvisation — fondée sur les principes Funino et Formino de Horst Wein, des méthodes éprouvées et fondées sur le jeu pour former les jeunes joueurs.",
        "Nous misons sur l'apprentissage par le jeu : motricité, technique et compétences sociales se construisent ensemble, séance après séance. Notre objectif est simple — offrir à chaque enfant les meilleures bases possibles, un caractère fort, une vraie confiance en soi, et surtout, du plaisir à chaque entraînement.",
      ],
      highlights: [
        { title: "Des coachs qualifiés" },
        { title: "Sessions en anglais et en français" },
        { title: "Un apprentissage par le jeu, purement éducatif" },
      ],
      cta: "Découvrir le staff technique",
    },
    philosophy: {
      eyebrow: "Notre philosophie",
      quote: "Chaque enfant termine nos séances avec le sourire.",
      subtitle:
        "Le plaisir avant tout, l'esprit sportif, et un environnement sûr et inclusif — ouvert à tous les enfants, quels que soient leur sexe ou leurs capacités.",
    },
    approach: {
      eyebrow: "Notre approche",
      title: "Un vrai curriculum, pas juste des entraînements",
      subtitle: "Chaque séance repose sur quatre piliers, évalués pour chaque joueur, à chaque âge.",
      pillars: [
        {
          title: "Technique",
          body: "Contrôle de balle, passe, première touche et finition — les fondamentaux travaillés et retravaillés à chaque âge.",
        },
        {
          title: "Intelligence de jeu",
          body: "Lire le jeu, prendre des décisions sous pression, comprendre les espaces — pas juste taper dans un ballon.",
        },
        {
          title: "Mental",
          body: "Confiance, discipline et résilience — construites par la structure, le retour d'expérience et une vraie responsabilisation.",
        },
        {
          title: "Physique",
          body: "Préparation physique adaptée à l'âge et suivi de santé, encadrés par notre propre personnel médical.",
        },
      ],
    },
    achievements: {
      eyebrow: "Nos distinctions",
      title: "Des victoires sur la scène internationale",
      subtitle: "De vrais résultats face à une vraie compétition — nos joueurs ont déjà ramené des trophées de deux continents.",
      trophies: [
        {
          tournament: "Surf Cup International 2025",
          location: "Maroc",
          results: ["Champions U17", "Vice-champions U15"],
          image: "/images/achievements/morocco-surf-cup.jpg",
        },
        {
          tournament: "Abu Dhabi Cup 2025",
          location: "Émirats arabes unis",
          results: ["Champions U14"],
          image: "/images/achievements/abu-dhabi-u14.jpg",
        },
        {
          tournament: "Abu Dhabi Cup 2025",
          location: "Émirats arabes unis",
          results: ["Champions U16"],
          image: "/images/achievements/abu-dhabi-u16.jpg",
        },
      ],
    },
    programs: {
      eyebrow: "Programmes",
      title: "Un parcours pour chaque âge",
      subtitle: "Sept catégories d'âge, chacune avec son propre curriculum et ses objectifs.",
      groups: [
        {
          tagline: "Apprendre en jouant",
          ageRange: "14 mois – 5 ans",
          categories: [
            { name: "Bright Babies", range: "14–23 mois", note: "Premier contact avec le ballon, jeu parent-enfant." },
            { name: "Bright Kicks", range: "2–3 ans", note: "Mouvement, coordination et plaisir avec le ballon." },
            { name: "Bright Junior", range: "4–5 ans", note: "Technique initiale, apprentissage par le jeu." },
          ],
        },
        {
          tagline: "Une expérience d'entraînement unique",
          ageRange: "6 – 17 ans",
          categories: [
            { name: "Bright Kids", range: "6–8 ans", note: "Bases techniques, premier vrai rythme d'entraînement." },
            { name: "Bright Youth", range: "9–11 ans", note: "Affinement technique, bases tactiques introduites." },
            { name: "Bright Elite", range: "12–14 ans", note: "Structure compétitive, plans de développement individuels." },
            { name: "Bright Pro", range: "15–17 ans", note: "Parcours compétitif complet, préparation aux matchs." },
          ],
        },
      ],
    },
    sites: {
      eyebrow: "Nos sites",
      title: "Cinq sites d'entraînement à Abidjan et Grand-Bassam",
      subtitle: "Trouvez le site le plus proche de chez vous.",
      directions: "Itinéraire",
      list: [
        { name: "Angré Château", area: "Angré", lat: 5.409762, lng: -3.9800891, mapsUrl: "https://maps.app.goo.gl/FgCkyAng6u51p9F37" },
        { name: "Arena Bassam", area: "Mockey, Grand-Bassam", lat: 5.218917, lng: -3.750877, mapsUrl: "https://maps.app.goo.gl/urHCHE8xGc2puHqP6" },
        { name: "Complexe Sportif de Biafra", area: "Treichville", lat: 5.312437, lng: -4.00648, mapsUrl: "https://maps.app.goo.gl/sS5KBZsMiTbhFNJ19" },
        { name: "Elite Club", area: "Marcory", lat: 5.298617, lng: -3.988997, mapsUrl: "https://maps.app.goo.gl/AUKmNsCHxvoLGXJdA" },
        { name: "Palais des Sports de Treichville", area: "Treichville", lat: 5.298087, lng: -4.005465, mapsUrl: "https://maps.app.goo.gl/JBqzgTx7jr6RmZ1i9" },
      ],
    },
    gallery: {
      eyebrow: "Galerie",
      title: "La vie à Bright Academy",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Les questions que les parents nous posent",
      subtitle: "Tout ce qu'il faut savoir avant de vous inscrire.",
      items: [
        {
          q: "Quel âge faut-il avoir ?",
          a: "Nous accueillons les enfants de 14 mois à 17 ans, à travers sept programmes adaptés à chaque âge — de Bright Babies (14–23 mois) à Bright Pro (15–17 ans).",
        },
        {
          q: "Où se déroulent les entraînements ?",
          a: "Sur cinq sites à Abidjan et Grand-Bassam. Consultez la section Nos sites ci-dessus pour trouver le plus proche de chez vous.",
        },
        {
          q: "Dans quelles langues sont données les séances ?",
          a: "Toutes les séances sont données en anglais et en français.",
        },
        {
          q: "Quelle est votre approche pédagogique ?",
          a: "Un vrai curriculum, pas des exercices improvisés — fondé sur les méthodes Funino et Formino de Horst Wein, avec chaque séance évaluée selon quatre piliers : technique, intelligence de jeu, mental et physique.",
        },
        {
          q: "Comment inscrire mon enfant ?",
          a: "Créez un compte parent sur notre portail, inscrivez votre enfant et choisissez son site d'entraînement — aucun lien d'invitation nécessaire. Cela prend quelques minutes.",
        },
        {
          q: "Vos joueurs participent-ils à des compétitions ?",
          a: "Oui — les joueurs de Bright Academy ont déjà remporté des titres lors de tournois internationaux, dont la Surf Cup International au Maroc et l'Abu Dhabi Cup.",
        },
      ],
    },
    chat: {
      prefill: "Bonjour ! J'aimerais en savoir plus sur l'inscription de mon enfant à Bright Academy.",
      label: "Discuter sur WhatsApp",
    },
    enrollCta: {
      title: "Prêt à inscrire votre enfant ?",
      subtitle:
        "L'inscription prend quelques minutes. Créez un compte parent, inscrivez votre enfant et choisissez son site — aucun lien d'invitation nécessaire.",
      cta: "Inscrire mon enfant",
    },
    footer: {
      tagline: "Une vraie formation footballistique pour chaque âge, à Abidjan et Grand-Bassam.",
      quickLinks: "Liens rapides",
      contact: "Contact",
      whatsapp: "WhatsApp",
      social: "Suivez-nous",
      parentLogin: "Déjà parent ? Se connecter",
      copyright: `© ${new Date().getFullYear()} Bright Academy. Tous droits réservés.`,
    },
  },
};

// Deliberately not `as const` — both language blocks above are structurally
// identical but their string literal values differ per-key, which `as const`
// would turn into incompatible literal types (content.en.nav.about would be
// typed "About", content.fr's "À propos" wouldn't satisfy it). Widening to
// plain `string` here is what lets LanguageProvider's `t` type accept either
// language's block.
export type ContentShape = (typeof content)["en"];

export const FOOTER_SOCIAL = {
  facebook: "https://www.facebook.com/share/1Efa7QcKwG/?mibextid=wwXIfr",
  instagram: "https://www.instagram.com/brightacademy_ci?igsh=b2ZrNXR0ZmM1czI=",
  tiktok: "https://www.tiktok.com/@brightacademy.ci?_r=1&_t=ZS-98o5zW2HfTF",
  whatsapp: WHATSAPP_LINK,
};
