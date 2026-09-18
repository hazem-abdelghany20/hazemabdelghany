import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/AboutPage";
import { seo } from "@/lib/seo";
import { aboutAlternates as alternates } from "@/lib/about";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      path: "/about/",
      title: "About · عنّي — Hazem Abdelghany",
      description:
        "Hazem Abdelghany is a builder from Cairo working across companies, AI, education, faith, the body, and the mind.",
      alternates,
    }),
  component: () => <AboutPage lang="en" />,
});
