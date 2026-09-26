import { L } from "@/components/L";
import { aiPath, type AiPiece } from "@/lib/ai";
import type { Lang } from "@/lib/i18n";

const iso = (d: Date) => d.toISOString().slice(0, 10);

/** `tail writing.log`: one row per piece. The date column is the spine in
 *  both languages; an Arabic title turns RTL inside its own cell. */
export function AiLog({ pieces, lang }: { pieces: AiPiece[]; lang: Lang }) {
  const isAr = lang === "ar";
  return (
    <ol className="t-log">
      {pieces.map((p) => {
        const ar = p.data.lang === "ar";
        const min = p.data.minutes;
        return (
          <li key={p.id}>
            <L className="t-log-row" href={aiPath(p, lang)}>
              <time className="t-log-time" dateTime={iso(p.data.date)}>
                {iso(p.data.date)}
              </time>
              <span className="t-log-title" lang={ar ? "ar" : "en"} dir={ar ? "rtl" : "ltr"}>
                {p.data.title}
              </span>
              <span className="t-log-tag" dir="ltr">
                {p.data.video ? "▶ " : ""}
                {p.data.topic}/
              </span>
              <span className="t-log-len" lang={isAr ? "ar" : "en"}>
                {min ? (isAr ? `${min} دقايق` : `${min} min`) : ""}
              </span>
            </L>
          </li>
        );
      })}
    </ol>
  );
}
