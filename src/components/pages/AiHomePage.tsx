import { Link } from "@tanstack/react-router";
import { L } from "@/components/L";
import { AsciiDesk } from "@/components/ai/AsciiDesk";
import { AiLog } from "@/components/ai/AiLog";
import { AI_TOPICS, siteAi } from "@/lib/ai";
import { AI_TOOLS, oftenLabel } from "@/lib/ai-tools";
import { fwd, localePath, type Lang } from "@/lib/i18n";

/** /ai/ — the AI side's home. It mirrors the human home's layout (nav, two-
 *  column hero, a row of topics, a list of writing), so the swipe reads as
 *  the same page re-rendered by the machine. Every section is a command and
 *  its output. */
export function AiHomePage({ lang }: { lang: Lang }) {
  const isAr = lang === "ar";
  const pieces = siteAi(lang);
  const writing = localePath(lang, "/ai/writing/");
  const count = (key: string) => pieces.filter((p) => p.data.topic === key).length;

  return (
    <div className="page-ai-home">
      <section className="t-hero">
        <div className="t-hero-copy">
          <p className="t-mark" dir="ltr">
            <span className="t-ps1" aria-hidden="true">
              ${" "}
            </span>
            hazem <span className="t-flag">--side ai</span>
          </p>
          {isAr ? (
            <h1 className="t-h1" lang="ar">
              هنا <em>بفكّك الـ AI</em>: الأفكار، والأدوات، وإزاي بستخدمها فعلًا.
              <span className="t-caret" aria-hidden="true" />
            </h1>
          ) : (
            <h1 className="t-h1">
              This is where I <em>take AI apart</em>: the ideas, the tools, and how I use{" "}
              <span className="t-last">
                them.
                <span className="t-caret" aria-hidden="true" />
              </span>
            </h1>
          )}
          {isAr ? (
            <p className="t-hero-en" dir="ltr" lang="en">
              This is where I take AI apart: the ideas, the tools, and how I use them.
            </p>
          ) : (
            <p className="t-hero-ar" dir="rtl" lang="ar">
              هنا بفكّك الـ AI: الأفكار، والأدوات، وإزاي بستخدمها فعلًا.
            </p>
          )}
          <p className="t-bio">
            {isAr
              ? "ببني بالـ agents كل يوم. هنا ملاحظات الشغل: تعريفات بسيطة، والأدوات اللي بدفع فيها، وبستخدمها إزاي. أغلبها بدأ فيديو."
              : "I build with agents every day. This side is the working notes: plain definitions, the tools I pay for, and how I use them. Most of it started as a video."}
          </p>
          <div className="t-hero-foot">
            <span className="t-rule" aria-hidden="true" />
            <span>{isAr ? "القاهرة · 2026" : "Cairo · 2026"}</span>
            <span className="t-hint t-hint-keys">
              {isAr ? (
                <>
                  دوس <kbd>.</kbd> لجنب الإنسان
                </>
              ) : (
                <>
                  press <kbd>.</kbd> for the human side
                </>
              )}
            </span>
            <span className="t-hint t-hint-touch">
              {isAr ? "اسحب ← لجنب الإنسان" : "swipe → for the human side"}
            </span>
          </div>
        </div>
        <AsciiDesk lang={lang} />
      </section>

      <section className="t-section t-topics" aria-labelledby="t-topics-h">
        <div className="t-head">
          <h2 className="t-kicker" id="t-topics-h">
            <span className="sr-only">{isAr ? "المواضيع" : "Topics"}</span>
            <span aria-hidden="true" dir="ltr">
              <span className="t-ps1">$</span> ls topics/
            </span>
          </h2>
          <span className="t-head-ar" dir={isAr ? "ltr" : "rtl"} lang={isAr ? "en" : "ar"}>
            {isAr ? "Topics" : "المواضيع"}
          </span>
        </div>
        <ul className="t-ls">
          {AI_TOPICS.map((t) => {
            const n = count(t.key);
            return (
              <li key={t.key}>
                <Link className="t-ls-row" to={writing as "/"} hash={t.key}>
                  <span className="t-ls-name" dir="ltr">
                    {t.key}/
                  </span>
                  <span className="t-ls-ar" dir={isAr ? "ltr" : "rtl"} lang={isAr ? "en" : "ar"}>
                    {isAr ? t.en : t.ar}
                  </span>
                  <span className="t-ls-blurb">{isAr ? t.blurbAr : t.blurb}</span>
                  <span className="t-ls-count">
                    {n === 0
                      ? isAr
                        ? "لسه مفيش"
                        : "nothing yet"
                      : isAr
                        ? `${n} للقراءة ${fwd(lang)}`
                        : `${n} to read →`}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="t-section t-writing" aria-labelledby="t-writing-h">
        <div className="t-head">
          <div className="t-head-l">
            <h2 className="t-kicker" id="t-writing-h">
              <span className="sr-only">{isAr ? "آخر الكتابات" : "Latest writing"}</span>
              <span aria-hidden="true" dir="ltr">
                <span className="t-ps1">$</span> tail writing.log
              </span>
            </h2>
            <span className="t-head-ar" dir={isAr ? "ltr" : "rtl"} lang={isAr ? "en" : "ar"}>
              {isAr ? "Writing" : "كتابات"}
            </span>
          </div>
          <L href={writing} className="t-more">
            {isAr ? `كل الكتابات ${fwd(lang)}` : "All writing →"}
          </L>
        </div>
        <AiLog pieces={pieces.slice(0, 6)} lang={lang} />
      </section>

      <section className="t-section t-tools" id="tools" aria-labelledby="t-tools-h">
        <div className="t-head">
          <div className="t-head-l">
            <h2 className="t-kicker" id="t-tools-h">
              <span className="sr-only">{isAr ? "الأدوات اللي بستخدمها" : "Tools I use"}</span>
              <span aria-hidden="true" dir="ltr">
                <span className="t-ps1">$</span> cat tools.txt
              </span>
            </h2>
            <span className="t-head-ar" dir={isAr ? "ltr" : "rtl"} lang={isAr ? "en" : "ar"}>
              {isAr ? "The tools I actually use" : "الأدوات اللي بستخدمها فعلًا"}
            </span>
          </div>
        </div>
        <table className="t-stack">
          <thead>
            <tr>
              <th scope="col">{isAr ? "الأداة" : "tool"}</th>
              <th scope="col">{isAr ? "كل قد إيه" : "how often"}</th>
              <th scope="col">{isAr ? "بصراحة" : "the honest line"}</th>
            </tr>
          </thead>
          <tbody>
            {AI_TOOLS.map((tool) => (
              <tr key={tool.name}>
                <th scope="row" dir="ltr">
                  {tool.name}
                </th>
                <td className="t-freq" data-f={tool.often}>
                  <i />
                  <i />
                  <i /> {oftenLabel(tool.often, isAr)}
                </td>
                <td>{isAr ? tool.ar : tool.en}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="t-section t-about" id="whoami" aria-labelledby="t-about-h">
        <div className="t-about-head">
          <span className="t-about-ar" dir={isAr ? "ltr" : "rtl"} lang={isAr ? "en" : "ar"}>
            {isAr ? "About" : "عنّي"}
          </span>
          <h2 className="t-kicker" id="t-about-h">
            <span className="sr-only">{isAr ? "عنّي" : "About"}</span>
            <span aria-hidden="true" dir="ltr">
              <span className="t-ps1">$</span> whoami
            </span>
          </h2>
        </div>
        <div className="t-about-body">
          {isAr ? (
            <p>
              أنا حازم، من القاهرة. بدير <b>Catalyst</b>: كورسات AI للناس، وتدريب AI للشركات، و
              software مبني بالـ AI من الأول. مابقتش بكتب كود بإيدي. بكتب الـ spec، والـ agents
              بتبني، وأنا براجع. كل حاجة هنا بجرّبها على شغلي الأول قبل ما أكتب عنها.
            </p>
          ) : (
            <p>
              I’m Hazem, from Cairo. I run <b>Catalyst</b>: AI courses for people, AI training for
              companies, and software built AI-first. I don’t write code by hand anymore. I write the
              spec, agents build it, I review it. Everything on this side gets tested on my own work
              before it gets written up.
            </p>
          )}
          <L href={localePath(lang, "/about/")} className="t-more">
            {isAr ? `أكتر عنّي ${fwd(lang)}` : "More about me →"}
          </L>
        </div>
      </section>
    </div>
  );
}
