import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CURRENCIES, type CurrencyCode, useCurrency } from "@/lib/currency";

export function CurrencySelect() {
  const { currencyCode, setCurrencyCode } = useCurrency();

  return (
    <Select value={currencyCode} onValueChange={(value) => setCurrencyCode(value as CurrencyCode)}>
      <SelectTrigger className="h-11 w-[104px] border-border/70 bg-background shadow-none" aria-label="Currency">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {Object.values(CURRENCIES).map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            {currency.symbol} {currency.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
