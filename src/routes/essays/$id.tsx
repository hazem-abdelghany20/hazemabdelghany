import { createFileRoute } from "@tanstack/react-router";
import { EssayPage, essayHead, loadEssay } from "@/components/pages/EssayPage";

export const Route = createFileRoute("/essays/$id")({
  loader: ({ params }) => loadEssay("en", params.id),
  head: ({ loaderData }) => essayHead("en", loaderData?.id),
  component: Essay,
});

function Essay() {
  const { id, html } = Route.useLoaderData();
  return <EssayPage lang="en" id={id} html={html} />;
}
