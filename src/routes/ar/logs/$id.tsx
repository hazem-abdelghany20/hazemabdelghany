import { createFileRoute } from "@tanstack/react-router";
import { LogPage } from "@/components/pages/LogPage";
import { logHead, loadLog } from "@/lib/log-route";

export const Route = createFileRoute("/ar/logs/$id")({
  staticData: { lang: "ar" },
  loader: ({ params }) => loadLog("ar", params.id),
  head: ({ loaderData }) => logHead("ar", loaderData?.id),
  component: LogEntryRoute,
});

function LogEntryRoute() {
  const { id, html } = Route.useLoaderData();
  return <LogPage lang="ar" id={id} html={html} />;
}
