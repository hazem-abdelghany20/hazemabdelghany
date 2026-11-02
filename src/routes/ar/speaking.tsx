import { createFileRoute } from "@tanstack/react-router";
import { SpeakingPage } from "@/components/pages/SpeakingPage";
import { seo } from "@/lib/seo";
import { speakingAlternates as alternates } from "@/lib/speaking";

export const Route = createFileRoute("/ar/speaking")({
  staticData: { lang: "ar" },
  head: () => {
    const head = seo({
      path: "/ar/speaking/",
      title: "حازم عبدالغني · Speaker",
      description:
        "حازم عبدالغني بيخلّي الـ AI بسيط، على المسرح وفي التلفزيون وفي قاعة التدريب. أكتر من 50 تدريب لأكتر من 10,000 شخص.",
      lang: "ar",
      alternates,
    });
    return head;
  },
  component: () => <SpeakingPage lang="ar" />,
});
