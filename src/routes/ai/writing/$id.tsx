import { createFileRoute } from "@tanstack/react-router";
import { AiArticlePage } from "@/components/pages/AiArticlePage";
import { aiHead, loadAi } from "@/lib/ai-route";

export const Route = createFileRoute("/ai/writing/$id")({
  loader: ({ params }) => loadAi("en", params.id),
  head: ({ loaderData }) => aiHead("en", loaderData?.id),
  component: Piece,
});

function Piece() {
  const { id, html } = Route.useLoaderData();
  return <AiArticlePage lang="en" id={id} html={html} />;
}
