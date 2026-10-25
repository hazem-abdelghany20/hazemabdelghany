import { createFileRoute } from "@tanstack/react-router";
import { FreeIndexPage } from "@/components/pages/FreePages";
import { fetchFreeList } from "@/lib/free";
import { seo } from "@/lib/seo";

// The free guides behind the reels' comment keywords. Arabic only, on the AI side.
export const Route = createFileRoute("/free/")({
  staticData: { lang: "ar" },
  loader: () => fetchFreeList(),
  head: () =>
    seo({
      path: "/free/",
      title: "الـguides اللي ببلاش · حازم عبدالغني — Hazem Abdelghany",
      description: "كل guide وعدت بيه في فيديو: الـsettings، والـprompts، والأدوات. جاهزين تنسخهم.",
      lang: "ar",
    }),
  component: Index,
});

function Index() {
  return <FreeIndexPage initial={Route.useLoaderData()} />;
}
