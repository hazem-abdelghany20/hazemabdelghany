import { Link } from "@tanstack/react-router";
import { L } from "@/components/L";
import { LangSwitch, ThemeToggle } from "@/components/Nav";
import { SideSwitch } from "@/components/SideSwitch";
import { localePath, type Lang } from "@/lib/i18n";

/** The AI side's nav: the same skeleton as the human one (row height, gaps,
 *  40px controls), so the seam crosses one nav being re-rendered. */
export function AiNav({ lang }: { lang: Lang }) {
  const isAr = lang === "ar";
  const home = localePath(lang, "/ai/");
  // A link and its twin in the other language, the site's signature pairing.
  const pair = (en: string, ar: string) =>
    isAr ? (
      <>
        {ar}{" "}
        <span dir="ltr" lang="en">
          {en}
        </span>
      </>
    ) : (
      <>
        {en}{" "}
        <span dir="rtl" lang="ar">
          {ar}
        </span>
      </>
    );

  return (
    <nav className="t-nav" aria-label={isAr ? "جنب الـ AI" : "AI side"}>
      <L href={home} className="t-name">
        <span className="t-name-ar" dir="rtl" lang="ar">
          حازم عبدالغني
        </span>
        <span className="t-name-dot" aria-hidden="true">
          ·
        </span>
        <span className="t-name-en" lang="en">
          Hazem Abdelghany
        </span>
      </L>
      <div className="t-links">
        <L href={localePath(lang, "/ai/writing/")}>{pair("Writing", "كتابات")}</L>
        <Link to={home as "/"} hash="tools">
          {pair("Tools", "أدوات")}
        </Link>
        <Link to={home as "/"} hash="whoami">
          {pair("About", "عنّي")}
        </Link>
        {/* On a phone, language + theme drop to their own row, as on the human side. */}
        <span className="t-break" aria-hidden="true" />
        <LangSwitch lang={lang} className="t-lang" />
        <ThemeToggle isAr={isAr} className="t-theme" />
      </div>
      <SideSwitch side="ai" lang={lang} />
    </nav>
  );
}
