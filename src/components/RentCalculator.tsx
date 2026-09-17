import { useMemo, useState } from "react";
import { Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrency } from "@/lib/currency";
import { calculateRentSetup, formatCurrency, parseNumericInput } from "@/lib/format";

const resultItems = [
  { key: "yearlySetup", label: "Setup Cost" },
  { key: "monthlyEquivalent", label: "Monthly Eq." },
  { key: "effectiveMonthly", label: "Effective", highlight: true },
] as const;

export function RentCalculator() {
  const [monthlyRent, setMonthlyRent] = useState("0");
  const [setupPercentage, setSetupPercentage] = useState("10");
  const { currency } = useCurrency();

  const parsedRent = useMemo(() => parseNumericInput(monthlyRent), [monthlyRent]);
  const parsedPercentage = useMemo(
    () => parseNumericInput(setupPercentage, 100),
    [setupPercentage],
  );

  const results = useMemo(() => {
    if (parsedRent === null || parsedPercentage === null) return null;
    return calculateRentSetup(parsedRent, parsedPercentage);
  }, [parsedRent, parsedPercentage]);

  const formatted = (value: number) => formatCurrency(value, currency.locale, currency.code);

  const handleRentChange = (value: string) => {
    if (value.includes("-")) {
      setMonthlyRent("0");
      return;
    }
    setMonthlyRent(value.replace(/[^0-9.]/g, ""));
  };

  const handlePercentageChange = (value: string) => {
    if (value.includes("-")) {
      setSetupPercentage("0");
      return;
    }
    const cleaned = value.replace(/[^0-9.]/g, "");
    if (cleaned === "") {
      setSetupPercentage("");
      return;
    }
    const parsed = Number.parseFloat(cleaned);
    setSetupPercentage(Number.isFinite(parsed) ? String(Math.min(Math.max(parsed, 0), 100)) : "");
  };


  return (
    <Card className="rounded-4xl border-border/40 bg-card/60 shadow-[var(--shadow-card)] backdrop-blur-2xl">
      <CardContent className="space-y-7 p-5 sm:p-8">
        <div className="space-y-2">
          <Label htmlFor="monthly-rent" className="text-[13px] font-semibold text-foreground/80">
            Monthly Rent
          </Label>
          <div className="relative group">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex w-10 items-center justify-center text-lg font-medium text-muted-foreground transition-colors group-focus-within:text-primary">
              {currency.symbol}
            </span>
            <Input
              id="monthly-rent"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={monthlyRent}
              onChange={(event) => handleRentChange(event.target.value)}
              className="h-14 rounded-2xl border-border/50 bg-background/50 pl-11 pr-4 text-lg font-semibold tabular-nums shadow-none focus-visible:ring-2 focus-visible:ring-primary/20 md:text-lg"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="setup-percentage" className="text-[13px] font-semibold text-foreground/80">
            Setup Percentage
          </Label>
          <div className="relative group">
            <Input
              id="setup-percentage"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={setupPercentage}
              onChange={(event) => handlePercentageChange(event.target.value)}
              className="h-14 rounded-2xl border-border/50 bg-background/50 pl-4 pr-11 text-lg font-semibold tabular-nums shadow-none focus-visible:ring-2 focus-visible:ring-primary/20 md:text-lg"
              aria-describedby="setup-percentage-help"
            />
            <span className="pointer-events-none absolute inset-y-0 right-0 flex w-10 items-center justify-center text-lg font-medium text-muted-foreground transition-colors group-focus-within:text-primary">
              %
            </span>
          </div>
          <p id="setup-percentage-help" className="text-sm text-muted-foreground">
            Typically 5–10% of annual rent in India.
          </p>
        </div>

        <div className="flex items-center gap-4" aria-hidden="true">
          <div className="h-px flex-1 bg-border/60" />
          <div className="size-1.5 rounded-full bg-border" />
          <div className="h-px flex-1 bg-border/60" />
        </div>

        <section aria-live="polite" aria-label="Calculated rent costs" className="space-y-6">
          <div className="rounded-3xl bg-primary p-5 text-primary-foreground shadow-lg shadow-primary/25 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/80">
              First-Year Total
            </p>
            <p className="mt-1 min-h-12 text-4xl font-bold tracking-tight tabular-nums transition-all duration-200">
              {results ? formatted(results.firstYearTotal) : "—"}
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-[11px] text-primary-foreground/75">
              <Info className="size-3.5 shrink-0" aria-hidden="true" />
              {results
                ? `${formatted(parsedRent ?? 0)} × 12 months + ${formatted(results.yearlySetup)} setup`
                : "Enter a rent value to see the total"}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-1">
            {resultItems.map((item, index) => (
              <div
                key={item.key}
                className={
                  index === 0
                    ? "flex flex-col"
                    : index === 1
                      ? "flex flex-col border-x border-border/50 px-3"
                      : "flex flex-col items-end text-right"
                }
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </span>
                <span
                  className={`mt-1 min-h-6 break-words text-sm font-bold tabular-nums transition-all duration-200 ${
                    "highlight" in item && item.highlight ? "text-primary" : "text-foreground"
                  }`}
                >
                  {results ? formatted(results[item.key]) : "—"}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-between gap-3 border-t border-border/50 pt-4 text-[11px]">
          <span className="text-muted-foreground">Formula</span>
          <span className="font-mono text-muted-foreground">
            (rent × 12) + (rent × setup%)
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
