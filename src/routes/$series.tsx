import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import { BookPartsList } from "@/components/BookPartsList";
import { publishedEssays } from "@/lib/essays";
import { SERIES } from "@/lib/series";
import { seo } from "@/lib/seo";

/** A book's landing page: /bedrock-and-weather/, /riding-out/. */
export const Route = createFileRoute("/$series")({
  loader: ({ params }) => {
    const s = Object.values(SERIES).find((x) => x.slug === params.series);
    if (!s) throw notFound();
    return { key: s.key };
  },
  head: ({ loaderData }) => {
    const s = loaderData && SERIES[loaderData.key];
    if (!s) return {};
    return seo({
      path: `/${s.slug}/`,
      title: `${s.title} — Hazem Abdelghany`,
      description: s.blurb,
    });
  },
  component: SeriesPage,
});

const md = (t: string) => t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

function SeriesPage() {
  const { key } = Route.useLoaderData();
  const s = SERIES[key];
  const all = publishedEssays();
  const inSeries = (lang: "en" | "ar") =>
    all
      .filter((e) => e.data.series === key && e.data.lang === lang)
      .sort((a, b) => (a.data.part ?? 0) - (b.data.part ?? 0));

  // The book exists twice. The English list is the default; the Arabic edition
  // is the same book, so it lives on the same page behind a toggle rather than
  // at a second URL.
  const parts = inSeries("en");
  const partsAr = inSeries("ar");
  const [edition, setEdition] = useState<"en" | "ar">("en");

  return (
    <div className="page-series">
      <header className="bw-head">
        <img
          className="bw-cover"
          src={s.cover}
          alt={`Cover of ${s.title}`}
          width="800"
          height="1200"
          fetchPriority="high"
        />
        <div className="bw-head-copy">
          <div className="bw-category">
            <span className="kicker">{s.category}</span>
            <span dir="rtl" lang="ar">
              {s.categoryAr}
            </span>
          </div>
          <h1 className="bw-title">
            {`${s.titleParts[0]} `}
            <span className="amp">{s.titleParts[1]}</span>
            {` ${s.titleParts[2]}`}
          </h1>
          <p className="bw-title-ar" dir="rtl" lang="ar">
            {s.ar}
          </p>
          <p className="bw-subtitle">{s.subtitle}</p>
          <p className="bw-lede">{s.blurb}</p>
          <div className="bw-meta">
            {s.facts.map((f) => (
              <span key={f}>{f}</span>
            ))}
            <span>{`${parts.length} of ${s.parts} published`}</span>
            {partsAr.length > 0 && (
              <span dir="rtl" lang="ar">
                متوفر بالعربي
              </span>
            )}
          </div>
        </div>
      </header>

      <section className="bw-front">
        {s.note && (
          <div className="bw-note">
            <span className="kicker">{s.note.label}</span>
            {s.note.body.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: md(p) }} />
            ))}
          </div>
        )}
        {s.front.map((block) => (
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
          <h2 className="kicker">The parts</h2>
          {partsAr.length > 0 ? (
            <div className="lang-switch" role="group" aria-label="Edition">
              <button
                type="button"
                className={edition === "en" ? "lang-btn is-on" : "lang-btn"}
                data-lang="en"
                onClick={() => setEdition("en")}
              >
                English
              </button>
              <button
                type="button"
                className={edition === "ar" ? "lang-btn is-on" : "lang-btn"}
                data-lang="ar"
                dir="rtl"
                lang="ar"
                onClick={() => setEdition("ar")}
              >
                بالعربي
              </button>
            </div>
          ) : (
            <span className="meta">
              {`${parts.length} ${parts.length === 1 ? "part" : "parts"}`}
            </span>
          )}
        </div>
        {parts.length === 0 ? (
          <p className="bw-empty">The first part goes up shortly.</p>
        ) : (
          <BookPartsList parts={parts} sections={s.sections} lang="en" hidden={edition !== "en"} />
        )}
        {partsAr.length > 0 && (
          <BookPartsList
            parts={partsAr}
            sections={s.sections}
            lang="ar"
            hidden={edition !== "ar"}
          />
        )}
      </section>

      <nav className="bw-other">
        {Object.values(SERIES)
          .filter((o) => o.key !== key)
          .map((o) => (
            <Link key={o.key} className="bw-other-link" to="/$series/" params={{ series: o.slug }}>
              <span className="kicker">The other series</span>
              <span className="bw-other-title">{o.title}</span>
              <span className="bw-other-sub">{o.subtitle}</span>
            </Link>
          ))}
      </nav>
    </div>
  );
}
