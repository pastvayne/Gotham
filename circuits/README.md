# Circuits

No circuit is implemented. No proving system has been selected.

Phase 2 has to pick a system that already has a reviewed implementation, a verifier Elysium's ArbOS precompiles can run, and a hash the contract tree can share. Writing a custom hash or a toy proof for this repository would create something that looks like privacy and is not.

## Statement the contract already expects

A future circuit has to accept these public inputs, in order:

`domain, root, nullifier, token, amount, recipient, changeCommitment`

The same line is marked in `packages/crypto/src/index.ts` and `contracts/src/GothamPool.sol`. `scripts/check-public-inputs.mjs` fails if the two markers drift.

## Constraints a real circuit has to enforce

Private inputs would include the spent note, its spending key, the Merkle siblings, and the recipient note material. The public statement above is not enough on its own. The circuit has to constrain at least:

- The commitment opens to the spent note under the circuit hash
- The sibling path opens that commitment to `root`
- The nullifier is derived from the note and is bound to the spending key
- The spender authorized this proof
- Input value equals the unshielded `amount` plus the change note
- The change commitment, when it is non-zero, opens to that change note
- `token` is the note's asset, and `recipient` is the withdrawal destination
- `domain` is mixed into the statement so the proof is bound to one chain and one pool

The experimental contract checks none of this itself. It asks the verifier, then moves tokens. Until a circuit exists, the only verifier that should be considered is `RejectAllVerifier`, which never approves a withdrawal.

## What this directory will not contain yet

- A trusted setup
- A prover
- Sample proofs that could be mistaken for valid
- A claim that any of the constraints above are implemented
