import { L } from "@/components/L";
import { essayPath, type Essay } from "@/lib/essays";
import type { Lang } from "@/lib/i18n";
import { threadLabel, formatDate } from "@/lib/threads";

/** One line in an essay list. `lang` is the site's language; an essay written
 *  in the other language (not translated yet) says so. */
export function EssayRow({ essay, num, lang }: { essay: Essay; num?: string; lang: Lang }) {
  const isAr = essay.data.lang === "ar";
  const thread = threadLabel(essay.data.thread);
  const foreign = essay.data.lang !== lang;
  return (
    <L className="row" href={essayPath(essay, lang)} dir={isAr ? "rtl" : "ltr"}>
      <div className="row-left">
        {num && <span className="row-num">{num}</span>}
        <span className="row-title" lang={isAr ? "ar" : "en"}>
          {essay.data.title}
        </span>
      </div>
      <div className="row-right">
        {foreign && <span className="meta">{lang === "ar" ? "بالإنجليزي" : "In Arabic"}</span>}
        <span className="tag">
          {essay.data.partLabel ?? (lang === "ar" ? thread.ar : thread.en)}
        </span>
        <span className="meta">{formatDate(essay.data.date, lang)}</span>
      </div>
    </L>
  );
}
