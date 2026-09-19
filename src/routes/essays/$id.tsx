import { createFileRoute } from "@tanstack/react-router";
import { EssayPage } from "@/components/pages/EssayPage";
import { essayHead, loadEssay } from "@/lib/essay-route";

export const Route = createFileRoute("/essays/$id")({
  loader: ({ params }) => loadEssay("en", params.id),
  head: ({ loaderData }) => essayHead("en", loaderData?.id),
  component: Essay,
});

function Essay() {
  const { id, html } = Route.useLoaderData();
  return <EssayPage lang="en" id={id} html={html} />;
}
