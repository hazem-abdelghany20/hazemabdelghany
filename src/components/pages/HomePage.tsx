import { EssayRow } from "@/components/EssayRow";
import { L } from "@/components/L";
import { siteEssays } from "@/lib/essays";
import { fwd, localePath, ofParts, type Lang } from "@/lib/i18n";
import { SERIES } from "@/lib/series";
import { THREADS, type ThreadKey } from "@/lib/threads";

export function HomePage({ lang }: { lang: Lang }) {
  const isAr = lang === "ar";
  const published = siteEssays(lang);
  const to = (path: string) => localePath(lang, path);

  // Series parts are represented by their series card, not as individual rows —
  // otherwise one multi-part book occupies the entire homepage.
  const essays = published.filter((e) => !e.data.series).slice(0, 4);
  const seriesCards = Object.values(SERIES)
    .map((s) => ({
      s,
      count: published.filter((e) => e.data.series === s.key && e.data.lang === lang).length,
    }))
    .filter((c) => c.count > 0);

  // Each thread advertises how much is actually behind it.
  const threadCount = (key: ThreadKey) => {
    const inThread = published.filter((e) => e.data.thread === key);
    const standalone = inThread.filter((e) => !e.data.series).length;
    const series = new Set(inThread.filter((e) => e.data.series).map((e) => e.data.series)).size;
    return standalone + series;
  };

  return (
    <div className="page-home">
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-mark">
            {isAr ? "مكان لكلام أعمق" : "A place for deeper conversations"}
          </div>
          {isAr ? (
            <h1 className="hero-statement">
              هنا <em>بفكّر بصوت عالي</em> — عن البناء، والإيمان، والجسد، والعقل.
            </h1>
          ) : (
            <h1 className="hero-statement">
              This is where I <em>think out loud</em> — about building, faith, the body, and the
              mind.
            </h1>
          )}
          {isAr ? (
            <p className="hero-ar" dir="ltr" lang="en">
              This is where I think out loud — about building, faith, the body, and the mind.
            </p>
          ) : (
            <p className="hero-ar" dir="rtl" lang="ar">
              هنا بفكّر بصوت عالي — عن البناء، والإيمان، والجسد، والعقل.
            </p>
          )}
          <p className="hero-bio">
            {isAr
              ? "مؤسس Catalyst. مسلم. رياضي بيبني نفسه من جديد. تلميذ في مدرسة العقل. الموقع ده الصورة كاملة — مش أحلى اللقطات وبس."
              : "Founder at Catalyst. Muslim. Athlete mid-rebuild. Student of the mind. This site is the whole picture — not the highlight reel."}
          </p>
          <div className="hero-foot">
            <hr className="rule" />
            <span>{isAr ? "القاهرة · 2026" : "Cairo · 2026"}</span>
          </div>
        </div>
        <figure
          className="hero-visual"
          aria-label={
            isAr
              ? "مكتب كاتب بيطل على القاهرة والنيل"
              : "A writer's desk overlooking Cairo and the Nile"
          }
        >
          <img
            className="hero-image hero-image-light"
            src="/images/brand/hero-cairo-light.webp"
            alt={
              isAr
                ? "نوتة وكتب جنب شباك في القاهرة بيطل على النيل وقت النهار"
                : "A notebook and books beside a Cairo window overlooking the Nile in daylight"
            }
            width="1440"
            height="960"
            fetchPriority="high"
          />
          <img
            className="hero-image hero-image-dark"
            src="/images/brand/hero-cairo-dark.webp"
            alt={
              isAr
                ? "نفس المكتب ونفس منظر النيل بعد المغرب"
                : "The same Cairo desk and Nile view at blue hour"
            }
            width="1440"
            height="960"
          />
          <figcaption>
            {isAr ? "نفس النهر. كلام أعمق." : "Same river. A deeper conversation."}
          </figcaption>
        </figure>
      </section>

      <section className="threads">
        <div className="section-head">
          <h2 className="kicker">{isAr ? "الخيوط الخمسة" : "The Five Threads"}</h2>
          <span dir={isAr ? "ltr" : "rtl"} lang={isAr ? "en" : "ar"} className="section-head-ar">
            {isAr ? "The Five Threads" : "الخيوط الخمسة"}
          </span>
        </div>
        <div className="threads-grid">
          {THREADS.map((t, i) => {
            const count = threadCount(t.key);
            return (
              <L key={t.key} className="thread" href={to(`/threads/${t.key}/`)}>
                <div className="thread-image-frame">
                  <img
                    className="thread-image"
                    src={`/images/threads/${t.key}.webp`}
                    alt=""
                    width="960"
                    height="720"
                    loading="lazy"
                  />
                </div>
                <div className="thread-title-line">
                  <span className="row-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="thread-ar" dir="rtl" lang="ar">
                    {t.ar}
                  </span>
                </div>
                <span className="tag" lang="en">
                  {t.en}
                </span>
                <span className="thread-blurb">{isAr ? t.blurbAr : t.blurb}</span>
                <span className="thread-count">
                  {count === 0
                    ? isAr
                      ? "لسه مفيش"
                      : "Nothing yet"
                    : isAr
                      ? `${count} للقراءة ${fwd(lang)}`
                      : `${count} to read →`}
                </span>
              </L>
            );
          })}
        </div>
      </section>

      <section className="essays">
        <div className="section-head">
          <div style={{ display: "flex", alignItems: "baseline", gap: "14px" }}>
            <h2 className="kicker">{isAr ? "كتب" : "Books"}</h2>
            <span dir={isAr ? "ltr" : "rtl"} lang={isAr ? "en" : "ar"} className="section-head-ar">
              {isAr ? "Books" : "كتب"}
            </span>
          </div>
          <L href={to("/books/")} className="meta">
            {isAr ? `كل الكتب ${fwd(lang)}` : "All books →"}
          </L>
        </div>
        <div className="home-books-grid">
          {seriesCards.map(({ s, count }) => (
            <L key={s.key} className="home-series" href={to(`/${s.slug}/`)}>
              <img
                className="home-series-cover"
                src={s.cover}
                alt={isAr ? `غلاف ${s.ar}` : `Cover of ${s.title}`}
                width="800"
                height="1200"
                loading="lazy"
              />
              <div className="home-series-copy">
                <div className="home-series-top">
                  <span className="tag">{isAr ? s.categoryAr : s.category}</span>
                  <span
                    className="home-series-category-ar"
                    dir={isAr ? "ltr" : "rtl"}
                    lang={isAr ? "en" : "ar"}
                  >
                    {isAr ? s.category : s.categoryAr}
                  </span>
                </div>
                <h3 className="home-series-title">{isAr ? s.ar : s.title}</h3>
                <p
                  className="home-series-title-ar"
                  dir={isAr ? "ltr" : "rtl"}
                  lang={isAr ? "en" : "ar"}
                >
                  {isAr ? s.title : s.ar}
                </p>
                <p className="home-series-sub">{isAr ? s.subtitleAr : s.subtitle}</p>
                <span className="meta">
                  {isAr
                    ? `${ofParts(lang, count, s.parts)} · ابدأ القراءة ${fwd(lang)}`
                    : `${count} of ${s.parts} parts · Start reading →`}
                </span>
              </div>
            </L>
          ))}
        </div>
      </section>

      <section className="essays">
        <div className="section-head">
          <div style={{ display: "flex", alignItems: "baseline", gap: "14px" }}>
            <h2 className="kicker">{isAr ? "مقالات" : "Articles"}</h2>
            <span dir={isAr ? "ltr" : "rtl"} lang={isAr ? "en" : "ar"} className="section-head-ar">
              {isAr ? "Articles" : "مقالات"}
            </span>
          </div>
          <L href={to("/essays/")} className="meta">
            {isAr ? `كل المقالات ${fwd(lang)}` : "All articles →"}
          </L>
        </div>
        <div className="row-list">
          {essays.map((e, i) => (
            <EssayRow key={e.id} essay={e} lang={lang} num={String(i + 1).padStart(2, "0")} />
          ))}
        </div>
      </section>

      <section className="about">
        <div className="about-head">
          <span className="about-ar" dir="rtl" lang="ar">
            عنّي
          </span>
          <h2 className="kicker" lang="en">
            About
          </h2>
        </div>
        <div className="about-body">
          {isAr ? (
            <p>
              أنا حازم — من القاهرة. بدير <em>Catalyst</em>، شركة ذكاء اصطناعي وبرمجيات، وببني{" "}
              <em>Mental Diet</em> مع طبيبة نفسية. بكتب كل الكود بوكلاء الذكاء الاصطناعي، وبتمرّن
              حوالين رباط صليبي اتعمل من جديد، وبحفظ قرآن يوم الاتنين، وحياتي كلها ماشية على نظام
              واحد. المقالات هنا هي طريقة تفكيري — بتتكتب بمساعدة الذكاء الاصطناعي، بس التفكير
              تفكيري أنا.
            </p>
          ) : (
            <p>
              I'm Hazem — from Cairo. I run <em>Catalyst</em>, an AI and software company, and
              co-build <em>Mental Diet</em> with a psychiatrist. I code everything with agentic AI,
              train around a rebuilt ACL, memorize Qur'an on Mondays, and keep my whole life in one
              system. The essays here are how I think — drafted with AI, but the thinking is mine.
            </p>
          )}
          <L href={to("/about/")} className="meta">
            {isAr ? `أكتر عنّي ${fwd(lang)}` : "More about me →"}
          </L>
        </div>
      </section>
    </div>
  );
}
