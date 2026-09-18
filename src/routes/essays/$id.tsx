import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { EssayRow } from "@/components/EssayRow";
import { RefPanels } from "@/components/RefPanels";
import { SeriesBanner } from "@/components/SeriesBanner";
import { SeriesNav } from "@/components/SeriesNav";
import { ESSAY_REDIRECTS, essayHtml, publishedEssays } from "@/lib/essays";
import { threadLabel, formatDate } from "@/lib/threads";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/essays/$id")({
  loader: async ({ params }) => {
    const moved = ESSAY_REDIRECTS[`/essays/${params.id}/`];
    if (moved) {
      const id = moved.split("/")[2]!;
      throw redirect({ to: "/essays/$id/", params: { id }, statusCode: 301 });
    }
    const essay = publishedEssays().find((e) => e.id === params.id);
    const html = essay && (await essayHtml(essay.id));
    if (!essay || html === undefined) throw notFound();
    return { id: essay.id, html, lang: essay.data.lang };
  },
  head: ({ loaderData }) => {
    const essay = loaderData && publishedEssays().find((e) => e.id === loaderData.id);
    if (!essay) return {};
    return seo({
      path: `/essays/${essay.id}/`,
      title: `${essay.data.title} — Hazem Abdelghany`,
      description: essay.data.description,
      lang: essay.data.lang,
      published: essay.data.date,
      type: "article",
      section: threadLabel(essay.data.thread).en,
    });
  },
  component: EssayPage,
});

function EssayPage() {
  const { id, html } = Route.useLoaderData();
  const all = publishedEssays();
  const essay = all.find((e) => e.id === id)!;
  const isAr = essay.data.lang === "ar";
  const thread = threadLabel(essay.data.thread);
  const translation = essay.data.translationOf
    ? all.find((e) => e.id === essay.data.translationOf)
    : undefined;

  // Series context: siblings in reading order, so a part knows where it sits.
  const series = essay.data.series;
  // Siblings are scoped to this part's own language: the Arabic edition is its
  // own reading order, not an interleaving of the two.
  const siblings = series
    ? all
        .filter((e) => e.data.series === series && e.data.lang === essay.data.lang)
        .sort((a, b) => (a.data.part ?? 0) - (b.data.part ?? 0))
    : [];
  const idx = siblings.findIndex((e) => e.id === essay.id);
  const prevPart = idx > 0 ? siblings[idx - 1] : undefined;
  const nextPart = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : undefined;

  // Never leave a reader with nowhere to go. A series part already has prev/next,
  // so it only needs a fallback when it is the last one; a standalone essay may be
  // offered a series part, labelled as such.
  const pool = all
    .filter((e) => e.id !== essay.id && e.id !== essay.data.translationOf)
    .filter((e) => e.data.series !== series || !series)
    .filter((e) => e.data.lang === essay.data.lang)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const readNext = series && (prevPart || nextPart) ? [] : pool.slice(0, 2);

  return (
    <div className="page-essay">
      <header className="essay-head">
        {series && essay.data.partLabel && (
          <SeriesBanner series={series} partLabel={essay.data.partLabel} lang={essay.data.lang} />
        )}
        <Link
          className="essay-kicker"
          to="/threads/$thread/"
          params={{ thread: essay.data.thread }}
        >
          <span dir="rtl" lang="ar" style={{ fontSize: "17px", color: "var(--accent)" }}>
            {thread.ar}
          </span>
          <span className="tag">{thread.en}</span>
        </Link>
        <h1 className="essay-title" dir={isAr ? "rtl" : undefined} lang={isAr ? "ar" : undefined}>
          {essay.data.title}
        </h1>
        <div className="essay-meta">
          <span className="meta">{formatDate(essay.data.date)}</span>
          {essay.data.minutes && (
            <>
              <span className="dot">·</span>
              {isAr ? (
                <span dir="rtl" lang="ar" style={{ fontSize: "15px", color: "var(--muted)" }}>
                  {`${essay.data.minutes} دقايق قراءة`}
                </span>
              ) : (
                <span className="meta">{`${essay.data.minutes} min read`}</span>
              )}
            </>
          )}
          {translation && (
            <>
              <span className="dot">·</span>
              <Link
                to="/essays/$id/"
                params={{ id: translation.id }}
                className="meta"
                dir={isAr ? "ltr" : "rtl"}
                lang={isAr ? "en" : "ar"}
                hrefLang={isAr ? "en" : "ar"}
              >
                {isAr ? "Read in English" : "اقراها بالعربي"}
              </Link>
            </>
          )}
        </div>
      </header>

      {essay.data.heroImage && (
        <figure className="essay-hero">
          <img
            src={essay.data.heroImage}
            alt={essay.data.heroAlt ?? ""}
            width="1536"
            height="1024"
            loading="eager"
            decoding="async"
          />
        </figure>
      )}

      <article
        key={essay.id}
        className={isAr ? "prose prose-ar" : "prose"}
        dir={isAr ? "rtl" : undefined}
        lang={isAr ? "ar" : "en"}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <RefPanels contentKey={essay.id} />

      {series && (
        <SeriesNav series={series} prev={prevPart} next={nextPart} lang={essay.data.lang} />
      )}

      {readNext.length > 0 && (
        <section className="read-next">
          <div className="section-head">
            <h2 className="kicker">Read Next</h2>
            <span dir="rtl" lang="ar" style={{ fontSize: "16px", color: "var(--muted)" }}>
              اقرا كمان
            </span>
          </div>
          <div className="row-list">
            {readNext.map((e) => (
              <EssayRow key={e.id} essay={e} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
