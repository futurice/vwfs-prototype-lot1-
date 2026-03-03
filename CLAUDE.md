# VWFS Performance Platform - LOT 1 Prototype

## Project Context
This is a working frontend prototype for LOT 1 of the VWFS Performance Platform tender (ITT ref: VWUK 2025 000268). It demonstrates 8 modules covering Bonus Tools, Scorecards & Dashboards, Action Planning, Visit Reporting, Margin Tool, and Retailer Retention. All backend is mocked — no real API calls.

## Client
Volkswagen Financial Services (VWFS) UK — part of Volkswagen Group (VWG). The platform serves ~945 retailers across 9 brands: Audi, Volkswagen, Volkswagen CV, SEAT, CUPRA, SKODA, Bentley, Lamborghini, Porsche.

## Tech Stack
- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS (VWFS themed)
- React Router v7 (routing)
- Zustand v5 (state management)
- TanStack Table v8 (data tables)
- Recharts v3 (charts/dashboards)
- Lucide React (icons)
- date-fns (date formatting)
- Mock data layer (TypeScript modules + custom hooks)

## VWFS Design System

### Colour Palette
- Brand Primary: #004666 (Dark Teal) - Headings, nav, primary actions
- Brand Accent: #05CE9F (Mint Green) - CTA buttons, success states
- Accent Light: #66E4EE (Light Cyan) - Highlights, active states
- Text: #4C5356 (Dark Grey) - Body text
- Surface: #F2F2F2 (Light Grey) - Page backgrounds
- Surface Dark: #A8ADB3 (Medium Grey) - Borders, disabled
- Success: #038364, Error: #CD3B4F, Warning: #F5E850

### Typography
- Font: Arial, Verdana, sans-serif
- H1: 48px bold #004666, H2: 30px bold, H3: 24px bold
- Body: 18px regular #4C5356, Small: 15px

## Module Structure (8 modules)
1. Bonus Enquiries — /bonus/enquiries
2. Bonus Exceptions — /bonus/exceptions
3. Balanced Scorecards — /scorecards
4. Performance Dashboards — /dashboards
5. Action Planning — /actions
6. Visit Reporting — /visits
7. Margin Tool — /margin
8. Retailer Retention — /retention

## User Roles (switchable via toolbar)
- Retailer User, Group Manager, Area Manager, National/Brand User, Head Office Admin, Field Force User

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check
