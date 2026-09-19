import { useEffect, useRef, useState, type CSSProperties } from "react";
import { road, ventures, type AboutCopy } from "@/lib/about";

/* "The road so far" on the About page: a line that draws itself down the
   timeline as you scroll, and a running tally beside it (years, students,
   ventures) that moves to each year as the line reaches it.

   The prerendered HTML is the finished state — whole line, final numbers —
   so the page reads fully without JS. Motion is switched on after hydration
   (never under prefers-reduced-motion) by setting data-motion="on". */

const LAST = road.length - 1;
/** How far down the screen the line's tip sits (fraction of the viewport). */
const TIP = 0.6;
/** Distance from the top of an entry to the middle of its dot (see CSS). */
const DOT = 44;

const format = new Intl.NumberFormat("en-US");

/** Counts to `target` over 800ms, easing out. While the section is still
 *  switching motion on it jumps instead, so it never counts down from the
 *  prerendered final numbers. */
function useCount(target: number, live: boolean) {
  const [shown, setShown] = useState(target);
  const shownRef = useRef(target);
  const wasLive = useRef(false);
  useEffect(() => {
    const animate = wasLive.current;
    wasLive.current = live;
    const from = shownRef.current;
    if (!animate || from === target) {
      shownRef.current = target;
      setShown(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 800);
      const value = Math.round(from + (target - from) * (1 - (1 - p) ** 3));
      shownRef.current = value;
      setShown(value);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, live]);
  return shown;
}

export function AboutRoad({ c, isAr }: { c: AboutCopy; isAr: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  // -1 = before the first year; the server renders the last year.
  const [step, setStep] = useState(LAST);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timeline = root.querySelector<HTMLElement>(".timeline");
    const entries = Array.from(root.querySelectorAll<HTMLElement>(".timeline-entry"));
    if (!timeline) return;
    const cssLine = typeof CSS !== "undefined" && CSS.supports("animation-timeline", "view()");

    // Entries already on (or above) the screen stay put; the rest rise in.
    const seen = (el: Element) => el.setAttribute("data-in", "");
    for (const el of entries) if (el.getBoundingClientRect().top < window.innerHeight) seen(el);
    const io = new IntersectionObserver(
      (records) => {
        for (const r of records) {
          if (r.isIntersecting) {
            seen(r.target);
            io.unobserve(r.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    for (const el of entries) if (!el.hasAttribute("data-in")) io.observe(el);

    let raf = 0;
    const update = () => {
      raf = 0;
      const tip = window.innerHeight * TIP;
      let reached = -1;
      entries.forEach((el, i) => {
        const on = el.getBoundingClientRect().top + DOT <= tip;
        el.toggleAttribute("data-reached", on);
        if (on) reached = i;
      });
      setStep(reached);
      if (!cssLine) {
        const r = timeline.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (tip - r.top) / r.height));
        timeline.style.setProperty("--road-p", p.toFixed(4));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    root.setAttribute("data-motion", "on");
    setLive(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.removeAttribute("data-motion");
    };
  }, []);

  const at = step < 0 ? undefined : road[step];
  const stateOf = (v: (typeof ventures)[number]) =>
    !at || v.from > at.year ? "ahead" : v.until && v.until <= at.year ? "closed" : "open";
  const open = ventures.filter((v) => stateOf(v) === "open").length;
  const plus = at?.ongoing ? "+" : "";

  const years = useCount(at?.years ?? 0, live);
  const students = useCount(at?.students ?? 0, live);
  const count = useCount(open, live);

  const stats = [
    { label: c.tally.years, value: years },
    { label: c.tally.students, value: students },
    { label: c.tally.ventures, value: count },
  ];

  return (
    <div className="road" ref={ref}>
      <aside className="tally" aria-label={c.tally.label}>
        <dl className="tally-stats">
          {stats.map((s, i) => (
            <div key={s.label} className="tally-stat">
              <dt>{s.label}</dt>
              <dd>
                <span dir="ltr">
                  {format.format(s.value)}
                  {i < 2 && plus}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <ul className="tally-ventures">
          {ventures.map((v) => {
            const state = stateOf(v);
            const closed = state === "closed" ? `${c.tally.closed} ${v.until}` : undefined;
            const name = isAr ? (v.nameAr ?? v.name) : v.name;
            return (
              <li
                key={v.name}
                data-state={state}
                title={closed}
                lang={isAr && !v.nameAr ? "en" : undefined}
              >
                {name}
                {closed && <span className="sr-only"> ({closed})</span>}
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="timeline">
        <span className="timeline-line" aria-hidden="true" />
        {c.timeline.map((item) => (
          <article key={item.year} className="timeline-entry">
            <div className="timeline-meta">
              <time dir="ltr">{item.year}</time>
              {item.marks && (
                <div className="timeline-marks">
                  {item.marks.map((mark) => (
                    <span
                      key={mark.label}
                      className={mark.star ? "org-mark is-star" : "org-mark"}
                      role="img"
                      aria-label={isAr ? `شعار ${mark.label}` : `${mark.label} logo`}
                      style={
                        {
                          "--mark": `url('${mark.src}')`,
                          "--mark-width": `${mark.width}px`,
                          "--mark-height": `${mark.height}px`,
                        } as CSSProperties
                      }
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="timeline-copy">
              <h3>{item.title}</h3>
              {item.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
