---
title: Roadmap
description: Four phases from this site to a reviewed deployment. Nothing past design is claimed as done.
---

# Roadmap

Phases describe the order of work. A line on this page is not a shipped feature.

## Phase 1 — Foundation

This is the current phase.

- The Gotham brand and this website
- The preview application at `/app`
- Written notes on Elysium, taken from the official docs
- The threat model
- A contract and test scaffold in the repository

The preview does not sign transactions. The contracts are not deployed.

## Phase 2 — Proof of concept

Not started.

- Choose a proving system that has a reviewed implementation and a verifier Elysium can actually run
- Replace the keccak256 tree with the circuit's hash
- Create and store notes locally, with the secret never leaving the client
- Shield, transfer, and unshield on Elysium testnet
- Check that the pool's liabilities match the notes

A testnet proof of concept is still not a product. Testnet assets are not a reason to skip review.

## Phase 3 — Hardening

Not started.

- Broaden tests beyond the accounting sketch
- Review the circuit and the information a transaction still leaks
- Test a relayer against a hostile-relayer model
- Commission an external audit
- Take legal and compliance questions to qualified counsel before asking the public to deposit

## Phase 4 — Deployment readiness

Not started, and not scheduled.

- Fix what an audit finds
- Confirm mainnet chain ID, RPC, explorer, and token addresses against the docs at that time
- Write incident response and a pause or migration policy if one is still needed
- Publish the privacy properties that the reviewed system actually has, including the ones it does not have
- Only then consider a limited mainnet release

No phase after the first has a date. Mainnet Elysium itself was still described as pre-launch in the connecting guide on 7 November 2026.
