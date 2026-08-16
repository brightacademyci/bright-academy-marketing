import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { NewsListSection } from "@/components/NewsListSection";
import { EnrollCta } from "@/components/EnrollCta";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getNewsPosts } from "@/lib/api";

// French default 2026-08-13 (Priority 8) — see careers/page.tsx's note.
// CORRECTED 2026-08-16 (audit-corrections pass, Priority 14) — this page
// currently renders its empty state (the OS app's public news API returns
// zero entries as of this pass, same as /our-coaches — see sitemap.ts's
// own note on why both routes are deliberately omitted from the
// sitemap), so it's now explicitly noindexed until real content exists,
// rather than letting Google index a thin/placeholder page.
export const metadata: Metadata = {
  title: "Actualités — Bright Academy",
  description: "Annonces, résultats et actualités de Bright Academy.",
  alternates: { canonical: "/news" },
  robots: { index: false, follow: true },
};

export default async function NewsPage() {
  const [postsEn, postsFr] = await Promise.all([getNewsPosts("en"), getNewsPosts("fr")]);

  return (
    <main>
      <Header />
      <NewsListSection postsEn={postsEn} postsFr={postsFr} />
      <EnrollCta />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
