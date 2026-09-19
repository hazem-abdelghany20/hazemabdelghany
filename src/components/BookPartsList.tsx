import { L } from "@/components/L";
import { essayPath, type Essay } from "@/lib/essays";
import { groupParts, type SeriesSection } from "@/lib/series";

function PartItem({ part, lang, read }: { part: Essay; lang: "en" | "ar"; read: boolean }) {
  return (
    <li>
      <L href={essayPath(part, lang)}>
        <span className="bw-part">
          {part.data.partLabel}
          {read && <ReadTick lang={lang} />}
        </span>
        <span className="bw-part-title">{part.data.title}</span>
        <span className="bw-part-desc">{part.data.description}</span>
      </L>
    </li>
  );
}

/** The mark on a part this device has read (see src/lib/reading.ts). */
export function ReadTick({ lang }: { lang: "en" | "ar" }) {
  return (
    <span className="read-tick" role="img" aria-label={lang === "ar" ? "اتقرا" : "read"}>
      ✓
    </span>
  );
}

export function BookPartsList({
  parts,
  sections = [],
  lang,
  hidden = false,
  read,
}: {
  parts: Essay[];
  sections?: SeriesSection[] | undefined;
  lang: "en" | "ar";
  hidden?: boolean;
  /** ids of the parts this device has read */
  read?: ReadonlySet<string> | undefined;
}) {
  const isArabic = lang === "ar";
  const { opening, divisions, closing } = groupParts(parts, sections);

  return (
    <div
      className={isArabic ? "book-parts book-parts-ar" : "book-parts"}
      data-list={lang}
      dir={isArabic ? "rtl" : "ltr"}
      lang={lang}
      hidden={hidden}
    >
      {opening.length > 0 && (
        <ol className="bw-list bw-list-edge">
          {opening.map((part) => (
            <PartItem key={part.id} part={part} lang={lang} read={!!read?.has(part.id)} />
          ))}
        </ol>
      )}

      {divisions.map(({ section, parts: sectionParts }) => (
        <section
          key={section.number}
          className="book-division"
          aria-labelledby={`division-${lang}-${section.number}`}
        >
          <img
            className="book-division-image"
            src={section.image}
            alt={section.alt}
            width="1536"
            height="1024"
            loading="lazy"
            decoding="async"
          />
          <header className="book-division-copy">
            <span className="book-division-number">
              {isArabic ? `الجزء ${section.numberAr}` : `Part ${section.number}`}
            </span>
            <h3 id={`division-${lang}-${section.number}`}>
              {isArabic ? section.titleAr : section.title}
            </h3>
            <p>{isArabic ? section.subtitleAr : section.subtitle}</p>
          </header>
          <ol className="bw-list">
            {sectionParts.map((part) => (
              <PartItem key={part.id} part={part} lang={lang} read={!!read?.has(part.id)} />
            ))}
          </ol>
        </section>
      ))}

      {closing.length > 0 && (
        <ol className="bw-list bw-list-edge bw-list-closing">
          {closing.map((part) => (
            <PartItem key={part.id} part={part} lang={lang} read={!!read?.has(part.id)} />
          ))}
        </ol>
      )}
    </div>
  );
}
