# Tahqeeq - Operational Excellence Platform

## Overview
Tahqeeq is a Platform as a Service (PaaS) that connects businesses with GCC university students to handle operational tasks efficiently. The platform turns routine subtasks into targeted challenges for students, providing cost and time savings of 20-40%.

## Current State
- Frontend-only React application
- No backend or database yet
- Uses Vite as the build tool with React 18 and TypeScript

## Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui with Radix UI primitives
- **Routing**: React Router DOM v6
- **Forms**: React Hook Form with Zod validation
- **Data Fetching**: TanStack React Query

## Project Structure
```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Page components
├── assets/        # Static assets
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
└── index.css      # Global styles and design system
```

## Design System
- **Primary Color**: Deep Maroon (#5a2727)
- **Accent Color**: Refined Gold
- **Font Families**: Inter (body), Bebas Neue (brand)
- **Theme**: Light/Dark mode support via CSS variables

## Running the Project
The application runs on port 5000 using `npm run dev`.

## Recent Changes
- Migrated from Lovable to Replit environment
- Updated Vite config to use port 5000 and allow all hosts
- Fixed CSS @import order issue

## User Preferences
(To be updated based on user interactions)
