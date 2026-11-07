import type { Metadata } from "next";
import Link from "next/link";
import { docs } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Documentation",
  description: "What Gotham is designed to do, what it does not do, and what has not been built.",
  alternates: { canonical: "/docs" },
};

export default function DocsIndexPage() {
  return (
    <article className="docs-article">
      <p className="kicker">Documentation</p>
      <h1 className="display docs-title">What is specified, and what is not built.</h1>
      <p className="deck">Gotham is a proposed shielded pool for Elysium. These pages separate that design from what exists today.</p>
      <ol className="index-list">
        {docs.map((doc, index) => (
          <li key={doc.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>
                <Link href={`/docs/${doc.slug}`}>{doc.title}</Link>
              </h2>
              <p>{doc.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}
