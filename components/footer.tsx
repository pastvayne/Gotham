import Link from "next/link";
import { Logo } from "@/components/logo";
import { brand, navItems } from "@/lib/brand";
import { docs } from "@/lib/docs";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Link href="/" className="brand-lockup" aria-label="Gotham home">
            <Logo size={26} className="brand-mark" />
            <span>Gotham</span>
          </Link>
          <p className="footer-tagline">{brand.tagline}</p>
        </div>
        <nav className="footer-col" aria-label="Site">
          <p className="footer-head">Site</p>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="footer-col" aria-label="Documentation">
          <p className="footer-head">Documentation</p>
          <ul>
            {docs.slice(0, 5).map((doc) => (
              <li key={doc.slug}>
                <Link href={`/docs/${doc.slug}`}>{doc.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer-notice">
          <p className="footer-head">Notice</p>
          <p>
            Gotham is an independent design for a privacy protocol on Elysium. It is not deployed, not audited, and not a
            product of Kinetiq, Hyperliquid, or Ascend.
          </p>
          <p>Nothing here is financial advice, a yield, or a promise that activity can be made untraceable.</p>
        </div>
      </div>
      <div className="footer-base">
        <p>© 2026 Gotham</p>
        <p>Not deployed · No audited contracts · trygotham.tech</p>
      </div>
    </footer>
  );
}
