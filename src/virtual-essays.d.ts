declare module "virtual:essays" {
  import type { EssayFrontmatter } from "@/content/schema";
  /** Every essay's frontmatter, dates as ISO strings. Built by essays-plugin.ts. */
  const essays: { id: string; data: Omit<EssayFrontmatter, "date"> & { date: string } }[];
  export default essays;
}
