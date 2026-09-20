import { notFound } from "@tanstack/react-router";
import { logHtml, logPath, logSlug, logTranslationOf, publishedLogs, siteLogs } from "@/lib/logs";
import { bilingualAlternates, titleSuffix, type Lang } from "@/lib/i18n";
import { kindLabel } from "@/lib/logs";
import { seo } from "@/lib/seo";

/** Loader for /logs/$id/ and /ar/logs/$id/. Only entries with notes have a
 *  page; a bare feed line is 404 here, on purpose. */
export async function loadLog(lang: Lang, slug: string) {
  const entry = siteLogs(lang).find((e) => logSlug(e) === slug && e.hasBody);
  const html = entry && (await logHtml(entry.id));
  if (!entry || !html) throw notFound();
  return { id: entry.id, html };
}

export function logHead(lang: Lang, id: string | undefined) {
  const entry = id ? publishedLogs().find((e) => e.id === id) : undefined;
  if (!entry) return {};
  const other = logTranslationOf(entry);
  const byLang = (l: Lang) => (entry.data.lang === l ? entry : other);
  const en = byLang("en");
  const ar = byLang("ar");
  return seo({
    path: logPath(entry, lang),
    // An untranslated entry shown on the other site points back to its own.
    canonicalPath: logPath(entry, entry.data.lang),
    title: `${entry.data.title}${titleSuffix(lang)}`,
    description: entry.data.note,
    lang: entry.data.lang,
    published: entry.data.date,
    type: "article",
    section: kindLabel(entry.data.kind).en,
    alternates: en && ar ? bilingualAlternates(logPath(en, "en"), logPath(ar, "ar")) : [],
  });
}
