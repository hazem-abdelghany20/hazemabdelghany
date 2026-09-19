import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";

/** A router link to a concrete path, e.g. localePath(lang, "/books/").
 *  Both language trees are real routes; the prefix is computed at runtime,
 *  which is why `to` is a plain string here. */
export function L({ href, ...rest }: Omit<ComponentProps<"a">, "href"> & { href: string }) {
  return <Link {...(rest as Record<string, unknown>)} to={href as "/"} />;
}
