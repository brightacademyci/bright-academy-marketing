import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { CareersSection } from "@/components/CareersSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SITE_URL } from "@/lib/content";

// Titles/descriptions switched to French 2026-08-13 (Priority 8) to match
// this site's default rendered language — same reasoning as layout.tsx.
const TITLE = "Carrières — Bright Academy";
const DESCRIPTION = "Rejoignez l'équipe Bright Academy — coachs, personnel d'accueil et profils de soutien sur nos sites à Abidjan et Grand-Bassam.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/careers",
  // Self-referencing hreflang, added 2026-08-21 -- matches app/layout.tsx's
  // homepage stub and the same reasoning: this is a client-side language
  // toggle with no per-URL routing, so there's no distinct French/English
  // URL to point hreflang at. Real per-language alternates need the kind
  // of URL-based locale routing flagged as out of scope for this pass --
  // this stub is strictly better than omitting hreflang entirely, not a
  // substitute for real routing.
    languages: { fr: "/careers", en: "/careers", "x-default": "/careers" },
  },
  // Added 2026-08-20 -- see first-team/page.tsx's comment on why every
  // page needs its own openGraph block rather than inheriting layout.tsx's.
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/careers`,
    images: [{ url: "/images/og/social-share.jpg", width: 1200, height: 630 }],
    type: "website",
  },
};

export default function CareersPage() {
  return (
    <main>
      <Header />
      <CareersSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
