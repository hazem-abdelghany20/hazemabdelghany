import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import type { Lang } from "./i18n";
import { otherSidePath, type Side } from "./side";
import { swapSide } from "./side-transition";

/** The two other ways to flip sides, besides the switch:
 *  - "." on the keyboard (the physical key, so it works on an Arabic layout
 *    too), unless it was turned off in the AI side's footer;
 *  - a horizontal swipe on a touch screen. AI lives on the switch's side:
 *    in English you swipe left to reach it, in Arabic right. */
export function useSideGestures(side: Side, lang: Lang) {
  const router = useRouter();

  useEffect(() => {
    const root = document.documentElement;
    const next: Side = side === "ai" ? "human" : "ai";
    const go = () => void swapSide(router, otherSidePath(side, lang), next);

    const isEditable = (el: Element | null) =>
      !!el &&
      ((el as HTMLElement).isContentEditable ||
        el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.tagName === "SELECT");

    const onKey = (e: KeyboardEvent) => {
      const isDot = e.key === "." || (e.code === "Period" && !e.shiftKey);
      if (!isDot || e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
      if (root.dataset["sideKey"] === "off" || isEditable(e.target as Element)) return;
      // Someone selecting text to highlight or copy is reading, not navigating.
      if (window.getSelection()?.toString()) return;
      e.preventDefault();
      go();
    };

    // Passive listeners only: vertical scrolling is never blocked.
    const EDGE = 24,
      MIN_DX = 80,
      RATIO = 1.6,
      MAX_MS = 900;
    let t0: { x: number; y: number; t: number; dead: boolean } | null = null;
    const zoomed = () => (window.visualViewport?.scale ?? 1) > 1.01;
    const inScroller = (el: Element | null) => {
      for (; el && el !== document.body; el = el.parentElement) {
        if (el.scrollWidth > el.clientWidth + 1) {
          const ox = getComputedStyle(el).overflowX;
          if (ox === "auto" || ox === "scroll") return true;
        }
        if (isEditable(el) || el.tagName === "VIDEO") return true;
      }
      return false;
    };
    const onStart = (e: TouchEvent) => {
      t0 = null;
      if (e.touches.length !== 1 || zoomed()) return;
      const p = e.touches[0]!;
      // The screen edges belong to the browser's own back/forward gesture.
      if (p.clientX < EDGE || p.clientX > window.innerWidth - EDGE) return;
      if (inScroller(e.target as Element)) return;
      t0 = { x: p.clientX, y: p.clientY, t: Date.now(), dead: false };
    };
    const onMove = (e: TouchEvent) => {
      if (!t0 || t0.dead) return;
      const p = e.touches[0]!;
      const dx = p.clientX - t0.x,
        dy = p.clientY - t0.y;
      if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) t0.dead = true;
    };
    const onEnd = (e: TouchEvent) => {
      if (!t0 || t0.dead) {
        t0 = null;
        return;
      }
      const p = e.changedTouches[0]!;
      const dx = p.clientX - t0.x,
        dy = p.clientY - t0.y;
      const fast = Date.now() - t0.t < MAX_MS;
      t0 = null;
      if (zoomed() || !fast || Math.abs(dx) < MIN_DX || Math.abs(dx) < RATIO * Math.abs(dy)) return;
      // Content moves with the finger: pulling right-to-left brings in what's
      // on the right. AI is on the right in English, on the left in Arabic.
      const aiOnRight = root.dir !== "rtl";
      const towardAi = aiOnRight ? dx < 0 : dx > 0;
      if (towardAi === (side === "human")) go();
    };
    const onCancel = () => {
      t0 = null;
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", onEnd, { passive: true });
    document.addEventListener("touchcancel", onCancel, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
      document.removeEventListener("touchcancel", onCancel);
    };
  }, [router, side, lang]);
}
