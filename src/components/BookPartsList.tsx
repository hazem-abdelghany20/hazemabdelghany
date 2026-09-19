import { L } from "@/components/L";
import { essayPath, type Essay } from "@/lib/essays";
import type { SeriesSection } from "@/lib/series";

function PartItem({ part, lang }: { part: Essay; lang: "en" | "ar" }) {
  return (
    <li>
      <L href={essayPath(part, lang)}>
        <span className="bw-part">{part.data.partLabel}</span>
        <span className="bw-part-title">{part.data.title}</span>
        <span className="bw-part-desc">{part.data.description}</span>
      </L>
    </li>
  );
}

export function BookPartsList({
  parts,
  sections = [],
  lang,
  hidden = false,
}: {
  parts: Essay[];
  sections?: SeriesSection[] | undefined;
  lang: "en" | "ar";
  hidden?: boolean;
}) {
  const isArabic = lang === "ar";
  const hasSections = sections.length > 0;
  const firstSectionPart = sections[0]?.startPart ?? Number.POSITIVE_INFINITY;
  const lastSectionPart = sections.at(-1)?.endPart ?? Number.NEGATIVE_INFINITY;
  const opening = hasSections
    ? parts.filter((part) => (part.data.part ?? 0) < firstSectionPart)
    : parts;
  const closing = hasSections
    ? parts.filter((part) => (part.data.part ?? 0) > lastSectionPart)
    : [];
  const divisions = sections.map((section) => ({
    section,
    parts: parts.filter((part) => {
      const number = part.data.part ?? 0;
      return number >= section.startPart && number <= section.endPart;
    }),
  }));

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
            <PartItem key={part.id} part={part} lang={lang} />
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
              <PartItem key={part.id} part={part} lang={lang} />
            ))}
          </ol>
        </section>
      ))}

      {closing.length > 0 && (
        <ol className="bw-list bw-list-edge bw-list-closing">
          {closing.map((part) => (
            <PartItem key={part.id} part={part} lang={lang} />
          ))}
        </ol>
      )}
    </div>
  );
}
