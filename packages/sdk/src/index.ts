import { cryptoStatus, protocolVersion, publicInputs } from "@gotham/crypto";

export const protocolStatus = {
  deployed: false,
  version: protocolVersion,
  proofSystem: cryptoStatus.proofSystem,
  publicInputs,
  message: "No Gotham contract is deployed. This client will not submit a transaction.",
} as const;

export function submitShield(): never {
  throw new Error(protocolStatus.message);
}

export function submitTransfer(): never {
  throw new Error(protocolStatus.message);
}

export function submitUnshield(): never {
  throw new Error(protocolStatus.message);
}
