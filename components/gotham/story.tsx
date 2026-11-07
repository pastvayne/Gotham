import Link from "next/link";
import { elysiumDocs, networkFacts, testnetTokens } from "@/lib/elysium";

export function Exposure() {
  return (
    <section id="exposure" className="section section-anchor">
      <div className="wrap split-copy">
        <div>
          <p className="kicker">The problem</p>
          <h2 className="display section-title">Your wallet shouldn&apos;t reveal your entire financial history.</h2>
        </div>
        <div className="prose-block">
          <p>Public transactions are easy to trace. Gotham is being built to offer another option.</p>
          <p>
            On Elysium, a normal transfer records the sender, the recipient, the token, and the amount. Repeat that
            often enough and the payments form a map.
          </p>
          <dl className="plain-facts">
            <div>
              <dt>Addresses</dt>
              <dd>Both wallets are written in the clear.</dd>
            </div>
            <div>
              <dt>Amounts</dt>
              <dd>The transfer, and the balance it changes, can be read by anyone.</dd>
            </div>
            <div>
              <dt>Relationships</dt>
              <dd>One identified wallet can name the rest of the trail.</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Vision() {
  return (
    <section id="vision" className="section section-anchor">
      <div className="wrap prose-block narrow">
        <p className="kicker">The aim</p>
        <h2 className="display section-title">Privacy is a feature of financial freedom.</h2>
        <p>
          A payment can be valid without advertising who paid whom. Gotham&apos;s design keeps the check and leaves the
          note with the people involved.
        </p>
        <p>
          That is selective disclosure, not invisibility. A deposit stays public. A withdrawal stays public. A small set
          of users can still make those two events easy to connect.
        </p>
        <p className="aside-line">Even in paradise, some things are meant to remain unseen.</p>
      </div>
    </section>
  );
}

export function Architecture() {
  return (
    <section id="architecture" className="section section-anchor">
      <div className="wrap">
        <div className="section-intro">
          <p className="kicker">Design</p>
          <h2 className="display section-title">A pool on Elysium. Not a second chain.</h2>
          <p className="deck">
            Hiding an ordinary transfer in the interface would not make it private. Gotham is specified as contracts and
            proofs. Neither is live.
          </p>
        </div>
        <div className="table-scroll">
          <table className="spec">
            <thead>
              <tr>
                <th>Piece</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Public wallet</td>
                <td>Deposits assets and later receives a withdrawal. Both actions stay on the ledger.</td>
                <td>How Elysium already works</td>
              </tr>
              <tr>
                <td>Note</td>
                <td>The private record of value. The spending key stays with the user.</td>
                <td>Not generated. A fake key would be a trap.</td>
              </tr>
              <tr>
                <td>Commitment</td>
                <td>The hash the pool stores. The hash can be public. The note should not be.</td>
                <td>Sketched in the experimental contract</td>
              </tr>
              <tr>
                <td>Proof</td>
                <td>Shows the note is real, unspent, and balanced, without handing the note to the chain.</td>
                <td>No proving system selected</td>
              </tr>
              <tr>
                <td>Nullifier</td>
                <td>Marks a note spent so it cannot be spent again.</td>
                <td>Sketched. Useless without a real proof.</td>
              </tr>
              <tr>
                <td>Relayer</td>
                <td>Could submit a proof so the user&apos;s wallet does not pay gas every time.</td>
                <td>Not built. A relayer would see what it sends.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="section-follow">
          <Link href="/docs/architecture" className="text-link">
            Read the architecture
          </Link>
        </p>
      </div>
    </section>
  );
}

export function ElysiumBand() {
  return (
    <section id="elysium" className="section section-anchor">
      <div className="wrap split-copy">
        <div>
          <p className="kicker">Elysium</p>
          <h2 className="display section-title">Only the facts the chain publishes.</h2>
          <p className="deck">
            Elysium is Kinetiq&apos;s layer for Hyperliquid. Gotham is not their product, and this site does not speak
            for them.
          </p>
          <p className="deck">
            Checked {elysiumDocs.reviewed}. Mainnet was still described as pre-launch, with no public RPC or explorer.
            Those values are not invented here.
          </p>
          <p className="section-follow">
            <a className="text-link" href={elysiumDocs.connecting}>
              Elysium connecting guide
            </a>
          </p>
        </div>
        <dl className="plain-facts">
          {networkFacts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
          {testnetTokens.map((token) => (
            <div key={token.symbol}>
              <dt>{token.symbol} testnet</dt>
              <dd className="break">{token.address}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const phases = [
  {
    name: "Foundation",
    state: "In progress",
    text: "This site, the preview, the written threat model, and a contract scaffold.",
  },
  {
    name: "Proof of concept",
    state: "Not started",
    text: "Choose a reviewed proving system and try the flow on testnet.",
  },
  {
    name: "Hardening",
    state: "Not started",
    text: "Leakage analysis, an external review, and a look at compliance.",
  },
  {
    name: "Deployment",
    state: "Not started",
    text: "Only after review, and only with mainnet details the chain has actually published.",
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="section section-anchor">
      <div className="wrap">
        <div className="section-intro">
          <p className="kicker">Roadmap</p>
          <h2 className="display section-title">One phase has started.</h2>
          <p className="deck">A line here is not a feature you can use.</p>
        </div>
        <ol className="phases">
          {phases.map((phase, index) => (
            <li key={phase.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{phase.name}</h3>
                <p className="phase-state">{phase.state}</p>
                <p>{phase.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Token() {
  return (
    <section id="token" className="section section-anchor">
      <div className="wrap split-copy">
        <div>
          <p className="kicker">$GOTHAM</p>
          <h2 className="display section-title">The token is not the privacy system.</h2>
          <p className="deck">
            The protocol is notes, commitments, and proofs. The token is a proposed ERC-20. It has no contract, no
            supply, and no sale. Holding it would not make a balance private.
          </p>
        </div>
        <div>
          <p>Possible later uses, none of them active:</p>
          <ul className="quiet-list">
            <li>Governance of non-sensitive parameters</li>
            <li>Funding research and ecosystem work</li>
            <li>Becoming an asset the pool can shield</li>
          </ul>
          <p>
            The current design does not require anyone to buy $GOTHAM to transfer. No fee, buyback, or holder reward is
            stated, because none has been decided.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Community() {
  return (
    <section id="community" className="section section-anchor">
      <div className="wrap split-copy">
        <div>
          <p className="kicker">Next</p>
          <h2 className="display section-title">Read the limits before you expect privacy.</h2>
          <p className="deck">Public channels have not been announced. The app cannot move funds.</p>
          <div className="hero-actions">
            <Link className="btn btn-solid" href="/docs/threat-model">
              Threat model
            </Link>
            <Link className="btn btn-line" href="/app">
              Open the preview
            </Link>
          </div>
        </div>
        <p className="deck">
          Independent project for the Elysium ecosystem. No claimed affiliation with Kinetiq, Hyperliquid, or Ascend.
        </p>
      </div>
    </section>
  );
}
