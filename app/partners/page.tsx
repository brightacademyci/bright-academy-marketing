import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PartnersSection } from "@/components/PartnersSection";
import { PartnerDetailProvider } from "@/components/PartnerDetailProvider";
import { PartnerDetailDialog } from "@/components/PartnerDetailDialog";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { buildPageMetadata } from "@/lib/metadata";

// Corporate-partnership page — added 2026-08-30, rewritten Oct 2026 from the
// club's "Dossier de Partenariat 2026-2027" (jersey placements, offers,
// Attinguié pitch). See PartnersSection.tsx and its dict block in
// lib/content.ts: a web adaptation, with no FCFA amounts shown.
export const metadata: Metadata = buildPageMetadata({
  path: "/partners",
  title: "Devenez partenaire — Bright Academy",
  description: "Sponsoring du maillot, partenariat projet Attinguié et activations : découvrez les offres de partenariat 2026–2027 de Bright Academy Football Club.",
});

export default function PartnersPage() {
  return (
    <main>
      <Header />
      <PartnerDetailProvider>
        <PartnersSection />
        <PartnerDetailDialog />
      </PartnerDetailProvider>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
