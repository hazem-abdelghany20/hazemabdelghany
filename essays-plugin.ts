/* Markdown collections. Two of them live in src/content/:

   - `essays/` — the essays and book parts.
   - `logs/`   — one entry per thing read or watched (body optional).

   Each collection turns into two things the app imports:

   - a virtual module (`virtual:essays`, `virtual:logs`) — every file's
     frontmatter, no bodies, for the lists.
   - each `.md` file — its body rendered to HTML, loaded per page.

   Rendering uses @astrojs/markdown-remark, the exact processor the site was
   built with before (GFM, smart quotes, heading ids, raw HTML passthrough),
   so the essays render identically. It runs at build time only; no markdown
   code ships to the browser or the server. */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { createMarkdownProcessor, parseFrontmatter } from "@astrojs/markdown-remark";
import type { Plugin, ViteDevServer } from "vite";
import type { ZodTypeAny } from "zod";
import { aiSchema, essaySchema, logSchema } from "./src/content/schema";

type CollectionOptions = {
  /** Folder under src/content/ and the name after "virtual:". */
  name: string;
  schema: ZodTypeAny;
  /** Last-minute fixes to the rendered HTML (old links, mostly). */
  fixHtml?: (html: string) => string;
  /** Strips fields out of the virtual index before it is written. The index
   *  ships to every visitor in the JS bundle, so anything unpublished has to
   *  come out here rather than be filtered at runtime. */
  redact?: (data: Record<string, unknown>) => Record<string, unknown>;
  /** Options for the markdown processor, when a collection needs its own. */
  markdown?: Parameters<typeof createMarkdownProcessor>[0];
};

function collectionPlugin({ name, schema, fixHtml, redact, markdown }: CollectionOptions): Plugin {
  const VIRTUAL_ID = `virtual:${name}`;
  const RESOLVED_ID = "\0" + VIRTUAL_ID;
  let dir = "";
  let processor: Awaited<ReturnType<typeof createMarkdownProcessor>> | undefined;
  const isMember = (file: string) => file.startsWith(dir + path.sep) && file.endsWith(".md");

  async function parse(file: string) {
    const raw = await readFile(file, "utf8");
    const { frontmatter, content } = parseFrontmatter(raw);
    const result = schema.safeParse(frontmatter);
    if (!result.success) {
      throw new Error(
        `Bad frontmatter in ${path.relative(process.cwd(), file)}:\n${result.error.message}`,
      );
    }
    return { data: result.data as { date: Date }, body: content.trim() };
  }

  function invalidateIndex(server: ViteDevServer) {
    for (const env of Object.values(server.environments)) {
      const mod = env.moduleGraph.getModuleById(RESOLVED_ID);
      if (mod) env.moduleGraph.invalidateModule(mod);
    }
    server.ws.send({ type: "full-reload" });
  }

  return {
    name: `hazem:${name}`,
    enforce: "pre",
    configResolved(config) {
      dir = path.join(config.root, "src", "content", name);
    },
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined;
    },
    async load(id) {
      if (id === RESOLVED_ID) {
        const files = (await readdir(dir)).filter((f) => f.endsWith(".md")).sort();
        const entries = await Promise.all(
          files.map(async (f) => {
            const { data, body } = await parse(path.join(dir, f));
            const shown = (redact ? redact({ ...data }) : data) as typeof data;
            return {
              id: f.slice(0, -3),
              // `hasBody` lets a list know a file has a page of its own without
              // pulling the body in to find out. A log entry may be a single
              // line of frontmatter and nothing else.
              hasBody: body.length > 0,
              data: { ...shown, date: data.date.toISOString() },
            };
          }),
        );
        return `export default ${JSON.stringify(entries)};`;
      }
      const file = id.split("?")[0]!;
      if (isMember(file)) {
        this.addWatchFile(file);
        const { data, body } = await parse(file);
        processor ??= await createMarkdownProcessor(markdown);
        const { code } = await processor.render(body, { frontmatter: data });
        return `export default ${JSON.stringify(fixHtml ? fixHtml(code) : code)};`;
      }
      return undefined;
    },
    configureServer(server) {
      server.watcher.add(dir);
      server.watcher.on("all", (_event, file) => {
        if (isMember(file)) invalidateIndex(server);
      });
    },
  };
}

export const essaysPlugin = () =>
  collectionPlugin({
    name: "essays",
    schema: essaySchema,
    // Arabic essays moved from /essays/<slug>-ar/ to /ar/essays/<slug>/;
    // point in-essay links at the new address instead of the redirect.
    fixHtml: (html) => html.replace(/href="\/essays\/([a-z0-9-]+)-ar\/"/g, 'href="/ar/essays/$1/"'),
  });

export const logsPlugin = () =>
  collectionPlugin({
    name: "logs",
    schema: logSchema,
    // A draft entry's note is not published, and the index goes out to every
    // visitor — so it never leaves the build.
    redact: (data) => (data["draft"] ? { ...data, note: undefined } : data),
  });

/** The AI side's writing: src/content/ai/<id>.md → /ai/writing/<slug>/. */
export const aiPlugin = () =>
  collectionPlugin({
    name: "ai",
    schema: aiSchema,
    // Code blocks here are prompts to copy, styled by the AI side itself.
    // Shiki's inline colours would fight both of its themes.
    markdown: { syntaxHighlight: false },
  });
