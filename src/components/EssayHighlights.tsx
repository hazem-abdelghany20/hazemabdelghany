/* Highlights. Select a passage in the essay (10–280 characters) and a
   "Highlight" button appears by it — or, on touch screens, a bar at the bottom,
   clear of the phone's own selection menu. The reader's highlights stay marked
   for them (localStorage). The passage most readers highlighted (3+) gets a
   quiet underline and a "Most highlighted by readers" label on hover or tap —
   only if it is found word for word in the essay, so text that isn't in the
   essay never shows. Data: src/lib/reader-db.ts. */
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Lang } from "@/lib/i18n";
import {
  addHighlight,
  fetchTopHighlights,
  HIGHLIGHT_MAX,
  HIGHLIGHT_MIN,
  myHighlights,
} from "@/lib/reader-db";
import { markText, normalizeText, unmark } from "@/lib/text-marks";

type Pick = { text: string; x: number; y: number; below: boolean };

export function EssayHighlights({
  slug,
  lang,
  site,
}: {
  slug: string;
  /** the essay's language — highlights are kept per edition */
  lang: "en" | "ar";
  /** the site's language, for the button and label */
  site: Lang;
}) {
  const [ready, setReady] = useState(false);
  const [touch, setTouch] = useState(false);
  const [pick, setPick] = useState<Pick | null>(null);
  const [label, setLabel] = useState<{ x: number; y: number } | null>(null);
  const marks = useRef<HTMLElement[]>([]);
  const isAr = site === "ar";

  // Mark the reader's own highlights and the readers' favourite line.
  useEffect(() => {
    const article = document.querySelector<HTMLElement>("article.prose");
    if (!article) return;
    setReady(true);
    setTouch(window.matchMedia("(pointer: coarse)").matches);
    for (const text of myHighlights(slug, lang)) {
      marks.current.push(...markText(article, text, "hl-mine"));
    }
    let alive = true;
    void fetchTopHighlights(slug, lang).then((passages) => {
      if (!alive) return;
      for (const passage of passages) {
        const found = markText(article, passage, "hl-top");
        if (found.length === 0) continue; // not in the essay: never shown
        marks.current.push(...found);
        found.forEach((m) => {
          m.tabIndex = -1;
          m.dataset["first"] = m === found[0] ? "1" : "";
        });
        break;
      }
    });
    return () => {
      alive = false;
      unmark(marks.current);
      marks.current = [];
    };
  }, [slug, lang]);

  // Offer the button when a finished selection inside the essay is highlightable.
  useEffect(() => {
    const article = document.querySelector<HTMLElement>("article.prose");
    if (!article) return;
    let pointerDown = false;
    let timer = 0;
    const check = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || selection.rangeCount === 0) return setPick(null);
      const range = selection.getRangeAt(0);
      if (!article.contains(range.commonAncestorContainer)) return setPick(null);
      const text = normalizeText(selection.toString());
      if (
        text.length < HIGHLIGHT_MIN ||
        text.length > HIGHLIGHT_MAX ||
        myHighlights(slug, lang).includes(text)
      ) {
        return setPick(null);
      }
      const r = range.getBoundingClientRect();
      const below = r.top < 72; // too close to the top of the screen: go under it
      setPick({
        text,
        x: Math.min(Math.max(r.left + r.width / 2, 70), window.innerWidth - 70) + window.scrollX,
        y: (below ? r.bottom + 10 : r.top - 10) + window.scrollY,
        below,
      });
    };
    const later = () => {
      window.clearTimeout(timer);
      if (!pointerDown) timer = window.setTimeout(check, 180);
    };
    const onDown = (e: PointerEvent) => {
      if ((e.target as Element | null)?.closest?.(".hl-button, .hl-bar")) return;
      pointerDown = e.pointerType === "mouse";
    };
    const onUp = () => {
      if (!pointerDown) return;
      pointerDown = false;
      later();
    };
    document.addEventListener("selectionchange", later);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerup", onUp);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("selectionchange", later);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
    };
  }, [slug, lang]);

  // "Most highlighted by readers" on hover, focus or tap of the marked line.
  useEffect(() => {
    const article = document.querySelector<HTMLElement>("article.prose");
    if (!article) return;
    const show = (e: Event) => {
      const mark = (e.target as Element | null)?.closest?.("mark.hl-top");
      if (!mark) return;
      const first = article.querySelector<HTMLElement>('mark.hl-top[data-first="1"]') ?? mark;
      const r = first.getClientRects()[0] ?? first.getBoundingClientRect();
      // start the label where the line starts (right edge on Arabic), on screen
      const x = lang === "ar" ? r.right : r.left;
      setLabel({ x: Math.min(Math.max(x, 12), window.innerWidth - 12), y: r.top });
    };
    const elsewhere = (e: Event) => {
      if (!(e.target as Element | null)?.closest?.("mark.hl-top")) setLabel(null);
    };
    const hide = (e: Event) => {
      if ((e.target as Element | null)?.closest?.("mark.hl-top")) setLabel(null);
    };
    const away = () => setLabel(null);
    article.addEventListener("mouseover", show);
    article.addEventListener("mouseout", hide);
    article.addEventListener("click", show);
    window.addEventListener("scroll", away, { passive: true });
    document.addEventListener("click", elsewhere);
    return () => {
      document.removeEventListener("click", elsewhere);
      article.removeEventListener("mouseover", show);
      article.removeEventListener("mouseout", hide);
      article.removeEventListener("click", show);
      window.removeEventListener("scroll", away);
    };
  }, [lang]);

  const highlight = () => {
    if (!pick) return;
    const article = document.querySelector<HTMLElement>("article.prose");
    if (article) marks.current.push(...markText(article, pick.text, "hl-mine"));
    void addHighlight(slug, lang, pick.text);
    window.getSelection()?.removeAllRanges();
    setPick(null);
  };

  if (!ready) return null;
  const word = isAr ? "علّم عليها" : "Highlight";
  return createPortal(
    <>
      {pick &&
        (touch ? (
          <div className="hl-bar" dir={isAr ? "rtl" : "ltr"} lang={site}>
            <span className="hl-bar-text" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
              {pick.text}
            </span>
            <button type="button" className="hl-bar-button" onClick={highlight}>
              {word}
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={pick.below ? "hl-button is-below" : "hl-button"}
            style={{ left: pick.x, top: pick.y }}
            lang={site}
            onPointerDown={(e) => e.preventDefault()} // keep the selection
            onClick={highlight}
          >
            {word}
          </button>
        ))}
      {label && (
        <span
          className="hl-label"
          role="tooltip"
          lang={site}
          dir={lang === "ar" ? "rtl" : "ltr"}
          style={{ left: label.x, top: label.y }}
        >
          {isAr ? "أكتر جملة الناس علّمت عليها" : "Most highlighted by readers"}
        </span>
      )}
    </>,
    document.body,
  );
}
