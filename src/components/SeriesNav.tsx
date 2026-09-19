import { L } from "@/components/L";
import { essayPath, type Essay } from "@/lib/essays";
import { localePath, type Lang } from "@/lib/i18n";
import { seriesDef, type SeriesKey } from "@/lib/series";

/** Previous part · All parts · Next part, under a book part. */
export function SeriesNav({
  series,
  prev,
  next,
  lang = "en",
  site = lang,
}: {
  series: SeriesKey;
  prev?: Essay | undefined;
  next?: Essay | undefined;
  lang?: Lang;
  site?: Lang;
}) {
  const s = seriesDef(series);
  return (
    <nav className="series-nav">
      <div className="series-nav-side">
        {prev && (
          <L href={essayPath(prev, site)}>
            <span className="series-nav-dir">
              <span className="arrow" aria-hidden="true">
                ‹
              </span>
              {` ${prev.data.partLabel}`}
            </span>
            <span className="series-nav-title">{prev.data.title}</span>
          </L>
        )}
      </div>
      <L className="series-nav-home" href={localePath(site, `/${s.slug}/`)}>
        {lang === "ar" ? "كل الأجزاء" : "All parts"}
      </L>
      <div className="series-nav-side series-nav-right">
        {next && (
          <L href={essayPath(next, site)}>
            <span className="series-nav-dir">
              {`${next.data.partLabel} `}
              <span className="arrow" aria-hidden="true">
                ›
              </span>
            </span>
            <span className="series-nav-title">{next.data.title}</span>
          </L>
        )}
      </div>
    </nav>
  );
}
