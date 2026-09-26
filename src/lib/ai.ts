import index from "virtual:ai";
import type { AiFrontmatter } from "@/content/schema";
import { localePath, type Lang } from "./i18n";

/** A piece on the AI side. Same bilingual rules as the essays: the Arabic
 *  edition shares its English twin's slug. */
export type AiPiece = { id: string; data: AiFrontmatter };

const ALL: AiPiece[] = index.map((e) => ({
  id: e.id,
  data: { ...e.data, date: new Date(e.data.date) },
}));

export type AiTopic = AiFrontmatter["topic"];

/** The AI side's counterpart of the five threads, in display order. */
export const AI_TOPICS: { key: AiTopic; en: string; ar: string; blurb: string; blurbAr: string }[] =
  [
    {
      key: "definitions",
      en: "Definitions",
      ar: "تعريفات",
      blurb: "One word everyone uses, explained simply.",
      blurbAr: "كلمة الكل بيقولها، متشرحة ببساطة.",
    },
    {
      key: "context",
      en: "Context",
      ar: "الـ Context",
      blurb: "What the model sees decides what it says.",
      blurbAr: "اللي الموديل شايفه هو اللي بيحدد هيقول إيه.",
    },
    {
      key: "agents",
      en: "Agents & MCP",
      ar: "Agents و MCP",
      blurb: "AI that reaches your tools and does the work.",
      blurbAr: "AI بيوصل لأدواتك وبيعمل الشغل.",
    },
    {
      key: "tools",
      en: "Tools",
      ar: "أدوات",
      blurb: "What I actually use, and for what.",
      blurbAr: "اللي بستخدمه فعلًا، وفي إيه.",
    },
    {
      key: "opinions",
      en: "Opinions",
      ar: "رأيي",
      blurb: "Where I think this is going.",
      blurbAr: "شايف الموضوع رايح فين.",
    },
  ];

export const topicLabel = (key: AiTopic) => AI_TOPICS.find((t) => t.key === key)!;

/** Published = not a draft and not future-dated. One definition for every list. */
export function publishedAi(): AiPiece[] {
  const now = new Date();
  return ALL.filter((e) => !e.data.draft && e.data.date <= now).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
}

export const aiSlug = (e: AiPiece) =>
  e.data.lang === "ar" ? (e.data.translationOf ?? e.id.replace(/-ar$/, "")) : e.id;

/** What the `lang` side shows: pieces in that language, plus any piece with no
 *  translation yet. */
export function siteAi(lang: Lang): AiPiece[] {
  const all = publishedAi();
  const ids = new Set(all.map((e) => e.id));
  return all.filter(
    (e) => e.data.lang === lang || !(e.data.translationOf && ids.has(e.data.translationOf)),
  );
}

export const aiPath = (e: AiPiece, lang: Lang) => localePath(lang, `/ai/writing/${aiSlug(e)}/`);

export function aiTranslationOf(e: AiPiece): AiPiece | undefined {
  const all = publishedAi();
  return e.data.translationOf
    ? all.find((x) => x.id === e.data.translationOf)
    : all.find((x) => x.data.translationOf === e.id);
}

const bodies = import.meta.glob<string>("/src/content/ai/*.md", { import: "default" });

export async function aiHtml(id: string): Promise<string | undefined> {
  const load = bodies[`/src/content/ai/${id}.md`];
  return load ? await load() : undefined;
}

/** "0:57" */
export const clock = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
