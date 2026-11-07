"use client";

import { useState } from "react";

type Mode = "public" | "gotham";

export function Experience() {
  const [mode, setMode] = useState<Mode>("public");

  return (
    <section id="experience" className="section section-anchor experience">
      <div className="wrap wide">
        <div className="experience-head">
          <div>
            <p className="kicker">The Gotham experience</p>
            <h2 className="display section-title">Shield. Transfer. Return.</h2>
          </div>
          <p>
            A normal payment publishes the relationship. Gotham is designed so the relationship inside the pool is not
            part of that record. This view is a concept. No funds move.
          </p>
        </div>
        <div className="mode-switch" role="tablist" aria-label="Transaction model">
          <button type="button" role="tab" aria-selected={mode === "public"} className={mode === "public" ? "is-on" : ""} onClick={() => setMode("public")}>
            Elysium transfer
          </button>
          <button type="button" role="tab" aria-selected={mode === "gotham"} className={mode === "gotham" ? "is-on" : ""} onClick={() => setMode("gotham")}>
            Gotham model
          </button>
        </div>
        <div className="stage-frame" role="tabpanel">
          {mode === "public" ? <PublicStage /> : <GothamStage />}
        </div>
      </div>
    </section>
  );
}

function PublicStage() {
  return (
    <div className="stage-layout">
      <svg className="flow" viewBox="0 0 980 280" role="img" aria-label="Wallet A sends 1,000 USDC to Wallet B on a public ledger.">
        <path className="flow-path" pathLength={1} d="M150 140 H830" />
        <Circle x={120} y={140} title="A" />
        <Circle x={490} y={140} title="Ledger" wide />
        <Circle x={860} y={140} title="B" />
        <text className="flow-meta" x="300" y="112">
          1,000 USDC · example
        </text>
        <text className="flow-meta" x="620" y="112">
          Sender, recipient, time
        </text>
      </svg>
      <aside>
        <h3>The link is the record.</h3>
        <p>Anyone with a node can see that A paid B, how much moved, and when.</p>
        <p>Repeat that, and a wallet becomes a history.</p>
      </aside>
    </div>
  );
}

function GothamStage() {
  return (
    <div className="stage-layout">
      <svg className="flow" viewBox="0 0 980 280" role="img" aria-label="A public deposit enters a pool. The transfer inside is not published. The withdrawal is public.">
        <path className="flow-path" pathLength={1} d="M130 140 H250" />
        <path className="flow-quiet" d="M390 110 C460 70 520 210 590 150" />
        <path className="flow-path" pathLength={1} d="M730 140 H850" />
        <rect className="pool" x="250" y="58" width="480" height="164" />
        <text className="flow-meta" x="490" y="148" textAnchor="middle">
          Private transfer · not published
        </text>
        <Circle x={110} y={140} title="A" />
        <Circle x={870} y={140} title="B" />
        <text className="flow-meta" x="190" y="118">
          Deposit
        </text>
        <text className="flow-meta" x="760" y="118">
          Withdrawal
        </text>
      </svg>
      <aside>
        <h3>Concept, not a live pool.</h3>
        <p>The deposit and the withdrawal stay public. The payment between them is what the design keeps off the record.</p>
        <p>A small set of users, a distinct amount, or close timing can still connect those two events.</p>
      </aside>
    </div>
  );
}

function Circle({ x, y, title, wide = false }: { x: number; y: number; title: string; wide?: boolean }) {
  const width = wide ? 108 : 64;
  return (
    <g>
      <rect className="flow-node" x={x - width / 2} y={y - 22} width={width} height={44} />
      <text className="flow-label" x={x} y={y + 5} textAnchor="middle">
        {title}
      </text>
    </g>
  );
}
