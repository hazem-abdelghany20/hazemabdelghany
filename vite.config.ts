// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { essaysPlugin } from "./essays-plugin";

// `bun run build:static` — the GitHub Pages build (.github/workflows/deploy.yml).
// Every page is prerendered to plain HTML in dist/client; no server runs.
// Lovable's own builds don't set this and keep their normal server output.
const STATIC = process.env["STATIC_EXPORT"] === "1";

export default defineConfig({
  // Renders src/content/essays/*.md at build time — see essays-plugin.ts.
  plugins: [essaysPlugin()],
  ...(STATIC ? { nitro: false as const } : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(STATIC
      ? {
          // Start at the home page and follow every internal link; the feed and
          // sitemap aren't linked as pages, so name them.
          pages: [{ path: "/" }, { path: "/rss.xml" }, { path: "/sitemap.xml" }],
          prerender: { enabled: true, crawlLinks: true, failOnError: true },
        }
      : {}),
  },
});
