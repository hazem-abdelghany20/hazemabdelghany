import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { arabic, english } from "@/lib/about";

export function AboutPage({ lang = "en" }: { lang?: "en" | "ar" }) {
  const isAr = lang === "ar";
  const c = isAr ? arabic : english;
  const otherDir = isAr ? "ltr" : "rtl";
  const otherLang = isAr ? "en" : "ar";

  return (
    <div className={isAr ? "about-page is-ar" : "about-page"}>
      <header className="page-head">
        <h1 className="page-title">{c.title}</h1>
        <span className="page-title-other" dir={otherDir} lang={otherLang}>
          {c.titleOther}
        </span>
        <nav className="language-switch" aria-label={isAr ? "لغة الصفحة" : "Page language"}>
          {isAr ? (
            <Link to="/about/" lang="en" hrefLang="en">
              EN
            </Link>
          ) : (
            <span aria-current="page">EN</span>
          )}
          <span className="language-divider" aria-hidden="true">
            /
          </span>
          {isAr ? (
            <span aria-current="page">عربي</span>
          ) : (
            <Link to="/ar/about/" lang="ar" dir="rtl" hrefLang="ar-EG">
              عربي
            </Link>
          )}
        </nav>
      </header>

      <section className="opening" aria-labelledby="short-version">
        <p className="eyebrow" id="short-version">
          {c.shortLabel}
        </p>
        <p className="opening-statement">{c.statement}</p>
        <p className="opening-note">{c.note}</p>
      </section>

      <section className="about-section story" aria-labelledby="longer-version">
        <div className="section-label">
          <h2 className="section-kicker" id="longer-version">
            {c.storyLabel}
          </h2>
          <span dir={otherDir} lang={otherLang}>
            {c.storyOther}
          </span>
        </div>
        <div className={isAr ? "story-copy prose prose-ar" : "story-copy prose"}>
          {c.story.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          <blockquote>{c.quote}</blockquote>
        </div>
      </section>

      <section className="about-section" aria-labelledby="road-so-far">
        <div className="section-label section-label-wide">
          <h2 className="section-kicker" id="road-so-far">
            {c.timelineLabel}
          </h2>
          <span dir={otherDir} lang={otherLang}>
            {c.timelineOther}
          </span>
        </div>
        <div className="timeline">
          {c.timeline.map((item) => (
            <article key={item.year} className="timeline-entry">
              <div className="timeline-meta">
                <time dir="ltr">{item.year}</time>
                {item.mark && (
                  <span
                    className="org-mark"
                    role="img"
                    aria-label={isAr ? `شعار ${item.mark.label}` : `${item.mark.label} logo`}
                    style={
                      {
                        "--mark": `url('${item.mark.src}')`,
                        "--mark-width": `${item.mark.width}px`,
                        "--mark-height": `${item.mark.height}px`,
                      } as CSSProperties
                    }
                  />
                )}
              </div>
              <div className="timeline-copy">
                <h3>{item.title}</h3>
                {item.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" aria-labelledby="five-threads">
        <div className="section-label section-label-wide">
          <h2 className="section-kicker" id="five-threads">
            {c.threadsLabel}
          </h2>
          <span dir={otherDir} lang={otherLang}>
            {c.threadsOther}
          </span>
        </div>
        <div className="thread-list">
          {c.threads.map((thread) => (
            <a key={thread.number} className="thread-entry" href={thread.href}>
              <span className="thread-number" dir="ltr">
                {thread.number}
              </span>
              <div className="thread-name">
                <h3>{thread.name}</h3>
                <span dir={otherDir} lang={otherLang}>
                  {thread.secondary}
                </span>
              </div>
              <p>{thread.body}</p>
              <span className="thread-arrow" aria-hidden="true">
                {isAr ? "←" : "→"}
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="about-section beliefs" aria-labelledby="beliefs">
        <div className="section-label">
          <h2 className="section-kicker" id="beliefs">
            {c.beliefsLabel}
          </h2>
          <span dir={otherDir} lang={otherLang}>
            {c.beliefsOther}
          </span>
        </div>
        <ol className="belief-list">
          {c.beliefs.map((belief, i) => (
            <li key={i}>{belief}</li>
          ))}
        </ol>
      </section>

      <section className="about-section closing" aria-labelledby="why-this-site">
        <div className="section-label">
          <h2 className="section-kicker" id="why-this-site">
            {c.closingLabel}
          </h2>
          <span dir={otherDir} lang={otherLang}>
            {c.closingOther}
          </span>
        </div>
        <div className={isAr ? "closing-copy prose prose-ar" : "closing-copy prose"}>
          {c.closing.map((paragraph, index) => {
            const cls = [
              index === 1 && "closing-line",
              index === c.closing.length - 1 && "last-line",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <p key={index} className={cls || undefined}>
                {paragraph}
              </p>
            );
          })}
        </div>
      </section>
    </div>
  );
}
