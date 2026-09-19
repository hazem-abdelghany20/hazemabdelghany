import { createFileRoute, notFound } from "@tanstack/react-router";
import { SeriesPage } from "@/components/pages/SeriesPage";
import { bilingualAlternates, localePath } from "@/lib/i18n";
import { SERIES } from "@/lib/series";
import { seo } from "@/lib/seo";

/** A book's landing page: /ar/bedrock-and-weather/, /ar/riding-out/. */
export const Route = createFileRoute("/ar/$series")({
  staticData: { lang: "ar" },
  loader: ({ params }) => {
    const s = Object.values(SERIES).find((x) => x.slug === params.series);
    if (!s) throw notFound();
    return { key: s.key };
  },
  head: ({ loaderData }) => {
    const s = loaderData && SERIES[loaderData.key];
    if (!s) return {};
    const path = `/${s.slug}/`;
    return seo({
      path: localePath("ar", path),
      title: `${s.ar} — حازم عبدالغني`,
      description: s.blurbAr,
      lang: "ar",
      alternates: bilingualAlternates(path),
    });
  },
  component: Series,
});

function Series() {
  const { key } = Route.useLoaderData();
  return <SeriesPage lang="ar" seriesKey={key} />;
}
