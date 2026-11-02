import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { SPEAKING, SPEAKING_MEDIA as M, SPEAKING_WHATSAPP } from "@/lib/speaking";

/** /speaking/ and /ar/speaking/ — the page Hazem sends to event organizers.
    Built in the site's own identity (styles/speaking.css reads the theme tokens from global.css):
    the proof first, as photos and clips, then the count, then what an organizer needs to book. */
export function SpeakingPage({ lang }: { lang: Lang }) {
  const t = SPEAKING[lang];
  const isAr = lang === "ar";
  const otherLang = isAr ? "en" : "ar";
  const otherDir = isAr ? "ltr" : "rtl";
  const wa = `https://wa.me/${SPEAKING_WHATSAPP}?text=${encodeURIComponent(t.whatsappText)}`;

  const Label = ({ id, text, other }: { id: string; text: string; other: string }) => (
    <div className="sp-label">
      <h2 id={id}>{text}</h2>
      <span lang={otherLang} dir={otherDir}>
        {other}
      </span>
    </div>
  );

  return (
    <div className={isAr ? "speaking-page is-ar" : "speaking-page"}>
      <section className="sp-hero" aria-labelledby="sp-title">
        <div className="sp-hero-copy">
          <div className="sp-hero-top">
            <p className="sp-mark">{t.mark}</p>
          </div>
          <h1 className="sp-statement" id="sp-title">
            {t.statementBefore}
            <em>{t.statementEm}</em>
            {t.statementAfter}
          </h1>
          <p className="sp-other" lang={otherLang} dir={otherDir}>
            {t.other}
          </p>
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
        <figure className="sp-hero-visual">
          <img src={M.hero} alt="" width={2000} height={1333} fetchPriority="high" />
          <figcaption>{t.heroCaption}</figcaption>
        </figure>
      </section>

      <section className="sp-section" aria-labelledby="sp-count">
        <Label id="sp-count" text={t.countLabel} other={t.countOther} />
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

        <h3 className="sp-subhead">{t.occasionsTitle}</h3>
        <ol className="sp-occasions" reversed>
          {t.occasions.map((o) => (
            <li key={o.when + o.where} className={o.next ? "is-next" : undefined}>
              <span className="sp-when">{o.when}</span>
              <span className="sp-where">
                {o.where}
                {o.next && <span className="sp-next">{t.nextTag}</span>}
              </span>
              <span className="sp-what-done">{o.what}</span>
            </li>
          ))}
        </ol>
        <p className="sp-note">{t.occasionsNote}</p>
      </section>

      <section className="sp-section" aria-labelledby="sp-screen">
        <Label id="sp-screen" text={t.screenLabel} other={t.screenOther} />
        <div className="sp-screen">
          <article className="sp-tv">
            <figure className="sp-frame sp-frame-wide">
              <img src={M.asharq} alt={t.asharq.name} width={1170} height={662} loading="lazy" />
            </figure>
            <h3>{t.asharq.name}</h3>
            <p className="sp-show">{t.asharq.show}</p>
            <p>{t.asharq.line}</p>
            <a href={t.asharq.link.href} target="_blank" rel="noopener">
              {t.asharq.link.label}
            </a>
          </article>
          <article className="sp-tv">
            <figure className="sp-frame sp-frame-tall">
              <Clip src={M.cbcClip} poster={M.cbcPoster} label={t.cbc.name} />
            </figure>
            <h3>{t.cbc.name}</h3>
            <p className="sp-show">{t.cbc.show}</p>
            <p>{t.cbc.line}</p>
            <a href={t.cbc.link.href} target="_blank" rel="noopener">
              {t.cbc.link.label}
            </a>
          </article>
        </div>
      </section>

      <section className="sp-section" aria-labelledby="sp-stage">
        <Label id="sp-stage" text={t.stageLabel} other={t.stageOther} />
        <div className="sp-stage">
          <figure className="sp-frame sp-frame-tall sp-stage-clip">
            <Clip src={M.tiktokClip} poster={M.tiktokPoster} label={t.tiktok.name} />
          </figure>
          <div className="sp-stage-copy">
            <h3>{t.tiktok.name}</h3>
            <p>{t.tiktok.line}</p>
            <p className="sp-links">
              {t.tiktok.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener">
                  {l.label}
                </a>
              ))}
            </p>

            <figure className="sp-frame sp-pitch">
              <img src={M.pitchPress} alt="" width={899} height={899} loading="lazy" />
              <figcaption>{t.pitch.caption}</figcaption>
            </figure>
            <h3>{t.pitch.name}</h3>
            <p>{t.pitch.line}</p>
          </div>
        </div>

        <div className="sp-welmnt">
          <div className="sp-welmnt-copy">
            <h3>{t.welmnt.name}</h3>
            <p>{t.welmnt.line}</p>
          </div>
          <div className="sp-strip">
            {[M.stageWhy, M.stageNumber, M.stageRoom].map((src, i) => (
              <figure key={src} className="sp-frame">
                <img src={src} alt="" width={1400} height={933} loading="lazy" />
                <figcaption>{t.welmnt.captions[i]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-section" aria-labelledby="sp-room">
        <Label id="sp-room" text={t.roomLabel} other={t.roomOther} />
        <div className="sp-room">
          <div className="sp-room-copy">
            <p className="sp-room-statement">{t.roomStatement}</p>
            <p>{t.roomLine}</p>
          </div>
          <figure className="sp-frame sp-room-photo">
            <img src={M.training} alt="" width={1000} height={1333} loading="lazy" />
            <figcaption>{t.roomCaption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="sp-section" aria-labelledby="sp-talks">
        <Label id="sp-talks" text={t.talksLabel} other={t.talksOther} />
        <ul className="sp-talks">
          {t.talks.map((k) => (
            <li key={k.title}>
              <h3>{k.title}</h3>
              <p>{k.line}</p>
            </li>
          ))}
        </ul>
        <p className="sp-formats">{t.formats.join(" / ")}</p>
      </section>

      <section className="sp-section" id="press" aria-labelledby="sp-press">
        <Label id="sp-press" text={t.pressLabel} other={t.pressOther} />
        <div className="sp-press">
          <div className="sp-bios">
            {t.bios.map((b) => (
              <Bio
                key={b.lang}
                label={b.label}
                lang={b.lang}
                text={b.text}
                copy={t.copy}
                copied={t.copied}
              />
            ))}
          </div>
          <div className="sp-photos">
            {t.photos.map((p) => (
              <a key={p.href} className="sp-photo" href={p.href} download={p.file}>
                <img src={p.href} alt="" loading="lazy" />
                <span>{p.label}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="sp-booking">
          <h3>{t.bookTitle}</h3>
          <p>{t.bookLine}</p>
          <a className="sp-book" href={wa} target="_blank" rel="noopener">
            {t.book}
          </a>
        </div>
      </section>
    </div>
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
