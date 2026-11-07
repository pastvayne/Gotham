export type Inline =
  | { type: "text"; text: string }
  | { type: "strong"; text: string }
  | { type: "code"; text: string }
  | { type: "link"; text: string; href: string };

export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; inlines: Inline[] }
  | { type: "ul"; items: Inline[][] }
  | { type: "ol"; items: Inline[][] }
  | { type: "quote"; inlines: Inline[] }
  | { type: "hr" }
  | { type: "table"; headers: Inline[][]; rows: Inline[][][] }
  | { type: "code"; text: string };

export function parseMarkdown(source: string): { title: string; description: string; blocks: Block[] } {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  let index = 0;
  let title = "";
  let description = "";

  if (lines[0]?.trim() === "---") {
    index = 1;
    while (index < lines.length && lines[index]?.trim() !== "---") {
      const line = lines[index] ?? "";
      if (line.startsWith("title:")) title = unquote(line.slice(6).trim());
      if (line.startsWith("description:")) description = unquote(line.slice(12).trim());
      index += 1;
    }
    index += 1;
  }

  const blocks: Block[] = [];
  while (index < lines.length) {
    const line = lines[index] ?? "";
    if (!line.trim()) {
      index += 1;
      continue;
    }
    if (line.startsWith("# ")) {
      if (!title) title = line.slice(2).trim();
      index += 1;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3).trim() });
      index += 1;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4).trim() });
      index += 1;
      continue;
    }
    if (line.trim() === "---") {
      blocks.push({ type: "hr" });
      index += 1;
      continue;
    }
    if (line.startsWith("> ")) {
      const parts = [line.slice(2)];
      index += 1;
      while (index < lines.length && (lines[index]?.startsWith("> ") || lines[index] === ">")) {
        parts.push((lines[index] ?? "").replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push({ type: "quote", inlines: parseInline(parts.join(" ")) });
      continue;
    }
    if (line.startsWith("```")) {
      index += 1;
      const body: string[] = [];
      while (index < lines.length && !(lines[index] ?? "").startsWith("```")) {
        body.push(lines[index] ?? "");
        index += 1;
      }
      index += 1;
      blocks.push({ type: "code", text: body.join("\n") });
      continue;
    }
    if (line.startsWith("|")) {
      const raw: string[][] = [];
      while (index < lines.length && (lines[index] ?? "").startsWith("|")) {
        const cells = (lines[index] ?? "")
          .split("|")
          .slice(1, -1)
          .map((cell) => cell.trim());
        if (!cells.every((cell) => /^:?-{3,}:?$/.test(cell))) raw.push(cells);
        index += 1;
      }
      const [headers = [], ...rows] = raw;
      blocks.push({
        type: "table",
        headers: headers.map((cell) => parseInline(cell)),
        rows: rows.map((row) => row.map((cell) => parseInline(cell))),
      });
      continue;
    }
    if (line.startsWith("- ")) {
      const items: Inline[][] = [];
      while (index < lines.length && (lines[index] ?? "").startsWith("- ")) {
        items.push(parseInline((lines[index] ?? "").slice(2).trim()));
        index += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      const items: Inline[][] = [];
      while (index < lines.length && /^\d+\.\s/.test(lines[index] ?? "")) {
        items.push(parseInline((lines[index] ?? "").replace(/^\d+\.\s/, "").trim()));
        index += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    const paragraph = [line.trim()];
    index += 1;
    while (index < lines.length && isParagraphContinuation(lines[index] ?? "")) {
      paragraph.push((lines[index] ?? "").trim());
      index += 1;
    }
    blocks.push({ type: "p", inlines: parseInline(paragraph.join(" ")) });
  }

  return { title, description, blocks };
}

function isParagraphContinuation(line: string) {
  if (!line.trim()) return false;
  if (line.startsWith("#") || line.startsWith("- ") || line.startsWith("|") || line.startsWith(">") || line.startsWith("```")) {
    return false;
  }
  if (line.trim() === "---" || /^\d+\.\s/.test(line)) return false;
  return true;
}

function parseInline(input: string): Inline[] {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
  const items: Inline[] = [];
  let last = 0;
  for (const match of input.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > last) items.push({ type: "text", text: input.slice(last, start) });
    if (match[1] && match[2]) {
      const href = safeHref(match[2]);
      items.push(href ? { type: "link", text: match[1], href } : { type: "text", text: match[1] });
    } else if (match[3]) {
      items.push({ type: "strong", text: match[3] });
    } else if (match[4]) {
      items.push({ type: "code", text: match[4] });
    }
    last = start + match[0].length;
  }
  if (last < input.length) items.push({ type: "text", text: input.slice(last) });
  return items;
}

function safeHref(href: string) {
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  if (href.startsWith("https://")) return href;
  return null;
}

function unquote(value: string) {
  return value.replace(/^["']|["']$/g, "");
}
