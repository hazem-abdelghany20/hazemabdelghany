import { L } from "@/components/L";
import { kindLabel, logPath, logTranslationOf, publishedLogs, siteLogs } from "@/lib/logs";
import { back, localePath, type Lang } from "@/lib/i18n";
import { formatDay } from "@/lib/threads";
import { LogEntryCard } from "@/components/LogEntryCard";

/** One entry's notes — the margin, not a review. */
export function LogPage({ lang, id, html }: { lang: Lang; id: string; html: string }) {
  const entry = publishedLogs().find((e) => e.id === id)!;
  const isAr = entry.data.lang === "ar";
  const siteAr = lang === "ar";
  const kind = kindLabel(entry.data.kind);
  const translation = logTranslationOf(entry);

  // Two more entries to land on, newest first — the log is a feed, so the way
  // out of an entry is back into it.
  const more = siteLogs(lang)
    .filter((e) => e.id !== entry.id && e.id !== translation?.id)
    .slice(0, 2);

  return (
    <div key={`log-page:${entry.id}`} className="page-log">
      <header className="log-head">
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
          {entry.data.rating !== undefined && (
            <span className="log-rating" dir="ltr">
              {entry.data.rating}
              <span className="log-rating-of">/10</span>
            </span>
          )}
        </div>

        <h1 className="log-page-title" dir={isAr ? "rtl" : undefined} lang={isAr ? "ar" : "en"}>
          {entry.data.title}
        </h1>

        <p className="log-page-note" dir={isAr ? "rtl" : undefined} lang={isAr ? "ar" : "en"}>
          {entry.data.note}
        </p>

        <div className="log-page-links">
          {entry.data.link && (
            <a href={entry.data.link} target="_blank" rel="noopener noreferrer" className="meta">
              {siteAr ? "المصدر ↗" : "The source ↗"}
            </a>
          )}
          {translation && (
            <a
              href={logPath(translation, translation.data.lang)}
              className="meta"
              dir={siteAr ? "ltr" : "rtl"}
              lang={siteAr ? "en" : "ar"}
              hrefLang={siteAr ? "en" : "ar"}
            >
              {siteAr ? "Read in English" : "اقراها بالعربي"}
            </a>
          )}
        </div>
      </header>

      <article
        key={`log-article:${entry.id}`}
        className={isAr ? "prose prose-ar" : "prose"}
        dir={isAr ? "rtl" : undefined}
        lang={isAr ? "ar" : "en"}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <L className="log-back" href={localePath(lang, "/logs/")}>
        {siteAr ? `${back(lang)} كل السجل` : "← All of the log"}
      </L>

      {more.length > 0 && (
        <section className="read-next">
          <div className="section-head">
            <h2 className="kicker">{siteAr ? "كمان من السجل" : "Also in the log"}</h2>
          </div>
          <div className="log-feed">
            {more.map((e) => (
              <LogEntryCard key={e.id} entry={e} lang={lang} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
