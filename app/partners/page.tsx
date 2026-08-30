import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PartnersSection } from "@/components/PartnersSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { buildPageMetadata } from "@/lib/metadata";

// Corporate-partnership page — added 2026-08-30. See PartnersSection.tsx
// and its dict block in lib/content.ts for the full provenance note (this
// is a web adaptation of the club's sponsorship dossier, not a straight
// republish of it).
export const metadata: Metadata = buildPageMetadata({
  path: "/partners",
  title: "Devenez partenaire — Bright Academy",
  description: "Devenez partenaire fondateur du projet Attinguié : accompagnez la formation, l'éducation et l'insertion de 25 jeunes footballeurs ivoiriens.",
});

export default function PartnersPage() {
  return (
    <main>
      <Header />
      <PartnersSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
