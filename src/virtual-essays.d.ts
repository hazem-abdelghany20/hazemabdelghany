declare module "virtual:essays" {
  import type { EssayFrontmatter } from "@/content/schema";
  /** Every essay's frontmatter, dates as ISO strings. Built by essays-plugin.ts. */
  const essays: {
    id: string;
    hasBody: boolean;
    data: Omit<EssayFrontmatter, "date"> & { date: string };
  }[];
  export default essays;
}

declare module "virtual:ai" {
  import type { AiFrontmatter } from "@/content/schema";
  /** Every AI-side piece's frontmatter, dates as ISO strings. Built by essays-plugin.ts. */
  const ai: {
    id: string;
    hasBody: boolean;
    data: Omit<AiFrontmatter, "date"> & { date: string };
  }[];
  export default ai;
}

declare module "virtual:logs" {
  import type { LogFrontmatter } from "@/content/schema";
  /** Every log entry's frontmatter, dates as ISO strings. `hasBody` is true when
   *  the file has notes under the frontmatter, i.e. a page of its own. */
  const logs: {
    id: string;
    hasBody: boolean;
    data: Omit<LogFrontmatter, "date"> & { date: string };
  }[];
  export default logs;
}
