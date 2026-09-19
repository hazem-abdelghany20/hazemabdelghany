import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/pages/HomePage";
import { bilingualAlternates } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      path: "/",

      lang: "en",
      alternates: bilingualAlternates("/"),
    }),
  component: () => <HomePage lang="en" />,
});
