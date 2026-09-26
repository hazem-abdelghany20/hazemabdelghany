import { useEffect, useRef, useState } from "react";
import { createAscii } from "@/lib/ascii";
import type { Lang } from "@/lib/i18n";

/** The hero figure: the Cairo desk from the human side, re-printed as glyphs.
 *  It sits in the photo's exact slot, so the swipe re-renders one picture. */
export function AsciiDesk({ lang }: { lang: Lang }) {
  const isAr = lang === "ar";
  const ref = useRef<HTMLCanvasElement>(null);
  const [dims, setDims] = useState("");

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const art = createAscii(canvas, setDims);
    const root = document.documentElement;
    // Arriving by swipe, the seam is the only print head; a direct load prints in.
    const swiped = root.classList.contains("is-swapping");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    art.start({ printIn: !swiped && !reduced });
    const themeWatch = new MutationObserver(() => art.render());
    themeWatch.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      themeWatch.disconnect();
      art.destroy();
    };
  }, []);

  return (
    <figure className="t-visual">
      <canvas
        ref={ref}
        className="t-ascii"
        role="img"
        aria-label={
          isAr
            ? "نفس مكتب القاهرة ونفس منظر النيل، مرسوم بالحروف"
            : "The same Cairo desk and Nile view, redrawn in text characters"
        }
      />
      <figcaption>
        <span lang={isAr ? "ar" : "en"}>
          {isAr ? "نفس النهر، بعين الماكينة." : "Same river, rendered by the machine."}
        </span>
        <span className="t-dims" dir="ltr">
          {dims}
        </span>
      </figcaption>
    </figure>
  );
}
