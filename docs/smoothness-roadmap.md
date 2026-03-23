# Smoothness & polish (implemented + backlog)

## Done (this pass)

- **Mobile hero** — Replaced seven wide pagination pills with **prev / next** (44px targets), **“n / N”** counter, and a **thin progress track** (tap to jump). Cards are **one tappable link** per slide (no nested CTA). Intersection index updates are **debounced**; programmatic scroll uses **`scrollTo`** with **`prefers-reduced-motion`** (`HeroCarousel.tsx` + `globals.css`). Tighter hero spacing and **`.hero-carousel + .section`** padding so “Top Picks” doesn’t feel stacked.

- **Skip link** — `Skip to main content` → `#main-content` on the site layout (`app/(site)/layout.tsx`).
- **Main landmark** — `<main id="main-content" tabIndex={-1}>` for skip target and focus management.
- **Products dropdown** — `Escape` closes; **click/tap outside** closes (`pointerdown` on `document`, scoped to dropdown ref).
- **Config polling** — `/api/config` interval **30s** (was 10s) in `ConfigProvider.tsx`.
- **Hero autoplay** — Disabled when `prefers-reduced-motion: reduce` (`HeroCarousel.tsx`).
- **Scroll reveal** — If reduced motion, sections get `.reveal` immediately (no IntersectionObserver wait).
- **CSS** — Motion tokens (`--ease-out`, `--dur-fast`, `--dur-med`); `scroll-behavior: smooth` only when motion is allowed; **`:focus-visible`** ring; **`touch-action: manipulation`** on primary nav/button patterns; **reduced-motion** overrides for hero, cards, hovers.

## LCP / images (implemented)

- **Hero (desktop)**: first slide `priority` + `fetchPriority="high"`; first product thumb on the **active** slide gets `priority` + `fetchPriority="high"`, others `low`.
- **Hero (mobile strip)**: first card `priority` + `fetchPriority="high"` + `eager`; cards 2–7 `lazy` + `fetchPriority="low"`.
- **Top Picks (`FeaturedProductCards`)**: first card image `priority` + `fetchPriority="high"` + `eager`; rest `lazy`.
- **Category listing (`ProductFilterGrid`)**: first product image `priority` + `fetchPriority="high"` + `eager`; rest `lazy`.
- **Category hero**: `fetchPriority="high"` with existing `priority`.
- **`next.config.mjs`**: `images.formats` → `avif` + `webp` for smaller payloads.

### Run Lighthouse locally

1. Terminal A: `npm run build && npm run start` (or `npm run dev`).
2. Terminal B (needs Chrome + network for first `npx` download):

```bash
npm run perf:lighthouse
# or
npm run perf:lighthouse:desktop
```

Open `lighthouse-mobile.html` / `lighthouse-desktop.html` in a browser (generated in project root).

## Backlog (nice next steps)

- Optional: trap focus inside mobile menu when open.
- Optional: further tune `sizes` per layout breakpoint after a real Lighthouse trace.
