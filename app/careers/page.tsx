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
  alternates: { canonical: "/careers" },
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
