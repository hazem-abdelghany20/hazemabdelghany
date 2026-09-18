import { Link } from "@tanstack/react-router";
import { seriesDef, type SeriesKey } from "@/lib/series";

export function SeriesBanner({
  series,
  partLabel,
  lang = "en",
}: {
  series: SeriesKey;
  partLabel: string;
  lang?: "en" | "ar";
}) {
  const s = seriesDef(series);
  const isAr = lang === "ar";
  return (
    <Link
      className="series-banner"
      to="/$series/"
      params={{ series: s.slug }}
      dir={isAr ? "rtl" : "ltr"}
      lang={isAr ? "ar" : "en"}
    >
      <span className="series-banner-title">{isAr ? s.ar : s.title}</span>
      <span className="series-banner-sep">·</span>
      <span className="series-banner-part">{partLabel}</span>
      <span className="series-banner-sep">{isAr ? "من" : "of"}</span>
      <span className="series-banner-part">{s.parts}</span>
    </Link>
  );
}
