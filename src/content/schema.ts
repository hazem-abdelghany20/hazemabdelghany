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
