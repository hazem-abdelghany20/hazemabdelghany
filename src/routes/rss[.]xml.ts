import { createFileRoute } from "@tanstack/react-router";
import { essayPath, publishedEssays } from "@/lib/essays";
import { threadLabel } from "@/lib/threads";
import { SITE } from "@/lib/seo";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: () => {
        const items = publishedEssays()
          .map((e) => {
            const url = new URL(essayPath(e, e.data.lang), SITE).href;
            const thread = threadLabel(e.data.thread);
            const title =
              e.data.series && e.data.partLabel
                ? `${e.data.partLabel} — ${e.data.title}`
                : e.data.title;
            return `    <item>
      <title>${esc(title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${e.data.date.toUTCString()}</pubDate>
      <category>${esc(thread.en)}</category>
      ${e.data.description ? `<description>${esc(e.data.description)}</description>` : ""}
    </item>`;
          })
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hazem Abdelghany — Essays</title>
    <link>${SITE}/</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Essays on building, faith, the body, and the mind. In Arabic and English.</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
