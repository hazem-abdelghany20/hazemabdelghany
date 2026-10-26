import { useEffect, useState, type ReactNode } from "react";
import { L } from "@/components/L";
import { GUIDE_REELS, SESSION, SOCIALS, upcomingSlots, whatsappLink, type Slot } from "@/lib/links";

type View = "home" | "socials" | "guides" | "book";
const VIEWS: View[] = ["home", "socials", "guides", "book"];
const viewOf = (hash: string): View => {
  const v = hash.replace(/^#/, "") as View;
  return VIEWS.includes(v) ? v : "home";
};
const price = SESSION.priceEgp.toLocaleString("en");
const cover = (reel: string) => `/images/links/${reel}.jpg`;

/** /links/ — the Instagram bio page. Each screen is a #hash, so the phone's back button works.
    Look: Hazem's Catalyst-launch shoot (June 2026) — a navy studio, blue light, with golden accents and cream type. */
export function LinksPage() {
  const [view, setView] = useState<View>("home");

  useEffect(() => {
    const sync = () => {
      setView(viewOf(location.hash));
      window.scrollTo(0, 0);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <div className="lk">
      {view === "home" && <Home />}
      {view === "socials" && <Socials />}
      {view === "guides" && <Guides />}
      {view === "book" && <Book />}
    </div>
  );
}

function Icon({ d, size = 20 }: { d: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor">
      <path d={d} />
    </svg>
  );
}

/** The sub-screens' top bar: back, and Hazem's face so it still feels like his page. */
function Screen({ title, sub, children }: { title: string; sub?: string; children: ReactNode }) {
  return (
    <section className="lk-screen lk-sub">
      <header className="lk-bar">
        <a
          className="lk-back"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (history.length > 1) history.back();
            else location.hash = "";
          }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
          رجوع
        </a>
        <img className="lk-bar-face" src="/images/links/hazem-launch.jpg" alt="" width={36} height={36} />
      </header>
      <h1 className="lk-h">{title}</h1>
      {sub && <p className="lk-lede">{sub}</p>}
      {children}
    </section>
  );
}

function Home() {
  const fan = GUIDE_REELS.slice(0, 3);
  return (
    <section className="lk-screen lk-home">
      <figure className="lk-hero">
        <img src="/images/links/hero-launch.jpg" alt="Hazem Abdelghany" width={960} height={750} />
      </figure>
      <header className="lk-id">
        <h1 className="lk-name">حازم عبدالغني</h1>
        <p className="lk-name-en" lang="en" dir="ltr">
          Hazem Abdelghany
        </p>
        <p className="lk-tagline" lang="en" dir="ltr">
          AI, simply.
        </p>
      </header>

      <nav className="lk-actions">
        <a href="#guides" className="lk-guides-card">
          <span className="lk-guides-text">
            <b>الـguides ببلاش</b>
            <small>اختار الفيديو اللي جيت منه</small>
          </span>
          <span className="lk-fan" aria-hidden="true">
            {fan.map((g, i) => (
              <img key={g.reel} src={cover(g.reel)} alt="" width={64} height={114} style={{ ["--i" as string]: i }} />
            ))}
          </span>
        </a>

        <a href="#book" className="lk-row lk-row-book">
          <span>
            <b>احجز session معايا</b>
            <small>ساعة أونلاين، واحد لواحد</small>
          </span>
          <span className="lk-chip" dir="ltr">
            {price} EGP
          </span>
        </a>

        <div className="lk-pair">
          <L href="/" className="lk-tile">
            <b>اعرف حازم</b>
            <small lang="en">Get to know me</small>
          </L>
          <a href="#socials" className="lk-tile">
            <b>حساباتي</b>
            <span className="lk-tile-icons">
              {SOCIALS.map((s) => (
                <Icon key={s.name} d={s.icon} size={15} />
              ))}
            </span>
          </a>
        </div>
      </nav>
    </section>
  );
}

function Socials() {
  return (
    <Screen title="حساباتي" sub="تابعني في المكان اللي بتتفرج فيه.">
      <ul className="lk-socials">
        {SOCIALS.map((s) => (
          <li key={s.name}>
            <a href={s.href} target="_blank" rel="noopener">
              <span className="lk-social-mark">
                <Icon d={s.icon} size={22} />
              </span>
              <span className="lk-social-name" lang="en">
                {s.name}
              </span>
              <small dir="ltr">{s.handle}</small>
            </a>
          </li>
        ))}
      </ul>
    </Screen>
  );
}

function Guides() {
  return (
    <Screen title="الـguides ببلاش" sub="اختار الفيديو اللي جيت منه، والـguide بتاعه هيفتح.">
      <ul className="lk-reels">
        {GUIDE_REELS.map((g) => (
          <li key={g.reel}>
            <L href={`/free/${g.guide}/`} className="lk-reel">
              <img src={cover(g.reel)} alt="" width={320} height={568} loading="lazy" />
              <span>{g.title}</span>
            </L>
          </li>
        ))}
      </ul>
      <L href="/free/" className="lk-all">
        كل الـguides
      </L>
    </Screen>
  );
}

function Book() {
  // Slots depend on today's date, so they're worked out in the browser, never frozen into the build.
  const [days, setDays] = useState<ReturnType<typeof upcomingSlots>>([]);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => setDays(upcomingSlots()), []);
  // Picking a time brings the payment step into view (it opens below the list).
  useEffect(() => {
    if (slot) document.getElementById("lk-pay")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slot]);

  const copy = () => {
    void navigator.clipboard?.writeText(SESSION.instapay).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <Screen title="احجز session معايا">
      <div className="lk-price">
        <b dir="ltr">{price}</b>
        <span>
          جنيه للساعة
          <br />
          أونلاين على Google Meet
        </span>
      </div>

      <ol className="lk-steps">
        <li>
          <h2>
            اختار المعاد <small>بتوقيت مصر</small>
          </h2>
          <div className="lk-days">
            {days.map((d) => (
              <div key={d.day} className="lk-day">
                <span className="lk-day-name">{d.day}</span>
                <div className="lk-times">
                  {d.slots.map((s) => (
                    <button key={s.key} type="button" className="lk-time" aria-pressed={slot?.key === s.key} onClick={() => setSlot(s)}>
                      {s.time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </li>

        <li className={slot ? "" : "lk-step-off"}>
          <h2 id="lk-pay">حوّل {price} جنيه على InstaPay</h2>
          <div className="lk-pay">
            <code dir="ltr">{SESSION.instapay}</code>
            <button type="button" onClick={copy} disabled={!slot}>
              {copied ? "اتنسخ" : "انسخ"}
            </button>
          </div>
        </li>

        <li className={slot ? "" : "lk-step-off"}>
          <h2>ابعتلي screenshot التحويل</h2>
          {slot ? (
            <a className="lk-wa" href={whatsappLink(slot)} target="_blank" rel="noopener">
              <b>ابعت على WhatsApp</b>
              <small>{slot.label}</small>
            </a>
          ) : (
            <p className="lk-hint">اختار معاد الأول.</p>
          )}
          <p className="lk-hint">الحجز بيتأكد لما أرد عليك على WhatsApp.</p>
        </li>
      </ol>
    </Screen>
  );
}
