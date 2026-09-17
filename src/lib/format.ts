export interface RentCalculation {
  yearlySetup: number;
  monthlyEquivalent: number;
  firstYearTotal: number;
  effectiveMonthly: number;
}

export function parseNumericInput(value: string, maximum = Number.POSITIVE_INFINITY): number | null {
  if (value.trim() === "") return null;

  const normalized = value.replace(/[^0-9.-]/g, "");
  const parsed = Number.parseFloat(normalized);

  if (!Number.isFinite(parsed)) return null;
  return Math.min(Math.max(parsed, 0), maximum);
}

export function calculateRentSetup(monthlyRent: number, setupPct: number): RentCalculation {
  const safeRent = Math.max(monthlyRent, 0);
  const safePercentage = Math.min(Math.max(setupPct, 0), 100);
  const yearlySetup = safeRent * 12 * (safePercentage / 100);
  const monthlyEquivalent = yearlySetup / 12;

  return {
    yearlySetup,
    monthlyEquivalent,
    firstYearTotal: safeRent * 12 + yearlySetup,
    effectiveMonthly: safeRent + monthlyEquivalent,
  };
}

export function formatCurrency(value: number, locale: string, currency: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function getCurrencySymbol(locale: string, currency: string): string {
  return (
    new Intl.NumberFormat(locale, { style: "currency", currency })
      .formatToParts(0)
      .find((part) => part.type === "currency")?.value ?? currency
  );
}
