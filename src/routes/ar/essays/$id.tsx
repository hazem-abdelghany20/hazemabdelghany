import { createFileRoute } from "@tanstack/react-router";
import { EssayPage } from "@/components/pages/EssayPage";
import { essayHead, loadEssay } from "@/lib/essay-route";

export const Route = createFileRoute("/ar/essays/$id")({
  staticData: { lang: "ar" },
  loader: ({ params }) => loadEssay("ar", params.id),
  head: ({ loaderData }) => essayHead("ar", loaderData?.id),
  component: Essay,
});

function Essay() {
  const { id, html } = Route.useLoaderData();
  return <EssayPage lang="ar" id={id} html={html} />;
}
