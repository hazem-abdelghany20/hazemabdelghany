import type { AnyRouter } from "@tanstack/react-router";
import type { Side } from "./side";

/* The swipe between the two sides: a View Transition around the route change.
   The keyframes live in styles/ai.css and key off classes on <html>:
     vt-to-ai | vt-to-human   where we're going (the direction follows [dir])
     is-seaming               the seam element takes part (named t-seam)
     is-swapping              colour transitions off, so the new snapshot is final
     vt-fade                  reduced motion: a short crossfade instead */

const SEAM_CHARS = "01<>/\\{}[]=+*#;:~-_|$%&";

/** Fresh glyphs for the seam's print-head column. */
function seedSeam() {
  const pre = document.querySelector<HTMLElement>(".t-seam-glyphs");
  if (!pre) return;
  const rows = Math.ceil(window.innerHeight / 12) + 2;
  const out: string[] = [];
  for (let r = 0; r < rows; r++) {
    let line = "";
    const n = 2 + ((r * 7) % 5);
    for (let c = 0; c < n; c++) {
      line += Math.random() < 0.18 ? " " : SEAM_CHARS[(Math.random() * SEAM_CHARS.length) | 0];
    }
    out.push(line);
  }
  pre.textContent = out.join("\n");
}

/** Resolves once `test` passes, or after `ms` either way. */
function until(test: () => boolean, ms = 1500) {
  return new Promise<void>((resolve) => {
    const start = Date.now();
    (function poll() {
      if (test() || Date.now() - start > ms) resolve();
      else setTimeout(poll, 16);
    })();
  });
}

let busy = false;

/** Go to the other side's page `to`, swiping when the browser can. */
export async function swapSide(router: AnyRouter, to: string, next: Side) {
  if (busy) return;
  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canVT = typeof document.startViewTransition === "function";
  // Focus that was on the switch lands on the incoming switch.
  const fromSwitch = !!document.activeElement?.closest?.("[data-side-switch]");

  const go = async () => {
    root.classList.add("is-swapping");
    if (canVT && !reduced) root.classList.add("is-seaming");
    await router.navigate({ to: to as "/", resetScroll: true });
    // The new snapshot is taken when this resolves, so wait for the commit.
    await until(() => root.dataset["side"] === next && !!document.querySelector(`.side-${next}`));
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (fromSwitch) {
      document.querySelector<HTMLElement>("[data-side-switch]")?.focus({ preventScroll: true });
    }
  };

  const cleanup = () => {
    root.classList.remove("vt-to-ai", "vt-to-human", "vt-fade", "is-seaming", "is-swapping");
    busy = false;
  };

  busy = true;
  if (!canVT) {
    try {
      await go();
    } finally {
      cleanup();
    }
    return;
  }
  if (!reduced) seedSeam();
  root.classList.add(reduced ? "vt-fade" : next === "ai" ? "vt-to-ai" : "vt-to-human");
  try {
    await document.startViewTransition(go).finished;
  } catch {
    // an aborted transition still leaves the new page in place
  } finally {
    cleanup();
  }
}
