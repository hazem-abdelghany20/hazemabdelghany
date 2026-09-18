import { createFileRoute, Link } from "@tanstack/react-router";
import { EssayRow } from "@/components/EssayRow";
import { publishedEssays } from "@/lib/essays";
import { SERIES } from "@/lib/series";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/essays/")({
  head: () =>
    seo({
      path: "/essays/",
      title: "Articles · مقالات — Hazem Abdelghany",
      description:
        "Standalone articles by Hazem Abdelghany, across five threads — building, faith, the body, the mind, and perspective. In Egyptian Arabic and English. The long-form books live separately.",
    }),
  component: Essays,
});

function Essays() {
  const all = publishedEssays();

  // This page is articles only — one-off pieces that stand on their own.
  // Book parts are not listed here; a book is a different kind of thing and
  // lives at /books/, otherwise nineteen parts of one book bury everything else.
  const standalone = all.filter((e) => !e.data.series);
  const books = Object.values(SERIES)
    .map((s) => ({
      s,
      count: all.filter((e) => e.data.series === s.key && e.data.lang === "en").length,
    }))
    .filter((b) => b.count > 0);

  return (
    <div className="page-essays">
      <header className="page-head">
        <h1 className="page-title">Articles</h1>
        <span dir="rtl" lang="ar" className="page-title-ar">
          مقالات
        </span>
      </header>

      <p className="page-lede">
        {"One-off pieces, each one standing on its own. The long-form work is in the "}
        <Link to="/books/">books</Link>.
      </p>

      <div className="row-list">
        {standalone.map((e, i) => (
          <EssayRow key={e.id} essay={e} num={String(i + 1).padStart(2, "0")} />
        ))}
      </div>

      {books.length > 0 && (
        <section className="also-books">
          <div className="section-head">
            <h2 className="kicker">Also — the books</h2>
            <span dir="rtl" lang="ar" className="section-head-ar">
              الكتب
            </span>
          </div>
          {books.map(({ s, count }) => (
            <Link key={s.key} className="series-card" to="/$series/" params={{ series: s.slug }}>
              <div className="series-card-top">
                <span className="tag">Book</span>
                <span className="meta">{`${count} of ${s.parts} parts`}</span>
              </div>
              <h3 className="series-card-title">{s.title}</h3>
              <p className="series-card-sub">{s.subtitle}</p>
              <span className="series-card-cta">Start reading →</span>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
