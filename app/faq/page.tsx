import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { FAQ } from "@/components/FAQ";
import { EnrollCta } from "@/components/EnrollCta";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Added 2026-08-13, site improvement pass, Priority 6 — the homepage's FAQ
// section now shows only the top 6 questions (see app/page.tsx's
// FAQ limit prop); this is the full list it links out to.
export const metadata: Metadata = {
  title: "FAQ — Bright Academy",
  description: "Toutes les questions que les parents nous posent — âges, tarifs, sites, séances d'essai, inscription et plus.",
  alternates: { canonical: "/faq" },
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
