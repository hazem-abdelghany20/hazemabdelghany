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
        "حازم عبدالغني بيخلّي الـ AI بسيط ومفيد لكل اللي بيتكلموا عربي. محاضرات وورش وpanels.",
      lang: "ar",
      alternates,
    });
    const font = {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Alexandria:wght@400;600;700;800&display=swap",
    };
    return { ...head, links: [...(head.links ?? []), font] };
  },
  component: () => <SpeakingPage lang="ar" />,
});
