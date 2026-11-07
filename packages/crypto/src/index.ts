/**
 * Gotham note and proof specification.
 *
 * Nothing here generates a proof, a spending key, or a commitment.
 * The hash function is unselected. Inventing one would create notes that
 * cannot be spent by a future circuit and would look safer than they are.
 *
 * PUBLIC_INPUTS: domain, root, nullifier, token, amount, recipient, changeCommitment
 */

export const publicInputs = [
  "domain",
  "root",
  "nullifier",
  "token",
  "amount",
  "recipient",
  "changeCommitment",
] as const;

export const protocolVersion = "GOTHAM_POOL_V0" as const;

/** A note is defined so the app and the contract can share a vocabulary. Secrets are not included. */
export type NoteSpec = {
  version: 0;
  token: `0x${string}`;
  amount: string;
  commitment: `0x${string}`;
};

export const cryptoStatus = {
  proofSystem: "unselected",
  hash: "unselected",
  notes: "specification-only",
} as const;
