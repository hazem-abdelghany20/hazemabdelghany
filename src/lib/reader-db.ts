/* What readers do that the site counts: reads and reactions (per essay, both
   languages combined — the key is essaySlug()) and highlighted lines (per
   edition). The tables and the only functions that can write to them are in
   drizzle/migrations/0000_reader_counters.sql.

   The Supabase client is loaded on demand, after the page is up, so the
   essays never wait on it. Every call fails quietly: a counter that can't
   load just doesn't show. The once-per-device limits live in localStorage. */

/** Reads show in the essay header only from this many up. */
export const READS_FLOOR = 100;
/** Reaction counts show to everyone from this many (all three together);
 *  below it, only to a reader who has reacted. */
export const REACTIONS_FLOOR = 10;

export const REACTIONS = [
  { kind: "landed", en: "This landed", ar: "وصلتني" },
  { kind: "think", en: "Made me think", ar: "خلّتني أفكّر" },
  { kind: "saving", en: "Saving this", ar: "هحفظها" },
] as const;
export type ReactionKind = (typeof REACTIONS)[number]["kind"];
export type ReactionCounts = Partial<Record<ReactionKind, number>>;

const db = async () => (await import("@/integrations/supabase/client")).supabase;

function readLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function writeLocal(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage blocked: the limit just isn't remembered
  }
}

// ---------------------------------------------------------------- reads

const today = () => new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD, local

/** Has this device already counted a read of this essay today? */
export const readCountedToday = (slug: string) => readLocal(`read:${slug}`, "") === today();

export async function fetchReads(slug: string): Promise<number | null> {
  try {
    const { data, error } = await (
      await db()
    )
      .from("essay_stats")
      .select("reads")
      .eq("slug", slug)
      .maybeSingle();
    if (error) return null;
    return data?.reads ?? 0;
  } catch {
    return null;
  }
}

/** Count one read (once per essay per device per day). Returns the new total. */
export async function recordRead(slug: string): Promise<number | null> {
  if (readCountedToday(slug)) return null;
  writeLocal(`read:${slug}`, today());
  try {
    const { data, error } = await (await db()).rpc("record_read", { p_slug: slug });
    return error ? null : data;
  } catch {
    return null;
  }
}

// ------------------------------------------------------------ reactions

/** The reactions this device has given this essay. */
export const myReactions = (slug: string): ReactionKind[] =>
  readLocal<ReactionKind[]>(`reactions:${slug}`, []).filter((k) =>
    REACTIONS.some((r) => r.kind === k),
  );

export async function fetchReactions(slug: string): Promise<ReactionCounts | null> {
  try {
    const { data, error } = await (
      await db()
    )
      .from("essay_reactions")
      .select("kind, count")
      .eq("slug", slug);
    if (error) return null;
    return Object.fromEntries(data.map((r) => [r.kind, r.count]));
  } catch {
    return null;
  }
}

/** Give (on) or take back (off) one reaction. Returns the essay's new counts. */
export async function react(
  slug: string,
  kind: ReactionKind,
  on: boolean,
): Promise<ReactionCounts | null> {
  const before = myReactions(slug);
  if (on === before.includes(kind)) return null; // once per device, per reaction
  writeLocal(`reactions:${slug}`, on ? [...before, kind] : before.filter((k) => k !== kind));
  try {
    const { data, error } = await (
      await db()
    ).rpc("react", {
      p_slug: slug,
      p_kind: kind,
      p_on: on,
    });
    if (!error) return data as ReactionCounts;
  } catch {
    // fall through
  }
  writeLocal(`reactions:${slug}`, before); // didn't count, so don't remember it
  return null;
}
