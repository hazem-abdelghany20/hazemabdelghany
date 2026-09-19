import { L } from "@/components/L";
import { essayPath, type Essay } from "@/lib/essays";
import { fwd, type Lang } from "@/lib/i18n";
import { markResume, READ_AT, type BookProgress } from "@/lib/reading";

/** "Continue: Part I · Chapter 3 — Attention · 40%" above a book's parts.
 *  A part read to the end hands over to the next one instead. */
export function ContinueReading({
  progress,
  parts,
  lang,
}: {
  progress: BookProgress | null;
  parts: Essay[];
  lang: Lang;
}) {
  const last = progress?.last;
  const i = last ? parts.findIndex((e) => e.id === last.id) : -1;
  if (!last || i < 0) return null;
  const read = progress?.read ?? [];
  const finished = last.p >= READ_AT || read.includes(last.id);
  const part = finished
    ? (parts.slice(i + 1).find((e) => !read.includes(e.id)) ?? parts[i + 1])
    : parts[i];
  if (!part) return null;
  const isAr = lang === "ar";

  return (
    <L
      className="continue-reading"
      href={essayPath(part, lang)}
      onClick={() => {
        if (!finished) markResume(part.id);
      }}
    >
      <span className="continue-reading-kicker">
        {finished ? (isAr ? "اللي بعده" : "Next up") : isAr ? "كمّل" : "Continue"}
      </span>
      <span className="continue-reading-part">
        <span className="continue-reading-label">{part.data.partLabel}</span>
        <span className="continue-reading-title">{part.data.title}</span>
      </span>
      {!finished && (
        <span className="continue-reading-pct" dir="ltr">
          {Math.round(last.p * 100)}%
        </span>
      )}
      <span className="continue-reading-arrow" aria-hidden="true">
        {fwd(lang)}
      </span>
    </L>
  );
}
