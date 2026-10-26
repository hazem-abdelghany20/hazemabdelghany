import { useEffect, useState } from "react";
import { L } from "@/components/L";
import { GUIDE_REELS, SESSION, SOCIALS, upcomingSlots, whatsappLink, type Slot } from "@/lib/links";

type View = "home" | "socials" | "guides" | "book";
const VIEWS: View[] = ["home", "socials", "guides", "book"];
const viewOf = (hash: string): View => {
  const v = hash.replace(/^#/, "") as View;
  return VIEWS.includes(v) ? v : "home";
};

/** /links/ — the Instagram bio page. Each screen is a #hash, so the phone's back button works. */
export function LinksPage() {
  const [view, setView] = useState<View>("home");

  useEffect(() => {
    const sync = () => setView(viewOf(location.hash));
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

function Back() {
  return (
    <a className="lk-back" href="#" onClick={(e) => { e.preventDefault(); history.length > 1 ? history.back() : (location.hash = ""); }}>
      → رجوع
    </a>
  );
}

function Home() {
  return (
    <section className="lk-screen">
      <img className="lk-avatar" src="/images/links/hazem.jpg" alt="Hazem Abdelghany" width={96} height={96} />
      <h1 className="lk-name">
        <span lang="en" dir="ltr">Hazem Abdelghany</span>
        <span className="lk-name-ar">حازم عبدالغني</span>
      </h1>
      <p className="lk-tag" dir="ltr">AI, simply</p>
      <nav className="lk-buttons">
        <L href="/" className="lk-btn">
          <span lang="en">Get to know Hazem</span>
          <small>اعرف حازم</small>
        </L>
        <a href="#socials" className="lk-btn">
          <span lang="en">Socials</span>
          <small>حساباتي</small>
        </a>
        <a href="#guides" className="lk-btn lk-btn-main">
          <span lang="en">Free guides</span>
          <small>الـguides ببلاش</small>
        </a>
        <a href="#book" className="lk-btn">
          <span lang="en">Book a session</span>
          <small>احجز session</small>
        </a>
      </nav>
    </section>
  );
}

function Socials() {
  return (
    <section className="lk-screen">
      <Back />
      <h2 className="lk-title">حساباتي</h2>
      <ul className="lk-socials">
        {SOCIALS.map((s) => (
          <li key={s.name}>
            <a href={s.href} target="_blank" rel="noopener">
              <span lang="en">{s.name}</span>
              <small dir="ltr">{s.handle}</small>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Guides() {
  return (
    <section className="lk-screen">
      <Back />
      <h2 className="lk-title">الـguides ببلاش</h2>
      <p className="lk-sub">اختار الفيديو اللي جيت منه، والـguide بتاعه هيفتح.</p>
      <ul className="lk-guides">
        {GUIDE_REELS.map((g) => (
          <li key={g.reel}>
            <L href={`/free/${g.guide}/`} className="lk-guide">
              <img src={`/images/links/${g.reel}.jpg`} alt="" width={64} height={96} loading="lazy" />
              <span>
                <b>{g.title}</b>
                <small>افتح الـguide ←</small>
              </span>
            </L>
          </li>
        ))}
      </ul>
      <L href="/free/" className="lk-more">كل الـguides</L>
    </section>
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
    <section className="lk-screen">
      <Back />
      <h2 className="lk-title">Session مع حازم</h2>
      <p className="lk-price">
        <b>{SESSION.priceEgp.toLocaleString("en")} EGP</b>
        <small>للساعة · أونلاين على Google Meet</small>
      </p>

      <h3 className="lk-step">1 · اختار المعاد <small>(توقيت مصر)</small></h3>
      <div className="lk-days">
        {days.map((d) => (
          <div key={d.day} className="lk-day">
            <span className="lk-day-name">{d.day}</span>
            <div className="lk-times">
              {d.slots.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  className="lk-time"
                  aria-pressed={slot?.key === s.key}
                  onClick={() => setSlot(s)}
                >
                  {s.time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {slot && (
        <>
          <h3 className="lk-step" id="lk-pay">2 · حوّل {SESSION.priceEgp.toLocaleString("en")} جنيه على InstaPay</h3>
          <div className="lk-pay">
            <code dir="ltr">{SESSION.instapay}</code>
            <button type="button" className="lk-copy" onClick={copy}>{copied ? "اتنسخ" : "انسخ"}</button>
          </div>
          <h3 className="lk-step">3 · ابعتلي screenshot التحويل</h3>
          <a className="lk-btn lk-btn-main" href={whatsappLink(slot)} target="_blank" rel="noopener">
            <span>ابعت على WhatsApp</span>
            <small>{slot.label}</small>
          </a>
          <p className="lk-note">الحجز بيتأكد لما أرد عليك على WhatsApp.</p>
        </>
      )}
    </section>
  );
}
