import index from "virtual:logs";
import type { LogFrontmatter } from "@/content/schema";
import { localePath, type Lang } from "./i18n";

/** One thing read or watched. `hasBody` is true when the entry has notes under
 *  the frontmatter — then it gets a page; otherwise it is only a feed line. */
export type LogEntry = { id: string; hasBody: boolean; data: LogFrontmatter };

const ALL: LogEntry[] = index.map((e) => ({
  id: e.id,
  hasBody: e.hasBody,
  data: { ...e.data, date: new Date(e.data.date) },
}));

export type LogKind = LogFrontmatter["kind"];

/** The kinds, in the order the filter shows them. */
export const LOG_KINDS: { key: LogKind; en: string; ar: string; enOne: string; arOne: string }[] = [
  { key: "book", en: "Books", ar: "كتب", enOne: "Book", arOne: "كتاب" },
  { key: "video", en: "Videos", ar: "فيديوهات", enOne: "Video", arOne: "فيديو" },
  { key: "course", en: "Courses", ar: "كورسات", enOne: "Course", arOne: "كورس" },
  { key: "podcast", en: "Podcasts", ar: "بودكاست", enOne: "Podcast", arOne: "بودكاست" },
  { key: "paper", en: "Papers", ar: "أوراق", enOne: "Paper", arOne: "ورقة" },
  { key: "article", en: "Articles", ar: "مقالات", enOne: "Article", arOne: "مقال" },
  { key: "tool", en: "Tools", ar: "أدوات", enOne: "Tool", arOne: "أداة" },
];

export const kindLabel = (key: LogKind) => LOG_KINDS.find((k) => k.key === key)!;

/** The single definition of "published" — used by the list, the entry pages and
 *  the sitemap, so a draft can never leak through one of them.
 *
 *  An entry with no `note` is a stub: filed, but nothing said about it yet. The
 *  comment IS the entry, so a stub is not published. Writing the note is what
 *  puts it on the site — there is no second switch to remember. */
export function publishedLogs(): LogEntry[] {
  const now = new Date();
  return ALL.filter((e) => !e.data.draft && !!e.data.note?.trim() && e.data.date <= now).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
}

/** An entry's URL slug. The Arabic edition shares its English twin's slug, so
 *  /logs/flow/ and /ar/logs/flow/ are the same entry. */
export const logSlug = (e: LogEntry) =>
  e.data.lang === "ar" ? (e.data.translationOf ?? e.id.replace(/-ar$/, "")) : e.id;

/** What the `lang` site shows: entries commented in that language, plus any
 *  entry with no translation yet (so it appears on both sites). */
export function siteLogs(lang: Lang): LogEntry[] {
  const all = publishedLogs();
  const ids = new Set(all.map((e) => e.id));
  return all.filter(
    (e) => e.data.lang === lang || !(e.data.translationOf && ids.has(e.data.translationOf)),
  );
}

/** The entry's own page, for entries that have one. */
export const logPath = (e: LogEntry, lang: Lang) => localePath(lang, `/logs/${logSlug(e)}/`);

/** The other-language edition, when there is one. */
export function logTranslationOf(e: LogEntry): LogEntry | undefined {
  const all = publishedLogs();
  return e.data.translationOf
    ? all.find((x) => x.id === e.data.translationOf)
    : all.find((x) => x.data.translationOf === e.id);
}

// One lazily loaded chunk per entry, so a page only pulls its own notes.
const bodies = import.meta.glob<string>("/src/content/logs/*.md", { import: "default" });

export async function logHtml(id: string): Promise<string | undefined> {
  const load = bodies[`/src/content/logs/${id}.md`];
  return load ? await load() : undefined;
}

/** The video id inside a YouTube URL, for the thumbnail. Handles the two forms
 *  the site actually stores (`watch?v=` and `youtu.be/`); anything else — a
 *  Vimeo link, a blog post — returns undefined and the entry shows no image. */
export function youtubeId(link: string | undefined): string | undefined {
  if (!link) return undefined;
  const m =
    /^https?:\/\/(?:www\.)?youtube\.com\/watch\?(?:.*&)?v=([\w-]{11})(?:&|$)/.exec(link) ??
    /^https?:\/\/youtu\.be\/([\w-]{11})(?:\?|$)/.exec(link);
  return m?.[1];
}

/** YouTube's own still for a video. `hqdefault` exists for every video, unlike
 *  maxresdefault, which 404s on anything never uploaded in HD. */
export const youtubeThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/** Every entry, stubs and drafts included — for the desk at /log-desk/ only.
 *  Every public surface goes through publishedLogs(); nothing here is on the
 *  site until it has a note. */
export const allLogs = (): LogEntry[] =>
  [...ALL].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
