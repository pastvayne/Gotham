import Link from "next/link";
import type { Block, Inline } from "@/lib/markdown";

export function Markdown({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose">
      {blocks.map((block, index) => {
        if (block.type === "h2") return <h2 key={index}>{block.text}</h2>;
        if (block.type === "h3") return <h3 key={index}>{block.text}</h3>;
        if (block.type === "p") return <p key={index}><Inlines items={block.inlines} /></p>;
        if (block.type === "quote") {
          return (
            <blockquote key={index}>
              <Inlines items={block.inlines} />
            </blockquote>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Inlines items={item} />
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "ol") {
          return (
            <ol key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Inlines items={item} />
                </li>
              ))}
            </ol>
          );
        }
        if (block.type === "hr") return <hr key={index} />;
        if (block.type === "code") {
          return (
            <pre key={index}>
              <code>{block.text}</code>
            </pre>
          );
        }
        return (
          <div key={index} className="table-scroll">
            <table>
              <thead>
                <tr>
                  {block.headers.map((cell, cellIndex) => (
                    <th key={cellIndex}>
                      <Inlines items={cell} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>
                        <Inlines items={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

function Inlines({ items }: { items: Inline[] }) {
  return items.map((item, index) => {
    if (item.type === "strong") return <strong key={index}>{item.text}</strong>;
    if (item.type === "code") return <code key={index}>{item.text}</code>;
    if (item.type === "link") {
      if (item.href.startsWith("/")) {
        return (
          <Link key={index} href={item.href} className="inline-link">
            {item.text}
          </Link>
        );
      }
      return (
        <a key={index} href={item.href} className="inline-link">
          {item.text}
        </a>
      );
    }
    return <span key={index}>{item.text}</span>;
  });
}
