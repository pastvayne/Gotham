---
title: Why privacy matters
description: What a public Elysium transfer reveals, and what financial privacy can and cannot mean.
---

# Why privacy matters

Elysium is a public EVM chain. A normal transfer is checkable because the sender, the recipient, the token, and the amount are published. Anyone with a node or an explorer can follow that trail from one wallet to the next.

That publicity is useful. It is also more disclosure than many ordinary payments need.

## Exposure

A public transfer can reveal:

- The sender and recipient addresses
- The token and the amount
- The time the transaction was ordered
- The graph of who has dealt with whom

Balances compound the problem. If a wallet is labeled once — by an exchange withdrawal, a public profile, or a reused address — later payments are easier to attach to a person.

## Protection

A cryptographic privacy system can reduce how much of that graph is published. Gotham's design keeps the check (the proof) and drops the private inputs from the transaction. The pool can confirm that a note exists, that it has not been spent, and that the amounts balance, without putting the note itself onchain.

Protection here is selective disclosure. It is not invisibility. The deposit that funded the pool stays public. The withdrawal that leaves the pool stays public. The chain's sequencer and data-availability layer still see the transaction that carries the proof.

## Freedom

People should be able to choose what their financial activity advertises. A salary, a donation, a position, or a payment to a counterparty does not have to become a permanent public file in order for the asset to settle.

That choice has limits. Privacy tooling can be abused. It also fails open when the anonymity set is small, when amounts are unique, or when someone watches the network rather than the proof. Those limits are part of the design, and they are written down in the [threat model](/docs/threat-model).
