import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Every URL ends in "/" (/about/, /essays/x/), as on the original site —
    // canonicals, the sitemap and inbound links all use that form.
    trailingSlash: "always",
    defaultPreloadStaleTime: 0,
  });

  return router;
};
