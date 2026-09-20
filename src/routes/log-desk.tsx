import { createFileRoute } from "@tanstack/react-router";
import { LogDeskPage } from "@/components/pages/LogDeskPage";
import { seo } from "@/lib/seo";

/* Hazem's own page: not in the nav, not in the sitemap, noindex, and it shows
   nothing until the passphrase is in. English only — it is a tool, not part of
   the bilingual site. */
export const Route = createFileRoute("/log-desk")({
  head: () =>
    seo({
      path: "/log-desk/",
      title: "The desk",
      description: "Scoring and writing the log.",
      noindex: true,
    }),
  component: LogDeskPage,
});
