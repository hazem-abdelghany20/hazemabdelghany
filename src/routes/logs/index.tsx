import { createFileRoute } from "@tanstack/react-router";
import { LogsPage } from "@/components/pages/LogsPage";
import { bilingualAlternates, localePath } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/logs/")({
  head: () =>
    seo({
      path: localePath("en", "/logs/"),
      title: "The Log · السجل — Hazem Abdelghany",
      description:
        "Everything Hazem Abdelghany reads and watches — books, videos, courses and papers — with an honest line on each one, a rating out of ten, and notes on the ones worth more than a line.",
      lang: "en",
      alternates: bilingualAlternates("/logs/"),
    }),
  component: () => <LogsPage lang="en" />,
});
