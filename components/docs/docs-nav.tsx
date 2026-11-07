"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docs } from "@/lib/docs";

export function DocsNav() {
  const pathname = usePathname();

  return (
    <nav className="docs-side" aria-label="Documentation">
      <p className="footer-head">Docs</p>
      <ul>
        <li>
          <Link href="/docs" aria-current={pathname === "/docs" ? "page" : undefined}>
            Index
          </Link>
        </li>
        {docs.map((doc) => {
          const href = `/docs/${doc.slug}`;
          return (
            <li key={doc.slug}>
              <Link href={href} aria-current={pathname === href ? "page" : undefined}>
                {doc.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
