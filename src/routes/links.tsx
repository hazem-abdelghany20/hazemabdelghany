import { createFileRoute } from "@tanstack/react-router";
import { LinksPage } from "@/components/pages/LinksPage";
import { seo } from "@/lib/seo";

// The Instagram bio page (see src/lib/links.ts). Arabic, no site nav.
export const Route = createFileRoute("/links")({
  staticData: { lang: "ar" },
  head: () => {
    const head = seo({
      path: "/links/",
      title: "حازم عبدالغني — Hazem Abdelghany · Links",
      description: "اعرف حازم، حساباته، الـguides ببلاش، واحجز session.",
      lang: "ar",
    });
    // This page's own typeface (src/styles/links.css).
    const font = { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Alexandria:wght@400;600;700;800&display=swap" };
    return { ...head, links: [...(head.links ?? []), font] };
  },
  component: LinksPage,
});
