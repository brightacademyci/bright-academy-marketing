import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { CareersSection } from "@/components/CareersSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Titles/descriptions switched to French 2026-08-13 (Priority 8) to match
// this site's default rendered language — same reasoning as layout.tsx.
export const metadata: Metadata = {
  title: "Carrières — Bright Academy",
  description: "Rejoignez l'équipe Bright Academy — coachs, personnel d'accueil et profils de soutien sur nos sites à Abidjan et Grand-Bassam.",
  alternates: { canonical: "/careers" },
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
