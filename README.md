# LifeVault

<div align="center">

**Your Health Data Swiss Bank — Store, Encrypt, and Monetize**

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[Web3 / HealthTech / DataFi]

</div>

---

## Overview

LifeVault is a Web3-style privacy vault that transforms your health data into valuable assets. Take ownership of your biological data, secure it with enterprise-grade encryption, and earn passive income by granting access to research institutions.

### The Problem

- **Data Silos**: Medical records and genetic data are scattered across hospitals and testing facilities
- **Lost Value**: Pharmaceutical companies profit from your data while you, the source, receive nothing

### Our Solution

LifeVault implements **"Data as an Asset"** — giving you data sovereignty and the ability to monetize your health information on your terms.

### Core Values

- **Security**: Only you hold the decryption keys
- **Liquidity**: Transform static health reports into income-generating assets
- **Insight**: Convert biological metrics into financial scores

---

## Features

### 1. Data Vault

Secure storage center for health data with end-to-end encryption.

- Multi-format upload support (PDF reports, medical images, VCF/FastQ genetic data)
- Local browser-side encryption before upload
- OCR-powered data extraction and structuring
- Real-time data valuation engine based on completeness, rarity, and market demand

### 2. Health Scorecard

Financial-style health scoring system.

- 300-900 point "Health Credit Score"
- Radar chart visualization across 5 dimensions:
  - Cardiovascular
  - Metabolism
  - Immunity
  - Genetic Risk
  - Anti-aging
- AI-powered insights on data value

### 3. Data Marketplace

Consent management and earnings platform.

- Browse research institutions seeking data (Pfizer, Stanford, Genentech, etc.)
- One-click consent toggles for data authorization
- Real-time earnings dashboard
- Transparent access logs showing all data usage

---

## Tech Stack

### Frontend Framework
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development

### Styling & Animation
- **Tailwind CSS v4** - Utility-first CSS
- **Framer Motion** - Production-ready motion library
- **CSS Variables** - Dynamic theming system

### Data Visualization
- **Recharts** - Charts for health metrics
- **Lucide React** - Icon library

### Utilities
- **clsx** + **tailwind-merge** - Conditional class management
- **Space Grotesk** + **JetBrains Mono** - Variable fonts

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/lifevault.git
cd lifevault

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## Project Structure

```
lifevault/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with fonts and global styles
│   ├── page.tsx             # Dashboard (homepage)
│   ├── upload/              # Data upload center
│   ├── marketplace/         # Research marketplace
│   ├── security/            # Encryption key management
│   ├── settings/            # User settings
│   └── globals.css          # Global styles with theme variables
├── components/
│   ├── ui/                  # Reusable UI primitives
│   │   ├── GlassCard.tsx    # Glass-morphism card component
│   │   ├── CustomCursor.tsx # Custom cursor effect
│   │   └── Particles.tsx    # Background particles
│   ├── layout/              # Layout components
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   └── MainLayout.tsx   # Main layout wrapper
│   ├── dashboard/           # Dashboard-specific components
│   ├── upload/              # Upload flow components
│   └── marketplace/         # Marketplace components
├── lib/
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
    ├── logo.svg
    ├── favicon.svg
    └── mock-data/           # Mock data for development
```

---

## Key Components

### GlassCard System

Central component for consistent glass-morphism styling across the app:

```tsx
import { GlassCard } from "@/components/ui/GlassCard";

<GlassCard glow="accent" hover>
  <div>Your content here</div>
</GlassCard>
```

### Layout System

All pages use `MainLayout` which provides:
- Collapsible sidebar with navigation
- Animated page transitions
- Consistent spacing and structure

```tsx
import { MainLayout } from "@/components/layout/MainLayout";

export default function MyPage() {
  return (
    <MainLayout>
      {/* Page content */}
    </MainLayout>
  );
}
```

---

## Development Roadmap

### Phase 1: Core MVP (Current)
- [x] Dashboard with health metrics
- [x] Data upload interface
- [x] Marketplace UI
- [x] Glass-morphism design system

### Phase 2: Encryption & Security
- [ ] Client-side encryption implementation
- [ ] Private key management
- [ ] IPFS/Arweave integration
- [ ] Wallet Connect (MetaMask, Coinbase Wallet)

### Phase 3: Data Processing
- [ ] OCR data extraction
- [ ] Genetic data parsing
- [ ] Health score calculation algorithm
- [ ] Data valuation engine

### Phase 4: Marketplace & Monetization
- [ ] Smart contract integration
- [ ] Research institution onboarding
- [ ] Payment processing (crypto + fiat)
- [ ] Access logging system

### Phase 5: Compliance & Scale
- [ ] HIPAA/GDPR compliance
- [ ] Security audit
- [ ] Zero-knowledge proof implementation
- [ ] Public launch

---

## Design System

### Colors

LifeVault uses a dark theme with emerald and gold accents:

- **Background**: Deep black (`#050505`)
- **Accent Primary**: Emerald (`#10b981`)
- **Accent Gold**: Gold (`#fbbf24`)
- **Glass Borders**: Subtle white with low opacity

### Typography

- **Sans**: Space Grotesk (variable font)
- **Mono**: JetBrains Mono (for data/code)

### Effects

- Noise texture overlay
- Animated gradient backgrounds
- Glass morphism with backdrop blur
- Floating glow effects
- Smooth Framer Motion animations

---

## Target Users

1. **Data Stakers** (25-40 years old)
   - Tech-savvy individuals with genetic testing history
   - Seeking to earn tokens or cash from existing data

2. **High-Value Candidates**
   - Patients with rare diseases or chronic conditions
   - Hold highly valuable data for pharmaceutical research

---

## Metrics & KPIs

**North Star Metric**: TVL (Total Value Locked) — Total valuation of health data stored on the platform

**Core Metrics**:
- Upload rate (users who complete at least one upload)
- Authorization conversion rate (users who enable at least one data share)
- ARPU (Average Revenue Per User)

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for all new files
- Follow existing component patterns
- Use the `GlassCard` component for consistent styling
- Write meaningful commit messages

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Design inspired by DeFi protocols and Web3 aesthetics
- Icons from [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)

---

<div align="center">

**Take ownership of your biological assets**

[LifeVault](https://lifevault.io) | [Documentation](https://docs.lifevault.io) | [Twitter](https://twitter.com/lifevault)

</div>
