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

// CENTRALISED 2026-08-16 (audit-corrections pass, Priority 1) — this is
// now the single source of truth for the marketing site's own canonical
// host, used by layout.tsx (metadataBase/canonical/OG/Twitter/structured
// data), sitemap.ts, robots.ts, and Sites.tsx's SportsActivityLocation
// structured data. Previously each of those files had its own hardcoded
// copy of the domain, and several still pointed at the apex
// (brightacademyci.com) even after the apex was confirmed to be a
// redirect-only host (see layout.tsx's git history / CLAUDE.md 2026-08-14
// entry) — a self-contradicting canonical signal that's the most likely
// reason Google kept showing a stale cached title/description despite
// repeated "Request Indexing" attempts. www is the real, live,
// already-indexed domain (Vercel's platform-level domain config redirects
// the apex to it) — every canonical/OG/structured-data URL in this repo
// must point here, not at the apex.
export const SITE_URL = "https://www.brightacademyci.com";

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

// Published contact address for legal/policy pages (privacy rights
// requests, safeguarding-concern reports) — Patrick's confirmed answer,
// 2026-08-17, when the legal pages moved from placeholder drafts to real
// content (see lib/legal-content.ts). Kept here rather than duplicated in
// that file, same centralization convention as WHATSAPP_DISPLAY above.
export const SAFEGUARDING_EMAIL = "brightacademyci@gmail.com";

// Corporate-partnership contact — the address the sponsorship dossier
// itself names for "Patrick Asseu — Président-Fondateur" (added 2026-08-30
// alongside the new /partners page). Deliberately not SAFEGUARDING_EMAIL
// above — that's the club's general/safeguarding inbox, not the founder's
// own address the dossier points partnership inquiries to.
export const PARTNERSHIP_EMAIL = "patrickasaiah.asseu@gmail.com";

// The 2026–2027 partnership dossier (French PDF) offered for download on
// /partners. NOTE: the PDF itself lists indicative FCFA amounts, whereas the
// web page deliberately shows none — keep that in mind before linking it
// publicly (see the partners dict comment).
export const PARTNERSHIP_DOSSIER_URL = "/documents/Bright_Academy_FC_Dossier_Partenariat_2026-2027.pdf";

export type Lang = "en" | "fr";

// CORRECTED AGAIN 2026-08-15 — Patrick sent the runners-up team photo and
// confirmed U15 when asked directly (the Aug 14 confirmation of "U14" above
// turned out to be wrong; re-confirmed against this same back-and-forth
// before changing it again). Centralized into this one constant so the
// whole site only ever needs this single edit.
export const SURF_CUP_2025_RUNNERS_UP_CATEGORY = "U15";

export const content = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      aboutUs: "About Us",
      programs: "Programs",
      approach: "Our Approach",
      achievements: "Achievements",
      sites: "Our Sites",
      gallery: "Gallery",
      ourCoaches: "Our Coaches",
      news: "News",
      careers: "Careers",
      firstTeam: "First Team",
      faq: "FAQ",
      // "contact" (nav) removed 2026-08-29 — audit-confirmed unused: no
      // header/footer component ever referenced t.nav.contact, and there's
      // no #contact section on the page for it to link to. Same removal
      // for footer.contact just below.
      // Was "Parent / Staff Login" — dropped "/ Staff" 2026-08-13, Patrick's
      // explicit instruction: staff shouldn't be advertised a login path on
      // the public site at all, they get their own direct access link
      // instead. LOGIN_URL itself is unchanged (same portal, same page) —
      // this is copy-only, not an access change.
      login: "Parent Login",
      enroll: "Enroll Now",
      // Added 2026-08-30 for the new corporate-partnership page — kept out
      // of the primary nav for the same width reason careers was moved to
      // the footer (see Header.tsx's own comment on that), not because
      // this page matters less.
      partners: "Partner With Us",
      // Short label for the primary header link to /partners (added with the
      // 2026-27 partnership page). `partners` above stays the longer footer
      // wording.
      partnersNav: "Partners",
    },
    hero: {
      eyebrow: "Abidjan & Grand-Bassam, Côte d'Ivoire",
      title: "Building Champions, On and Off the Pitch",
      subtitle: "Join us today and have a unique training experience.",
      ctaPrimary: "Enroll Your Child",
      ctaSecondary: "See Our Programs",
      // Added 2026-08-13, site improvement pass, Priority 4 — a second,
      // lower-commitment conversion path next to "Enroll Your Child".
      ctaTrial: "Book a Trial Session",
      stats: [
        { value: "600+", label: "Active players" },
        { value: "5", label: "Training sites" },
        { value: "7", label: "Age programs" },
        // CHANGED 2026-08-14, second site improvement pass, Priority 2/9 —
        // this used to be a "1:15 coach-to-player ratio" stat (added
        // 2026-08-13 per a verbal confirmation from Patrick). This pass's
        // brief explicitly instructed: don't show a coach-to-player ratio
        // unless it's confirmed in the repository's own authoritative data
        // (fee_plans/age_categories/etc. — see lib/pricing.ts's own sourcing
        // convention), and to use the age range as the fourth stat instead
        // if it isn't. No coach-staffing ratio exists in that authoritative
        // data, so this shows the one number that is confirmed there: the
        // full age span the academy actually covers. Flagged back to
        // Patrick as a reversal of the earlier verbal confirmation —
        // confirmed 2026-08-14 that the removal stands, resolved, no
        // further action needed here.
        { value: "14 months–17 years", label: "Age range" },
      ],
    },
    about: {
      eyebrow: "About Bright Academy",
      title: "More than a football club",
      body: [
        "Every Bright Academy session runs on real methodology, not improvisation — built on Horst Wein's Funino and Formino principles, proven play-based frameworks for developing young players.",
        "We teach through play: motor skills, technique, and social skills all build together, session after session. Our goal is simple — give every child the best possible start, a strong character, real confidence, and above all, fun at every training.",
      ],
      // CORRECTED 2026-08-14, second site improvement pass, Priority 9 —
      // "Qualified coaches" and "Sessions run in English and French" were
      // both unverified claims (coach qualifications and bilingual
      // coaching are both on Patrick's own list of items requiring owner
      // confirmation before publishing). Replaced with two facts already
      // substantiated elsewhere on this same site: the 5-site footprint
      // (see careers.whyJoin/Sites section) and the four-pillar curriculum
      // (see the Approach section, which explicitly states every player is
      // evaluated across four pillars — that one IS a verified claim).
      highlights: [
        { title: "5 training sites across Abidjan & Grand-Bassam" },
        { title: "A four-pillar curriculum, evaluated by age" },
        { title: "Purely educational, play-based learning" },
      ],
      // Added 2026-08-16 — Patrick sent his founder bio and photos; this
      // now links to the new Founder section below instead of sitting
      // unused (see About.tsx).
      cta: "Meet our founder",
    },
    // Added 2026-08-16, Patrick's explicit request: a founder bio section,
    // built from the professional bio text and photos he sent directly.
    // Body condensed to five web-friendly paragraphs; every fact here (the
    // countries coached in, the founding years/cities, the coaching
    // education, the degree) comes straight from what Patrick provided —
    // nothing added or guessed. Photo: /images/founder-patrick.jpg, chosen
    // from the set Patrick sent as the most polished/on-brand option (see
    // report back to Patrick for the full reasoning on that choice).
    founder: {
      eyebrow: "Meet the Founder",
      name: "Patrick Asaiah Asseu",
      role: "Founder & President, Bright Academy",
      photoAlt: "Patrick Asaiah Asseu, Founder and President of Bright Academy",
      body: [
        "Patrick Asaiah Asseu founded Bright Academy on a simple conviction: that football should develop better people, not just better players.",
        "A former professional footballer and youth coach, Patrick has coached across Côte d'Ivoire, Egypt, Thailand, and the Philippines. He founded Bright Academy in Manila in 2019, then launched Bright Academy CI in 2021.",
        "His coaching philosophy centers on developing technical ability, game intelligence, creativity, decision-making, confidence, discipline, and character in every player.",
        "He has trained through the Chelsea Foundation and a Funiño clinic based on Horst Wein's methodology, and holds a Bachelor's degree in Sociology from Université Cheikh Anta Diop de Dakar.",
        "His vision for Bright Academy is simple: give every child, regardless of ability or background, the chance to grow through football — on the pitch and in life.",
      ],
      quote:
        "Football is the vehicle. Development is the mission. Our goal is to help every child discover their potential, on the pitch and in life.",
      quoteAttribution: "Patrick Asaiah Asseu, Founder & President, Bright Academy",
      // Added 2026-08-30 for the new homepage teaser (see FounderTeaser.tsx)
      // — the full bio moved to its own /founder page as part of the
      // homepage-length audit fix.
      teaserCta: "Read Patrick's full story",
    },
    philosophy: {
      eyebrow: "Our Philosophy",
      // Changed 2026-08-13, Patrick's explicit request.
      quote: "Every session at Bright is a new adventure.",
      subtitle:
        "Fun first, good sportsmanship, and a safe, inclusive environment — open to every child, regardless of gender or ability.",
    },
    // Added 2026-08-13, Patrick's explicit ask ("put the jerseys on the
    // website"). Updated same day with the real BrightFit product renders
    // he sent — see components/KitShowcase.tsx.
    //
    // Subtitle corrected 2026-08-13 (site improvement pass, Priority 2A):
    // this used to say the two kits were "included in your season
    // enrollment", directly contradicting the FAQ's "Two training kits are
    // also required each season (40,000 XOF)" a few sections down — the
    // same two kits can't be both bundled-in-the-fee and separately
    // billed. Second sentence now uses Patrick's approved wording verbatim;
    // the 40,000 XOF figure is confirmed against the live fee_plans table
    // ("Deux jeux de maillots obligatoires", per_season, 40000 XOF) as of
    // 2026-08-13, not just copied from the FAQ.
    kit: {
      eyebrow: "Our Kit",
      title: "What our players wear, on and off the ball",
      subtitle:
        "Every player trains and competes in the official Bright Academy kit. Two official training kits are required for the season and are billed separately at a total cost of XOF 40,000.",
      images: [
        { caption: "Home kit — orange and blue" },
        { caption: "Away kit — navy and orange" },
      ],
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
          // Softened 2026-08-16 (audit-corrections pass, Priority 2) —
          // "referred to our medical staff" implied formally confirmed,
          // permanent dedicated medical personnel, which isn't
          // authoritatively confirmed anywhere in this project (see this
          // file's own 2026-08-14 note on the same issue, which caught the
          // "supervised by" phrasing but left this one in place). Reworded
          // to match the safety section's own approved wording below —
          // concerns go to the academy's management, which is what's
          // actually verified (see docs/16-medical-staff-role-guide.md's
          // real injury/incident workflow — logged, escalated to
          // leadership, medical services contacted when the situation
          // requires it — not "our medical staff" as a standing claim).
          body: "Age-appropriate conditioning and health tracking, with any concern reported to the academy's management.",
        },
      ],
    },
    // Added 2026-08-13, Patrick's explicit ask — a dedicated, important
    // section on child safety and wellbeing (safety during training,
    // emergency handling, medical information).
    // REWRITTEN 2026-08-16 (audit-corrections pass, Priority 2) — an
    // external audit flagged this section's original wording ("our
    // medical staff", "authorized to give first aid", incidents "tracked
    // until resolved", blood-type collection stated as routine) as
    // implying permanent dedicated medical personnel and certified
    // first-aid capacity that aren't formally/authoritatively confirmed
    // anywhere in this project. Body copy for all three pillars below is
    // now Patrick's own approved provisional wording from that audit
    // (SÉCURITÉ ET GESTION DES INCIDENTS / SAFETY AND INCIDENT MANAGEMENT),
    // adapted to this section's existing 3-pillar layout rather than
    // invented fresh — see legal-content.ts's MEDICAL_INFO_COLLECTED
    // constant, which now imports pillars[2]'s body directly instead of
    // duplicating it, so this stays the single source of truth. An
    // owner-confirmation TODO for the academy's actual first-aid/medical
    // arrangements (so this wording can eventually be made more specific,
    // not less) is tracked in the final audit report, not on this page.
    safety: {
      eyebrow: "Safety & Wellbeing",
      title: "Every child's safety comes first",
      subtitle: "A structured approach to keeping players safe on the pitch, and supporting them quickly if something happens.",
      pillars: [
        {
          title: "During training",
          body: "Sessions are run by trained coaches following our own age-specific curriculum, with groups structured and paced for each age category. Any injury or incident during a session is reported to the academy's management, and parents are informed.",
        },
        {
          title: "Safety and incident management",
          body: "Children's safety is a priority during training sessions. Appropriate medical services are contacted when the situation requires it, and parents are kept informed throughout.",
        },
        {
          title: "Medical information we ask for",
          body: "During registration, parents may provide medical information strictly necessary for their child's safety, including allergies, ongoing treatment, medical restrictions and emergency contacts. This information is confidential and accessible only to authorised personnel.",
        },
      ],
    },
    achievements: {
      eyebrow: "Our Achievements",
      title: "Winning on the world stage",
      subtitle: "Real results from real competition — our players have already brought trophies home from two continents.",
      watchHighlights: "Watch highlights",
      trophies: [
        {
          tournament: "Surf Cup International 2025",
          location: "Morocco",
          results: ["U17 Champions"],
          image: "/images/achievements/morocco-surf-cup.jpg",
        },
        {
          tournament: "Surf Cup International 2025",
          location: "Morocco",
          results: [`${SURF_CUP_2025_RUNNERS_UP_CATEGORY} Runners-up`],
          image: "/images/achievements/morocco-surf-cup-runners-up.jpg",
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
    // Added 2026-08-13, site improvement pass, Priority 4 — approved
    // wording, used verbatim near the programme comparison table so the
    // "paid, price varies by programme" policy is stated plainly before
    // anyone clicks a trial button.
    trial: {
      badge: "PAID TRIAL SESSION",
      notice:
        "The trial session is charged at the normal single-session rate of the selected programme. The amount therefore varies according to the child's programme and is displayed or confirmed before booking.",
      cta: "Book a Trial Session",
      priceLabel: "Trial session price",
      priceUnconfirmed: "Contact us",
    },
    // Added 2026-08-13, Priority 5 — labels for the new programme
    // comparison table (components/ProgramComparison.tsx).
    comparison: {
      eyebrow: "Compare Programmes",
      title: "Every programme, side by side",
      subtitle: "Ages, locations, pricing, and trial availability — no need to open seven pages to compare.",
      colProgram: "Programme",
      colAgeRange: "Age range",
      colLocations: "Locations",
      colSessions: "Sessions / week",
      colSchedule: "Schedule",
      colMonthly: "Monthly (1x/week)",
      colQuarterly: "Quarterly (1x/week)",
      colTrial: "Trial session",
      colAction: "Registration",
      contactUs: "Contact us",
      // Added 2026-09-01 — shown instead of an amount in the Monthly/
      // Quarterly/Trial columns for any programme with pricing.free true
      // (currently just Bright Babies). See lib/pricing.ts's ProgramPricing
      // .free doc comment.
      free: "Free",
      // RENAMED 2026-08-16 (audit-corrections pass, Priority 4) — was
      // "the Elite formula" / "Elite formula", easily confused with the
      // unrelated "Bright Elite" age programme (U12-U14). Per Patrick's
      // approved disambiguation, this billing option is now called the
      // "four-session weekly plan" in public copy — the internal
      // `eliteFormula` field name in lib/pricing.ts is left as-is (an
      // internal identifier, not shown to parents), same "public label
      // changes, database identifier doesn't" approach applied there.
      sessionsRange: "1–2, or 4 with the four-session weekly plan",
      sessionsRangeNoElite: "1–2 per week",
      enroll: "Enroll",
      bookTrial: "Trial",
      eliteNote: "Four-session weekly plan available at Complexe Sportif de Biafra and Palais des Sports de Treichville.",
      perMonth: "/mo",
      perQuarter: "/quarter",
    },
    sites: {
      eyebrow: "Our Sites",
      title: "Five training sites across Abidjan & Grand-Bassam",
      subtitle: "Find the location closest to your family.",
      directions: "Get Directions",
      // Weekly schedule, added 2026-08-30 alongside lib/schedule.ts — see
      // that file's header for sourcing. "newSeason" references
      // SCHEDULE_EFFECTIVE_DATE from the same file.
      schedule: {
        heading: "Weekly schedule",
        newSeason: "New for the 2026–2027 season, effective September 1",
        training: "Training",
        futsal: "Futsal",
        noSchedule: "Schedule not yet published for this site — contact us for times.",
        days: { mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun" },
      },
      list: [
        { name: "Angré Château", area: "Angré", lat: 5.409762, lng: -3.9800891, mapsUrl: "https://maps.app.goo.gl/FgCkyAng6u51p9F37" },
        { name: "Arena Bassam", area: "Mockey, Grand-Bassam", lat: 5.218917, lng: -3.750877, mapsUrl: "https://maps.app.goo.gl/urHCHE8xGc2puHqP6" },
        { name: "Complexe Sportif de Biafra", area: "Treichville", lat: 5.312437, lng: -4.00648, mapsUrl: "https://maps.app.goo.gl/sS5KBZsMiTbhFNJ19" },
        { name: "Palais des Sports de Treichville", area: "Treichville", lat: 5.298087, lng: -4.005465, mapsUrl: "https://maps.app.goo.gl/JBqzgTx7jr6RmZ1i9" },
        // Added 2026-09-01 — new site confirmed via Patrick's "PROGRAMME
        // D'ENTRAÎNEMENT — NOUVELLE SAISON 2026–2027" graphic for "Sporting
        // Club Biétry" (Petite Enfance, 14 mois–U5). Coordinates from the
        // Google Maps link Patrick sent, which resolves to "Sporting Club
        // Abidjan" — that's the official/Maps-registered venue name; area
        // "Biétry" matches the same {name, area} convention as every other
        // site here.
        { name: "Sporting Club Abidjan", area: "Biétry", lat: 5.2769674, lng: -3.9821189, mapsUrl: "https://maps.app.goo.gl/bctSpmLUv9XiaPVv9" },
      ],
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Life at Bright Academy",
    },
    // Added 2026-08-25, Patrick's follow-up to the photo gallery ask — a
    // video option "on the website both for the first team and for the
    // academy." Mirrors gallery's eyebrow/title shape exactly; see
    // components/Videos.tsx.
    videos: {
      eyebrow: "Videos",
      title: "Watch Bright Academy",
      // Added 2026-08-29 alongside the /videos empty-state fix (see
      // Videos.tsx) — mirrors ourCoaches.none/news.none's own wording.
      none: "Videos are being added — check back soon.",
    },
    ourCoaches: {
      eyebrow: "Our Coaches",
      title: "Meet the coaching staff",
      // CORRECTED 2026-08-14, second pass, Priority 9 — "Qualified" was an
      // unverified credential claim; reworded to describe what's actually
      // true (approved bios on file) without asserting a qualification
      // that hasn't been confirmed.
      subtitle: "Approved bios on file with the academy — the people your child trains with every session.",
      none: "Coach profiles are being added — check back soon.",
      yearsExperience: "years of experience",
    },
    news: {
      eyebrow: "News",
      title: "Latest from Bright Academy",
      subtitle: "Announcements, results, and updates from around the academy.",
      none: "No news posted yet — check back soon.",
      readMore: "Read the article →",
      seeAll: "See all news →",
      backToNews: "← Back to News",
      notFound: "This post could not be found.",
    },
    // Added 2026-08-17 — the trial-request flow used to jump straight to a
    // prefilled WhatsApp message (see lib/whatsapp.ts's own history). Per
    // Patrick's explicit ask, a request now also lands as a real Leads
    // entry on the OS app, notified to the chosen site's receptionist —
    // this dict backs that new /trial page + form. WhatsApp stays as a
    // secondary option on the same page for anyone who'd rather chat.
    trialRequest: {
      eyebrow: "Book a Trial",
      title: "Request a trial session",
      subtitle:
        "Tell us about your child and your preferred site — a member of our team will confirm the price, schedule, and availability by phone or WhatsApp.",
      paidNotice: "Trial sessions are paid, at the same price as a single regular session for the programme you join — never free.",
      // Added 2026-09-01 — the one confirmed exception to the "never free"
      // rule above: Patrick's explicit instruction that Bright Babies is a
      // free programme at both sites it runs at (Angré Château and
      // Sporting Club Abidjan). Kept as a separate sentence rather than
      // rewritten into the rule itself, so the rule still reads correctly
      // for every other programme.
      paidNoticeBabiesException: "Bright Babies (14–23 months) is the one exception — every session in that programme is free, at every site.",
      form: {
        title: "Your details",
        guardianName: "Your full name",
        guardianPhone: "Phone number",
        guardianEmail: "Email (optional)",
        childFirstName: "Child's first name (optional)",
        childLastName: "Child's last name (optional)",
        childDateOfBirth: "Child's date of birth (optional)",
        site: "Preferred site (optional)",
        sitePlaceholder: "Select a site…",
        programInterest: "Programme of interest (optional)",
        programPlaceholder: "e.g. Bright Kids, Bright Elite…",
        message: "Anything else we should know? (optional)",
        submit: "Request a trial session",
        submitting: "Sending…",
        success: "Thank you — your request has been received. A member of our team will contact you shortly to confirm the details.",
        errorGeneric: "Something went wrong sending your request. Please try again, or reach us on WhatsApp.",
      },
      whatsappAlt: "Prefer to chat right away?",
      whatsappAltLink: "Message us on WhatsApp instead.",
    },
    careers: {
      eyebrow: "Careers",
      title: "Join the Bright Academy team",
      subtitle:
        "We're always glad to hear from qualified coaches, front-desk staff, and support roles who share our approach to developing young players. Send us your details — we keep every application on file and reach out when a role opens.",
      openings: {
        title: "Open positions",
        none: "No current openings.",
        noneHint: "Check back later, or send us your details below and we'll reach out when a role opens.",
        viewOpening: "View opening",
        apply: "Apply",
        backToOpenings: "← All open positions",
        deadlineLabel: "Application deadline",
        siteLabel: "Site",
        employmentTypeLabel: "Employment type",
        ageGroupLabel: "Age group",
        footballFormatLabel: "Format",
        coachingLevelLabel: "Coaching level",
        employmentTypeLabels: { full_time: "Full-time", part_time: "Part-time", contract: "Contract", seasonal: "Seasonal" },
        descriptionTitle: "About this role",
        responsibilitiesTitle: "Responsibilities",
        requiredQualificationsTitle: "Required qualifications",
        preferredQualificationsTitle: "Preferred qualifications",
        requiredExperienceTitle: "Required experience",
        skillsTitle: "Required skills",
        languagesTitle: "Languages",
        applyTitle: "Apply for this position",
        notFoundTitle: "This opening is no longer available",
        notFoundBody: "It may have closed or reached its application deadline. See our other open positions below.",
      },
      whyJoinTitle: "Why work with us",
      whyJoin: [
        "Real methodology — Horst Wein's Funino and Formino frameworks, not improvised drills.",
        "Five training sites across Abidjan and Grand-Bassam.",
        "A structured, four-pillar curriculum with real player evaluation.",
        "A club that competes — and wins — on the international stage.",
      ],
      form: {
        title: "Send us your application",
        fullName: "Full name",
        email: "Email",
        phone: "Phone (optional)",
        positionInterest: "Position of interest (optional)",
        positionPlaceholder: "e.g. Coach, Receptionist, Photographer…",
        message: "Message (optional)",
        messagePlaceholder: "Tell us a bit about yourself and your experience…",
        resumeUrl: "Link to your résumé/CV (optional)",
        resumeUrlPlaceholder: "https://…",
        // Added 2026-08-29, audit fix — shown when resumeUrl is filled in
        // but isn't a well-formed http(s) URL (see CareersForm.tsx's
        // isValidHttpUrl).
        resumeUrlInvalid: "Please enter a valid link starting with http:// or https://, or leave this field empty.",
        submit: "Submit application",
        submitting: "Submitting…",
        success: "Thank you — your application has been received. We'll be in touch if a role fits.",
        errorGeneric: "Something went wrong submitting your application. Please try again, or reach us on WhatsApp.",
      },
    },
    // Rewritten 2026-10 from the club's "Dossier de Partenariat 2026-2027"
    // (the first-team + Attinguié pitch edition), replacing the earlier
    // adaptation of the older dossier (a previous edition with a different project scope). Decisions taken
    // with Patrick for the web version: NO FCFA amounts are shown (the
    // dossier's prices are indicative and negotiable — offers are shown
    // with their benefits, "amounts on request"); contact stays the
    // founder's email + WhatsApp; kit-supplier / equipment-maker rights are
    // reserved to the Tielo Sport SAS (PUMA) supply agreement and are NOT
    // offered; no named player; no naming rights are promised.
    partners: {
      eyebrow: "Partnership 2026–2027",
      title: "Partner with Bright Academy Football Club",
      subtitle: "Building a club. Supporting families. Preparing the generations to come.",
      intro:
        "A sporting, human and local project already up and running. We are looking for companies that want to take part in its next step: the first-team jersey, the Attinguié pitch, our digital community and match-day activations.",
      ctaPrimary: "Discuss a Partnership",
      ctaWhatsapp: "Chat on WhatsApp",
      ctaDossier: "Download the partnership dossier (PDF, in French)",
      whatsappPrefill: "Hi! I'd like to learn more about partnering with Bright Academy Football Club for the 2026–2027 season.",

      statsTitle: "Bright, in brief",
      stats: [
        { value: "600+", label: "active players" },
        { value: "5", label: "training sites" },
        { value: "7", label: "age-group programs" },
        { value: "298,000+", label: "cumulative followers on official accounts" },
        { value: "2019", label: "year founded" },
        { value: "2025–26", label: "District champions, promoted to the Regional Division" },
      ],
      statsNote: "From 14 months to 17 years old · Abidjan and Grand-Bassam · Attinguié",

      sportTitle: "District champions",
      sportIntro: "First team, 2025–2026 season, Abidjan Nord league (Division District, Group D).",
      sportRecord: [
        { value: "11", label: "wins" },
        { value: "1", label: "defeat" },
        { value: "36", label: "goals scored" },
        { value: "7", label: "goals conceded" },
      ],
      timelineTitle: "A steady progression",
      timeline: [
        { when: "2025", title: "Surf Cup International", detail: "Morocco · U17 champions, U15 runners-up" },
        { when: "2025", title: "Abu Dhabi Cup", detail: "United Arab Emirates · U14 and U16 champions" },
        { when: "May 2026", title: "District champions", detail: "Promotion to the Regional Division" },
        { when: "Feb–May 2027", title: "Regional Division", detail: "Next championship season" },
        { when: "Our home", title: "Attinguié", detail: "Hosting our matches in front of our own crowd" },
        { when: "Ambition", title: "Reach the 3rd division", detail: "A goal, not a promise" },
      ],
      timelineNote: "International titles won by the academy's youth teams.",
      objectiveEyebrow: "Objective",
      objectiveTitle: "Reach the 3rd division",
      objectiveBody:
        "Our goal is to step up to the next level and reach the 3rd division, in front of our own crowd and on our own infrastructure. Regional Division, February to May 2027: our aim is to host our matches in Attinguié.",
      objectivePillars: "Performance · Infrastructure · Crowd · Identity",

      platformTitle: "More than a logo on a jersey",
      platformIntro:
        "A partnership with Bright Academy brings together five dimensions that reinforce each other: your brand is seen, it joins a community, it lives in our content, it creates impact — and what is done is measured.",
      dimensions: [
        { n: "01", title: "Visibility", body: "Jersey and shorts, Attinguié pitch panels as soon as it is laid out, events, club materials." },
        { n: "02", title: "Community", body: "Players, parents, families and the local community — on the pitches and online." },
        { n: "03", title: "Content", body: "TikTok, Instagram, Facebook, WhatsApp and the website: matches, training, behind the scenes." },
        { n: "04", title: "Impact", body: "Youth, education, families, local development, infrastructure." },
      ],
      measureTitle: "05 Measurement",
      measureBody: "Photos · publications · action review · end-of-season report",
      activateTitle: "Bringing the partnership to life",
      activateItems: ["Challenges", "Partner days", "Competitions", "Youth operations", "Branded content", "Company events", "Trophy presentations"],
      exampleTitle: "Example · Partner day",
      exampleBody:
        "Your employees attend a training session and present the player-of-the-match trophy; the day is published on the club's accounts, then summarized in a photo review.",

      kitTitle: "The jersey first.",
      kitIntro:
        "The club has an equipment supply agreement with Tielo Sport SAS, the official PUMA distributor. Kit-supplier rights are reserved to that agreement: no kit-supplier right is offered as part of these partnerships.",
      placementsTitle: "Jersey placements",
      placementLabels: { front: "Front", back: "Back", shorts: "Shorts" },
      placements: [
        { n: 1, label: "Front of jersey", role: "Main partner" },
        { n: 2, label: "Sleeve", role: "Jersey sponsor" },
        { n: 3, label: "Back", role: "Jersey sponsor" },
        { n: 4, label: "Lower back", role: "Official partner" },
        { n: 5, label: "Shorts", role: "Official partner" },
      ],
      placementsNote: "Terms and amounts on request. Subject to existing contractual rights and club approval.",
      thenTitle: "Then, in order of importance",
      then: [
        { title: "Attinguié pitch", body: "Panels and partner areas as soon as it is laid out." },
        { title: "Digital", body: "Six official accounts and www.brightacademyci.com." },
        { title: "Content", body: "Matches, training, behind the scenes, announcements." },
        { title: "Activations", body: "Match days, trophies, partner days." },
      ],
      tailoredNote: "A tailored proposal. Placements, content and activations are built with each company, according to its goals.",

      offersTitle: "Three ways to take part",
      offersIntro: "Season 2026–2027. Contributions can be in cash or in kind. Amounts are shared on request and in the first meeting.",
      offerGroups: [
        {
          n: "01",
          title: "Strategic partners",
          items: [
            {
              name: "Main partner",
              tag: "Only one · First team",
              body: "Front of the jersey, a name associated with the club, presence on the site and social networks. Hospitality, dedicated content, partner days, brand campaigns.",
            },
            {
              name: "Jersey sponsor",
              tag: "Sleeve or back",
              body: "Logo on the match jersey, presence on the site and social networks. Match-day content, challenges.",
            },
            {
              name: "Official partner",
              tag: "Lower back or shorts",
              body: "Logo on the match jersey, partners page on the site, official mention, invitations.",
            },
          ],
        },
        {
          n: "02",
          title: "Project partners",
          items: [
            { name: "Infrastructure", tag: "Per lot", body: "A lot of the Attinguié pitch, a plaque on site, a before/after review." },
            { name: "Technical", tag: "In kind", body: "Products or services, official supplier mention — excluding sports kit." },
            { name: "Performance", tag: "Per season", body: "Physical, medical, nutrition; training equipment, behind-the-scenes content." },
            { name: "CSR", tag: "Per season", body: "An identified youth program, actions with your employees, a review." },
          ],
        },
        {
          n: "03",
          title: "Activation partners",
          items: [
            { name: "Match partner", tag: "Per match", body: "Your brand associated with a fixture." },
            { name: "MVP partner", tag: "Per season", body: "The player-of-the-match trophy in your name." },
          ],
        },
      ],
      offersLegalNote:
        "The benefits shown are indicative. Their content, volume, calendar and any exclusivity rights are set out in the partnership agreement. No offer grants any right over players, transfers or the club's sporting management.",

      useTitle: "What will your investment make possible?",
      useColumns: [
        { n: "01", title: "Team", items: ["Sporting operations", "Travel", "Preparation", "Authorized equipment"] },
        { n: "02", title: "Infrastructure", items: ["The Attinguié pitch", "Leveling and fencing", "Turf", "Equipment"] },
        { n: "03", title: "Impact", items: ["Young people", "Training", "Activities", "Local development"] },
      ],
      useFlow: ["Partnership agreement", "Allocation to the planned actions", "Review delivered to the partner"],
      useBody:
        "Contributions are governed by a partnership agreement and allocated to the actions it plans. A follow-up of the actions carried out can be shared with the partner as a review.",
      founderEyebrow: "Status",
      founderTitle: "Founding partner",
      founderIntro: "Support Bright Academy at the moment its next step is being built.",
      founderBody:
        "Examples of rights and benefits, to be defined according to the partnership level and the signed agreement: a dedicated space for founding partners, renewal priority, enhanced visibility, a dedicated activation, official recognition of the support.",
      founderNote: "Any naming, exclusivity or particular right is offered only where those rights are legally and contractually available.",

      projectEyebrow: "The Attinguié project",
      projectLead: "We are not just building a pitch.",
      projectTitle: "We are building the club's future home.",
      projectBody: [
        "Our ambition is to make Attinguié the true home of Bright Academy Football Club: playing our league matches in front of our own crowd, in the heart of the village, on our own infrastructure. The goal is to host our Regional Division matches there from the February to May 2027 season.",
        "The site, about 1.11 hectares, is made available to the club under an agreement with the community; the formalities are being finalized. Planned playing area: 100 m × 60 m.",
      ],
      projectChain: "A pitch → a home → a crowd → an identity → a sporting ambition",
      projectQuote: "The village club must play at home.",
      projectQuoteBody:
        "Playing in Attinguié means families can come and support the team, young people get a sporting role model close to home, and the pitch becomes a gathering place.",
      projectFacts: [
        { value: "1.11 ha", label: "site made available to the club" },
        { value: "100 × 60 m", label: "planned playing area" },
        { value: "126 M FCFA", label: "overall project investment, delivered in phases" },
        { value: "≈ 25 M FCFA", label: "first lots of pitch works identified, based on quotes" },
      ],
      projectFactsNote: "Training center and sports infrastructure, delivered in phases.",
      doneTitle: "Done",
      done: ["Site marked out", "100 m × 60 m plan", "Site clearing completed"],
      nextTitle: "Next steps",
      next: ["Survey and boundary marking", "Levelling, removal of old stumps", "Wire-mesh fencing", "Turf and irrigation", "Goals, changing rooms, equipment"],
      financialTitle: "Financial contribution",
      financialBody: "You fund a lot, priced on quote. We carry out the works and report back to you.",
      inKindTitle: "In-kind contribution",
      inKindBody: "Materials, earthworks, fencing, turf, transport, labor, equipment, services. Particularly suited to construction, energy, telecoms and transport companies.",

      audienceTitle: "A community that already exists",
      audienceIntro:
        "Bright's cumulative digital community exceeds 298,000 followers, built on content published every week: training, matches, tournaments, behind the scenes.",
      audienceHeaders: { account: "Account", platform: "Platform", audience: "Followers" },
      audienceRows: [
        { account: "@brightacademy.ci", platform: "TikTok", audience: "176,600+" },
        { account: "Bright Academy", platform: "Facebook", audience: "77,000+" },
        { account: "@bright.football.club", platform: "TikTok", audience: "16,100+" },
        { account: "@brightacademy_ci", platform: "Instagram", audience: "12,000+" },
        { account: "Bright WhatsApp Channel", platform: "WhatsApp", audience: "9,000+" },
        { account: "Bright Football Club", platform: "Facebook", audience: "7,600+" },
      ],
      audienceTotal: "Cumulative total across official accounts",
      audienceGrandTotal: "298,000+",
      audienceNote:
        "Total of the followers of the official accounts shown; the same person may follow several accounts, so this is not a count of unique people. Figures change over time (October 2026).",
      communityTitle: "Who makes up this community",
      communityTags: ["Young people", "Parents", "Families", "Athletes", "Local community", "Entrepreneurs and companies", "Abidjan and Grand-Bassam", "Attinguié"],
      detectionNote: "2026 talent identification: more than 1,000 young people turned up.",

      whyTitle: "Why Bright Academy?",
      whySubtitle: "Not an idea on paper. A project in operation.",
      whyItems: [
        { title: "A project already running", body: "600+ players, 5 sites, 7 programs, a first team in competition." },
        { title: "An established community", body: "Families, young people and a regular digital presence." },
        { title: "Results", body: "A District title, a promotion, international youth titles and a first transfer abroad." },
        { title: "An infrastructure project", body: "A pitch being transformed in Attinguié." },
        { title: "A professional ambition", body: "Building a structured club, without skipping steps." },
      ],
      alreadyTitle: "Already supporting us",
      alreadyName: "Tielo Sport SAS",
      alreadyBody: "Official PUMA distributor. Supplier of the first team's equipment.",

      processTitle: "From first meeting to season review",
      process: ["Meeting", "Tailored proposal", "Agreement", "Activation", "Review"],

      ctaTitle: "Let's build the next step together.",
      ctaSubtitle:
        "Let's set up a 30-minute meeting to identify the form of partnership that suits your company best.",
      contactName: "Patrick Asseu — Founder & President",
      contactOrg: "Bright Academy Football Club",
      emailLabel: "Email",
      closing: ["The project already exists.", "The young people are here.", "The families are here.", "The community is here.", "The pitch is under construction."],
    },
    // Homepage live-match banner — added 2026-08-27 alongside the live
    // match-day feature (see components/LiveMatchBanner.tsx). Only rendered
    // when the First Team's next fixture is currently live — this is the
    // direct answer to "we can see that there is a game today", surfaced
    // right on the homepage rather than requiring a visit to /first-team.
    liveBanner: {
      badge: "LIVE NOW",
      heading: "Bright Football Club is playing right now",
      vsBadge: "vs",
      cta: "Watch Live",
    },
    firstTeam: {
      eyebrow: "First Team",
      title: "Bright Football Club",
      subtitle: "Our senior/first team — the pathway for our most advanced players.",
      divisionLabel: "Division",
      // Added 2026-08-30 for the hero's league-position badge and the
      // recent-form strip (components/FirstTeamSection.tsx) — both built
      // from data this page already fetches (standings, results), no new
      // backend query needed. positionConnector composes with a
      // code-computed ordinal ("3rd" + "in" + division) rather than a
      // single template string, since the ordinal itself is language-
      // dependent (3rd vs 3e) and easier to get right in code than to bake
      // into translated copy.
      positionConnector: "in",
      recentFormLabel: "Recent form",
      formOutcomes: { win: "W", draw: "D", loss: "L" },
      viewFullTable: "View full table",
      showLessTable: "Show less",
      // Added 2026-08-30 alongside FirstTeamPlayer.age (PlayerCard) and
      // FirstTeam.topScorers (hero chip) — see lib/api.ts for both fields'
      // own doc comments on why this is a computed age, never a birthdate.
      ageSuffix: "yrs",
      topScorerLabel: "Top scorer",
      topScorersLabel: "Top scorers",
      tabs: { squad: "Squad", staff: "Staff", fixtures: "Fixtures", gallery: "Gallery", videos: "Videos", standings: "Standings" },
      squadTitle: "Squad",
      provisionalBadge: "Provisional squad — subject to change",
      noSquad: "The squad list will be posted here soon.",
      positionFilters: { all: "All", gk: "Goalkeepers", def: "Defenders", mid: "Midfielders", fwd: "Forwards", other: "Other" },
      staffTitle: "Coaching Staff",
      noStaff: "The coaching staff will be posted here soon.",
      galleryTitle: "Gallery",
      noGallery: "Photos from the First Team will be posted here soon.",
      // Added 2026-09-09 for album grouping (FirstTeamSection.tsx) — photos
      // are organized into real albums (one per shoot/session) instead of
      // one flat, unordered-looking grid.
      backToAlbums: "← Back to albums",
      albumPhotoCount: "{count} photos",
      // Added 2026-08-25, mirrors galleryTitle/noGallery — see the Videos
      // tab in FirstTeamSection.tsx.
      videosTitle: "Videos",
      noVideos: "Videos from the First Team will be posted here soon.",
      standingsTitle: "League Table",
      noStandings: "This season's league table will be posted here once it's final.",
      standingsHeaders: { pos: "Pos", team: "Team", played: "P", won: "W", drawn: "D", lost: "L", gf: "GF", ga: "GA", gd: "GD", pts: "Pts" },
      // Next-fixture banner (2026-08-24) — see components/FirstTeamSection.tsx.
      nextFixture: {
        label: "Next Fixture",
        vsBadge: "VS",
        home: "Home",
        away: "Away",
        venueTbc: "Venue to be confirmed",
        live: "LIVE",
        watchLive: "Watch Live",
      },
      fixturesTitle: "Fixtures",
      noFixtures: "No matches are on the calendar yet — check back soon.",
      // Added 2026-08-28 alongside the Results section on the Fixtures tab
      // — see FirstTeamSection.tsx and bright-academy-os's lib/data/
      // public-site.ts for the results-gap this fixes.
      upcomingLabel: "Upcoming",
      resultsLabel: "Results",
      noResults: "No results yet this season — check back after the first match.",
      fullTime: "FT",
      followTitle: "Follow the club",
    },
    // Added 2026-08-30 for the new clickable player-profile page
    // (components/PlayerProfileSection.tsx, app/first-team/players/[id]) —
    // mirrors bright-academy-os's getPublicPlayerProfile(). ageSuffix on
    // purpose isn't repeated here — PlayerProfileSection reuses
    // firstTeam.ageSuffix, same single-source-of-truth reasoning as
    // PlayerCard's own prop.
    playerProfile: {
      backToSquad: "Back to squad",
      notFound: "This player isn't available right now.",
      appearancesLabel: "Appearances",
      goalsLabel: "Goals",
      heightLabel: "Height",
      recentFormLabel: "Recent appearances",
      noAppearances: "No completed-match appearances logged yet.",
      starterLabel: "Started",
      subLabel: "Sub",
      minutesSuffix: "'",
    },
    // Every answer here restates a fact already published elsewhere on the
    // site (age range, sites, languages, curriculum, enrollment flow,
    // tournament results, pricing, trial sessions, cancellation policy).
    // Pricing/annual-fee/cancellation entries are sourced from the live
    // Bright Academy OS database (fee_plans table) and its published
    // enrollment terms — not guessed at — pulled 2026-08-12.
    faq: {
      eyebrow: "FAQ",
      title: "Questions parents ask us",
      subtitle: "Everything you need to know before you enroll.",
      // Trimmed 2026-08-13 from 12 to 10 questions (Patrick's ask, "FAQ has
      // quite a lot") — dropped "Where do you train?" (already answered by
      // the Our Sites section further down the page) and "What languages
      // are sessions run in?" (already stated in the About section above).
      // Trimmed again same day, 10 to 9 (Patrick's "remove redundant
      // information" pass) — dropped "What about medical information and
      // insurance?" now that the dedicated Safety & Wellbeing section (see
      // `safety` above) covers it in more depth. Every remaining question
      // here is still distinct info.
      items: [
        {
          q: "What ages do you accept?",
          a: "Children from 14 months to 17 years old, across seven age-specific programs — from Bright Babies (14–23 months) through Bright Pro (15–17 years).",
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
        {
          q: "How much does it cost?",
          // RENAMED 2026-08-16 (Priority 4) — "Elite formula" here read as
          // the same thing as the "Bright Elite" age programme mentioned
          // elsewhere on this same page; now "four-session weekly plan",
          // matching ProgramComparison's own renamed label.
          a: "Monthly fees depend on your child's age and how many sessions a week they train. Our Classique formula (1–2 sessions/week) starts at 22,000 XOF/month, scaling with age; our four-session weekly plan (4 sessions/week, available only at Complexe Sportif de Biafra and Palais des Sports de Treichville) runs 75,000–97,000 XOF/month. Prefer to pay as you go? Single sessions are 6,000–9,000 XOF depending on age, and private coaching is 20,000 XOF/session. Quarterly billing is available at a discount, and the exact rate for your child's age group is confirmed when you register.",
        },
        {
          q: "Is there a yearly registration fee?",
          a: "Yes. On top of your program fee, there's a one-time annual enrollment fee for our sporting season (September–May): 30,000 XOF for new players, 25,000 XOF for returning ones. Two training kits are also required each season (40,000 XOF).",
        },
        {
          // Fixed 2026-08-14 — caught live in production: this answer was
          // silent on price while the trial notice next to the programme
          // comparison table (see `trial` above) explicitly says trial
          // sessions are paid at the normal single-session rate. Silence
          // here read as "maybe free" right next to a section that says
          // otherwise — the exact kind of same-site contradiction this
          // whole pass was meant to catch. Now states it plainly, without
          // repeating the full notice verbatim.
          q: "Can we try a session before enrolling?",
          a: "Yes — message us on WhatsApp or reach out through the enrollment portal, and our staff will help arrange a trial session at the site nearest you before you commit to full enrollment. The trial is charged at your child's programme's normal single-session rate — it isn't free, and there's no separate trial price.",
        },
        {
          q: "What's your cancellation policy?",
          a: "You can withdraw your child at any time with written notice to the academy; it takes effect at the end of the current billing month unless we agree otherwise. In line with our enrollment terms, registration fees and subscriptions already paid aren't refunded for a voluntary withdrawal during the season.",
        },
        {
          q: "How do I pay, and when am I billed?",
          a: "Once your child's registration is confirmed, we invoice automatically each month (or each quarter, if you choose that plan). You can pay by cash, Mobile Money, or bank transfer at any of our sites.",
        },
      ],
    },
    chat: {
      prefill: "Hi! I'd like to know more about enrolling my child at Bright Academy.",
      label: "Chat on WhatsApp",
    },
    // Subtitle reworded 2026-08-13, Patrick's "remove redundant information"
    // pass: this used to restate the exact same three steps as the FAQ's
    // "How do I enroll my child?" answer almost word for word (both pages
    // of the same single-page site, a few scrolls apart). The FAQ keeps the
    // procedural how-to; this is now a closing nudge instead of a repeat of
    // it. Same pass also dropped the FAQ's "medical information and
    // insurance" question outright — the new Safety & Wellbeing section
    // (see `safety` above) now covers that in more depth than the one-line
    // FAQ answer did.
    enrollCta: {
      title: "Ready to get your child started?",
      subtitle: "Spots fill up at every site — enroll today and give your child their place on the pitch.",
      cta: "Enroll Now",
    },
    footer: {
      tagline: "More Than Football. Building Players, Shaping Futures.",
      quickLinks: "Quick Links",
      // "contact" removed 2026-08-29 — see nav.contact's removal note above.
      whatsapp: "WhatsApp",
      social: "Follow Us",
      // Added 2026-08-13, site improvement pass, Priority 13 — every linked
      // page is a clearly-marked draft awaiting legal review (see
      // app/legal/[slug]/page.tsx), not a finished policy.
      legal: "Legal",
      legalLinks: {
        privacy: "Privacy Policy",
        terms: "Terms & Conditions",
        enrollmentTerms: "Enrollment Terms",
        cancellation: "Cancellation & Refund Policy",
        safeguarding: "Child Safeguarding",
        photoConsent: "Photo & Video Consent",
      },
      parentLogin: "Already a parent? Sign in",
      copyright: `© ${new Date().getFullYear()} Bright Academy. All rights reserved.`,
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      aboutUs: "Qui sommes-nous",
      programs: "Programmes",
      approach: "Notre approche",
      achievements: "Palmarès",
      sites: "Nos sites",
      gallery: "Galerie",
      ourCoaches: "Nos entraîneurs",
      news: "Actualités",
      careers: "Carrières",
      firstTeam: "Équipe première",
      faq: "FAQ",
      login: "Connexion parent",
      enroll: "Inscrire mon enfant",
      partners: "Devenir partenaire",
      partnersNav: "Partenaires",
    },
    hero: {
      eyebrow: "Abidjan & Grand-Bassam, Côte d'Ivoire",
      title: "Former des champions, sur et en dehors du terrain",
      subtitle: "Rejoignez-nous dès aujourd'hui et vivez une expérience d'entraînement unique.",
      ctaPrimary: "Inscrire mon enfant",
      ctaSecondary: "Voir nos programmes",
      ctaTrial: "Réserver une séance d'essai",
      stats: [
        { value: "600+", label: "Joueurs actifs" },
        { value: "5", label: "Sites d'entraînement" },
        { value: "7", label: "Programmes par âge" },
        // Voir la note en anglais ci-dessus (même bloc, section "en") pour
        // la justification complète de ce changement.
        { value: "14 mois–17 ans", label: "Tranche d'âge" },
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
        { title: "5 sites d'entraînement à Abidjan et Grand-Bassam" },
        { title: "Un curriculum en quatre piliers, évalué selon l'âge" },
        { title: "Un apprentissage par le jeu, purement éducatif" },
      ],
      cta: "Découvrir notre fondateur",
    },
    founder: {
      eyebrow: "Rencontrer le fondateur",
      name: "Patrick Asaiah Asseu",
      role: "Fondateur & Président, Bright Academy",
      photoAlt: "Patrick Asaiah Asseu, fondateur et président de Bright Academy",
      body: [
        "Patrick Asaiah Asseu a fondé Bright Academy autour d'une conviction simple : le football doit former de meilleures personnes, pas seulement de meilleurs joueurs.",
        "Ancien footballeur professionnel et entraîneur de jeunes, Patrick a entraîné en Côte d'Ivoire, en Égypte, en Thaïlande et aux Philippines. Il a fondé Bright Academy à Manille en 2019, puis lancé Bright Academy CI en 2021.",
        "Sa philosophie d'entraînement place au centre le développement technique, l'intelligence de jeu, la créativité, la prise de décision, la confiance en soi, la discipline et le caractère de chaque joueur.",
        "Il s'est formé auprès de la Chelsea Foundation et lors d'un clinique Funiño basé sur la méthodologie de Horst Wein, et est titulaire d'une licence de sociologie de l'Université Cheikh Anta Diop de Dakar.",
        "Sa vision pour Bright Academy est simple : donner à chaque enfant, quels que soient son niveau ou ses moyens, la chance de grandir à travers le football — sur le terrain comme dans la vie.",
      ],
      quote:
        "Le football est le véhicule. Le développement est la mission. Notre objectif est d'aider chaque enfant à découvrir son potentiel, sur le terrain comme dans la vie.",
      quoteAttribution: "Patrick Asaiah Asseu, Fondateur & Président, Bright Academy",
      teaserCta: "Lire l'histoire complète de Patrick",
    },
    philosophy: {
      eyebrow: "Notre philosophie",
      quote: "Chaque séance chez Bright est une nouvelle aventure.",
      subtitle:
        "Le plaisir avant tout, l'esprit sportif, et un environnement sûr et inclusif — ouvert à tous les enfants, quels que soient leur sexe ou leurs capacités.",
    },
    kit: {
      eyebrow: "Notre tenue",
      title: "Ce que portent nos joueurs, sur et en dehors du terrain",
      subtitle:
        "Chaque joueur s'entraîne et joue dans la tenue officielle de Bright Academy. Deux tenues d'entraînement officielles sont obligatoires pour la saison et sont facturées séparément au tarif total de 40 000 FCFA.",
      images: [
        { caption: "Tenue domicile — orange et bleu" },
        { caption: "Tenue extérieur — marine et orange" },
      ],
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
          // Softened 2026-08-16 (audit-corrections pass, Priority 2) —
          // see the English "Physical" pillar's comment above for the
          // full rationale.
          body: "Préparation physique adaptée à l'âge et suivi de santé, avec tout signalement transmis à la direction de l'académie.",
        },
      ],
    },
    // REWRITTEN 2026-08-16 (audit-corrections pass, Priority 2) — see the
    // English `safety` block's comment above for the full rationale. Body
    // copy below is Patrick's own approved provisional French wording
    // from the audit (SÉCURITÉ ET GESTION DES INCIDENTS), adapted to this
    // section's existing 3-pillar layout.
    safety: {
      eyebrow: "Sécurité & bien-être",
      title: "La sécurité de chaque enfant avant tout",
      subtitle: "Une approche structurée pour assurer la sécurité des joueurs sur le terrain, et réagir rapidement en cas de besoin.",
      pillars: [
        {
          title: "Pendant les entraînements",
          body: "Les séances sont encadrées par des entraîneurs formés qui suivent notre propre curriculum adapté à chaque âge, avec des groupes structurés et un rythme pensé pour chaque catégorie. Toute blessure ou tout incident survenu pendant une séance est signalé à la direction, et les parents sont informés.",
        },
        {
          title: "Sécurité et gestion des incidents",
          body: "La sécurité des enfants est une priorité pendant les séances. Les services médicaux compétents sont contactés lorsque la situation l'exige, et les parents sont tenus informés.",
        },
        {
          title: "Informations médicales demandées",
          body: "Lors de l'inscription, les parents peuvent communiquer les informations médicales strictement nécessaires à la sécurité de leur enfant, notamment les allergies, traitements en cours, restrictions médicales et contacts d'urgence. Ces informations sont confidentielles et accessibles uniquement aux personnes autorisées.",
        },
      ],
    },
    achievements: {
      eyebrow: "Nos distinctions",
      title: "Des victoires sur la scène internationale",
      subtitle: "De vrais résultats face à une vraie compétition — nos joueurs ont déjà ramené des trophées de deux continents.",
      watchHighlights: "Voir les temps forts",
      trophies: [
        {
          tournament: "Surf Cup International 2025",
          location: "Maroc",
          results: ["Champions U17"],
          image: "/images/achievements/morocco-surf-cup.jpg",
        },
        {
          tournament: "Surf Cup International 2025",
          location: "Maroc",
          results: [`Vice-champions ${SURF_CUP_2025_RUNNERS_UP_CATEGORY}`],
          image: "/images/achievements/morocco-surf-cup-runners-up.jpg",
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
    trial: {
      badge: "SÉANCE D'ESSAI PAYANTE",
      notice:
        "La séance d'essai est facturée au tarif d'une séance individuelle du programme choisi. Le montant varie donc selon le programme de l'enfant. Le tarif applicable est affiché ou confirmé avant la réservation.",
      cta: "Réserver une séance d'essai",
      priceLabel: "Tarif de la séance d'essai",
      priceUnconfirmed: "Nous contacter",
    },
    comparison: {
      eyebrow: "Comparer les programmes",
      title: "Tous les programmes, côte à côte",
      subtitle: "Âges, sites, tarifs et disponibilité des séances d'essai — pas besoin d'ouvrir sept pages pour comparer.",
      colProgram: "Programme",
      colAgeRange: "Tranche d'âge",
      colLocations: "Sites",
      colSessions: "Séances / semaine",
      colSchedule: "Horaires",
      colMonthly: "Mensuel (1x/semaine)",
      colQuarterly: "Trimestriel (1x/semaine)",
      colTrial: "Séance d'essai",
      colAction: "Inscription",
      contactUs: "Nous contacter",
      free: "Gratuit",
      // RENAMED 2026-08-16 (Priority 4) — see the English column's
      // comment above for the full rationale.
      sessionsRange: "1 à 2, ou 4 avec la formule 4 séances par semaine",
      sessionsRangeNoElite: "1 à 2 par semaine",
      enroll: "Inscription",
      bookTrial: "Essai",
      eliteNote: "Formule 4 séances par semaine disponible au Complexe Sportif de Biafra et au Palais des Sports de Treichville.",
      perMonth: "/mois",
      perQuarter: "/trimestre",
    },
    sites: {
      eyebrow: "Nos sites",
      title: "Cinq sites d'entraînement à Abidjan et Grand-Bassam",
      subtitle: "Trouvez le site le plus proche de chez vous.",
      directions: "Itinéraire",
      schedule: {
        heading: "Programme hebdomadaire",
        newSeason: "Nouveau pour la saison 2026–2027, à partir du 1er septembre",
        training: "Entraînement",
        futsal: "Futsal",
        noSchedule: "Programme pas encore publié pour ce site — contactez-nous pour les horaires.",
        days: { mon: "Lun", tue: "Mar", wed: "Mer", thu: "Jeu", fri: "Ven", sat: "Sam", sun: "Dim" },
      },
      list: [
        { name: "Angré Château", area: "Angré", lat: 5.409762, lng: -3.9800891, mapsUrl: "https://maps.app.goo.gl/FgCkyAng6u51p9F37" },
        { name: "Arena Bassam", area: "Mockey, Grand-Bassam", lat: 5.218917, lng: -3.750877, mapsUrl: "https://maps.app.goo.gl/urHCHE8xGc2puHqP6" },
        { name: "Complexe Sportif de Biafra", area: "Treichville", lat: 5.312437, lng: -4.00648, mapsUrl: "https://maps.app.goo.gl/sS5KBZsMiTbhFNJ19" },
        { name: "Palais des Sports de Treichville", area: "Treichville", lat: 5.298087, lng: -4.005465, mapsUrl: "https://maps.app.goo.gl/JBqzgTx7jr6RmZ1i9" },
        // Voir la note en anglais ci-dessus (même bloc, section "en") —
        // ajouté 2026-09-01, nouveau site "Sporting Club Abidjan" (Biétry).
        { name: "Sporting Club Abidjan", area: "Biétry", lat: 5.2769674, lng: -3.9821189, mapsUrl: "https://maps.app.goo.gl/bctSpmLUv9XiaPVv9" },
      ],
    },
    gallery: {
      eyebrow: "Galerie",
      title: "La vie à Bright Academy",
    },
    videos: {
      eyebrow: "Vidéos",
      title: "Regardez Bright Academy",
      none: "Les vidéos sont en cours d'ajout — revenez bientôt.",
    },
    ourCoaches: {
      eyebrow: "Nos entraîneurs",
      title: "Découvrez le staff technique",
      subtitle: "Profils validés par l'académie — les personnes qui encadrent votre enfant à chaque séance.",
      none: "Les profils des entraîneurs sont en cours d'ajout — revenez bientôt.",
      yearsExperience: "années d'expérience",
    },
    news: {
      eyebrow: "Actualités",
      title: "Dernières nouvelles de Bright Academy",
      subtitle: "Annonces, résultats et actualités de l'académie.",
      none: "Aucune actualité publiée pour le moment — revenez bientôt.",
      readMore: "Lire l'article →",
      seeAll: "Voir toutes les actualités →",
      backToNews: "← Retour aux actualités",
      notFound: "Cet article est introuvable.",
    },
    trialRequest: {
      eyebrow: "Séance d'essai",
      title: "Demander une séance d'essai",
      subtitle:
        "Parlez-nous de votre enfant et du site souhaité — un membre de notre équipe vous confirmera le tarif, l'horaire et la disponibilité par téléphone ou WhatsApp.",
      paidNotice: "Les séances d'essai sont payantes, au même tarif qu'une séance individuelle du programme choisi — jamais gratuites.",
      paidNoticeBabiesException: "Bright Babies (14–23 mois) est la seule exception — toutes les séances de ce programme sont gratuites, sur tous les sites.",
      form: {
        title: "Vos informations",
        guardianName: "Votre nom complet",
        guardianPhone: "Numéro de téléphone",
        guardianEmail: "E-mail (optionnel)",
        childFirstName: "Prénom de l'enfant (optionnel)",
        childLastName: "Nom de l'enfant (optionnel)",
        childDateOfBirth: "Date de naissance de l'enfant (optionnelle)",
        site: "Site souhaité (optionnel)",
        sitePlaceholder: "Sélectionnez un site…",
        programInterest: "Programme souhaité (optionnel)",
        programPlaceholder: "ex. Bright Kids, Bright Elite…",
        message: "Autre chose à nous préciser ? (optionnel)",
        submit: "Demander une séance d'essai",
        submitting: "Envoi…",
        success: "Merci — votre demande a bien été reçue. Un membre de notre équipe vous recontactera sous peu pour confirmer les détails.",
        errorGeneric: "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer, ou contactez-nous sur WhatsApp.",
      },
      whatsappAlt: "Vous préférez discuter tout de suite ?",
      whatsappAltLink: "Contactez-nous sur WhatsApp.",
    },
    careers: {
      eyebrow: "Carrières",
      title: "Rejoignez l'équipe Bright Academy",
      subtitle:
        "Nous sommes toujours heureux d'échanger avec des coachs qualifiés, du personnel d'accueil et des profils de soutien qui partagent notre approche de la formation des jeunes joueurs. Envoyez-nous vos informations — nous conservons chaque candidature et vous recontactons dès qu'un poste s'ouvre.",
      openings: {
        title: "Postes ouverts",
        none: "Aucun poste ouvert actuellement.",
        noneHint: "Revenez plus tard, ou envoyez-nous vos informations ci-dessous et nous vous recontacterons dès qu'un poste s'ouvre.",
        viewOpening: "Voir le poste",
        apply: "Postuler",
        backToOpenings: "← Tous les postes ouverts",
        deadlineLabel: "Date limite de candidature",
        siteLabel: "Site",
        employmentTypeLabel: "Type de contrat",
        ageGroupLabel: "Tranche d'âge",
        footballFormatLabel: "Format",
        coachingLevelLabel: "Niveau d'encadrement",
        employmentTypeLabels: { full_time: "Temps plein", part_time: "Temps partiel", contract: "Contrat", seasonal: "Saisonnier" },
        descriptionTitle: "À propos de ce poste",
        responsibilitiesTitle: "Responsabilités",
        requiredQualificationsTitle: "Qualifications requises",
        preferredQualificationsTitle: "Qualifications souhaitées",
        requiredExperienceTitle: "Expérience requise",
        skillsTitle: "Compétences requises",
        languagesTitle: "Langues",
        applyTitle: "Postuler pour ce poste",
        notFoundTitle: "Ce poste n'est plus disponible",
        notFoundBody: "Il a peut-être été clôturé ou la date limite est dépassée. Consultez nos autres postes ouverts ci-dessous.",
      },
      whyJoinTitle: "Pourquoi nous rejoindre",
      whyJoin: [
        "Une vraie méthodologie — les cadres Funino et Formino de Horst Wein, pas des exercices improvisés.",
        "Cinq sites d'entraînement à Abidjan et Grand-Bassam.",
        "Un curriculum structuré en quatre piliers, avec une vraie évaluation des joueurs.",
        "Un club qui rivalise — et gagne — sur la scène internationale.",
      ],
      form: {
        title: "Envoyez-nous votre candidature",
        fullName: "Nom complet",
        email: "E-mail",
        phone: "Téléphone (optionnel)",
        positionInterest: "Poste souhaité (optionnel)",
        positionPlaceholder: "ex. Coach, Réceptionniste, Photographe…",
        message: "Message (optionnel)",
        messagePlaceholder: "Parlez-nous un peu de vous et de votre expérience…",
        resumeUrl: "Lien vers votre CV (optionnel)",
        resumeUrlPlaceholder: "https://…",
        resumeUrlInvalid: "Veuillez saisir un lien valide commençant par http:// ou https://, ou laisser ce champ vide.",
        submit: "Envoyer la candidature",
        submitting: "Envoi…",
        success: "Merci — votre candidature a bien été reçue. Nous vous recontacterons si un poste correspond.",
        errorGeneric: "Une erreur est survenue lors de l'envoi de votre candidature. Veuillez réessayer, ou contactez-nous sur WhatsApp.",
      },
    },
    partners: {
      eyebrow: "Partenariat 2026–2027",
      title: "Devenez partenaire de Bright Academy Football Club",
      subtitle: "Construire un club. Accompagner des familles. Préparer les générations qui viennent.",
      intro:
        "Un projet sportif, humain et territorial déjà en activité. Nous cherchons des entreprises qui souhaitent prendre part à sa prochaine étape : le maillot de l'équipe première, le terrain d'Attinguié, notre communauté digitale et les activations les jours de match.",
      ctaPrimary: "Discuter d'un partenariat",
      ctaWhatsapp: "Discuter sur WhatsApp",
      ctaDossier: "Télécharger le dossier de partenariat (PDF)",
      whatsappPrefill: "Bonjour ! J'aimerais en savoir plus sur un partenariat avec Bright Academy Football Club pour la saison 2026–2027.",

      statsTitle: "Bright Academy en bref",
      stats: [
        { value: "600+", label: "joueurs actifs" },
        { value: "5", label: "sites d'entraînement" },
        { value: "7", label: "programmes par âge" },
        { value: "+298 000", label: "abonnements cumulés sur les comptes officiels" },
        { value: "2019", label: "année de fondation" },
        { value: "2025–26", label: "Champions de District, montée en Division Régionale" },
      ],
      statsNote: "De 14 mois à 17 ans · Abidjan et Grand-Bassam · Attinguié",

      sportTitle: "Champions de District",
      sportIntro: "Équipe première, saison 2025–2026, Ligue Abidjan Nord (Division District, Poule D).",
      sportRecord: [
        { value: "11", label: "victoires" },
        { value: "1", label: "défaite" },
        { value: "36", label: "buts marqués" },
        { value: "7", label: "buts encaissés" },
      ],
      timelineTitle: "Une progression",
      timeline: [
        { when: "2025", title: "Surf Cup International", detail: "Maroc · U17 champions, U15 vice-champions" },
        { when: "2025", title: "Abu Dhabi Cup", detail: "Émirats arabes unis · U14 et U16 champions" },
        { when: "Mai 2026", title: "Champions de District", detail: "Montée en Division Régionale" },
        { when: "Fév.–mai 2027", title: "Division Régionale", detail: "Prochaine saison de championnat" },
        { when: "Notre domicile", title: "Attinguié", detail: "Recevoir nos matchs devant notre public" },
        { when: "Ambition", title: "Accéder à la 3e division", detail: "Un objectif, pas une promesse" },
      ],
      timelineNote: "Titres internationaux remportés par les équipes de jeunes de l'académie.",
      objectiveEyebrow: "Objectif",
      objectiveTitle: "Accéder à la 3e division",
      objectiveBody:
        "Notre objectif est de franchir un nouveau cap sportif et d'accéder à la 3e division, devant notre public et sur nos propres infrastructures. Division Régionale, de février à mai 2027 : notre objectif est d'y recevoir nos matchs à Attinguié.",
      objectivePillars: "Performance · Infrastructures · Public · Identité",

      platformTitle: "Plus qu'un logo sur un maillot",
      platformIntro:
        "Un partenariat avec Bright Academy réunit cinq dimensions qui se renforcent : votre marque est vue, elle rejoint une communauté, elle vit dans nos contenus, elle produit un impact, et ce qui est fait est mesuré.",
      dimensions: [
        { n: "01", title: "Visibilité", body: "Maillot et short, panneaux du terrain d'Attinguié dès son aménagement, événements, supports du club." },
        { n: "02", title: "Communauté", body: "Joueurs, parents, familles et communauté locale, sur les terrains comme en ligne." },
        { n: "03", title: "Contenu", body: "TikTok, Instagram, Facebook, WhatsApp et site : matchs, entraînements, coulisses, annonces." },
        { n: "04", title: "Impact", body: "Jeunesse, éducation, familles, développement local, infrastructure." },
      ],
      measureTitle: "05 Mesure",
      measureBody: "Photos · publications · bilan de l'action · rapport de fin de saison",
      activateTitle: "Activer le partenariat",
      activateItems: ["Challenges", "Journées partenaires", "Concours", "Opérations avec les jeunes", "Contenus de marque", "Événements d'entreprise", "Remises de trophées"],
      exampleTitle: "Exemple · Journée partenaire",
      exampleBody:
        "Vos collaborateurs assistent à un entraînement, remettent le trophée du joueur du match ; la journée est publiée sur les comptes du club, puis présentée dans un bilan photo.",

      kitTitle: "Le maillot d'abord.",
      kitIntro:
        "Le club dispose d'un accord de fourniture d'équipements avec Tielo Sport SAS, distributeur officiel PUMA. Les droits d'équipementier sont réservés à cet accord ; aucun droit d'équipementier n'est proposé dans le cadre des présentes offres.",
      placementsTitle: "Emplacements du maillot",
      placementLabels: { front: "Face", back: "Dos", shorts: "Short" },
      placements: [
        { n: 1, label: "Face avant", role: "Partenaire principal" },
        { n: 2, label: "Manche", role: "Sponsor maillot" },
        { n: 3, label: "Dos", role: "Sponsor maillot" },
        { n: 4, label: "Dos bas", role: "Partenaire officiel" },
        { n: 5, label: "Short", role: "Partenaire officiel" },
      ],
      placementsNote: "Conditions et montants sur demande. Sous réserve des droits contractuels existants et de validation du club.",
      thenTitle: "Puis, par ordre d'importance",
      then: [
        { title: "Terrain d'Attinguié", body: "Panneaux et espaces partenaires dès son aménagement." },
        { title: "Digital", body: "Six comptes officiels et www.brightacademyci.com." },
        { title: "Contenu", body: "Matchs, entraînements, coulisses, annonces." },
        { title: "Activations", body: "Jours de match, trophées, journées partenaires." },
      ],
      tailoredNote: "Une proposition sur mesure. Emplacements, contenus et activations se construisent avec chaque entreprise, selon ses objectifs.",

      offersTitle: "Trois façons de prendre part au projet",
      offersIntro: "Saison 2026–2027. Contributions en numéraire ou en nature. Les montants sont communiqués sur demande et lors de la première rencontre.",
      offerGroups: [
        {
          n: "01",
          title: "Partenaires stratégiques",
          items: [
            {
              name: "Partenaire principal",
              tag: "Un seul · Équipe première",
              body: "Face avant du maillot, nom associé au club, présence sur le site et les réseaux. Hospitalité, contenus dédiés, journées partenaires, campagnes de marque.",
            },
            {
              name: "Sponsor maillot",
              tag: "Manche ou dos",
              body: "Logo sur le maillot de match, présence sur le site et les réseaux. Contenus jour de match, challenges.",
            },
            {
              name: "Partenaire officiel",
              tag: "Dos bas ou short",
              body: "Logo sur le maillot de match, page partenaires du site, mention officielle, invitations.",
            },
          ],
        },
        {
          n: "02",
          title: "Partenaires du projet",
          items: [
            { name: "Infrastructure", tag: "Par lot", body: "Un lot du terrain d'Attinguié, plaque sur site, bilan avant / après." },
            { name: "Technique", tag: "En nature", body: "Produits ou services, mention fournisseur officiel, hors équipement sportif." },
            { name: "Performance", tag: "Par saison", body: "Physique, médical, nutrition ; supports d'entraînement, coulisses." },
            { name: "RSE", tag: "Par saison", body: "Programme jeunesse identifié, actions avec vos collaborateurs, bilan." },
          ],
        },
        {
          n: "03",
          title: "Partenaires d'activation",
          items: [
            { name: "Match partner", tag: "Par match", body: "Votre marque associée à une rencontre." },
            { name: "MVP partner", tag: "Par saison", body: "Le trophée du joueur du match à votre nom." },
          ],
        },
      ],
      offersLegalNote:
        "Les contreparties présentées sont indicatives. Leur contenu, leur volume, leur calendrier et les éventuels droits d'exclusivité sont définis dans la convention de partenariat. Aucune offre ne confère de droit sur les joueurs, les transferts ou la gestion sportive du club.",

      useTitle: "Que va permettre votre investissement ?",
      useColumns: [
        { n: "01", title: "Équipe", items: ["Fonctionnement sportif", "Déplacements", "Préparation", "Équipement autorisé"] },
        { n: "02", title: "Infrastructure", items: ["Terrain d'Attinguié", "Nivellement et clôture", "Pelouse", "Équipements"] },
        { n: "03", title: "Impact", items: ["Jeunes", "Formation", "Activités", "Développement local"] },
      ],
      useFlow: ["Convention de partenariat", "Affectation aux actions prévues", "Bilan remis au partenaire"],
      useBody:
        "Les contributions sont encadrées par une convention de partenariat et affectées aux actions prévues dans le cadre de l'accord. Un suivi des actions réalisées peut être communiqué au partenaire sous forme de bilan.",
      founderEyebrow: "Statut",
      founderTitle: "Partenaire fondateur",
      founderIntro: "Accompagner Bright Academy au moment où se construit sa prochaine étape.",
      founderBody:
        "Exemples de droits et avantages, à définir selon le niveau de partenariat et la convention signée : espace dédié aux partenaires fondateurs, priorité de renouvellement, visibilité renforcée, activation dédiée, reconnaissance officielle du soutien.",
      founderNote: "Tout naming, exclusivité ou droit particulier n'est proposé que si les droits sont juridiquement et contractuellement disponibles.",

      projectEyebrow: "Le projet Attinguié",
      projectLead: "Nous ne construisons pas seulement un terrain.",
      projectTitle: "Nous construisons le futur domicile du club.",
      projectBody: [
        "Notre ambition est de faire d'Attinguié le véritable domicile de Bright Academy Football Club : jouer nos matchs de championnat devant notre public, au cœur du village, sur nos propres infrastructures. Objectif : y recevoir nos matchs de Division Régionale dès la saison de février à mai 2027.",
        "Le site, d'environ 1,11 hectare, est mis à disposition du club par convention avec la communauté ; les formalités sont en cours de finalisation. Aire de jeu prévue : 100 m × 60 m.",
      ],
      projectChain: "Un terrain → un domicile → un public → une identité → une ambition sportive",
      projectQuote: "Le club du village doit jouer chez lui.",
      projectQuoteBody:
        "Jouer à Attinguié, c'est permettre aux familles de venir soutenir l'équipe, donner aux jeunes un modèle sportif près de chez eux et faire du terrain un lieu de rassemblement.",
      projectFacts: [
        { value: "1,11 ha", label: "site mis à disposition du club" },
        { value: "100 × 60 m", label: "aire de jeu prévue" },
        { value: "126 M FCFA", label: "investissement global du projet, engagé par phases" },
        { value: "≈ 25 M FCFA", label: "premiers lots de travaux du terrain identifiés, sur devis" },
      ],
      projectFactsNote: "Centre de formation et infrastructures sportives, engagé par phases.",
      doneTitle: "Réalisé",
      done: ["Site délimité", "Plan 100 m × 60 m", "Décapage terminé"],
      nextTitle: "Prochaines étapes",
      next: ["Topographie et bornage", "Nivellement, anciens poteaux", "Clôture en grillage", "Pelouse et irrigation", "Buts, vestiaires, équipements"],
      financialTitle: "Contribution financière",
      financialBody: "Vous financez un lot, chiffré sur devis. Nous le réalisons et vous en rendons compte.",
      inKindTitle: "Contribution en nature",
      inKindBody: "Matériaux, terrassement, clôture, pelouse, transport, main-d'œuvre, équipements, services. Particulièrement adapté au BTP, à l'énergie, aux télécoms, au transport.",

      audienceTitle: "Une communauté qui existe déjà",
      audienceIntro:
        "La communauté digitale cumulée de Bright dépasse 298 000 abonnements, construite sur des contenus publiés chaque semaine : entraînements, matchs, tournois, coulisses.",
      audienceHeaders: { account: "Compte", platform: "Plateforme", audience: "Abonnés" },
      audienceRows: [
        { account: "@brightacademy.ci", platform: "TikTok", audience: "176 600+" },
        { account: "Bright Academy", platform: "Facebook", audience: "77 000+" },
        { account: "@bright.football.club", platform: "TikTok", audience: "16 100+" },
        { account: "@brightacademy_ci", platform: "Instagram", audience: "12 000+" },
        { account: "Chaîne Bright", platform: "WhatsApp", audience: "9 000+" },
        { account: "Bright Football Club", platform: "Facebook", audience: "7 600+" },
      ],
      audienceTotal: "Total cumulé sur les comptes officiels",
      audienceGrandTotal: "298 000+",
      audienceNote:
        "Total des abonnements affichés sur les comptes officiels ; une même personne peut suivre plusieurs comptes. Il ne s'agit pas de personnes uniques. Chiffres évolutifs (octobre 2026).",
      communityTitle: "Qui compose cette communauté",
      communityTags: ["Jeunes", "Parents", "Familles", "Sportifs", "Communauté locale", "Entrepreneurs et entreprises", "Abidjan et Grand-Bassam", "Attinguié"],
      detectionNote: "Détection 2026 : plus de 1 000 jeunes se sont présentés.",

      whyTitle: "Pourquoi Bright Academy ?",
      whySubtitle: "Pas une idée sur papier. Un projet en activité.",
      whyItems: [
        { title: "Un projet déjà en activité", body: "600+ joueurs, 5 sites, 7 programmes, une équipe première en compétition." },
        { title: "Une communauté établie", body: "Des familles, des jeunes et une présence digitale régulière." },
        { title: "Des résultats", body: "Un titre de champion de District, une montée, des titres internationaux chez les jeunes et un premier transfert." },
        { title: "Un projet d'infrastructure", body: "Un terrain en transformation à Attinguié." },
        { title: "Une ambition professionnelle", body: "Construire un club structuré, sans brûler les étapes." },
      ],
      alreadyTitle: "Ils nous accompagnent déjà",
      alreadyName: "Tielo Sport SAS",
      alreadyBody: "Distributeur officiel PUMA. Fournisseur des équipements de l'équipe première.",

      processTitle: "De la première rencontre au bilan de saison",
      process: ["Rencontre", "Proposition sur mesure", "Convention", "Activation", "Bilan"],

      ctaTitle: "Construisons la prochaine étape ensemble.",
      ctaSubtitle:
        "Organisons une rencontre de 30 minutes pour identifier la forme de partenariat la plus pertinente pour votre entreprise.",
      contactName: "Patrick Asseu — Président-Fondateur",
      contactOrg: "Bright Academy Football Club",
      emailLabel: "E-mail",
      closing: ["Le projet existe déjà.", "Les jeunes sont là.", "Les familles sont là.", "La communauté est là.", "Le terrain est en construction."],
    },
    liveBanner: {
      badge: "EN DIRECT",
      heading: "Bright Football Club joue en ce moment",
      vsBadge: "vs",
      cta: "Voir le match en direct",
    },
    firstTeam: {
      eyebrow: "Équipe première",
      title: "Bright Football Club",
      subtitle: "Notre équipe première — le débouché pour nos joueurs les plus avancés.",
      divisionLabel: "Division",
      positionConnector: "de",
      recentFormLabel: "Forme récente",
      formOutcomes: { win: "V", draw: "N", loss: "D" },
      viewFullTable: "Voir le classement complet",
      showLessTable: "Réduire",
      ageSuffix: "ans",
      topScorerLabel: "Meilleur buteur",
      topScorersLabel: "Meilleurs buteurs",
      tabs: { squad: "Effectif", staff: "Staff", fixtures: "Calendrier", gallery: "Galerie", videos: "Vidéos", standings: "Classement" },
      squadTitle: "Effectif",
      provisionalBadge: "Effectif provisoire — susceptible d'évoluer",
      noSquad: "La liste de l'effectif sera bientôt publiée ici.",
      positionFilters: { all: "Tous", gk: "Gardiens", def: "Défenseurs", mid: "Milieux", fwd: "Attaquants", other: "Autres" },
      staffTitle: "Staff technique",
      noStaff: "Le staff technique sera bientôt publié ici.",
      galleryTitle: "Galerie",
      noGallery: "Les photos de l'équipe première seront bientôt publiées ici.",
      backToAlbums: "← Retour aux albums",
      albumPhotoCount: "{count} photos",
      videosTitle: "Vidéos",
      noVideos: "Les vidéos de l'équipe première seront bientôt publiées ici.",
      standingsTitle: "Classement",
      noStandings: "Le classement de la saison sera publié ici une fois final.",
      standingsHeaders: { pos: "Pos", team: "Équipe", played: "J", won: "G", drawn: "N", lost: "P", gf: "BP", ga: "BC", gd: "Diff", pts: "Pts" },
      nextFixture: {
        label: "Prochain match",
        vsBadge: "VS",
        home: "Domicile",
        away: "Extérieur",
        venueTbc: "Lieu à confirmer",
        live: "EN DIRECT",
        watchLive: "Voir en direct",
      },
      fixturesTitle: "Calendrier",
      noFixtures: "Aucun match n'est encore programmé — revenez bientôt.",
      upcomingLabel: "À venir",
      resultsLabel: "Résultats",
      noResults: "Aucun résultat cette saison pour le moment — revenez après le premier match.",
      fullTime: "Fin",
      followTitle: "Suivez le club",
    },
    playerProfile: {
      backToSquad: "Retour à l'effectif",
      notFound: "Ce joueur n'est pas disponible pour le moment.",
      appearancesLabel: "Apparitions",
      goalsLabel: "Buts",
      heightLabel: "Taille",
      recentFormLabel: "Dernières apparitions",
      noAppearances: "Aucune apparition en match terminé enregistrée pour le moment.",
      starterLabel: "Titulaire",
      subLabel: "Remplaçant",
      minutesSuffix: "'",
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
        {
          q: "Combien ça coûte ?",
          // RENAMED 2026-08-16 (Priority 4) — see the English FAQ answer's
          // comment above for the full rationale.
          a: "Les frais mensuels dépendent de l'âge de votre enfant et du nombre de séances par semaine. Notre formule Classique (1 à 2 séances/semaine) démarre à 22 000 XOF/mois et évolue selon l'âge ; notre formule 4 séances par semaine (disponible uniquement au Complexe Sportif de Biafra et au Palais des Sports de Treichville) va de 75 000 à 97 000 XOF/mois. Vous préférez payer à la séance ? Comptez 6 000 à 9 000 XOF selon l'âge, et 20 000 XOF pour un cours particulier. La facturation trimestrielle est proposée à tarif préférentiel, et le tarif exact selon la catégorie d'âge de votre enfant vous est confirmé lors de l'inscription.",
        },
        {
          q: "Y a-t-il des frais d'inscription annuels ?",
          a: "Oui. En plus de la cotisation du programme choisi, des frais d'adhésion annuelle s'appliquent pour la saison sportive (septembre à mai) : 30 000 XOF pour un nouveau joueur, 25 000 XOF pour un joueur qui revient. Deux tenues d'entraînement sont également requises chaque saison (40 000 XOF).",
        },
        {
          // Fixed 2026-08-14 — see the English version's comment above;
          // same contradiction, same fix.
          q: "Peut-on essayer une séance avant de s'inscrire ?",
          a: "Oui — contactez-nous sur WhatsApp ou via le portail d'inscription, et notre équipe vous aidera à organiser une séance d'essai sur le site le plus proche de chez vous avant de vous engager pleinement. La séance d'essai est facturée au tarif normal d'une séance individuelle du programme concerné — elle n'est pas gratuite, et il n'existe pas de tarif d'essai distinct.",
        },
        {
          q: "Quelle est votre politique d'annulation ?",
          a: "Vous pouvez retirer votre enfant à tout moment, par simple notification écrite à l'académie ; le retrait prend effet à la fin du mois de cotisation en cours, sauf accord contraire. Conformément à nos Conditions d'Inscription, les frais d'inscription et cotisations déjà réglés ne sont pas remboursés en cas de retrait volontaire en cours de saison.",
        },
        {
          q: "Comment et quand suis-je facturé ?",
          a: "Une fois l'inscription de votre enfant confirmée, une facture est émise automatiquement chaque mois (ou chaque trimestre, selon la formule choisie). Le paiement se fait en espèces, par Mobile Money ou par virement bancaire, sur l'un de nos sites.",
        },
      ],
    },
    chat: {
      prefill: "Bonjour ! J'aimerais en savoir plus sur l'inscription de mon enfant à Bright Academy.",
      label: "Discuter sur WhatsApp",
    },
    enrollCta: {
      title: "Prêt à inscrire votre enfant ?",
      subtitle: "Les places sont limitées sur chaque site — inscrivez votre enfant dès aujourd'hui.",
      cta: "Inscrire mon enfant",
    },
    footer: {
      tagline: "Plus que du football. Former des joueurs, façonner des avenirs.",
      quickLinks: "Liens rapides",
      whatsapp: "WhatsApp",
      social: "Suivez-nous",
      legal: "Mentions légales",
      legalLinks: {
        privacy: "Politique de confidentialité",
        terms: "Conditions générales",
        enrollmentTerms: "Conditions d'inscription",
        cancellation: "Politique d'annulation et de remboursement",
        safeguarding: "Protection de l'enfant",
        photoConsent: "Consentement photo et vidéo",
      },
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
  youtube: "https://www.youtube.com/@brightacademyCI",
  whatsapp: WHATSAPP_LINK,
};

// The Bright Football Club (Bright Football Club D'Attinguié) first team has
// its own, separate Facebook/TikTok pages from the academy's own accounts
// above — confirmed live via Claude in Chrome against the real pages, not
// guessed at.
export const FIRST_TEAM_SOCIAL = {
  facebook: "https://www.facebook.com/profile.php?id=61574880700943",
  tiktok: "https://www.tiktok.com/@bright.football.club",
};
