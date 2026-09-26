import { createFileRoute } from "@tanstack/react-router";
import { AiArticlePage } from "@/components/pages/AiArticlePage";
import { aiHead, loadAi } from "@/lib/ai-route";

export const Route = createFileRoute("/ar/ai/writing/$id")({
  staticData: { lang: "ar" },
  loader: ({ params }) => loadAi("ar", params.id),
  head: ({ loaderData }) => aiHead("ar", loaderData?.id),
  component: Piece,
});

function Piece() {
  const { id, html } = Route.useLoaderData();
  return <AiArticlePage lang="ar" id={id} html={html} />;
}
