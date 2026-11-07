---
title: Threat model
description: Threats to a shielded pool on Elysium, what is mitigated, and what is still open.
---

# Threat model

Status: open research. The experimental contract sketches a few controls and is not deployed. A control that exists only in unaudited source is not a mitigation you can rely on.

This document considers someone trying to learn more than the privacy model allows, someone trying to spend a note twice, and someone trying to take assets out of the pool. It assumes the chain behaves as Elysium's documentation describes: a public Orbit rollup, a single sequencer at launch, and transaction data available to an AnyTrust committee with a path onto HyperEVM.

## How to read the status column

**Sketched** means the experimental contract contains a check, and tests are intended to cover it. It is not deployed and not reviewed.

**Open** means the design does not remove the risk.

**Research** means a credible approach exists in the wider literature, and Gotham has not chosen or built one.

## Deposits, withdrawals, and the anonymity set

| Threat | Status | Notes |
| --- | --- | --- |
| A public deposit is linked to the depositor | Open | The ERC-20 transfer is public. Shielding is not supposed to hide it. |
| A withdrawal is linked to its destination and amount | Open | Unshielding is public by design. |
| A withdrawal is guessed from a deposit by amount | Open | Equal amounts are easier to match. Split amounts and decoys are research, not a feature. |
| A withdrawal is guessed from timing | Open | A deposit followed quickly by a similar withdrawal is a small set. |
| The pool has few users | Open | Privacy of this kind is a property of the set. A new pool has a thin set. The interface must not imply otherwise. |
| Distinct amounts across assets | Open | Each asset is its own set if notes cannot be mixed across tokens. The current design keeps assets separate. |

## Network and operators

| Threat | Status | Notes |
| --- | --- | --- |
| RPC provider sees the user's IP and the request | Open | Reading a public balance, and later submitting a transaction, tells that provider what the wallet asked. The preview uses the public testnet RPC only after a person connects. |
| IP metadata links a user to a transaction | Open | Direct submission from a home connection does this. A relayer changes who sees the IP; it does not delete the observation. |
| A relayer keeps the payload or correlates users | Research | No relayer exists. A future one has to be treated as an adversary that sees what it submits and when. |
| The sequencer orders, delays, or censors | Open | Elysium documents a single sequencer at launch. It sees order and timing. It is not part of Gotham's trust for privacy. |
| Data availability publishes the transaction | Open | Calldata is not a hiding place. Note secrets must never be placed there. The fallback that posts data to HyperEVM makes this wider, not narrower. |
| A compromised front end swaps the recipient or the proof | Open | Users would be trusting the site they loaded. Reproducible builds and a local client are research. The preview cannot send a transaction, which removes this risk only for the current UI. |
| A browser extension reads the page or alters the wallet request | Open | Extensions can see the DOM and some can see wallet calls. The app stores no spending key for them to steal, because it has no spending key. |

## Keys and notes

| Threat | Status | Notes |
| --- | --- | --- |
| A spending key is sent to a server | Sketched, by refusal | The contract has no argument for a secret. The SDK refuses to submit. No key is generated, because a made-up key would be a trap. |
| The user loses the note or the key | Open | There is no recovery. Until notes exist, there is also nothing to lose. A later design has to say how loss works before it asks anyone to deposit. |
| A viewing key leaks history | Research | Not implemented. A viewing key is a second secret with its own disclosure rules. |
| Encrypted notes are mined for metadata | Research | Note discovery is unspecified. Whatever carries the ciphertext can leak size and timing. |

## Integrity of the pool

| Threat | Status | Notes |
| --- | --- | --- |
| The same note is spent twice | Sketched | The contract stores nullifiers and rejects a repeat. Without a real proof, a nullifier does not correspond to a note. |
| A proof is accepted when it should not be | Open | The verifier is an immutable address chosen at construction. If that contract returns true, the pool pays. `RejectAllVerifier` never returns true. There is no production verifier. |
| The circuit is unsound | Open | No circuit has been written. Soundness is entirely ahead of us. |
| Assets are created from nothing | Sketched | Liabilities increase only by tokens actually received. Withdrawals cannot exceed liabilities. A bad proof can still steal what was really deposited. |
| Fee-on-transfer or rebasing tokens desynchronize the books | Sketched | The pool reverts unless the balance increases by the exact deposit amount. Rebasing after deposit is not handled and those tokens should not be listed. |
| Reentrancy during a token callback | Sketched | A reentrancy lock wraps shield and unshield. State for a withdrawal is updated before the token is sent. |
| A proof is replayed on another chain or another pool | Sketched | The domain includes chain id, pool address, and version, and is a public input. The verifier has to enforce it. The contract cannot force a malicious verifier to care. |
| An administrator upgrades the pool or the verifier | Open, by absence | This draft has no owner, no proxy, and no setter. A later upgrade key would be a new trust assumption and has to be justified in public. The testnet USDC token itself is a proxy; that is a property of the asset, not of Gotham. |
| Someone deploys this contract unchanged and deposits real funds | Open | The source is experimental. Deployment is not authorized. A verifier that returns true drains the pool up to its liabilities. |

## What has to be true before a mainnet deposit

1. A reviewed proving system, with the circuit hash equal to the tree hash.
2. An external review of the contracts, the circuit, and the client.
3. A written anonymity-set and amount policy that the interface enforces.
4. A decision on relaying, with the relayer treated as hostile.
5. Key-management and loss behavior that a person can understand before they deposit.
6. Official mainnet addresses for each asset. Testnet addresses are not those addresses.
7. An operational plan for a bad proof, a paused pool, and a discovered leak.

Until those exist, the honest instruction is simple: do not put funds in Gotham. There is nowhere to put them.
