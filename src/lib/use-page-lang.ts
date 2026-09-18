import { useMatches } from "@tanstack/react-router";

/** The page's language: the deepest route that knows it wins. Essays carry it
 *  in loader data, fixed-language pages in staticData. */
export function usePageLang(): "en" | "ar" {
  return useMatches({
    select: (matches) => {
      for (let i = matches.length - 1; i >= 0; i--) {
        const m = matches[i]!;
        const lang =
          (m.loaderData as { lang?: "en" | "ar" } | undefined)?.lang ?? m.staticData?.lang;
        if (lang) return lang;
      }
      return "en";
    },
  });
}
