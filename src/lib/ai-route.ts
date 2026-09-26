import { notFound } from "@tanstack/react-router";
import { aiHtml, aiPath, aiSlug, aiTranslationOf, publishedAi, siteAi, topicLabel } from "@/lib/ai";
import { bilingualAlternates, titleSuffix, type Lang } from "@/lib/i18n";
import { seo } from "@/lib/seo";

/** Loader for /ai/writing/$id/ and /ar/ai/writing/$id/. */
export async function loadAi(lang: Lang, slug: string) {
  const piece = siteAi(lang).find((e) => aiSlug(e) === slug);
  const html = piece && (await aiHtml(piece.id));
  if (!piece || html === undefined) throw notFound();
  return { id: piece.id, html };
}

export function aiHead(lang: Lang, id: string | undefined) {
  const piece = id ? publishedAi().find((e) => e.id === id) : undefined;
  if (!piece) return {};
  const other = aiTranslationOf(piece);
  const byLang = (l: Lang) => (piece.data.lang === l ? piece : other);
  const en = byLang("en");
  const ar = byLang("ar");
  return seo({
    path: aiPath(piece, lang),
    canonicalPath: aiPath(piece, piece.data.lang),
    title: `${piece.data.title}${titleSuffix(lang)}`,
    description: piece.data.description,
    lang: piece.data.lang,
    published: piece.data.date,
    type: "article",
    section: `AI · ${topicLabel(piece.data.topic).en}`,
    alternates: en && ar ? bilingualAlternates(aiPath(en, "en"), aiPath(ar, "ar")) : [],
  });
}
