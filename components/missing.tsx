import Link from "next/link";
import { Logo } from "@/components/logo";

export function Missing({ withMark = false }: { withMark?: boolean }) {
  return (
    <div className="missing" id={withMark ? "main" : undefined}>
      {withMark ? (
        <Link href="/" className="brand-lockup" aria-label="Gotham home">
          <Logo size={20} />
          <span>Gotham</span>
        </Link>
      ) : null}
      <p className="kicker">404</p>
      <h1 className="display">This page does not exist.</h1>
      <p>The address does not match a Gotham page.</p>
      <Link href="/" className="btn btn-solid">
        Return to the surface
      </Link>
    </div>
  );
}
