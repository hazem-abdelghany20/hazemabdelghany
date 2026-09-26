import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { L } from "@/components/L";
import { AI_TOPICS } from "@/lib/ai";
import { localePath, type Lang } from "@/lib/i18n";

const KEY_PREF = "side-key";

export function AiFooter({ lang }: { lang: Lang }) {
  const isAr = lang === "ar";
  const year = new Date().getFullYear();
  const writing = localePath(lang, "/ai/writing/");

  return (
    <footer className="t-footer">
      <div className="t-footer-top">
        <nav aria-label={isAr ? "المواضيع" : "Topics"}>
          <span className="t-kicker" dir="ltr">
            topics/
          </span>
          <ul>
            {AI_TOPICS.map((t) => (
              <li key={t.key}>
                <Link to={writing as "/"} hash={t.key}>
                  <span dir="ltr">{t.key}/</span>{" "}
                  <span dir="rtl" lang="ar">
                    {t.ar}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={isAr ? "الموقع" : "Site"}>
          <span className="t-kicker" dir="ltr">
            site
          </span>
          <ul>
            <li>
              <L href={writing}>{isAr ? "كتابات" : "Writing"}</L>
            </li>
            <li>
              <Link to={localePath(lang, "/ai/") as "/"} hash="tools">
                {isAr ? "أدوات" : "Tools"}
              </Link>
            </li>
            <li>
              <L href={localePath(lang, "/")}>{isAr ? "جنب الإنسان" : "The human side"}</L>
            </li>
            <li>
              <L href={localePath(lang, "/about/")}>{isAr ? "عنّي" : "About"}</L>
            </li>
          </ul>
        </nav>
        <div className="t-keys">
          <span className="t-kicker" dir="ltr">
            keys
          </span>
          <ul>
            <li className="t-key-dot">
              <kbd>.</kbd> {isAr ? "بدّل بين الجنبين" : "switch sides"}
            </li>
            <li>
              <span className="t-swipe" aria-hidden="true" dir="ltr">
                ← →
              </span>
              {isAr ? "اسحب على الموبايل" : "swipe on a phone"}
            </li>
            <li>
              <KeyToggle isAr={isAr} />
            </li>
          </ul>
        </div>
      </div>
      <div className="t-footer-base">
        <span>
          Cairo, Egypt{" "}
          <span className="t-dot" aria-hidden="true">
            ·
          </span>{" "}
          <span dir="rtl" lang="ar">
            القاهرة
          </span>
        </span>
        <span dir="ltr">© {year} Hazem Abdelghany</span>
      </div>
    </footer>
  );
}

/** "." is a single-character shortcut, so it can be switched off (WCAG 2.1.4).
 *  The choice is stamped on <html> before paint by __root.tsx. */
function KeyToggle({ isAr }: { isAr: boolean }) {
  const [on, setOn] = useState(true);
  useEffect(() => setOn(document.documentElement.dataset["sideKey"] !== "off"), []);
  return (
    <button
      className="t-keytoggle"
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => {
        const next = !on;
        const root = document.documentElement;
        if (next) delete root.dataset["sideKey"];
        else root.dataset["sideKey"] = "off";
        try {
          if (next) localStorage.removeItem(KEY_PREF);
          else localStorage.setItem(KEY_PREF, "off");
        } catch {
          // storage blocked: the choice lasts for this page only
        }
        setOn(next);
      }}
    >
      <span className="t-box" aria-hidden="true" />
      <span>{isAr ? "اختصار الكيبورد" : "keyboard shortcut"}</span>
    </button>
  );
}
