import Link from "next/link";

const phases = [
  { name: "Now", text: "The public site, the preview, and a written design for the pool." },
  { name: "Next", text: "Choose a reviewed proving system and test the flow on Elysium testnet." },
  { name: "Then", text: "Study what a transaction still reveals, and commission an external review." },
  { name: "Later", text: "A limited release only after that review, on a network whose details are published." },
];

export function Problem() {
  return (
    <section id="problem" className="section section-anchor problem">
      <div className="wrap problem-grid">
        <div>
          <p className="kicker">The problem</p>
          <h2 className="display section-title">Your wallet shouldn&apos;t reveal your financial life.</h2>
          <p className="lede">
            A public chain makes a payment easy to check. It also makes that payment easy to follow.
          </p>
        </div>
        <figure className="exposure">
          <svg viewBox="0 0 640 420" role="img" aria-label="One wallet connects to a balance, a counterparty, and a history.">
            <circle className="exposure-core" cx="250" cy="210" r="46" />
            <text className="exposure-core-label" x="250" y="216" textAnchor="middle">
              Wallet
            </text>
            <path d="M296 210 H430" />
            <path d="M250 164 V70 H430" />
            <path d="M250 256 V350 H430" />
            <g className="exposure-note">
              <text x="446" y="64">Balance</text>
              <text x="446" y="92">Readable by anyone.</text>
            </g>
            <g className="exposure-note">
              <text x="446" y="204">Counterparty</text>
              <text x="446" y="232">The other wallet is named.</text>
            </g>
            <g className="exposure-note">
              <text x="446" y="344">History</text>
              <text x="446" y="372">Payments accumulate into a map.</text>
            </g>
          </svg>
        </figure>
      </div>
    </section>
  );
}

export function Ecosystem() {
  return (
    <section id="ecosystem" className="section section-anchor">
      <div className="wrap ecosystem-grid">
        <article>
          <p className="kicker">The protocol</p>
          <h2 className="display section-title">Privacy infrastructure for Elysium.</h2>
          <p className="lede">
            Gotham is being designed as a shielded pool on Elysium. You would deposit a supported asset, transfer inside
            the pool, and withdraw to a public address.
          </p>
          <p>
            The deposit and the withdrawal remain visible. The aim is a payment between them that does not publish the
            usual sender-to-recipient link. That property does not exist until the cryptography is built and reviewed.
          </p>
          <p>
            <Link className="text-link" href="/docs/architecture">
              Architecture and limits
            </Link>
          </p>
        </article>
        <article className="token-column">
          <p className="kicker">$GOTHAM</p>
          <h2 className="display token-title">A separate token. Not the privacy layer.</h2>
          <p>
            $GOTHAM is a proposed ERC-20. It has no contract and no supply. Owning it would not make a balance private,
            and the design does not require anyone to buy it in order to transfer.
          </p>
          <p>No fee, yield, or buyback is offered. None has been decided.</p>
        </article>
      </div>
    </section>
  );
}

export function Roadmap() {
  return (
    <section id="roadmap" className="section section-anchor roadmap">
      <div className="wrap">
        <p className="kicker">Roadmap</p>
        <h2 className="display section-title">From a public design to a reviewed system.</h2>
        <ol className="road">
          {phases.map((phase) => (
            <li key={phase.name}>
              <h3>{phase.name}</h3>
              <p>{phase.text}</p>
            </li>
          ))}
        </ol>
        <p className="road-note">
          The preview cannot move funds. Treat every privacy claim as unproven until the system exists and has been
          reviewed. Details live in the <Link href="/docs/threat-model">threat model</Link>.
        </p>
      </div>
    </section>
  );
}
