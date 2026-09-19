import { createFileRoute } from "@tanstack/react-router";
import { EssaysPage } from "@/components/pages/EssaysPage";
import { bilingualAlternates, localePath } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/essays/")({
  head: () =>
    seo({
      path: localePath("en", "/essays/"),
      title: "Articles · مقالات — Hazem Abdelghany",
      description:
        "Standalone articles by Hazem Abdelghany, across five threads — building, faith, the body, the mind, and perspective. In Egyptian Arabic and English. The long-form books live separately.",
      lang: "en",
      alternates: bilingualAlternates("/essays/"),
    }),
  component: () => <EssaysPage lang="en" />,
});
