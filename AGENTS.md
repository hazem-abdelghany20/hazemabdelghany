<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Project notes — hazemabdelghany.com

A personal essay site, ported 1:1 from an Astro site. Read `README.md` first.

- **Essays are markdown files**, not database rows: `src/content/essays/<id>.md`, rendered at build time by `essays-plugin.ts`. The database is for things readers do (signups, comments, reactions, views), not for the essays themselves.
- **Every URL ends in `/`** (`trailingSlash: "always"` in `src/router.tsx`). Typed links use the slashed form: `<Link to="/essays/$id/" params={{ id }}>`.
- **Two languages.** A page's language comes from its loader data (`lang`) or `staticData.lang`; `__root.tsx` sets `<html lang dir>` from it. Arabic pages are RTL and use Amiri.
- **Styling:** the site's own CSS is in `src/styles/*.css`, loaded into the `base` layer. Tailwind utilities work and win over it, but **Tailwind's preflight reset is off** (it would strip the essays' list bullets, heading sizes and margins). New Tailwind UI must set button/input background, font and border explicitly. Tailwind/shadcn color names (`bg-background`, `text-primary`, `border-border`…) are mapped to the site palette in `src/styles.css`; dark mode is `data-theme="dark"` on `<html>`.
- Don't restyle existing pages as a side effect of adding a feature — the design is final.

