import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { L } from "@/components/L";
import { AiLog } from "@/components/ai/AiLog";
import { aiPath, aiSlug, aiTranslationOf, clock, publishedAi, siteAi } from "@/lib/ai";
import { fwd, localePath, type Lang } from "@/lib/i18n";

/** /ai/writing/<slug>/ — one piece. The reel it came from plays beside the
 *  text (above it on a phone); the text is the long version. */
export function AiArticlePage({ lang, id, html }: { lang: Lang; id: string; html: string }) {
  const isAr = lang === "ar";
  const piece = publishedAi().find((e) => e.id === id)!;
  const { data } = piece;
  const pieceAr = data.lang === "ar";
  const other = aiTranslationOf(piece);
  const more = siteAi(lang)
    .filter((p) => p.id !== piece.id && aiSlug(p) !== aiSlug(piece))
    .slice(0, 3);
  const date = data.date.toISOString().slice(0, 10);
  const prose = useRef<HTMLDivElement>(null);

  // Each code block is a prompt to copy: give it a label and a copy key.
  useEffect(() => {
    const root = prose.current;
    if (!root) return;
    const bars: HTMLElement[] = [];
    root.querySelectorAll("pre").forEach((pre) => {
      if (pre.querySelector(".t-code-bar")) return;
      const code = pre.querySelector("code");
      const lang = (code?.className.match(/language-(\S+)/)?.[1] ?? "text").replace(
        "plaintext",
        "text",
      );
      const bar = document.createElement("div");
      bar.className = "t-code-bar";
      const name = document.createElement("span");
      name.innerHTML = `<span class="t-ps1">$</span>${lang === "bash" || lang === "sh" ? "terminal" : `try-it.${lang === "text" ? "txt" : lang}`}`;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "t-copy";
      btn.textContent = isAr ? "انسخ" : "copy";
      btn.addEventListener("click", () => {
        void navigator.clipboard?.writeText(code?.innerText ?? pre.innerText).then(() => {
          btn.textContent = isAr ? "اتنسخ" : "copied";
          btn.dataset["done"] = "";
          setTimeout(() => {
            btn.textContent = isAr ? "انسخ" : "copy";
            delete btn.dataset["done"];
          }, 1600);
        });
      });
      bar.append(name, btn);
      pre.prepend(bar);
      bars.push(bar);
    });
    return () => bars.forEach((b) => b.remove());
  }, [html, isAr]);

  return (
    <article className="t-article">
      <header className="t-art-head">
        <p className="t-mark" dir="ltr">
          <span className="t-ps1" aria-hidden="true">
            ${" "}
          </span>
          cat <span className="t-flag">writing/{aiSlug(piece)}.md</span>
        </p>
        <h1 className="t-art-title" lang={pieceAr ? "ar" : "en"} dir={pieceAr ? "rtl" : "ltr"}>
          {data.title}
        </h1>
        {data.description && (
          <p className="t-art-lede" lang={pieceAr ? "ar" : "en"}>
            {data.description}
          </p>
        )}
        <div className="t-art-meta">
          {[
            <time key="d" dateTime={date} dir="ltr">
              {date}
            </time>,
            <Link key="t" to={localePath(lang, "/ai/writing/") as "/"} hash={data.topic} dir="ltr">
              {data.topic}/
            </Link>,
            data.minutes ? (
              <span key="m" lang={isAr ? "ar" : "en"}>
                {isAr ? `${data.minutes} دقايق قراية` : `${data.minutes} min read`}
              </span>
            ) : null,
            other && other.data.lang !== data.lang ? (
              <L
                key="o"
                href={aiPath(other, other.data.lang)}
                lang={other.data.lang}
                hrefLang={other.data.lang === "ar" ? "ar-EG" : "en"}
              >
                {other.data.lang === "ar" ? "اقراها بالعربي" : "Read it in English"}
              </L>
            ) : null,
          ]
            .filter(Boolean)
            .flatMap((item, i) =>
              i === 0
                ? [item]
                : [
                    <span key={`s${i}`} className="t-sep" aria-hidden="true">
                      ·
                    </span>,
                    item,
                  ],
            )}
        </div>
      </header>

      <div className="t-art-grid">
        <div
          ref={prose}
          className="t-prose"
          lang={pieceAr ? "ar" : "en"}
          dir={pieceAr ? "rtl" : "ltr"}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {data.video && (
          <figure className="t-reel" aria-label={isAr ? "الفيديو الأصلي" : "The original video"}>
            <div className="t-reel-bar" dir="ltr">
              <span>
                <b>▶</b> reel.mp4
              </span>
              {data.video.seconds ? <span>{clock(data.video.seconds)}</span> : null}
            </div>
            <video
              controls
              playsInline
              preload="metadata"
              poster={data.video.poster}
              src={data.video.src}
            />
            {data.video.instagram && (
              <figcaption>
                <span lang={isAr ? "ar" : "en"}>
                  {isAr ? "اتنشر الأول على" : "First posted on"}
                </span>
                <a href={data.video.instagram} target="_blank" rel="noopener noreferrer" dir="ltr">
                  Instagram ↗
                </a>
              </figcaption>
            )}
          </figure>
        )}
      </div>

      {more.length > 0 && (
        <section className="t-section" aria-labelledby="t-more-h">
          <div className="t-head">
            <div className="t-head-l">
              <h2 className="t-kicker" id="t-more-h">
                <span className="sr-only">{isAr ? "اقرا كمان" : "Read next"}</span>
                <span aria-hidden="true" dir="ltr">
                  <span className="t-ps1">$</span> ls writing/ | head -3
                </span>
              </h2>
              <span className="t-head-ar" dir={isAr ? "ltr" : "rtl"} lang={isAr ? "en" : "ar"}>
                {isAr ? "Read next" : "اقرا كمان"}
              </span>
            </div>
            <L href={localePath(lang, "/ai/writing/")} className="t-more">
              {isAr ? `كل الكتابات ${fwd(lang)}` : "All writing →"}
            </L>
          </div>
          <AiLog pieces={more} lang={lang} />
        </section>
      )}
    </article>
  );
}
