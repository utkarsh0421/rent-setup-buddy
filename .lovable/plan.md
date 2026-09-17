# Rent Setup Calculator

## Build
- Create the browser-only currency configuration and pure rent calculation helpers.
- Add the RentCalculator and CurrencySelect components using the existing shadcn controls.
- Build the single centered page with sticky header, calculator, trust row, FAQ, and footer.
- Apply the neutral and indigo design tokens, responsive layout, accessible labels, and live result updates.
- Add page-specific SEO metadata and matching FAQ structured data.

## Validation
- Verify empty and populated calculations, currency switching and persistence, input clamping, responsive layouts, and production build output.

## Technical notes
- Keep all state and calculations in React; use localStorage only for the selected currency.
- Preserve TanStack Start routing while providing the requested App.tsx page shell at the `/` route.
- No backend, authentication, database, API calls, analytics, or submit button.
