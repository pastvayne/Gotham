import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/docs/markdown-view";
import { docs, findDoc } from "@/lib/docs";
import { parseMarkdown } from "@/lib/markdown";

const articles = Object.fromEntries(
  docs.map((doc) => [doc.slug, readFileSync(join(process.cwd(), "docs", `${doc.slug}.md`), "utf8")]),
);

export function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = findDoc(slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/docs/${doc.slug}` },
  };
}

export default function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<p className="kicker">Opening the page</p>}>
      <DocBody params={params} />
    </Suspense>
  );
}

async function DocBody({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = findDoc(slug);
  const raw = doc ? articles[doc.slug] : undefined;
  if (!doc || !raw) notFound();
  const parsed = parseMarkdown(raw);

  return (
    <article className="docs-article">
      <p className="kicker">Documentation</p>
      <h1 className="display docs-title">{parsed.title || doc.title}</h1>
      <Markdown blocks={parsed.blocks} />
    </article>
  );
}
