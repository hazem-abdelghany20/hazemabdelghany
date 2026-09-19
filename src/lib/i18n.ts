/* The site exists twice: English at the root, Arabic mirrored under /ar/.
   Every page has the same path in both trees, so switching language is just
   adding or removing the prefix. */

export type Lang = "en" | "ar";

export const otherLang = (lang: Lang): Lang => (lang === "ar" ? "en" : "ar");

/** An English path in the given language: "/essays/" → "/ar/essays/". */
export function localePath(lang: Lang, path: string): string {
  if (lang === "en") return path;
  return path === "/" ? "/ar/" : `/ar${path}`;
}

/** The same page in the other language. */
export function switchPath(pathname: string): string {
  if (pathname === "/ar" || pathname === "/ar/") return "/";
  if (pathname.startsWith("/ar/")) return pathname.slice(3);
  return localePath("ar", pathname);
}

/** hreflang links for a page that exists in both languages. */
export function bilingualAlternates(enPath: string, arPath = localePath("ar", enPath)) {
  return [
    { lang: "en", href: enPath },
    { lang: "ar-EG", href: arPath },
    { lang: "x-default", href: enPath },
  ];
}

/** Arrow that points "forward" in the reading direction. */
export const fwd = (lang: Lang) => (lang === "ar" ? "←" : "→");
export const back = (lang: Lang) => (lang === "ar" ? "→" : "←");

/** "— Hazem Abdelghany" / "— حازم عبدالغني" at the end of a page title. */
export const titleSuffix = (lang: Lang) =>
  lang === "ar" ? " — حازم عبدالغني" : " — Hazem Abdelghany";

/** "3 of 19 parts" */
export const ofParts = (lang: Lang, count: number, total: number) =>
  lang === "ar" ? `${count} من ${total} جزء` : `${count} of ${total} parts`;
