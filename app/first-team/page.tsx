import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { FirstTeamSection } from "@/components/FirstTeamSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getFirstTeam } from "@/lib/api";
import { buildPageMetadata } from "@/lib/metadata";

// French default 2026-08-13 (Priority 8) — see careers/page.tsx's note.
// Open Graph note (2026-08-20): every page used to inherit the homepage's
// Open Graph block (Next doesn't deep-merge it), so sharing any of these
// links on social showed the homepage's title/description instead of the
// page's own — buildPageMetadata() gives each page its own by default.
export const metadata: Metadata = buildPageMetadata({
  path: "/first-team",
  title: "Équipe première — Bright Academy",
  description: "Bright Football Club D'Attinguié — l'équipe première de Bright Academy : effectif, résultats de la saison et classement.",
});

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
