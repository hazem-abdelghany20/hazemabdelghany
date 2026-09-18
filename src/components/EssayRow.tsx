import { Link } from "@tanstack/react-router";
import type { Essay } from "@/lib/essays";
import { threadLabel, formatDate } from "@/lib/threads";

export function EssayRow({ essay, num }: { essay: Essay; num?: string }) {
  const isAr = essay.data.lang === "ar";
  const thread = threadLabel(essay.data.thread);
  return (
    <Link className="row" to="/essays/$id/" params={{ id: essay.id }} dir={isAr ? "rtl" : "ltr"}>
      <div className="row-left">
        {num && <span className="row-num">{num}</span>}
        <span className="row-title" lang={isAr ? "ar" : "en"}>
          {essay.data.title}
        </span>
      </div>
      <div className="row-right">
        <span className="tag">{essay.data.partLabel ?? thread.en}</span>
        <span className="meta">{formatDate(essay.data.date)}</span>
      </div>
    </Link>
  );
}
