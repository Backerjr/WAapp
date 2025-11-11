# Adaptive Education Platform Architecture

## Core Layout
```
src/
├── main.tsx                     # Vite SPA entry point
├── App.tsx                      # Top-level app state, routing, and persistence
├── components/
│   ├── SkillTree.tsx            # Unit/lesson selection and locking logic
│   ├── LessonView.tsx           # Lesson player and exercise orchestration
│   ├── ExerciseCard.tsx         # Exercise wrapper with feedback and callbacks
│   ├── exercises/               # Individual exercise components (ListenAndSelect, etc.)
│   └── platform/                # Role-specific dashboard components
│       ├── TeacherConsole.tsx   # Teacher cockpit composition
│       ├── ManagerDashboard.tsx # Operations view composition
│       ├── StudentWorkspace.tsx # Student workspace shell
│       └── AIControlPanel.tsx   # AI command center orchestration
├── data/
│   └── lessons.ts               # Single source of truth for skill tree and exercises
├── lib/
│   └── state/                   # State management (Zustand-lite + persist middleware)
│       ├── academics.ts         # Academic state store with attendance and alerts
│       ├── zustand-lite.ts      # Lightweight Zustand implementation
│       └── zustand-persist-lite.ts # Persist middleware
├── types.ts                     # Shared domain models and exercise shapes
├── utils/                       # Formatting, accessibility helpers
└── design-system/               # Tokens, Tailwind plugin, shared UI components

# No backend API routes; production server is a minimal Node.js static server (see server.js)
# All client-side logic; no Edge runtime or Next.js API endpoints.
```

```
src/
├── design-system/
│   ├── tokens.ts                # Unified color, type, shadow, radius tokens
│   ├── tailwind-plugin.ts       # Custom Tailwind plugin exposing tokens
│   └── components.ts            # Shared shadcn/ui overrides
├── components/
│   ├── platform/                # Role-specific dashboard building blocks
│   ├── layout/                  # Shells, nav bars, responsive chrome
│   ├── charts/                  # Recharts wrappers with accessibility helpers
│   ├── forms/                   # React Hook Form + Zod scaffolds
│   └── interactive/             # Media players, AI assistants, and widgets
├── lib/
│   ├── state/                   # Zustand stores and selectors
│   ├── analytics/               # Client analytics + instrumentation
│   ├── ai/                      # Copilot orchestration + prompt builders
│   ├── api-client/              # Typed fetchers built with openapi-fetch
│   └── utils/                   # Formatting, accessibility helpers
├── server/                      # RSC-friendly server utilities (Edge ready)
│   ├── auth.ts                  # Lucia auth adapters
│   ├── prisma.ts                # Database client with accelerated reads
│   └── ai-engine.ts             # Server actions invoking OpenAI + Claude
└── types/
    ├── domain.ts                # Shared domain models
    ├── analytics.ts             # Telemetry contracts
    └── ai.ts                    # Prompt + automation schemas
```

```
tests/
├── unit/                        # Vitest focused suites
│   └── platformState.test.ts
├── integration/                 # React Testing Library harnesses
└── e2e/                         # Playwright specs (retained existing setup)
```

## Data Pipes
- **Source-of-truth**: Supabase Postgres (classes, lessons, attendance, achievements)
- **ETL cadence**: Edge webhook ingests daily CSV exports, normalizes to domain models, writes to Prisma
- **Telemetry**: Ingest to Tinybird for real-time dashboards, mirrored to Zustand snapshots for optimistic UI
- **AI Layer**: Command center orchestrates tasks via server actions hitting `/api/recommendations`

## Automation
- Husky hooks enforcing `pnpm run check`
- GitHub Actions pipeline: install → `pnpm run check` → Playwright headed false → deploy preview via Vercel
- Canary releases triggered on `main` with preview comment + analytics smoke tests
