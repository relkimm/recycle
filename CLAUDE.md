# CLAUDE.md - Recycle Match Platform

## Project Overview

- **Name**: Recycle Match (Neighborhood-based C2C Recycling Matching Platform)
- **Description**: A mobile-first web application connecting people who need help with recycling/waste disposal (requesters) with neighbors who can help (collectors). Similar to "Karrot Market" (Danggeun) but for recycling.
- **Target Audience**: Local residents.
- **Key Features**: Request creation (with photos/AI price), Request feed, Detail view (proposals), My Page.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS 4 (using CSS variables for theme)
- **Language**: TypeScript
- **Icons**: Lucide React
- **Images**: picsum.photos (Mock data)

## Commands

- **Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm run start`
- **Lint**: `npm run lint`
- **Install**: `npm install`

## Project Structure

- `app/`: Next.js App Router pages and layouts.
  - `globals.css`: Global styles, Tailwind theme configuration, Mobile frame styles.
  - `layout.tsx`: Root layout including the mobile frame wrapper (Notch, Home Indicator).
  - `page.tsx`: Main feed (Home).
  - `request/`: Request related pages (`new`, `[id]`).
  - `my/`: My page.
- `components/`: Reusable UI components (Header, BottomNav, RequestCard, etc.).
- `lib/`: Utility functions and mock data (`data.ts`).

## Design System & UI Guidelines

- **Mobile First**: Designed strictly for mobile view (max-width: 560px).
- **Frame**: Wrapped in a simulated mobile frame in `layout.tsx`.
- **Colors**: Use CSS variables defined in `globals.css`
  - Text: `var(--color-text-primary)` (#191f28), `var(--color-text-secondary)` (#4e5968), `var(--color-text-tertiary)` (#8b95a1)
  - Background: `var(--color-bg)` (#ffffff), `var(--color-bg-secondary)` (#f7f8fa), `var(--color-bg-tertiary)` (#f0f1f3)
  - Border: `var(--color-border)` (#e5e8eb), `var(--color-border-light)` (#f2f4f6)
  - Accent: `var(--color-primary)` (#191f28), `var(--color-error)` (#f04452), `var(--color-link)` (#3182F6)
- **Typography**: Apple system font stack (-apple-system, Pretendard)
  - XS: 11px (var(--font-size-xs))
  - SM: 13px (var(--font-size-sm))
  - Base: 15px (var(--font-size-base))
  - LG: 17px (var(--font-size-lg))
  - XL: 20px (var(--font-size-xl))
  - 2XL: 24px (var(--font-size-2xl))
- **Spacing**: Use CSS variables (var(--spacing-sm) to var(--spacing-3xl))
- **Border Radius**: Use CSS variables
  - SM: 6px (var(--radius-sm))
  - MD: 10px (var(--radius-md))
  - LG: 14px (var(--radius-lg))
  - XL: 18px (var(--radius-xl))
- **Components**:
  - Buttons: `rounded-[10px]` (var(--radius-md))
  - Cards: `rounded-[12px]` to `rounded-[16px]`
  - Inputs: `rounded-[10px]` to `rounded-[12px]`

## Code Style Guidelines

- **Components**: Functional components with TypeScript interfaces.
- **Styling**: Use Tailwind utility classes. Avoid inline styles unless necessary for dynamic values.
- **Imports**: Use absolute imports (`@/components/...`, `@/lib/...`).
- **Naming**: PascalCase for components, camelCase for functions/variables.
- **Data**: Use `lib/data.ts` for mock data.
- **Icons**: Use `lucide-react` icons.

## Important Notes

- **Mobile Simulation**: The `body` has a darker background to make the white mobile frame pop. The `#mobile-frame` div in `layout.tsx` handles the mobile constraint and shadows.
- **Sticky Elements**: Header and BottomNav are sticky/fixed. Ensure proper padding in main content to avoid overlap (`pb-[100px]`, `pt-[44px]`).
