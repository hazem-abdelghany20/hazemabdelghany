/* /speaking/ and /ar/speaking/ — the page Hazem sends to event organizers.
   Every fact comes from the vault's press kit (Resources/Personal Brand/PR/press-kit.md).
   Add a credit there first, then here. Photos and clips live in public/images/speaking/
   and public/media/speaking/, cut from his "Public Speaking" album. */

import type { Lang } from "@/lib/i18n";

export const SPEAKING_WHATSAPP = "201000066624";

const IMG = "/images/speaking";
const MEDIA = "/media/speaking";

export const SPEAKING_MEDIA = {
  hero: `${IMG}/stage-coming-soon.jpg`,
  asharq: `${IMG}/tv-asharq-bloomberg.jpg`,
  cbcClip: `${MEDIA}/tv-cbc-sofra.mp4`,
  cbcPoster: `${IMG}/tv-cbc-sofra-clip.jpg`,
  tiktokClip: `${MEDIA}/tiktok-stage.mp4`,
  tiktokPoster: `${IMG}/tiktok-stage.jpg`,
  pitchPress: `${IMG}/pitch-press.jpg`,
  stageWhy: `${IMG}/stage-why-it-matters.jpg`,
  stageNumber: `${IMG}/stage-the-number.jpg`,
  stageRoom: `${IMG}/stage-room.jpg`,
  training: `${IMG}/training-room.jpg`,
  headshot: `${IMG}/hazem-abdelghany-headshot.jpg`,
};

const LINKS = {
  asharqClip: "https://www.instagram.com/welmnt.me/reel/DGQcCYDIG2h/",
  cbcPost: "https://www.instagram.com/hazem_abdelghany/p/CzebxdxoZnh/",
  identity:
    "https://identity-mag.com/in-collaboration-with-welmnt-and-the-international-school-of-choueifat-tiktok-launches-second-edition-of-family-academy-in-egypt-to-enhance-digital-safety-and-combat-cyberbullying/",
  gazette:
    "https://egyptian-gazette.com/entertainment/tiktok-launches-2nd-edition-of-family-academy-in-egypt/",
  gtm: "https://www.gtm.travel/",
  startupPower: "https://www.instagram.com/p/DJZdVfFMt19/",
  startupPowerWelmnt: "https://www.instagram.com/reel/DJbs06motZL/",
  asharqAnnounce: "https://www.instagram.com/p/DFxfPSOt7os/",
  enpactWorkshop: "https://www.instagram.com/reel/C_n22uTsl-X/",
  enpactWin: "https://www.instagram.com/p/C6HO6JdIOvx/",
  schoolsExpo: "https://www.instagram.com/p/C7hWlsCIAN9/",
  schoolsExpoWelmnt: "https://www.instagram.com/reel/C7ywn_jIXZP/",
};

type Link = { label: string; href: string };
type Count = { n: string; what: string; detail: string };
type Occasion = { when: string; where: string; what: string; next?: boolean; links?: Link[] };

export type SpeakingCopy = {
  title: string;
  mark: string;
  statementBefore: string;
  statementEm: string;
  statementAfter: string;
  other: string;
  bio: string;
  book: string;
  pressJump: string;
  heroCaption: string;

  countLabel: string;
  countOther: string;
  counts: Count[];
  occasionsTitle: string;
  occasions: Occasion[];
  occasionsNote: string;
  nextTag: string;

  screenLabel: string;
  screenOther: string;
  asharq: { name: string; show: string; line: string; link: Link };
  cbc: { name: string; show: string; line: string; link: Link };

  stageLabel: string;
  stageOther: string;
  tiktok: { name: string; line: string; links: Link[] };
  pitch: { name: string; line: string; caption: string; links: Link[] };
  welmnt: { name: string; line: string; captions: [string, string, string] };

  roomLabel: string;
  roomOther: string;
  roomStatement: string;
  roomLine: string;
  roomCaption: string;

  talksLabel: string;
  talksOther: string;
  talks: { title: string; line: string }[];
  formats: string[];

  pressLabel: string;
  pressOther: string;
  bios: { label: string; lang: Lang; text: string }[];
  copy: string;
  copied: string;
  photos: { label: string; file: string; href: string }[];
  bookTitle: string;
  bookLine: string;
  whatsappText: string;
};

const BIO_EN =
  "Hazem Abdelghany makes AI simple and useful for Arabic speakers. He is co-founder and CEO of Catalyst, which teaches people and companies AI. He has given more than 50 trainings to over 10,000 people, been interviewed on Asharq Bloomberg and CBC Sofra, and won three startup pitch competitions, including Ahmed Abou Hashima's Startup Power.";

const BIO_AR =
  "حازم عبدالغني بيخلّي الـ AI بسيط ومفيد لكل اللي بيتكلموا عربي. شريك مؤسس والرئيس التنفيذي لـ Catalyst اللي بتعلّم الأفراد والشركات الـ AI. قدّم أكتر من 50 تدريب لأكتر من 10,000 شخص، واتعمل معاه لقاءات على الشرق Bloomberg وCBC سفرة، وكسب 3 مسابقات pitch، منهم Startup Power بتاعة أحمد أبو هشيمة.";

export const SPEAKING: Record<Lang, SpeakingCopy> = {
  en: {
    title: "Hazem Abdelghany · Speaker",
    mark: "Speaker",
    statementBefore: "I make AI simple, on stage, on screen, and in the ",
    statementEm: "training room",
    statementAfter: ".",
    other: "بخلّي الـ AI بسيط، على المسرح، في التلفزيون، وفي قاعة التدريب.",
    bio: "Co-founder and CEO of Catalyst, which teaches people and companies AI. I talk the way the room talks: Egyptian Arabic, real screens, things you can try tomorrow.",
    book: "Book me on WhatsApp",
    pressJump: "Bio and photos",
    heroCaption: "Pitching on stage, Cairo, 2024",

    countLabel: "The count",
    countOther: "بالعدد",
    counts: [
      {
        n: "60+",
        what: "times in front of an audience",
        detail: "Trainings, stages, panels and TV, since 2023.",
      },
      { n: "50+", what: "trainings", detail: "For teams, companies and open classes." },
      {
        n: "10,000+",
        what: "people trained in AI",
        detail: "Across Catalyst's courses and sessions.",
      },
      {
        n: "4",
        what: "pitch competitions",
        detail: "Won three, including enpact × Startup Haus and Startup Power.",
      },
      { n: "2", what: "TV appearances", detail: "Asharq Bloomberg and CBC Sofra." },
    ],
    occasionsTitle: "Where I've spoken",
    occasions: [
      {
        when: "Jan 2027",
        where: "GTM, Hilton Cairo Grand Nile",
        what: "Speaker, a 2-hour AI workshop for travel companies",
        next: true,
        links: [{ label: "GTM", href: LINKS.gtm }],
      },
      {
        when: "Nov 2025",
        where: "TikTok Family Academy Egypt",
        what: "Moderated the panel and spoke on stage",
        links: [
          { label: "Identity", href: LINKS.identity },
          { label: "Egyptian Gazette", href: LINKS.gazette },
        ],
      },
      {
        when: "May 2025",
        where: "Startup Power, by Ahmed Abou Hashima",
        what: "Pitched and won",
        links: [
          { label: "Startup Power", href: LINKS.startupPower },
          { label: "Welmnt", href: LINKS.startupPowerWelmnt },
        ],
      },
      {
        when: "Feb 2025",
        where: "Asharq Bloomberg, «ويك اند القاهرة»",
        what: "TV interview with Zeina Safwan",
        links: [
          { label: "Clip", href: LINKS.asharqClip },
          { label: "Instagram", href: LINKS.asharqAnnounce },
        ],
      },
      {
        when: "Sep 2024",
        where: "CiviConnectors, by enpact",
        what: "Presented Welmnt at a health-tech workshop",
        links: [{ label: "Welmnt", href: LINKS.enpactWorkshop }],
      },
      { when: "Sep 2024", where: "Pitch stage, Cairo", what: "Pitched Welmnt to a full room" },
      {
        when: "May 2024",
        where: "Schools Expo, Mall of Arabia",
        what: "Spoke at the Welmnt stand",
        links: [
          { label: "Instagram", href: LINKS.schoolsExpo },
          { label: "Welmnt", href: LINKS.schoolsExpoWelmnt },
        ],
      },
      {
        when: "Apr 2024",
        where: "enpact × Startup Haus, health-tech competition",
        what: "Pitched and won",
        links: [{ label: "Welmnt", href: LINKS.enpactWin }],
      },
      {
        when: "Nov 2023",
        where: "CBC Sofra, «الأكيل»",
        what: "TV interview, as a restaurant brand's CMO",
        links: [{ label: "Instagram", href: LINKS.cbcPost }],
      },
    ],
    occasionsNote: "Plus more pitch competitions and 50+ trainings.",
    nextTag: "Next",

    screenLabel: "On screen",
    screenOther: "في التلفزيون",
    asharq: {
      name: "Asharq Bloomberg",
      show: "«ويك اند القاهرة» with Zeina Safwan · Feb 2025",
      line: "How AI can teach life skills in schools.",
      link: { label: "Watch the clip", href: LINKS.asharqClip },
    },
    cbc: {
      name: "CBC Sofra",
      show: "«الأكيل» · Nov 2023",
      line: "Building a food brand's marketing, as its CMO.",
      link: { label: "See the post", href: LINKS.cbcPost },
    },

    stageLabel: "On stage",
    stageOther: "على المسرح",
    tiktok: {
      name: "TikTok Family Academy Egypt",
      line: "Moderated the panel and spoke on stage at the second edition, with TikTok and the International School of Choueifat. November 2025.",
      links: [
        { label: "Identity", href: LINKS.identity },
        { label: "Egyptian Gazette", href: LINKS.gazette },
      ],
    },
    pitch: {
      name: "Startup Power",
      line: "Pitched to Ahmed Abou Hashima, with the press filming, and won.",
      caption: "Pitching at Startup Power",
      links: [
        { label: "Startup Power", href: LINKS.startupPower },
        { label: "Welmnt", href: LINKS.startupPowerWelmnt },
      ],
    },
    welmnt: {
      name: "Pitching Welmnt",
      line: "Four pitch competitions in two years, three of them won. This one was a full room in Cairo.",
      captions: ["Why it matters", "The number that opens the pitch", "The room"],
    },

    roomLabel: "In the training room",
    roomOther: "في قاعة التدريب",
    roomStatement: "50+ trainings, 10,000+ people.",
    roomLine:
      "Teams, founders and open classes. Everyone leaves with something working on their own data, not a slide deck.",
    roomCaption: "A session at CiviConnectors, by enpact, 2024",

    talksLabel: "Talks",
    talksOther: "المحاضرات",
    talks: [
      {
        title: "AI for business owners",
        line: "Cut costs, make your team faster, and read your numbers with AI.",
      },
      {
        title: "ChatGPT is built to please you, not help you",
        line: "Why AI flatters you, and the settings that make it tell you the truth.",
      },
      {
        title: "Running several companies on AI",
        line: "What works and what breaks, on real screens.",
      },
    ],
    formats: [
      "Talk, 20 to 40 minutes",
      "Hands-on workshop, up to 2 hours",
      "Panel moderation",
      "In Egyptian Arabic",
    ],

    pressLabel: "For organizers",
    pressOther: "للمنظّمين",
    bios: [
      { label: "Bio, English", lang: "en", text: BIO_EN },
      { label: "نبذة، عربي", lang: "ar", text: BIO_AR },
    ],
    copy: "Copy",
    copied: "Copied",
    photos: [
      { label: "Portrait", file: "Hazem Abdelghany, portrait.jpg", href: SPEAKING_MEDIA.headshot },
      { label: "On stage", file: "Hazem Abdelghany, on stage.jpg", href: SPEAKING_MEDIA.hero },
    ],
    bookTitle: "Book me",
    bookLine: "For talks, workshops and panels. Send the event, the date and the audience.",
    whatsappText: "Hi Hazem, I'd like you to speak at our event: [event, date, audience]",
  },

  ar: {
    title: "حازم عبدالغني · متحدّث",
    mark: "متحدّث",
    statementBefore: "بخلّي الـ AI بسيط، على المسرح، في التلفزيون، وفي ",
    statementEm: "قاعة التدريب",
    statementAfter: ".",
    other: "I make AI simple, on stage, on screen, and in the training room.",
    bio: "شريك مؤسس والرئيس التنفيذي لـ Catalyst اللي بتعلّم الأفراد والشركات الـ AI. بتكلم زي ما القاعة بتتكلم: بالمصري، على شاشات حقيقية، وبحاجات تجربها بكرة.",
    book: "احجزني على WhatsApp",
    pressJump: "النبذة والصور",
    heroCaption: "على المسرح، القاهرة، 2024",

    countLabel: "بالعدد",
    countOther: "The count",
    counts: [
      { n: "+60", what: "مرة قدّام جمهور", detail: "تدريبات ومسارح وpanels وتلفزيون، من 2023." },
      { n: "+50", what: "تدريب", detail: "لفرق وشركات وكلاسات مفتوحة." },
      { n: "+10,000", what: "شخص اتدرّبوا على الـ AI", detail: "في كورسات Catalyst وسيشناتها." },
      {
        n: "4",
        what: "مسابقات pitch",
        detail: "كسبت 3، منهم enpact × Startup Haus وStartup Power.",
      },
      { n: "2", what: "لقاءات تلفزيونية", detail: "الشرق Bloomberg وCBC سفرة." },
    ],
    occasionsTitle: "اتكلمت فين",
    occasions: [
      {
        when: "يناير 2027",
        where: "GTM، هيلتون القاهرة جراند نايل",
        what: "Speaker، ورشة AI لمدة ساعتين لشركات السياحة",
        next: true,
        links: [{ label: "GTM", href: LINKS.gtm }],
      },
      {
        when: "نوفمبر 2025",
        where: "TikTok Family Academy مصر",
        what: "أدرت الـ panel واتكلمت على المسرح",
        links: [
          { label: "Identity", href: LINKS.identity },
          { label: "Egyptian Gazette", href: LINKS.gazette },
        ],
      },
      {
        when: "مايو 2025",
        where: "Startup Power، أحمد أبو هشيمة",
        what: "عملت pitch وكسبت",
        links: [
          { label: "Startup Power", href: LINKS.startupPower },
          { label: "Welmnt", href: LINKS.startupPowerWelmnt },
        ],
      },
      {
        when: "فبراير 2025",
        where: "الشرق Bloomberg، «ويك اند القاهرة»",
        what: "لقاء تلفزيوني مع زينة صفوان",
        links: [
          { label: "المقطع", href: LINKS.asharqClip },
          { label: "Instagram", href: LINKS.asharqAnnounce },
        ],
      },
      {
        when: "سبتمبر 2024",
        where: "CiviConnectors من enpact",
        what: "قدّمت Welmnt في ورشة health-tech",
        links: [{ label: "Welmnt", href: LINKS.enpactWorkshop }],
      },
      {
        when: "سبتمبر 2024",
        where: "مسرح pitch، القاهرة",
        what: "pitch لـ Welmnt قدّام قاعة مليانة",
      },
      {
        when: "مايو 2024",
        where: "Schools Expo، مول العرب",
        what: "اتكلمت في جناح Welmnt",
        links: [
          { label: "Instagram", href: LINKS.schoolsExpo },
          { label: "Welmnt", href: LINKS.schoolsExpoWelmnt },
        ],
      },
      {
        when: "أبريل 2024",
        where: "enpact × Startup Haus، مسابقة health-tech",
        what: "عملت pitch وكسبت",
        links: [{ label: "Welmnt", href: LINKS.enpactWin }],
      },
      {
        when: "نوفمبر 2023",
        where: "CBC سفرة، «الأكيل»",
        what: "لقاء تلفزيوني، كـ CMO لبراند أكل",
        links: [{ label: "Instagram", href: LINKS.cbcPost }],
      },
    ],
    occasionsNote: "غير مسابقات pitch تانية وأكتر من 50 تدريب.",
    nextTag: "الجاي",

    screenLabel: "في التلفزيون",
    screenOther: "On screen",
    asharq: {
      name: "الشرق Bloomberg",
      show: "«ويك اند القاهرة» مع زينة صفوان · فبراير 2025",
      line: "إزاي الـ AI يعلّم المهارات الحياتية في المدارس.",
      link: { label: "شوف المقطع", href: LINKS.asharqClip },
    },
    cbc: {
      name: "CBC سفرة",
      show: "«الأكيل» · نوفمبر 2023",
      line: "بناء التسويق لبراند أكل، كـ CMO بتاعه.",
      link: { label: "شوف البوست", href: LINKS.cbcPost },
    },

    stageLabel: "على المسرح",
    stageOther: "On stage",
    tiktok: {
      name: "TikTok Family Academy مصر",
      line: "أدرت الـ panel واتكلمت على المسرح في النسخة التانية، مع TikTok ومدرسة Choueifat الدولية. نوفمبر 2025.",
      links: [
        { label: "Identity", href: LINKS.identity },
        { label: "Egyptian Gazette", href: LINKS.gazette },
      ],
    },
    pitch: {
      name: "Startup Power",
      line: "عملت pitch قدّام أحمد أبو هشيمة والصحافة بتصوّر، وكسبت.",
      caption: "في Startup Power",
      links: [
        { label: "Startup Power", href: LINKS.startupPower },
        { label: "Welmnt", href: LINKS.startupPowerWelmnt },
      ],
    },
    welmnt: {
      name: "pitch لـ Welmnt",
      line: "4 مسابقات pitch في سنتين، كسبت 3 منهم. دي كانت قاعة مليانة في القاهرة.",
      captions: ["ليه ده مهم", "الرقم اللي بيفتح الـ pitch", "القاعة"],
    },

    roomLabel: "في قاعة التدريب",
    roomOther: "In the training room",
    roomStatement: "أكتر من 50 تدريب، لأكتر من 10,000 شخص.",
    roomLine: "فرق وfounders وكلاسات مفتوحة. كل واحد بيخرج بحاجة شغالة على شغله هو، مش slides.",
    roomCaption: "سيشن في CiviConnectors من enpact، 2024",

    talksLabel: "المحاضرات",
    talksOther: "Talks",
    talks: [
      {
        title: "الـ AI لصاحب الشركة",
        line: "قلّل التكاليف، خلّي فريقك أسرع، واقرا أرقامك بالـ AI.",
      },
      {
        title: "ChatGPT متصمّم إنه يرضيك، مش إنه يفيدك",
        line: "ليه الـ AI بيطبّلك، والإعدادات اللي تخليه يقولك الحقيقة.",
      },
      {
        title: "إزاي بدير كذا شركة بالـ AI",
        line: "إيه اللي بيشتغل وإيه اللي بيبوظ، على شاشات حقيقية.",
      },
    ],
    formats: ["Talk من 20 لـ 40 دقيقة", "ورشة عملي لحد ساعتين", "إدارة panel", "بالعامية المصرية"],

    pressLabel: "للمنظّمين",
    pressOther: "For organizers",
    bios: [
      { label: "نبذة، عربي", lang: "ar", text: BIO_AR },
      { label: "Bio, English", lang: "en", text: BIO_EN },
    ],
    copy: "انسخ",
    copied: "اتنسخ",
    photos: [
      {
        label: "صورة شخصية",
        file: "Hazem Abdelghany, portrait.jpg",
        href: SPEAKING_MEDIA.headshot,
      },
      { label: "على المسرح", file: "Hazem Abdelghany, on stage.jpg", href: SPEAKING_MEDIA.hero },
    ],
    bookTitle: "احجزني",
    bookLine: "للمحاضرات والورش والـ panels. ابعت اسم الـ event والتاريخ والجمهور.",
    whatsappText: "أهلاً يا حازم 👋 عايزك تتكلم في الـ event بتاعنا: [الـ event، التاريخ، الجمهور]",
  },
};

export const speakingAlternates = [
  { lang: "en", href: "/speaking/" },
  { lang: "ar-EG", href: "/ar/speaking/" },
  { lang: "x-default", href: "/speaking/" },
];
