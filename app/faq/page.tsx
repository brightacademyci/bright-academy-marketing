import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { FAQ } from "@/components/FAQ";
import { EnrollCta } from "@/components/EnrollCta";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SITE_URL } from "@/lib/content";

// Added 2026-08-13, site improvement pass, Priority 6 — the homepage's FAQ
// section now shows only the top 6 questions (see app/page.tsx's
// FAQ limit prop); this is the full list it links out to.
const TITLE = "FAQ — Bright Academy";
const DESCRIPTION = "Toutes les questions que les parents nous posent — âges, tarifs, sites, séances d'essai, inscription et plus.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/faq",
  // Self-referencing hreflang, added 2026-08-21 -- matches app/layout.tsx's
  // homepage stub and the same reasoning: this is a client-side language
  // toggle with no per-URL routing, so there's no distinct French/English
  // URL to point hreflang at. Real per-language alternates need the kind
  // of URL-based locale routing flagged as out of scope for this pass --
  // this stub is strictly better than omitting hreflang entirely, not a
  // substitute for real routing.
    languages: { fr: "/faq", en: "/faq", "x-default": "/faq" },
  },
  // Added 2026-08-20 -- see first-team/page.tsx's comment on why every
  // page needs its own openGraph block rather than inheriting layout.tsx's.
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/faq`,
    images: [{ url: "/images/og/social-share.jpg", width: 1200, height: 630 }],
    type: "website",
  },
};

export default function FAQPage() {
  return (
    <main>
      <Header />
      <FAQ asH1 />
      <EnrollCta />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
