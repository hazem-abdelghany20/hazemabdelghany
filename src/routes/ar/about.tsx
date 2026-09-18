import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/AboutPage";
import { seo } from "@/lib/seo";
import { aboutAlternates as alternates } from "@/lib/about";

export const Route = createFileRoute("/ar/about")({
  staticData: { lang: "ar" },
  head: () =>
    seo({
      path: "/ar/about/",
      title: "عنّي · About — حازم عبدالغني",
      description:
        "حازم عبدالغني بنّاء من القاهرة، بيشتغل على الشركات والذكاء الاصطناعي والتعليم والإيمان والجسد والعقل.",
      lang: "ar",
      alternates,
    }),
  component: () => <AboutPage lang="ar" />,
});
