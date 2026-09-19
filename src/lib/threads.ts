import type { Lang } from "./i18n";

export type ThreadKey = "building" | "faith" | "body" | "mind" | "perspective";

export const THREADS: { key: ThreadKey; ar: string; en: string; blurb: string; blurbAr: string }[] =
  [
    {
      key: "building",
      ar: "البناء",
      en: "Building",
      blurb: "Companies, products, and the systems behind them.",
      blurbAr: "الشركات والمنتجات والأنظمة اللي وراها.",
    },
    {
      key: "faith",
      ar: "الإيمان",
      en: "Faith",
      blurb: "The anchor everything else hangs on.",
      blurbAr: "المرساة اللي كل حاجة تانية متعلقة بيها.",
    },
    {
      key: "body",
      ar: "الجسد",
      en: "Body",
      blurb: "Training, food, recovery — and rebuilding a knee.",
      blurbAr: "التمرين والأكل والتعافي — وإعادة بناء ركبة.",
    },
    {
      key: "mind",
      ar: "العقل",
      en: "Mind",
      blurb: "Psychology, focus, and what I read.",
      blurbAr: "علم النفس والتركيز واللي بقراه.",
    },
    {
      key: "perspective",
      ar: "النظرة",
      en: "Perspective",
      blurb: "How I see the world, and why.",
      blurbAr: "إزاي بشوف الدنيا، وليه.",
    },
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
const MONTHS_AR = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];
export const formatDate = (d: Date, lang: Lang = "en") =>
  `${(lang === "ar" ? MONTHS_AR : MONTHS)[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
