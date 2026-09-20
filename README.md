# 🏠 RentSetup — Rent Setup Calculator

> **Know your true move-in cost — including setup charges, in seconds.**

A beautiful, lightning-fast **rent setup calculator** that helps tenants understand the real cost of moving into a rented home. Enter your monthly rent and setup percentage to instantly see your **Yearly Setup Cost**, **Monthly Equivalent**, **First-Year Total**, and **Effective Monthly Cost** — all calculated live in your browser.

**100% free · No signup · No data collection · Runs entirely client-side** ✨

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🧮 How It Works](#-how-it-works)
- [🖼️ App Preview](#️-app-preview)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [📜 Available Scripts](#-available-scripts)
- [💱 Supported Currencies](#-supported-currencies)
- [♿ Accessibility](#-accessibility)
- [🔍 SEO](#-seo)
- [🔒 Privacy](#-privacy)
- [❓ FAQ](#-faq)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

| Feature | Description |
| --- | --- |
| ⚡ **Live Calculations** | Results update on every keystroke — no "Calculate" button, no waiting |
| 💱 **Multi-Currency Support** | Switch between INR (₹), USD ($), EUR (€), and GBP (£) — your choice is remembered |
| 📊 **Complete Cost Breakdown** | See yearly setup cost, monthly equivalent, first-year total, and effective monthly cost at a glance |
| 🧾 **Transparent Formula** | A live formula line shows exactly how each number is built up (e.g. `₹25,000 × 12 months + ₹30,000 setup`) |
| 🪟 **Glassmorphism UI** | Frosted translucent card with soft color glows, smooth transitions, and a modern indigo accent |
| 📱 **Fully Responsive** | Works flawlessly on mobile (3-col results stack) and desktop — touch targets ≥ 44px |
| 🎯 **Smart Input Handling** | Text inputs with decimal keyboards, invalid characters stripped, negatives clamped, setup % clamped to 0–100 |
| 💾 **Zero Backend** | No server, no database, no API calls — pure client-side functions |
| 🔒 **Privacy First** | Nothing is stored, tracked, or transmitted. Your numbers never leave your browser |
| 🧠 **Accessible** | Proper labels, `aria-live` results, full keyboard navigation, semantic HTML |

---

## 🧮 How It Works

All calculations are **pure functions** — deterministic, instant, and side-effect free:

| Result | Formula |
| --- | --- |
| 📦 **Yearly Setup Cost** | `monthlyRent × 12 × (setupPct / 100)` |
| 📆 **Monthly Equivalent** | `yearlySetup / 12` |
| 💰 **First-Year Total** | `(monthlyRent × 12) + yearlySetup` |
| 🏁 **Effective Monthly Cost** | `monthlyRent + monthlyEquivalent` |

### 🧪 Example

For a **₹25,000/month** apartment with a **10% setup charge**:

| Result | Value |
| --- | --- |
| Yearly Setup Cost | ₹30,000 |
| Monthly Equivalent | ₹2,500 |
| **First-Year Total** | **₹3,30,000** |
| Effective Monthly Cost | ₹27,500 |

---

## 🖼️ App Preview

```text
┌──────────────────────────────────────────────┐
│ 🏠 RentSetup                     [ ₹ INR ▾ ] │
├──────────────────────────────────────────────┤
│                                              │
│        Rent Setup Calculator                 │
│   Know your true move-in cost — including    │
│        setup charges, in seconds.            │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │  Monthly Rent                          │  │
│  │  [ ₹  25,000                    ]      │  │
│  │                                        │  │
│  │  Setup Percentage                      │  │
│  │  [ 10                           %]     │  │
│  │  Typically 5–10% of annual rent        │  │
│  │  ────────────────────                  │  │
│  │  ╔══════════════════════════════════╗  │  │
│  │  ║  First-Year Total                ║  │  │
│  │  ║  ₹3,30,000                       ║  │  │
│  │  ║  ₹25,000 × 12 + ₹30,000 setup    ║  │  │
│  │  ╚══════════════════════════════════╝  │  │
│  │  Setup Cost │ Monthly Eq. │ Effective  │  │
│  └────────────────────────────────────────┘  │
│                                              │
│   ✓ No signup  ✓ Runs in browser  ✓ Free    │
│                                              │
│              ▾ FAQ accordions                │
└──────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| ⚛️ [React 19](https://react.dev) | UI library |
| 🟦 [TypeScript](https://www.typescriptlang.org) | Type-safe code |
| ⚡ [Vite](https://vitejs.dev) | Build tool & dev server |
| 🎨 [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling with design tokens |
| 🧩 [shadcn/ui](https://ui.shadcn.com) | Card, Input, Label, Select, Separator components |
| 🧭 [TanStack Start](https://tanstack.com/start) | Full-stack React framework (SSR + routing) |
| 📐 [Radix UI](https://www.radix-ui.com) | Accessible headless primitives |

---

## 📁 Project Structure

```text
src/
├── App.tsx                        # Page shell — glassy header, background blobs, FAQ, footer
├── components/
│   ├── RentCalculator.tsx         # Main calculator card — live inputs + results grid
│   ├── CurrencySelect.tsx         # Currency dropdown (shadcn Select)
│   └── ui/                        # shadcn/ui primitives
├── lib/
│   ├── format.ts                  # Pure calc + formatting helpers (calculateRentSetup, parseNumericInput, formatCurrency)
│   ├── currency.tsx               # Currency context with localStorage persistence
│   └── utils.ts                   # cn() class-merge helper
├── routes/
│   ├── __root.tsx                 # Root layout, fonts, global head
│   └── index.tsx                  # Home route — SEO meta + FAQPage JSON-LD
├── styles.css                     # Tailwind v4 theme tokens (indigo primary, glass shadows, radii)
├── router.tsx                     # TanStack Router setup
└── start.ts                       # Start framework config
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- **Node.js** v18+ and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### 📦 Installation

```sh
# 1. Clone the repository
git clone <this-repository-url>
cd <repository-name>

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be live at `http://localhost:8080` 🎉

### 🏗️ Production Build

```sh
npm run build        # build for production
npm run preview      # preview the production build locally
```

Deploys as a **static site** — host it anywhere (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

---

## 📜 Available Scripts

| Script | Command | Description |
| --- | --- | --- |
| 🖥️ Dev server | `npm run dev` | Start Vite dev server with hot reload |
| 🏗️ Build | `npm run build` | Production build |
| 🧪 Dev build | `npm run build:dev` | Development-mode build |
| 👀 Preview | `npm run preview` | Preview the production build |
| 🧹 Lint | `npm run lint` | Run ESLint |
| ✨ Format | `npm run format` | Format code with Prettier |

---

## 💱 Supported Currencies

| Currency | Symbol | Locale |
| --- | --- | --- |
| 🇮🇳 Indian Rupee (default) | ₹ | `en-IN` |
| 🇺🇸 US Dollar | $ | `en-US` |
| 🇪🇺 Euro | € | `de-DE` |
| 🇬🇧 British Pound | £ | `en-GB` |

Your currency selection is **persisted in `localStorage`** (key: `rentsetup-currency`) — INR values never show decimals; others use standard locale formatting.

---

## ♿ Accessibility

- ✅ Proper `<label htmlFor>` on every input
- ✅ `aria-live="polite"` on the results container — screen readers announce updates
- ✅ Fully keyboard navigable
- ✅ Semantic HTML: `<main>`, `<section>`, single `<h1>`
- ✅ Touch targets ≥ 44px on mobile
- ✅ Smooth value transitions (`transition-all duration-200`)

---

## 🔍 SEO

- 📝 Descriptive `<title>` and `<meta name="description">`
- 📣 Open Graph tags (`og:title`, `og:description`)
- 🎨 Branded `theme-color` (#4f46e5)
- 🔗 Canonical URL
- 📊 **JSON-LD `FAQPage` structured data** matching the on-page FAQ — eligible for rich results in Google

---

## 🔒 Privacy

> This app collects **nothing**. No accounts, no analytics, no cookies, no network calls from the calculator. All math happens in your browser and vanishes when you close the tab.

---

## ❓ FAQ

<details>
<summary><b>What is a rent setup cost?</b></summary>

A one-time cost paid when moving in, covering items like security deposit, brokerage, or maintenance advance — usually expressed as a percentage of annual rent.
</details>

<details>
<summary><b>How is the rent setup percentage calculated?</b></summary>

`Yearly setup = monthlyRent × 12 × (setupPct / 100)`. For example, ₹25,000/month at 10% = ₹30,000 yearly setup.
</details>

<details>
<summary><b>Is this rent setup calculator free?</b></summary>

Yes. It runs entirely in your browser, stores no data, and requires no signup.
</details>

---

## 🤝 Contributing

Contributions are welcome! 🎉

1. 🍴 Fork the repository
2. 🌿 Create your branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔃 Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<p align="center">Built with ❤️ by <strong>Utlarsh Vidyarthi</strong> using <a href="https://lovable.dev">Lovable</a> · Calculations run in your browser 🏠</p>
