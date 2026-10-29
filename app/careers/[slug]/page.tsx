import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { JobOpeningSection } from "@/components/JobOpeningSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getJobOpening } from "@/lib/api";
import { SITE_URL } from "@/lib/content";
import { shareImage } from "@/lib/metadata";

// Every job opening shares the Careers image ("Rejoignez notre équipe").
const CAREERS_SHARE_IMAGE = { path: "/images/og/careers.jpg", alt: "Rejoignez notre équipe — Bright Academy" };

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Master CTO Instruction, Recruitment/Careers Production Launch, Phase 3.
// Same shape as app/news/[id]/page.tsx: fetch server-side, build metadata
// from what came back, fall back to generic copy when the slug doesn't
// resolve to a published, non-expired opening (bright-academy-os's
// GET /api/public/openings/[slug] already enforces that -- this page
// never re-checks it, it only ever renders what the endpoint returns).
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const opening = await getJobOpening(slug);
  const title = opening ? `${opening.titleFr} — Bright Academy` : "Carrières — Bright Academy";
  const description = opening?.descriptionFr?.slice(0, 160);
  return {
    title,
    ...(description ? { description } : {}),
    alternates: {
      canonical: `/careers/${slug}`,
      // Self-referencing hreflang stub -- see app/news/[id]/page.tsx's
      // comment for why (client-side language toggle, no per-URL routing).
      languages: { fr: `/careers/${slug}`, en: `/careers/${slug}`, "x-default": `/careers/${slug}` },
    },
    openGraph: {
      title,
      ...(description ? { description } : {}),
      url: `${SITE_URL}/careers/${slug}`,
      images: [shareImage(CAREERS_SHARE_IMAGE)],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      ...(description ? { description } : {}),
      images: [CAREERS_SHARE_IMAGE.path],
    },
  };
}

export default async function JobOpeningPage({ params }: PageProps) {
  const { slug } = await params;
  const opening = await getJobOpening(slug);

  return (
    <main>
      <Header />
      <JobOpeningSection opening={opening} />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
