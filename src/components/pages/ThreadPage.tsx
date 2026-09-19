import { EssayRow } from "@/components/EssayRow";
import { L } from "@/components/L";
import { siteEssays } from "@/lib/essays";
import { back, localePath, ofParts, type Lang } from "@/lib/i18n";
import { SERIES } from "@/lib/series";
import { THREADS, type ThreadKey } from "@/lib/threads";

export function ThreadPage({ lang, threadKey }: { lang: Lang; threadKey: ThreadKey }) {
  const isAr = lang === "ar";
  const t = THREADS.find((x) => x.key === threadKey)!;
  const all = siteEssays(lang).filter((e) => e.data.thread === threadKey);

  // A book shows as one card rather than as its parts — otherwise a
  // nineteen-part book is the entire thread page.
  const standalone = all.filter((e) => !e.data.series);
  const seriesHere = Object.values(SERIES)
    .map((s) => ({
      s,
      count: all.filter((e) => e.data.series === s.key && e.data.lang === lang).length,
    }))
    .filter((c) => c.count > 0);

  const others = THREADS.filter((x) => x.key !== threadKey);
  const total = standalone.length + seriesHere.length;

  return (
    <div className="page-thread">
      <header className="thread-head">
        <L href={localePath(lang, "/essays/")} className="back">
          {isAr ? `${back(lang)} كل المقالات` : "← All articles"}
        </L>
        <div className="thread-title-row">
          <h1 className="thread-title">{isAr ? t.ar : t.en}</h1>
          <span dir={isAr ? "ltr" : "rtl"} lang={isAr ? "en" : "ar"} className="thread-title-ar">
            {isAr ? t.en : t.ar}
          </span>
        </div>
        <p className="thread-blurb">{isAr ? t.blurbAr : t.blurb}</p>
      </header>

      {total === 0 ? (
        <p className="thread-empty">
          {isAr
            ? "لسه مفيش حاجة منشورة في الخيط ده. هو واحد من الخمسة اللي بكتب فيهم — بس لسه دوره ماجاش."
            : "Nothing published under this thread yet. It's one of the five I write across — it just hasn't had its turn."}
        </p>
      ) : (
        <div className="thread-body">
          {seriesHere.map(({ s, count }) => (
            <L key={s.key} className="thread-series" href={localePath(lang, `/${s.slug}/`)}>
              <div className="thread-series-top">
                <span className="tag">{isAr ? "كتاب" : "Book"}</span>
                <span className="meta">{ofParts(lang, count, s.parts)}</span>
              </div>
              <h2 className="thread-series-title">{isAr ? s.ar : s.title}</h2>
              <p className="thread-series-sub">{isAr ? s.subtitleAr : s.subtitle}</p>
            </L>
          ))}
          <div className="row-list">
            {standalone.map((e, i) => (
              <EssayRow key={e.id} essay={e} lang={lang} num={String(i + 1).padStart(2, "0")} />
            ))}
          </div>
        </div>
      )}

      <section className="thread-others">
        <div className="section-head">
          <h2 className="kicker">{isAr ? "الخيوط التانية" : "The other threads"}</h2>
          <span dir={isAr ? "ltr" : "rtl"} lang={isAr ? "en" : "ar"} className="section-head-ar">
            {isAr ? "The other threads" : "الخيوط التانية"}
          </span>
        </div>
        <div className="thread-others-grid">
          {others.map((o) => (
            <L key={o.key} className="thread-chip" href={localePath(lang, `/threads/${o.key}/`)}>
              <span className="thread-chip-ar" dir="rtl" lang="ar">
                {o.ar}
              </span>
              <span className="tag" lang="en">
                {o.en}
              </span>
              <span className="thread-chip-blurb">{isAr ? o.blurbAr : o.blurb}</span>
            </L>
          ))}
        </div>
      </section>
    </div>
  );
}
