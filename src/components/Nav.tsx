import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function Nav({ lang = "en" }: { lang?: "en" | "ar" }) {
  const isAr = lang === "ar";
  return (
    <nav className="nav">
      <Link to="/" className="nav-name">
        <span className="ar" dir="rtl" lang="ar">
          حازم عبدالغني
        </span>
        <span className="dot">·</span>
        <span className="en">HAZEM ABDELGHANY</span>
      </Link>
      <div className="nav-links">
        {isAr ? (
          <>
            <Link to="/books/">
              {"كتب "}
              <span className="en" dir="ltr" lang="en">
                Books
              </span>
            </Link>
            <Link to="/essays/">
              {"مقالات "}
              <span className="en" dir="ltr" lang="en">
                Articles
              </span>
            </Link>
            <Link to="/ar/about/">
              {"عنّي "}
              <span className="en" dir="ltr" lang="en">
                About
              </span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/books/">
              {"Books "}
              <span className="ar" dir="rtl" lang="ar">
                كتب
              </span>
            </Link>
            <Link to="/essays/">
              {"Articles "}
              <span className="ar" dir="rtl" lang="ar">
                مقالات
              </span>
            </Link>
            <Link to="/about/">
              {"About "}
              <span className="ar" dir="rtl" lang="ar">
                عنّي
              </span>
            </Link>
          </>
        )}
        <ThemeToggle isAr={isAr} />
      </div>
    </nav>
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
