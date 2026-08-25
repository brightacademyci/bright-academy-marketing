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
      contact: "Contact",
      // Was "Parent / Staff Login" — dropped "/ Staff" 2026-08-13, Patrick's
      // explicit instruction: staff shouldn't be advertised a login path on
      // the public site at all, they get their own direct access link
      // instead. LOGIN_URL itself is unchanged (same portal, same page) —
      // this is copy-only, not an access change.
      login: "Parent Login",
      enroll: "Enroll Now",
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
    // Added 2026-08-25, Patrick's follow-up to the photo gallery ask — a
    // video option "on the website both for the first team and for the
    // academy." Mirrors gallery's eyebrow/title shape exactly; see
    // components/Videos.tsx.
    videos: {
      eyebrow: "Videos",
      title: "Watch Bright Academy",
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
      readMore: "Read more →",
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
        submit: "Submit application",
        submitting: "Submitting…",
        success: "Thank you — your application has been received. We'll be in touch if a role fits.",
        errorGeneric: "Something went wrong submitting your application. Please try again, or reach us on WhatsApp.",
      },
    },
    firstTeam: {
      eyebrow: "First Team",
      title: "Bright Football Club",
      subtitle: "Our senior/first team — the pathway for our most advanced players.",
      divisionLabel: "Division",
      tabs: { squad: "Squad", staff: "Staff", fixtures: "Fixtures", gallery: "Gallery", videos: "Videos", standings: "Standings" },
      squadTitle: "Squad",
      provisionalBadge: "Provisional squad — subject to change",
      noSquad: "The squad list will be posted here soon.",
      positionFilters: { all: "All", gk: "Goalkeepers", def: "Defenders", mid: "Midfielders", fwd: "Forwards", other: "Other" },
      staffTitle: "Coaching Staff",
      noStaff: "The coaching staff will be posted here soon.",
      galleryTitle: "Gallery",
      noGallery: "Photos from the First Team will be posted here soon.",
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
      },
      fixturesTitle: "Fixtures",
      noFixtures: "No matches are on the calendar yet — check back soon.",
      followTitle: "Follow the club",
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
      contact: "Contact",
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
      contact: "Contact",
      login: "Connexion parent",
      enroll: "Inscrire mon enfant",
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
    videos: {
      eyebrow: "Vidéos",
      title: "Regardez Bright Academy",
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
      readMore: "Lire la suite →",
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
        submit: "Envoyer la candidature",
        submitting: "Envoi…",
        success: "Merci — votre candidature a bien été reçue. Nous vous recontacterons si un poste correspond.",
        errorGeneric: "Une erreur est survenue lors de l'envoi de votre candidature. Veuillez réessayer, ou contactez-nous sur WhatsApp.",
      },
    },
    firstTeam: {
      eyebrow: "Équipe première",
      title: "Bright Football Club",
      subtitle: "Notre équipe première — le débouché pour nos joueurs les plus avancés.",
      divisionLabel: "Division",
      tabs: { squad: "Effectif", staff: "Staff", fixtures: "Calendrier", gallery: "Galerie", videos: "Vidéos", standings: "Classement" },
      squadTitle: "Effectif",
      provisionalBadge: "Effectif provisoire — susceptible d'évoluer",
      noSquad: "La liste de l'effectif sera bientôt publiée ici.",
      positionFilters: { all: "Tous", gk: "Gardiens", def: "Défenseurs", mid: "Milieux", fwd: "Attaquants", other: "Autres" },
      staffTitle: "Staff technique",
      noStaff: "Le staff technique sera bientôt publié ici.",
      galleryTitle: "Galerie",
      noGallery: "Les photos de l'équipe première seront bientôt publiées ici.",
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
      },
      fixturesTitle: "Calendrier",
      noFixtures: "Aucun match n'est encore programmé — revenez bientôt.",
      followTitle: "Suivez le club",
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
      contact: "Contact",
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
