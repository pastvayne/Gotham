/** Facts checked against Elysium's own documentation on 7 November 2026. */
export const elysiumDocs = {
  reviewed: "7 November 2026",
  what: "https://elysium.kinetiq.xyz/docs/what-is-elysium",
  connecting: "https://elysium.kinetiq.xyz/docs/connecting-to-elysium",
  addresses: "https://elysium.kinetiq.xyz/docs/contract-addresses",
  building: "https://elysium.kinetiq.xyz/docs/building-on-elysium",
} as const;

export const elysiumTestnet = {
  name: "Elysium Testnet",
  chainId: 99801,
  nativeCurrency: { name: "HYPE", symbol: "HYPE", decimals: 18 },
  rpcUrl: "https://testnet-rpc.elysium.kinetiq.xyz",
  explorer: "https://elysium.kinetiq.xyz/testnet-explorer",
  settlesTo: "HyperEVM testnet (chain ID 998)",
} as const;

export const elysiumMainnet = {
  name: "Elysium",
  chainId: 99901,
  status: "pre-launch" as const,
  settlesTo: "HyperEVM (chain ID 999)",
} as const;

export const testnetTokens = [
  {
    symbol: "USDC",
    name: "USD Coin",
    address: "0x7D29d8047B905000459c0E80c34a26CeedcB47b2",
    note: "Canonical testnet USDC from Elysium's contract list. No mainnet address is published. The testnet explorer marks this token as a proxy.",
  },
  {
    symbol: "WHYPE",
    name: "Wrapped HYPE",
    address: "0xCD57F65c2B0e5881CFC2E609F7CD53b746E1F234",
    note: "Canonical wrapped HYPE on Elysium testnet. Native HYPE is the gas token and is a different asset.",
  },
] as const;

export const networkFacts = [
  { label: "Stack", value: "Arbitrum Orbit (Nitro/ArbOS), operated with Conduit" },
  { label: "Gas", value: "HYPE, native, bridged 1:1 from HyperEVM" },
  { label: "Blocks", value: "100 ms canonical blocks, as documented" },
  { label: "Throughput", value: "300 Mgas/s execution target from pre-mainnet load testing" },
  { label: "Data availability", value: "AnyTrust committee, with full data posted to HyperEVM if needed" },
  { label: "Sequencer", value: "A single sequencer at launch" },
  { label: "Testnet", value: "Chain ID 99801 · public RPC published" },
  { label: "Mainnet", value: "Chain ID 99901 · pre-launch, public RPC and explorer not published" },
] as const;
