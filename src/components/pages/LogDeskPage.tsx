import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { allLogs, kindLabel, youtubeId, youtubeThumb, type LogEntry } from "@/lib/logs";
import { loadReviews, saveReview, type DeskError, type Review } from "@/lib/log-desk-db";
import { formatDay } from "@/lib/threads";

/* /log-desk/ — not in the nav, not in the sitemap, noindex. Where a score and a
   line get written for everything in the log. A line is what publishes an
   entry, so this page is the gate between the folder and the site.

   Two stores, on purpose: every keystroke goes to localStorage immediately so
   nothing is ever lost, and a debounced write goes to Supabase so the work
   survives this browser. The page is usable before the migration is applied —
   it just says so. */

const KEY_STORE = "log-desk:key";
const DRAFT_STORE = "log-desk:drafts";
type Drafts = Record<string, Review>;
type Filter = "all" | "blank" | "written";

const local = {
  read(): Drafts {
    try {
      return JSON.parse(localStorage.getItem(DRAFT_STORE) ?? "{}") as Drafts;
    } catch {
      return {};
    }
  },
  write(d: Drafts) {
    try {
      localStorage.setItem(DRAFT_STORE, JSON.stringify(d));
    } catch {
      // storage blocked — the database is still the record
    }
  },
  key(): string {
    try {
      return localStorage.getItem(KEY_STORE) ?? "";
    } catch {
      return "";
    }
  },
  setKey(k: string) {
    try {
      if (k) localStorage.setItem(KEY_STORE, k);
      else localStorage.removeItem(KEY_STORE);
    } catch {
      // storage blocked — he'll type it again next visit
    }
  },
};

export function LogDeskPage() {
  const entries = useMemo(() => allLogs(), []);
  // What the markdown already says, so an entry that is live shows its real words.
  const fromFiles = useMemo(() => {
    const m: Drafts = {};
    for (const e of entries) {
      m[e.id] = { slug: e.id, rating: e.data.rating ?? null, note: e.data.note ?? "" };
    }
    return m;
  }, [entries]);

  const [key, setKey] = useState("");
  const [typed, setTyped] = useState("");
  const [reviews, setReviews] = useState<Drafts>(fromFiles);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | DeskError>("idle");
  const [filter, setFilter] = useState<Filter>("all");
  const [copied, setCopied] = useState(false);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Local drafts first, so a reload never loses a line, then the database on top.
  useEffect(() => {
    const drafts = local.read();
    setReviews((r) => ({ ...r, ...drafts }));
    const stored = local.key();
    if (stored) {
      setKey(stored);
      setTyped(stored);
    }
  }, []);

  useEffect(() => {
    if (!key) return;
    let cancelled = false;
    setStatus("loading");
    loadReviews(key)
      .then((rows) => {
        if (cancelled) return;
        setReviews((r) => ({ ...r, ...rows }));
        setStatus("ready");
      })
      .catch((e: DeskError) => {
        if (cancelled) return;
        setStatus(e);
        if (e === "locked") {
          local.setKey("");
          setKey("");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [key]);

  const update = useCallback(
    (slug: string, patch: Partial<Review>) => {
      setReviews((prev) => {
        const next = {
          ...prev,
          [slug]: { ...(prev[slug] ?? { slug, rating: null, note: "" }), ...patch },
        };
        local.write(next);
        return next;
      });
      if (!key) return;
      clearTimeout(timers.current[slug]);
      timers.current[slug] = setTimeout(() => {
        setReviews((cur) => {
          const row = cur[slug];
          if (row) void saveReview(key, row).catch((e: DeskError) => setStatus(e));
          return cur;
        });
      }, 700);
    },
    [key],
  );

  const written = entries.filter((e) => (reviews[e.id]?.note ?? "").trim()).length;
  const shown = entries.filter((e) => {
    const has = !!(reviews[e.id]?.note ?? "").trim();
    return filter === "all" ? true : filter === "blank" ? !has : has;
  });

  function copyWritten() {
    const text = entries
      .filter((e) => (reviews[e.id]?.note ?? "").trim())
      .map((e) => {
        const r = reviews[e.id]!;
        return `${e.id} :: ${r.rating ?? "-"} :: ${r.note.trim()}`;
      })
      .join("\n");
    void navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <div className="page-desk">
      <header className="desk-head">
        <div className="desk-head-row">
          <h1 className="desk-title">The desk</h1>
          <span className="desk-tally">
            <b>{written}</b> of {entries.length} written
          </span>
        </div>
        <div className="desk-bar">
          <i style={{ width: `${(written / Math.max(1, entries.length)) * 100}%` }} />
        </div>
        <p className="desk-lede">
          Everything in the log, live and unpublished alike. A score out of ten and one honest line.
          The line is what puts an entry on the site — a blank one keeps it here. A blank score is
          fine; the site prints the line without a number rather than invent one.
        </p>
      </header>

      {!key && (
        <form
          className="desk-gate"
          onSubmit={(ev) => {
            ev.preventDefault();
            if (!typed.trim()) return;
            local.setKey(typed.trim());
            setKey(typed.trim());
          }}
        >
          <label htmlFor="desk-key">Passphrase</label>
          <input
            id="desk-key"
            type="password"
            value={typed}
            autoComplete="current-password"
            onChange={(ev) => setTyped(ev.target.value)}
            placeholder="the one set in the migration"
          />
          <button type="submit">Open</button>
          {status === "locked" && <span className="desk-warn">That passphrase didn’t work.</span>}
        </form>
      )}

      {status === "missing" && (
        <p className="desk-notice">
          The database side isn’t there yet — paste{" "}
          <code>drizzle/migrations/0001_log_desk.sql</code> into the Lovable chat and ask it to
          apply the migration. Everything typed here is being kept in this browser meanwhile, so
          nothing is lost.
        </p>
      )}
      {status === "offline" && (
        <p className="desk-notice">
          Can’t reach the database. Still saving in this browser — reload when the connection is
          back and it will catch up.
        </p>
      )}

      {key && (
        <>
          <div className="desk-tools">
            <div className="desk-filters" role="group" aria-label="Filter">
              {(
                [
                  ["all", "Everything", entries.length],
                  ["blank", "Still blank", entries.length - written],
                  ["written", "Written", written],
                ] as [Filter, string, number][]
              ).map(([k, label, n]) => (
                <button
                  key={k}
                  type="button"
                  className="desk-chip"
                  aria-pressed={filter === k}
                  onClick={() => setFilter(k)}
                >
                  {label} <b>{n}</b>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="desk-copy"
              onClick={copyWritten}
              disabled={written === 0}
            >
              {copied ? "Copied" : "Copy what’s written"}
            </button>
          </div>

          <div className="desk-rows">
            {shown.map((e) => (
              <DeskRow
                key={e.id}
                entry={e}
                review={reviews[e.id] ?? { slug: e.id, rating: null, note: "" }}
                onChange={(patch) => update(e.id, patch)}
              />
            ))}
            {shown.length === 0 && <p className="desk-lede">Nothing in this view.</p>}
          </div>
        </>
      )}
    </div>
  );
}

function DeskRow({
  entry,
  review,
  onChange,
}: {
  entry: LogEntry;
  review: Review;
  onChange: (patch: Partial<Review>) => void;
}) {
  const video = youtubeId(entry.data.link);
  const kind = kindLabel(entry.data.kind);
  const live = !!review.note.trim() && !entry.data.draft;

  return (
    <article className={`desk-row${review.note.trim() ? " is-written" : ""}`}>
      {video ? (
        <a
          className="desk-thumb"
          href={entry.data.link}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
        >
          <img src={youtubeThumb(video)} alt="" width={480} height={360} loading="lazy" />
        </a>
      ) : (
        <div className="desk-thumb desk-thumb-none">{kind.enOne}</div>
      )}

      <div className="desk-body">
        <h2 className="desk-row-title">
          {entry.data.link ? (
            <a href={entry.data.link} target="_blank" rel="noopener noreferrer">
              {entry.data.title}
            </a>
          ) : (
            entry.data.title
          )}
        </h2>
        <p className="desk-meta">
          <span className="tag">{kind.enOne}</span>
          {entry.data.by && <span>{entry.data.by}</span>}
          <span className="desk-dot">·</span>
          <time dateTime={entry.data.date.toISOString().slice(0, 10)}>
            {formatDay(entry.data.date)}
          </time>
          {entry.data.draft && <span className="desk-flag">draft</span>}
        </p>

        <div className="desk-scores">
          <span className="desk-scores-label">Score</span>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              className="desk-score"
              aria-pressed={review.rating === n}
              aria-label={`${n} out of ten`}
              onClick={() => onChange({ rating: review.rating === n ? null : n })}
            >
              {n}
            </button>
          ))}
        </div>

        <textarea
          id={`desk-note-${entry.id}`}
          className="desk-note"
          rows={2}
          value={review.note}
          placeholder="One honest line — what it actually gave you, or why it didn’t."
          aria-label={`Your line on ${entry.data.title}`}
          onChange={(ev) => onChange({ note: ev.target.value })}
        />

        <p className="desk-state">
          {live ? (
            <span className="desk-live">On the site</span>
          ) : review.note.trim() ? (
            <span className="desk-live">Ready — publishes on the next deploy</span>
          ) : (
            <span>Waiting on you</span>
          )}
        </p>
      </div>
    </article>
  );
}
