import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { FOOTER_SOCIAL, SITE_URL } from "@/lib/content";

// CORRECTED 2026-08-14 (Google-indexing follow-up): this was pointed at
// the apex (non-www) domain, on the assumption (stated in the old version
// of this comment) that "next.config.js redirects www → this host." That
// was backwards, and the actual redirect direction changed since this
// comment was written: Vercel's own platform-level domain config redirects
// the APEX to www (see next.config.js's own note on the reverted www→apex
// rule that caused an infinite-redirect-loop incident) — confirmed
// directly in Google Search Console too, where the apex URL inspected as
// "Page with redirect" (not indexed) while www inspected as "Page is
// indexed." So this file, sitemap.ts, and robots.ts were all telling
// Google the canonical URL is a page that immediately redirects away —
// a self-contradicting signal that's the likely reason Google kept
// serving a stale cached title/description even after re-crawls and
// repeated "Request Indexing" clicks. www is the real, live, indexed
// domain — this now matches sitemap.ts/robots.ts, which were fixed the
// same pass.
// CENTRALISED 2026-08-16 (audit-corrections pass, Priority 1): now
// imported from lib/content.ts's single source of truth instead of a
// locally-duplicated copy — see that file's own comment for the full
// apex-vs-www history.

// Corrected 2026-08-13, site improvement pass, Priority 8: an external
// review found the visible homepage in French (LanguageProvider's default)
// while every metadata field here — title, description, OG/Twitter tags,
// og:locale — was English-only, and <html lang> was hardcoded "en" too
// (see LanguageProvider.tsx for that half of the fix). Since this is a
// single-URL site with a client-side language toggle (no /fr, /en routes),
// there's no request-time signal a server component could use to pick a
// language for the very first response — so default metadata now matches
// what's actually the *default rendered language*, French, using Patrick's
// approved copy. True per-language metadata (and real hreflang alternates,
// which need distinct URLs per Google's own guidance — self-referencing
// hreflang on one shared URL is a degraded approximation, included below
// only because it's strictly better than omitting it entirely) would
// require the kind of URL-based locale routing this pass was scoped not to
// rebuild — flagged as a "remaining recommendation" in the delivery
// summary rather than done silently here.
// CORRECTED 2026-08-14, second site improvement pass — "encadrement
// qualifié" / "qualified coaching" was an unverified credential claim
// (Priority 9), directly conflicting with this same brief's Priority 13
// requirement to publish this copy verbatim. Patrick resolved the
// conflict in favor of Priority 9: swapped for the four-pillar curriculum
// claim, which IS verified elsewhere on the site (see the Approach
// section — every player is evaluated across four pillars). Same length/
// keyword structure preserved for SEO continuity.
// CHANGED again per Patrick's explicit instruction (2026-08-16-ish): the
// title itself should read plainly "Bright Academy Côte d'Ivoire" — no
// keyword-rich suffix. Same value for both languages since it's just the
// brand name + country, nothing to translate. DESCRIPTION/DESCRIPTION_EN
// (the part that still carries the "football academy Abidjan" keywords
// for search) were deliberately left untouched — only the title changed.
// CHANGED AGAIN per Patrick's explicit instruction (2026-08-16, SEO/social
// follow-up): "Côte d'Ivoire" spelled out → "CI", matching how the brand
// is already written everywhere else that isn't this title — the Google
// Business Profile name ("Bright Academy CI"), the Instagram handle
// (@brightacademy_ci), the TikTok handle (@bright_academy.ci), and the
// Facebook page name ("Bright Academy CI"). This makes the browser-tab/
// search-result/social-share title consistent with those, instead of the
// odd one out. DESCRIPTION/DESCRIPTION_EN untouched again — same reasoning
// as the entry above, only the title changed.
const TITLE = "Bright Academy CI";
const DESCRIPTION =
  "Bright Academy propose une formation structurée pour les enfants de 14 mois à 17 ans sur cinq sites à Abidjan et Grand-Bassam. Programmes adaptés à chaque âge, curriculum en quatre piliers et résultats internationaux.";
const TITLE_EN = "Bright Academy CI";
const DESCRIPTION_EN =
  "Structured football development for children aged 14 months to 17 years across five locations in Abidjan and Grand-Bassam, with age-specific programmes, a four-pillar curriculum, and international results.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "académie de football Abidjan",
    "football academy Abidjan",
    "youth football Côte d'Ivoire",
    "Bright Academy",
    "kids soccer training Abidjan",
    "Grand-Bassam football",
  ],
  // Fixed 2026-08-13, Priority 9 (Lighthouse pass): these pointed straight
  // at the 1382×1354, 210KB master crest file — the browser fetches
  // favicon/apple-touch-icon at full size regardless of how small it's
  // displayed, so this was 210KB spent on a 16–180px icon on every page
  // load. public/logo/crest-icon-180.png is the same image, losslessly
  // resized to the standard 180×180 apple-touch-icon size (32KB, an ~85%
  // reduction). The full-res original is untouched and still used for
  // Header/Footer (via next/image, which right-sizes those on its own) and
  // for structuredData.logo below, where a higher-res asset is normal.
  icons: { icon: "/logo/crest-icon-180.png", apple: "/logo/crest-icon-180.png" },
  alternates: {
    canonical: "/",
    // Self-referencing on purpose (see comment above) — both language
    // codes point at the same URL because the language is chosen
    // client-side, not by route. x-default matches the default language.
    languages: { fr: "/", en: "/", "x-default": "/" },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Bright Academy",
    images: [{ url: "/images/og/social-share.jpg", width: 1200, height: 630, alt: "Joueurs de Bright Academy célébrant une victoire en tournoi" }],
    locale: "fr_FR",
    alternateLocale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og/social-share.jpg"],
  },
  // English-language metadata isn't reachable via a distinct URL today (see
  // comment above) so it can't go in `alternates.languages` as its own
  // entry — kept here in-source so it stays discoverable/reusable the
  // moment this site gets real /en routing.
  other: { "translated-title-en": TITLE_EN, "translated-description-en": DESCRIPTION_EN },
};

export const viewport: Viewport = {
  themeColor: "#113e6f",
};

// Structured data (schema.org) — helps Google understand this is a real
// youth-sports organization with multiple locations, not just a generic
// page. Doesn't render anything visible; just sits in <head> for crawlers.
// inLanguage added 2026-08-13 (Priority 8) — matches the default rendered
// language, same reasoning as the metadata above.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: "Bright Academy",
  description: DESCRIPTION,
  inLanguage: "fr",
  url: SITE_URL,
  logo: `${SITE_URL}/logo/crest.png`,
  image: `${SITE_URL}/images/og/social-share.jpg`,
  sport: "Football",
  // Confirms to search engines / Google's Knowledge Graph that these
  // profiles and this site describe the same real-world organization.
  sameAs: [FOOTER_SOCIAL.facebook, FOOTER_SOCIAL.instagram, FOOTER_SOCIAL.tiktok, FOOTER_SOCIAL.youtube],
  areaServed: {
    "@type": "City",
    name: "Abidjan",
    containsPlace: { "@type": "City", name: "Grand-Bassam" },
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abidjan",
    addressCountry: "CI",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+225-07-16-47-86-25",
    availableLanguage: ["French", "English"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // "fr" matches LanguageProvider's default (and what's actually
    // server-rendered below it) — was hardcoded "en" regardless of
    // language, the exact mismatch an external review flagged. Kept in
    // sync client-side on toggle by LanguageProvider's own effect.
    <html lang="fr">
      <body className="antialiased">
        <a
          href="#top"
          className="fixed left-3 top-3 z-[100] -translate-y-20 rounded-full bg-orange px-4 py-2 text-[13px] font-semibold text-navy-deep transition focus:translate-y-0"
        >
          Aller au contenu · Skip to content
        </a>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
