import { createFileRoute } from "@tanstack/react-router";
import { AiWritingPage } from "@/components/pages/AiWritingPage";
import { bilingualAlternates, localePath } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/ai/writing/")({
  head: () =>
    seo({
      path: localePath("en", "/ai/writing/"),
      title: "Writing on AI · كتابات — Hazem Abdelghany",
      description:
        "Everything on the AI side, by topic: definitions, context, agents and MCP, tools. Each piece starts from a short video.",
      lang: "en",
      alternates: bilingualAlternates("/ai/writing/"),
    }),
  component: () => <AiWritingPage lang="en" />,
});
