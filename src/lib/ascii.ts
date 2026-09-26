/* The AI side's hero: the same Cairo desk as the human side, re-printed as
   glyphs on a canvas. "Same river, rendered by the machine."

   Sampled live from the real photo (the day photo on paper, the night photo on
   glass) and printed as character density:
     signal  dark  = luminance weighted toward warm light (lamps, reflections,
                     the notebook); blue light keeps a 40% floor so the river
                     still registers
             light = darkness: ink goes where the photo is dark
     then: 2x2 mean/max pooling (point lights survive) -> per-cell pooling ->
     levels -> local contrast -> gamma -> ordered dither over the ramp, with
     line glyphs (| / - \) on the strongest edges. */

type Theme = "light" | "dark";
type Grid = { w: number; h: number; v: Uint8Array };
type Frame = {
  cols: number;
  rows: number;
  dens: Float32Array;
  glyph: string[];
  edge: Uint8Array;
  hot: number;
  amin: number;
};

const SRC: Record<Theme, string> = {
  dark: "/images/brand/hero-cairo-dark.webp",
  light: "/images/brand/hero-cairo-light.webp",
};
const SW = 600,
  SH = 400,
  GW = 300,
  GH = 200;
const RAMP = " .·:-=+*xoX#%@";
const LINES = ["-", "\\", "|", "/"];
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const TUNE = {
  //        mean/max  black pt  local contrast  gamma  edge thr  alpha floor  density cap  hot
  dark: { pm: 0.3, bp: 0.03, lc: 0.8, gamma: 0.75, edge: 0.5, amin: 0.22, dmax: 1, hot: 0.78 },
  light: { pm: 0.3, bp: 0.12, lc: 0.7, gamma: 1.4, edge: 0.42, amin: 0.2, dmax: 0.8, hot: 2 },
};
const FONT = '"Martian Mono", ui-monospace, Menlo, monospace';

// Shared across mounts: a swipe back to the AI side never re-samples.
const grids: Partial<Record<Theme, Grid>> = {};
const pending: Partial<Record<Theme, Promise<Grid | null>>> = {};
const frames: Record<string, Frame> = {};

const themeNow = (): Theme =>
  document.documentElement.dataset["theme"] === "dark" ? "dark" : "light";

function signal(r: number, g: number, b: number, theme: Theme) {
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  if (theme === "light") return 255 - L;
  let w = 0.5 + (r - b) / 200;
  w = w < 0 ? 0 : w > 1 ? 1 : w;
  return L * (0.4 + 0.6 * w);
}

function fromImage(img: HTMLImageElement, theme: Theme): Grid {
  const c = document.createElement("canvas");
  c.width = SW;
  c.height = SH;
  const x = c.getContext("2d", { willReadFrequently: true })!;
  x.imageSmoothingQuality = "high";
  x.drawImage(img, 0, 0, SW, SH);
  const d = x.getImageData(0, 0, SW, SH).data;
  const s = new Float32Array(SW * SH);
  for (let i = 0; i < SW * SH; i++) s[i] = signal(d[i * 4]!, d[i * 4 + 1]!, d[i * 4 + 2]!, theme);
  const out = new Uint8Array(GW * GH);
  for (let y = 0; y < GH; y++) {
    for (let xx = 0; xx < GW; xx++) {
      const a = s[2 * y * SW + 2 * xx]!,
        b = s[2 * y * SW + 2 * xx + 1]!,
        e = s[(2 * y + 1) * SW + 2 * xx]!,
        f = s[(2 * y + 1) * SW + 2 * xx + 1]!;
      const v = (0.5 * (a + b + e + f)) / 4 + 0.5 * Math.max(a, b, e, f);
      out[y * GW + xx] = v > 255 ? 255 : v < 0 ? 0 : Math.round(v);
    }
  }
  return { w: GW, h: GH, v: out };
}

function sample(theme: Theme): Promise<Grid | null> {
  const have = grids[theme];
  if (have) return Promise.resolve(have);
  const inFlight = pending[theme];
  if (inFlight) return inFlight;
  const p = new Promise<Grid | null>((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      try {
        resolve(fromImage(img, theme));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = SRC[theme];
  }).then((g) => {
    if (g) grids[theme] = g;
    else delete pending[theme];
    return g;
  });
  pending[theme] = p;
  return p;
}

/** Warm the cache for the current theme (and then the other one). */
export function primeAscii() {
  const t = themeNow();
  void sample(t).then(() => sample(t === "dark" ? "light" : "dark"));
}

function percentile(a: Float32Array, p: number) {
  const s = Array.from(a).sort((x, y) => x - y);
  return s[Math.min(s.length - 1, Math.floor(p * s.length))]!;
}

function boxBlur(a: Float32Array, cols: number, rows: number, r: number) {
  const t = new Float32Array(a.length),
    o = new Float32Array(a.length);
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++) {
      let s = 0,
        n = 0;
      for (let k = -r; k <= r; k++) {
        const cc = j + k;
        if (cc >= 0 && cc < cols) {
          s += a[i * cols + cc]!;
          n++;
        }
      }
      t[i * cols + j] = s / n;
    }
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++) {
      let s = 0,
        n = 0;
      for (let k = -r; k <= r; k++) {
        const rr = i + k;
        if (rr >= 0 && rr < rows) {
          s += t[rr * cols + j]!;
          n++;
        }
      }
      o[i * cols + j] = s / n;
    }
  return o;
}

/** Which character and how strong, per cell, for one theme at one grid size. */
function frame(g: Grid, theme: Theme, cols: number, rows: number, aspect: number): Frame {
  const key = `${theme}:${cols}x${rows}`;
  const cached = frames[key];
  if (cached) return cached;
  const T = TUNE[theme],
    n = cols * rows;
  const v = new Float32Array(n),
    sx = g.w / cols,
    sy = g.h / rows;
  for (let r = 0; r < rows; r++) {
    const y0 = r * sy,
      y1 = (r + 1) * sy;
    for (let c = 0; c < cols; c++) {
      const x0 = c * sx,
        x1 = (c + 1) * sx;
      let sum = 0,
        wsum = 0,
        mx = 0;
      for (let y = Math.floor(y0); y < Math.ceil(y1); y++) {
        const wy = Math.min(y + 1, y1) - Math.max(y, y0);
        if (wy <= 0) continue;
        for (let x = Math.floor(x0); x < Math.ceil(x1); x++) {
          const wx = Math.min(x + 1, x1) - Math.max(x, x0);
          if (wx <= 0) continue;
          const val = g.v[y * g.w + x]!;
          sum += val * wx * wy;
          wsum += wx * wy;
          if (val > mx) mx = val;
        }
      }
      v[r * cols + c] = ((1 - T.pm) * sum) / wsum / 255 + (T.pm * mx) / 255;
    }
  }
  const lo = percentile(v, 0.02),
    hi = Math.max(percentile(v, 0.995), lo + 0.01);
  for (let i = 0; i < n; i++) {
    let t = (v[i]! - lo) / (hi - lo);
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    v[i] = Math.max(0, (t - T.bp) / (1 - T.bp));
  }
  const base = v.slice(),
    blur = boxBlur(v, cols, rows, 4);
  const dens = new Float32Array(n),
    glyph: string[] = new Array(n),
    edge = new Uint8Array(n);
  const mag = new Float32Array(n),
    ang = new Float32Array(n);
  let mmax = 0;
  const p = (rr: number, cc: number) => base[rr * cols + cc]!;
  for (let r = 1; r < rows - 1; r++)
    for (let c = 1; c < cols - 1; c++) {
      const gx =
        p(r - 1, c + 1) +
        2 * p(r, c + 1) +
        p(r + 1, c + 1) -
        (p(r - 1, c - 1) + 2 * p(r, c - 1) + p(r + 1, c - 1));
      const gy =
        (p(r + 1, c - 1) +
          2 * p(r + 1, c) +
          p(r + 1, c + 1) -
          (p(r - 1, c - 1) + 2 * p(r - 1, c) + p(r - 1, c + 1))) *
        aspect;
      const i = r * cols + c;
      mag[i] = Math.sqrt(gx * gx + gy * gy);
      ang[i] = Math.atan2(gx, -gy);
      if (mag[i]! > mmax) mmax = mag[i]!;
    }
  const last = RAMP.length - 1;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      let d = v[i]! + T.lc * (v[i]! - blur[i]!);
      d = d < 0 ? 0 : d > 1 ? 1 : d;
      d = Math.pow(d, T.gamma) * T.dmax;
      dens[i] = d;
      if (T.edge && mmax && mag[i]! > T.edge * mmax && d > 0.08) {
        let a = ang[i]!;
        if (a < 0) a += Math.PI;
        glyph[i] = LINES[Math.round(a / (Math.PI / 4)) % 4]!;
        edge[i] = 1;
        dens[i] = Math.min(1, 0.45 + (0.9 * mag[i]!) / mmax);
        continue;
      }
      const k = Math.floor(d * last + BAYER[(r & 3) * 4 + (c & 3)]! / 16);
      glyph[i] = RAMP[k < 0 ? 0 : k > last ? last : k]!;
    }
  return (frames[key] = { cols, rows, dens, glyph, edge, hot: T.hot, amin: T.amin });
}

/** Draws the glyph art into `canvas`; `onDims` hears "83 × 33 glyphs". */
export function createAscii(canvas: HTMLCanvasElement, onDims: (text: string) => void) {
  const buffer = document.createElement("canvas");
  let revealRaf = 0,
    revealRows = -1,
    revealSafety = 0,
    oy = 0,
    lh = 0,
    dpr = 1,
    rowsNow = 0,
    dead = false;

  const cssVar = (name: string) => getComputedStyle(canvas).getPropertyValue(name).trim();

  function paint() {
    const theme = themeNow();
    const g = grids[theme];
    if (!g) return false;
    const rect = canvas.getBoundingClientRect();
    const W = rect.width,
      H = rect.height;
    if (W < 2 || H < 2) return false;
    dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), 3);
    const pw = Math.round(W * dpr),
      ph = Math.round(H * dpr);
    for (const cv of [canvas, buffer]) {
      if (cv.width !== pw) cv.width = pw;
      if (cv.height !== ph) cv.height = ph;
    }
    const ctx = buffer.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalAlpha = 1;
    ctx.fillStyle = cssVar("--t-canvas-bg");
    ctx.fillRect(0, 0, W, H);

    // At 2x a 4.2px column is crisp type; at 1x it would be dither, so 1x
    // screens get a coarser grid that still reads as characters.
    const cw = W > 480 ? (dpr >= 2 ? 4.2 : 6.5) : dpr >= 2 ? 3.7 : 5;
    ctx.font = "500 10px " + FONT;
    const adv = ctx.measureText("0").width / 10 || 0.62;
    const fs = cw / adv;
    lh = fs * 1.18;
    const cols = Math.floor(W / cw),
      rows = Math.floor(H / lh);
    const ox = (W - cols * cw) / 2;
    oy = (H - rows * lh) / 2;
    ctx.font = "500 " + fs.toFixed(2) + "px " + FONT;
    ctx.textBaseline = "top";

    const f = frame(g, theme, cols, rows, cw / lh);
    const ink = cssVar("--t-glyph"),
      hot = cssVar("--t-glyph-hi"),
      line = cssVar("--t-glyph-edge");
    let lastCol = "";
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c,
          ch = f.glyph[i]!;
        if (ch === " ") continue;
        const d = f.dens[i]!;
        const col = f.edge[i] ? line : d > f.hot ? hot : ink;
        if (col !== lastCol) {
          ctx.fillStyle = col;
          lastCol = col;
        }
        ctx.globalAlpha = f.edge[i] ? d : f.amin + (1 - f.amin) * d;
        ctx.fillText(ch, ox + c * cw, oy + r * lh);
      }
    }
    ctx.globalAlpha = 1;
    rowsNow = rows;
    onDims(`${cols} × ${rows} glyphs`);
    return true;
  }

  /** Copy the buffer to the page, up to `upto` rows (all rows when omitted). */
  function blit(upto?: number) {
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (upto == null) {
      ctx.drawImage(buffer, 0, 0);
      return;
    }
    const y = Math.round((oy + upto * lh) * dpr);
    ctx.fillStyle = cssVar("--t-canvas-bg");
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (y > 0) ctx.drawImage(buffer, 0, 0, buffer.width, y, 0, 0, buffer.width, y);
    // the print head: one bright row at the leading edge
    if (upto < rowsNow) {
      ctx.fillStyle = cssVar("--t-accent");
      ctx.globalAlpha = 0.5;
      ctx.fillRect(0, y, canvas.width, Math.max(1, Math.round(dpr)));
      ctx.globalAlpha = 1;
    }
  }

  function render() {
    if (dead) return;
    cancelAnimationFrame(revealRaf);
    revealRows = -1;
    if (paint()) blit();
    else
      void sample(themeNow()).then(() => {
        if (!dead && paint()) blit();
      });
  }

  /** Print the art top to bottom, like output scrolling onto a terminal. */
  function reveal(delay: number, duration: number) {
    cancelAnimationFrame(revealRaf);
    if (!paint()) {
      render();
      return;
    }
    let start = 0;
    revealRows = 0;
    blit(0);
    const step = (now: number) => {
      if (dead) return;
      if (!start) start = now + delay;
      const p = Math.max(0, Math.min(1, (now - start) / duration));
      const k = Math.round(rowsNow * p);
      if (k !== revealRows) {
        revealRows = k;
        blit(k);
      }
      if (p < 1) revealRaf = requestAnimationFrame(step);
      else {
        revealRows = -1;
        blit();
      }
    };
    revealRaf = requestAnimationFrame(step);
    // if frames stall (background tab), finish the print anyway
    clearTimeout(revealSafety);
    revealSafety = window.setTimeout(
      () => {
        if (revealRows >= 0) {
          cancelAnimationFrame(revealRaf);
          revealRows = -1;
          blit();
        }
      },
      delay + duration + 600,
    );
  }

  /** First paint: print in on a direct load, appear whole after a swipe. */
  function start({ printIn }: { printIn: boolean }) {
    const fontsReady = document.fonts?.load
      ? document.fonts.load('500 10px "Martian Mono"').catch(() => undefined)
      : Promise.resolve();
    // After a swipe the grid is usually cached: paint now, before the new
    // snapshot is live, then again once the mono font is certainly in.
    if (!printIn && grids[themeNow()]) render();
    void Promise.all([fontsReady, sample(themeNow())]).then(() => {
      if (dead) return;
      if (printIn) reveal(140, 640);
      else render();
      primeAscii();
    });
  }

  let lastW = 0;
  const ro =
    "ResizeObserver" in window
      ? new ResizeObserver((entries) => {
          const w = Math.round(entries[0]!.contentRect.width);
          if (w && w !== lastW) {
            lastW = w;
            if (revealRows < 0) requestAnimationFrame(render);
          }
        })
      : null;
  ro?.observe(canvas);

  return {
    start,
    render,
    destroy() {
      dead = true;
      cancelAnimationFrame(revealRaf);
      clearTimeout(revealSafety);
      ro?.disconnect();
    },
  };
}
