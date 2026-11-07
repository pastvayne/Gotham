const ZERO = BigInt(0);
const TEN = BigInt(10);

export function parseAmount(input: string, decimals: number): bigint | null {
  const trimmed = input.trim();
  if (!/^\d+(\.\d+)?$/.test(trimmed)) return null;
  const [whole, fraction = ""] = trimmed.split(".");
  if (fraction.length > decimals) return null;
  if (whole.length > 1 && whole.startsWith("0")) return null;
  try {
    const base = TEN ** BigInt(decimals);
    return BigInt(whole) * base + BigInt(fraction.padEnd(decimals, "0") || "0");
  } catch {
    return null;
  }
}

export function formatAmount(value: bigint, decimals: number, fractionDigits = 4): string {
  const negative = value < ZERO;
  const magnitude = negative ? -value : value;
  const base = TEN ** BigInt(decimals);
  const whole = magnitude / base;
  const fraction = (magnitude % base).toString().padStart(decimals, "0").slice(0, fractionDigits).replace(/0+$/, "");
  const grouped = whole.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const text = fraction ? `${grouped}.${fraction}` : grouped;
  return negative ? `-${text}` : text;
}
