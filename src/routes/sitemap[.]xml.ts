import { createFileRoute } from "@tanstack/react-router";
import { publishedEssays } from "@/lib/essays";
import { THREADS } from "@/lib/threads";
import { SERIES, seriesHref } from "@/lib/series";
import { SITE } from "@/lib/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls: { loc: string; pri: string; lastmod?: string }[] = [
          { loc: "/", pri: "1.0" },
          { loc: "/books/", pri: "0.9" },
          { loc: "/essays/", pri: "0.9" },
          { loc: "/about/", pri: "0.7" },
          ...Object.values(SERIES).map((s) => ({ loc: seriesHref(s.key), pri: "0.9" })),
          ...THREADS.map((t) => ({ loc: `/threads/${t.key}/`, pri: "0.6" })),
          ...publishedEssays().map((e) => ({
            loc: `/essays/${e.id}/`,
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
