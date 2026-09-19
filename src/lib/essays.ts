import index from "virtual:essays";
import type { EssayFrontmatter } from "@/content/schema";
import redirects from "@/content/redirects.json";
import { localePath, type Lang } from "./i18n";

export type Essay = { id: string; data: EssayFrontmatter };

const ALL: Essay[] = index.map((e) => ({
  id: e.id,
  data: { ...e.data, date: new Date(e.data.date) },
}));

/** The single definition of "published", used by every page, the feed and the
 *  sitemap — so a draft or a future-dated post can never leak through one of
 *  them while the others hide it. */
export function publishedEssays(): Essay[] {
  const now = new Date();
  return ALL.filter((e) => !e.data.draft && e.data.date <= now).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
}

/** An essay's URL slug. The Arabic edition shares its English twin's slug, so
 *  /essays/tazkiya/ and /ar/essays/tazkiya/ are the same essay. */
export const essaySlug = (e: Essay) =>
  e.data.lang === "ar" ? (e.data.translationOf ?? e.id.replace(/-ar$/, "")) : e.id;

/** What the `lang` site shows: essays in that language, plus any essay that
 *  has no translation yet (so it appears on both sites). */
export function siteEssays(lang: Lang): Essay[] {
  const all = publishedEssays();
  const ids = new Set(all.map((e) => e.id));
  return all.filter(
    (e) => e.data.lang === lang || !(e.data.translationOf && ids.has(e.data.translationOf)),
  );
}

/** The essay's page on the `lang` site. */
export const essayPath = (e: Essay, lang: Lang) => localePath(lang, `/essays/${essaySlug(e)}/`);

/** The other-language edition, when there is one. */
export function translationOf(e: Essay): Essay | undefined {
  const all = publishedEssays();
  return e.data.translationOf
    ? all.find((x) => x.id === e.data.translationOf)
    : all.find((x) => x.data.translationOf === e.id);
}

// One lazily loaded chunk per essay, so a page only pulls its own body.
const bodies = import.meta.glob<string>("/src/content/essays/*.md", { import: "default" });

export async function essayHtml(id: string): Promise<string | undefined> {
  const load = bodies[`/src/content/essays/${id}.md`];
  return load ? await load() : undefined;
}

/** Old essay URLs that moved (old path -> new path). One list, read by the
 *  essay route here and by scripts/static-extras.mjs for the static build. */
export const ESSAY_REDIRECTS: Record<string, string> = redirects;
