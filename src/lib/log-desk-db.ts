/* The desk's half of the log_reviews table (drizzle/migrations/0001_log_desk.sql).
   The table has row level security with no policies, so the only way in or out
   is these two functions, and both want the passphrase. The site is static and
   has no accounts — this is a lock on a drawer, not a vault. */

export type Review = { slug: string; rating: number | null; note: string };

const db = async () => (await import("@/integrations/supabase/client")).supabase;

/** src/integrations/supabase/types.ts is generated from the database, so it
 *  won't know log_desk_load/log_desk_save until Lovable regenerates it after
 *  the migration is applied. Until then the call is typed here instead. */
type RpcResult = { data: unknown; error: { message?: string; code?: string } | null };
const rpc = async (fn: string, args: Record<string, unknown>): Promise<RpcResult> =>
  (await db()).rpc(fn as never, args as never) as unknown as Promise<RpcResult>;

export type DeskError = "locked" | "missing" | "offline";

/** Everything written so far, keyed by slug. Throws a DeskError:
 *  "locked" — wrong passphrase · "missing" — the migration hasn't been applied
 *  yet · "offline" — no Supabase at all. */
export async function loadReviews(key: string): Promise<Record<string, Review>> {
  let res;
  try {
    res = await rpc("log_desk_load", { p_key: key });
  } catch {
    throw "offline" as DeskError;
  }
  if (res.error) throw classify(res.error);
  const out: Record<string, Review> = {};
  for (const row of (res.data ?? []) as Review[]) {
    out[row.slug] = { slug: row.slug, rating: row.rating ?? null, note: row.note ?? "" };
  }
  return out;
}

export async function saveReview(key: string, r: Review): Promise<void> {
  let res;
  try {
    res = await rpc("log_desk_save", {
      p_key: key,
      p_slug: r.slug,
      p_rating: r.rating,
      p_note: r.note,
    });
  } catch {
    throw "offline" as DeskError;
  }
  if (res.error) throw classify(res.error);
}

/** Postgres says "wrong passphrase" through the raised exception; a function
 *  that doesn't exist yet comes back as a schema-cache miss (PGRST202). */
function classify(error: { message?: string; code?: string }): DeskError {
  const m = (error.message ?? "").toLowerCase();
  if (error.code === "PGRST202" || m.includes("could not find the function")) return "missing";
  if (m.includes("passphrase")) return "locked";
  return "offline";
}
