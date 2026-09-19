import { createFileRoute, notFound } from "@tanstack/react-router";
import { ThreadPage } from "@/components/pages/ThreadPage";
import { bilingualAlternates, localePath } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { THREADS } from "@/lib/threads";

export const Route = createFileRoute("/ar/threads/$thread")({
  staticData: { lang: "ar" },
  loader: ({ params }) => {
    const t = THREADS.find((x) => x.key === params.thread);
    if (!t) throw notFound();
    return { key: t.key };
  },
  head: ({ loaderData }) => {
    const t = loaderData && THREADS.find((x) => x.key === loaderData.key);
    if (!t) return {};
    const path = `/threads/${t.key}/`;
    return seo({
      path: localePath("ar", path),
      title: `${t.ar} · ${t.en} — حازم عبدالغني`,
      description: `${t.blurbAr} مقالات حازم عبدالغني عن ${t.ar}.`,
      lang: "ar",
      alternates: bilingualAlternates(path),
    });
  },
  component: Thread,
});

function Thread() {
  const { key } = Route.useLoaderData();
  return <ThreadPage lang="ar" threadKey={key} />;
}
