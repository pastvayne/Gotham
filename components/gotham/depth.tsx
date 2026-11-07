"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { depths } from "@/lib/brand";

export function Depth() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<(typeof depths)[number]["id"]>(depths[0].id);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;

    const update = () => {
      const start = document.getElementById("surface");
      const end = document.getElementById("community");
      if (!start || !end) return;
      const startTop = start.getBoundingClientRect().top + window.scrollY;
      const endBottom = end.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;
      const next = Math.min(1, Math.max(0, (window.scrollY - startTop) / Math.max(1, endBottom - startTop)));
      setProgress(next);
      setShown(window.scrollY > window.innerHeight * 0.45);

      let current: (typeof depths)[number]["id"] = depths[0].id;
      for (const item of depths) {
        const element = document.getElementById(item.id);
        if (!element) continue;
        if (element.getBoundingClientRect().top < window.innerHeight * 0.38) current = item.id;
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <>
      <div className="depth-bar" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <nav className={`depth-rail ${shown ? "is-shown" : ""}`} aria-label="On this page">
        <div className="depth-track" style={{ ["--depth" as string]: String(progress) }}>
          <span className="depth-fill" />
        </div>
        <ol>
          {depths.map((item) => (
            <li key={item.id} className={item.id === active ? "is-active" : undefined}>
              <a href={`#${item.id}`}>{item.label}</a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
