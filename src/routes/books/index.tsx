import { createFileRoute } from "@tanstack/react-router";
import { BooksPage } from "@/components/pages/BooksPage";
import { bilingualAlternates, localePath } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/books/")({
  head: () =>
    seo({
      path: localePath("en", "/books/"),
      title: "Books · كتب — Hazem Abdelghany",
      description:
        "The long-form work: The Conditions of Fortune and The Effort Is Yours, published in parts in English and Arabic.",
      lang: "en",
      alternates: bilingualAlternates("/books/"),
    }),
  component: () => <BooksPage lang="en" />,
});
