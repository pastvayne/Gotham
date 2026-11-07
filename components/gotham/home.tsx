import Link from "next/link";

const phases = [
  { name: "Now", text: "The site, the preview, and the written design.", current: true },
  { name: "Next", text: "A proving system, tested on Elysium testnet.", current: false },
  { name: "Then", text: "An external review of what a payment still reveals.", current: false },
  { name: "Later", text: "A limited release only after that review.", current: false },
];

const exposed = [
  { name: "Balance", note: "Readable" },
  { name: "Counterparty", note: "Named" },
  { name: "History", note: "Mapped" },
];

export function Problem() {
  return (
    <section id="problem" className="chapter section-anchor">
      <div className="sheet chapter-split">
        <div>
          <p className="chapter-index">01</p>
          <h2 className="chapter-title">Your wallet shouldn&apos;t reveal your financial life.</h2>
          <p className="chapter-line">A public payment names the sender, the recipient, and the amount.</p>
        </div>
        <figure className="record" aria-label="One wallet publishes a balance, a counterparty, and a history.">
          <ol>
            {exposed.map((item) => (
              <li key={item.name}>
                <span>{item.name}</span>
                <em>{item.note}</em>
              </li>
            ))}
          </ol>
        </figure>
      </div>
    </section>
  );
}

export function Ecosystem() {
  return (
    <section id="ecosystem" className="chapter section-anchor">
      <div className="sheet">
        <p className="chapter-index">03</p>
        <h2 className="chapter-title">The pool is not the token.</h2>
        <div className="pair">
          <div>
            <p className="pair-name">Protocol</p>
            <p>A shielded pool in design. Value would enter, move inside, and return to a public address.</p>
          </div>
          <div>
            <p className="pair-name">$GOTHAM</p>
            <p>A proposed token with no supply. Holding it would not make a payment private.</p>
          </div>
        </div>
        <p className="chapter-more">
          <Link className="text-link" href="/docs/architecture">
            Architecture and limits
          </Link>
        </p>
      </div>
    </section>
  );
}

export function Roadmap() {
  return (
    <section id="roadmap" className="chapter section-anchor">
      <div className="sheet">
        <p className="chapter-index">04</p>
        <h2 className="chapter-title">Reviewed before it is real.</h2>
        <ol className="sequence">
          {phases.map((phase) => (
            <li key={phase.name} className={phase.current ? "is-now" : undefined}>
              <h3>{phase.name}</h3>
              <p>{phase.text}</p>
            </li>
          ))}
        </ol>
        <p className="sequence-note">
          The preview cannot move funds. Claims stay unproven until the system exists and is reviewed.{" "}
          <Link href="/docs/threat-model">Threat model</Link>
        </p>
      </div>
    </section>
  );
}
