import { AiLog } from "@/components/ai/AiLog";
import { AI_TOPICS, siteAi } from "@/lib/ai";
import type { Lang } from "@/lib/i18n";

/** /ai/writing/ — everything on the AI side, grouped by topic. Each group has
 *  an anchor (#definitions, #context…) that the topic rows link to. */
export function AiWritingPage({ lang }: { lang: Lang }) {
  const isAr = lang === "ar";
  const pieces = siteAi(lang);
  const groups = AI_TOPICS.map((t) => ({
    t,
    items: pieces.filter((p) => p.data.topic === t.key),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="page-ai-writing">
      <header className="t-page-head">
        <p className="t-mark" dir="ltr">
          <span className="t-ps1" aria-hidden="true">
            ${" "}
          </span>
          ls <span className="t-flag">writing/</span>
        </p>
        <h1 className="t-page-title" lang={isAr ? "ar" : "en"}>
          {isAr ? "كتابات" : "Writing"}
          <span className="t-twin" lang={isAr ? "en" : "ar"} dir={isAr ? "ltr" : "rtl"}>
            {isAr ? "Writing" : "كتابات"}
          </span>
        </h1>
        <p className="t-page-lede">
          {isAr
            ? "كل قطعة هنا بدأت فيديو قصير، واتكتبت عشان اللي عايز أكتر من دقيقة. الفيديو في أول الصفحة، والشرح تحته."
            : "Each piece here started as a short video, written up for anyone who wants more than a minute. The video is at the top; the explanation is under it."}
        </p>
      </header>

      {groups.map(({ t, items }) => (
        <section className="t-section" id={t.key} key={t.key} aria-labelledby={`t-g-${t.key}`}>
          <div className="t-head">
            <div className="t-head-l">
              <h2 className="t-kicker" id={`t-g-${t.key}`}>
                <span className="sr-only">{isAr ? t.ar : t.en}</span>
                <span aria-hidden="true" dir="ltr">
                  <span className="t-ps1">$</span> ls {t.key}/
                </span>
              </h2>
              <span className="t-head-ar" dir={isAr ? "ltr" : "rtl"} lang={isAr ? "en" : "ar"}>
                {isAr ? t.en : t.ar}
              </span>
            </div>
            <p className="t-group-blurb">{isAr ? t.blurbAr : t.blurb}</p>
          </div>
          <AiLog pieces={items} lang={lang} />
        </section>
      ))}
    </div>
  );
}
