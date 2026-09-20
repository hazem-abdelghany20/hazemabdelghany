import { z } from "zod";

/** Frontmatter of an essay in src/content/essays/<id>.md.
 *  Checked at build time by essays-plugin.ts — a bad field fails the build
 *  instead of rendering a broken page. */
export const essaySchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  lang: z.enum(["ar", "en"]),
  thread: z.enum(["building", "faith", "body", "mind", "perspective"]),
  minutes: z.number().optional(),
  description: z.string().optional(),
  heroImage: z.string().optional(),
  heroImageDark: z.string().optional(),
  heroWidth: z.number().int().positive().default(1536),
  heroHeight: z.number().int().positive().default(1024),
  heroAlt: z.string().optional(),
  heroMode: z.enum(["framed", "adaptive"]).default("framed"),
  draft: z.boolean().default(false),
  // id of this essay's version in the other language, when one exists
  translationOf: z.string().optional(),
  // --- series ---
  // `series` names the collection this piece belongs to (see src/lib/series.ts);
  // `part` orders it; `partLabel` is what the reader is shown ("Part Three",
  // "Part Two · Engine 04"). The label is spelled out rather than derived,
  // because the book's own numbering is not a straight sequence.
  series: z.enum(["bedrock-and-weather", "riding-out"]).optional(),
  part: z.number().optional(),
  partLabel: z.string().optional(),
});

export type EssayFrontmatter = z.infer<typeof essaySchema>;

/** Frontmatter of a log entry in src/content/logs/<id>.md — one thing read or
 *  watched, with what I thought of it. Two shapes share this schema:
 *
 *  - a **feed entry**: frontmatter only, no body. `note` is the whole comment
 *    and the entry has no page of its own.
 *  - **notes in public**: the same frontmatter plus a body, which becomes
 *    /logs/<id>/ — the margin notes, not a review.
 *
 *  Checked at build time by essays-plugin.ts, same as an essay. */
export const logSchema = z.object({
  // The thing itself — its own title, not a title I gave it.
  title: z.string(),
  // Who made it: author, channel, speaker. Optional — some things have no one.
  by: z.string().optional(),
  kind: z.enum(["book", "video", "course", "podcast", "paper", "article", "tool"]),
  // Where to find it. External, so it opens in a new tab.
  link: z.string().url().optional(),
  // When I logged it, not when it was published.
  date: z.coerce.date(),
  // Language of MY comment, not of the resource.
  lang: z.enum(["ar", "en"]),
  // The comment. In a feed with no body this is the entire entry, so it has to
  // earn its place: one honest sentence, not a summary.
  //
  // Optional, because a stub is useful: an entry can be filed the day it was
  // read or watched and sit there until there is something to say about it. An
  // entry with no note never publishes — see publishedLogs() in src/lib/logs.ts.
  // Writing the note is what puts it on the site.
  note: z.string().optional(),
  // Out of ten. Optional — not everything deserves a number, and a missing one
  // is more honest than a made-up one.
  rating: z.number().min(1).max(10).optional(),
  // false = I stopped partway. Worth saying; dropping a book is a verdict.
  finished: z.boolean().default(true),
  draft: z.boolean().default(false),
  // id of this entry's version in the other language, when one exists
  translationOf: z.string().optional(),
});

export type LogFrontmatter = z.infer<typeof logSchema>;
