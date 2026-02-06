# Tahqeeq — Technical Documentation

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│  Frontend (React 18 + TypeScript + Vite)            │
│  ┌───────────┐  ┌────────────┐  ┌────────────────┐ │
│  │ Pages     │  │ Components │  │ Context/Hooks  │ │
│  │ Index     │  │ Landing    │  │ CountryContext  │ │
│  │ NotFound  │  │ Demo Flows │  │ LanguageContext │ │
│  │           │  │ UI (shadcn)│  │ useMobile       │ │
│  └───────────┘  └────────────┘  └────────────────┘ │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │ Libraries                                     │   │
│  │ fitScoring.ts — Fit score engine + difficulty │   │
│  │ utils.ts      — Tailwind merge utility        │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
         ▼ (Future)
┌─────────────────────────────────┐
│  Backend (Supabase / Cloud)     │
│  PostgreSQL, Auth, Edge Fns     │
│  See schema.sql                 │
└─────────────────────────────────┘
```

## 2. Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | React 18 + TypeScript | UI rendering and type safety |
| Build | Vite (port 8080) | Fast dev server and bundling |
| Styling | Tailwind CSS + CSS variables | Semantic design tokens |
| Components | shadcn/ui + Radix UI | Accessible, composable primitives |
| Animation | Framer Motion | Page transitions, swipe gestures |
| Routing | React Router DOM v6 | Client-side navigation |
| Forms | React Hook Form + Zod | Validated form handling |
| Data | TanStack React Query | Async state management (future) |
| Charts | Recharts | Data visualization |

## 3. Project Structure

```
src/
├── assets/              # Static assets (SVGs, images)
├── components/
│   ├── brand/           # Logo, branded text
│   ├── landing/         # Landing page sections
│   │   ├── demo/        # Interactive demo
│   │   │   ├── corporation/  # Corp flow components
│   │   │   │   ├── CorporationFlow.tsx    # Flow orchestrator
│   │   │   │   ├── TaskInputStep.tsx      # Challenge definition
│   │   │   │   ├── SubmissionsDashboard.tsx
│   │   │   │   └── InternConversion.tsx
│   │   │   ├── student/      # Student flow components
│   │   │   │   ├── StudentFlow.tsx        # Flow orchestrator
│   │   │   │   ├── ChallengeSwiper.tsx    # Swipe matching UI
│   │   │   │   ├── SubmissionStep.tsx
│   │   │   │   ├── FeedbackStep.tsx
│   │   │   │   ├── PortfolioStep.tsx
│   │   │   │   ├── AIMentorChat.tsx
│   │   │   │   └── GamificationPanel.tsx
│   │   │   └── shared/       # Cross-flow components
│   │   │       ├── NetworkVisualization.tsx
│   │   │       ├── ValidationFlowVisual.tsx
│   │   │       └── ImpactScaler.tsx
│   │   ├── HeroSection.tsx
│   │   ├── InteractiveDemo.tsx
│   │   ├── CTASection.tsx
│   │   ├── LeadForm.tsx
│   │   └── SettingsBar.tsx
│   └── ui/              # shadcn/ui primitives
├── context/
│   ├── CountryContext.tsx    # GCC country + currency state
│   └── LanguageContext.tsx   # i18n (future)
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   ├── fitScoring.ts    # Fit score engine + difficulty tiers
│   └── utils.ts         # cn() utility
├── pages/
│   ├── Index.tsx         # Landing page
│   └── NotFound.tsx
├── App.tsx              # Root component + providers
├── main.tsx             # Entry point
└── index.css            # Design tokens + global styles
```

## 4. Fit Score Engine (`src/lib/fitScoring.ts`)

### Algorithm

```
fitScore = hardSkill × 0.40 + domain × 0.30 + values × 0.20 + diversity × 0.10
output  = round(55 + fitScore × 43)   // scaled to 55–98 range
```

### Hard Skill Matching (40%)
- Each student skill is expanded via `SKILL_TAXONOMY` into canonical tags
- Challenge skills are matched against expanded tags
- Direct match → 1.0, substring overlap → 0.6, no match → 0.0
- Score = sum of matches / total challenge skills

### Domain Alignment (30%)
- Student `major` mapped to domain tags via `MAJOR_DOMAIN_MAP`
- Tags checked against challenge skills + category text
- Score = hit ratio capped at 1.0

### Values Alignment (20%)
- Student `valuesFit` mapped to preferred challenge categories via `VALUES_CATEGORY_MAP`
- Aligned → 1.0, unaligned → 0.4

### Diversity Multiplier (10%)
- Random factor (0.7–1.0) ensures score variety across sessions

### Difficulty Tier Classification

```
getDifficultyTier(skills, description, duration) → "Beginner" | "Intermediate" | "Advanced"
```

Signal-based classification:
- **Advanced**: ≥2 advanced signals (monte carlo, solver, simulation, NPV, IRR, WACC, constraint, LP) OR 3-week duration
- **Intermediate**: ≥1 intermediate signal (regression, PivotTable, Goal Seek, exponential smoothing, cohort, sensitivity) OR 2-week duration
- **Beginner**: everything else (typically 1-week, basic formulas)

### Exported API

```typescript
calculateFitScore(profile: StudentProfile, challenge: ChallengeForScoring): number
getDifficultyTier(skills: string[], description: string, duration: string): DifficultyTier
getDifficultyColor(tier: DifficultyTier): string
```

## 5. Country Context (`src/context/CountryContext.tsx`)

Global state for GCC country selection. Provides:
- `country.id` — ISO 2-letter code (QA, SA, AE, KW, BH, OM)
- `country.name` — Display name
- `country.color` — HSL primary color string
- `country.currency` — Currency code (QAR, SAR, AED, KWD, BHD, OMR)
- `country.currencySymbol` — Arabic currency symbol

The `SettingsBar` component updates the country context, which:
1. Updates the CSS `--primary` variable on `document.documentElement`
2. Updates currency displays in `TaskInputStep` budget inputs

## 6. Interactive Demo Architecture

### Flow Pattern
Each flow (Corporation, Student) follows a state-machine pattern:

```typescript
type FlowStep = "step1" | "step2" | ...;
const [step, setStep] = useState<FlowStep>("step1");
```

Steps render via `AnimatePresence` for smooth transitions. Each step component receives:
- Data from previous steps
- Callbacks for advancing/going back
- Side effects (AI mentor toggle, matched challenge state)

### Challenge Swiper
- Scores all challenges on mount via `useMemo` + `calculateFitScore`
- Sorts by descending fit score
- Framer Motion drag gestures with threshold detection
- Skill overlap highlighted with sparkle icons on badges
- Difficulty tier badge with contextual icon (Shield/TrendingUp/Award)

### Corporation Task Templates
Pre-defined templates auto-populate the description and category:
- DCF Valuation → Finance
- Demand Forecasting → Analytics
- Solver Optimization → Operations
- Variance Analysis → Finance
- Regression Model → Analytics
- Monte Carlo Sim → Finance

## 7. Design Token System

### CSS Variables (index.css)
```css
:root {
  --background: H S L;
  --foreground: H S L;
  --primary: H S L;          /* Dynamic — changes with country */
  --primary-foreground: H S L;
  --secondary: H S L;
  --muted: H S L;
  --accent: H S L;
  /* ... */
}
```

### Tailwind Integration
All colors reference CSS variables via `tailwind.config.ts`:
```typescript
colors: {
  primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
  // ...
}
```

**Rule**: Never use raw color values in components. Always use semantic tokens (`text-primary`, `bg-muted`, etc.).

## 8. Database Schema (Future)

See `schema.sql` for the full PostgreSQL schema including:
- `users` table with role-based access (business, student, admin)
- `challenges` with anonymization trigger
- `matches`, `submissions`, `internships`
- `gamification` (XP, badges)
- `leads` (from landing page form)
- Row Level Security (RLS) configured per role

## 9. AI Integration Templates

See `templates/ai_integration/`:
- `fit_score_logic.md` — Scoring component weights and migration path to Vector DB
- `challenge_generator.md` — AI prompt template for auto-generating challenges from business parameters

## 10. Build & Development

```bash
npm run dev          # Start dev server on port 8080
npm run build        # Production build
npm run test         # Run Vitest tests
```

### Key Configuration
- `vite.config.ts` — Port 8080, path aliases (`@/` → `src/`)
- `tailwind.config.ts` — Design tokens, animations
- `tsconfig.app.json` — Strict TypeScript
- `components.json` — shadcn/ui configuration
