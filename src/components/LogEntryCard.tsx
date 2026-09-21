import { L } from "@/components/L";
import { kindLabel, logPath, youtubeId, youtubeThumb, type LogEntry } from "@/lib/logs";
import { fwd, type Lang } from "@/lib/i18n";
import { formatDay } from "@/lib/threads";

/** One entry in the log. Comments and longer notes appear only when present. */
export function LogEntryCard({ entry, lang }: { entry: LogEntry; lang: Lang }) {
  const isAr = entry.data.lang === "ar";
  const siteAr = lang === "ar";
  const kind = kindLabel(entry.data.kind);
  const foreign = entry.data.lang !== lang;
  // A watched thing shows its still. Only YouTube for now — see youtubeId().
  const video = youtubeId(entry.data.link);

  return (
    <article className="log-entry" dir={isAr ? "rtl" : "ltr"} lang={isAr ? "ar" : "en"}>
      <div className="log-entry-head">
        <span className="tag">{siteAr ? kind.arOne : kind.enOne}</span>
        {entry.data.by && <span className="meta log-by">{entry.data.by}</span>}
        {/* An Arabic date is one RTL run: without an explicit dir, "2 سبتمبر 2026"
            renders as "2 2026 سبتمبر" — the year joins the Arabic run and jumps. */}
        <span className="meta log-day" dir={siteAr ? "rtl" : "ltr"}>
          {formatDay(entry.data.date, lang)}
        </span>
        {!entry.data.finished && (
          <span className="log-flag">{siteAr ? "ما كمّلتهاش" : "Didn’t finish"}</span>
        )}
        {foreign && (
          <span className="meta" dir={siteAr ? "ltr" : "rtl"} lang={siteAr ? "en" : "ar"}>
            {siteAr ? "بالإنجليزي" : "In Arabic"}
          </span>
        )}
        {entry.data.rating !== undefined && (
          <span
            className="log-rating"
            dir="ltr"
            title={siteAr ? "تقييمي من ١٠" : "My rating out of ten"}
          >
            {entry.data.rating}
            <span className="log-rating-of">/10</span>
          </span>
        )}
      </div>

      <div className="log-entry-body">
        {video && (
          <a
            className="log-thumb"
            href={entry.data.link}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            aria-hidden="true"
          >
            <img
              src={youtubeThumb(video)}
              alt=""
              width={480}
              height={360}
              loading="lazy"
              decoding="async"
            />
          </a>
        )}
        <div className="log-entry-text">
          <h2 className="log-title">
            {entry.data.link ? (
              <a href={entry.data.link} target="_blank" rel="noopener noreferrer">
                {entry.data.title}
              </a>
            ) : (
              entry.data.title
            )}
          </h2>

          {entry.data.note?.trim() && <p className="log-note">{entry.data.note}</p>}

          {entry.hasBody && (
            <L className="log-more" href={logPath(entry, lang)}>
              {siteAr ? `الملاحظات ${fwd(lang)}` : "The notes →"}
            </L>
          )}
        </div>
      </div>
    </article>
  );
}
