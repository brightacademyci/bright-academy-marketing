import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { CareersSection } from "@/components/CareersSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { buildPageMetadata } from "@/lib/metadata";
import { getJobOpenings } from "@/lib/api";

// Titles/descriptions switched to French 2026-08-13 (Priority 8) to match
// this site's default rendered language — same reasoning as layout.tsx.
export const metadata: Metadata = buildPageMetadata({
  path: "/careers",
  title: "Carrières — Bright Academy",
  description: "Rejoignez l'équipe Bright Academy — coachs, personnel d'accueil et profils de soutien sur nos sites à Abidjan et Grand-Bassam.",
});

export default async function CareersPage() {
  // Master CTO Instruction, Recruitment/Careers Production Launch, Phase 3
  // -- fetched here (Server Component) rather than in the client
  // CareersSection, same split as every other list/detail pair on this
  // site (see app/news/page.tsx). getJobOpenings() already only ever
  // returns what bright-academy-os's own published+deadline-filtered
  // endpoint returns; this page never re-filters it.
  const openings = await getJobOpenings();

  return (
    <main>
      <Header />
      <CareersSection openings={openings} />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
