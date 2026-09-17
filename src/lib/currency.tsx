import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export const CURRENCIES = {
  INR: { code: "INR", locale: "en-IN", label: "INR", symbol: "₹" },
  USD: { code: "USD", locale: "en-US", label: "USD", symbol: "$" },
  EUR: { code: "EUR", locale: "de-DE", label: "EUR", symbol: "€" },
  GBP: { code: "GBP", locale: "en-GB", label: "GBP", symbol: "£" },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

interface CurrencyContextValue {
  currencyCode: CurrencyCode;
  setCurrencyCode: (currency: CurrencyCode) => void;
  currency: (typeof CURRENCIES)[CurrencyCode];
}

const STORAGE_KEY = "rentsetup-currency";
const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function isCurrencyCode(value: string | null): value is CurrencyCode {
  return value !== null && value in CURRENCIES;
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>("INR");

  useEffect(() => {
    const savedCurrency = window.localStorage.getItem(STORAGE_KEY);
    if (isCurrencyCode(savedCurrency)) setCurrencyCode(savedCurrency);
  }, []);

  const changeCurrency = (currency: CurrencyCode) => {
    setCurrencyCode(currency);
    window.localStorage.setItem(STORAGE_KEY, currency);
  };

  const value = useMemo(
    () => ({ currencyCode, setCurrencyCode: changeCurrency, currency: CURRENCIES[currencyCode] }),
    [currencyCode],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyContextValue {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
}
