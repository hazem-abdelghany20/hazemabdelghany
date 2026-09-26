import { createFileRoute } from "@tanstack/react-router";
import { AiHomePage } from "@/components/pages/AiHomePage";
import { bilingualAlternates, localePath } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/ai/")({
  head: () =>
    seo({
      path: localePath("en", "/ai/"),
      title: "AI · Hazem Abdelghany — حازم عبدالغني",
      description:
        "The AI side of Hazem Abdelghany's site: plain definitions, the tools he uses, and how he builds with agents. Most pieces start as a short video. In Egyptian Arabic and English.",
      lang: "en",
      alternates: bilingualAlternates("/ai/"),
    }),
  component: () => <AiHomePage lang="en" />,
});
