import { createFileRoute } from "@tanstack/react-router";
import { SpeakingPage } from "@/components/pages/SpeakingPage";
import { seo } from "@/lib/seo";
import { speakingAlternates as alternates } from "@/lib/speaking";

// The speaker kit Hazem sends to organizers (src/lib/speaking.ts). No site nav, like /links/.
export const Route = createFileRoute("/speaking")({
  head: () => {
    const head = seo({
      path: "/speaking/",
      title: "Hazem Abdelghany · Speaker",
      description:
        "Hazem Abdelghany makes AI simple and useful for Arabic speakers. Talks, workshops and panels.",
      alternates,
    });
    // Same typeface as /links/ (src/styles/speaking.css).
    const font = {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Alexandria:wght@400;600;700;800&display=swap",
    };
    return { ...head, links: [...(head.links ?? []), font] };
  },
  component: () => <SpeakingPage lang="en" />,
});
