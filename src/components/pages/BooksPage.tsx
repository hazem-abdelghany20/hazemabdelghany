import { L } from "@/components/L";
import { siteEssays } from "@/lib/essays";
import { fwd, localePath, ofParts, type Lang } from "@/lib/i18n";
import { SERIES } from "@/lib/series";

export function BooksPage({ lang }: { lang: Lang }) {
  const isAr = lang === "ar";
  const all = siteEssays(lang);

  // A book is a series with at least one published part. Long-form lives here;
  // one-off pieces live at /essays/. Keeping them on separate pages is the point:
  // a nineteen-part book and a single essay are not the same kind of thing.
  const books = Object.values(SERIES)
    .map((s) => ({
      s,
      count: all.filter((e) => e.data.series === s.key && e.data.lang === lang).length,
    }))
    .filter((b) => b.count > 0);

  return (
    <div className="page-books">
      <header className="page-head">
        <h1 className="page-title">{isAr ? "كتب" : "Books"}</h1>
        <span dir={isAr ? "ltr" : "rtl"} lang={isAr ? "en" : "ar"} className="page-title-ar">
          {isAr ? "Books" : "كتب"}
        </span>
      </header>

      {isAr ? (
        <p className="page-lede">
          {
            "شغل طويل، بيتكتب على أجزاء وبينزل كل جزء أول ما يخلص. المقالات القصيرة المنفصلة موجودة في "
          }
          <L href={localePath(lang, "/essays/")}>المقالات</L>.
        </p>
      ) : (
        <p className="page-lede">
          Long-form work, written in parts and published as each part is finished. Shorter one-off
          pieces are under <L href="/essays/">articles</L>.
        </p>
      )}

      {books.map(({ s, count }) => (
        <L key={s.key} className="book-card" href={localePath(lang, `/${s.slug}/`)}>
          <img
            className="book-card-cover"
            src={s.cover}
            alt={isAr ? `غلاف ${s.ar}` : `Cover of ${s.title}`}
            width="800"
            height="1200"
          />
          <div className="book-card-copy">
            <div className="book-card-top">
              <div>
                <span className="tag">{isAr ? s.categoryAr : s.category}</span>
                <span
                  className="book-card-category-ar"
                  dir={isAr ? "ltr" : "rtl"}
                  lang={isAr ? "en" : "ar"}
                >
                  {isAr ? s.category : s.categoryAr}
                </span>
              </div>
              <span className="meta">{ofParts(lang, count, s.parts)}</span>
            </div>
            <h2 className="book-card-title">{isAr ? s.ar : s.title}</h2>
            <p className="book-card-ar" dir={isAr ? "ltr" : "rtl"} lang={isAr ? "en" : "ar"}>
              {isAr ? s.title : s.ar}
            </p>
            <p className="book-card-sub">{isAr ? s.subtitleAr : s.subtitle}</p>
            <p className="book-card-blurb">{isAr ? s.blurbAr : s.blurb}</p>
            <span className="book-card-cta">
              {isAr ? `ابدأ القراءة ${fwd(lang)}` : "Start reading →"}
            </span>
          </div>
        </L>
      ))}
    </div>
  );
}
