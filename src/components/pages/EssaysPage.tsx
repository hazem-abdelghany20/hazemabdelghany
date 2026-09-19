import { EssayRow } from "@/components/EssayRow";
import { L } from "@/components/L";
import { siteEssays } from "@/lib/essays";
import { fwd, localePath, ofParts, type Lang } from "@/lib/i18n";
import { SERIES } from "@/lib/series";

export function EssaysPage({ lang }: { lang: Lang }) {
  const isAr = lang === "ar";
  const all = siteEssays(lang);

  // This page is articles only — one-off pieces that stand on their own.
  // Book parts are not listed here; a book is a different kind of thing and
  // lives at /books/, otherwise nineteen parts of one book bury everything else.
  const standalone = all.filter((e) => !e.data.series);
  const books = Object.values(SERIES)
    .map((s) => ({
      s,
      count: all.filter((e) => e.data.series === s.key && e.data.lang === lang).length,
    }))
    .filter((b) => b.count > 0);

  return (
    <div className="page-essays">
      <header className="page-head">
        <h1 className="page-title">{isAr ? "مقالات" : "Articles"}</h1>
        <span dir={isAr ? "ltr" : "rtl"} lang={isAr ? "en" : "ar"} className="page-title-ar">
          {isAr ? "Articles" : "مقالات"}
        </span>
      </header>

      {isAr ? (
        <p className="page-lede">
          {"مقالات منفصلة، كل واحدة قايمة بذاتها. الشغل الطويل موجود في "}
          <L href={localePath(lang, "/books/")}>الكتب</L>.
        </p>
      ) : (
        <p className="page-lede">
          {"One-off pieces, each one standing on its own. The long-form work is in the "}
          <L href="/books/">books</L>.
        </p>
      )}

      <div className="row-list">
        {standalone.map((e, i) => (
          <EssayRow key={e.id} essay={e} lang={lang} num={String(i + 1).padStart(2, "0")} />
        ))}
      </div>

      {books.length > 0 && (
        <section className="also-books">
          <div className="section-head">
            <h2 className="kicker">{isAr ? "وكمان — الكتب" : "Also — the books"}</h2>
            <span dir={isAr ? "ltr" : "rtl"} lang={isAr ? "en" : "ar"} className="section-head-ar">
              {isAr ? "The books" : "الكتب"}
            </span>
          </div>
          {books.map(({ s, count }) => (
            <L key={s.key} className="series-card" href={localePath(lang, `/${s.slug}/`)}>
              <div className="series-card-top">
                <span className="tag">{isAr ? "كتاب" : "Book"}</span>
                <span className="meta">{ofParts(lang, count, s.parts)}</span>
              </div>
              <h3 className="series-card-title">{isAr ? s.ar : s.title}</h3>
              <p className="series-card-sub">{isAr ? s.subtitleAr : s.subtitle}</p>
              <span className="series-card-cta">
                {isAr ? `ابدأ القراءة ${fwd(lang)}` : "Start reading →"}
              </span>
            </L>
          ))}
        </section>
      )}
    </div>
  );
}
