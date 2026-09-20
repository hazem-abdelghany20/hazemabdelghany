import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { L } from "@/components/L";
import { localePath, otherLang, switchPath, type Lang } from "@/lib/i18n";
import { publishedLogs } from "@/lib/logs";

export function Nav({ lang = "en" }: { lang?: Lang }) {
  const isAr = lang === "ar";
  const to = (path: string) => localePath(lang, path);
  // The log only appears once there is something in it — no link to an empty page.
  const hasLog = publishedLogs().length > 0;
  return (
    <nav className="nav">
      <L href={to("/")} className="nav-name">
        <span className="ar" dir="rtl" lang="ar">
          حازم عبدالغني
        </span>
        <span className="dot">·</span>
        <span className="en">HAZEM ABDELGHANY</span>
      </L>
      <div className="nav-links">
        {isAr ? (
          <>
            <L href={to("/books/")}>
              {"كتب "}
              <span className="en" dir="ltr" lang="en">
                Books
              </span>
            </L>
            <L href={to("/essays/")}>
              {"مقالات "}
              <span className="en" dir="ltr" lang="en">
                Articles
              </span>
            </L>
            {hasLog && (
              <L href={to("/logs/")}>
                {"السجل "}
                <span className="en" dir="ltr" lang="en">
                  Log
                </span>
              </L>
            )}
            <L href={to("/about/")}>
              {"عنّي "}
              <span className="en" dir="ltr" lang="en">
                About
              </span>
            </L>
          </>
        ) : (
          <>
            <L href={to("/books/")}>
              {"Books "}
              <span className="ar" dir="rtl" lang="ar">
                كتب
              </span>
            </L>
            <L href={to("/essays/")}>
              {"Articles "}
              <span className="ar" dir="rtl" lang="ar">
                مقالات
              </span>
            </L>
            {hasLog && (
              <L href={to("/logs/")}>
                {"Log "}
                <span className="ar" dir="rtl" lang="ar">
                  السجل
                </span>
              </L>
            )}
            <L href={to("/about/")}>
              {"About "}
              <span className="ar" dir="rtl" lang="ar">
                عنّي
              </span>
            </L>
          </>
        )}
        <LangSwitch lang={lang} />
        <ThemeToggle isAr={isAr} />
      </div>
    </nav>
  );
}

/** EN ⇄ عربي: the same page in the other language. The choice is remembered,
 *  so the home page opens in it next time (see THEME_INIT in __root.tsx). */
function LangSwitch({ lang }: { lang: Lang }) {
  const other = otherLang(lang);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // A missing page is missing in both languages — go to the other home instead.
  const missing = useRouterState({
    select: (s) => s.matches.some((m) => m.status === "notFound" || m.globalNotFound),
  });
  return (
    <L
      className="nav-lang"
      href={missing ? localePath(other, "/") : switchPath(pathname)}
      lang={other}
      dir={other === "ar" ? "rtl" : "ltr"}
      hrefLang={other === "ar" ? "ar-EG" : "en"}
      onClick={() => {
        try {
          localStorage.setItem("lang", other);
        } catch {
          // storage blocked — the choice just won't be remembered
        }
      }}
    >
      {other === "ar" ? "عربي" : "English"}
    </L>
  );
}

function ThemeToggle({ isAr }: { isAr: boolean }) {
  // The real theme is stamped on <html> before hydration (see __root.tsx);
  // the server can't know it, so read it once mounted.
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.dataset["theme"] === "dark"), []);

  const labelDark = isAr ? "استخدم الوضع الداكن" : "Switch to dark mode";
  const labelLight = isAr ? "استخدم الوضع الفاتح" : "Switch to light mode";

  return (
    <button
      className="theme-toggle"
      id="theme-toggle"
      aria-label={dark ? labelLight : labelDark}
      aria-pressed={dark}
      onClick={() => {
        const next = document.documentElement.dataset["theme"] === "dark" ? "light" : "dark";
        document.documentElement.dataset["theme"] = next;
        try {
          localStorage.setItem("theme", next);
        } catch {
          // storage blocked — the choice just won't persist
        }
        setDark(next === "dark");
      }}
    >
      <svg
        className="icon-moon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path>
      </svg>
      <svg
        className="icon-sun"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>
      </svg>
    </button>
  );
}
