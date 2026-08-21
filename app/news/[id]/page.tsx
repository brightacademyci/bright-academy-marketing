import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { NewsPostSection } from "@/components/NewsPostSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getNewsPost } from "@/lib/api";
import { SITE_URL } from "@/lib/content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  // Fetches the French post for metadata 2026-08-13 (Priority 8) — matches
  // this site's default rendered language, was hardcoded "en" before.
  const post = await getNewsPost(id, "fr");
  const title = post ? `${post.title} — Bright Academy` : "Actualités — Bright Academy";
  const description = post?.body?.slice(0, 160);
  const ogImage = post?.coverImageUrl || "/images/og/social-share.jpg";
  return {
    title,
    description,
    alternates: {
      canonical: `/news/${id}`,
      // Self-referencing hreflang, added 2026-08-21 -- matches app/layout.tsx's
      // homepage stub and the same reasoning: this is a client-side language
      // toggle with no per-URL routing, so there's no distinct French/English
      // URL to point hreflang at. Real per-language alternates need the kind
      // of URL-based locale routing flagged as out of scope for this pass --
      // this stub is strictly better than omitting hreflang entirely, not a
      // substitute for real routing.
      languages: { fr: `/news/${id}`, en: `/news/${id}`, "x-default": `/news/${id}` },
    },
    // Added 2026-08-20 -- see first-team/page.tsx's comment on why every
    // page needs its own openGraph block. Uses the article's own cover
    // image when it has one, same fallback the site-wide image otherwise.
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/news/${id}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "article",
    },
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
