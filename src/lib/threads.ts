export type ThreadKey = "building" | "faith" | "body" | "mind" | "perspective";

export const THREADS: { key: ThreadKey; ar: string; en: string; blurb: string }[] = [
  {
    key: "building",
    ar: "البناء",
    en: "Building",
    blurb: "Companies, products, and the systems behind them.",
  },
  { key: "faith", ar: "الإيمان", en: "Faith", blurb: "The anchor everything else hangs on." },
  {
    key: "body",
    ar: "الجسد",
    en: "Body",
    blurb: "Training, food, recovery — and rebuilding a knee.",
  },
  { key: "mind", ar: "العقل", en: "Mind", blurb: "Psychology, focus, and what I read." },
  { key: "perspective", ar: "النظرة", en: "Perspective", blurb: "How I see the world, and why." },
];

export const threadLabel = (key: ThreadKey) => THREADS.find((t) => t.key === key)!;

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const formatDate = (d: Date) => `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
