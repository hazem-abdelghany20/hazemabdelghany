import { Link } from "@tanstack/react-router";
import { THREADS } from "@/lib/threads";
import { liveLinks } from "@/lib/site";

export function Footer({ lang = "en" }: { lang?: "en" | "ar" }) {
  const isAr = lang === "ar";
  const links = liveLinks();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <nav className="footer-threads" aria-label={isAr ? "الخيوط" : "Threads"}>
          <span className="kicker">{isAr ? "الخيوط" : "Threads"}</span>
          <ul>
            {THREADS.map((t) => (
              <li key={t.key}>
                <Link to="/threads/$thread/" params={{ thread: t.key }}>
                  {isAr ? (
                    <>
                      {`${t.ar} `}
                      <span className="en" dir="ltr" lang="en">
                        {t.en}
                      </span>
                    </>
                  ) : (
                    <>
                      {`${t.en} `}
                      <span className="ar" dir="rtl" lang="ar">
                        {t.ar}
                      </span>
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-site" aria-label={isAr ? "الموقع" : "Site"}>
          <span className="kicker">{isAr ? "الموقع" : "Site"}</span>
          <ul>
            <li>
              <Link to="/books/">{isAr ? "الكتب" : "Books"}</Link>
            </li>
            <li>
              <Link to="/essays/">{isAr ? "المقالات" : "Articles"}</Link>
            </li>
            <li>
              <Link to={isAr ? "/ar/about/" : "/about/"}>{isAr ? "عنّي" : "About"}</Link>
            </li>
            <li>
              <a href="/rss.xml">{isAr ? "الخلاصة" : "RSS"}</a>
            </li>
          </ul>
        </nav>

        {links.length > 0 && (
          <nav className="footer-elsewhere" aria-label={isAr ? "أماكن تانية" : "Elsewhere"}>
            <span className="kicker">{isAr ? "أماكن تانية" : "Elsewhere"}</span>
            <ul>
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <div className="footer-base">
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
          <span className="meta">{isAr ? "القاهرة، مصر" : "Cairo, Egypt"}</span>
          <span className="dot">·</span>
          <span
            dir={isAr ? "ltr" : "rtl"}
            lang={isAr ? "en" : "ar"}
            style={{ fontSize: "15px", color: "var(--muted)" }}
          >
            {isAr ? "Cairo" : "القاهرة"}
          </span>
        </div>
        <span className="meta">{`© ${year} ${isAr ? "حازم عبدالغني" : "Hazem Abdelghany"}`}</span>
      </div>
    </footer>
  );
}
