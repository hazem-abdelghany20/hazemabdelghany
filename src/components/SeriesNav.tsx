import { Link } from "@tanstack/react-router";
import type { Essay } from "@/lib/essays";
import { seriesDef, type SeriesKey } from "@/lib/series";

export function SeriesNav({
  series,
  prev,
  next,
  lang = "en",
}: {
  series: SeriesKey;
  prev?: Essay | undefined;
  next?: Essay | undefined;
  lang?: "en" | "ar";
}) {
  const s = seriesDef(series);
  return (
    <nav className="series-nav">
      <div className="series-nav-side">
        {prev && (
          <Link to="/essays/$id/" params={{ id: prev.id }}>
            <span className="series-nav-dir">
              <span className="arrow" aria-hidden="true">
                ‹
              </span>
              {` ${prev.data.partLabel}`}
            </span>
            <span className="series-nav-title">{prev.data.title}</span>
          </Link>
        )}
      </div>
      <Link className="series-nav-home" to="/$series/" params={{ series: s.slug }}>
        {lang === "ar" ? "كل الأجزاء" : "All parts"}
      </Link>
      <div className="series-nav-side series-nav-right">
        {next && (
          <Link to="/essays/$id/" params={{ id: next.id }}>
            <span className="series-nav-dir">
              {`${next.data.partLabel} `}
              <span className="arrow" aria-hidden="true">
                ›
              </span>
            </span>
            <span className="series-nav-title">{next.data.title}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
