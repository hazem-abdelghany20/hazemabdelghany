import { useEffect, useState, type ReactNode } from "react";
import { L } from "@/components/L";
import {
  fetchFreeKit,
  fetchFreeList,
  suitePage,
  trackFree,
  type FreeItem,
  type FreeKit,
  type FreeListing,
} from "@/lib/free";
import { GUIDE_REELS } from "@/lib/links";

const IG = "https://www.instagram.com/hazem_abdelghany/";
const domain = (u: string) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
/** The cover of the newest reel that sends people to this guide, if one is on /links/. */
const coverOf = (slug: string) => {
  const r = GUIDE_REELS.find((g) => g.guide === slug);
  return r ? `/images/links/${r.reel}.jpg` : null;
};
/** Kit items whose label starts with ① ② ③ … are the guide's section headings. */
const isSection = (it: FreeItem) => !it.url && !it.note && /^[①-⑳]/.test(it.label);

/** Guide text with every @handle as a link to that Instagram account (opens the app on a phone). */
function withHandles(text: string) {
  return text.split(/(@[A-Za-z0-9_.]*[A-Za-z0-9_])/).map((part, i) =>
    part.startsWith("@") ? (
      <a key={i} href={`https://www.instagram.com/${part.slice(1)}/`} target="_blank" rel="noopener" dir="ltr">
        {part}
      </a>
    ) : (
      part
    ),
  );
}

/** Same frame as /links/: the teal wall, a back pill, and Hazem's face linking to his bio page. */
function Frame({ back, children }: { back: { href: string; label: string }; children: ReactNode }) {
  return (
    <div className="lk">
      <section className="lk-screen lk-sub">
        <header className="lk-bar">
          <L href={back.href} className="lk-back">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
            {back.label}
          </L>
          <L href="/links/" aria-label="حازم عبدالغني">
            <img className="lk-bar-face" src="/images/links/hazem.jpg" alt="" width={36} height={36} />
          </L>
        </header>
        {children}
      </section>
    </div>
  );
}

/** /free/ — every guide a reel promised, newest first. */
export function FreeIndexPage({ initial }: { initial: FreeListing[] | null }) {
  const [list, setList] = useState(initial ?? []);
  // The build froze the list; pick up guides published since.
  useEffect(() => {
    void fetchFreeList().then((l) => l && setList(l));
  }, []);

  return (
    <Frame back={{ href: "/links/", label: "صفحتي" }}>
      <h1 className="lk-h">الـguides ببلاش</h1>
      <p className="lk-lede">كل guide وعدت بيه في فيديو، هنا. الـprompts جاهزة تنسخها.</p>
      {list.length ? (
        <ul className="fr-list">
          {list.map((k) => {
            const c = coverOf(k.slug);
            return (
              <li key={k.slug}>
                <L href={`/free/${k.slug}/`} className="fr-row">
                  {c ? <img src={c} alt="" width={52} height={92} loading="lazy" /> : <span className="fr-row-mark" aria-hidden="true" />}
                  <b>{k.title}</b>
                </L>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="lk-lede">…</p>
      )}
    </Frame>
  );
}

/** /free/<slug>/ — one guide: its steps, links and prompts to copy. */
export function FreeKitPage({ slug, initial }: { slug: string; initial: FreeKit | null }) {
  const [kit, setKit] = useState(initial);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    trackFree(slug, "view");
    // The build froze the words; Reach may have changed them since.
    void fetchFreeKit(slug).then((k) => k && setKit(k));
  }, [slug]);

  const back = { href: "/free/", label: "كل الـguides" };

  if (!kit) {
    return (
      <Frame back={back}>
        <h1 className="lk-h">الـguide ده مش هنا لسه</h1>
        <p className="lk-lede">
          <a href={suitePage(slug)} className="fr-inline">افتحه من هنا</a>، أو شوف <L href="/free/" className="fr-inline">كل الـguides</L>.
        </p>
      </Frame>
    );
  }

  const copy = (it: FreeItem) => {
    void navigator.clipboard?.writeText(it.note ?? "").then(() => {
      setCopied(it.id);
      setTimeout(() => setCopied((c) => (c === it.id ? null : c)), 1600);
    });
    trackFree(slug, "click", it.id);
  };
  const cover = coverOf(kit.slug);

  return (
    <Frame back={back}>
      <header className="fr-head">
        {cover && <img className="fr-cover" src={cover} alt="" width={72} height={128} />}
        <h1 className="lk-h">{kit.title}</h1>
      </header>
      {kit.intro && <p className="fr-intro">{withHandles(kit.intro)}</p>}

      <div className="fr-body">
        {kit.items.map((it) =>
          isSection(it) ? (
            <h2 key={it.id} className="fr-section">
              {it.label}
            </h2>
          ) : (
            <div key={it.id} className="fr-item">
              {/^https?:\/\//i.test(it.url) ? (
                <a className="fr-link" href={it.url} target="_blank" rel="noopener" onClick={() => trackFree(slug, "click", it.id)}>
                  <span>{it.label}</span>
                  <small dir="ltr">{domain(it.url)}</small>
                </a>
              ) : (
                <p className="fr-step">{it.label}</p>
              )}
              {it.note && (
                <div className="fr-prompt">
                  <pre dir="auto">{it.note}</pre>
                  <button type="button" data-done={copied === it.id ? "" : undefined} onClick={() => copy(it)}>
                    {copied === it.id ? "اتنسخ" : "انسخ"}
                  </button>
                </div>
              )}
            </div>
          ),
        )}
      </div>

      {kit.outro && <p className="fr-outro">{withHandles(kit.outro)}</p>}
      <nav className="fr-end">
        <L href="/free/" className="lk-all">
          كل الـguides
        </L>
        <a href={IG} className="fr-ig" dir="ltr" target="_blank" rel="noopener">
          @hazem_abdelghany
        </a>
      </nav>
    </Frame>
  );
}
