# Contracts

Experimental Solidity for a shielded pool. **Do not deploy. Do not send real assets.**

`GothamPool` accepts an ERC-20 deposit, appends a commitment to a keccak256 Merkle tree of depth 20, and later pays a withdrawal only if an external verifier returns true. The tree hash is a stand-in. A production circuit has to use the same hash, or the proof and the root will not describe the same tree.

`RejectAllVerifier` returns false for every proof. There is no deploy script. The constructor takes the verifier address and the token list; nothing in this repository wires those to a public network.

## What the pool does enforce

- Exact token receipt, so a fee-on-transfer deposit cannot be credited in full
- Nullifier uniqueness
- A bound on withdrawals equal to recorded liabilities
- A short history of Merkle roots
- Reentrancy protection around deposit and withdrawal
- A domain (chain id, pool address, version) passed to the verifier as a public input
- Refusal of bare native HYPE

## What it does not enforce

- That the commitment corresponds to a real note
- That the verifier is honest
- Privacy of the depositor, the amount, or the withdrawal destination

Those are the verifier's job, and there is no verifier.

## Tests

Foundry tests live in `test/`. From this directory, after Foundry is installed:

```bash
forge test
```

The tests are not a deployment and not an audit.
