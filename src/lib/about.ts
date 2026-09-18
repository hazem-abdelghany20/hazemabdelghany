/* Copy for the About page (/about/ and /ar/about/). Same structure in both
   languages; AboutPage renders whichever the route asks for. */

/** The page exists in both languages; each edition points at the other. */
export const aboutAlternates = [
  { lang: "en", href: "/about/" },
  { lang: "ar-EG", href: "/ar/about/" },
  { lang: "x-default", href: "/about/" },
];

type Mark = { src: string; label: string; width: number; height: number };

export type AboutCopy = {
  title: string;
  titleOther: string;
  shortLabel: string;
  statement: string;
  note: string;
  storyLabel: string;
  storyOther: string;
  story: string[];
  quote: string;
  timelineLabel: string;
  timelineOther: string;
  timeline: { year: string; mark?: Mark; title: string; body: string[] }[];
  threadsLabel: string;
  threadsOther: string;
  threads: { number: string; name: string; secondary: string; href: string; body: string }[];
  beliefsLabel: string;
  beliefsOther: string;
  beliefs: string[];
  closingLabel: string;
  closingOther: string;
  closing: string[];
};

const marks = {
  ischool: { src: "/work/ischool.png", label: "iSchool", width: 105, height: 30 },
  welmnt: { src: "/work/welmnt.svg", label: "Welmnt", width: 42, height: 40 },
  catalyst: { src: "/work/catalyst.svg", label: "Catalyst", width: 121, height: 29 },
  astraform: {
    src: "/work/astraform.png",
    label: "AstraForm Technologies",
    width: 157,
    height: 36,
  },
} satisfies Record<string, Mark>;

export const english: AboutCopy = {
  title: "About",
  titleOther: "عنّي",
  shortLabel: "The short version",
  statement: `I’m Hazem Abdelghany—a builder from Cairo trying to build companies, a strong body, a disciplined mind, and a life anchored by faith.`,
  note: `I studied computer engineering, started my career teaching, and gradually found my way into software, product design, AI, and entrepreneurship. Today, most of my work sits somewhere between technology and education—but this site is about the whole picture, not only the professional one.`,
  storyLabel: "The longer version",
  storyOther: "الحكاية",
  story: [
    `Before I was building companies, I was teaching.`,
    `Teaching forced me to do something I still value today: understand an idea deeply enough to make it useful to someone else. It showed me that knowing something and communicating it are completely different skills.`,
    `From there, I moved into web development. At first, the projects were small: a course website, freelance work, and whatever gave me a real problem to solve. Each project pulled me further away from simply learning technology and closer to using it to build things people could actually depend on.`,
    `Over time, the questions became larger.`,
    `How should students learn technical skills? How can schools support the person behind the grades? What happens when AI allows a small, ambitious team to build at a scale that previously required an entire company?`,
    `Those questions eventually became products, companies, courses, and experiments. They also became the five threads running through this site: building, faith, the body, the mind, and perspective.`,
  ],
  quote: `They might look like separate interests. To me, they are different sides of the same project: building a life deliberately.`,
  timelineLabel: "The road so far",
  timelineOther: "الطريق لحد دلوقتي",
  timeline: [
    {
      year: "2022",
      title: "Teaching came first",
      body: [
        `While finishing computer software engineering at the German University in Cairo, I began working as a mathematics tutor.`,
        `It was my first sustained experience of taking something complex, finding the idea underneath it, and helping another person see it clearly. That instinct—to understand, simplify, and teach—would keep appearing in nearly everything I built afterward.`,
        `Later that year, I created an online-course website for Dr. Walaa Elgammal and began working independently as a freelance web developer. This was the year I moved from studying systems to building real ones.`,
      ],
    },
    {
      year: "2023",
      mark: marks.ischool,
      title: "From lessons to products",
      body: [
        `I joined iSchool as a software programming instructor, teaching young students how to code. At the same time, I taught mathematics remotely through Continuous Education Academy and continued taking on freelance development work.`,
        `I also spent time working in marketing. That widened my view of building: good technology is not enough. You also need to understand people, communicate value, and make something fit naturally into their lives.`,
        `What looked like several unrelated jobs was really one education—technology, teaching, communication, and human behavior all happening at once.`,
      ],
    },
    {
      year: "2024",
      mark: marks.welmnt,
      title: "Building for the mind",
      body: [
        `I started leading Welmnt, an AI-powered platform focused on student mental health and emotional well-being.`,
        `The work brought several parts of my life together: education, psychology, technology, and product building. It also forced me to think beyond academic achievement. A student can perform well on paper while struggling internally, and most schools are not equipped to see or support that struggle.`,
        `The deeper question became: how can we use technology without losing sight of the human being it is supposed to serve?`,
      ],
    },
    {
      year: "2025",
      mark: marks.catalyst,
      title: "Catalyst",
      body: [
        `I became CEO of Catalyst.`,
        `Catalyst grew from an idea into a technology-education company helping professionals across Egypt and the Arab world learn software engineering and AI in Arabic. The aim is practical: help people learn faster, build smarter, and compete globally.`,
        `Courses in backend engineering, AI for developers, and no-code AI began reaching thousands of students. But Catalyst is not only a course business. It is an attempt to build the kind of technical education I believe should exist—direct, useful, ambitious, and connected to real work.`,
      ],
    },
    {
      year: "2026",
      mark: marks.astraform,
      title: "Building with leverage",
      body: [
        `I joined AstraForm Technologies as CTO while continuing to lead Catalyst and build software across different industries.`,
        `By this point, AI had changed how I worked completely. I no longer saw it as a tool sitting beside the work. It became part of the way I think, design, code, research, and operate.`,
        `I now build almost everything with agentic AI—not to remove myself from the process, but to spend more of my time on judgment, direction, and the problems worth solving. This is still the beginning of that chapter.`,
      ],
    },
  ],
  threadsLabel: "Five threads, one life",
  threadsOther: "الخيوط الخمسة",
  threads: [
    {
      number: "01",
      name: "Building",
      secondary: "البناء",
      href: "/threads/building/",
      body: `Building is how I turn questions into something testable. Companies, products, courses, software, and personal systems are all versions of the same act: imagining that something could work better, then accepting responsibility for making it real.`,
    },
    {
      number: "02",
      name: "Faith",
      secondary: "الإيمان",
      href: "/threads/faith/",
      body: `Faith is the anchor everything else hangs on. It gives ambition its boundaries, difficulty its meaning, and time its proper scale.`,
    },
    {
      number: "03",
      name: "Body",
      secondary: "الجسد",
      href: "/threads/body/",
      body: `Training teaches honesty. The weight moves or it doesn’t. The body adapts or it doesn’t. Rebuilding after an ACL injury has made patience, recovery, and limitation more real to me than motivation ever could.`,
    },
    {
      number: "04",
      name: "Mind",
      secondary: "العقل",
      href: "/threads/mind/",
      body: `I’m interested in psychology, attention, emotional health, and the stories people construct about themselves. The mind shapes every experience, but it is often the part of life we understand least.`,
    },
    {
      number: "05",
      name: "Perspective",
      secondary: "النظرة",
      href: "/threads/perspective/",
      body: `Facts matter, but the frame around them matters too. Perspective is where I explore the assumptions beneath how we work, live, succeed, and decide what is enough.`,
    },
  ],
  beliefsLabel: "Things I believe",
  beliefsOther: "اللي مؤمن بيه",
  beliefs: [
    "Faith should constrain ambition, not decorate it.",
    "Technology should make people more capable, not more passive.",
    "A strong body changes the experience of having a mind.",
    "Teaching is one of the fastest ways to discover what you do not understand.",
    "AI should increase the amount of yourself in your work—not remove it.",
    "A good system creates freedom. A bad one turns life into administration.",
    "Most meaningful things take longer than the internet makes them appear to.",
  ],
  closingLabel: "Why this site exists",
  closingOther: "ليه المكان ده؟",
  closing: [
    `The internet encourages everyone to become one clear, marketable thing.`,
    `I’m not very interested in doing that.`,
    `My work in AI affects how I think about education. Teaching affects how I build products. Faith affects how I define success. Injury affects how I understand patience. Psychology affects how I lead, work, and relate to people.`,
    `This site is where those parts are allowed to exist together.`,
    `Some pieces are written in English. Others belong naturally in Egyptian Arabic. Some will become books; others may remain unfinished thoughts.`,
    `The language changes. The questions are the same.`,
  ],
};

export const arabic: AboutCopy = {
  title: "عنّي",
  titleOther: "About",
  shortLabel: "المختصر",
  statement: `أنا حازم عبدالغني—بنّاء من القاهرة بحاول أبني شركات، وجسم قوي، وعقل منضبط، وحياة أساسها الإيمان.`,
  note: `درست هندسة الكمبيوتر، وبدأت حياتي المهنية بالتدريس، وبعدها لقيت طريقي بالتدريج للبرمجيات وتصميم المنتجات والذكاء الاصطناعي وريادة الأعمال. دلوقتي أغلب شغلي موجود في المساحة ما بين التكنولوجيا والتعليم—بس الموقع ده عن الصورة كاملة، مش عن الشغل بس.`,
  storyLabel: "الحكاية كاملة",
  storyOther: "The longer version",
  story: [
    `قبل ما أبني شركات، كنت بعلّم.`,
    `التدريس خلّاني أعمل حاجة لسه مهمة بالنسبالي لحد النهارده: أفهم الفكرة بعمق كفاية عشان أعرف أخليها مفيدة لحد تاني. واتعلمت إن إنك تعرف حاجة، وإنك تعرف توصلها، مهارتين مختلفتين تمامًا.`,
    `من هنا دخلت عالم تطوير الويب. في الأول كانت المشاريع صغيرة: موقع لكورس، شغل حر، وأي مشروع يحطني قدام مشكلة حقيقية محتاجة حل. كل مشروع كان بيبعدني خطوة عن مجرد تعلّم التكنولوجيا، ويقربني من استخدامها في بناء حاجات ناس فعلًا تعتمد عليها.`,
    `ومع الوقت، الأسئلة كبرت.`,
    `إزاي المفروض الناس تتعلم المهارات التقنية؟ إزاي المدارس تدعم الإنسان اللي ورا الدرجات؟ وإيه اللي يحصل لما الذكاء الاصطناعي يدي فريق صغير وطموح قدرة بناء كانت زمان محتاجة شركة كاملة؟`,
    `الأسئلة دي اتحولت مع الوقت لمنتجات وشركات وكورسات وتجارب. وهي كمان بقت الخيوط الخمسة اللي ماشية في الموقع ده: البناء، والإيمان، والجسد، والعقل، والنظرة.`,
  ],
  quote: `ممكن يبانوا اهتمامات منفصلة. بالنسبالي، هما جوانب مختلفة من نفس المشروع: إني أبني حياة عن قصد.`,
  timelineLabel: "الطريق لحد دلوقتي",
  timelineOther: "The road so far",
  timeline: [
    {
      year: "2022",
      title: "البداية كانت بالتدريس",
      body: [
        `وأنا بكمّل دراسة هندسة البرمجيات في الجامعة الألمانية بالقاهرة، بدأت أشتغل مدرّس رياضيات.`,
        `دي كانت أول تجربة مستمرة ليا مع إني آخد حاجة معقدة، أوصل للفكرة اللي تحتها، وأساعد شخص تاني يشوفها بوضوح. الغريزة دي—إني أفهم، وأبسّط، وأعلّم—فضلت تظهر بعد كده في تقريبًا كل حاجة بنيتها.`,
        `وفي آخر السنة عملت موقع كورسات أونلاين للدكتورة ولاء الجمال، وبدأت أشتغل بشكل مستقل كمطوّر ويب. دي كانت السنة اللي انتقلت فيها من دراسة الأنظمة لبناء أنظمة حقيقية.`,
      ],
    },
    {
      year: "2023",
      mark: marks.ischool,
      title: "من الشرح للمنتجات",
      body: [
        `انضمّيت لـ iSchool كمدرّس برمجة، وكنت بعلّم طلبة صغيرين إزاي يكتبوا كود. وفي نفس الوقت كنت بدرس رياضيات عن بُعد مع Continuous Education Academy، وكملت شغلي الحر في تطوير الويب.`,
        `واشتغلت كمان فترة في التسويق. التجربة دي وسّعت فكرتي عن البناء: التكنولوجيا الكويسة لوحدها مش كفاية. لازم تفهم الناس، وتعرف توصل القيمة، وتخلي اللي بتبنيه يدخل حياتهم بشكل طبيعي.`,
        `الشغلانات اللي كانت باينة متفرقة كانت في الحقيقة تعليم واحد: تكنولوجيا، وتدريس، وتواصل، وسلوك بشري—كلهم بيحصلوا في نفس الوقت.`,
      ],
    },
    {
      year: "2024",
      mark: marks.welmnt,
      title: "بناء يهتم بالعقل",
      body: [
        `بدأت أقود Welmnt، وهي منصة مدعومة بالذكاء الاصطناعي وتركّز على الصحة النفسية والرفاه العاطفي للطلبة.`,
        `الشغل جمع أجزاء كتير من حياتي: التعليم، وعلم النفس، والتكنولوجيا، وبناء المنتجات. وخلّاني أفكر أبعد من التفوق الدراسي. ممكن طالب يكون ناجح جدًا على الورق وهو بيعاني من جوّه، ومعظم المدارس مش مجهّزة إنها تشوف المعاناة دي أو تدعمها.`,
        `السؤال الأعمق بقى: إزاي نستخدم التكنولوجيا من غير ما ننسى الإنسان اللي المفروض تخدمه؟`,
      ],
    },
    {
      year: "2025",
      mark: marks.catalyst,
      title: "كاتاليست",
      body: [
        `بقيت الرئيس التنفيذي لـ Catalyst.`,
        `Catalyst كبرت من فكرة لشركة تعليم تكنولوجي بتساعد المحترفين في مصر والعالم العربي يتعلموا هندسة البرمجيات والذكاء الاصطناعي بالعربي. الهدف عملي: الناس تتعلم أسرع، وتبني أذكى، وتنافس عالميًا.`,
        `كورسات الباك إند والذكاء الاصطناعي للمطورين والـ no-code AI بدأت توصل لآلاف الطلبة. لكن Catalyst مش مجرد شركة كورسات؛ هي محاولة لبناء نوع التعليم التقني اللي مؤمن إنه لازم يكون موجود—مباشر، ومفيد، وطموح، ومتصل بالشغل الحقيقي.`,
      ],
    },
    {
      year: "2026",
      mark: marks.astraform,
      title: "بناء بقوة مضاعفة",
      body: [
        `انضمّيت لـ AstraForm Technologies كمدير تقني، مع استمراري في قيادة Catalyst وبناء برمجيات في مجالات مختلفة.`,
        `في الوقت ده كان الذكاء الاصطناعي غيّر طريقة شغلي بالكامل. ما بقيتش شايفه أداة جنب الشغل؛ بقى جزء من طريقة تفكيري وتصميمي وكتابتي للكود وبحثي وإدارتي.`,
        `دلوقتي ببني تقريبًا كل حاجة بمساعدة وكلاء الذكاء الاصطناعي—مش عشان أشيل نفسي من العملية، لكن عشان أحط وقت أكبر في الحكم والتوجيه والمشاكل اللي فعلًا تستاهل تتحل. ولسه الفصل ده في أوله.`,
      ],
    },
  ],
  threadsLabel: "خمس خيوط، حياة واحدة",
  threadsOther: "Five threads, one life",
  threads: [
    {
      number: "01",
      name: "البناء",
      secondary: "Building",
      href: "/threads/building/",
      body: `البناء هو طريقتي في تحويل الأسئلة لحاجة ينفع نجربها. الشركات والمنتجات والكورسات والبرمجيات والأنظمة الشخصية كلها أشكال لنفس الفعل: تتخيل إن في حاجة ممكن تشتغل أحسن، وبعدها تتحمّل مسؤولية إنك تخليها حقيقية.`,
    },
    {
      number: "02",
      name: "الإيمان",
      secondary: "Faith",
      href: "/threads/faith/",
      body: `الإيمان هو المرساة اللي كل حاجة تانية متعلقة بيها. بيدي الطموح حدوده، والصعوبة معناها، والوقت حجمه الحقيقي.`,
    },
    {
      number: "03",
      name: "الجسد",
      secondary: "Body",
      href: "/threads/body/",
      body: `التمرين بيعلّم الصراحة. يا الوزن بيتحرّك يا لأ. يا الجسم بيتكيّف يا لأ. والرجوع بعد إصابة الرباط الصليبي علّمني عن الصبر والتعافي والحدود أكتر بكتير من أي كلام عن التحفيز.`,
    },
    {
      number: "04",
      name: "العقل",
      secondary: "Mind",
      href: "/threads/mind/",
      body: `مهتم بعلم النفس، والانتباه، والصحة العاطفية، والحكايات اللي الناس بتبنيها عن نفسها. العقل بيشكّل كل تجربة، ومع ذلك غالبًا هو أقل جزء في حياتنا بنفهمه.`,
    },
    {
      number: "05",
      name: "النظرة",
      secondary: "Perspective",
      href: "/threads/perspective/",
      body: `الحقائق مهمة، لكن الإطار اللي حواليها مهم هو كمان. هنا بستكشف الافتراضات اللي تحت طريقتنا في الشغل والعيش والنجاح وتحديد إمتى يكون اللي عندنا كفاية.`,
    },
  ],
  beliefsLabel: "اللي مؤمن بيه",
  beliefsOther: "Things I believe",
  beliefs: [
    "الإيمان لازم يحط حدود للطموح، مش يبقى مجرد زينة حواليه.",
    "التكنولوجيا المفروض تخلي الناس أقدر، مش أكثر اعتمادًا عليها.",
    "الجسم القوي بيغيّر تجربة إنك تعيش بعقل.",
    "التدريس من أسرع الطرق اللي تكتشف بيها إيه اللي لسه مش فاهمه.",
    "الذكاء الاصطناعي المفروض يزوّد حضورك في شغلك، مش يمسحه.",
    "النظام الكويس بيخلق حرية. النظام السيئ بيحوّل الحياة لإدارة مستمرة.",
    "أغلب الحاجات اللي ليها معنى بتاخد وقت أطول بكتير من اللي الإنترنت بيخلّيه يبان.",
  ],
  closingLabel: "ليه المكان ده موجود؟",
  closingOther: "Why this site exists",
  closing: [
    `الإنترنت بيشجّع كل واحد يبقى حاجة واحدة واضحة وسهلة التسويق.`,
    `أنا مش مهتم أعمل كده.`,
    `شغلي في الذكاء الاصطناعي بيأثر على تفكيري في التعليم. التدريس بيأثر على طريقة بنائي للمنتجات. الإيمان بيأثر على تعريفي للنجاح. الإصابة بتأثر على فهمي للصبر. وعلم النفس بيأثر على قيادتي وشغلي وعلاقتي بالناس.`,
    `الموقع ده هو المكان اللي الأجزاء دي مسموح لها تعيش فيه مع بعض.`,
    `في حاجات مكتوبة بالإنجليزي، وحاجات مكانها الطبيعي المصري. بعضها ممكن يبقى كتب، وبعضها ممكن يفضل أفكار ما اكتملتش.`,
    `اللغة بتتغيّر. الأسئلة هي هي.`,
  ],
};
