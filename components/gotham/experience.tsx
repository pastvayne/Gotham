"use client";

import { useState } from "react";

type View = "public" | "gotham";
type Step = "deposit" | "transfer" | "withdrawal";

const steps: { id: Step; name: string; detail: string; line: string }[] = [
  {
    id: "deposit",
    name: "Shield",
    detail: "Public entry",
    line: "A deposit leaves a public wallet. That entry stays visible.",
  },
  {
    id: "transfer",
    name: "Transfer",
    detail: "Not published",
    line: "The payment inside the pool is not written to the ledger.",
  },
  {
    id: "withdrawal",
    name: "Unshield",
    detail: "Public exit",
    line: "Value returns to a public address. The withdrawal can still be seen.",
  },
];

export function Experience() {
  const [view, setView] = useState<View>("gotham");
  const [step, setStep] = useState<Step>("transfer");
  const active = steps.find((item) => item.id === step) ?? steps[1];
  const line = view === "public" ? "The sender, the amount, and the recipient are one record." : active.line;

  return (
    <section id="experience" className="demo section-anchor">
      <div className="demo-sheet">
        <div className="demo-head">
          <div>
            <p className="chapter-index">02</p>
            <h2 className="chapter-title">What the ledger shows.</h2>
          </div>
          <div className="demo-switch" role="tablist" aria-label="How the payment is recorded">
            <button type="button" role="tab" aria-selected={view === "public"} className={view === "public" ? "is-on" : ""} onClick={() => setView("public")}>
              Public ledger
            </button>
            <button type="button" role="tab" aria-selected={view === "gotham"} className={view === "gotham" ? "is-on" : ""} onClick={() => setView("gotham")}>
              Gotham model
            </button>
          </div>
        </div>

        <Ledger view={view} step={step} />

        {view === "public" ? (
          <ol className="ledger-facts">
            <li>
              <strong>Sender</strong>
              <span>Named</span>
            </li>
            <li>
              <strong>Amount</strong>
              <span>Exact</span>
            </li>
            <li>
              <strong>Recipient</strong>
              <span>Named</span>
            </li>
          </ol>
        ) : (
          <div className="ledger-facts" role="tablist" aria-label="Moment in the Gotham model">
            {steps.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={step === item.id}
                className={step === item.id ? "is-on" : ""}
                onClick={() => setStep(item.id)}
              >
                <strong>{item.name}</strong>
                <span>{item.detail}</span>
              </button>
            ))}
          </div>
        )}

        <p className="demo-line">{line}</p>
        <p className="demo-note">Concept. No funds move.</p>
      </div>
    </section>
  );
}

function Ledger({ view, step }: { view: View; step: Step }) {
  const gotham = view === "gotham";
  const weight = (id: Step) => (step === id ? 1 : 0.55);

  return (
    <svg className={`ledger ${gotham ? "is-gotham" : "is-public"}`} viewBox="0 0 1200 168" role="img" aria-hidden="true">
      <text className="ledger-end" x="28" y="46">
        Wallet A
      </text>
      <text className="ledger-end" x="1172" y="46" textAnchor="end">
        Wallet B
      </text>

      <line className="ledger-live" x1="28" y1="108" x2="1172" y2="108" opacity={gotham ? 0 : 1} pathLength={1} />
      <circle className="ledger-mark" cx="28" cy="108" r="4.5" opacity={gotham ? 0 : 1} />
      <circle className="ledger-mark" cx="1172" cy="108" r="4.5" opacity={gotham ? 0 : 1} />

      <line className="ledger-part" x1="28" y1="108" x2="390" y2="108" opacity={gotham ? weight("deposit") : 0} />
      <circle className="ledger-mark" cx="28" cy="108" r="4.5" opacity={gotham ? weight("deposit") : 0} />
      <line className="ledger-gap" x1="430" y1="108" x2="520" y2="108" opacity={gotham ? (step === "transfer" ? 1 : 0.45) : 0} />
      <line className="ledger-gap" x1="680" y1="108" x2="770" y2="108" opacity={gotham ? (step === "transfer" ? 1 : 0.45) : 0} />
      <line className="ledger-part" x1="810" y1="108" x2="1172" y2="108" opacity={gotham ? weight("withdrawal") : 0} />
      <circle className="ledger-mark" cx="1172" cy="108" r="4.5" opacity={gotham ? weight("withdrawal") : 0} />

      <text className="ledger-italic" x="600" y="86" textAnchor="middle" opacity={gotham && step === "transfer" ? 1 : 0}>
        not published
      </text>
    </svg>
  );
}
