import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { EssayRow } from "@/components/EssayRow";
import { publishedEssays } from "@/lib/essays";
import { THREADS } from "@/lib/threads";
import { SERIES } from "@/lib/series";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/threads/$thread")({
  loader: ({ params }) => {
    const t = THREADS.find((x) => x.key === params.thread);
    if (!t) throw notFound();
    return { key: t.key };
  },
  head: ({ loaderData }) => {
    const t = loaderData && THREADS.find((x) => x.key === loaderData.key);
    if (!t) return {};
    return seo({
      path: `/threads/${t.key}/`,
      title: `${t.en} · ${t.ar} — Hazem Abdelghany`,
      description: `${t.blurb} Essays by Hazem Abdelghany on ${t.en.toLowerCase()}.`,
    });
  },
  component: ThreadPage,
});

function ThreadPage() {
  const { key } = Route.useLoaderData();
  const t = THREADS.find((x) => x.key === key)!;
  const all = publishedEssays().filter((e) => e.data.thread === key);

  // A book shows as one card rather than as its parts — otherwise a
  // nineteen-part book is the entire thread page.
  const standalone = all.filter((e) => !e.data.series);
  const seriesHere = Object.values(SERIES)
    .map((s) => ({
      s,
      count: all.filter((e) => e.data.series === s.key && e.data.lang === "en").length,
    }))
    .filter((c) => c.count > 0);

  const others = THREADS.filter((x) => x.key !== key);
  const total = standalone.length + seriesHere.length;

  return (
    <div className="page-thread">
      <header className="thread-head">
        <Link to="/essays/" className="back">
          ← All articles
        </Link>
        <div className="thread-title-row">
          <h1 className="thread-title">{t.en}</h1>
          <span dir="rtl" lang="ar" className="thread-title-ar">
            {t.ar}
          </span>
        </div>
        <p className="thread-blurb">{t.blurb}</p>
      </header>

      {total === 0 ? (
        <p className="thread-empty">
          Nothing published under this thread yet. It's one of the five I write across — it just
          hasn't had its turn.
        </p>
      ) : (
        <div className="thread-body">
          {seriesHere.map(({ s, count }) => (
            <Link key={s.key} className="thread-series" to="/$series/" params={{ series: s.slug }}>
              <div className="thread-series-top">
                <span className="tag">Book</span>
                <span className="meta">{`${count} of ${s.parts} parts`}</span>
              </div>
              <h2 className="thread-series-title">{s.title}</h2>
              <p className="thread-series-sub">{s.subtitle}</p>
            </Link>
          ))}
          <div className="row-list">
            {standalone.map((e, i) => (
              <EssayRow key={e.id} essay={e} num={String(i + 1).padStart(2, "0")} />
            ))}
          </div>
        </div>
      )}

      <section className="thread-others">
        <div className="section-head">
          <h2 className="kicker">The other threads</h2>
          <span dir="rtl" lang="ar" className="section-head-ar">
            الخيوط التانية
          </span>
        </div>
        <div className="thread-others-grid">
          {others.map((o) => (
            <Link
              key={o.key}
              className="thread-chip"
              to="/threads/$thread/"
              params={{ thread: o.key }}
            >
              <span className="thread-chip-ar" dir="rtl" lang="ar">
                {o.ar}
              </span>
              <span className="tag">{o.en}</span>
              <span className="thread-chip-blurb">{o.blurb}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
