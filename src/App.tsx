import { Check, ChevronDown } from "lucide-react";
import { CurrencySelect } from "@/components/CurrencySelect";
import { RentCalculator } from "@/components/RentCalculator";
import { CurrencyProvider } from "@/lib/currency";

const faqs = [
  {
    question: "What is a rent setup cost?",
    answer:
      "A one-time cost paid when moving in, covering items like security deposit, brokerage, or maintenance advance — usually expressed as a percentage of annual rent.",
  },
  {
    question: "How is the rent setup percentage calculated?",
    answer:
      "Yearly setup = monthlyRent × 12 × (setupPct / 100). For example, ₹25,000/month at 10% = ₹30,000 yearly setup.",
  },
  {
    question: "Is this rent setup calculator free?",
    answer: "Yes. It runs entirely in your browser, stores no data, and requires no signup.",
  },
];

export default function App() {
  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2" aria-label="RentSetup home">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span aria-hidden="true">🏠</span>
              </span>
              <span className="text-lg font-bold tracking-tight">RentSetup</span>
            </div>
            <CurrencySelect />
          </div>
        </header>

        <main className="mx-auto w-full max-w-[640px] px-4 py-14 sm:px-6 sm:py-20">
          <section aria-labelledby="page-title" className="text-center">
            <h1 id="page-title" className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Rent Setup Calculator
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Know your true move-in cost — including setup charges, in seconds.
            </p>
          </section>

          <section aria-label="Rent setup calculator" className="mt-10">
            <RentCalculator />
          </section>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {["No signup", "Runs in your browser", "100% free"].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-primary" strokeWidth={2.5} aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>

          <section aria-labelledby="faq-title" className="mt-16">
            <h2 id="faq-title" className="text-2xl font-bold tracking-tight text-foreground">
              Frequently asked questions
            </h2>
            <div className="mt-5 divide-y divide-border border-y border-border">
              {faqs.map((faq) => (
                <details key={faq.question} className="group">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="pb-5 pr-8 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </main>

        <footer className="border-t border-border/70 px-4 py-6 text-center text-sm text-muted-foreground">
          © 2026 RentSetup. Calculations run in your browser.
        </footer>
      </div>
    </CurrencyProvider>
  );
}
