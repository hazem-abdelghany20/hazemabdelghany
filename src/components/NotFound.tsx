import { Link } from "@tanstack/react-router";
import { THREADS } from "@/lib/threads";

export function NotFound() {
  return (
    <section className="nf">
      {/* React hoists these into <head>; the 404 has no route of its own to carry them */}
      <title>Not found — Hazem Abdelghany</title>
      <meta name="description" content="That page doesn't exist." />
      <meta name="robots" content="noindex, follow" />
      <span className="kicker">404</span>
      <h1 className="nf-title">That page isn't here.</h1>
      <p className="nf-ar" dir="rtl" lang="ar">
        الصفحة دي مش موجودة.
      </p>
      <p className="nf-body">
        Either it moved or it never existed. The five threads below are where everything lives.
      </p>
      <div className="nf-links">
        {THREADS.map((t) => (
          <Link key={t.key} to="/threads/$thread/" params={{ thread: t.key }}>
            <span dir="rtl" lang="ar">
              {t.ar}
            </span>
            <span className="tag">{t.en}</span>
          </Link>
        ))}
      </div>
      <Link to="/" className="meta">
        ← Back home
      </Link>
    </section>
  );
}
