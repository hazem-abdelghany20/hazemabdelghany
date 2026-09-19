import { createFileRoute } from "@tanstack/react-router";
import { EssaysPage } from "@/components/pages/EssaysPage";
import { bilingualAlternates, localePath } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/ar/essays/")({
  staticData: { lang: "ar" },
  head: () =>
    seo({
      path: localePath("ar", "/essays/"),
      title: "مقالات · Articles — حازم عبدالغني",
      description:
        "مقالات منفصلة لحازم عبدالغني في خمس خيوط — البناء، والإيمان، والجسد، والعقل، والنظرة. بالمصري والإنجليزي. الكتب الطويلة موجودة لوحدها.",
      lang: "ar",
      alternates: bilingualAlternates("/essays/"),
    }),
  component: () => <EssaysPage lang="ar" />,
});
