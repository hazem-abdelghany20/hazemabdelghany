import { createFileRoute } from "@tanstack/react-router";
import { essayPath, publishedEssays } from "@/lib/essays";
import { localePath, type Lang } from "@/lib/i18n";
import { THREADS } from "@/lib/threads";
import { SERIES, seriesHref } from "@/lib/series";
import { SITE } from "@/lib/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        // Both language trees; each essay once, at its own language's URL.
        const pages = (lang: Lang) => [
          { loc: localePath(lang, "/"), pri: "1.0" },
          { loc: localePath(lang, "/books/"), pri: "0.9" },
          { loc: localePath(lang, "/essays/"), pri: "0.9" },
          { loc: localePath(lang, "/about/"), pri: "0.7" },
          ...Object.values(SERIES).map((s) => ({
            loc: localePath(lang, seriesHref(s.key)),
            pri: "0.9",
          })),
          ...THREADS.map((t) => ({ loc: localePath(lang, `/threads/${t.key}/`), pri: "0.6" })),
        ];
        const urls: { loc: string; pri: string; lastmod?: string }[] = [
          ...pages("en"),
          ...pages("ar"),
          ...publishedEssays().map((e) => ({
            loc: essayPath(e, e.data.lang),
            pri: "0.8",
            lastmod: e.data.date.toISOString().slice(0, 10),
          })),
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${new URL(u.loc, SITE).href}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}
    <priority>${u.pri}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
