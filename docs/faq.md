---
title: FAQ
description: Direct answers about deployment, the token, deposits, and what this site can do today.
---

# FAQ

### Is Gotham live?

No. There is no deployed pool, no selected proving system, and no token contract.

### Can I shield assets today?

No. The app can show what a shield would make public, and it stops there. It will not send a transaction.

### Does a deposit disappear from the chain?

No. The deposit transfer stays on the public ledger. A later design tries to make it harder to connect that deposit to a specific withdrawal. It does not edit the deposit.

### Is Gotham anonymous?

No. Do not use it — or this website — as if it were. The [privacy model](/docs/privacy-model) is a target, and the target itself leaves deposits, withdrawals, timing, and network metadata in view.

### Do I need $GOTHAM to transfer?

The current design does not require it. Buying a public token in order to make a private transfer would add a public event. The token is also not for sale here, because it has not been issued.

### What is $GOTHAM for?

It is proposed as a separate ERC-20 that could, later, be used for governance, ecosystem work, or research funding. None of those roles is active. No supply or reward schedule exists. The token is not the cryptographic system.

### Which network is this?

Elysium. Testnet chain ID is 99801. Mainnet chain ID 99901 is published, and the official connecting guide still called mainnet pre-launch on 7 November 2026, without a public RPC. Details and sources are on the [Elysium page](/docs/elysium).

### Why can the app see my balance?

If you connect a wallet, the preview asks the public testnet RPC for the native HYPE balance and, on testnet, for the canonical USDC and WHYPE balances. That is an ordinary public read. It is not a shielded balance. Shielded balances do not exist yet. You can use the site without connecting.

### Where are my private notes stored?

Nowhere. The app does not generate spending keys or notes. Local storage is used only for preferences such as whether the opening sequence has played.

### Is this affiliated with Kinetiq or Hyperliquid?

No. Gotham is independent. The network facts are quoted from public Elysium documentation so they can be checked.

### Where is the code?

The experimental pool is in `contracts/`. The note vocabulary is in `packages/crypto`. The client that refuses to submit transactions is in `packages/sdk`. The circuit is a specification in `circuits/`, not a prover.
