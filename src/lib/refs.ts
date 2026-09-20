/* ---------- Side reading ----------
   A term, a book or a person named in the main text can carry a marker. The
   marker shows a one-line gloss on hover and opens a panel on click, so the
   digression sits beside the argument instead of interrupting it.

   Add an entry here, then mark it up in the prose as:
     <button class="ref" data-ref="KEY">the words in the sentence</button>
   The panel is assembled at build time from this file. */

export type RefKind = "person" | "book" | "term";

export type RefDef = {
  kind: RefKind;
  /** Panel headline. */
  title: string;
  /** Second line: dates, role, publication — whatever identifies it fast. */
  meta: string;
  /** One sentence, shown in the hover tooltip. Must stand alone. */
  tagline: string;
  image?: { src: string; alt: string; credit?: string };
  /** Panel body. Raw HTML, one string per paragraph. */
  body: string[];
  /** Optional "if you read one thing" line at the foot of the panel. */
  start?: string;
};

export const REFS: Record<string, RefDef> = {
  /* ============================ PEOPLE ============================ */

  csikszentmihalyi: {
    kind: "person",
    title: "Mihaly Csikszentmihalyi",
    meta: "Psychologist · 1934–2021 · Fiume → Chicago",
    image: {
      src: "/refs/csikszentmihalyi.jpg",
      alt: "Mihaly Csikszentmihalyi",
      credit:
        'Photo: Ehirsh, public domain, via <a href="https://commons.wikimedia.org/wiki/File:Mihaly_Csikszentmihalyi.jpg" rel="noopener">Wikimedia Commons</a>.',
    },
    tagline:
      "The Hungarian psychologist who spent fifty years asking when people are actually happy, and found the answer was: while working hard at something difficult.",
    body: [
      "<em>Chick-sent-me-high.</em> Everyone gets there eventually.",
      "He was born in 1934 in Fiume, an Adriatic port that was Italian at the time and is Croatian now — the kind of birthplace that tells you a century is about to happen to a family. His father was a Hungarian diplomat. The war took two of his brothers; one died fighting, one vanished into a Soviet labour camp. At ten he was interned in an Italian prison camp. At sixteen, out of school and working in a hotel to feed the family, he wandered into a lecture in Zurich given by Carl Jung on what the war had done to the European psyche. He had gone in for the free room heating. He came out having decided psychology was where the important question lived.",
      "The question he had was not academic. He had watched adults he respected — people with money, jobs, standing — fall apart completely when the war stripped those things away, and he had watched a few unremarkable people stay whole. <strong>What were the whole ones running on?</strong>",
      "He emigrated to the United States at twenty-two with about a dollar in his pocket, worked nights, put himself through the University of Chicago, and stayed there for most of his career. His method was the part that made him unusual. Rather than ask people at the end of the week how happy they had been — a question memory is terrible at — he gave them pagers. At random moments, eight times a day, the pager went off and the subject wrote down what they were doing and precisely how they felt. He did this with factory workers, surgeons, rock climbers, chess players, Korean grandmothers, Navajo shepherds and Chicago teenagers, and collected something on the order of a hundred thousand of these snapshots. It is called the Experience Sampling Method, he invented it, and it is now standard equipment in the field.",
      "The data said something nobody was expecting, and it has held up. People were <em>not</em> happiest while relaxing. Leisure — the thing the whole economy is arranged to sell — produced surprisingly flat, low-grade states. The peaks came at work, and specifically during hard work: a task difficult enough to demand everything they had, but not so difficult that they were drowning, with clear goals and immediate feedback on whether they were doing it right. In that state people reported losing track of time, losing self-consciousness, and afterwards described the experience as the best of their lives. They also reported it as effortful. The two were not in conflict.",
      "He named the state <strong>flow</strong>, after the word his subjects kept reaching for unprompted — <em>it was like being carried by a current</em>. The word is now so worn out by productivity blogs that it is easy to forget it came out of a hundred thousand pager pings and a man who had watched civilisation come apart and wanted to know what held a person together.",
      "The idea that matters even more for this book is the one underneath it. He argued that consciousness has a default failure mode he called <strong>psychic entropy</strong> — disorder, the steady intrusion of information that conflicts with what you are trying to do. Worry, envy, resentment, boredom. Attention is the energy that has to be spent to hold this at bay, and it is strictly finite. Flow is simply what it looks like when attention is so completely committed that there is none spare for the disorder to run on.",
      "He kept working until he died in 2021, at eighty-seven. His last years were spent on the uncomfortable half of his own finding: flow is morally neutral. A surgeon gets it. So does a burglar, and so does a sniper. It tells you how to be fully alive in an activity. It will not tell you which activity deserves you.",
    ],
    start: "Start with <em>Flow</em> (1990). Chapters 2 and 3 carry the whole argument.",
  },

  frankl: {
    kind: "person",
    title: "Viktor Frankl",
    meta: "Psychiatrist · 1905–1997 · Vienna",
    image: {
      src: "/refs/frankl.jpg",
      alt: "Viktor Frankl",
      credit:
        'Photo: Prof. Dr. Franz Vesely, <a href="https://creativecommons.org/licenses/by-sa/3.0/de/deed.en" rel="noopener">CC BY-SA 3.0 DE</a>, via Wikimedia Commons.',
    },
    tagline:
      "Viennese psychiatrist who survived four Nazi camps and argued that a person can be stripped of everything except the choice of how to meet it.",
    body: [
      "He was a practising psychiatrist in Vienna — head of the suicide-prevention ward at the city hospital, where he treated some thirty thousand women at risk of taking their own lives — before he was one of the people the Nazis came for.",
      "In 1942 he was deported with his wife and parents. Over three years he was held in four camps, including Auschwitz. His wife, his mother, his father and his brother were all killed. The manuscript of the book he had been writing was destroyed at intake; he reconstructed it on scraps of stolen paper.",
      "He wrote <em>Man's Search for Meaning</em> in nine days after the war, and originally published it anonymously. Its claim is narrow and very hard: the prisoners who survived best were not the strongest or the most optimistic — false optimism killed people on schedule, and he watched the death rate spike after Christmas 1944 when a widely held hope of liberation by year's end failed to arrive. What sustained people was having something outstanding that still required them. A book to finish. A child who might be alive. Work waiting.",
      '"Everything can be taken from a man but one thing: the last of the human freedoms — to choose one\'s attitude in any given set of circumstances." It is the most quoted line in self-help and it was not written by someone comfortable.',
    ],
    start:
      "<em>Man's Search for Meaning</em> — half memoir, half clinical argument, about 150 pages.",
  },

  lembke: {
    kind: "person",
    title: "Anna Lembke",
    meta: "Psychiatrist · Stanford · b. 1967",
    tagline:
      "Stanford addiction psychiatrist whose central claim is that pleasure and pain are processed on the same balance — so chasing one reliably buys the other.",
    body: [
      "She runs the dual-diagnosis addiction clinic at Stanford and spent years as an expert witness in opioid litigation, which is where the book came from: she had a front-row seat on how a legitimate medical system manufactured mass dependence.",
      "The mechanism she popularised is not hers — it is standard neuroscience — but the framing is. Pleasure and pain are processed in overlapping brain circuits and work like a balance that wants to stay level. Every hit of pleasure tips it; the brain restores level by tipping it the other way, and it habitually overshoots. Repeat the stimulus often enough and the baseline itself moves, so you now need the thing not to feel good but to feel normal. That is the anhedonia everyone describes after a weekend on the phone.",
      "The clinical payload is the reverse of the standard advice. If pressing on the pleasure side produces pain, pressing deliberately on the <em>pain</em> side — cold, hard exercise, fasting, voluntary difficulty — produces a durable rebound of well-being that does not come with a tolerance curve in the same way. Her patients get prescribed a thirty-day abstinence from their drug of choice and a discomfort practice, in that order.",
    ],
    start: "<em>Dopamine Nation</em> (2021).",
  },

  barrett: {
    kind: "person",
    title: "Lisa Feldman Barrett",
    meta: "Neuroscientist · Northeastern University · b. 1963",
    tagline:
      "Neuroscientist who overturned the idea that emotions are hardwired reactions — they are predictions your brain constructs, which is why they can be reshaped.",
    body: [
      "The textbook view, going back to Darwin, said emotions are universal circuits: a fear module, an anger module, each with its own facial expression and its own fingerprint in the brain. Barrett went looking for those fingerprints across hundreds of studies and could not find them. Neither could anyone else.",
      'What she proposes instead is the theory of constructed emotion. Your brain is not reacting to the world; it is constantly predicting it, and it builds an emotion out of two raw ingredients: <strong>affect</strong> — the simple, always-running readout of how your body is doing, pleasant or unpleasant, high or low energy — and the concepts your culture gave you for sorting that readout into experiences. The racing heart is data. "Anxiety" is an interpretation, and so is "excitement", and the same physiology supports both.',
      "This is less soothing than it sounds and more useful. It means a large part of what you call your emotional life is a body-budget problem — sleep, food, movement — being narrated as a story about your circumstances. It also means the vocabulary you have for your own states is not decoration. People with finer emotional granularity regulate better, drink less, and go to the doctor less.",
    ],
    start: "<em>How Emotions Are Made</em> (2017).",
  },

  newport: {
    kind: "person",
    title: "Cal Newport",
    meta: "Computer scientist · Georgetown · b. 1982",
    tagline:
      "A theoretical computer scientist who writes about attention, and has never had a social media account.",
    body: [
      "He is a working academic — distributed algorithms, tenure at Georgetown — who writes his books in the margins of that job, which is part of why his advice is unusually free of hustle theatre. He has never had a social media account of any kind.",
      'Three arguments of his run through this book. <strong>Deep work</strong>: the ability to concentrate without distraction on a cognitively demanding task is becoming both rarer and more valuable at the same time, which is the definition of a good bet. <strong>Solitude deprivation</strong>: solitude is not the absence of people, it is the absence of other minds\' input, and a phone removes it completely — you can be alone for a decade now and never once be with your own thoughts. <strong>Career capital</strong>: "follow your passion" is bad advice because the traits that make work satisfying — autonomy, mastery, impact — are rare and valuable, and must be paid for with rare and valuable skill.',
    ],
    start: "<em>Deep Work</em> (2016), then <em>Digital Minimalism</em> (2019).",
  },

  aurelius: {
    kind: "person",
    title: "Marcus Aurelius",
    meta: "Roman emperor · 121–180 AD",
    image: {
      src: "/refs/aurelius.jpg",
      alt: "Bust of Marcus Aurelius, Musée Saint-Raymond, Toulouse",
      credit:
        'Bust in the Musée Saint-Raymond, Toulouse. Photo: Daniel Martin, <a href="https://creativecommons.org/licenses/by-sa/4.0" rel="noopener">CC BY-SA 4.0</a>, via Wikimedia Commons.',
    },
    tagline:
      "The most powerful man in the world wrote a private notebook telling himself to get out of bed and stop being irritable. It was never meant for you.",
    body: [
      "Emperor of Rome for nineteen years, most of them spent at war on the Danube frontier or managing a plague that killed perhaps five million people. He buried at least eight of his children.",
      "The <em>Meditations</em> is not a book he wrote. It is a private notebook, in Greek, written at night in camp, addressed to himself — which is why it repeats, contradicts itself, and never once explains its terms for a reader. He is not teaching. He is doing maintenance on his own head, and the same handful of arguments have to be re-made night after night because they keep not sticking. That is the most encouraging thing in it.",
      "The philosophy is Stoic and the operating principle is a division: some things are up to you — judgement, intention, effort — and everything else is not, including your reputation, your body, and how long you get. Work the first list. Accept the second. He is an emperor, he commands legions, and he is still writing to himself at midnight that he does not control the outcome.",
    ],
    start:
      "Book 2 and Book 5 of the <em>Meditations</em>. Any modern translation; Hays reads best in English.",
  },

  "ibn-ataillah": {
    kind: "person",
    title: "Ibn Ata'illah al-Iskandari",
    meta: "Maliki jurist and Sufi · d. 1309 · Alexandria and Cairo",
    tagline:
      'The Egyptian scholar whose aphorisms on striving and decree are the tradition\'s sharpest answer to "I worked and it did not come".',
    body: [
      "Born in Alexandria to a family of Maliki jurists, he taught at al-Azhar in Cairo and is buried in the Qarafa. He is the third master of the Shadhili order, and the most quotable Muslim writer on the question this book keeps circling.",
      '<em>Al-Hikam</em> — "the aphorisms" — is a short collection of about 260 lines, each one or two sentences, and it has stayed in continuous commentary for seven centuries. It opens by going straight at the nerve: <em>"Among the signs of relying on deeds is the loss of hope when a misstep occurs."</em> If your morale collapses when the result does not come, your confidence was never in God — it was in your own performance, dressed up.',
      'The line most relevant here: <em>"Your desire to withdraw when God has placed you in the world of means is a hidden appetite. And your desire for the world of means when God has placed you in withdrawal is a fall from a high aspiration."</em> Work where you have been put. Do not romanticise the other room.',
    ],
    start:
      "<em>Al-Hikam</em>, with a commentary — it is compressed to the point of being cryptic alone.",
  },

  easter: {
    kind: "person",
    title: "Michael Easter",
    meta: "Journalist · University of Nevada · b. 1985",
    tagline:
      "Reported his way through the research on voluntary hardship, then went to the Arctic for thirty-three days to see whether it held.",
    body: [
      "A journalism professor and former <em>Men's Health</em> editor who got sober in his twenties and went looking for what the comfortable modern default was costing people who were not addicts.",
      "The argument of <em>The Comfort Crisis</em> is that the human machine was assembled under conditions of intermittent hardship — cold, hunger, load-carrying, boredom, physical risk, real silence — and that every one of those has been engineered out of ordinary life within about three generations. The result is not simply softness; it is a nervous system with a broken scale, one that reads a slow lift as suffering because it has nothing worse to compare it to.",
      "He borrows a Japanese idea, <em>misogi</em>, for the fix: once a year attempt something genuinely difficult with a real chance of failure. His own was a thirty-three-day caribou hunt in the Alaskan backcountry, unsupported, carrying eighty pounds. The book is that trip interleaved with the researchers he visited on the way.",
    ],
    start: "<em>The Comfort Crisis</em> (2021).",
  },

  /* ============================ BOOKS ============================ */

  flow: {
    kind: "book",
    title: "Flow: The Psychology of Optimal Experience",
    meta: "Mihaly Csikszentmihalyi · 1990",
    tagline:
      "Where psychic entropy, order in consciousness, and flow itself were laid out — built on a hundred thousand random pager checks.",
    body: [
      'The book that gave the word "flow" to the world, and has been misread ever since as a productivity manual. It is a theory of consciousness.',
      "Its spine: attention is finite and it is the only thing you actually allocate. Consciousness left unallocated does not go quiet — it fills with disorder, which he calls <strong>psychic entropy</strong>. The states people report as the best of their lives are, without exception, states where attention was fully committed to a task with clear goals, immediate feedback, and difficulty matched to skill. Not rest. Not leisure. Difficulty, matched.",
      "The conclusion he draws is the one people skip: a life is made good by assembling as many of these hours as possible into an activity worth having spent them on. The state is neutral. The choice of what to point it at is the whole moral question, and the book hands that back to you.",
    ],
    start: "Chapters 2, 3 and 6. The later chapters on work and solitude are worth it too.",
  },

  "dopamine-nation": {
    kind: "book",
    title: "Dopamine Nation",
    meta: "Anna Lembke · 2021",
    tagline:
      "Pleasure and pain share a balance — so the way out of numbness is deliberate discomfort, not more pleasure.",
    body: [
      "Case studies from a Stanford addiction clinic, arranged around one mechanism: pleasure and pain are opponent processes on the same circuitry, and the brain restores balance by overshooting in the opposite direction.",
      "The consequence is that a life of frictionless small pleasures does not produce a pleasant baseline. It produces a depressed one, in which the pleasures are now required just to reach neutral. And the reverse works: pressing deliberately on the pain side — cold, hard training, fasting, hard tasks — buys a rebound that comes free of tolerance.",
    ],
  },

  "the-comfort-crisis": {
    kind: "book",
    title: "The Comfort Crisis",
    meta: "Michael Easter · 2021",
    tagline:
      "The research on what the removal of all hardship has done to us, reported from a thirty-three-day Arctic hunt.",
    body: [
      "Part reporting, part expedition diary. Easter visits the researchers working on cold exposure, hunger, load-carrying, boredom, silence and mortality awareness, and interleaves them with an unsupported caribou hunt in the Alaskan Arctic.",
      "The useful exports: <strong>rucking</strong> — walking under load, the oldest human exercise and the one with the best return per unit of effort; <strong>misogi</strong> — one deliberately difficult annual attempt with a real chance of failure; and the finding that boredom is not a void to be filled but the state in which the mind does a particular kind of work it cannot do while stimulated.",
    ],
  },

  "how-emotions-are-made": {
    kind: "book",
    title: "How Emotions Are Made",
    meta: "Lisa Feldman Barrett · 2017",
    tagline:
      "Emotions are not reactions you have. They are predictions your brain builds — from your body's state and your culture's vocabulary.",
    body: [
      "A demolition of the classical view of emotion, followed by a replacement. There is no anger circuit and no fear fingerprint; there is a brain constantly predicting what your body will need next, and constructing an experience out of raw bodily affect plus learned concepts.",
      "What it means in practice: much of what presents as an emotional crisis is a body-budget deficit being narrated as a story about your life. And because concepts are learned, they are trainable — a larger vocabulary for your own states measurably improves regulation.",
    ],
  },

  "deep-work": {
    kind: "book",
    title: "Deep Work",
    meta: "Cal Newport · 2016",
    tagline:
      "The ability to concentrate hard on one difficult thing is becoming rarer exactly as it becomes more valuable.",
    body: [
      "Newport's argument is economic before it is personal. Two abilities are about to be scarce and well-paid: mastering hard things quickly, and producing at an elite level. Both are downstream of sustained concentration, and sustained concentration is being destroyed at scale.",
      "The practical half is about scheduling depth rather than hoping for it, retiring the idea that attention residue is free — every switch leaves some of your mind on the previous task — and treating boredom tolerance as trainable infrastructure, because a mind that cannot sit still without a phone cannot go deep on command.",
    ],
  },

  "digital-minimalism": {
    kind: "book",
    title: "Digital Minimalism",
    meta: "Cal Newport · 2019",
    tagline:
      'Coined "solitude deprivation" — the modern condition of never once being alone with your own thoughts.',
    body: [
      "The companion to <em>Deep Work</em>, aimed at the phone rather than the desk. Its most useful idea is <strong>solitude deprivation</strong>: solitude is not physical isolation, it is freedom from other minds' input, and it is the state in which you process experience, regulate emotion and form your own positions.",
      "It also refuses the language of moderation. The tools are built by people whose job is to defeat your moderation, so the prescription is a thirty-day removal followed by deliberate, argued-for reintroduction of only what earns its place.",
    ],
  },

  "atomic-habits": {
    kind: "book",
    title: "Atomic Habits",
    meta: "James Clear · 2018",
    tagline: "You do not rise to the level of your goals; you fall to the level of your systems.",
    body: [
      "The most practical book on behaviour change that exists, largely because it is ruthless about one distinction: goals set direction, systems produce results, and everyone who fails has a goal and no system.",
      'The idea worth carrying is the identity one. Every action is a vote for the kind of person you believe you are, and the habit only becomes permanent when the evidence becomes an identity — not "I am trying to train" but "I am someone who trains", carried by a ledger of small votes.',
    ],
  },

  peak: {
    kind: "book",
    title: "Peak",
    meta: "Anders Ericsson & Robert Pool · 2016",
    tagline:
      "The original research behind the 10,000-hour claim — from the man who spent his later years correcting how it was quoted.",
    body: [
      "Ericsson's studies of violinists, chess players and memory athletes produced the number that made it into every airport book, and he spent the rest of his life objecting to the version that got popular. The hours are not the variable. <strong>Deliberate practice</strong> is.",
      "Deliberate practice has a specification: working at the edge of your current ability rather than inside it, on a component rather than the whole performance, with immediate feedback, full concentration, and repeated correction. Most of what people call practice fails several of these tests, which is why twenty years of it produces no improvement at all.",
    ],
  },

  mastery: {
    kind: "book",
    title: "Mastery",
    meta: "Robert Greene · 2012",
    tagline:
      "The apprenticeship phase — the years of low pay and no recognition — is not the tax on mastery. It is the mechanism.",
    body: [
      "Greene traces a common shape across historical and living masters: a long apprenticeship in which the correct objective is not money and not status but <em>skill acquisition</em>, followed by a creative-active phase, followed by mastery.",
      "The apprenticeship rule he draws is uncomfortable and correct: choose the position that teaches you most, not the one that pays most, and accept the transaction consciously and for a fixed period rather than drifting through it resenting the pay.",
    ],
  },

  range: {
    kind: "book",
    title: "Range",
    meta: "David Epstein · 2019",
    tagline:
      "The case against early specialisation — sampling widely first produces better matches and, eventually, better performance.",
    body: [
      'The counterweight to the head-start story. Epstein shows that in "kind" learning environments with stable rules and fast feedback — chess, golf — early specialisation works, and that almost nothing in adult life is a kind environment.',
      "In wicked environments, the people who sample broadly before committing end up with better <strong>match quality</strong> between what they do and who they are, and the late start is repaid with interest. Quitting a bad fit early is treated here as a skill rather than a character failure.",
    ],
  },

  "thinking-in-bets": {
    kind: "book",
    title: "Thinking in Bets",
    meta: "Annie Duke · 2018",
    tagline:
      "Judge the decision by what was knowable at the time, then use the result as new evidence.",
    body: [
      "Duke's subject is decision-making under uncertainty: how to learn from outcomes without pretending every outcome was fully under your control.",
      "Her central term is <strong>resulting</strong>: the error of grading a decision only by how it turned out. Her practical answer is a decision journal that records what you knew, what you expected, and which assumptions carried the choice. When the result arrives, you can update those assumptions without rewriting the quality of the original decision.",
    ],
  },

  "fooled-by-randomness": {
    kind: "book",
    title: "Fooled by Randomness",
    meta: "Nassim Nicholas Taleb · 2001",
    image: {
      src: "/refs/taleb.jpg",
      alt: "Nassim Nicholas Taleb",
      credit:
        'Photo: Sarah Josephine Taleb, CC BY 3.0, via <a href="https://commons.wikimedia.org/wiki/File:Taleb_mug.JPG" rel="noopener">Wikimedia Commons</a>.',
    },
    tagline:
      "The dead do not write memoirs, which is why every success story you read is evidence of almost nothing.",
    body: [
      "The first and best of Taleb's books, written while he was still a working options trader. Its subject is survivorship bias: we only ever examine the survivors, so every trait they happen to share reads as a cause.",
      "The thought experiment that sticks: run enough monkeys, or enough traders, and a few will produce spectacular unbroken records by chance alone. Those are the ones who get interviewed, write the book, and explain their method. The method is usually the noise.",
    ],
  },

  "the-success-equation": {
    kind: "book",
    title: "The Success Equation",
    meta: "Michael Mauboussin · 2012",
    tagline: "A test for how much luck sits in any activity: ask whether you can lose on purpose.",
    body: [
      "Mauboussin places activities on a continuum from pure skill to pure luck and gives a fast diagnostic — if you can deliberately lose, skill is involved; if you cannot, it is luck. You cannot lose a coin toss on purpose. You can lose a chess game on purpose.",
      "The consequence is the <strong>paradox of skill</strong>: as everyone in a field gets better and the spread of skill narrows, luck determines more of the difference between outcomes, not less. In the most competitive fields, the best people are the least distinguishable by results.",
    ],
  },

  "four-thousand-weeks": {
    kind: "book",
    title: "Four Thousand Weeks",
    meta: "Oliver Burkeman · 2021",
    tagline:
      "A human life is about four thousand weeks. Most productivity advice is a strategy for not noticing that.",
    body: [
      "An anti-productivity book by a man who wrote a productivity column for years and stopped believing in it. The title is the arithmetic: eighty years is roughly four thousand weeks, which is an appallingly small number once you have seen it written down.",
      "The argument is that efficiency is a trap — clearing the decks faster produces more decks — and that the alternative is not better systems but accepted finitude: the acknowledgement that you will not do most of what you want to do, that choosing anything means losing everything else, and that this is the condition rather than a problem to be solved.",
    ],
  },

  "mans-search-for-meaning": {
    kind: "book",
    title: "Man's Search for Meaning",
    meta: "Viktor Frankl · 1946",
    tagline:
      "Written in nine days after three years in the camps: meaning is not found, it is answered for — through work, love, or suffering borne well.",
    body: [
      "Two halves. The first is Frankl's account of Auschwitz and three other camps, written as a psychiatrist observing rather than a victim recounting. The second sets out logotherapy, the school he founded, on the premise that the primary human drive is not pleasure or power but meaning.",
      "The clinical core: you do not ask what you want from life, you answer what life is asking of you, and there are only three places the answer comes from — what you make, who you love, and the attitude you take toward suffering you cannot remove. The third is the one that matters when the first two are unavailable, and it was written by someone for whom they were.",
    ],
  },

  meditations: {
    kind: "book",
    title: "Meditations",
    meta: "Marcus Aurelius · c. 170–180 AD",
    tagline:
      "The private notebook of a Roman emperor, arguing with himself at night, never intended to be read.",
    body: [
      "Twelve short books of notes, written in Greek in army camps on the Danube frontier, with no audience in mind. It has no structure, repeats itself constantly, and never defines its terms — all of which are evidence of what it actually is: a man doing nightly maintenance on his own mind.",
      "Read it for the repetition rather than the aphorisms. The most powerful man alive had to tell himself the same four things over and over, for twenty years, because they kept not sticking. That is the real consolation in the book.",
    ],
  },

  "al-hikam": {
    kind: "book",
    title: "Al-Hikam · الحكم العطائية",
    meta: "Ibn Ata'illah al-Iskandari · c. 1300",
    tagline:
      "About 260 aphorisms on striving, decree and self-deception — seven centuries of continuous commentary and still uncomfortable.",
    body: [
      "A short work of maxims, each one or two lines, from the Egyptian Shadhili master. It is aimed precisely at the person who works hard and then quietly banks on the work.",
      "The opening line sets the whole tone: among the signs of relying on your own deeds is the loss of hope when you slip. If a missed prayer or a failed month collapses your morale, the confidence was in the performance, not in God. The book spends 260 lines taking that apart from every angle, and it does not let the reader off at any of them.",
    ],
  },
};

export const refKeys = Object.keys(REFS);
