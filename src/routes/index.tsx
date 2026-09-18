import { createFileRoute, Link } from "@tanstack/react-router";
import { EssayRow } from "@/components/EssayRow";
import { publishedEssays } from "@/lib/essays";
import { THREADS, type ThreadKey } from "@/lib/threads";
import { SERIES } from "@/lib/series";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo({ path: "/" }),
  component: Home,
});

function Home() {
  const published = publishedEssays();

  // Series parts are represented by their series card, not as individual rows —
  // otherwise one multi-part book occupies the entire homepage.
  const essays = published.filter((e) => !e.data.series).slice(0, 4);
  const seriesCards = Object.values(SERIES)
    .map((s) => ({
      s,
      count: published.filter((e) => e.data.series === s.key && e.data.lang === "en").length,
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
          <div className="hero-mark">A place for deeper conversations</div>
          <h1 className="hero-statement">
            This is where I <em>think out loud</em> — about building, faith, the body, and the mind.
          </h1>
          <p className="hero-ar" dir="rtl" lang="ar">
            هنا بفكّر بصوت عالي — عن البناء، والإيمان، والجسد، والعقل.
          </p>
          <p className="hero-bio">
            Founder at Catalyst. Muslim. Athlete mid-rebuild. Student of the mind. This site is the
            whole picture — not the highlight reel.
          </p>
          <div className="hero-foot">
            <hr className="rule" />
            <span>Cairo · 2026</span>
          </div>
        </div>
        <figure className="hero-visual" aria-label="A writer's desk overlooking Cairo and the Nile">
          <img
            className="hero-image hero-image-light"
            src="/images/brand/hero-cairo-light.webp"
            alt="A notebook and books beside a Cairo window overlooking the Nile in daylight"
            width="1440"
            height="960"
            fetchPriority="high"
          />
          <img
            className="hero-image hero-image-dark"
            src="/images/brand/hero-cairo-dark.webp"
            alt="The same Cairo desk and Nile view at blue hour"
            width="1440"
            height="960"
          />
          <figcaption>Same river. A deeper conversation.</figcaption>
        </figure>
      </section>

      <section className="threads">
        <div className="section-head">
          <h2 className="kicker">The Five Threads</h2>
          <span dir="rtl" lang="ar" className="section-head-ar">
            الخيوط الخمسة
          </span>
        </div>
        <div className="threads-grid">
          {THREADS.map((t, i) => {
            const count = threadCount(t.key);
            return (
              <Link
                key={t.key}
                className="thread"
                to="/threads/$thread/"
                params={{ thread: t.key }}
              >
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
                <span className="tag">{t.en}</span>
                <span className="thread-blurb">{t.blurb}</span>
                <span className="thread-count">
                  {count === 0 ? "Nothing yet" : `${count} to read →`}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="essays">
        <div className="section-head">
          <div style={{ display: "flex", alignItems: "baseline", gap: "14px" }}>
            <h2 className="kicker">Books</h2>
            <span dir="rtl" lang="ar" className="section-head-ar">
              كتب
            </span>
          </div>
          <Link to="/books/" className="meta">
            All books →
          </Link>
        </div>
        <div className="home-books-grid">
          {seriesCards.map(({ s, count }) => (
            <Link key={s.key} className="home-series" to="/$series/" params={{ series: s.slug }}>
              <img
                className="home-series-cover"
                src={s.cover}
                alt={`Cover of ${s.title}`}
                width="800"
                height="1200"
                loading="lazy"
              />
              <div className="home-series-copy">
                <div className="home-series-top">
                  <span className="tag">{s.category}</span>
                  <span className="home-series-category-ar" dir="rtl" lang="ar">
                    {s.categoryAr}
                  </span>
                </div>
                <h3 className="home-series-title">{s.title}</h3>
                <p className="home-series-title-ar" dir="rtl" lang="ar">
                  {s.ar}
                </p>
                <p className="home-series-sub">{s.subtitle}</p>
                <span className="meta">{`${count} of ${s.parts} parts · Start reading →`}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="essays">
        <div className="section-head">
          <div style={{ display: "flex", alignItems: "baseline", gap: "14px" }}>
            <h2 className="kicker">Articles</h2>
            <span dir="rtl" lang="ar" className="section-head-ar">
              مقالات
            </span>
          </div>
          <Link to="/essays/" className="meta">
            All articles →
          </Link>
        </div>
        <div className="row-list">
          {essays.map((e, i) => (
            <EssayRow key={e.id} essay={e} num={String(i + 1).padStart(2, "0")} />
          ))}
        </div>
      </section>

      <section className="about">
        <div className="about-head">
          <span className="about-ar" dir="rtl" lang="ar">
            عنّي
          </span>
          <h2 className="kicker">About</h2>
        </div>
        <div className="about-body">
          <p>
            I'm Hazem — from Cairo. I run <em>Catalyst</em>, an AI and software company, and
            co-build <em>Mental Diet</em> with a psychiatrist. I code everything with agentic AI,
            train around a rebuilt ACL, memorize Qur'an on Mondays, and keep my whole life in one
            system. The essays here are how I think — drafted with AI, but the thinking is mine.
          </p>
          <Link to="/about/" className="meta">
            More about me →
          </Link>
        </div>
      </section>
    </div>
  );
}
