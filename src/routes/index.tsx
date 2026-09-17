import { createFileRoute } from "@tanstack/react-router";
import App from "@/App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rent Setup Calculator — Free Yearly Setup & First-Year Rent Cost Tool" },
      {
        name: "description",
        content:
          "Free rent setup calculator. Enter monthly rent and setup % (default 10%) to instantly see yearly setup cost, monthly equivalent, and first-year total. No signup, runs in your browser.",
      },
      { property: "og:title", content: "Rent Setup Calculator" },
      {
        property: "og:description",
        content: "Instantly calculate yearly setup cost and first-year rent total. Free, no signup.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#4f46e5" },
    ],
    links: [{ rel: "canonical", href: "https://YOURDOMAIN.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is a rent setup cost?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A one-time cost paid when moving in, covering items like security deposit, brokerage, or maintenance advance — usually expressed as a percentage of annual rent.",
              },
            },
            {
              "@type": "Question",
              name: "How is the rent setup percentage calculated?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yearly setup = monthlyRent × 12 × (setupPct / 100). For example, ₹25,000/month at 10% = ₹30,000 yearly setup.",
              },
            },
            {
              "@type": "Question",
              name: "Is this rent setup calculator free?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. It runs entirely in your browser, stores no data, and requires no signup.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: App,
});
