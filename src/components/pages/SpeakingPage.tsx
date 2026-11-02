import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import { SPEAKING, SPEAKING_WHATSAPP } from "@/lib/speaking";

const HEADSHOT = "/images/speaking/hazem-abdelghany-headshot.jpg";

/** /speaking/ and /ar/speaking/ — one page to send to an organizer: who he is, what he's done on stage,
    what he talks about, a bio to paste and a photo to download. Look: the /links/ palette (styles/speaking.css). */
export function SpeakingPage({ lang }: { lang: Lang }) {
  const t = SPEAKING[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";
  const wa = `https://wa.me/${SPEAKING_WHATSAPP}?text=${encodeURIComponent(t.whatsappText)}`;

  return (
    <div className="sk" dir={dir} lang={lang === "ar" ? "ar" : "en"}>
      <header className="sk-top">
        <span className="sk-kicker">{t.kicker}</span>
        <a className="sk-switch" href={t.switchHref} lang={lang === "ar" ? "en" : "ar"}>
          {t.switchLabel}
        </a>
      </header>

      <section className="sk-hero">
        <img className="sk-face" src={HEADSHOT} alt={t.photoAlt} width={1254} height={1254} />
        <div className="sk-id">
          <h1 className="sk-name">{t.name}</h1>
          <p className="sk-other" lang={lang === "ar" ? "en" : "ar"}>
            {t.otherName}
          </p>
          <p className="sk-role">{t.role}</p>
          <p className="sk-lede">{t.lede}</p>
          <p className="sk-line" lang="ar" dir="rtl">
            «الـ AI بمنتهى البساطة»
          </p>
        </div>
      </section>

      <ul className="sk-facts">
        {t.facts.map((f) => (
          <li key={f.big}>
            <b dir="ltr">{f.big}</b>
            <span>{f.small}</span>
          </li>
        ))}
      </ul>

      <section className="sk-block">
        <h2>{t.stageTitle}</h2>
        <ul className="sk-credits">
          {t.credits.map((c) => (
            <li key={c.name}>
              <div className="sk-credit-head">
                <b>{c.name}</b>
                {c.when && <span className="sk-when">{c.when}</span>}
                {c.upcoming && <span className="sk-tag">{t.upcoming}</span>}
              </div>
              <p>{c.role}</p>
              {c.links && (
                <p className="sk-links">
                  {c.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener">
                      {l.label} ↗
                    </a>
                  ))}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="sk-block">
        <h2>{t.talksTitle}</h2>
        <ol className="sk-talks">
          {t.talks.map((k) => (
            <li key={k.title}>
              <b>{k.title}</b>
              <p>{k.line}</p>
            </li>
          ))}
        </ol>
        <h3 className="sk-sub">{t.formatsTitle}</h3>
        <ul className="sk-chips">
          {t.formats.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      <section className="sk-block">
        <h2>{t.bioTitle}</h2>
        <div className="sk-bios">
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
      </section>

      <section className="sk-block sk-photo">
        <h2>{t.photoTitle}</h2>
        <a className="sk-download" href={HEADSHOT} download="Hazem Abdelghany.jpg">
          <img src={HEADSHOT} alt="" width={1254} height={1254} loading="lazy" />
          <span>{t.photoDownload} ↓</span>
        </a>
      </section>

      <section className="sk-block sk-contact">
        <h2>{t.contactTitle}</h2>
        <p>{t.contactLine}</p>
        <a className="sk-cta" href={wa} target="_blank" rel="noopener">
          {t.whatsapp}
        </a>
        <p className="sk-socials" dir="ltr">
          <a href="https://www.instagram.com/hazem_abdelghany/" target="_blank" rel="noopener">
            Instagram
          </a>
          <a href="https://www.tiktok.com/@7azemai" target="_blank" rel="noopener">
            TikTok
          </a>
          <a href="https://www.linkedin.com/in/hazem-abdelghany/" target="_blank" rel="noopener">
            LinkedIn
          </a>
          <a href="https://hazemabdelghany.com/">hazemabdelghany.com</a>
        </p>
      </section>
    </div>
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
      className="sk-bio"
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
