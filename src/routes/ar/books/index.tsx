import { createFileRoute } from "@tanstack/react-router";
import { BooksPage } from "@/components/pages/BooksPage";
import { bilingualAlternates, localePath } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/ar/books/")({
  staticData: { lang: "ar" },
  head: () =>
    seo({
      path: localePath("ar", "/books/"),
      title: "كتب · Books — حازم عبدالغني",
      description: "الشغل الطويل: شروط الثراء وعليكَ السعي، بينزلوا على أجزاء بالعربي والإنجليزي.",
      lang: "ar",
      alternates: bilingualAlternates("/books/"),
    }),
  component: () => <BooksPage lang="ar" />,
});
