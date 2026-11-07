export function Demo() {
  return (
    <section id="demonstration" className="section section-anchor demo">
      <div className="wrap">
        <div className="section-intro">
          <p className="kicker">Demonstration</p>
          <h2 className="display section-title">What a transfer publishes.</h2>
          <p className="deck">
            Both pictures use example wallets. Nothing here is sent to a network. The Gotham side is a concept until the
            cryptography is built and reviewed.
          </p>
        </div>
        <div className="compare">
          <article>
            <header>
              <h3>Public transfer</h3>
              <p>A normal Elysium token transfer. The relationship is part of the record.</p>
            </header>
            <PublicGraph />
            <dl>
              <div>
                <dt>Visible</dt>
                <dd>Sender, recipient, token, amount, and time.</dd>
              </div>
              <div>
                <dt>Who can read it</dt>
                <dd>Anyone with a node or an explorer.</dd>
              </div>
            </dl>
          </article>
          <article>
            <header>
              <h3>Gotham transfer</h3>
              <p>A proposed shielded payment. The internal link is what the design tries not to publish.</p>
            </header>
            <PrivateGraph />
            <dl>
              <div>
                <dt>Still visible</dt>
                <dd>The deposit into the pool, and the later withdrawal out of it.</dd>
              </div>
              <div>
                <dt>Not published</dt>
                <dd>Which note paid which recipient inside the pool. Not a promise that the link cannot be guessed.</dd>
              </div>
            </dl>
          </article>
        </div>
      </div>
    </section>
  );
}

function PublicGraph() {
  return (
    <svg className="graph" viewBox="0 0 520 220" role="img" aria-label="Wallet A pays Wallet B on a public ledger.">
      <line className="graph-link" x1="90" y1="110" x2="250" y2="110" />
      <line className="graph-link" x1="270" y1="110" x2="430" y2="110" />
      <Node x={70} y={110} label="A" />
      <Node x={260} y={110} label="Ledger" wide />
      <Node x={450} y={110} label="B" />
      <text className="graph-note" x="170" y="92">
        1,000 USDC
      </text>
      <text className="graph-note" x="330" y="92">
        example
      </text>
    </svg>
  );
}

function PrivateGraph() {
  return (
    <svg className="graph" viewBox="0 0 520 220" role="img" aria-label="A deposit and a withdrawal are visible. The payment inside the pool is not published.">
      <line className="graph-link" x1="90" y1="110" x2="188" y2="110" />
      <line className="graph-link graph-hidden" x1="250" y1="78" x2="270" y2="142" />
      <line className="graph-link" x1="332" y1="110" x2="430" y2="110" />
      <rect className="graph-pool" x="190" y="62" width="140" height="96" />
      <text className="graph-note" x="260" y="112" textAnchor="middle">
        Pool
      </text>
      <Node x={70} y={110} label="A" />
      <Node x={450} y={110} label="B" />
      <text className="graph-note" x="130" y="92">
        Deposit
      </text>
      <text className="graph-note" x="360" y="92">
        Withdrawal
      </text>
    </svg>
  );
}

function Node({ x, y, label, wide = false }: { x: number; y: number; label: string; wide?: boolean }) {
  const width = wide ? 84 : 36;
  return (
    <g>
      <rect className="graph-node" x={x - width / 2} y={y - 16} width={width} height={32} />
      <text className="graph-label" x={x} y={y + 4} textAnchor="middle">
        {label}
      </text>
    </g>
  );
}
