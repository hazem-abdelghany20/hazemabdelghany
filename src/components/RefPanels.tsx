/* Side reading. Any `<button class="ref" data-ref="key">` in the prose gets a
   hover gloss and opens a panel with the full note. The registry lives in
   src/lib/refs.ts. The panel is driven imperatively, as it was before the
   port: the markers live inside essay HTML that React doesn't own. */
import { useEffect } from "react";
import { REFS } from "@/lib/refs";

const KIND: Record<string, string> = {
  person: "Side reading · the person",
  book: "Side reading · the book",
  term: "Side reading · the term",
};

/** `contentKey` changes whenever the article it annotates does (client
 *  navigation swaps the essay under a mounted panel), so markers get re-decorated. */
export function RefPanels({ contentKey }: { contentKey: string }) {
  useEffect(() => {
    const panel = document.getElementById("refpanel");
    if (!panel) return;
    const card = panel.querySelector<HTMLElement>(".refpanel-card")!;
    const byId = (id: string) => document.getElementById(id)!;
    const el = {
      kind: byId("refpanel-kind"),
      figure: byId("refpanel-figure"),
      img: byId("refpanel-img") as HTMLImageElement,
      credit: byId("refpanel-credit"),
      plate: byId("refpanel-plate"),
      plateTitle: byId("refpanel-plate-title"),
      plateMeta: byId("refpanel-plate-meta"),
      title: byId("refpanel-title"),
      meta: byId("refpanel-meta"),
      body: byId("refpanel-body"),
      start: byId("refpanel-start"),
    };
    let lastFocus: HTMLElement | null = null;
    const timers: number[] = [];

    function open(key: string, trigger: HTMLElement) {
      const r = REFS[key];
      if (!r || !panel) return;
      lastFocus = trigger;
      el.kind.textContent = KIND[r.kind] ?? "Side reading";
      el.title.textContent = r.title;
      el.meta.textContent = r.meta;
      el.body.innerHTML = r.body.map((p) => "<p>" + p + "</p>").join("");

      if (r.image && r.image.src) {
        el.img.src = r.image.src;
        el.img.alt = r.image.alt || r.title;
        el.credit.innerHTML = r.image.credit || "";
        el.credit.hidden = !r.image.credit;
        el.figure.hidden = false;
        el.plate.hidden = true;
      } else if (r.kind === "book") {
        el.plateTitle.textContent = r.title;
        el.plateMeta.textContent = r.meta;
        el.plate.hidden = false;
        el.figure.hidden = true;
      } else {
        el.figure.hidden = true;
        el.plate.hidden = true;
      }

      if (r.start) {
        el.start.innerHTML = '<span class="lbl">Where to start</span>' + r.start;
        el.start.hidden = false;
      } else {
        el.start.hidden = true;
      }

      panel.hidden = false;
      document.documentElement.style.overflow = "hidden";
      timers.push(
        window.setTimeout(() => {
          panel.classList.add("is-open");
          card.querySelector<HTMLElement>(".refpanel-scroll")!.scrollTop = 0;
          panel.querySelector<HTMLElement>(".refpanel-close")!.focus();
        }, 10),
      );
    }

    function close() {
      if (!panel) return;
      panel.classList.remove("is-open");
      document.documentElement.style.overflow = "";
      timers.push(window.setTimeout(() => (panel.hidden = true), 200));
      if (lastFocus) lastFocus.focus();
    }

    // Gloss text comes from the registry, not the markup.
    document.querySelectorAll<HTMLButtonElement>("button.ref[data-ref]").forEach((b) => {
      if (b.dataset["tipReady"]) return;
      const r = REFS[b.getAttribute("data-ref")!];
      if (!r) {
        b.classList.add("ref-missing");
        return;
      }
      b.dataset["tipReady"] = "1";
      b.setAttribute("data-tip", r.tagline);
      b.setAttribute("type", "button");
      b.setAttribute("aria-label", (b.textContent ?? "").trim() + " — side reading: " + r.title);
      // A marker near the top of the viewport gets its gloss underneath it.
      if (b.getBoundingClientRect().top < 200) b.classList.add("ref-tip-below");
    });

    // Delegated, so it survives anything that re-renders the article.
    function onClick(e: MouseEvent) {
      const t = e.target as Element | null;
      if (!t?.closest) return;
      if (t.closest("[data-refclose]")) {
        close();
        return;
      }
      const b = t.closest<HTMLElement>("button.ref[data-ref]");
      if (b) {
        e.preventDefault();
        open(b.getAttribute("data-ref")!, b);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && panel && !panel.hidden) close();
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      timers.forEach((t) => window.clearTimeout(t));
      // leaving the page with the panel open must not leave the page unscrollable
      document.documentElement.style.overflow = "";
      panel.classList.remove("is-open");
      panel.hidden = true;
    };
  }, [contentKey]);

  return (
    <div className="refpanel" id="refpanel" hidden>
      <div className="refpanel-backdrop" data-refclose></div>
      <aside
        className="refpanel-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="refpanel-title"
        dir="ltr"
        lang="en"
      >
        <button className="refpanel-close" data-refclose aria-label="Close side reading">
          ✕
        </button>
        <div className="refpanel-scroll">
          <span className="refpanel-kind" id="refpanel-kind"></span>
          <figure className="refpanel-figure" id="refpanel-figure" hidden>
            <img id="refpanel-img" src={undefined} alt="" />
            <figcaption id="refpanel-credit"></figcaption>
          </figure>
          <div className="refpanel-plate" id="refpanel-plate" hidden>
            <span className="refpanel-plate-title" id="refpanel-plate-title"></span>
            <span className="refpanel-plate-rule"></span>
            <span className="refpanel-plate-meta" id="refpanel-plate-meta"></span>
          </div>
          <h2 className="refpanel-title" id="refpanel-title"></h2>
          <p className="refpanel-meta" id="refpanel-meta"></p>
          <div className="refpanel-body" id="refpanel-body"></div>
          <p className="refpanel-start" id="refpanel-start" hidden></p>
        </div>
      </aside>
    </div>
  );
}
