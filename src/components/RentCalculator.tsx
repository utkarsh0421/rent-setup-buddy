import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCurrency } from "@/lib/currency";
import { calculateRentSetup, formatCurrency, parseNumericInput } from "@/lib/format";

const resultItems = [
  { key: "yearlySetup", label: "Yearly Setup Cost" },
  { key: "monthlyEquivalent", label: "Monthly Equivalent" },
  { key: "effectiveMonthly", label: "Effective Monthly Cost" },
] as const;

export function RentCalculator() {
  const [monthlyRent, setMonthlyRent] = useState("");
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
    setMonthlyRent(value.replace(/[^0-9.]/g, ""));
  };

  const handlePercentageChange = (value: string) => {
    const cleaned = value.replace(/[^0-9.]/g, "");
    if (cleaned === "") {
      setSetupPercentage("");
      return;
    }
    const parsed = Number.parseFloat(cleaned);
    setSetupPercentage(Number.isFinite(parsed) ? String(Math.min(Math.max(parsed, 0), 100)) : "");
  };

  return (
    <Card className="rounded-2xl border-border/50 shadow-[var(--shadow-card)]">
      <CardContent className="space-y-7 p-5 sm:p-8">
        <div className="space-y-2.5">
          <Label htmlFor="monthly-rent">Monthly Rent</Label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center border-r border-input text-sm font-semibold text-muted-foreground">
              {currency.symbol}
            </span>
            <Input
              id="monthly-rent"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={monthlyRent}
              onChange={(event) => handleRentChange(event.target.value)}
              placeholder="25,000"
              className="h-12 pl-14 text-base tabular-nums md:text-base"
            />
          </div>
        </div>

        <div className="space-y-2.5">
          <Label htmlFor="setup-percentage">Setup Percentage</Label>
          <div className="relative">
            <Input
              id="setup-percentage"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={setupPercentage}
              onChange={(event) => handlePercentageChange(event.target.value)}
              className="h-12 pr-12 text-base tabular-nums md:text-base"
              aria-describedby="setup-percentage-help"
            />
            <span className="pointer-events-none absolute inset-y-0 right-0 flex w-11 items-center justify-center border-l border-input text-sm font-semibold text-muted-foreground">
              %
            </span>
          </div>
          <p id="setup-percentage-help" className="text-sm text-muted-foreground">
            Typically 5–10% of annual rent in India.
          </p>
        </div>

        <Separator />

        <section aria-live="polite" aria-label="Calculated rent costs" className="space-y-5">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
            <p className="text-sm font-medium text-primary">First-Year Total</p>
            <p className="mt-1 min-h-10 text-3xl font-bold tracking-tight tabular-nums text-foreground transition-all duration-200 sm:text-4xl">
              {results ? formatted(results.firstYearTotal) : "—"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {resultItems.map((item) => (
              <div key={item.key} className="min-w-0">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="mt-1 min-h-7 break-words text-lg font-semibold tabular-nums text-foreground transition-all duration-200">
                  {results ? formatted(results[item.key]) : "—"}
                </p>
              </div>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
