---
title: Proposed architecture
description: The shielded-pool design: notes, commitments, nullifiers, proofs, and what is actually in the repository.
---

# Proposed architecture

The intended path is a shielded pool on Elysium, not a second chain and not a disguise painted over an ordinary transfer.

1. A public Elysium wallet deposits a supported asset.
2. The pool records a **commitment**, which is a hash of a private note.
3. A later transfer spends that note. The spender proves the note is real and unspent, and creates a new note for the recipient.
4. The recipient finds and decrypts their note with material they hold locally.
5. An **unshield** releases assets to a public Elysium address.

Unshielding is not the same thing as an Elysium bridge withdrawal. A bridge withdrawal moves value from Elysium back to HyperEVM. An unshield only moves value from the Gotham pool to an address that is still on Elysium.

## What each part is for

**Commitments.** The tree stores hashes, not notes. The preimage stays with the holder.

**Nullifiers.** Spending a note publishes a value that cannot be computed back to the note, but will collide if the same note is spent twice. The contract is meant to reject a nullifier it has already seen.

**Proofs.** A zero-knowledge proof is how the contract checks authorization, membership, non-reuse, and conservation without receiving the private inputs. No proving system has been selected.

**Encrypted notes.** The recipient has to be able to recognize an incoming note. How that ciphertext is carried — calldata, a side channel, or a viewing key — is not decided. It will not be improvised in the preview app.

**Client-side proving.** Proof generation belongs on the user's machine when the circuits allow it. Spending keys do not belong on a server.

**Relayers.** A relayer could submit a proof so the user's public wallet does not have to pay gas for every shielded action. A relayer sees the user's network address and the transaction it submits. That role is not built.

## Public inputs

The experimental contract and `@gotham/crypto` share one ordered list. A future proof must bind these values, and no others, as its public statement:

`domain, root, nullifier, token, amount, recipient, changeCommitment`

`domain` is the chain id, the pool address, and the version string. It is there so a proof for one deployment cannot be replayed against another.

The contract in `contracts/src/GothamPool.sol` already checks this shape: it passes those seven values to an `IGothamVerifier`, stores nullifiers, and refuses to pay out more than it has taken in. The hash in its commitment tree is keccak256. A real prover is unlikely to use keccak256. The tree hash and the circuit hash have to become the same hash before this contract could be anything but an accounting sketch. The included `RejectAllVerifier` never returns true.

## What is deliberately absent

There is no deploy script, no mainnet configuration, and no proof generator. `packages/sdk` throws if something asks it to submit a shield, transfer, or unshield. The app calls that status string and then stops.
