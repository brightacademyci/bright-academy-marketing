import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Founder } from "@/components/Founder";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { buildPageMetadata } from "@/lib/metadata";

// Dedicated founder/story page — added 2026-08-30, homepage-length audit
// fix. The homepage used to render Founder's full bio and a separate
// Philosophy pull-quote back-to-back, which is what the audit flagged as
// the real redundancy on an ~13-screen homepage. That full content
// (unchanged from what Patrick approved before, with the former Philosophy
// section now folded in as a closing note — see Founder.tsx) now lives
// here; the homepage keeps a short teaser (FounderTeaser.tsx) linking to
// this page. Same teaser-plus-dedicated-page pattern already used for
// Gallery/Videos/News.
export const metadata: Metadata = buildPageMetadata({
  path: "/founder",
  title: "Rencontrer le fondateur — Bright Academy",
  description:
    "Patrick Asaiah Asseu a fondé Bright Academy autour d'une conviction simple : le football doit former de meilleures personnes, pas seulement de meilleurs joueurs.",
});

export default function FounderPage() {
  return (
    <main>
      <Header />
      <Founder />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
