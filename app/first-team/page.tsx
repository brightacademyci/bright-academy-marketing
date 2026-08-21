import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { FirstTeamSection } from "@/components/FirstTeamSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getFirstTeam } from "@/lib/api";
import { SITE_URL } from "@/lib/content";

// French default 2026-08-13 (Priority 8) — see careers/page.tsx's note.
const TITLE = "Équipe première — Bright Academy";
const DESCRIPTION = "Bright Football Club D'Attinguié — l'équipe première de Bright Academy : effectif, résultats de la saison et classement.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/first-team" },
  // Added 2026-08-20 -- every page inherited the homepage's Open Graph
  // block (Next doesn't deep-merge it), so sharing any of these links on
  // social showed the homepage's title/description instead of the page's
  // own. Each page now sets its own.
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/first-team`,
    images: [{ url: "/images/og/social-share.jpg", width: 1200, height: 630 }],
    type: "website",
  },
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
