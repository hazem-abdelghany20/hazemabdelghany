import { createFileRoute } from "@tanstack/react-router";

import meridianBanking from "../assets/meridian-banking.jpg";
import sanaeHealth from "../assets/sanae-health.jpg";
import hazemPortrait from "../assets/hazem-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hazem — Product Designer" },
      { name: "description", content: "Hazem is a product designer building calm, considered digital products from Cairo." },
      { property: "og:title", content: "Hazem — Product Designer" },
      { property: "og:description", content: "Hazem is a product designer building calm, considered digital products from Cairo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-ink text-paper font-sans antialiased selection:bg-accent selection:text-ink">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-line/70 bg-ink/85 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-serif text-xl tracking-tight">
            Hazem<span className="text-accent">.</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted">
            <a href="#work" className="hover:text-paper transition-colors">Work</a>
            <a href="#about" className="hover:text-paper transition-colors">About</a>
            <a href="#contact" className="hover:text-paper transition-colors">Contact</a>
          </nav>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium hover:bg-paper hover:text-ink transition-colors"
          >
            Let's talk
            <span className="size-1.5 rounded-full bg-accent"></span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Product Designer — Cairo</p>
            <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight">
              Hazem builds<br />
              <span className="italic text-muted">calm, considered</span><br />
              interfaces.
            </h1>
          </div>
          <p className="max-w-xs text-sm text-muted leading-relaxed">
            Eight years shaping digital products for fintech, health and culture — from first sketch to shipped system.
          </p>
        </div>

        {/* App screen */}
        <div className="mt-12 rounded-2xl border border-line bg-ink-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="size-3 rounded-full bg-line"></span>
            <span className="size-3 rounded-full bg-line"></span>
            <span className="size-3 rounded-full bg-line"></span>
            <span className="ml-3 text-xs text-muted font-medium">hazem.design — Studio Portfolio</span>
            <span className="ml-auto text-xs text-muted">v2.4</span>
          </div>
          <div className="grid md:grid-cols-[220px_1fr]">
            {/* sidebar */}
            <aside className="border-b md:border-b-0 md:border-r border-line p-5 space-y-1 text-sm">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-3">Menu</p>
              <a href="#top" className="block rounded-lg px-3 py-2 bg-paper text-ink font-medium">Overview</a>
              <a href="#work" className="block rounded-lg px-3 py-2 text-muted hover:text-paper transition-colors">Projects</a>
              <a href="#work" className="block rounded-lg px-3 py-2 text-muted hover:text-paper transition-colors">Case Studies</a>
              <a href="#about" className="block rounded-lg px-3 py-2 text-muted hover:text-paper transition-colors">Process</a>
              <a href="#contact" className="block rounded-lg px-3 py-2 text-muted hover:text-paper transition-colors">Contact</a>
              <div className="pt-4 mt-4 border-t border-line">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-2">Status</p>
                <p className="flex items-center gap-2 text-sm">
                  <span className="size-1.5 rounded-full bg-accent"></span>
                  Available Q3
                </p>
              </div>
            </aside>
            {/* main */}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">Featured</p>
                  <h2 className="font-serif text-2xl mt-1">Selected Works</h2>
                </div>
                <span className="text-xs text-muted">2023 — 2025</span>
              </div>

              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-line p-4 hover:border-accent/60 transition-colors">
                  <img
                    src={meridianBanking}
                    alt="Meridian Banking dashboard"
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover rounded-lg"
                  />
                  <p className="mt-3 font-medium">Meridian Banking</p>
                  <p className="text-xs text-muted">Product design · 2024</p>
                </div>
                <div className="rounded-xl border border-line p-4 hover:border-accent/60 transition-colors">
                  <img
                    src={sanaeHealth}
                    alt="Sanae Health mobile screens"
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover rounded-lg"
                  />
                  <p className="mt-3 font-medium">Sanae Health</p>
                  <p className="text-xs text-muted">Design system · 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-line py-4 overflow-hidden">
        <div className="marquee-track flex whitespace-nowrap gap-10 font-serif text-2xl text-muted/70">
          <span>Product Design</span><span className="text-accent">·</span>
          <span>Design Systems</span><span className="text-accent">·</span>
          <span>Prototyping</span><span className="text-accent">·</span>
          <span>Art Direction</span><span className="text-accent">·</span>
          <span>Product Design</span><span className="text-accent">·</span>
          <span>Design Systems</span><span className="text-accent">·</span>
          <span>Prototyping</span><span className="text-accent">·</span>
          <span>Art Direction</span><span className="text-accent">·</span>
        </div>
      </div>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <img
          src={hazemPortrait}
          alt="Hazem at his desk"
          width={1080}
          height={1280}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover rounded-2xl"
        />
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">About</p>
          <h2 className="font-serif text-4xl leading-tight tracking-tight">Design that respects<br />people's attention.</h2>
          <p className="mt-6 text-muted leading-relaxed">
            I'm Hazem — a product designer who believes good software should feel quiet, honest and a little bit warm. I work across the full arc: research, interface, and the systems that keep it all coherent.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="border-t border-line pt-3">
              <p className="font-serif text-3xl">08</p>
              <p className="text-xs text-muted mt-1">Years</p>
            </div>
            <div className="border-t border-line pt-3">
              <p className="font-serif text-3xl">40+</p>
              <p className="text-xs text-muted mt-1">Projects</p>
            </div>
            <div className="border-t border-line pt-3">
              <p className="font-serif text-3xl">12</p>
              <p className="text-xs text-muted mt-1">Awards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Contact</p>
          <h2 className="font-serif text-5xl md:text-6xl tracking-tight">Have a project<br /><span className="italic text-muted">in mind?</span></h2>
          <a
            href="mailto:hello@hazem.design"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-paper text-ink px-7 py-4 text-base font-medium hover:bg-accent transition-colors"
          >
            hello@hazem.design
            <span aria-hidden="true">→</span>
          </a>
          <div className="mt-14 flex items-center justify-between border-t border-line pt-6 text-xs text-muted flex-wrap gap-4">
            <p>© 2025 Hazem — Portfolio</p>
            <div className="flex gap-6">
              <a href="https://dribbble.com" className="hover:text-paper transition-colors">Dribbble</a>
              <a href="https://linkedin.com" className="hover:text-paper transition-colors">LinkedIn</a>
              <a href="https://are.na" className="hover:text-paper transition-colors">Are.na</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
