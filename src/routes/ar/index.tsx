import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/pages/HomePage";
import { bilingualAlternates } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/ar/")({
  staticData: { lang: "ar" },
  head: () =>
    seo({
      path: "/ar/",
      title: "حازم عبدالغني · Hazem Abdelghany",
      description: "مقالات عن البناء والإيمان والجسد والعقل. بالعربي والإنجليزي.",
      lang: "ar",
      alternates: bilingualAlternates("/"),
    }),
  component: () => <HomePage lang="ar" />,
});
