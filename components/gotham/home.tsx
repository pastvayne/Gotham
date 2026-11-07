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

const motions = [
  { name: "Shield", text: "Assets enter the pool from a public wallet." },
  { name: "Transfer", text: "Value moves inside the pool, without publishing the link." },
  { name: "Unshield", text: "Value returns to a public address." },
];

export function HowItWorks() {
  return (
    <section id="works" className="chapter section-anchor">
      <div className="sheet">
        <p className="chapter-index">02</p>
        <h2 className="chapter-title">Shield. Transfer. Return.</h2>
        <ol className="sequence steps">
          {motions.map((step) => (
            <li key={step.name}>
              <h3>{step.name}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Infrastructure() {
  return (
    <section id="infrastructure" className="chapter section-anchor">
      <div className="sheet">
        <p className="chapter-index">04</p>
        <h2 className="chapter-title">Privacy infrastructure for Elysium.</h2>
        <div className="pair">
          <div>
            <p className="pair-name">The pool</p>
            <p>A shielded pool. Notes and proofs carry a payment that the ledger does not publish.</p>
          </div>
          <div>
            <p className="pair-name">Elysium</p>
            <p>Designed for Elysium, where a public payment otherwise names both sides.</p>
          </div>
        </div>
        <p className="chapter-more">
          <Link className="text-link" href="/docs/architecture">
            Architecture
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
        <p className="chapter-index">05</p>
        <h2 className="chapter-title">From a public design to a reviewed system.</h2>
        <ol className="sequence">
          {phases.map((phase) => (
            <li key={phase.name} className={phase.current ? "is-now" : undefined}>
              <h3>{phase.name}</h3>
              <p>{phase.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
