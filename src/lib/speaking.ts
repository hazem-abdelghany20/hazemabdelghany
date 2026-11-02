/* /speaking/ and /ar/speaking/ — the speaker kit Hazem sends to event organizers.
   Every fact here comes from the vault's press kit (Resources/Personal Brand/PR/press-kit.md);
   add a credit there first, then here. Past experience uses only the words listed there. */

import type { Lang } from "@/lib/i18n";

export const SPEAKING_WHATSAPP = "201000066624";

type Credit = {
  name: string;
  role: string;
  when: string;
  links?: { label: string; href: string }[];
  upcoming?: boolean;
};
type Talk = { title: string; line: string };

type Copy = {
  kicker: string;
  name: string;
  otherName: string;
  role: string;
  lede: string;
  facts: { big: string; small: string }[];
  stageTitle: string;
  credits: Credit[];
  talksTitle: string;
  talks: Talk[];
  formatsTitle: string;
  formats: string[];
  bioTitle: string;
  bios: { label: string; lang: Lang; text: string }[];
  copy: string;
  copied: string;
  photoTitle: string;
  photoAlt: string;
  photoDownload: string;
  contactTitle: string;
  contactLine: string;
  whatsapp: string;
  whatsappText: string;
  switchLabel: string;
  switchHref: string;
  upcoming: string;
};

const BIO_EN =
  "Hazem Abdelghany makes AI simple and useful for Arabic speakers. He is co-founder and CEO of Catalyst, which teaches people and companies AI, and has trained more than 10,000 people to use it. He runs several companies on AI, and one of his reels on using ChatGPT passed 920,000 views.";

const BIO_AR =
  "حازم عبدالغني بيخلّي الـ AI بسيط ومفيد لكل اللي بيتكلموا عربي. شريك مؤسس والرئيس التنفيذي لـ Catalyst اللي بتعلّم الأفراد والشركات الـ AI، ودرّب أكتر من 10,000 شخص. بيدير كذا شركة بالـ AI، وفيديو واحد ليه عن استخدام ChatGPT عدّى 920 ألف مشاهدة.";

const TIKTOK_PRESS = [
  {
    label: "Identity",
    href: "https://identity-mag.com/in-collaboration-with-welmnt-and-the-international-school-of-choueifat-tiktok-launches-second-edition-of-family-academy-in-egypt-to-enhance-digital-safety-and-combat-cyberbullying/",
  },
  {
    label: "Egyptian Gazette",
    href: "https://egyptian-gazette.com/entertainment/tiktok-launches-2nd-edition-of-family-academy-in-egypt/",
  },
];
const ASHARQ_CLIP = "https://www.instagram.com/welmnt.me/reel/DGQcCYDIG2h/";

export const SPEAKING: Record<Lang, Copy> = {
  en: {
    kicker: "Speaker kit",
    name: "Hazem Abdelghany",
    otherName: "حازم عبدالغني",
    role: "Speaker · Co-founder & CEO, Catalyst",
    lede: "Makes AI simple and useful for Arabic speakers.",
    facts: [
      { big: "10,000+", small: "people trained in AI" },
      { big: "920K", small: "views on one reel" },
      { big: "22K+", small: "followers across platforms" },
    ],
    stageTitle: "On stage and on screen",
    credits: [
      {
        name: "TikTok Family Academy Egypt",
        role: "Moderated the panel",
        when: "Nov 2025",
        links: TIKTOK_PRESS,
      },
      {
        name: "Asharq Bloomberg",
        role: "TV interview",
        when: "Feb 2025",
        links: [{ label: "Watch the clip", href: ASHARQ_CLIP }],
      },
      { name: "Startup Power, by Ahmed Abou Hashima", role: "Won the pitch competition", when: "" },
      {
        name: "GTM, Hilton Cairo Grand Nile",
        role: "Speaker, 2-hour AI workshop",
        when: "Jan 2027",
        upcoming: true,
      },
    ],
    talksTitle: "Talks",
    talks: [
      {
        title: "AI for business owners",
        line: "Cut costs, make your team faster, and read your numbers with AI.",
      },
      {
        title: "ChatGPT is built to please you, not help you",
        line: "What 920,000 viewers showed about how people use AI, and the settings that fix it.",
      },
      {
        title: "Running several companies on AI",
        line: "What works and what breaks, on real screens.",
      },
    ],
    formatsTitle: "Formats",
    formats: [
      "Talk · 20–40 min",
      "Hands-on workshop · up to 2 hours",
      "Panel moderation",
      "In Egyptian Arabic",
    ],
    bioTitle: "Bio",
    bios: [
      { label: "English", lang: "en", text: BIO_EN },
      { label: "عربي", lang: "ar", text: BIO_AR },
    ],
    copy: "Copy",
    copied: "Copied",
    photoTitle: "Photo",
    photoAlt: "Hazem Abdelghany",
    photoDownload: "Download (1254 × 1254)",
    contactTitle: "Book Hazem",
    contactLine: "For talks, workshops and panels.",
    whatsapp: "Message on WhatsApp",
    whatsappText: "Hi Hazem, I'd like you to speak at our event: [event name and date]",
    switchLabel: "عربي",
    switchHref: "/ar/speaking/",
    upcoming: "Upcoming",
  },
  ar: {
    kicker: "ملف المتحدّث",
    name: "حازم عبدالغني",
    otherName: "Hazem Abdelghany",
    role: "Speaker · شريك مؤسس والرئيس التنفيذي لـ Catalyst",
    lede: "بيخلّي الـ AI بسيط ومفيد لكل اللي بيتكلموا عربي.",
    facts: [
      { big: "+10,000", small: "شخص اتدرّبوا على الـ AI" },
      { big: "920K", small: "مشاهدة لفيديو واحد" },
      { big: "+22K", small: "متابع على المنصات" },
    ],
    stageTitle: "على المسرح وفي التلفزيون",
    credits: [
      {
        name: "TikTok Family Academy مصر",
        role: "أدار الـ panel",
        when: "نوفمبر 2025",
        links: TIKTOK_PRESS,
      },
      {
        name: "الشرق Bloomberg",
        role: "لقاء تلفزيوني",
        when: "فبراير 2025",
        links: [{ label: "شوف المقطع", href: ASHARQ_CLIP }],
      },
      { name: "Startup Power من أحمد أبو هشيمة", role: "كسب مسابقة الـ pitch", when: "" },
      {
        name: "GTM، هيلتون القاهرة جراند نايل",
        role: "Speaker، ورشة AI لمدة ساعتين",
        when: "يناير 2027",
        upcoming: true,
      },
    ],
    talksTitle: "المحاضرات",
    talks: [
      {
        title: "الـ AI لصاحب الشركة",
        line: "قلّل التكاليف، خلّي فريقك أسرع، واقرا أرقامك بالـ AI.",
      },
      {
        title: "ChatGPT متصمّم إنه يرضيك، مش إنه يفيدك",
        line: "اللي 920 ألف مشاهد ورّوهولنا عن استخدام الـ AI، والإعدادات اللي بتصلّحه.",
      },
      {
        title: "إزاي بدير كذا شركة بالـ AI",
        line: "إيه اللي بيشتغل وإيه اللي بيبوظ، على شاشات حقيقية.",
      },
    ],
    formatsTitle: "الأشكال",
    formats: [
      "Talk · من 20 لـ 40 دقيقة",
      "ورشة عملي · لحد ساعتين",
      "إدارة panel",
      "بالعامية المصرية",
    ],
    bioTitle: "نبذة",
    bios: [
      { label: "عربي", lang: "ar", text: BIO_AR },
      { label: "English", lang: "en", text: BIO_EN },
    ],
    copy: "انسخ",
    copied: "اتنسخ",
    photoTitle: "الصورة",
    photoAlt: "حازم عبدالغني",
    photoDownload: "نزّل الصورة (1254 × 1254)",
    contactTitle: "احجز حازم",
    contactLine: "للمحاضرات والورش والـ panels.",
    whatsapp: "كلّمه على WhatsApp",
    whatsappText: "أهلاً يا حازم 👋 عايزك تتكلم في الـ event بتاعنا: [اسم الـ event والتاريخ]",
    switchLabel: "English",
    switchHref: "/speaking/",
    upcoming: "جاي",
  },
};

export const speakingAlternates = [
  { lang: "en", href: "/speaking/" },
  { lang: "ar-EG", href: "/ar/speaking/" },
  { lang: "x-default", href: "/speaking/" },
];
