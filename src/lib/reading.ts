/* Per-device reading progress for the books (series essays). Lives in
   localStorage only — no account, no database. One record per book per
   edition: the last part opened, how far down it was read, and which parts
   have been read (≥ READ_AT of the way through). Every access is wrapped:
   storage can be missing, full or blocked, and the reader must never break. */

import { useEffect, useState } from "react";
import type { Lang } from "./i18n";
import type { SeriesKey } from "./series";

/** A part counts as read once the reader is this far through it. */
export const READ_AT = 0.9;

export type BookProgress = {
  last?: { id: string; p: number; at: number } | undefined;
  read: string[];
};

const key = (series: SeriesKey, lang: Lang) => `reading:${series}:${lang}`;
const RESUME = "reading:resume";

export function loadProgress(series: SeriesKey, lang: Lang): BookProgress {
  try {
    const raw = localStorage.getItem(key(series, lang));
    const parsed = raw ? (JSON.parse(raw) as Partial<BookProgress>) : {};
    return {
      last:
        parsed.last && typeof parsed.last.id === "string" && typeof parsed.last.p === "number"
          ? parsed.last
          : undefined,
      read: Array.isArray(parsed.read) ? parsed.read.filter((x) => typeof x === "string") : [],
    };
  } catch {
    return { read: [] };
  }
}

export function saveProgress(series: SeriesKey, lang: Lang, progress: BookProgress) {
  try {
    localStorage.setItem(key(series, lang), JSON.stringify(progress));
  } catch {
    // storage full or blocked: progress just isn't remembered
  }
}

/** The "Continue" link sets this so the part page knows to restore the
 *  reader's place (opening a part any other way starts at the top). */
export function markResume(id: string) {
  try {
    sessionStorage.setItem(RESUME, id);
  } catch {
    // no session storage: the part opens at the top
  }
}

export function takeResume(id: string): boolean {
  try {
    if (sessionStorage.getItem(RESUME) !== id) return false;
    sessionStorage.removeItem(RESUME);
    return true;
  } catch {
    return false;
  }
}

/** "7 min left" / "فاضل 7 دقايق". */
export function minutesLeft(lang: Lang, n: number) {
  if (lang === "en") return `${n} min left`;
  if (n === 1) return "فاضل دقيقة";
  if (n === 2) return "فاضل دقيقتين";
  return n <= 10 ? `فاضل ${n} دقايق` : `فاضل ${n} دقيقة`;
}

/** This device's progress in a book, once the page is running in a browser
 *  (null while prerendering and on the first render, so hydration matches). */
export function useBookProgress(series: SeriesKey, lang: Lang) {
  const [progress, setProgress] = useState<BookProgress | null>(null);
  useEffect(() => setProgress(loadProgress(series, lang)), [series, lang]);
  return progress;
}
