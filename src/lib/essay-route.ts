import { notFound, redirect } from "@tanstack/react-router";
import {
  ESSAY_REDIRECTS,
  essayHtml,
  essayPath,
  essaySlug,
  publishedEssays,
  siteEssays,
  translationOf,
} from "@/lib/essays";
import { bilingualAlternates, localePath, titleSuffix, type Lang } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { threadLabel } from "@/lib/threads";

const movedTo = (href: string) => redirect({ href, statusCode: 301 } as never);

/** Loader for /essays/$id/ and /ar/essays/$id/. */
export async function loadEssay(lang: Lang, slug: string) {
  const moved = ESSAY_REDIRECTS[localePath(lang, `/essays/${slug}/`)];
  if (moved) throw movedTo(moved);
  // Arabic essays used to live at /essays/<slug>-ar/ on the English site.
  if (lang === "en") {
    const legacy = publishedEssays().find(
      (e) => e.id === slug && e.data.lang === "ar" && essaySlug(e) !== e.id,
    );
    if (legacy) throw movedTo(essayPath(legacy, "ar"));
  }
  const essay = siteEssays(lang).find((e) => essaySlug(e) === slug);
  const html = essay && (await essayHtml(essay.id));
  if (!essay || html === undefined) throw notFound();
  return { id: essay.id, html };
}

export function essayHead(lang: Lang, id: string | undefined) {
  const essay = id ? publishedEssays().find((e) => e.id === id) : undefined;
  if (!essay) return {};
  const other = translationOf(essay);
  const byLang = (l: Lang) => (essay.data.lang === l ? essay : other);
  const en = byLang("en");
  const ar = byLang("ar");
  return seo({
    path: essayPath(essay, lang),
    // An untranslated essay shown on the other site points back to its own.
    canonicalPath: essayPath(essay, essay.data.lang),
    title: `${essay.data.title}${titleSuffix(lang)}`,
    description: essay.data.description,
    lang: essay.data.lang,
    published: essay.data.date,
    type: "article",
    section: threadLabel(essay.data.thread).en,
    alternates: en && ar ? bilingualAlternates(essayPath(en, "en"), essayPath(ar, "ar")) : [],
  });
}
