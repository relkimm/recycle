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

- **Mobile First**: Designed strictly for mobile view (max-width: 390px).
- **Frame**: Wrapped in a simulated iPhone 14 frame with Notch and Home Indicator in `layout.tsx`.
- **Colors**:
  - Primary: Green (`#16A34A`, `text-green-500`, `bg-green-500`)
  - Secondary: Sky Blue (`#0EA5E9`)
  - Accent: Orange (`#F59E0B`)
  - Background: Gray 50/100 (`#F9FAFB`, `#F3F4F6`)
- **Typography**: Inter font.
  - Hero: 28px Bold
  - Title: 20px Bold
  - Subtitle: 18px Semibold
  - Body: 16px Regular
- **Components**:
  - Buttons: `rounded-xl`
  - Cards: `rounded-2xl`, `shadow-sm`
  - Inputs: `rounded-xl`

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
