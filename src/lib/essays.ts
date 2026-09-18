import index from "virtual:essays";
import type { EssayFrontmatter } from "@/content/schema";
import redirects from "@/content/redirects.json";

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

// One lazily loaded chunk per essay, so a page only pulls its own body.
const bodies = import.meta.glob<string>("/src/content/essays/*.md", { import: "default" });

export async function essayHtml(id: string): Promise<string | undefined> {
  const load = bodies[`/src/content/essays/${id}.md`];
  return load ? await load() : undefined;
}

/** Old essay URLs that moved (old path -> new path). One list, read by the
 *  essay route here and by scripts/static-extras.mjs for the static build. */
export const ESSAY_REDIRECTS: Record<string, string> = redirects;
