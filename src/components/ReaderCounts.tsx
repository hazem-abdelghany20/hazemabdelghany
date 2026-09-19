/* Reads in the essay header and the reactions row at the end of an essay
   (data: src/lib/reader-db.ts). Both appear only after the page is running
   and the numbers have loaded; if the database can't be reached they simply
   don't appear. */
import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";
import {
  fetchReactions,
  fetchReads,
  myReactions,
  react,
  REACTIONS,
  REACTIONS_FLOOR,
  READS_FLOOR,
  readCountedToday,
  recordRead,
  type ReactionCounts,
  type ReactionKind,
} from "@/lib/reader-db";
import { onReaderIntent, progressOf } from "@/lib/reading";

const format = new Intl.NumberFormat("en-US");
/** A read: the page open (and in view) this long, or the article half read. */
const READ_AFTER_MS = 15_000;

/** "2,340 reads" under the essay's date line. It sits in space the header
 *  already has, so nothing moves when it appears. Also counts this read. */
export function EssayReads({ slug, lang }: { slug: string; lang: Lang }) {
  const [reads, setReads] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    setReads(null);
    void fetchReads(slug).then((n) => alive && setReads(n));
    if (readCountedToday(slug)) {
      return () => {
        alive = false;
      };
    }

    const article = document.querySelector<HTMLElement>("article.prose");
    let done = false;
    let left = READ_AFTER_MS;
    let startedAt = 0;
    let timer = 0;
    const pause = () => {
      if (!timer) return;
      window.clearTimeout(timer);
      timer = 0;
      left -= Date.now() - startedAt;
    };
    const start = () => {
      if (done || timer || document.visibilityState !== "visible") return;
      startedAt = Date.now();
      timer = window.setTimeout(count, left);
    };
    const onVisibility = () => (document.visibilityState === "visible" ? start() : pause());
    // Half read counts only once the reader has scrolled here themselves: a
    // page turned from deep in the last one starts out scrolled down.
    let moved = false;
    const stopIntent = onReaderIntent(() => (moved = true));
    const onScroll = () => {
      if (moved && article && progressOf(article) >= 0.5) count();
    };
    const stop = () => {
      pause();
      stopIntent();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
    };
    function count() {
      if (done) return;
      done = true;
      stop();
      void recordRead(slug).then((n) => alive && n !== null && setReads(n));
    }

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });
    start();
    return () => {
      alive = false;
      stop();
    };
  }, [slug]);

  const shown = reads !== null && reads >= READS_FLOOR;
  return (
    <span className={shown ? "essay-reads is-shown" : "essay-reads"} aria-hidden={!shown}>
      {shown && `${format.format(reads)} ${lang === "ar" ? "قراءة" : "reads"}`}
    </span>
  );
}

/** Three reactions at the end of an essay. One tap each, once per device
 *  (tap again to take it back). Counts show once the reader has reacted, or
 *  to everyone once there are enough of them. */
export function EssayReactions({ slug, lang }: { slug: string; lang: Lang }) {
  const [counts, setCounts] = useState<ReactionCounts | null>(null);
  const [mine, setMine] = useState<ReactionKind[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    setCounts(null);
    setMine(myReactions(slug));
    void fetchReactions(slug).then((c) => alive && setCounts(c));
    return () => {
      alive = false;
    };
  }, [slug]);

  if (!counts) return null;
  const total = REACTIONS.reduce((sum, r) => sum + (counts[r.kind] ?? 0), 0);
  const showCounts = mine.length > 0 || total >= REACTIONS_FLOOR;

  const toggle = async (kind: ReactionKind) => {
    if (busy) return;
    const on = !mine.includes(kind);
    setBusy(true);
    setMine(on ? [...mine, kind] : mine.filter((k) => k !== kind));
    setCounts({ ...counts, [kind]: Math.max(0, (counts[kind] ?? 0) + (on ? 1 : -1)) });
    const next = await react(slug, kind, on);
    if (next) setCounts(next);
    else {
      setMine(myReactions(slug)); // it didn't count: put the row back as it was
      setCounts(counts);
    }
    setBusy(false);
  };

  return (
    <section
      className="reactions"
      aria-label={lang === "ar" ? "رأيك في اللي قريته" : "Your reaction"}
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {REACTIONS.map((r) => (
        <button
          key={r.kind}
          type="button"
          className="reaction"
          aria-pressed={mine.includes(r.kind)}
          onClick={() => void toggle(r.kind)}
        >
          <span>{r[lang]}</span>
          {showCounts && (
            <span className="reaction-count" dir="ltr">
              {format.format(counts[r.kind] ?? 0)}
            </span>
          )}
        </button>
      ))}
    </section>
  );
}
