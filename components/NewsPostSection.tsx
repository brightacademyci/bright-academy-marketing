"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { PitchDiagram } from "./PitchDiagram";
import type { PublicNewsPost } from "@/lib/api";

function formatDate(iso: string, lang: "en" | "fr") {
  try {
    return new Date(iso).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return iso;
  }
}

/** Single post detail — same bilingual-props pattern as NewsListSection,
 *  both language variants fetched server-side (app/news/[id]/page.tsx).
 *  Either can be null (post doesn't exist, or exists but isn't published —
 *  see getPublicNewsPost()'s own published-only contract on the OS side),
 *  in which case the whole page renders the same not-found copy regardless
 *  of which language the visitor is on. */
export function NewsPostSection({ postEn, postFr }: { postEn: PublicNewsPost | null; postFr: PublicNewsPost | null }) {
  const { lang, t } = useLanguage();
  const post = useMemo(() => (lang === "fr" ? postFr : postEn), [lang, postEn, postFr]);

  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      <PitchDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <div className="relative mx-auto max-w-content px-5">
        <Reveal>
          <Link href="/news" className="text-[13px] font-medium text-white/70 hover:text-orange">
            {t.news.backToNews}
          </Link>
        </Reveal>

        {!post ? (
          <p className="mt-8 text-[14px] text-white/70">{t.news.notFound}</p>
        ) : (
          <Reveal className="mt-6 max-w-3xl" delay={80}>
            {post.coverImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.coverImageUrl} alt={post.title} className="w-full rounded-2xl object-cover ring-1 ring-white/10" />
            )}
            <p className="mt-6 text-[12px] font-medium text-white/50">{formatDate(post.publishedAt, lang)}</p>
            <h1 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{post.title}</h1>
            <div className="mt-5 space-y-4 text-[14px] leading-relaxed text-white/80">
              {post.body.split("\n").map((paragraph, i) => (paragraph.trim() ? <p key={i}>{paragraph}</p> : null))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
