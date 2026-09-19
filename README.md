# hazemabdelghany.com

Hazem's personal site — bilingual (Egyptian Arabic + English) essays and books across five threads: Building · Faith · Body · Mind · Perspective.

Built on Lovable's TanStack Start template so the database side (Lovable Cloud / Supabase) can be added from the [Lovable editor](https://lovable.dev/projects/4a6a097c-e782-4f65-93e0-1c26f93fd64b). Ported 1:1 from the original Astro site (`hazem-abdelghany20.github.io`) on 2026-09-19 — same design, same URLs, same essay HTML.

Design: **Warm Editorial** (Newsreader + Amiri, paper tones) in light mode; dark mode is the **Nocturne** palette.

## Where things live

| What | Where |
| --- | --- |
| Essays (markdown) | `src/content/essays/<id>.md` → `/essays/<id>/` |
| Frontmatter rules | `src/content/schema.ts` (checked at build) |
| Markdown → HTML | `essays-plugin.ts` (build time) |
| Pages | `src/routes/` (file-based, TanStack Router) |
| Books / series | `src/lib/series.ts` → `/<slug>/` |
| Book reading aids (progress line, contents drawer, ←/→, Continue, read ticks) | `src/components/BookReader.tsx` + `ContinueReading.tsx`; per-device state in localStorage `reading:<series>:<lang>` via `src/lib/reading.ts` (a part counts as read at 90%) |
| Threads | `src/lib/threads.ts` → `/threads/<key>/` |
| Side-reading notes | `src/lib/refs.ts` |
| About copy | `src/lib/about.ts` |
| About tally (years · students · ventures beside the timeline) | `road` + `ventures` in `src/lib/about.ts` — a venture that closed gets `until` and blurs out from that year |
| Styles | `src/styles.css` (entry) + `src/styles/*.css` |
| RSS / sitemap | `src/routes/rss[.]xml.ts`, `src/routes/sitemap[.]xml.ts` |
| Database client | `src/integrations/supabase/` (Lovable Cloud) |
| Database changes | `drizzle/migrations/*.sql` — Lovable Cloud applies them only from its chat ("apply the migration in …"), never from a push to `main`; it then regenerates `src/integrations/supabase/types.ts` |
| Reads & reactions | `src/components/ReaderCounts.tsx` + `src/lib/reader-db.ts`. Per essay, both languages together. Reads show from 100; a read = 15s open or half read, once per device per day. Reactions: *This landed · Made me think · Saving this* / *وصلتني · خلّتني أفكّر · هحفظها*, counts show after reacting or from 10 |
| Highlights | `src/components/EssayHighlights.tsx` + `src/lib/text-marks.ts`. Select 10–280 characters in an essay → Highlight (a bottom bar on touch screens). The reader's own stay marked on their device; the line 3+ readers highlighted gets an underline, only if found word for word in the essay. Raw highlights are never readable, only `most_highlighted()` |

## Writing an essay

Create `src/content/essays/<slug>.md`:

```yaml
---
title: "..."
date: 2026-09-01
lang: ar            # ar | en — sets RTL + Amiri vs LTR + Newsreader
thread: mind        # building | faith | body | mind | perspective
minutes: 6          # optional read time
description: "..."  # optional, used for meta description
draft: false        # true hides it everywhere
translationOf: other-slug   # optional — links the AR/EN versions to each other
heroImage: /images/essays/x.webp   # optional
---
```

Body is markdown (raw HTML allowed). `> quote` renders as the accent pull-quote; backticked terms inside Arabic prose render as inline Latin technical terms; `##` for section headings. A future `date` stays hidden until that day.

## Commands

```sh
bun install
bun run dev      # dev server
bun run build    # production build (Cloudflare Workers output in .output/)
```

Local check of what ships: `bun run build:static`, then serve `dist/client/` with any static server.

⚠️ The build breaks if the repo path contains an apostrophe (TanStack's code splitter). The working copy lives at `~/Documents/kaufmann/hazemabdelghany`; `Hazem's code/hazemabdelghany` is a symlink to it.

## Deploy

Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) runs `bun run build:static`, which prerenders every page to HTML in `dist/client/` (plus `404.html` and redirect stubs via `scripts/static-extras.mjs`), and publishes it to GitHub Pages at hazemabdelghany.com. Lovable edits land on `main` too, so they deploy the same way.

No server runs in production — database features call Supabase from the browser (see `AGENTS.md`).
