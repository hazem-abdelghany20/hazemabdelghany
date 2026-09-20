import { createFileRoute } from "@tanstack/react-router";
import { LogsPage } from "@/components/pages/LogsPage";
import { bilingualAlternates, localePath } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/ar/logs/")({
  staticData: { lang: "ar" },
  head: () =>
    seo({
      path: localePath("ar", "/logs/"),
      title: "السجل · The Log — حازم عبدالغني",
      description:
        "كل اللي حازم عبدالغني بيقراه وبيتفرّج عليه — كتب وفيديوهات وكورسات وأوراق — وسطر صريح على كل واحدة، وتقييم من عشرة، وملاحظات على اللي تستاهل أكتر من سطر.",
      lang: "ar",
      alternates: bilingualAlternates("/logs/"),
    }),
  component: () => <LogsPage lang="ar" />,
});
