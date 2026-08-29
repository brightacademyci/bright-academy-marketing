import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { TrialSection } from "@/components/TrialSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/trial",
  title: "Demander une séance d'essai — Bright Academy",
  description:
    "Réservez une séance d'essai payante pour votre enfant sur l'un de nos cinq sites à Abidjan et Grand-Bassam — votre demande est transmise directement à l'équipe du site.",
});

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
