import { useRouterState } from "@tanstack/react-router";
import { localePath, type Lang } from "./i18n";

/* The site has two sides. The human side is everything that was here first:
   essays, books, the log. The AI side lives under /ai/ (and /ar/ai/). The
   switch in the nav swipes between them; a page's side comes from its path. */

export type Side = "human" | "ai";

export const sideOf = (pathname: string): Side =>
  /^(\/ar)?\/ai(\/|$)/.test(pathname) ? "ai" : "human";

export function useSide(): Side {
  return useRouterState({ select: (s) => sideOf(s.location.pathname) });
}

/** Where the switch goes from this page: the other side's home, same language. */
export const otherSidePath = (side: Side, lang: Lang) =>
  localePath(lang, side === "ai" ? "/" : "/ai/");
