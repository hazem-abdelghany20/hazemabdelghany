export const SITE = "https://hazemabdelghany.com";

export const DEFAULT_TITLE = "Hazem Abdelghany · حازم عبدالغني";
export const DEFAULT_DESCRIPTION =
  "Essays on building, faith, the body, and the mind. In Arabic and English.";

type SeoOptions = {
  /** Path of the page, trailing slash included — "/essays/x/". */
  path: string;
  title?: string | undefined;
  description?: string | undefined;
  /** 'ar' switches the document language and direction for Arabic pages. */
  lang?: "en" | "ar" | undefined;
  /** Article metadata, when the page is one. */
  published?: Date | undefined;
  type?: "website" | "article" | undefined;
  /** Keep a page out of the index and out of canonical/og:url. */
  noindex?: boolean | undefined;
  /** Thread name, for article structured data. */
  section?: string | undefined;
  /** Equivalent editions of this page in other languages. */
  alternates?: Array<{ lang: string; href: string }> | undefined;
};

/** Everything a page puts in <head>, for a route's `head()`. */
export function seo({
  path,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  lang = "en",
  published,
  type = "website",
  noindex = false,
  section,
  alternates = [],
}: SeoOptions) {
  const canonical = new URL(path, SITE).href;
  const ogImage = new URL("/og.png", SITE).href;

  const article =
    type === "article" && published
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: title.replace(" — Hazem Abdelghany", ""),
          datePublished: published.toISOString(),
          inLanguage: lang === "ar" ? "ar-EG" : "en",
          ...(section ? { articleSection: section } : {}),
          ...(description ? { description } : {}),
          mainEntityOfPage: canonical,
          author: { "@type": "Person", name: "Hazem Abdelghany", url: `${SITE}/` },
        }
      : null;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      ...(noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
      { property: "og:type", content: type },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      ...(noindex ? [] : [{ property: "og:url", content: canonical }]),
      { property: "og:image", content: ogImage },
      { property: "og:site_name", content: "Hazem Abdelghany" },
      { property: "og:locale", content: lang === "ar" ? "ar_EG" : "en_US" },
      ...(published
        ? [{ property: "article:published_time", content: published.toISOString() }]
        : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
      ...(article ? [{ "script:ld+json": article }] : []),
    ],
    links: [
      ...(noindex ? [] : [{ rel: "canonical", href: canonical }]),
      ...alternates.map((a) => ({
        rel: "alternate",
        hrefLang: a.lang,
        href: new URL(a.href, SITE).href,
      })),
    ],
  };
}
