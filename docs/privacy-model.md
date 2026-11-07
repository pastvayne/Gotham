---
title: Privacy model
description: Which parts of a future Gotham transfer are meant to stay private, and which stay public.
---

# Privacy model

This page describes the privacy Gotham is being designed toward. It is not a description of a system you can use, and it is not a guarantee. The actual properties have to be established by the circuits, the contracts, independent review, and the size of the set of real users. None of that has happened.

## Inside a shielded transfer

A later transfer is meant to show the chain a proof, a nullifier, and the public inputs required to update the pool. It is meant to avoid publishing:

- The note that was spent
- The sender's shielded identity
- The link from that note back to the deposit that created it
- The recipient's shielded identity, beyond whatever ciphertext they need in order to find the payment

The recipient should be able to decrypt their new note. The sender's change, if any, should be a new note held by the sender. The proof should show that inputs and outputs conserve value for that asset.

## What stays public

- The deposit transaction: depositor, token, amount, and the commitment that was added
- The unshield transaction: token, amount, and destination address
- The nullifier and the Merkle root the proof was checked against
- The fact that a Gotham transaction occurred, and when the sequencer ordered it
- Gas payment, unless a relayer submits the transaction — and then the relayer relationship is its own leak

Shielding does not rewrite history. A deposit that was public on Monday is still public on Tuesday.

## What "private" does not mean here

An observer who sees 10 ETH deposited and, three minutes later, 10 ETH withdrawn to a new address can often guess the link. A pool with a handful of users has a handful of possible senders. Unique amounts, tight timing, and a public gas payer all shrink the set further.

Gotham should not be described as fully anonymous or untraceable. Those words claim a result the design has not earned, and that this class of system often cannot earn against a determined observer with network data.

## Keys

Spending authority has to live with the user. The protocol's job is to make sure a server never needs the spending key. Recovery and viewing keys are not implemented. Adding them casually can create a second trail or a way to lose funds. They stay out of the app until they have a written design.
