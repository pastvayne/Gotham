"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { brand, navItems } from "@/lib/brand";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const solid = scrolled || open || pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`site-header ${solid ? "is-solid" : ""}`}>
      <div className="site-header-bar">
        <Link href="/" className="brand-lockup" onClick={() => setOpen(false)} aria-label="Gotham home">
          <Logo size={18} priority className="brand-mark" />
          <span>Gotham</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary">
          {navItems.map((item) => {
            const current = item.href === "/docs" ? pathname.startsWith("/docs") : item.href === "/app" ? pathname.startsWith("/app") : false;
            return (
              <Link key={item.href} href={item.href} aria-current={current ? "page" : undefined} className="nav-link">
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="header-end">
          <Link className="btn btn-line btn-small header-app" href="/app">
            Open preview
          </Link>
          <button
            type="button"
            className="menu-button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <MenuGlyph open={open} />
          </button>
        </div>
      </div>
      <nav id="mobile-nav" aria-label="Mobile" className={`menu-panel ${open ? "is-open" : ""}`} inert={!open}>
        <ol>
          {navItems.map((item, index) => (
            <li key={item.href}>
              <Link href={item.href} onClick={() => setOpen(false)}>
                <span className="menu-index">{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ol>
        <div className="menu-foot">
          <Link className="btn btn-solid" href="/app" onClick={() => setOpen(false)}>
            Preview the App
          </Link>
          <p>{brand.narrative}</p>
        </div>
      </nav>
    </header>
  );
}

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d={open ? "M6 6 L18 18 M18 6 L6 18" : "M4 8 H20 M4 16 H20"} fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
