import { createFileRoute } from "@tanstack/react-router";
import { SpeakingPage } from "@/components/pages/SpeakingPage";
import { seo } from "@/lib/seo";
import { speakingAlternates as alternates } from "@/lib/speaking";

// The speaker page Hazem sends to event organizers (src/lib/speaking.ts).
export const Route = createFileRoute("/speaking")({
  head: () => {
    const head = seo({
      path: "/speaking/",
      title: "Hazem Abdelghany · Speaker",
      description:
        "Hazem Abdelghany makes AI simple, on stage, on screen and in the training room. 50+ trainings, 10,000+ people, Asharq Bloomberg and CBC Sofra.",
      alternates,
    });
    return head;
  },
  component: () => <SpeakingPage lang="en" />,
});
