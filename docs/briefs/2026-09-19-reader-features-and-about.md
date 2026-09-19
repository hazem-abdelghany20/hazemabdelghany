# Brief — reader features + About page (2026-09-19)

Hazem picked these from a brainstorm. Build them in this order; ship each one before starting the next.

1. **About page** — scroll-drawn timeline + numbers that count up (no database)
2. **Better book reading** — progress, chapter drawer, "continue where you left off" (no database)
3. **Reads & reactions** on every essay (database)
4. **Most-highlighted lines** (database)

Not now: a real photo on About, the email list, the /now page, "Ask Hazem".

---

## Read first (the site has rules)

- Repo: `~/Documents/kaufmann/hazemabdelghany` (GitHub `hazem-abdelghany20/hazemabdelghany`, branch `main`). **Work in that path**, not `Hazem's code/hazemabdelghany` — that's a symlink, and the apostrophe breaks the build.
- `README.md` and `AGENTS.md` in the repo: stack, where things live, styling rules.
- **Hosting is static.** Every push to `main` runs `bun run build:static` (prerenders every page) and publishes to GitHub Pages at hazemabdelghany.com. There is no server in production: **no `createServerFn`, no server routes, no secrets in the browser.** The browser talks to Supabase directly with the publishable key (`src/integrations/supabase/client.ts`), and **Row Level Security + security-definer SQL functions** are the only protection.
- **Two languages.** English at `/`, Arabic mirrored at `/ar/` with the same slugs. Every visible string exists in both (Egyptian Arabic, same voice as the site). Use the helpers: `usePageLang()`, `localePath()`, `siteEssays()`, `essaySlug()`, `essayPath()` (`src/lib/`). Arabic pages are RTL — use logical CSS (`inset-inline-start`, `margin-inline`), never left/right.
- **Style.** Site CSS lives in `src/styles/*.css` inside the `base` layer; add new files there and import them in `src/styles.css`. Tailwind utilities exist but preflight is off. Keep the Warm Editorial look (Newsreader/Amiri, paper tones, dark = Nocturne). Tokens: `--bg --ink --ink-2 --muted --faint --line --accent --fig-surface`. Light + dark both.
- **Don't change the essay HTML** (rendered at build by `essays-plugin.ts`) or restyle existing pages beyond what a feature needs.
- **Another Claude session edits essays on `main` in this same folder.** `git pull --ff-only` before you start and before you push; commit only your own files; never leave the folder on a side branch.
- **Verify before pushing:** `bun run build:static` must pass, then serve `dist/client/` (any static server; `404.html` for misses) and check `/`, `/ar/`, an essay, a book page — desktop + 390px mobile, light + dark, no console errors, the language switch still lands on the same page.

---

## 1. About page (`/about/` + `/ar/about/`)

File: `src/components/AboutPage.tsx` (copy in `src/lib/about.ts`, styles in `src/styles/pages.css` under "About").

- **Timeline draws itself as you scroll.** The "Road so far" section (2022 → 2026) gets a thin vertical line that grows as the reader scrolls through it. Each year's entry fades and rises in (opacity + 12–16px translate) as it enters the view; the year number and the org logo arrive with it. On Arabic the line sits on the right.
- **Numbers that count up** — a new strip (between the opening statement and the story, or right before the timeline), 3–4 numbers that count from 0 when scrolled into view, with a short label under each in both languages. Candidates: years building (since 2022), students taught (Catalyst — **ask Hazem for the real number; don't invent one**), essays & chapters published (count it from `siteEssays(lang)` at build time), ventures. Confirm the list with Hazem before building.
- **Motion rules:** calm, not flashy — 600–900ms, ease-out, no bounce, transform/opacity only. Prefer CSS scroll-driven animations (`animation-timeline: view()`), with an IntersectionObserver fallback for browsers without them. **`prefers-reduced-motion: reduce` → show the final state, no motion.** The page must read fully with JS off (prerendered HTML = final state; the animation is an enhancement).
- Optional, same restraint: the five-threads rows get a subtle hover (already have an arrow nudge).

## 2. Better book reading (book parts = essays with `series`)

No database — per device, in `localStorage` (wrap every access in try/catch).

- **Progress bar** — thin line at the very top of a book part, fills with scroll through the article. Accent colour; RTL-aware.
- **Chapter drawer** — a "Contents" button on book part pages opens a side panel (RTL: from the correct side) listing the book's sections and parts in the current language (reuse `BookPartsList` data / `SERIES` sections), current part highlighted, parts already read ticked.
- **Continue where you left off** — remember, per book per language, the last part opened and how far down it was read. On the book landing page (`/<series>/`, `/ar/<series>/`), show "Continue: {part label} — {title} · {n}%" above the parts list; on the part page, restore the scroll position when arriving from that button.
- **Read marks** — a part counts as read at ~90% scroll; ticked in the drawer and on the landing page list.
- **Keyboard** — ←/→ go to the previous/next part (mirrored on Arabic pages). Don't hijack keys while typing or selecting.
- Show "{n} min left" in the part header if cheap to compute from `minutes` × remaining scroll.

## 3. Reads & reactions (database)

**Database first — confirm how schema changes reach Lovable Cloud.** The database is Lovable Cloud's Supabase (project `leachfnovaeqqvapekvo`, empty today); we don't hold its admin key. Write the SQL as a migration in `supabase/migrations/`, then check whether pushing it to `main` applies it. If not, Hazem pastes it into the Lovable chat ("apply this migration") — tell him exactly what to paste. Regenerate `src/integrations/supabase/types.ts` afterwards (or ask Lovable to).

- **Counts are per essay, both languages combined** (key = `essaySlug()`), so the English and Arabic editions share one number.
- Tables: counters only, no personal data. Suggested: `essay_stats(slug text primary key, reads int, …)` and `essay_reactions(slug, kind, count)`. Public `select`; **no direct insert/update** — writes only through `security definer` functions (`record_read(slug)`, `react(slug, kind)`) that validate the slug format and the reaction kind.
- **Read** = the essay page was open ≥ 15 seconds or scrolled past 50%; once per essay per device per day (`localStorage`).
- **Show reads** in the essay meta line ("2,340 reads" / "2,340 قراءة"), **only above a floor** (e.g. 100) so a new essay never shows "3 reads". Load after hydration; reserve the space so nothing jumps.
- **Reactions** — a quiet row at the end of each essay, before Read Next: 3 reactions, one tap each, once per device per essay (toggle off allowed), counts shown after the reader reacts (or above a floor). **Ask Hazem for the 3 words** — suggest e.g. "This landed / Made me think / Saving this" with Arabic equivalents in his voice. Words, not emoji — matches the site.
- Abuse: accept that anonymous counters can be inflated; floors + once-per-device keep it honest enough. Don't add accounts.

## 4. Most-highlighted lines (database)

- Readers select text inside the essay body (`article.prose`) → a small "Highlight" button appears by the selection (desktop) / a bar at the bottom of the screen (mobile, so it doesn't fight the native selection menu). 10–280 characters, one sentence-ish; trim whitespace.
- Store the exact selected text: `highlights(slug, lang, text, created_at)` via a `security definer` function that checks lengths and slug; public read of an **aggregate only** (e.g. a view: text + count per slug/lang, count ≥ 3). No personal data.
- **Show the top line:** the most-highlighted passage in each essay gets a subtle persistent mark (accent underline) with a small "Most highlighted by readers" / "أكتر جملة الناس علّمت عليها" label on hover/tap. Only mark it if the exact text is found in the article DOM — that also makes spam invisible (text that isn't in the essay never shows).
- The reader's own highlights stay marked for them (`localStorage`).
- Must not break the side-reading panels (`button.ref` in essays, `RefPanels.tsx`) or text selection for copying.
- Later (not now): turn a highlight into a shareable quote card.

---

**Done = ** each feature live on hazemabdelghany.com in both languages, verified as above, with a one-line note in the repo `README.md` for anything a future session must know (e.g. where the migrations live, reaction words).
