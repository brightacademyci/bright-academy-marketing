import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { FOOTER_SOCIAL } from "@/lib/content";

// Update once the marketing site takes over the root domain (see README's
// domain-restructuring plan) — this drives canonical URLs and OG tags.
const SITE_URL = "https://brightacademyci.com";
const TITLE = "Bright Academy — Football Academy in Abidjan & Grand-Bassam";
const DESCRIPTION =
  "A structured football academy for children from 14 months to 17 years old, across 5 sites in Abidjan and Grand-Bassam, Côte d'Ivoire. Real curriculum, qualified coaches, international results.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "football academy Abidjan",
    "académie de football Abidjan",
    "youth football Côte d'Ivoire",
    "Bright Academy",
    "kids soccer training Abidjan",
    "Grand-Bassam football",
  ],
  icons: { icon: "/logo/crest.png", apple: "/logo/crest.png" },
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Bright Academy",
    images: [{ url: "/images/og/social-share.jpg", width: 1200, height: 630, alt: "Bright Academy players celebrating a tournament win" }],
    locale: "en_US",
    alternateLocale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og/social-share.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#113e6f",
};

// Structured data (schema.org) — helps Google understand this is a real
// youth-sports organization with multiple locations, not just a generic
// page. Doesn't render anything visible; just sits in <head> for crawlers.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: "Bright Academy",
  description: DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/logo/crest.png`,
  image: `${SITE_URL}/images/og/social-share.jpg`,
  sport: "Football",
  // Confirms to search engines / Google's Knowledge Graph that these
  // profiles and this site describe the same real-world organization.
  sameAs: [FOOTER_SOCIAL.facebook, FOOTER_SOCIAL.instagram, FOOTER_SOCIAL.tiktok],
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
    availableLanguage: ["English", "French"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
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
