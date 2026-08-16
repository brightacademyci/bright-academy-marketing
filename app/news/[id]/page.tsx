import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { NewsPostSection } from "@/components/NewsPostSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getNewsPost } from "@/lib/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  // Fetches the French post for metadata 2026-08-13 (Priority 8) — matches
  // this site's default rendered language, was hardcoded "en" before.
  const post = await getNewsPost(id, "fr");
  return {
    title: post ? `${post.title} — Bright Academy` : "Actualités — Bright Academy",
    description: post?.body?.slice(0, 160),
    alternates: { canonical: `/news/${id}` },
  };
}

export default async function NewsPostPage({ params }: PageProps) {
  const { id } = await params;
  const [postEn, postFr] = await Promise.all([getNewsPost(id, "en"), getNewsPost(id, "fr")]);

  return (
    <main>
      <Header />
      <NewsPostSection postEn={postEn} postFr={postFr} />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
