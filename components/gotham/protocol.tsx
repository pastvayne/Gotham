"use client";

import { useState } from "react";

const stages = [
  {
    id: "shield",
    index: "01",
    label: "Shield",
    summary: "Deposit a supported asset into a future pool.",
    body: "A wallet would approve an Elysium asset and deposit it. The pool records a commitment, which is only a hash of a private note. The deposit itself stays public: the sender, the token, and the amount are visible in the transfer. Shielding does not rewrite that record.",
    limit: "Not operational. No pool is deployed, and no asset list has been activated.",
  },
  {
    id: "transfer",
    index: "02",
    label: "Transfer",
    summary: "Move value by proving a note, not by publishing one.",
    body: "A later transfer would spend a note and create another for the recipient. A zero-knowledge proof is how the contract would check that the note exists, that it has not been spent, and that the amounts balance, without receiving the note itself. The recipient would decrypt their new note locally. No proving system has been selected, so this step cannot run.",
    limit: "A transfer that hides a normal token payment in the interface would not be private. That is not the design, and it is not what the preview does.",
  },
  {
    id: "unshield",
    index: "03",
    label: "Unshield",
    summary: "Withdraw to a public Elysium address.",
    body: "Leaving the pool would pay a public address. That payment stays on the ledger. The aim is to avoid a trivial public link from that withdrawal back to one deposit, within the limits of the anonymity set, the amount, and the timing. An unshield is not an Elysium bridge withdrawal to HyperEVM.",
    limit: "The experimental contract will not pay anyone unless a verifier returns true. The verifier shipped here never does.",
  },
] as const;

export function Protocol() {
  const [active, setActive] = useState<(typeof stages)[number]["id"]>("shield");
  const stage = stages.find((item) => item.id === active) ?? stages[0];

  return (
    <section id="protocol" className="section section-anchor protocol">
      <div className="wrap">
        <div className="section-intro">
          <p className="kicker">How it could work</p>
          <h2 className="display section-title">Shield assets. Transfer privately. Return to Elysium.</h2>
          <p className="deck">Three steps in the design. None of them run today.</p>
        </div>

        <div className="protocol-layout">
          <div className="protocol-rail" role="tablist" aria-label="Proposed lifecycle">
            {stages.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`stage-${item.id}`}
                aria-selected={item.id === active}
                aria-controls="stage-detail"
                className={`stage ${item.id === active ? "is-on" : ""}`}
                onClick={() => setActive(item.id)}
              >
                <span>{item.index}</span>
                <strong>{item.label}</strong>
                <em>{item.summary}</em>
              </button>
            ))}
          </div>
          <article id="stage-detail" role="tabpanel" aria-labelledby={`stage-${stage.id}`} className="stage-detail" tabIndex={0}>
            <p className="kicker">Proposed · not live</p>
            <h3 className="display">{stage.label}</h3>
            <p>{stage.body}</p>
            <p className="callout">{stage.limit}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
