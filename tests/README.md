# Tests

Solidity tests for the experimental pool live in `contracts/test` and run with Foundry (`forge test` from `contracts/`).

`scripts/check-public-inputs.mjs` checks that the contract and `packages/crypto` still name the same public inputs.

No test here moves assets on Elysium. No test is a substitute for a review of a future circuit.
