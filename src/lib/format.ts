// Indian Rupee formatting utilities.
// Converts a raw INR amount into readable Indian units (Cr / Lakh / Thousand).

export function formatINR(amount: number, opts?: { compact?: boolean }): string {
  const compact = opts?.compact ?? true;
  if (!isFinite(amount)) return "₹ 0";
  const abs = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";

  if (compact) {
    if (abs >= 1_00_00_000) {
      // Crore
      const v = amount / 1_00_00_000;
      return `${sign}₹ ${trim(Math.abs(v))} Cr`;
    }
    if (abs >= 1_00_000) {
      // Lakh
      const v = amount / 1_00_000;
      return `${sign}₹ ${trim(Math.abs(v))} Lakh`;
    }
    if (abs >= 1_000) {
      const v = amount / 1_000;
      return `${sign}₹ ${trim(Math.abs(v))} Thousand`;
    }
  }

  // Indian grouping: 12,34,567
  return `${sign}₹ ${new Intl.NumberFormat("en-IN").format(Math.round(abs))}`;
}

function trim(n: number): string {
  return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
