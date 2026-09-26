/** `$ cat tools.txt`: the tools I actually use, with one honest line each.
 *  `often` is 3 = daily, 2 = weekly, 1 = monthly. Keep it true: a tool I
 *  stopped using comes off the list rather than getting a kinder line. */
export const AI_TOOLS: { name: string; often: 1 | 2 | 3; en: string; ar: string }[] = [
  {
    name: "Claude Code",
    often: 3,
    en: "Where my software gets built. I write the spec, it writes the code, I review.",
    ar: "هنا الـ software بتاعي بيتبني. أنا بكتب الـ spec، هو بيكتب الكود، وأنا براجع.",
  },
  {
    name: "Claude",
    often: 3,
    en: "Thinking out loud, writing, and the first draft of almost everything.",
    ar: "بفكّر معاه بصوت عالي، وبكتب، وأول draft لأغلب الحاجات.",
  },
  {
    name: "Supabase",
    often: 3,
    en: "The database behind Catalyst and Mental Diet. Boring, the good kind.",
    ar: "الـ database اللي ورا Catalyst و Mental Diet. ممل، بس الملل الحلو.",
  },
  {
    name: "ChatGPT",
    often: 2,
    en: "Images and a quick second opinion. Not where I build.",
    ar: "للصور ولرأي تاني سريع. مش المكان اللي ببني فيه.",
  },
  {
    name: "NotebookLM",
    often: 2,
    en: "Turns a pile of sources into something I can question.",
    ar: "بيحوّل كوم مصادر لحاجة أقدر أسألها.",
  },
  {
    name: "ElevenLabs",
    often: 2,
    en: "My cloned voice, for drafts and dubbing.",
    ar: "صوتي المستنسخ، للـ drafts والدوبلاج.",
  },
  {
    name: "Remotion",
    often: 2,
    en: "Video as code. Our reels and ad edits render from React.",
    ar: "الفيديو ككود. الـ reels والإعلانات بتاعتنا بتطلع من React.",
  },
  {
    name: "Lovable",
    often: 1,
    en: "Gets a UI to a first draft fast. This site started there.",
    ar: "بيطلّع أول draft لأي UI بسرعة. الموقع ده بدأ من هناك.",
  },
];

export const oftenLabel = (often: 1 | 2 | 3, ar: boolean) =>
  ar
    ? (["", "كل شهر", "كل أسبوع", "كل يوم"] as const)[often]
    : (["", "monthly", "weekly", "daily"] as const)[often];
