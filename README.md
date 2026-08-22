# Hammam Zahra — Ritual Booking Site

A marketing + booking site for a fictional boutique hammam (bathhouse), built as a portfolio piece to show a distinctive visual identity, entrance/scroll animations, and a real multi-step booking flow wired to a stateful data layer.

**[Live demo →](#)** _(add your Vercel/Netlify link here after deploying)_

## What it does

- **Home** — animated hero, service grid, testimonials, and a courtyard-style "about" section
- **Book** — a 4-step flow: choose a ritual → pick a live date/time slot → enter your details → get a confirmation code
- Time slots are genuinely reserved for the session — book one and it disappears from availability immediately, the same way a real booking API would behave

## Why these choices

- **A single signature motif, used sparingly**: the keyhole arch echoes hammam doorway architecture, and reappears as a frame for icons, the confirmation checkmark, and the "about" panel — instead of a generic rounded rectangle everywhere.
- **RTK Query** powers services, availability, and the booking mutation. Confirming a booking invalidates that date's availability cache automatically, so the slot grid updates without a manual refetch — the same pattern a production booking API would use.
- **A simulated network layer** (`src/services/api.js`) means the project runs immediately with `npm install && npm run dev`, no backend required, while still exercising real request/response/error shapes.
- **Framer Motion** for a few deliberate moments — the hero's staggered entrance, scroll-triggered reveals, and the step transitions in the booking flow — rather than animating everything.
- **Reusable components** (`src/components/ui`): Button, Card, Input, Skeleton, ArchFrame, plus booking-specific pieces (ServiceCard, TimeSlotGrid, Stepper) shared between the home page and the booking flow.

## Stack

- React 19 + Vite
- Tailwind CSS
- Redux Toolkit + RTK Query
- React Router
- Framer Motion
- Lucide icons

## Running locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Project structure

```
src/
  app/store.js              Redux store
  services/api.js           RTK Query endpoints + simulated network layer
  data/mockDb.js            Services, testimonials, hours, slot generation
  components/ui/            Reusable primitives (Button, Card, Input, ArchFrame...)
  components/layout/        Navbar, Footer
  components/booking/       ServiceCard, TimeSlotGrid, Stepper
  pages/                    Home, Book
```
