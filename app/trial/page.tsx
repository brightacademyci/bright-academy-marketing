import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { TrialSection } from "@/components/TrialSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SITE_URL } from "@/lib/content";

const TITLE = "Demander une séance d'essai — Bright Academy";
const DESCRIPTION =
  "Réservez une séance d'essai payante pour votre enfant sur l'un de nos cinq sites à Abidjan et Grand-Bassam — votre demande est transmise directement à l'équipe du site.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/trial" },
  // Added 2026-08-20 -- see first-team/page.tsx's comment on why every
  // page needs its own openGraph block rather than inheriting layout.tsx's.
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/trial`,
    images: [{ url: "/images/og/social-share.jpg", width: 1200, height: 630 }],
    type: "website",
  },
};

export default function TrialPage() {
  return (
    <main>
      <Header />
      <TrialSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
