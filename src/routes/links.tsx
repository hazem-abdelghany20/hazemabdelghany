import { createFileRoute } from "@tanstack/react-router";
import { LinksPage } from "@/components/pages/LinksPage";
import { seo } from "@/lib/seo";

// The Instagram bio page (see src/lib/links.ts). Arabic, no site nav.
export const Route = createFileRoute("/links")({
  staticData: { lang: "ar" },
  head: () =>
    seo({
      path: "/links/",
      title: "حازم عبدالغني — Hazem Abdelghany · Links",
      description: "اعرف حازم، حساباته، الـguides ببلاش، واحجز session.",
      lang: "ar",
    }),
  component: LinksPage,
});
