import { createFileRoute, Link } from "@tanstack/react-router";
import { publishedEssays } from "@/lib/essays";
import { SERIES } from "@/lib/series";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/books/")({
  head: () =>
    seo({
      path: "/books/",
      title: "Books · كتب — Hazem Abdelghany",
      description:
        "The long-form work: The Conditions of Fortune and The Effort Is Yours, published in parts in English and Arabic.",
    }),
  component: Books,
});

function Books() {
  const all = publishedEssays();

  // A book is a series with at least one published part. Long-form lives here;
  // one-off pieces live at /essays/. Keeping them on separate pages is the point:
  // a nineteen-part book and a single essay are not the same kind of thing.
  const books = Object.values(SERIES)
    .map((s) => ({
      s,
      count: all.filter((e) => e.data.series === s.key && e.data.lang === "en").length,
    }))
    .filter((b) => b.count > 0);

  return (
    <div className="page-books">
      <header className="page-head">
        <h1 className="page-title">Books</h1>
        <span dir="rtl" lang="ar" className="page-title-ar">
          كتب
        </span>
      </header>

      <p className="page-lede">
        Long-form work, written in parts and published as each part is finished. Shorter one-off
        pieces are under <Link to="/essays/">articles</Link>.
      </p>

      {books.map(({ s, count }) => (
        <Link key={s.key} className="book-card" to="/$series/" params={{ series: s.slug }}>
          <img
            className="book-card-cover"
            src={s.cover}
            alt={`Cover of ${s.title}`}
            width="800"
            height="1200"
          />
          <div className="book-card-copy">
            <div className="book-card-top">
              <div>
                <span className="tag">{s.category}</span>
                <span className="book-card-category-ar" dir="rtl" lang="ar">
                  {s.categoryAr}
                </span>
              </div>
              <span className="meta">{`${count} of ${s.parts} parts`}</span>
            </div>
            <h2 className="book-card-title">{s.title}</h2>
            <p className="book-card-ar" dir="rtl" lang="ar">
              {s.ar}
            </p>
            <p className="book-card-sub">{s.subtitle}</p>
            <p className="book-card-blurb">{s.blurb}</p>
            <span className="book-card-cta">Start reading →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
