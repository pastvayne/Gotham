---
title: Elysium integration
description: Network facts taken from Elysium's documentation, and the limits of what Gotham will not invent.
---

# Elysium integration

Gotham is aimed at Elysium, the high-performance EVM layer built by Kinetiq for the Hyperliquid ecosystem. Gotham does not speak for Kinetiq, Hyperliquid, or Ascend. Those names appear here only because they are how Elysium's own documentation describes the chain.

The notes below were checked against the public docs on 7 November 2026:

- [What is Elysium](https://elysium.kinetiq.xyz/docs/what-is-elysium)
- [Connecting to Elysium](https://elysium.kinetiq.xyz/docs/connecting-to-elysium)
- [Contract addresses](https://elysium.kinetiq.xyz/docs/contract-addresses)

## Network

| Parameter | What the docs say |
| --- | --- |
| Stack | Arbitrum Orbit (Nitro/ArbOS), operated with Conduit |
| Gas token | HYPE, native, bridged 1:1 from HyperEVM |
| Block time | 100 ms canonical blocks |
| Throughput | 300 Mgas/s execution target, from load testing before mainnet |
| Data availability | AnyTrust committee, with full-data fallback to HyperEVM |
| Sequencing | A single sequencer at launch |
| Settlement | HyperEVM, chain ID 999 on mainnet and 998 on testnet |
| Testnet chain ID | 99801 |
| Testnet public RPC | `https://testnet-rpc.elysium.kinetiq.xyz` |
| Testnet explorer | `https://elysium.kinetiq.xyz/testnet-explorer` |
| Mainnet chain ID | 99901 |
| Mainnet RPC and explorer | Not published. The connecting guide says mainnet is pre-launch. |

The docs also list Alchemy endpoints that require an API key. This project does not ship a key. The preview reads public balances through the shared testnet RPC, which the docs say is not meant for production traffic.

HyperEVM's chain ID is 999. That number is not Elysium's chain ID. Gotham does not use a HyperEVM RPC in place of an Elysium RPC.

## Assets the pool may one day accept

The official testnet list names two tokens this protocol would have to support carefully:

| Token | Testnet address | Notes |
| --- | --- | --- |
| USDC | `0x7D29d8047B905000459c0E80c34a26CeedcB47b2` | Canonical testnet USDC. No mainnet address is published. The testnet explorer flags the token as a proxy. |
| WHYPE | `0xCD57F65c2B0e5881CFC2E609F7CD53b746E1F234` | Canonical wrapped HYPE on testnet. |

Native HYPE is the gas token. It is not the WHYPE contract. The experimental pool accepts ERC-20 transfers only and rejects bare native value, because a native shielding path is not specified yet.

$GOTHAM has no address. It has not been issued.

Look-alike tokens exist on public networks. An integration has to match the address on the official list for that exact chain, not a ticker.

## What the chain changes about privacy

Transaction calldata on an Orbit chain is there so the chain can be reconstructed. AnyTrust keeps data with a committee and can fall back to posting it on HyperEVM. A shielded design therefore cannot put note secrets, spending keys, or amounts it hopes to hide into the transaction payload. The proof and the public inputs will be visible to the sequencer and, under the fallback, more widely than that.

A single sequencer also orders transactions. It can see timing, and it can delay or refuse a transaction. The sequencer is not a privacy provider.

Elysium withdrawals to HyperEVM use an optimistic challenge period. That mechanism is the chain's bridge. It is separate from Gotham's unshield, which would pay an address on Elysium itself.
