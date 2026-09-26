import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { NotFound } from "@/components/NotFound";
import { AiNav } from "@/components/ai/AiNav";
import { AiFooter } from "@/components/ai/AiFooter";
import { SITE } from "@/lib/seo";
import { useSide } from "@/lib/side";
import { usePageLang } from "@/lib/use-page-lang";
import { useSideGestures } from "@/lib/use-side-gestures";

declare module "@tanstack/react-router" {
  interface StaticDataRouteOption {
    /** Page language when it isn't known from loader data (e.g. /ar/about/). */
    lang?: "en" | "ar";
  }
}

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hazem Abdelghany",
  alternateName: "حازم عبدالغني",
  url: `${SITE}/`,
  jobTitle: "Founder",
  address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
};

// Runs before first paint.
// 1. Theme: saved choice wins, else system.
// 2. Language: the bare home page (/) opens in Arabic for a visitor who picked
//    Arabic before, or who has never picked and whose device is in Arabic.
//    Deep links are never redirected — a shared link opens as shared.
const THEME_INIT = `(function () {
  var saved = null, lang = null;
  try { saved = localStorage.getItem('theme'); lang = localStorage.getItem('lang'); } catch (e) {}
  if (location.pathname === '/') {
    var device = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    if (lang ? lang === 'ar' : device.slice(0, 2).toLowerCase() === 'ar') { location.replace('/ar/'); return; }
  }
  var theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;
  // "." flips between the human and AI sides unless it was switched off.
  try { if (localStorage.getItem('side-key') === 'off') document.documentElement.dataset.sideKey = 'off'; } catch (e) {}
})();`;

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <section className="nf">
      <span className="kicker">Error</span>
      <h1 className="nf-title">This page didn't load.</h1>
      <p className="nf-body">Something went wrong on our end. Try again, or head back home.</p>
      <div className="nf-links">
        <button
          type="button"
          className="lang-btn"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          Try again
        </button>
      </div>
      <a href="/" className="meta">
        ← Back home
      </a>
    </section>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { "script:ld+json": person },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "Hazem Abdelghany — Essays",
        href: "/rss.xml",
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap",
      },
      // The AI side's type. The human side uses Martian Mono too: the "AI"
      // half of its side switch previews the other side.
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Martian+Mono:wdth,wght@75..112.5,300..700&display=swap",
      },
    ],
    scripts: [{ children: THEME_INIT }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const lang = usePageLang();
  const side = useSide();
  const ai = side === "ai";
  return (
    // data-theme is stamped by THEME_INIT before React hydrates; data-side
    // comes from the path (/ai/…), so the prerendered HTML already has it.
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} data-side={side} suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* two theme-colors share a name, which head() would dedupe to one */}
        <meta
          name="theme-color"
          content={ai ? "#f1efe8" : "#f7f1e7"}
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content={ai ? "#0a0d16" : "#0b1020"}
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const lang = usePageLang();
  const side = useSide();
  useSideGestures(side, lang);
  const skip = lang === "ar" ? "روح للمحتوى" : "Skip to content";

  return (
    <QueryClientProvider client={queryClient}>
      {side === "ai" ? (
        // The AI side: everything under /ai/ and /ar/ai/ (styles/ai.css).
        <div className="side side-ai">
          <a className="t-skip" href="#main">
            {skip}
          </a>
          <div className="t-wrap">
            <AiNav lang={lang} />
            <main id="main" className="t-main">
              <Outlet />
            </main>
            <AiFooter lang={lang} />
          </div>
        </div>
      ) : (
        <div className="side side-human">
          <a className="skip-link" href="#main">
            {skip}
          </a>
          <div className="wrap">
            <Nav lang={lang} />
            <main id="main">
              {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
              <Outlet />
            </main>
            <Footer lang={lang} />
          </div>
        </div>
      )}
      {/* The swipe's leading edge; only shown during a side switch. */}
      <div className="t-seam" aria-hidden="true">
        <i className="t-seam-wash" />
        <pre className="t-seam-glyphs" />
        <i className="t-seam-edge" />
      </div>
    </QueryClientProvider>
  );
}
