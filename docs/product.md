# Tahqeeq — Product Documentation

## 1. Vision & Value Proposition

Tahqeeq is a Platform as a Service (PaaS) connecting GCC businesses with university students. Routine corporate sub-tasks are transformed into structured, time-boxed challenges that students complete for pay, building verified portfolios while delivering 20-40% cost and time savings for businesses.

## 2. Target Users

| Persona | Key Needs |
|---------|-----------|
| **Corporation** (SMEs, enterprises) | Outsource operational sub-tasks (finance, analytics, logistics) to vetted student talent at lower cost |
| **Student** (GCC university undergraduates) | Gain real-world experience, earn income, build a verifiable professional portfolio |

## 3. Core Platform Flows

### 3.1 Corporation Flow

1. **Define Challenge** — Select a task template (DCF Valuation, Demand Forecasting, Solver Optimization, Variance Analysis, Regression Model, Monte Carlo Sim) or describe a custom sub-task.
2. **Set Parameters** — Specify category (Operations, Analytics, Marketing, Finance, Tech), timeline (1 week – ongoing), budget range (auto-localized currency based on GCC country), and KPIs with AI-suggested metrics.
3. **Launch & Match** — Animated network visualization shows the matching engine scanning the student pool.
4. **Review Submissions** — Dashboard with scored student deliverables, accept/reject workflow.
5. **Intern Conversion** — Option to convert top-performing students to internship positions.

### 3.2 Student Flow

1. **Build Profile** — Select college, skills (10 options auto-suggested by college), major, collaboration style, and values-fit driver (impact, learning, innovation, ethics).
2. **Challenge Matching (Swipe)** — Cards sorted by dynamic fit score (highest first). Each card shows category, difficulty tier, fit %, skill overlap highlights, duration, and reward. Swipe right to match, left to pass.
3. **AI Mentor** — Contextual chat assistant available during submission to guide deliverable quality.
4. **Submit Deliverable** — Upload work against the challenge brief.
5. **Feedback** — Automated and human review against professional standards.
6. **Portfolio** — Completed challenges recorded as verifiable credentials.

## 4. AI Fit Score Engine

The matching engine calculates a **dynamic fit score (55–98%)** for each student-challenge pair:

| Component | Weight | Logic |
|-----------|--------|-------|
| Hard Skill Match | 40% | Fuzzy tag matching via skill taxonomy; direct match = 1.0, partial substring = 0.6 |
| Domain Alignment | 30% | Student major mapped to domain tags vs. challenge skills/category |
| Values Alignment | 20% | Student values-fit driver matched to challenge category affinity |
| Diversity Multiplier | 10% | Controlled randomness (0.7–1.0) to ensure variety in recommendations |

Challenges are **sorted descending by fit score** so students see best matches first.

### Future Migration
- Current: static weights in rule-based engine
- Planned: Vector DB (Pinecone/Milvus) for semantic similarity between profiles and challenge descriptions

## 5. Difficulty Tier System

Each challenge is auto-classified into a difficulty tier based on complexity signals:

| Tier | Visual | Signals |
|------|--------|---------|
| **Beginner** | 🟢 Green badge | 1-week duration, basic Excel formulas (COUNTIFS, conditional formatting) |
| **Intermediate** | 🟡 Amber badge | 2-week duration, PivotTables, Goal Seek, regression, cohort analysis |
| **Advanced** | 🔴 Red badge | 3-week duration, Monte Carlo, Solver, LP, NPV/IRR, constraint modeling |

## 6. GCC Localization

### Country Themes
| Country | Primary Color | Currency |
|---------|--------------|----------|
| Qatar (QA) | Deep Maroon `hsl(0 48% 25%)` | QAR (ر.ق) |
| Saudi Arabia (SA) | Deep Green `hsl(145 60% 22%)` | SAR (ر.س) |
| UAE (AE) | Dark Blue `hsl(220 70% 25%)` | AED (د.إ) |
| Kuwait (KW) | Royal Blue `hsl(210 65% 30%)` | KWD (د.ك) |
| Bahrain (BH) | Royal Red `hsl(350 65% 35%)` | BHD (د.ب) |
| Oman (OM) | Orange `hsl(25 90% 45%)` | OMR (ر.ع) |

The settings bar overlay allows real-time country switching, which updates the entire UI theme and all currency displays.

### Language Support (EN/AR)

Full bilingual support with 80+ translation keys covering:
- Hero section (title, subtitle, CTA)
- Benefits section (all 3 time horizons × corp + student badges with detail text)
- Daily Life accordions (headings + all 12 list items)
- CTA section (heading, buttons, form title)
- Interactive demo (disclaimer, role selector, completion screen, badges)
- Footer and header tagline

**Implementation**: `LanguageContext.tsx` provides `t(key)` function. All components use `t()` for every user-facing string. RTL layout is handled via `document.documentElement.dir` toggle. Tailwind logical properties (`ps-`, `pe-`, `ms-`, `me-`) used throughout for correct RTL spacing.

## 7. Benefits Section

Interactive badge grid placed between Hero and Daily Life sections. Organized by three time horizons with tab navigation.

### Structure
- **Tabs**: Immediate | Medium-Term | Long-Term
- **Columns**: Corporations (left) | Students (right)
- **Badges**: Icon + label + checkmark by default. Click to expand inline with 1-2 sentence detail. Only one badge expanded at a time.

### Benefits Data (48-hour turnaround excluded)

**Immediate — Corps**: 20-40% lower cost, zero onboarding friction, instant Qatarization progress, reduced internal overload
**Immediate — Students**: Real-world experience within days, quick portfolio entries, points/badges for visible progress

**Medium-Term — Corps**: 30% intern conversion, AI-driven efficiency, stronger PR/morale, lower churn risk (locals retain 2x)
**Medium-Term — Students**: Professional network growth, soft skills compounding, priority challenge access via level-ups, internship offers

**Long-Term — Corps**: Knowledge retention, talent pipeline flywheel, youth-driven innovation, QNV2030 alignment
**Long-Term — Students**: Accelerated career launch, GCC-relevant resume, compounding confidence, lifelong career advantage

## 8. Task Specialization

Challenges emphasize **operational precision** and **Excel-driven solutions**:
- Financial Modeling: DCF, NPV/IRR, working capital, pricing elasticity, Monte Carlo
- Statistics: regression, A/B testing, cohort analysis, demand forecasting, hypothesis testing
- Operations Research: Solver optimization, linear programming, route optimization

All challenges produce **deployable outputs** for specific business needs with automated KPI verification.

## 9. Interactive Demo

The landing page features a role-selection demo (Corporation / Student) that walks through the full platform flow using local mock data. No backend required — purely illustrative.

### Demo Features
- Animated network visualizations during matching
- ROI impact scalers for corporations
- Tinder-style challenge swiping for students
- AI mentor chat simulation
- Gamification panel with XP and badges
- Contextual help tooltips at each step
- All text localized via `t()` keys

## 10. Hero Section

### Animated Background Paths
The hero section features floating SVG curves rendered via `BackgroundPaths` component:
- Path strokes use `hsl(var(--primary))` — auto-adapts to selected country theme
- 36 paths per layer, two layers (mirrored positions) for depth
- Opacity range: 0.03–0.15 (subtle, not overwhelming)
- Infinite reverse animation with staggered delays
- Dark mode: slightly higher perceived opacity due to contrast

### Hero Copy
- **EN**: "Transform operational bottlenecks into precision-matched challenges solved by pre-vetted local talent — cut costs, build your pipeline, and accelerate Qatarization. Automatically."
- **AR**: "حوّل الاختناقات التشغيلية إلى تحديات موجّهة تُحلّ بواسطة كفاءات محلية مُختارة — خفّض التكاليف، ابنِ خط المواهب، وسرّع التوطين. تلقائيًا."

CTA button scrolls smoothly to the demo/CTA section below.

## 11. Design System

- **Typography**: Inter (body), Bebas Neue (brand headings)
- **Component Library**: shadcn/ui with Radix UI primitives
- **Animations**: Framer Motion throughout
- **Theming**: HSL CSS custom properties with light/dark mode support
- **Responsive**: Mobile-first with dedicated mobile hooks
- **Design Principles**: Elite & elevating, hyperefficient, convenient
