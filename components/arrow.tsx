export function Arrow({ direction = "out" }: { direction?: "out" | "right" }) {
  return (
    <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" className="arrow">
      <path
        d={direction === "out" ? "M3 9 L9 3 M4 3 H9 V8" : "M1.5 6 H10 M6.5 2.5 L10 6 L6.5 9.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
