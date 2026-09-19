/* Essays are markdown files in src/content/essays/<id>.md. This plugin turns
   them into two things the app imports:

   - `virtual:essays` — every essay's frontmatter (no bodies), for the lists.
   - each `.md` file — its body rendered to HTML, loaded per essay page.

   Rendering uses @astrojs/markdown-remark, the exact processor the site was
   built with before (GFM, smart quotes, heading ids, raw HTML passthrough),
   so the essays render identically. It runs at build time only; no markdown
   code ships to the browser or the server. */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { createMarkdownProcessor, parseFrontmatter } from "@astrojs/markdown-remark";
import type { Plugin, ViteDevServer } from "vite";
import { essaySchema } from "./src/content/schema";

const VIRTUAL_ID = "virtual:essays";
const RESOLVED_ID = "\0" + VIRTUAL_ID;

export function essaysPlugin(): Plugin {
  let dir = "";
  let processor: Awaited<ReturnType<typeof createMarkdownProcessor>> | undefined;
  const isEssay = (file: string) => file.startsWith(dir + path.sep) && file.endsWith(".md");

  async function parse(file: string) {
    const raw = await readFile(file, "utf8");
    const { frontmatter, content } = parseFrontmatter(raw);
    const result = essaySchema.safeParse(frontmatter);
    if (!result.success) {
      throw new Error(
        `Bad frontmatter in ${path.relative(process.cwd(), file)}:\n${result.error.message}`,
      );
    }
    return { data: result.data, body: content.trim() };
  }

  function invalidateIndex(server: ViteDevServer) {
    for (const env of Object.values(server.environments)) {
      const mod = env.moduleGraph.getModuleById(RESOLVED_ID);
      if (mod) env.moduleGraph.invalidateModule(mod);
    }
    server.ws.send({ type: "full-reload" });
  }

  return {
    name: "hazem:essays",
    enforce: "pre",
    configResolved(config) {
      dir = path.join(config.root, "src", "content", "essays");
    },
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined;
    },
    async load(id) {
      if (id === RESOLVED_ID) {
        const files = (await readdir(dir)).filter((f) => f.endsWith(".md")).sort();
        const essays = await Promise.all(
          files.map(async (f) => {
            const { data } = await parse(path.join(dir, f));
            return { id: f.slice(0, -3), data: { ...data, date: data.date.toISOString() } };
          }),
        );
        return `export default ${JSON.stringify(essays)};`;
      }
      const file = id.split("?")[0]!;
      if (isEssay(file)) {
        this.addWatchFile(file);
        const { data, body } = await parse(file);
        processor ??= await createMarkdownProcessor();
        const { code } = await processor.render(body, { frontmatter: data });
        // Arabic essays moved from /essays/<slug>-ar/ to /ar/essays/<slug>/;
        // point in-essay links at the new address instead of the redirect.
        const html = code.replace(/href="\/essays\/([a-z0-9-]+)-ar\/"/g, 'href="/ar/essays/$1/"');
        return `export default ${JSON.stringify(html)};`;
      }
      return undefined;
    },
    configureServer(server) {
      server.watcher.add(dir);
      server.watcher.on("all", (_event, file) => {
        if (isEssay(file)) invalidateIndex(server);
      });
    },
  };
}
