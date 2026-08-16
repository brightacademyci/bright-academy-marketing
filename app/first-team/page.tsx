import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { FirstTeamSection } from "@/components/FirstTeamSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getFirstTeam } from "@/lib/api";

// French default 2026-08-13 (Priority 8) — see careers/page.tsx's note.
export const metadata: Metadata = {
  title: "Équipe première — Bright Academy",
  description: "Bright Football Club D'Attinguié — l'équipe première de Bright Academy : effectif, résultats de la saison et classement.",
  alternates: { canonical: "/first-team" },
};

export default async function FirstTeamPage() {
  const [teamEn, teamFr] = await Promise.all([getFirstTeam("en"), getFirstTeam("fr")]);

  return (
    <main>
      <Header />
      <FirstTeamSection teamEn={teamEn} teamFr={teamFr} />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
