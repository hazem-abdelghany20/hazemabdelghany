/* Reading aids on a book part (an essay with `series`): a progress line at the
   top of the screen, a "Contents" button that opens the book's contents in a
   side drawer, ←/→ to turn parts, and — per device, in localStorage — the
   reader's place in the book and the parts already read (src/lib/reading.ts).
   None of it is in the prerendered HTML except the closed drawer; the page
   reads the same without it. */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { ReadTick } from "@/components/BookPartsList";
import { L } from "@/components/L";
import { essayPath, type Essay } from "@/lib/essays";
import { localePath, type Lang } from "@/lib/i18n";
import {
  loadProgress,
  minutesLeft,
  READ_AT,
  saveProgress,
  takeResume,
  type BookProgress,
} from "@/lib/reading";
import { groupParts, seriesDef, type SeriesKey } from "@/lib/series";

/** 0 with the article's top at the top of the screen, 1 with its end at the bottom. */
function progressOf(article: HTMLElement) {
  const r = article.getBoundingClientRect();
  const span = r.height - window.innerHeight;
  if (span <= 0) return r.bottom <= window.innerHeight ? 1 : 0;
  return Math.min(1, Math.max(0, -r.top / span));
}

/** Scroll so the reader is `p` of the way through the article. */
function scrollToProgress(article: HTMLElement, p: number) {
  const r = article.getBoundingClientRect();
  const span = Math.max(0, r.height - window.innerHeight);
  window.scrollTo({ top: window.scrollY + r.top + span * p, behavior: "instant" });
}

/** Keys typed into a field, or a selection being extended, are the reader's own. */
function keyIsTaken(e: KeyboardEvent) {
  if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return true;
  const t = e.target as HTMLElement | null;
  if (t && t !== document.body) {
    if (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return true;
    if (t.scrollWidth > t.clientWidth) return true; // a focused box that scrolls sideways
  }
  const selection = window.getSelection();
  if (selection && !selection.isCollapsed) return true;
  const panel = document.getElementById("refpanel");
  return !!panel && !panel.hidden;
}

export function BookReader({
  essay,
  parts,
  prev,
  next,
  site,
}: {
  essay: Essay;
  /** the book's parts in this edition, in reading order */
  parts: Essay[];
  prev?: Essay | undefined;
  next?: Essay | undefined;
  site: Lang;
}) {
  const series = essay.data.series as SeriesKey;
  const lang = essay.data.lang;
  const isAr = lang === "ar";
  const book = seriesDef(series);
  const router = useRouter();
  const barRef = useRef<HTMLSpanElement>(null);
  const drawerRef = useRef<HTMLDialogElement>(null);
  const [ready, setReady] = useState(false);
  const [left, setLeft] = useState<number | null>(null);
  const [read, setRead] = useState<ReadonlySet<string>>(() => new Set());
  const [atEnd, setAtEnd] = useState(false);

  // Follow the scroll: fill the line, count the minutes down, remember the place.
  useEffect(() => {
    const article = document.querySelector<HTMLElement>("article.prose");
    const drawer = drawerRef.current;
    if (!article) return;
    const store: BookProgress = loadProgress(series, lang);
    const resumeAt = takeResume(essay.id) && store.last?.id === essay.id ? store.last.p : null;
    // Opening a part makes it the one to continue; its old place stands until the reader moves.
    store.last = {
      id: essay.id,
      p: store.last?.id === essay.id ? store.last.p : 0,
      at: Date.now(),
    };
    saveProgress(series, lang, store);
    setRead(new Set(store.read));
    setReady(true);

    let moved = false; // only the reader's own scrolling is remembered
    let saved = store.last.p;
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = progressOf(article);
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      const minutes = essay.data.minutes;
      if (minutes) setLeft(p >= READ_AT ? null : Math.max(1, Math.ceil(minutes * (1 - p))));
      if (!moved || Math.abs(p - saved) < 0.01) return;
      saved = p;
      store.last = { id: essay.id, p, at: Date.now() };
      if (p >= READ_AT && !store.read.includes(essay.id)) {
        store.read = [...store.read, essay.id];
        setRead(new Set(store.read));
      }
      saveProgress(series, lang, store);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const intents = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    const onIntent = () => {
      moved = true;
      for (const t of intents) window.removeEventListener(t, onIntent);
    };
    for (const t of intents) window.addEventListener(t, onIntent, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Arriving from "Continue": put the reader back where they stopped. Run
    // again shortly after, in case the router's own scroll-to-top lands later.
    const timers: number[] = [];
    if (resumeAt !== null) {
      const restore = () => {
        if (!moved) scrollToProgress(article, resumeAt);
      };
      requestAnimationFrame(() => requestAnimationFrame(restore));
      timers.push(window.setTimeout(restore, 250));
    }
    update();

    // The series nav at the end already offers the way on; the button steps aside.
    const nav = document.querySelector(".series-nav");
    const io = nav
      ? new IntersectionObserver(([entry]) => setAtEnd(!!entry?.isIntersecting))
      : undefined;
    if (nav) io?.observe(nav);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
      io?.disconnect();
      for (const t of intents) window.removeEventListener(t, onIntent);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (drawer?.open) drawer.close();
    };
  }, [essay.id, essay.data.minutes, series, lang]);

  // ←/→ turn the parts; mirrored on Arabic pages, where the book reads right to left.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (drawerRef.current?.open || keyIsTaken(e)) return;
      const forward = (e.key === "ArrowRight") !== (site === "ar");
      const target = forward ? next : prev;
      if (!target) return;
      e.preventDefault();
      void router.navigate({ to: essayPath(target, site) as "/" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, site, router]);

  const openDrawer = () => {
    const drawer = drawerRef.current;
    if (!drawer || drawer.open) return;
    drawer.showModal();
    document.documentElement.style.overflow = "hidden";
    drawer.querySelector('[aria-current="page"]')?.scrollIntoView({ block: "center" });
  };
  const closeDrawer = () => drawerRef.current?.close();

  const { opening, divisions, closing } = groupParts(parts, book.sections);
  const row = (part: Essay) => (
    <li key={part.id}>
      <L
        href={essayPath(part, site)}
        aria-current={part.id === essay.id ? "page" : undefined}
        onClick={closeDrawer}
      >
        <span className="reader-part-label">{part.data.partLabel}</span>
        <span className="reader-part-title">{part.data.title}</span>
        {read.has(part.id) && <ReadTick lang={lang} />}
      </L>
    </li>
  );

  return (
    <>
      <div className="reader-progress" dir={isAr ? "rtl" : "ltr"} aria-hidden="true">
        <span ref={barRef} />
      </div>

      {ready && (
        <button
          type="button"
          className={atEnd ? "reader-pill is-away" : "reader-pill"}
          dir={isAr ? "rtl" : "ltr"}
          lang={lang}
          aria-haspopup="dialog"
          onClick={openDrawer}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" strokeWidth="1.3" fill="none" />
          </svg>
          <span>{isAr ? "الفهرس" : "Contents"}</span>
          {left !== null && <span className="reader-pill-left">{minutesLeft(lang, left)}</span>}
        </button>
      )}

      <dialog
        ref={drawerRef}
        className="reader-drawer"
        dir={isAr ? "rtl" : "ltr"}
        lang={lang}
        aria-labelledby="reader-drawer-title"
        onClose={() => (document.documentElement.style.overflow = "")}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeDrawer(); // the backdrop
        }}
      >
        <div className="reader-drawer-inner">
          <header className="reader-drawer-head">
            <div>
              <span className="kicker">{isAr ? "الفهرس" : "Contents"}</span>
              <h2 id="reader-drawer-title">{isAr ? book.ar : book.title}</h2>
            </div>
            <button
              type="button"
              className="reader-drawer-close"
              onClick={closeDrawer}
              aria-label={isAr ? "اقفل الفهرس" : "Close contents"}
            >
              ✕
            </button>
          </header>
          <nav className="reader-drawer-list" aria-labelledby="reader-drawer-title">
            {opening.length > 0 && <ol>{opening.map(row)}</ol>}
            {divisions.map(
              ({ section, parts: sectionParts }) =>
                sectionParts.length > 0 && (
                  <section key={section.number}>
                    <h3>
                      {isAr ? `الجزء ${section.numberAr}` : `Part ${section.number}`}
                      <span>{isAr ? section.titleAr : section.title}</span>
                    </h3>
                    <ol>{sectionParts.map(row)}</ol>
                  </section>
                ),
            )}
            {closing.length > 0 && <ol>{closing.map(row)}</ol>}
          </nav>
          <footer className="reader-drawer-foot">
            <L href={localePath(site, `/${book.slug}/`)} onClick={closeDrawer}>
              {isAr ? "صفحة الكتاب" : "The book's page"}
            </L>
            <span className="reader-keys" aria-hidden="true">
              {isAr ? "← → بين الأجزاء" : "← → between parts"}
            </span>
          </footer>
        </div>
      </dialog>
    </>
  );
}
