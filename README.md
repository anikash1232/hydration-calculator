# Hydration Calculator

A web app that calculates your recommended daily water intake, adjusted for the temperature
where you actually are.

## What it does

Enter your height, weight, activity level and location. The app resolves that location to
coordinates, looks up the local temperature, and factors it into the recommendation —
because hydration needs in July in Phoenix aren't the ones in January in Boston.

- Intake calculated from body metrics and activity level
- Location resolved to coordinates, with local temperature retrieved
- Temperature-adjusted recommendation rather than a fixed formula
- Responsive interface built on accessible primitives

## Architecture

```
app/
  page.tsx                        entry point and layout
  globals.css                     theme
components/
  hydration-calculator.tsx        form state, calculation, results
  ui/                             button, card, input, label, select
lib/
  utils.ts                        helpers
```

The calculator is a single client component holding form state and results in typed shapes
(`FormData`, `HydrationResult`), so the calculation path and the rendering path share one
source of truth. UI primitives come from shadcn/ui over Radix, which means the selects and
labels carry correct keyboard and screen-reader behaviour without hand-rolled ARIA.

## Running it

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

Built with Next.js, React, TypeScript, Tailwind CSS and shadcn/ui.
