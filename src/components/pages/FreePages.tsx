import { useEffect, useState } from "react";
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

const IG = "https://www.instagram.com/hazem_abdelghany/";
const domain = (u: string) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** /free/ — every guide a reel promised, newest first. Arabic, on the AI side. */
export function FreeIndexPage({ initial }: { initial: FreeListing[] | null }) {
  const [list, setList] = useState(initial ?? []);
  // The build froze the list; pick up guides published since.
  useEffect(() => {
    void fetchFreeList().then((l) => l && setList(l));
  }, []);

  return (
    <section className="t-article t-free">
      <header className="t-art-head">
        <p className="t-mark" dir="ltr">
          <span className="t-ps1" aria-hidden="true">
            ${" "}
          </span>
          ls <span className="t-flag">free/</span>
        </p>
        <h1 className="t-art-title" lang="ar" dir="rtl">
          الـguides اللي ببلاش
        </h1>
        <p className="t-art-lede" lang="ar">
          كل guide وعدت بيه في فيديو، هنا. الـprompts جاهزة تنسخها.
        </p>
      </header>
      {list.length ? (
        <ul className="t-free-list">
          {list.map((k) => (
            <li key={k.slug}>
              <L href={`/free/${k.slug}/`} className="t-free-row">
                <span className="t-free-title" lang="ar">
                  {k.title}
                </span>
                <span className="t-free-slug" dir="ltr">
                  /{k.slug}
                </span>
              </L>
            </li>
          ))}
        </ul>
      ) : (
        <p className="t-empty">…</p>
      )}
    </section>
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

  if (!kit) {
    return (
      <section className="t-article t-free">
        <header className="t-art-head">
          <h1 className="t-art-title" lang="ar" dir="rtl">
            الـguide ده مش هنا لسه
          </h1>
          <p className="t-art-lede" lang="ar">
            <a href={suitePage(slug)}>افتحه من هنا</a> ، أو شوف <L href="/free/">كل الـguides</L>.
          </p>
        </header>
      </section>
    );
  }

  const copy = (it: FreeItem) => {
    void navigator.clipboard?.writeText(it.note ?? "").then(() => {
      setCopied(it.id);
      setTimeout(() => setCopied((c) => (c === it.id ? null : c)), 1600);
    });
    trackFree(slug, "click", it.id);
  };

  return (
    <article className="t-article t-free">
      <header className="t-art-head">
        <p className="t-mark" dir="ltr">
          <span className="t-ps1" aria-hidden="true">
            ${" "}
          </span>
          cat <span className="t-flag">free/{kit.slug}.md</span>
        </p>
        <h1 className="t-art-title" lang="ar" dir="rtl">
          {kit.title}
        </h1>
        {kit.intro && (
          <p className="t-art-lede t-free-text" lang="ar">
            {kit.intro}
          </p>
        )}
      </header>
      <div className="t-prose t-free-body" lang="ar">
        {kit.items.map((it) => (
          <div key={it.id} className="t-free-item">
            {/^https?:\/\//i.test(it.url) ? (
              <a
                className="t-free-link"
                href={it.url}
                target="_blank"
                rel="noopener"
                dir="rtl"
                onClick={() => trackFree(slug, "click", it.id)}
              >
                <span>{it.label}</span>
                <small dir="ltr">{domain(it.url)}</small>
              </a>
            ) : (
              <p className="t-free-step t-free-text" dir="rtl">
                {it.label}
              </p>
            )}
            {it.note && (
              <pre>
                <div className="t-code-bar">
                  <span>
                    <span className="t-ps1">$</span>
                    {/^(npx|npm|\/)\S*/.test(it.note) && !it.note.includes("\n") ? "terminal" : "try-it.txt"}
                  </span>
                  <button
                    type="button"
                    className="t-copy"
                    data-done={copied === it.id ? "" : undefined}
                    onClick={() => copy(it)}
                  >
                    {copied === it.id ? "اتنسخ" : "انسخ"}
                  </button>
                </div>
                <code>{it.note}</code>
              </pre>
            )}
          </div>
        ))}
        {kit.outro && <p className="t-free-outro t-free-text">{kit.outro}</p>}
      </div>
      <div className="t-art-end">
        <L href="/free/">→ كل الـguides</L>
        <a href={IG} dir="ltr">
          @hazem_abdelghany
        </a>
      </div>
    </article>
  );
}
