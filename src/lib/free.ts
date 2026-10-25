/* The free guides (/free/ and /free/<slug>/). Their words live in Reach, the
   comment-to-DM tool in Catalyst Suite: each guide is a published kit of the
   "hazem" brand. Pages read it through the suite's public calls, the same ones
   its own /hazem/<slug> pages use, so a guide is edited once, in Reach, and
   views and copy taps keep counting there. The key below is the suite's public
   (anon) key: it can only run those public calls. */

const SUITE_URL = "https://zjbjhrbpvgnxcvawybtt.supabase.co";
const SUITE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqYmpocmJwdmdueGN2YXd5YnR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NzA2MzYsImV4cCI6MjEwNTA0NjYzNn0.MS6i22cXqC8h6LyZpdOxU7rh1nFgZwUGOrcQ9m8eawY";
const BRAND = "hazem";

/** Where a guide also lives on the suite (the fallback for a guide newer than the last deploy). */
export const suitePage = (slug: string) => `https://main.d1vc49w8rftw7h.amplifyapp.com/${BRAND}/${slug}`;

export type FreeItem = { id: string; label: string; url: string; note: string | null };
export type FreeKit = { id: string; slug: string; title: string; intro: string; outro: string; items: FreeItem[] };
export type FreeListing = { slug: string; title: string };

function call(fn: string, args: Record<string, unknown>, keepalive = false) {
  return fetch(`${SUITE_URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    keepalive,
    headers: {
      apikey: SUITE_KEY,
      Authorization: `Bearer ${SUITE_KEY}`,
      "Content-Type": "application/json",
      "Content-Profile": "suite",
    },
    body: JSON.stringify(args),
  });
}

// A failed call never breaks the build: the page renders empty and the browser fetches again.
export async function fetchFreeKit(slug: string): Promise<FreeKit | null> {
  try {
    const r = await call("link_page", { ws: BRAND, page: slug });
    const d = r.ok ? await r.json() : null;
    return d?.kit ?? null;
  } catch {
    return null;
  }
}

export async function fetchFreeList(): Promise<FreeListing[] | null> {
  try {
    const r = await call("link_bio", { ws: BRAND });
    const d = r.ok ? await r.json() : null;
    return d?.pages ?? null;
  } catch {
    return null;
  }
}

function visitor(): string {
  try {
    let v = localStorage.getItem("free.v");
    if (!v) {
      v = crypto.randomUUID();
      localStorage.setItem("free.v", v);
    }
    return v;
  } catch {
    return `anon-${Math.random().toString(36).slice(2, 12)}`;
  }
}

function referrer(): string {
  const q = new URLSearchParams(location.search);
  return (
    q.get("utm_source") ??
    q.get("src") ??
    (document.referrer
      ? new URL(document.referrer).hostname
      : /TikTok|musical_ly|BytedanceWebview/i.test(navigator.userAgent)
        ? "tiktok"
        : "direct")
  );
}

/** A view of the guide, or a tap on one of its links / copy keys, counted in Reach. */
export function trackFree(slug: string, kind: "view" | "click", item: string | null = null) {
  const person = new URLSearchParams(location.search).get("p");
  void call(
    "link_track",
    { ws: BRAND, page: slug, item, visitor: visitor(), kind, referrer: referrer(), person_code: person },
    true,
  ).catch(() => undefined);
}
