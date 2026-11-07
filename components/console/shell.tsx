"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Logo } from "@/components/logo";
import { WalletProvider } from "@/components/console/wallet";

const links = [
  { href: "/app", label: "Overview" },
  { href: "/app/shield", label: "Shield" },
  { href: "/app/transfer", label: "Private transfer" },
  { href: "/app/unshield", label: "Unshield" },
  { href: "/app/activity", label: "Activity" },
  { href: "/app/settings", label: "Settings" },
];

export function ConsoleShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <WalletProvider>
      <div className="console">
        <p className="console-banner">Demo only. This app cannot sign or broadcast a transaction.</p>
        <div className="console-body">
          <nav className="console-nav" aria-label="Application">
            <Link href="/" className="console-brand" aria-label="Back to the Gotham site">
              <Logo size={18} />
              <span>Gotham</span>
            </Link>
            <ul>
              {links.map((link) => {
                const current = link.href === "/app" ? pathname === "/app" : pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link href={link.href} aria-current={current ? "page" : undefined}>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="console-main">{children}</div>
        </div>
      </div>
    </WalletProvider>
  );
}
