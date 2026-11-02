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
  cbcEpisode: "https://www.youtube.com/watch?v=KuQUyIGYZ_I",
  haus: {
    competition: "https://www.instagram.com/p/C6MY7j6svdN/",
    workshop: "https://www.instagram.com/p/DAJZyNjNq6e/",
    demoDay: "https://www.instagram.com/p/DAQ9z3fo0ay/",
    interview: "https://www.instagram.com/reel/DAa0G3QSgqn/",
  },
  almal:
    "https://almalnews.com/1953376/%D8%B4%D8%B1%D9%83%D8%A9-Welmnt-%D9%84%D8%AF%D8%B9%D9%85-%D8%A7%D9%84%D8%B5%D8%AD%D8%A9-%D8%A7%D9%84%D9%86%D9%81%D8%B3%D9%8A%D8%A9-%D9%84%D9%84%D8%B7%D9%84%D8%A7%D8%A8-%D8%AA%D8%AA%D9%88%D9%82%D8%B9/",
};

export type Link = { label: string; href: string };
type Count = { n: string; what: string; detail: string };
export type Occasion = {
  when: string;
  where: string;
  what: string;
  next?: boolean;
  links?: Link[];
};
type Screen = { name: string; sub: string; line: string; links: Link[] };
type Photo = { src: string; alt: string; caption: string; w: number; h: number };

export type SpeakingCopy = {
  role: string;
  name: string;
  nameOther: string;
  statement: string;
  bio: string;
  portraitAlt: string;
  book: string;
  pressJump: string;
  counts: Count[];

  watch: { label: string; other: string; tiktok: Screen; cbc: Screen; asharq: Screen };
  record: { label: string; other: string; occasions: Occasion[]; note: string; nextTag: string };
  room: { label: string; other: string; line: string; photos: Photo[]; links: Link[] };
  talks: {
    label: string;
    other: string;
    items: { title: string; line: string }[];
    facts: { k: string; v: string }[];
  };
  press: {
    label: string;
    other: string;
    line: string;
    bios: { label: string; lang: Lang; text: string }[];
    copy: string;
    copied: string;
    download: string;
    photos: { label: string; file: string; href: string }[];
  };
  bookTitle: string;
  bookLine: string;
  whatsappText: string;
};

const BIO_EN =
  "Hazem Abdelghany makes AI simple and useful for Arabic speakers. He is co-founder and CEO of Catalyst, which teaches people and companies AI. He has given more than 50 trainings to over 10,000 people, been interviewed on Asharq Bloomberg and CBC Sofra, and won three startup pitch competitions, including Ahmed Abou Hashima's Startup Power.";

const BIO_AR =
  "حازم عبدالغني بيخلّي الـ AI بسيط ومفيد لكل اللي بيتكلموا عربي. شريك مؤسس والرئيس التنفيذي لـ Catalyst اللي بتعلّم الأفراد والشركات الـ AI. قدّم أكتر من 50 تدريب لأكتر من 10,000 شخص، واتعمل معاه لقاءات على الشرق Bloomberg وCBC سفرة، وكسب 3 مسابقات pitch، منهم Startup Power بتاعة أحمد أبو هشيمة.";

const PHOTO = {
  stage: { src: SPEAKING_MEDIA.hero, w: 2000, h: 1333 },
  why: { src: SPEAKING_MEDIA.stageWhy, w: 1400, h: 933 },
  number: { src: SPEAKING_MEDIA.stageNumber, w: 1400, h: 933 },
  room: { src: SPEAKING_MEDIA.stageRoom, w: 1400, h: 933 },
  pitch: { src: SPEAKING_MEDIA.pitchPress, w: 899, h: 899 },
  training: { src: SPEAKING_MEDIA.training, w: 1000, h: 1333 },
};

export const SPEAKING: Record<Lang, SpeakingCopy> = {
  en: {
    role: "Speaker",
    name: "Hazem Abdelghany",
    nameOther: "حازم عبدالغني",
    statement: "I make AI simple, on stage, on screen, and in the training room.",
    bio: "Co-founder and CEO of Catalyst, which teaches people and companies AI. I talk the way the room talks: Egyptian Arabic, real screens, things you can try tomorrow.",
    portraitAlt: "Hazem Abdelghany",
    book: "Book me on WhatsApp",
    pressJump: "Bio and photos",
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
        n: "3",
        what: "pitch competitions won",
        detail: "Out of four, including CiviConnectors by enpact and Startup Power.",
      },
      { n: "2", what: "TV interviews", detail: "Asharq Bloomberg and CBC Sofra." },
    ],

    watch: {
      label: "Watch",
      other: "اتفرّج",
      tiktok: {
        name: "TikTok Family Academy Egypt",
        sub: "Moderator and speaker, November 2025",
        line: "The second edition, with TikTok and the International School of Choueifat.",
        links: [
          { label: "Identity", href: LINKS.identity },
          { label: "Egyptian Gazette", href: LINKS.gazette },
        ],
      },
      cbc: {
        name: "CBC Sofra, «الأكيل»",
        sub: "With Mourad Makram, November 2023",
        line: "Building a food brand's marketing, as its CMO.",
        links: [
          { label: "Full episode", href: LINKS.cbcEpisode },
          { label: "Instagram", href: LINKS.cbcPost },
        ],
      },
      asharq: {
        name: "Asharq Bloomberg, «ويك اند القاهرة»",
        sub: "With Zeina Safwan, February 2025",
        line: "How AI can teach life skills in schools.",
        links: [
          { label: "Clip", href: LINKS.asharqClip },
          { label: "Instagram", href: LINKS.asharqAnnounce },
        ],
      },
    },

    record: {
      label: "Where I've spoken",
      other: "اتكلمت فين",
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
          where: "CiviConnectors Demo Day, Startup Haus Cairo",
          what: "Pitched Welmnt to the room and a panel of experts",
          links: [{ label: "Startup Haus", href: LINKS.haus.demoDay }],
        },
        {
          when: "Sep 2024",
          where: "Diabetes awareness workshop, CiviConnectors by enpact",
          what: "Presented Welmnt",
          links: [
            { label: "Startup Haus", href: LINKS.haus.workshop },
            { label: "Welmnt", href: LINKS.enpactWorkshop },
          ],
        },
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
          where: "CiviConnectors idea competition, enpact × Startup Haus",
          what: "Pitched and won: one of 6 teams picked from 12",
          links: [
            { label: "Startup Haus", href: LINKS.haus.competition },
            { label: "Welmnt", href: LINKS.enpactWin },
          ],
        },
        {
          when: "Nov 2023",
          where: "CBC Sofra, «الأكيل»",
          what: "TV interview, as a restaurant brand's CMO",
          links: [
            { label: "Full episode", href: LINKS.cbcEpisode },
            { label: "Instagram", href: LINKS.cbcPost },
          ],
        },
      ],
      note: "Plus more pitch competitions and 50+ trainings.",
      nextTag: "Next",
    },

    room: {
      label: "In the room",
      other: "في القاعة",
      line: "Pitches, talks and workshops. In a workshop, everyone leaves with something working on their own data, not a slide deck.",
      photos: [
        {
          ...PHOTO.stage,
          alt: "Hazem on stage with a microphone",
          caption: "CiviConnectors Demo Day, Startup Haus Cairo, 2024",
        },
        {
          ...PHOTO.training,
          alt: "Hazem presenting to a seated room",
          caption: "Presenting at a CiviConnectors workshop, 2024",
        },
        {
          ...PHOTO.why,
          alt: "Hazem next to a slide that asks why it matters",
          caption: "The problem, in one slide",
        },
        {
          ...PHOTO.number,
          alt: "A slide about Egyptian students' mental health",
          caption: "The number that opens the pitch",
        },
        {
          ...PHOTO.pitch,
          alt: "Hazem pitching while press cameras film",
          caption: "Pitching at Startup Power, 2025",
        },
        {
          ...PHOTO.room,
          alt: "A full room watching the pitch",
          caption: "A full room at Startup Haus",
        },
      ],
      links: [
        { label: "Demo Day", href: LINKS.haus.demoDay },
        { label: "Startup Haus interview", href: LINKS.haus.interview },
        { label: "Al Mal on Welmnt", href: LINKS.almal },
      ],
    },

    talks: {
      label: "Talks",
      other: "المحاضرات",
      items: [
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
      facts: [
        { k: "Formats", v: "Talk, hands-on workshop, panel moderation" },
        { k: "Length", v: "Talks of 20 to 40 minutes, workshops up to 2 hours" },
        { k: "Language", v: "Egyptian Arabic" },
      ],
    },

    press: {
      label: "For organizers",
      other: "للمنظّمين",
      line: "Copy a bio, download a photo, or message me with the event, the date and the audience.",
      bios: [
        { label: "Bio in English", lang: "en", text: BIO_EN },
        { label: "النبذة بالعربي", lang: "ar", text: BIO_AR },
      ],
      copy: "Copy",
      copied: "Copied",
      download: "Download",
      photos: [
        {
          label: "Portrait",
          file: "Hazem Abdelghany, portrait.jpg",
          href: SPEAKING_MEDIA.headshot,
        },
        { label: "On stage", file: "Hazem Abdelghany, on stage.jpg", href: SPEAKING_MEDIA.hero },
      ],
    },
    bookTitle: "Book me",
    bookLine: "For talks, workshops and panels. Send the event, the date and the audience.",
    whatsappText: "Hi Hazem, I'd like you to speak at our event: [event, date, audience]",
  },

  ar: {
    role: "متحدّث",
    name: "حازم عبدالغني",
    nameOther: "Hazem Abdelghany",
    statement: "بخلّي الـ AI بسيط، على المسرح، في التلفزيون، وفي قاعة التدريب.",
    bio: "شريك مؤسس والرئيس التنفيذي لـ Catalyst اللي بتعلّم الأفراد والشركات الـ AI. بتكلم زي ما القاعة بتتكلم: بالمصري، على شاشات حقيقية، وبحاجات تجربها بكرة.",
    portraitAlt: "حازم عبدالغني",
    book: "احجزني على WhatsApp",
    pressJump: "النبذة والصور",
    counts: [
      { n: "+60", what: "مرة قدّام جمهور", detail: "تدريبات ومسارح وpanels وتلفزيون، من 2023." },
      { n: "+50", what: "تدريب", detail: "لفرق وشركات وكلاسات مفتوحة." },
      { n: "+10,000", what: "شخص اتدرّبوا على الـ AI", detail: "في كورسات Catalyst وسيشناتها." },
      {
        n: "3",
        what: "مسابقات pitch كسبتها",
        detail: "من 4، منهم CiviConnectors من enpact وStartup Power.",
      },
      { n: "2", what: "لقاءات تلفزيونية", detail: "الشرق Bloomberg وCBC سفرة." },
    ],

    watch: {
      label: "اتفرّج",
      other: "Watch",
      tiktok: {
        name: "TikTok Family Academy مصر",
        sub: "أدرت الـ panel واتكلمت، نوفمبر 2025",
        line: "النسخة التانية، مع TikTok ومدرسة Choueifat الدولية.",
        links: [
          { label: "Identity", href: LINKS.identity },
          { label: "Egyptian Gazette", href: LINKS.gazette },
        ],
      },
      cbc: {
        name: "CBC سفرة، «الأكيل»",
        sub: "مع مراد مكرم، نوفمبر 2023",
        line: "بناء التسويق لبراند أكل، كـ CMO بتاعه.",
        links: [
          { label: "الحلقة كاملة", href: LINKS.cbcEpisode },
          { label: "Instagram", href: LINKS.cbcPost },
        ],
      },
      asharq: {
        name: "الشرق Bloomberg، «ويك اند القاهرة»",
        sub: "مع زينة صفوان، فبراير 2025",
        line: "إزاي الـ AI يعلّم المهارات الحياتية في المدارس.",
        links: [
          { label: "المقطع", href: LINKS.asharqClip },
          { label: "Instagram", href: LINKS.asharqAnnounce },
        ],
      },
    },

    record: {
      label: "اتكلمت فين",
      other: "Where I've spoken",
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
          where: "CiviConnectors Demo Day، Startup Haus القاهرة",
          what: "pitch لـ Welmnt قدّام القاعة ولجنة خبراء",
          links: [{ label: "Startup Haus", href: LINKS.haus.demoDay }],
        },
        {
          when: "سبتمبر 2024",
          where: "ورشة توعية بالسكر، CiviConnectors من enpact",
          what: "قدّمت Welmnt",
          links: [
            { label: "Startup Haus", href: LINKS.haus.workshop },
            { label: "Welmnt", href: LINKS.enpactWorkshop },
          ],
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
          where: "مسابقة أفكار CiviConnectors، enpact × Startup Haus",
          what: "عملت pitch وكسبت: من 6 فرق اتختاروا من 12",
          links: [
            { label: "Startup Haus", href: LINKS.haus.competition },
            { label: "Welmnt", href: LINKS.enpactWin },
          ],
        },
        {
          when: "نوفمبر 2023",
          where: "CBC سفرة، «الأكيل»",
          what: "لقاء تلفزيوني، كـ CMO لبراند أكل",
          links: [
            { label: "الحلقة كاملة", href: LINKS.cbcEpisode },
            { label: "Instagram", href: LINKS.cbcPost },
          ],
        },
      ],
      note: "غير مسابقات pitch تانية وأكتر من 50 تدريب.",
      nextTag: "الجاي",
    },

    room: {
      label: "في القاعة",
      other: "In the room",
      line: "pitches ومحاضرات وورش. في الورشة، كل واحد بيخرج بحاجة شغالة على شغله هو، مش slides.",
      photos: [
        {
          ...PHOTO.stage,
          alt: "حازم على المسرح بالمايك",
          caption: "CiviConnectors Demo Day، Startup Haus القاهرة، 2024",
        },
        {
          ...PHOTO.training,
          alt: "حازم بيقدّم قدّام قاعة",
          caption: "في ورشة CiviConnectors، 2024",
        },
        { ...PHOTO.why, alt: "حازم جنب slide بتسأل ليه ده مهم", caption: "المشكلة في slide واحدة" },
        {
          ...PHOTO.number,
          alt: "slide عن الصحة النفسية للطلاب في مصر",
          caption: "الرقم اللي بيفتح الـ pitch",
        },
        {
          ...PHOTO.pitch,
          alt: "حازم بيعمل pitch والكاميرات بتصوّر",
          caption: "في Startup Power، 2025",
        },
        {
          ...PHOTO.room,
          alt: "قاعة مليانة بتتفرّج على الـ pitch",
          caption: "قاعة مليانة في Startup Haus",
        },
      ],
      links: [
        { label: "الـ Demo Day", href: LINKS.haus.demoDay },
        { label: "لقاء Startup Haus", href: LINKS.haus.interview },
        { label: "جريدة المال عن Welmnt", href: LINKS.almal },
      ],
    },

    talks: {
      label: "المحاضرات",
      other: "Talks",
      items: [
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
      facts: [
        { k: "الشكل", v: "محاضرة، ورشة عملي، إدارة panel" },
        { k: "المدة", v: "محاضرة من 20 لـ 40 دقيقة، ورشة لحد ساعتين" },
        { k: "اللغة", v: "العامية المصرية" },
      ],
    },

    press: {
      label: "للمنظّمين",
      other: "For organizers",
      line: "انسخ نبذة، نزّل صورة، أو ابعتلي اسم الـ event والتاريخ والجمهور.",
      bios: [
        { label: "النبذة بالعربي", lang: "ar", text: BIO_AR },
        { label: "Bio in English", lang: "en", text: BIO_EN },
      ],
      copy: "انسخ",
      copied: "اتنسخ",
      download: "نزّل",
      photos: [
        {
          label: "صورة شخصية",
          file: "Hazem Abdelghany, portrait.jpg",
          href: SPEAKING_MEDIA.headshot,
        },
        { label: "على المسرح", file: "Hazem Abdelghany, on stage.jpg", href: SPEAKING_MEDIA.hero },
      ],
    },
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
