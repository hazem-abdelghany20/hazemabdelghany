import { useState } from "react";
import { LogEntryCard } from "@/components/LogEntryCard";
import { LOG_KINDS, siteLogs, type LogKind } from "@/lib/logs";
import type { Lang } from "@/lib/i18n";

export function LogsPage({ lang }: { lang: Lang }) {
  const isAr = lang === "ar";
  const all = siteLogs(lang);
  const [kind, setKind] = useState<LogKind | "all">("all");

  // Only offer a filter for kinds that actually have something in them —
  // an empty "Podcasts" tab is a promise the page can't keep.
  const present = LOG_KINDS.map((k) => ({
    ...k,
    count: all.filter((e) => e.data.kind === k.key).length,
  })).filter((k) => k.count > 0);

  const shown = kind === "all" ? all : all.filter((e) => e.data.kind === kind);

  return (
    <div className="page-logs">
      <header className="page-head">
        <h1 className="page-title">{isAr ? "السجل" : "The Log"}</h1>
        <span dir={isAr ? "ltr" : "rtl"} lang={isAr ? "en" : "ar"} className="page-title-ar">
          {isAr ? "The Log" : "السجل"}
        </span>
      </header>

      <p className="page-lede">
        {isAr
          ? "كل حاجة بقراها أو بتفرّج عليها، ورأيي فيها. مش مراجعات — السطر اللي كنت هقوله لصاحبي. اللي فيه كلام أكتر، تحته ملاحظات."
          : "Everything I read or watch, and what I actually made of it. Not reviews — the one line I’d say to a friend. The ones worth more than a line have notes underneath."}
      </p>

      {present.length > 1 && (
        <div className="log-filters" role="group" aria-label={isAr ? "تصفية" : "Filter"}>
          <button
            type="button"
            className="log-filter"
            aria-pressed={kind === "all"}
            onClick={() => setKind("all")}
          >
            {isAr ? "الكل" : "Everything"}
            <span className="log-filter-count">{all.length}</span>
          </button>
          {present.map((k) => (
            <button
              key={k.key}
              type="button"
              className="log-filter"
              aria-pressed={kind === k.key}
              onClick={() => setKind(k.key)}
            >
              {isAr ? k.ar : k.en}
              <span className="log-filter-count">{k.count}</span>
            </button>
          ))}
        </div>
      )}

      <div className="log-feed">
        {shown.map((e) => (
          <LogEntryCard key={e.id} entry={e} lang={lang} />
        ))}
      </div>

      {shown.length === 0 && (
        <p className="page-lede">{isAr ? "لسه مفيش حاجة هنا." : "Nothing here yet."}</p>
      )}
    </div>
  );
}
