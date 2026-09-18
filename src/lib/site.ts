/** Outbound links. A null value means "not set yet" and the link is not rendered —
 *  a dead link is worse than a missing one. */
export const LINKS: { label: string; href: string | null }[] = [
  { label: "Instagram", href: null }, // TODO: real handle, e.g. https://instagram.com/<handle>
  { label: "TikTok", href: null }, // TODO: real handle
  { label: "Email", href: null }, // TODO: a mailbox that exists
];

export const liveLinks = () =>
  LINKS.filter((l): l is { label: string; href: string } => Boolean(l.href));
