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
import { SITE } from "@/lib/seo";
import { usePageLang } from "@/lib/use-page-lang";

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

// stamp the theme before first paint: saved choice wins, else system
const THEME_INIT = `(function () {
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  var theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;
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
  return (
    // data-theme is stamped by THEME_INIT before React hydrates
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* two theme-colors share a name, which head() would dedupe to one */}
        <meta name="theme-color" content="#f7f1e7" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0b1020" media="(prefers-color-scheme: dark)" />
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

  return (
    <QueryClientProvider client={queryClient}>
      <a className="skip-link" href="#main">
        {lang === "ar" ? "روح للمحتوى" : "Skip to content"}
      </a>
      <div className="wrap">
        <Nav lang={lang} />
        <main id="main">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer lang={lang} />
      </div>
    </QueryClientProvider>
  );
}
