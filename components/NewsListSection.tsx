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

/** Same bilingual-props pattern as OurCoachesSection — both language
 *  variants fetched server-side (app/news/page.tsx), picked here via
 *  useLanguage(). */
export function NewsListSection({ postsEn, postsFr }: { postsEn: PublicNewsPost[]; postsFr: PublicNewsPost[] }) {
  const { lang, t } = useLanguage();
  const posts = useMemo(() => (lang === "fr" ? postsFr : postsEn), [lang, postsEn, postsFr]);

  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      <PitchDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <div className="relative mx-auto max-w-content px-5">
        <Reveal className="max-w-2xl">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.news.eyebrow}</span>
          <h1 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{t.news.title}</h1>
          <p className="mt-3 text-[14px] text-white/70">{t.news.subtitle}</p>
        </Reveal>

        {posts.length === 0 ? (
          <p className="mt-10 text-[13px] text-white/60">{t.news.none}</p>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={i * 60}>
                <Link
                  href={`/news/${post.id}`}
                  className="flex h-full flex-col overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:ring-orange/30"
                >
                  {post.coverImageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.coverImageUrl} alt={post.title} className="h-40 w-full object-cover" />
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[12px] font-medium text-white/50">{formatDate(post.publishedAt, lang)}</p>
                    <h3 className="mt-1.5 font-display text-[15px] font-semibold text-white">{post.title}</h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-[13px] leading-relaxed text-white/70">{post.body}</p>
                    <span className="mt-3 text-[13px] font-semibold text-orange">{t.news.readMore}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
