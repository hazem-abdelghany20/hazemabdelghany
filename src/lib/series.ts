export type SeriesKey = "bedrock-and-weather" | "riding-out";

export type SeriesSection = {
  number: string;
  numberAr: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  image: string;
  alt: string;
  startPart: number;
  endPart: number;
};

export type SeriesDef = {
  key: SeriesKey;
  /** URL slug. The landing page is /<slug>/ and is generated, not hand-written. */
  slug: string;
  title: string;
  /** Rendered as the landing-page headline; the middle word takes the accent. */
  titleParts: [string, string, string];
  ar: string;
  category: string;
  categoryAr: string;
  cover: string;
  subtitle: string;
  blurb: string;
  /** Planned length of the finished series, not how many are published yet. */
  parts: number;
  /** Small stat row under the headline. */
  facts: string[];
  /** The front matter: what the reader is walking into. */
  front: { heading: string; body: string[] }[];
  /** Optional lead note, set apart above the front matter. */
  note?: { label: string; body: string[] };
  /** Optional editorial dividers used to group the numbered entries. */
  sections?: SeriesSection[];
  /** The same copy for the Arabic site. */
  titlePartsAr: [string, string, string];
  subtitleAr: string;
  blurbAr: string;
  factsAr: string[];
  frontAr: { heading: string; body: string[] }[];
  noteAr?: { label: string; body: string[] };
};

export const SERIES: Record<SeriesKey, SeriesDef> = {
  "bedrock-and-weather": {
    key: "bedrock-and-weather",
    slug: "bedrock-and-weather",
    title: "The Conditions of Fortune",
    titleParts: ["The", "Conditions", "of Fortune"],
    ar: "شروط الثراء",
    category: "The Wealth Book",
    categoryAr: "كتاب عن الثروة",
    cover: "/images/books/the-conditions-of-fortune.webp",
    subtitle: "What builds wealth, what luck supplies, and what survives the evidence",
    blurb:
      "Ten fortunes taken apart to the mechanism. Five frameworks tested until they broke. And an honest line drawn between what every wealthy person had — and what was only the weather they happened to be standing in.",
    parts: 19,
    facts: [
      "Ten case studies",
      "Five frameworks",
      "Nine invariants tested",
      "For readers starting at zero",
    ],
    note: {
      label: "Before anything else",
      body: [
        "This book was not written by a rich person. That matters, and it cuts both ways.",
        "It means there is no fortune here to sell you, no course at the end, and no incentive to make any particular road look easier than it is. It also means the authority in these pages is borrowed entirely from the public record — annual reports, court filings, proxy statements, tax leaks, and the places where people’s own stories stop matching their own numbers.",
        "So read it as a survey, not a sermon.",
      ],
    },
    front: [
      {
        heading: "Who this is for",
        body: [
          "Someone at or near the beginning. You may be earning well — that is not the same thing — but you do not yet own an asset that grows without you. You are capable, you are willing to work, and what you are missing is not effort but a map.",
          "It is written with particular attention to readers outside the United States and Western Europe, where most of this literature is produced and almost all of it is set. If you are building in a country with a currency that loses value, capital controls, thin local credit and courts you cannot fully rely on, you are not a footnote to the story.",
        ],
      },
      {
        heading: "What it does differently",
        body: [
          "Books in this genre profile successful people and extract lessons. The problem is structural: when you study only winners, every trait they share looks like a cause. A book assembled that way will confidently tell you that all ten of these people were persistent — and never mention the ten thousand equally persistent people you have never heard of.",
          "So this book separates its ten cases into two categories, and the separation is the whole argument. **Bedrock** is what was present in every single case, without exception — candidates for genuine laws, and there are fewer than you would expect. **Weather** is what was present in some and absent in others: inherited money, technical skill, investors, a degree, a product, an audience. Each is disproved as a requirement by at least one person on this list, which means each one is an excuse you are no longer allowed to use.",
          "Every claimed invariant was put through a hostile review whose explicit instruction was to break it. Several broke. Those are reported as broken, with the exception named, because a false law is worse than no law at all.",
        ],
      },
    ],
    titlePartsAr: ["شروط", "الثراء", ""],
    subtitleAr: "إيه اللي بيبني الثروة، وإيه اللي بيجيبه الحظ، وإيه اللي بيصمد قدام الأدلة",
    blurbAr:
      "عشر ثروات اتفكّت لحد الميكانيزم اللي وراها. خمس نظريات اتختبرت لحد ما اتكسرت. وخط صريح مرسوم بين اللي كان عند كل غني فيهم — واللي كان مجرد طقس صادف إنه واقف فيه.",
    factsAr: ["عشر حالات", "خمس نظريات", "تسع ثوابت اتختبرت", "للي بادئ من الصفر"],
    noteAr: {
      label: "قبل أي حاجة",
      body: [
        "الكتاب ده ماكتبهوش واحد غني. ودي حاجة مهمة، وليها وشّين.",
        "معناها إن مفيش هنا ثروة عايز أبيعهالك، ولا كورس في الآخر، ولا أي مصلحة إني أخلّي طريق يبان أسهل من حقيقته. ومعناها كمان إن كل الثقة اللي في الصفحات دي مستلفة بالكامل من السجل العام — تقارير سنوية، وقضايا، وإفصاحات، وتسريبات ضريبية، والأماكن اللي حكايات الناس فيها بتبطّل تطابق أرقامهم هم.",
        "فاقراه على إنه مسح، مش موعظة.",
      ],
    },
    frontAr: [
      {
        heading: "الكتاب ده لمين",
        body: [
          "لحد لسه في البداية أو قريب منها. ممكن تكون بتكسب كويس — ودي حاجة تانية — بس لسه ماعندكش أصل بيكبر من غيرك. إنت قادر، ومستعد تشتغل، واللي ناقصك مش المجهود، اللي ناقصك الخريطة.",
          "ومكتوب باهتمام خاص للقرّاء اللي برّه أمريكا وغرب أوروبا، اللي معظم الكتب دي بتتكتب فيها وتقريبًا كلها بتدور فيها. لو إنت بتبني في بلد عملتها بتفقد قيمتها، وفيها قيود على حركة الفلوس، وائتمان محلي ضعيف، ومحاكم مش قادر تعتمد عليها بالكامل، فإنت مش هامش في الحكاية.",
        ],
      },
      {
        heading: "بيعمل إيه بشكل مختلف",
        body: [
          "كتب النوع ده بتحكي عن ناس ناجحة وتطلّع منهم دروس. المشكلة في الطريقة نفسها: لما تدرس الكسبانين بس، كل صفة مشتركة بينهم بتبان كأنها السبب. كتاب متجمّع بالشكل ده هيقولك بثقة إن العشرة دول كانوا كلهم مثابرين — ومش هيجيب سيرة العشر آلاف اللي كانوا مثابرين بنفس القدر وعمرك ما سمعت عنهم.",
          "عشان كده الكتاب ده بيقسم حالاته العشرة لنوعين، والتقسيم ده هو الحجة كلها. **الصخر** هو اللي كان موجود في كل حالة من غير استثناء — مرشحين يبقوا قوانين حقيقية، وهما أقل بكتير مما تتوقع. **الطقس** هو اللي كان موجود عند ناس ومش موجود عند ناس: فلوس موروثة، مهارة تقنية، مستثمرين، شهادة، منتج، جمهور. كل واحدة فيهم في شخص واحد على الأقل في اللستة بيثبت إنها مش شرط، يعني كل واحدة فيهم عذر مابقاش مسموحلك تستخدمه.",
          "كل ثابت اتقال عليه اتعرض لمراجعة عدائية تعليماتها الصريحة إنها تكسره. كذا واحد اتكسر. ودول مكتوب إنهم اتكسروا، ومعاهم الاستثناء بالاسم، لأن القانون الغلط أوحش من مفيش قانون خالص.",
        ],
      },
    ],
  },

  "riding-out": {
    key: "riding-out",
    slug: "riding-out",
    title: "The Effort Is Yours",
    titleParts: ["The Effort", "Is Yours", ""],
    ar: "عليكَ السعي",
    category: "The Life Book",
    categoryAr: "كتاب عن الحياة",
    cover: "/images/books/the-effort-is-yours.webp",
    subtitle: "How to live fully when the outcome was never yours to control",
    blurb:
      "An 11th-century man with lice, a sword and a 35-year life expectancy may have been happier than you. Same goals, harsher life, fewer distractions. If happiness were downstream of comfort, he loses on every axis. He doesn’t. This book is about what it is downstream of instead.",
    parts: 28,
    facts: ["Five parts", "Twenty-five chapters", "Effort is yours, output isn’t", "Draft — v0.1"],
    sections: [
      {
        number: "I",
        numberAr: "الأول",
        title: "The Armory",
        titleAr: "العُدّة",
        subtitle: "What you have · the next hour · near-total control",
        subtitleAr: "اللي في إيدك · الساعة الجاية · سيطرة شبه كاملة",
        image: "/images/books/the-effort-is-yours-parts/part-1-armory.webp",
        alt: "A lone knight preparing his equipment in a quiet armory at dawn",
        startPart: 2,
        endPart: 8,
      },
      {
        number: "II",
        numberAr: "التاني",
        title: "The Drill",
        titleAr: "التدريب",
        subtitle: "How to use it · the day · high control",
        subtitleAr: "تستخدمها إزاي · اليوم · سيطرة كبيرة",
        image: "/images/books/the-effort-is-yours-parts/part-2-drill.webp",
        alt: "A lone knight practicing a deliberate sword drill in a stone yard at dawn",
        startPart: 9,
        endPart: 12,
      },
      {
        number: "III",
        numberAr: "التالت",
        title: "The Campaign",
        titleAr: "الحملة",
        subtitle: "The season · partial control",
        subtitleAr: "الموسم · سيطرة جزئية",
        image: "/images/books/the-effort-is-yours-parts/part-3-campaign.webp",
        alt: "A traveler studying a map where mountain roads divide beneath a distant citadel",
        startPart: 13,
        endPart: 16,
      },
      {
        number: "IV",
        numberAr: "الرابع",
        title: "The Fog",
        titleAr: "الضباب",
        subtitle: "The lifetime · low control",
        subtitleAr: "العُمر · سيطرة قليلة",
        image: "/images/books/the-effort-is-yours-parts/part-4-fog.webp",
        alt: "A traveler holding a small lamp where two mountain paths disappear into fog",
        startPart: 17,
        endPart: 20,
      },
      {
        number: "V",
        numberAr: "الخامس",
        title: "The Knights Who Don’t Come Back",
        titleAr: "الفرسان اللي ما بيرجعوش",
        subtitle: "Fate · zero control",
        subtitleAr: "القدر · مفيش سيطرة",
        image: "/images/books/the-effort-is-yours-parts/part-5-knights.webp",
        alt: "A lone rider continuing toward the horizon past the equipment of absent travelers",
        startPart: 21,
        endPart: 26,
      },
    ],
    note: {
      label: "A note before we start",
      body: [
        "I wrote this book for one reader: me, a few years ago. If you are under thirty, trying hard at something, and quietly afraid the trying won’t pay — it is also for you.",
        "I am not a scholar, a monk, or a retired billionaire. I am an operator in Cairo running businesses that sometimes work, with a body that broke once and a faith I hold onto without pretending it makes life painless. Everything in here has been tested on me first. Where I borrow an idea, I say from whom. Where I tell a story, it happened.",
      ],
    },
    front: [
      {
        heading: "The argument",
        body: [
          "You own your effort and nothing else. Not the outcome, not the timing, not who notices. That sounds like a loss until you work out what it frees you from — and this book is about how to make it enough.",
          "The structure zooms out one notch per part: the session, the day, the season, the lifetime, and then fate. Control drains as it goes. The knight starts the book holding a sword and ends it holding nothing.",
        ],
      },
      {
        heading: "The permission slip",
        body: [
          "You are made of material that changes. Not an ability — some have more of those — but a property, issued to everyone. It is the one place in the whole book where the world is fair: same tools, same trainability, given out to all comers.",
          "Fair at the input. Unfair at the output. Live at the input.",
        ],
      },
    ],
    titlePartsAr: ["عليكَ", "السعي", ""],
    subtitleAr: "إزاي تعيش بكل قلبك لما النتيجة عمرها ما كانت في إيدك",
    blurbAr:
      "راجل من القرن الحداشر، معاه سيف وقمل ومتوسط عمر 35 سنة، ممكن يكون كان أسعد منك. نفس الأهداف، حياة أقسى، ومشتتات أقل. لو السعادة بتيجي من الراحة، يبقى هو خسران في كل حاجة. بس هو مش خسران. الكتاب ده عن الحاجة اللي السعادة بتيجي منها بجد.",
    factsAr: ["خمس أجزاء", "خمسة وعشرين فصل", "المجهود في إيدك، النتيجة لأ", "مسودة — v0.1"],
    noteAr: {
      label: "كلمة قبل ما نبدأ",
      body: [
        "كتبت الكتاب ده لقارئ واحد: أنا، من كام سنة. لو إنت تحت التلاتين، وبتحاول جامد في حاجة، وخايف في سرّك إن المحاولة ماتجيبش همّها — فهو ليك إنت كمان.",
        "أنا مش عالم، ولا راهب، ولا ملياردير متقاعد. أنا واحد شغّال في القاهرة بيدير شركات ساعات بتنجح، بجسم اتكسر مرة، وبإيمان ماسك فيه من غير ما أدّعي إنه بيخلّي الحياة من غير وجع. كل حاجة هنا اتجربت عليّا الأول. لما آخد فكرة من حد، بقول من مين. ولما أحكي حكاية، فهي حصلت.",
      ],
    },
    frontAr: [
      {
        heading: "الفكرة",
        body: [
          "إنت ماتملكش غير مجهودك. لا النتيجة، ولا التوقيت، ولا مين هياخد باله. ده بيبان خسارة لحد ما تفهم هو بيحررك من إيه — والكتاب ده عن إزاي تخلّيه كفاية.",
          "البنية بتبعد خطوة لورا مع كل جزء: الجلسة، واليوم، والموسم، والعمر، وبعدين القدر. والسيطرة بتقل مع كل خطوة. الفارس بيبدأ الكتاب ماسك سيف، وبيخلّصه وإيده فاضية.",
        ],
      },
      {
        heading: "الإذن",
        body: [
          "إنت معمول من مادة بتتغيّر. مش موهبة — في ناس عندها أكتر — لكن خاصية، متوزعة على الكل. ده المكان الوحيد في الكتاب كله اللي الدنيا فيه عادلة: نفس الأدوات، ونفس القابلية للتدريب، متوزعة على أي حد.",
          "عادلة في اللي داخل. ظالمة في اللي طالع. عيش في اللي داخل.",
        ],
      },
    ],
  },
};

export const seriesDef = (key: SeriesKey) => SERIES[key];
export const seriesHref = (key: SeriesKey) => `/${SERIES[key].slug}/`;
