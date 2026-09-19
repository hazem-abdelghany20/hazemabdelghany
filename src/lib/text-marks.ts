/* Finding a passage in an essay's text and wrapping it in <mark>s, for the
   highlights (components/EssayHighlights.tsx). The essay HTML is rendered at
   build time and React never touches it again, so marks added after
   hydration stay put. Matching ignores differences in whitespace, the way a
   selection's text differs from the page's (line breaks between blocks). */

/** Collapse runs of whitespace and trim: the form highlights are stored in. */
export const normalizeText = (text: string) => text.replace(/\s+/g, " ").trim();

/** Every text node under `root`, and the page's text with whitespace
 *  collapsed, each character mapped back to where it came from. */
function index(root: HTMLElement) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let flat = "";
  const at: { node: Text; offset: number }[] = [];
  let lastWasSpace = true;
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const node = n as Text;
    for (let i = 0; i < node.data.length; i++) {
      const space = /\s/.test(node.data[i]!);
      if (space && lastWasSpace) continue;
      flat += space ? " " : node.data[i];
      at.push({ node, offset: i });
      lastWasSpace = space;
    }
  }
  return { flat, at };
}

/** Wrap the first occurrence of `text` under `root` in <mark class={className}>
 *  elements (one per text node it spans). Returns them, or [] if the passage
 *  isn't there word for word. */
export function markText(root: HTMLElement, text: string, className: string): HTMLElement[] {
  const needle = normalizeText(text);
  if (!needle) return [];
  const { flat, at } = index(root);
  const start = flat.indexOf(needle);
  if (start < 0) return [];
  const first = at[start]!;
  const last = at[start + needle.length - 1]!;
  const range = document.createRange();
  range.setStart(first.node, first.offset);
  range.setEnd(last.node, last.offset + 1);

  const nodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (range.intersectsNode(n)) nodes.push(n as Text);
  }
  const marks: HTMLElement[] = [];
  for (const node of nodes) {
    const from = node === range.startContainer ? range.startOffset : 0;
    const to = node === range.endContainer ? range.endOffset : node.length;
    // the line breaks between paragraphs stay unmarked
    if (from >= to || !/\S/.test(node.data.slice(from, to))) continue;
    let target = node;
    if (from > 0) target = target.splitText(from);
    if (to - from < target.length) target.splitText(to - from);
    const mark = document.createElement("mark");
    mark.className = className;
    target.parentNode!.insertBefore(mark, target);
    mark.appendChild(target);
    marks.push(mark);
  }
  return marks;
}

/** Undo markText. */
export function unmark(marks: HTMLElement[]) {
  for (const mark of marks) {
    const parent = mark.parentNode;
    if (!parent) continue;
    while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
    parent.removeChild(mark);
    parent.normalize();
  }
}
