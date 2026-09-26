import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { primeAscii } from "@/lib/ascii";
import type { Lang } from "@/lib/i18n";
import { otherSidePath, type Side } from "@/lib/side";
import { swapSide } from "@/lib/side-transition";

/** Human | AI. A real link to the other side's home, so it works without
 *  JavaScript and the static build finds /ai/; with it, the click swipes.
 *  Each face previews the other side's type: a mono "AI" on the serif pill,
 *  a serif "Human" on the square mono switch. */
export function SideSwitch({ side, lang }: { side: Side; lang: Lang }) {
  const router = useRouter();
  const isAr = lang === "ar";
  const to = otherSidePath(side, lang);
  const next: Side = side === "ai" ? "human" : "ai";

  // Sample the hero photo for the AI side's glyph art while the page is idle,
  // so the first swipe lands on a finished picture.
  useEffect(() => {
    if (side !== "human") return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const run = () => primeAscii();
    if (w.requestIdleCallback) w.requestIdleCallback(run);
    else setTimeout(run, 1200);
  }, [side]);

  const label =
    side === "ai"
      ? isAr
        ? "ارجع لجنب الإنسان"
        : "Back to the human side"
      : isAr
        ? "روح لجنب الـ AI"
        : "Switch to the AI side";

  return (
    <a
      href={to}
      className={`side-switch ${side === "ai" ? "ss-t" : "ss-h"}`}
      data-side-switch
      aria-label={label}
      aria-keyshortcuts="."
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        void swapSide(router, to, next);
      }}
    >
      <span className="ss-opt ss-human" lang={isAr ? "ar" : "en"}>
        {isAr ? "إنسان" : "Human"}
      </span>
      <span className="ss-opt ss-ai" lang="en">
        AI
      </span>
      <span className="ss-tip" aria-hidden="true">
        {label}
        <kbd>.</kbd>
      </span>
    </a>
  );
}
