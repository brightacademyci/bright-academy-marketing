import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { NewsListSection } from "@/components/NewsListSection";
import { EnrollCta } from "@/components/EnrollCta";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getNewsPosts } from "@/lib/api";
import { buildPageMetadata } from "@/lib/metadata";

// French default 2026-08-13 (Priority 8) — see careers/page.tsx's note.
// Was noindexed 2026-08-16 while the OS app's public news API returned
// zero entries (a thin/placeholder page shouldn't be indexed). Indexing
// re-enabled 2026-09-30 now that a real article is published; the route
// is also linked from the header and listed in sitemap.ts.
export const metadata: Metadata = buildPageMetadata({
  path: "/news",
  title: "Actualités — Bright Academy",
  description: "Annonces, résultats et actualités de Bright Academy.",
});

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
