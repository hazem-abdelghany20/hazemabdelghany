import { createFileRoute } from "@tanstack/react-router";
import { LogPage } from "@/components/pages/LogPage";
import { logHead, loadLog } from "@/lib/log-route";

export const Route = createFileRoute("/logs/$id")({
  loader: ({ params }) => loadLog("en", params.id),
  head: ({ loaderData }) => logHead("en", loaderData?.id),
  component: LogEntryRoute,
});

function LogEntryRoute() {
  const { id, html } = Route.useLoaderData();
  return <LogPage lang="en" id={id} html={html} />;
}
