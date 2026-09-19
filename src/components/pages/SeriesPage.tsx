import { Fragment } from "react";
import { BookPartsList } from "@/components/BookPartsList";
import { ContinueReading } from "@/components/ContinueReading";
import { L } from "@/components/L";
import { publishedEssays, siteEssays } from "@/lib/essays";
import { localePath, type Lang } from "@/lib/i18n";
import { useBookProgress } from "@/lib/reading";
import { SERIES, type SeriesKey } from "@/lib/series";

const md = (t: string) => t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

/** A book's landing page: /bedrock-and-weather/, /ar/riding-out/, … */
export function SeriesPage({ lang, seriesKey }: { lang: Lang; seriesKey: SeriesKey }) {
  const isAr = lang === "ar";
  const s = SERIES[seriesKey];
  const inSeries = (l: Lang) =>
    siteEssays(lang)
      .filter((e) => e.data.series === seriesKey && e.data.lang === l)
      .sort((a, b) => (a.data.part ?? 0) - (b.data.part ?? 0));

  // Each language site lists its own edition of the book.
  const parts = inSeries(lang);
  const otherEdition = publishedEssays().some(
    (e) => e.data.series === seriesKey && e.data.lang !== lang,
  );
  const titleParts = isAr ? s.titlePartsAr : s.titleParts;
  const note = isAr ? s.noteAr : s.note;
  const front = isAr ? s.frontAr : s.front;
  const progress = useBookProgress(seriesKey, lang);

  return (
    <div className="page-series">
      <header className="bw-head">
        <img
          className="bw-cover"
          src={s.cover}
          alt={isAr ? `غلاف ${s.ar}` : `Cover of ${s.title}`}
          width="800"
          height="1200"
          fetchPriority="high"
        />
        <div className="bw-head-copy">
          <div className="bw-category">
            <span className="kicker">{isAr ? s.categoryAr : s.category}</span>
            <span dir={isAr ? "ltr" : "rtl"} lang={isAr ? "en" : "ar"}>
              {isAr ? s.category : s.categoryAr}
            </span>
          </div>
          <h1 className="bw-title">
            {`${titleParts[0]} `}
            <span className="amp">{titleParts[1]}</span>
            {` ${titleParts[2]}`}
          </h1>
          <p className="bw-title-ar" dir={isAr ? "ltr" : "rtl"} lang={isAr ? "en" : "ar"}>
            {isAr ? s.title : s.ar}
          </p>
          <p className="bw-subtitle">{isAr ? s.subtitleAr : s.subtitle}</p>
          <p className="bw-lede">{isAr ? s.blurbAr : s.blurb}</p>
          <div className="bw-meta">
            {(isAr ? s.factsAr : s.facts).map((f) => (
              <span key={f}>{f}</span>
            ))}
            <span>
              {isAr
                ? `${parts.length} من ${s.parts} منشور`
                : `${parts.length} of ${s.parts} published`}
            </span>
            {otherEdition &&
              (isAr ? (
                <span dir="ltr" lang="en">
                  Also in English
                </span>
              ) : (
                <span dir="rtl" lang="ar">
                  متوفر بالعربي
                </span>
              ))}
          </div>
        </div>
      </header>

      <section className="bw-front">
        {note && (
          <div className="bw-note">
            <span className="kicker">{note.label}</span>
            {note.body.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: md(p) }} />
            ))}
          </div>
        )}
        {front.map((block) => (
          <Fragment key={block.heading}>
            <h2>{block.heading}</h2>
            {block.body.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: md(p) }} />
            ))}
          </Fragment>
        ))}
      </section>

      <section className="bw-toc">
        <div className="section-head">
          <h2 className="kicker">{isAr ? "الأجزاء" : "The parts"}</h2>
          <span className="meta">
            {isAr
              ? `${parts.length} جزء`
              : `${parts.length} ${parts.length === 1 ? "part" : "parts"}`}
          </span>
        </div>
        {parts.length === 0 ? (
          <p className="bw-empty">
            {isAr ? "أول جزء نازل قريب." : "The first part goes up shortly."}
          </p>
        ) : (
          <>
            <ContinueReading progress={progress} parts={parts} lang={lang} />
            <BookPartsList
              parts={parts}
              sections={s.sections}
              lang={lang}
              read={progress ? new Set(progress.read) : undefined}
            />
          </>
        )}
      </section>

      <nav className="bw-other">
        {Object.values(SERIES)
          .filter((o) => o.key !== seriesKey)
          .map((o) => (
            <L key={o.key} className="bw-other-link" href={localePath(lang, `/${o.slug}/`)}>
              <span className="kicker">{isAr ? "الكتاب التاني" : "The other series"}</span>
              <span className="bw-other-title">{isAr ? o.ar : o.title}</span>
              <span className="bw-other-sub">{isAr ? o.subtitleAr : o.subtitle}</span>
            </L>
          ))}
      </nav>
    </div>
  );
}
