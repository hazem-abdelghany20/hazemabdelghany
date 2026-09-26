import { createFileRoute } from "@tanstack/react-router";
import { AiWritingPage } from "@/components/pages/AiWritingPage";
import { bilingualAlternates, localePath } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/ar/ai/writing/")({
  staticData: { lang: "ar" },
  head: () =>
    seo({
      path: localePath("ar", "/ai/writing/"),
      title: "كتابات عن الـ AI · Writing — حازم عبدالغني",
      description:
        "كل اللي في جنب الـ AI، حسب الموضوع: تعريفات، context، agents و MCP، أدوات. كل قطعة بدأت فيديو قصير.",
      lang: "ar",
      alternates: bilingualAlternates("/ai/writing/"),
    }),
  component: () => <AiWritingPage lang="ar" />,
});
