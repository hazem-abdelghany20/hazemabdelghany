import { createFileRoute } from "@tanstack/react-router";
import { FreeKitPage } from "@/components/pages/FreePages";
import { fetchFreeKit } from "@/lib/free";
import { seo } from "@/lib/seo";

// One guide, read from Reach (see src/lib/free.ts).
export const Route = createFileRoute("/free/$slug")({
  staticData: { lang: "ar" },
  loader: async ({ params }) => ({ slug: params.slug, kit: await fetchFreeKit(params.slug) }),
  head: ({ loaderData }) =>
    seo({
      path: `/free/${loaderData?.slug ?? ""}/`,
      title: `${loaderData?.kit?.title ?? "Guide"} · حازم عبدالغني — Hazem Abdelghany`,
      description: loaderData?.kit?.intro?.slice(0, 160) || "Guide ببلاش من حازم عبدالغني.",
      lang: "ar",
    }),
  component: Guide,
});

function Guide() {
  const { slug, kit } = Route.useLoaderData();
  return <FreeKitPage key={slug} slug={slug} initial={kit} />;
}
