"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { isAddress } from "viem";
import { protocolStatus } from "@gotham/sdk";
import { formatAmount, parseAmount } from "@/lib/amount";
import { elysiumDocs, elysiumMainnet, elysiumTestnet, testnetTokens } from "@/lib/elysium";
import { useWallet } from "@/components/console/wallet";

const assets = [
  { id: "USDC", label: "USDC", kind: "erc20" as const, decimalsHint: "Read from the token when a wallet is on testnet." },
  { id: "WHYPE", label: "WHYPE", kind: "erc20" as const, decimalsHint: "Read from the token when a wallet is on testnet." },
  { id: "HYPE", label: "HYPE", kind: "native" as const, decimalsHint: "Native gas. The experimental pool does not accept it." },
  { id: "GOTHAM", label: "$GOTHAM", kind: "unissued" as const, decimalsHint: "No contract has been issued." },
];

export function Overview() {
  const wallet = useWallet();
  const onTestnet = wallet.chainId === elysiumTestnet.chainId;

  return (
    <div className="console-page">
      <header className="console-head">
        <p className="kicker">Overview</p>
        <h1>Public position, and nothing shielded.</h1>
        <p>
          Shielded balances are unavailable because no pool is deployed.{" "}
          <Link href="/docs/threat-model">Read the threat model</Link> before expecting privacy from this screen.
        </p>
      </header>

      <section className="console-grid">
        <article className="console-card">
          <h2>Wallet</h2>
          {wallet.status === "connected" && wallet.address ? (
            <>
              <p className="break">{wallet.address}</p>
              <p className="muted">Chain ID {wallet.chainId ?? "unknown"}</p>
              <div className="console-actions">
                {wallet.chainId !== elysiumTestnet.chainId ? (
                  <button type="button" className="btn btn-solid" onClick={() => void wallet.switchToTestnet()}>
                    Switch to testnet
                  </button>
                ) : null}
                <button type="button" className="btn btn-line" onClick={() => void wallet.refresh()} disabled={wallet.reading}>
                  {wallet.reading ? "Reading" : "Refresh public balances"}
                </button>
                <button type="button" className="btn btn-line" onClick={wallet.disconnect}>
                  Disconnect in this app
                </button>
              </div>
            </>
          ) : (
            <>
              <p>No wallet is connected. You can inspect the preview without one.</p>
              <button type="button" className="btn btn-solid" onClick={() => void wallet.connect()} disabled={wallet.status === "connecting"}>
                {wallet.status === "connecting" ? "Waiting for wallet" : "Connect wallet"}
              </button>
            </>
          )}
          {wallet.error ? <p role="alert">{wallet.error}</p> : null}
        </article>

        <article className="console-card">
          <h2>Network</h2>
          <dl className="mini-facts">
            <div>
              <dt>Testnet</dt>
              <dd>
                {elysiumTestnet.name} · {elysiumTestnet.chainId}
              </dd>
            </div>
            <div>
              <dt>Mainnet</dt>
              <dd>
                Chain ID {elysiumMainnet.chainId} · {elysiumMainnet.status}. Public RPC is not published.
              </dd>
            </div>
            <div>
              <dt>Gas</dt>
              <dd>HYPE</dd>
            </div>
          </dl>
        </article>
      </section>

      {wallet.status === "connected" ? (
        <section className="console-card">
          <h2>Public balances</h2>
          {onTestnet ? (
            <dl className="mini-facts">
              <div>
                <dt>HYPE</dt>
                <dd>
                  {wallet.native !== undefined
                    ? `${formatAmount(wallet.native, 18)} HYPE`
                    : (wallet.nativeError ?? "Reading the public balance…")}
                </dd>
              </div>
              {wallet.tokens.map((token) => (
                <div key={token.symbol}>
                  <dt>{token.symbol}</dt>
                  <dd>
                    {token.amount !== undefined && token.decimals !== undefined
                      ? formatAmount(token.amount, token.decimals)
                      : token.error}
                  </dd>
                </div>
              ))}
              <div>
                <dt>Shielded</dt>
                <dd>Unavailable. No shielded pool is deployed.</dd>
              </div>
            </dl>
          ) : (
            <p>This wallet is not on Elysium testnet, so Gotham will not display a balance from another chain.</p>
          )}
          <p className="muted">A public read tells the shared testnet RPC which address you asked about. No signature is requested.</p>
        </section>
      ) : (
        <section className="example">
          <p className="kicker">Demo data</p>
          <h2>Sample portfolio</h2>
          <p>These figures exist so the layout is visible. They are not yours, not onchain, and not a shielded balance.</p>
          <dl className="mini-facts">
            <div>
              <dt>Public USDC</dt>
              <dd>1,250.00 example</dd>
            </div>
            <div>
              <dt>Public WHYPE</dt>
              <dd>42.00 example</dd>
            </div>
            <div>
              <dt>Shielded USDC</dt>
              <dd>800.00 example · not a real note</dd>
            </div>
          </dl>
        </section>
      )}

      <section className="console-card">
        <h2>Proposed assets</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Status</th>
                <th>Testnet address</th>
              </tr>
            </thead>
            <tbody>
              {testnetTokens.map((token) => (
                <tr key={token.symbol}>
                  <td>{token.symbol}</td>
                  <td>Canonical testnet token. Not integrated.</td>
                  <td className="break">{token.address}</td>
                </tr>
              ))}
              <tr>
                <td>HYPE</td>
                <td>Native gas. No shielding path.</td>
                <td>None. It is not an ERC-20.</td>
              </tr>
              <tr>
                <td>$GOTHAM</td>
                <td>Not issued.</td>
                <td>No address.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="muted">
          Addresses come from the{" "}
          <a href={elysiumDocs.addresses}>Elysium contract list</a>. Mainnet addresses are not published there.
        </p>
      </section>
    </div>
  );
}

export function ShieldView() {
  return (
    <FlowView
      kicker="Shield"
      title="Prepare a deposit that would stay public."
      lead="A future shield deposits an asset and records a commitment. The preview stops before an approval or a transaction."
      action="Review shield preview"
      showRecipient={false}
      showDestination={false}
    />
  );
}

export function TransferView() {
  return (
    <FlowView
      kicker="Private transfer"
      title="A transfer the chain could check without seeing the note."
      lead="The recipient identifier is not defined yet. What you type stays in this page and is not saved."
      action="Review transfer preview"
      showRecipient
      showDestination={false}
    />
  );
}

export function UnshieldView() {
  return (
    <FlowView
      kicker="Unshield"
      title="A withdrawal the public ledger would still show."
      lead="The destination and the amount would be visible. No fee schedule has been published."
      action="Review unshield preview"
      showRecipient={false}
      showDestination
    />
  );
}

function FlowView({
  kicker,
  title,
  lead,
  action,
  showRecipient,
  showDestination,
}: {
  kicker: string;
  title: string;
  lead: string;
  action: string;
  showRecipient: boolean;
  showDestination: boolean;
}) {
  const wallet = useWallet();
  const amountId = useId();
  const extraId = useId();
  const [asset, setAsset] = useState("USDC");
  const [amount, setAmount] = useState("");
  const [extra, setExtra] = useState("");
  const [error, setError] = useState("");
  const [review, setReview] = useState<string[] | null>(null);
  const reviewRef = useRef<HTMLElement>(null);

  const selected = assets.find((item) => item.id === asset) ?? assets[0];
  const balance = publicBalance(wallet, selected.id);

  useEffect(() => {
    reviewRef.current?.focus();
  }, [review]);

  function onReview(event: FormEvent) {
    event.preventDefault();
    if (parseAmount(amount, 18) === null && !/^\d+(\.\d+)?$/.test(amount.trim())) {
      setReview(null);
      setError("Enter an amount as a positive decimal.");
      return;
    }
    if (amount.trim() === "" || Number(amount) <= 0) {
      setReview(null);
      setError("Enter an amount greater than zero.");
      return;
    }
    if (showDestination && !isAddress(extra.trim())) {
      setReview(null);
      setError("Enter a destination as an EVM address.");
      return;
    }
    if (showRecipient && extra.trim().length < 3) {
      setReview(null);
      setError("Enter a recipient identifier. It will not be stored.");
      return;
    }
    setError("");
    const lines = [
      `Asset: ${selected.label}. ${selected.decimalsHint}`,
      `Amount entered: ${amount.trim()}.`,
      showDestination ? `Destination: ${extra.trim()}. This address would be public.` : "",
      showRecipient ? `Recipient identifier: ${extra.trim()}. Gotham has no identifier format yet, so this cannot be paid.` : "",
      balance ? `Public balance currently shown: ${balance}.` : "No public balance is attached to this preview.",
      "A real deposit would publish the depositor, the token, and the amount. It would not publish a note secret, because the contract has no field for one.",
      "No approval was requested. No proof was generated. No transaction was created.",
      protocolStatus.message,
    ].filter(Boolean);
    setReview(lines);
  }

  return (
    <div className="console-page">
      <header className="console-head">
        <p className="kicker">{kicker}</p>
        <h1>{title}</h1>
        <p>{lead}</p>
      </header>
      <form className="console-card form-grid" onSubmit={onReview}>
        <label>
          Asset
          <select value={asset} onChange={(event) => setAsset(event.target.value)}>
            {assets.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor={amountId}>
          Amount
          <input id={amountId} inputMode="decimal" autoComplete="off" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0.00" />
        </label>
        {showDestination ? (
          <label htmlFor={extraId}>
            Destination address
            <input id={extraId} autoComplete="off" spellCheck={false} value={extra} onChange={(event) => setExtra(event.target.value)} placeholder="0x" />
          </label>
        ) : null}
        {showRecipient ? (
          <label htmlFor={extraId}>
            Recipient identifier
            <input id={extraId} autoComplete="off" value={extra} onChange={(event) => setExtra(event.target.value)} placeholder="Not defined yet" />
          </label>
        ) : null}
        <p className="muted">{selected.kind === "unissued" ? "This asset cannot be shielded. It has not been issued." : selected.decimalsHint}</p>
        {balance ? <p className="muted">Public balance: {balance}</p> : null}
        {error ? <p role="alert">{error}</p> : null}
        <button type="submit" className="btn btn-solid">
          {action}
        </button>
      </form>
      {review ? (
        <section className="console-card" tabIndex={-1} ref={reviewRef}>
          <h2>Preview result</h2>
          <ol className="review-list">
            {review.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        </section>
      ) : null}
    </div>
  );
}

function publicBalance(
  wallet: ReturnType<typeof useWallet>,
  asset: string,
) {
  if (wallet.status !== "connected" || wallet.chainId !== elysiumTestnet.chainId) return "";
  if (asset === "HYPE" && wallet.native !== undefined) return `${formatAmount(wallet.native, 18)} HYPE`;
  const token = wallet.tokens.find((item) => item.symbol === asset);
  if (token?.amount !== undefined && token.decimals !== undefined) return `${formatAmount(token.amount, token.decimals)} ${token.symbol}`;
  return "";
}

export function ActivityView() {
  return (
    <div className="console-page">
      <header className="console-head">
        <p className="kicker">Activity</p>
        <h1>No local shielded history.</h1>
        <p>
          A public indexer cannot reconstruct notes it was never given. Gotham does not store notes or spending keys in
          this browser. There is nothing private to list.
        </p>
      </header>
      <section className="example">
        <p className="kicker">Demo data</p>
        <h2>What a future local entry might show</h2>
        <dl className="mini-facts">
          <div>
            <dt>Kind</dt>
            <dd>Shield · example</dd>
          </div>
          <div>
            <dt>Asset</dt>
            <dd>USDC · example</dd>
          </div>
          <div>
            <dt>Commitment</dt>
            <dd className="break">0xexample…not a hash of a real note</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

export function SettingsView() {
  const wallet = useWallet();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(""), 4000);
    return () => window.clearTimeout(timer);
  }, [message]);

  function clearLocal() {
    const keys = Object.keys(localStorage).filter((key) => key.startsWith("gotham-"));
    for (const key of keys) localStorage.removeItem(key);
    setMessage(keys.length ? "Cleared Gotham preferences stored in this browser." : "No Gotham preferences were stored.");
  }

  return (
    <div className="console-page">
      <header className="console-head">
        <p className="kicker">Settings</p>
        <h1>Network, storage, and the things this app will not do.</h1>
      </header>
      <section className="console-card">
        <h2>Network status</h2>
        <dl className="mini-facts">
          <div>
            <dt>Testnet RPC</dt>
            <dd className="break">{elysiumTestnet.rpcUrl}</dd>
          </div>
          <div>
            <dt>Testnet chain</dt>
            <dd>{elysiumTestnet.chainId}</dd>
          </div>
          <div>
            <dt>Mainnet</dt>
            <dd>Chain ID {elysiumMainnet.chainId}. RPC and explorer are not published, so they are not added to a wallet.</dd>
          </div>
          <div>
            <dt>This session</dt>
            <dd>{wallet.chainId ? `Chain ID ${wallet.chainId}` : "No wallet connected"}</dd>
          </div>
        </dl>
        {wallet.status === "connected" ? (
          <button type="button" className="btn btn-line" onClick={wallet.disconnect}>
            Disconnect in this app
          </button>
        ) : (
          <button type="button" className="btn btn-solid" onClick={() => void wallet.connect()}>
            Connect wallet
          </button>
        )}
      </section>
      <section className="console-card">
        <h2>Local data</h2>
        <p>Preferences such as the opening sequence may be stored here. Notes, proofs, and spending keys are not.</p>
        <button type="button" className="btn btn-line" onClick={clearLocal}>
          Clear Gotham preferences
        </button>
        {message ? <p role="status">{message}</p> : null}
      </section>
      <section className="console-card">
        <h2>Not implemented</h2>
        <p>Viewing keys and recovery are not in this preview. They need a design of their own before anyone is asked to rely on them.</p>
        <ul className="link-list">
          <li>
            <Link href="/docs/privacy-model">Privacy model</Link>
          </li>
          <li>
            <Link href="/docs/threat-model">Threat model</Link>
          </li>
          <li>
            <Link href="/docs/risks">Risks and limitations</Link>
          </li>
          <li>
            <Link href="/docs/elysium">Elysium integration</Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
