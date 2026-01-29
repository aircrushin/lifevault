# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start Next.js development server (runs on http://localhost:3000)
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Project Overview

LifeVault is a health data management and monetization platform built with Next.js 16, React 19, and Tailwind CSS v4. The app allows users to securely store, encrypt, and potentially monetize their health data through a marketplace.

## Architecture

### App Router Structure
Uses Next.js App Router with the `app/` directory:
- Root layout in `app/layout.tsx` defines global styles, fonts, and background effects
- Pages in `app/` directory (Dashboard, Upload, Marketplace, Security, Settings)

### Component Organization
```
components/
├── ui/              # Reusable UI primitives (GlassCard, CustomCursor, Particles)
├── layout/          # Layout components (Sidebar, MainLayout)
├── dashboard/       # Dashboard-specific components (HealthRadar, TotalEquity, etc.)
├── upload/          # Data upload flow components (DropZone, EncryptionAnimation, etc.)
└── marketplace/     # Marketplace components (ResearcherCard, ConsentToggle, etc.)
```

### Key Design Patterns

**Glass Morphism UI System**
- Central `GlassCard` component (`components/ui/GlassCard.tsx`) provides consistent glass-morphism styling
- Uses custom CSS variables for theming (defined in `app/globals.css`)
- All cards should use `GlassCard` or its sub-components (`GlassCardHeader`, `GlassCardContent`)

**Client-Side Navigation**
- All pages and components use `"use client"` directive
- Sidebar navigation uses Next.js `Link` and `usePathname` for active state
- `MainLayout` wraps all pages, providing Sidebar and content structure

**Animation System**
- Framer Motion for all animations
- Consistent animation patterns: stagger delays, smooth transitions
- Custom CSS animations in globals.css: `pulse-glow`, `animate-float`, `gradient-shift`

**Typography**
- Space Grotesk (variable font `--font-geist-sans`) for UI text
- JetBrains Mono (variable font `--font-geist-mono`) for code/data
- Applied globally via root layout

**Color System**
- Dark theme only (`className="dark"` on html element)
- CSS custom properties for colors: `--accent-primary` (emerald), `--accent-gold`, etc.
- Theme exposed to Tailwind via `@theme inline` in globals.css

### Utility Functions
`lib/utils.ts` provides:
- `cn()` - Merges clsx and tailwind-merge for conditional classes
- `formatCurrency()`, `formatNumber()`, `formatPercentage()` - Formatters
- `generateId()`, `sleep()` - Helper utilities

### Path Aliases
`@/*` maps to project root (configured in `tsconfig.json`)

## Dependencies

- **next** 16.1.6 - App Router with React 19
- **react** 19.2.3 - UI framework
- **framer-motion** 12.x - Animations
- **recharts** 3.x - Charts for health data visualization
- **lucide-react** - Icons
- **tailwindcss** v4 - Styling with PostCSS integration
- **clsx** + **tailwind-merge** - Conditional class utilities

## Styling Approach

- Uses Tailwind CSS v4 with `@import "tailwindcss"`
- Custom CSS variables in `:root` for theming
- Glass morphism with backdrop blur and subtle borders
- Animated gradient backgrounds with noise texture overlay
- Grid background pattern for depth
