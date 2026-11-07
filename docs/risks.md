---
title: Risks and limitations
description: Plain-language limits. Gotham is not deployed, not audited, and not a promise of anonymity.
---

# Risks and limitations

Read this before the more technical [threat model](/docs/threat-model). The short version is the one that matters: there is no Gotham pool, and this site is not asking you to deposit anything.

## The system is not live

Contracts in the repository are an experiment. They use a hash that a real prover will probably not use. The verifier included for safety rejects every proof. There is no deployment, on testnet or anywhere else.

The app will not request a signature for a transfer. If a build of this site ever asks you to approve a Gotham pool you were not expecting, stop and treat it as hostile.

## Privacy is not established

Nothing here has been proven private. A future pool would still publish deposits and withdrawals. Small numbers of users, unusual amounts, and close timing can point at a person even when the proof is doing its job. Network observers, RPC providers, and a sequencer see metadata that a proof does not hide.

Do not describe Gotham as anonymous or untraceable. Those claims are false today and would still be too strong for the design on this site.

## The token is not the privacy layer

$GOTHAM is not issued. No supply, no sale, no staking rate, no buyback, and no holder reward is stated because none has been decided. A public ERC-20 does not become private because of its name. The design does not require a person to buy the token in order to use the pool, and adding that requirement later would create a fresh public trail.

## Assets and networks

Testnet USDC and WHYPE addresses are copied from Elysium's contract list so the preview can read a public balance. They are not Gotham contracts. Mainnet addresses for those assets were not published in the docs reviewed on 7 November 2026, and this project will not guess them.

Elysium mainnet was documented as pre-launch. Its public RPC and explorer were not available. The app will not add a made-up mainnet endpoint to a wallet.

## Money

Nothing on this site is an offer of a security, a yield, or a promise that a token will have value. Experimental cryptographic systems fail. People lose funds to unsound proofs, to token quirks, and to interfaces that were swapped. Gotham is not ready to hold funds.

## Independence

Gotham is not an official Kinetiq, Hyperliquid, or Ascend product. Documentation links point at their public docs so the network facts can be checked. A link is not an endorsement in either direction.
