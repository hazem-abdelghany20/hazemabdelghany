import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Lang } from "@/lib/i18n";
import {
  SPEAKING,
  SPEAKING_MEDIA as M,
  SPEAKING_WHATSAPP,
  type Link,
  type Occasion,
} from "@/lib/speaking";

/** /speaking/ and /ar/speaking/ — the page Hazem sends to event organizers.
    Laid out like a speaker card, then the proof: clips, the record by year, photos,
    what he can give, and the kit an organizer needs to book him.
    Styles in styles/speaking.css read the theme tokens from global.css. */
export function SpeakingPage({ lang }: { lang: Lang }) {
  const t = SPEAKING[lang];
  const isAr = lang === "ar";
  const otherLang = isAr ? "en" : "ar";
  const otherDir = isAr ? "ltr" : "rtl";
  const wa = `https://wa.me/${SPEAKING_WHATSAPP}?text=${encodeURIComponent(t.whatsappText)}`;

  const Head = ({ id, text, other }: { id: string; text: string; other: string }) => (
    <div className="sp-head">
      <h2 id={id}>{text}</h2>
      <span lang={otherLang} dir={otherDir}>
        {other}
      </span>
    </div>
  );

  return (
    <div className={isAr ? "speaking-page is-ar" : "speaking-page"}>
      <header className="sp-hero">
        <div className="sp-hero-copy">
          <p className="sp-role">{t.role}</p>
          <h1 className="sp-names">
            <span className="sp-name">{t.name}</span>
            <span className="sp-name sp-name-other" lang={otherLang} dir={otherDir}>
              {t.nameOther}
            </span>
          </h1>
          <p className="sp-statement">{t.statement}</p>
          <p className="sp-bio">{t.bio}</p>
          <div className="sp-actions">
            <a className="sp-book" href={wa} target="_blank" rel="noopener">
              {t.book}
            </a>
            <a className="sp-quiet" href="#press">
              {t.pressJump}
            </a>
          </div>
        </div>
        <figure className="sp-portrait">
          <img
            src={M.headshot}
            alt={t.portraitAlt}
            width={1254}
            height={1254}
            fetchPriority="high"
          />
        </figure>
      </header>

      <dl className="sp-counts">
        {t.counts.map((c) => (
          <div key={c.what} className="sp-count">
            <dt>
              <span className="sp-n" dir="ltr">
                {c.n}
              </span>
              <span className="sp-what">{c.what}</span>
            </dt>
            <dd>{c.detail}</dd>
          </div>
        ))}
      </dl>

      <section className="sp-section" aria-labelledby="sp-watch">
        <Head id="sp-watch" text={t.watch.label} other={t.watch.other} />
        <div className="sp-reel">
          <Screen
            shape="tall"
            item={t.watch.tiktok}
            media={<Clip src={M.tiktokClip} poster={M.tiktokPoster} label={t.watch.tiktok.name} />}
          />
          <Screen
            shape="card"
            item={t.watch.cbc}
            media={<Clip src={M.cbcClip} poster={M.cbcPoster} label={t.watch.cbc.name} />}
          />
          <Screen
            shape="wide"
            item={t.watch.asharq}
            media={
              <img
                src={M.asharq}
                alt={t.watch.asharq.name}
                width={1170}
                height={662}
                loading="lazy"
              />
            }
          />
        </div>
      </section>

      <section className="sp-section" aria-labelledby="sp-record">
        <Head id="sp-record" text={t.record.label} other={t.record.other} />
        <div className="sp-years">
          {byYear(t.record.occasions).map(([year, items]) => (
            <div key={year} className="sp-year">
              <p className="sp-year-n" dir="ltr">
                {year}
              </p>
              <ol className="sp-events">
                {items.map((o) => (
                  <li key={o.when + o.where} className={o.next ? "is-next" : undefined}>
                    <span className="sp-month">{o.when.replace(/\s*\d{4}\s*/, "")}</span>
                    <div className="sp-event">
                      <h3>
                        {o.where}
                        {o.next && <span className="sp-next">{t.record.nextTag}</span>}
                      </h3>
                      <p>{o.what}</p>
                      {o.links && <Sources links={o.links} />}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <p className="sp-note">{t.record.note}</p>
      </section>

      <section className="sp-section" aria-labelledby="sp-room">
        <Head id="sp-room" text={t.room.label} other={t.room.other} />
        <div className="sp-room-intro">
          <p>{t.room.line}</p>
          <Sources links={t.room.links} />
        </div>
        <div className="sp-gallery">
          {t.room.photos.map((p, i) => (
            <figure key={p.src} className={`sp-shot sp-shot-${i + 1}`}>
              <div className="sp-shot-frame">
                <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" />
              </div>
              <figcaption>{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="sp-section" aria-labelledby="sp-talks">
        <Head id="sp-talks" text={t.talks.label} other={t.talks.other} />
        <ul className="sp-talks">
          {t.talks.items.map((k) => (
            <li key={k.title}>
              <h3>{k.title}</h3>
              <p>{k.line}</p>
            </li>
          ))}
        </ul>
        <dl className="sp-facts">
          {t.talks.facts.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="sp-section sp-kit" id="press" aria-labelledby="sp-press">
        <Head id="sp-press" text={t.press.label} other={t.press.other} />
        <p className="sp-kit-line">{t.press.line}</p>
        <div className="sp-kit-grid">
          <div className="sp-bios">
            {t.press.bios.map((b) => (
              <Bio
                key={b.lang}
                label={b.label}
                lang={b.lang}
                text={b.text}
                copy={t.press.copy}
                copied={t.press.copied}
              />
            ))}
          </div>
          <div className="sp-downloads">
            {t.press.photos.map((p) => (
              <a key={p.href} className="sp-download" href={p.href} download={p.file}>
                <img src={p.href} alt="" loading="lazy" />
                <span>
                  {p.label}
                  <em>{t.press.download}</em>
                </span>
              </a>
            ))}
          </div>
        </div>
        <div className="sp-booking">
          <div>
            <h3>{t.bookTitle}</h3>
            <p>{t.bookLine}</p>
          </div>
          <a className="sp-book" href={wa} target="_blank" rel="noopener">
            {t.book}
          </a>
        </div>
      </section>
    </div>
  );
}

/** Groups the record by year, newest first, keeping the order inside each year. */
function byYear(items: Occasion[]): [string, Occasion[]][] {
  const out: [string, Occasion[]][] = [];
  for (const o of items) {
    const year = o.when.match(/\d{4}/)?.[0] ?? "";
    const last = out[out.length - 1];
    if (last && last[0] === year) last[1].push(o);
    else out.push([year, [o]]);
  }
  return out;
}

/** Where a credit can be checked: press, the organizer's post, or his own. */
function Sources({ links }: { links: Link[] }) {
  return (
    <p className="sp-src">
      {links.map((l) => (
        <a key={l.href} href={l.href} target="_blank" rel="noopener">
          {l.label}
        </a>
      ))}
    </p>
  );
}

function Screen({
  shape,
  item,
  media,
}: {
  shape: "tall" | "card" | "wide";
  item: { name: string; sub: string; line: string; links: Link[] };
  media: ReactNode;
}) {
  return (
    <article className={`sp-screen sp-screen-${shape}`}>
      <figure className="sp-screen-frame">{media}</figure>
      <h3>{item.name}</h3>
      <p className="sp-screen-sub">{item.sub}</p>
      <p>{item.line}</p>
      <Sources links={item.links} />
    </article>
  );
}

/** A short muted loop. With reduced motion it stays on its poster and shows controls instead. */
function Clip({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      v.pause();
      return;
    }
    void v.play().catch(() => setStill(true));
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      controls={still}
      aria-label={label}
    />
  );
}

function Bio({
  label,
  lang,
  text,
  copy,
  copied,
}: {
  label: string;
  lang: Lang;
  text: string;
  copy: string;
  copied: string;
}) {
  const [done, setDone] = useState(false);
  const onCopy = () => {
    void navigator.clipboard?.writeText(text).then(() => {
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    });
  };
  return (
    <figure
      className="sp-bio-card"
      lang={lang === "ar" ? "ar" : "en"}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <figcaption>
        <span>{label}</span>
        <button type="button" onClick={onCopy}>
          {done ? copied : copy}
        </button>
      </figcaption>
      <p>{text}</p>
    </figure>
  );
}
