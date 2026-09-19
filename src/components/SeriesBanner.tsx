import { L } from "@/components/L";
import { localePath, type Lang } from "@/lib/i18n";
import { seriesDef, type SeriesKey } from "@/lib/series";

/** The pill above a book part's title. `lang` is the part's language, `site`
 *  the site it's shown on (where the link goes). */
export function SeriesBanner({
  series,
  partLabel,
  lang = "en",
  site = lang,
}: {
  series: SeriesKey;
  partLabel: string;
  lang?: Lang;
  site?: Lang;
}) {
  const s = seriesDef(series);
  const isAr = lang === "ar";
  return (
    <L
      className="series-banner"
      href={localePath(site, `/${s.slug}/`)}
      dir={isAr ? "rtl" : "ltr"}
      lang={isAr ? "ar" : "en"}
    >
      <span className="series-banner-title">{isAr ? s.ar : s.title}</span>
      <span className="series-banner-sep">·</span>
      <span className="series-banner-part">{partLabel}</span>
      <span className="series-banner-sep">{isAr ? "من" : "of"}</span>
      <span className="series-banner-part">{s.parts}</span>
    </L>
  );
}
