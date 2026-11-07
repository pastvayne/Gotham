"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPublicClient, defineChain, erc20Abi, http, numberToHex, type Address } from "viem";
import { elysiumTestnet, testnetTokens } from "@/lib/elysium";

const elysiumChain = defineChain({
  id: elysiumTestnet.chainId,
  name: elysiumTestnet.name,
  nativeCurrency: elysiumTestnet.nativeCurrency,
  rpcUrls: { default: { http: [elysiumTestnet.rpcUrl] } },
  blockExplorers: {
    default: { name: "Elysium Testnet Explorer", url: elysiumTestnet.explorer },
  },
});

const client = createPublicClient({ chain: elysiumChain, transport: http(elysiumTestnet.rpcUrl) });

export type TokenReading = {
  symbol: string;
  address: string;
  amount?: bigint;
  decimals?: number;
  error?: string;
};

type WalletValue = {
  status: "disconnected" | "connecting" | "connected";
  address?: Address;
  chainId?: number;
  native?: bigint;
  nativeError?: string;
  tokens: TokenReading[];
  error?: string;
  reading: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchToTestnet: () => Promise<void>;
  refresh: () => Promise<void>;
};

const WalletContext = createContext<WalletValue | null>(null);

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, listener: (...args: unknown[]) => void) => void;
};

function provider(): EthereumProvider | null {
  if (typeof window === "undefined") return null;
  const ethereum = (window as Window & { ethereum?: EthereumProvider }).ethereum;
  return ethereum ?? null;
}

function chainNumber(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number.parseInt(value, value.startsWith("0x") ? 16 : 10);
  return undefined;
}

function errorCode(error: unknown) {
  if (typeof error === "object" && error && "code" in error && typeof error.code === "number") return error.code;
  return undefined;
}

function friendly(error: unknown, fallback: string) {
  if (errorCode(error) === 4001) return "The wallet request was declined.";
  if (error instanceof Error && error.message && error.message.length < 160) return error.message;
  return fallback;
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<WalletValue["status"]>("disconnected");
  const [address, setAddress] = useState<Address>();
  const [chainId, setChainId] = useState<number>();
  const [native, setNative] = useState<bigint>();
  const [nativeError, setNativeError] = useState<string>();
  const [tokens, setTokens] = useState<TokenReading[]>([]);
  const [error, setError] = useState<string>();
  const [reading, setReading] = useState(false);
  const addressRef = useRef<Address | undefined>(undefined);

  useEffect(() => {
    addressRef.current = address;
  }, [address]);

  const readPublic = useCallback(async (account: Address, nextChain: number) => {
    setChainId(nextChain);
    setAddress(account);
    setStatus("connected");
    setNative(undefined);
    setNativeError(undefined);
    setTokens([]);
    if (nextChain !== elysiumTestnet.chainId) return;

    setReading(true);
    try {
      const balance = await client.getBalance({ address: account });
      setNative(balance);
    } catch {
      setNativeError("The testnet RPC did not return a native balance.");
    }

    const readings = await Promise.all(
      testnetTokens.map(async (token): Promise<TokenReading> => {
        try {
          const tokenAddress = token.address as Address;
          const [amount, decimals] = await Promise.all([
            client.readContract({ address: tokenAddress, abi: erc20Abi, functionName: "balanceOf", args: [account] }),
            client.readContract({ address: tokenAddress, abi: erc20Abi, functionName: "decimals" }),
          ]);
          return { symbol: token.symbol, address: token.address, amount, decimals };
        } catch {
          return { symbol: token.symbol, address: token.address, error: "Balance unavailable from the testnet RPC." };
        }
      }),
    );
    setTokens(readings);
    setReading(false);
  }, []);

  const adopt = useCallback(
    async (account: string) => {
      const injected = provider();
      if (!injected || !account) {
        setStatus("disconnected");
        setAddress(undefined);
        return;
      }
      const nextChain = chainNumber(await injected.request({ method: "eth_chainId" }));
      if (!nextChain) {
        setError("The wallet did not report a chain id.");
        return;
      }
      await readPublic(account as Address, nextChain);
    },
    [readPublic],
  );

  useEffect(() => {
    const injected = provider();
    if (!injected) return;
    let cancelled = false;

    injected
      .request({ method: "eth_accounts" })
      .then((accounts) => {
        if (cancelled) return;
        const first = Array.isArray(accounts) ? accounts[0] : undefined;
        if (typeof first === "string") void adopt(first);
      })
      .catch(() => undefined);

    const onAccounts = (accounts: unknown) => {
      const first = Array.isArray(accounts) ? accounts[0] : undefined;
      if (typeof first === "string") void adopt(first);
      else {
        setStatus("disconnected");
        setAddress(undefined);
        setChainId(undefined);
        setNative(undefined);
        setTokens([]);
      }
    };
    const onChain = (next: unknown) => {
      const id = chainNumber(next);
      const current = addressRef.current;
      if (current && id) void readPublic(current, id);
    };

    injected.on?.("accountsChanged", onAccounts);
    injected.on?.("chainChanged", onChain);
    return () => {
      cancelled = true;
      injected.removeListener?.("accountsChanged", onAccounts);
      injected.removeListener?.("chainChanged", onChain);
    };
  }, [adopt, readPublic]);

  const connect = useCallback(async () => {
    const injected = provider();
    if (!injected) {
      setError("No injected wallet was found in this browser.");
      return;
    }
    setStatus("connecting");
    setError(undefined);
    try {
      const accounts = (await injected.request({ method: "eth_requestAccounts" })) as string[];
      if (!accounts[0]) {
        setStatus("disconnected");
        setError("The wallet did not return an account.");
        return;
      }
      await adopt(accounts[0]);
    } catch (caught) {
      setStatus("disconnected");
      setError(friendly(caught, "The wallet could not connect."));
    }
  }, [adopt]);

  const disconnect = useCallback(() => {
    setStatus("disconnected");
    setAddress(undefined);
    setChainId(undefined);
    setNative(undefined);
    setNativeError(undefined);
    setTokens([]);
    setError(undefined);
  }, []);

  const switchToTestnet = useCallback(async () => {
    const injected = provider();
    if (!injected) {
      setError("No injected wallet was found in this browser.");
      return;
    }
    const chainIdHex = numberToHex(elysiumTestnet.chainId);
    try {
      await injected.request({ method: "wallet_switchEthereumChain", params: [{ chainId: chainIdHex }] });
    } catch (caught) {
      if (errorCode(caught) !== 4902) {
        setError(friendly(caught, "The wallet did not switch to Elysium testnet."));
        return;
      }
      try {
        await injected.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: chainIdHex,
              chainName: elysiumTestnet.name,
              nativeCurrency: elysiumTestnet.nativeCurrency,
              rpcUrls: [elysiumTestnet.rpcUrl],
              blockExplorerUrls: [elysiumTestnet.explorer],
            },
          ],
        });
      } catch (addError) {
        setError(friendly(addError, "The wallet did not add Elysium testnet."));
      }
    }
  }, []);

  const refresh = useCallback(async () => {
    if (address && chainId) await readPublic(address, chainId);
  }, [address, chainId, readPublic]);

  const value = useMemo<WalletValue>(
    () => ({
      status,
      address,
      chainId,
      native,
      nativeError,
      tokens,
      error,
      reading,
      connect,
      disconnect,
      switchToTestnet,
      refresh,
    }),
    [status, address, chainId, native, nativeError, tokens, error, reading, connect, disconnect, switchToTestnet, refresh],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const value = useContext(WalletContext);
  if (!value) throw new Error("useWallet must be used inside the console.");
  return value;
}
