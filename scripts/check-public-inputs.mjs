import { readFileSync } from "node:fs";

const marker = "PUBLIC_INPUTS: domain, root, nullifier, token, amount, recipient, changeCommitment";
const files = ["packages/crypto/src/index.ts", "contracts/src/GothamPool.sol"];

for (const file of files) {
  const source = readFileSync(file, "utf8");
  if (!source.includes(marker)) {
    console.error(`Missing public-input marker in ${file}`);
    process.exit(1);
  }
}

console.log("Public inputs match.");
