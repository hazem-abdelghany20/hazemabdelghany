/* After `STATIC_EXPORT=1 vite build`, add what a static host needs that the
   prerender crawl doesn't produce:
   - 404.html — GitHub Pages serves it for any missing path.
   - redirect stubs for moved essays (a static host can't send a 301),
     in the same shape the Astro site used. */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = "dist/client";
const SITE = "https://hazemabdelghany.com";

// The 404 page is served at whatever URL was missing, so it can't hydrate
// (React would find a different route there). Ship it as plain HTML: drop the
// app bundle and wire the theme toggle with a few lines of vanilla JS instead.
const THEME_TOGGLE = `<script>
  var themeToggle = document.getElementById('theme-toggle');
  function syncThemeToggle() {
    var isDark = document.documentElement.dataset.theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  syncThemeToggle();
  themeToggle.addEventListener('click', function () {
    var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    syncThemeToggle();
  });
</script>`;

const { default: server } = await import(path.resolve("dist/server/server.js"));
const res = await server.fetch(new Request("http://localhost/this-page-does-not-exist/"), {}, {});
if (res.status !== 404) throw new Error(`expected the 404 page, got ${res.status}`);
const notFound = (await res.text())
  .replace(/<link rel="modulepreload"[^>]*>/g, "")
  .replace(/<script type="module"[^>]*><\/script>/g, "")
  .replace(/<script class="\$tsr"[^>]*>[\s\S]*?<\/script>/g, "")
  .replace("</body>", `${THEME_TOGGLE}</body>`);
if (/type="module"|\$tsr/.test(notFound)) throw new Error("404.html still carries the app bundle");
await writeFile(path.join(OUT, "404.html"), notFound);

const redirects = JSON.parse(await readFile("src/content/redirects.json", "utf8"));
for (const [from, to] of Object.entries(redirects)) {
  const html =
    `<!doctype html><title>Redirecting to: ${to}</title>` +
    `<meta http-equiv="refresh" content="0;url=${to}">` +
    `<meta name="robots" content="noindex">` +
    `<link rel="canonical" href="${SITE}${to}">` +
    `<body><a href="${to}">Redirecting from <code>${from}</code> to <code>${to}</code></a></body>`;
  await mkdir(path.join(OUT, from), { recursive: true });
  await writeFile(path.join(OUT, from, "index.html"), html);
}

console.log(`static extras: 404.html + ${Object.keys(redirects).length} redirects`);
