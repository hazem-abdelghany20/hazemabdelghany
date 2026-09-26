import { createFileRoute } from "@tanstack/react-router";
import { AiHomePage } from "@/components/pages/AiHomePage";
import { bilingualAlternates, localePath } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/ar/ai/")({
  staticData: { lang: "ar" },
  head: () =>
    seo({
      path: localePath("ar", "/ai/"),
      title: "الـ AI · حازم عبدالغني — Hazem Abdelghany",
      description:
        "جنب الـ AI في موقع حازم عبدالغني: تعريفات بسيطة، والأدوات اللي بيستخدمها، وإزاي بيبني بالـ agents. أغلبها بدأ فيديو قصير.",
      lang: "ar",
      alternates: bilingualAlternates("/ai/"),
    }),
  component: () => <AiHomePage lang="ar" />,
});
