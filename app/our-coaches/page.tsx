import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { OurCoachesSection } from "@/components/OurCoachesSection";
import { EnrollCta } from "@/components/EnrollCta";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getCoaches } from "@/lib/api";

// French default 2026-08-13 (Priority 8) — see careers/page.tsx's note.
// CORRECTED 2026-08-16 (audit-corrections pass, Priority 14) — two fixes:
// (1) "staff technique qualifié" ("qualified technical staff") was an
// unverified credential claim, the same class of issue already resolved
// on the homepage (see layout.tsx's own 2026-08-14 comment, which swapped
// "encadrement qualifié" for the four-pillar curriculum claim instead) —
// this page had the identical wording but was missed in that earlier
// pass since it's a separate route. Swapped for neutral, verifiable
// copy. (2) This page (and /news) currently render their empty state —
// the OS app's public coaches/news API both return zero entries as of
// this pass (see sitemap.ts's own note on why these two routes are
// deliberately omitted from the sitemap) — so both are now explicitly
// noindexed until real content is published, rather than letting Google
// index a thin/placeholder page.
export const metadata: Metadata = {
  title: "Nos entraîneurs — Bright Academy",
  description: "Découvrez le staff de Bright Academy, sur nos sites d'entraînement à Abidjan et Grand-Bassam.",
  alternates: { canonical: "/our-coaches" },
  robots: { index: false, follow: true },
};

export default async function OurCoachesPage() {
  const [coachesEn, coachesFr] = await Promise.all([getCoaches("en"), getCoaches("fr")]);

  return (
    <main>
      <Header />
      <OurCoachesSection coachesEn={coachesEn} coachesFr={coachesFr} />
      <EnrollCta />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
