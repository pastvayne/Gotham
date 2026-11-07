---
title: Introduction
description: What Gotham is, what it is not, and how the protocol differs from the $GOTHAM token.
---

# Introduction

Gotham is a proposed privacy protocol for [Elysium](https://elysium.kinetiq.xyz/docs/what-is-elysium). It is being designed so a person can deposit a supported asset, move value inside a shielded pool, and later withdraw to a public Elysium address.

The public chain would still check that a transaction is valid. The private inputs — who paid whom inside the pool, and which note funded the payment — are what the design tries to keep off the public record.

> Even in paradise, some things are meant to remain unseen.

That sentence is the brief. It is not a claim that Gotham makes activity impossible to study.

## Two different things

**Gotham, the protocol.** Shielded notes, commitments, nullifiers, and zero-knowledge proofs. This is the privacy system. It does not exist on a network yet.

**$GOTHAM, the token.** A proposed ERC-20 for governance and ecosystem use. A normal ERC-20 transfer is public. Owning the token would not make a balance private, and the current design does not require anyone to buy it in order to use the pool.

## What this site will not say

- Gotham is not deployed.
- Gotham is not audited.
- Gotham does not provide perfect anonymity or untraceability.
- Gotham is not a bridge to another privacy chain. The system has to stand on Elysium.
- Gotham is an independent project. No partnership with Kinetiq, Hyperliquid, or Ascend is claimed.

## Where to go next

The [privacy model](/docs/privacy-model) says what a future transfer is meant to hide. The [threat model](/docs/threat-model) says what can still go wrong. The [app](/app) is a preview: it can connect a wallet and read a public balance, and it cannot move funds.
