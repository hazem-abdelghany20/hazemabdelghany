/* /links/ — the Instagram bio page: get to know Hazem, socials, the free guides
   (one card per reel, opening its /free/<slug>/ guide), and booking a paid
   session. Booking has no backend: the visitor picks a slot, pays by InstaPay
   and sends the screenshot on WhatsApp; Hazem confirms by hand. */

export const SOCIALS = [
  { name: "Instagram", handle: "@hazem_abdelghany", href: "https://www.instagram.com/hazem_abdelghany/" },
  { name: "TikTok", handle: "@7azemai", href: "https://www.tiktok.com/@7azemai" },
  { name: "YouTube", handle: "Hazem Abdelghany", href: "https://www.youtube.com/channel/UCgXB396UNWT4Cn4P8kgmI1g" },
  { name: "LinkedIn", handle: "hazem-abdelghany", href: "https://www.linkedin.com/in/hazem-abdelghany/" },
  { name: "Facebook", handle: "Hazem Abdelghany", href: "https://www.facebook.com/1106832432519744" },
] as const;

/** One card per reel that promised a guide, newest first. Cover = public/images/links/<reel>.jpg. */
export const GUIDE_REELS = [
  { reel: "De7TpkTARx2", title: "5 حاجات ماكنتش تعرف إنك تقدر تعملها بـClaude", guide: "claude" },
  { reel: "De2KBSyjzjI", title: "لو لسه بادئ Claude، اعمل الـ5 حاجات دول الأول", guide: "claude" },
  { reel: "DezlKLoigH1", title: "ChatGPT متصمّم إنه يرضيك: غيّر الـ3 settings دول", guide: "gpt" },
  { reel: "DepK-dzj3D3", title: "جوجل نزلت ٧ أدوات AI ببلاش", guide: "google" },
] as const;

export const SESSION = {
  priceEgp: 3000,
  instapay: "hazemcibdeb@instapay",
  whatsapp: "201000066624",
  /** Days (0 = Sunday) and start hours, Cairo time. One hour each. */
  days: [1, 2, 4],
  hours: [13, 15, 17],
  weeksAhead: 2,
};

const DAY_AR = ["الحد", "الاتنين", "التلات", "الأربع", "الخميس", "الجمعة", "السبت"];
const MONTH_AR = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
const HOUR_AR: Record<number, string> = { 13: "1 الضهر", 15: "3 العصر", 17: "5 المسا" };

export type Slot = { key: string; day: string; time: string; label: string };

/** Cairo's calendar date and hour right now, whatever the visitor's own time zone. */
function cairoNow(now: Date) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Cairo", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hourCycle: "h23" })
      .formatToParts(now)
      .map((x) => [x.type, x.value]),
  );
  return { y: Number(p["year"]), m: Number(p["month"]) - 1, d: Number(p["day"]), h: Number(p["hour"]) };
}

/** The bookable slots from now until `weeksAhead` weeks out, grouped by day. Runs in the browser. */
export function upcomingSlots(now = new Date()): { day: string; slots: Slot[] }[] {
  const c = cairoNow(now);
  const out: { day: string; slots: Slot[] }[] = [];
  for (let i = 0; i < SESSION.weeksAhead * 7; i++) {
    const date = new Date(Date.UTC(c.y, c.m, c.d + i));
    if (!SESSION.days.includes(date.getUTCDay())) continue;
    const day = `${DAY_AR[date.getUTCDay()]} ${date.getUTCDate()} ${MONTH_AR[date.getUTCMonth()]}`;
    const slots = SESSION.hours
      .filter((h) => i > 0 || h > c.h) // today: only hours that haven't started
      .map((h) => ({ key: `${date.toISOString().slice(0, 10)}-${h}`, day, time: HOUR_AR[h] ?? `${h - 12}`, label: `${day} الساعة ${HOUR_AR[h]}` }));
    if (slots.length) out.push({ day, slots });
  }
  return out;
}

export const whatsappLink = (slot: Slot) =>
  `https://wa.me/${SESSION.whatsapp}?text=${encodeURIComponent(
    `أهلاً يا حازم 👋 عايز أحجز session يوم ${slot.label} (توقيت مصر). حوّلت ${SESSION.priceEgp.toLocaleString("en")} جنيه على InstaPay، ودي screenshot التحويل:`,
  )}`;
