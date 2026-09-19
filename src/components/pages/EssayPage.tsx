import { notFound, redirect } from "@tanstack/react-router";
import { EssayRow } from "@/components/EssayRow";
import { L } from "@/components/L";
import { RefPanels } from "@/components/RefPanels";
import { SeriesBanner } from "@/components/SeriesBanner";
import { SeriesNav } from "@/components/SeriesNav";
import {
  ESSAY_REDIRECTS,
  essayHtml,
  essayPath,
  essaySlug,
  publishedEssays,
  siteEssays,
  translationOf,
  type Essay,
} from "@/lib/essays";
import { bilingualAlternates, localePath, titleSuffix, type Lang } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { threadLabel, formatDate } from "@/lib/threads";

const movedTo = (href: string) => redirect({ href, statusCode: 301 } as never);

/** Loader for /essays/$id/ and /ar/essays/$id/. */
export async function loadEssay(lang: Lang, slug: string) {
  const moved = ESSAY_REDIRECTS[localePath(lang, `/essays/${slug}/`)];
  if (moved) throw movedTo(moved);
  // Arabic essays used to live at /essays/<slug>-ar/ on the English site.
  if (lang === "en") {
    const legacy = publishedEssays().find(
      (e) => e.id === slug && e.data.lang === "ar" && essaySlug(e) !== e.id,
    );
    if (legacy) throw movedTo(essayPath(legacy, "ar"));
  }
  const essay = siteEssays(lang).find((e) => essaySlug(e) === slug);
  const html = essay && (await essayHtml(essay.id));
  if (!essay || html === undefined) throw notFound();
  return { id: essay.id, html };
}

export function essayHead(lang: Lang, id: string | undefined) {
  const essay = id ? publishedEssays().find((e) => e.id === id) : undefined;
  if (!essay) return {};
  const other = translationOf(essay);
  const byLang = (l: Lang) => (essay.data.lang === l ? essay : other);
  const en = byLang("en");
  const ar = byLang("ar");
  return seo({
    path: essayPath(essay, lang),
    // An untranslated essay shown on the other site points back to its own.
    canonicalPath: essayPath(essay, essay.data.lang),
    title: `${essay.data.title}${titleSuffix(lang)}`,
    description: essay.data.description,
    lang: essay.data.lang,
    published: essay.data.date,
    type: "article",
    section: threadLabel(essay.data.thread).en,
    alternates: en && ar ? bilingualAlternates(essayPath(en, "en"), essayPath(ar, "ar")) : [],
  });
}

export function EssayPage({ lang, id, html }: { lang: Lang; id: string; html: string }) {
  const all = siteEssays(lang);
  const essay = publishedEssays().find((e) => e.id === id)!;
  const isAr = essay.data.lang === "ar";
  const siteAr = lang === "ar";
  const thread = threadLabel(essay.data.thread);
  const translation = translationOf(essay);

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
  const pool: Essay[] = all
    .filter((e) => e.id !== essay.id && e.id !== translation?.id)
    .filter((e) => e.data.series !== series || !series)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const readNext = series && (prevPart || nextPart) ? [] : pool.slice(0, 2);

  return (
    <div className="page-essay">
      <header className="essay-head">
        {series && essay.data.partLabel && (
          <SeriesBanner
            series={series}
            partLabel={essay.data.partLabel}
            lang={essay.data.lang}
            site={lang}
          />
        )}
        <L className="essay-kicker" href={localePath(lang, `/threads/${essay.data.thread}/`)}>
          <span dir="rtl" lang="ar" style={{ fontSize: "17px", color: "var(--accent)" }}>
            {thread.ar}
          </span>
          <span className="tag" lang="en">
            {thread.en}
          </span>
        </L>
        <h1 className="essay-title" dir={isAr ? "rtl" : undefined} lang={isAr ? "ar" : undefined}>
          {essay.data.title}
        </h1>
        <div className="essay-meta">
          <span className="meta">{formatDate(essay.data.date, lang)}</span>
          {essay.data.minutes && (
            <>
              <span className="dot">·</span>
              {siteAr ? (
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
              <a
                href={essayPath(translation, translation.data.lang)}
                className="meta"
                dir={isAr ? "ltr" : "rtl"}
                lang={isAr ? "en" : "ar"}
                hrefLang={isAr ? "en" : "ar"}
              >
                {isAr ? "Read in English" : "اقراها بالعربي"}
              </a>
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
        <SeriesNav
          series={series}
          prev={prevPart}
          next={nextPart}
          lang={essay.data.lang}
          site={lang}
        />
      )}

      {readNext.length > 0 && (
        <section className="read-next">
          <div className="section-head">
            <h2 className="kicker">{siteAr ? "اقرا كمان" : "Read Next"}</h2>
            <span
              dir={siteAr ? "ltr" : "rtl"}
              lang={siteAr ? "en" : "ar"}
              style={{ fontSize: "16px", color: "var(--muted)" }}
            >
              {siteAr ? "Read Next" : "اقرا كمان"}
            </span>
          </div>
          <div className="row-list">
            {readNext.map((e) => (
              <EssayRow key={e.id} essay={e} lang={lang} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
