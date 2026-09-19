import { useMatches } from "@tanstack/react-router";
import type { Lang } from "./i18n";

/** The page's language — "ar" for every route under /ar/ (set with
 *  `staticData: { lang: "ar" }`), "en" everywhere else. */
export function usePageLang(): Lang {
  return useMatches({
    select: (matches) => (matches.some((m) => m.staticData?.lang === "ar") ? "ar" : "en"),
  });
}
