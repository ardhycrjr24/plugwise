# PlugWise Architecture Documentation

## Overview

PlugWise is a frontend-only electricity consumption calculator and scenario simulator built with React, TypeScript, and Vite. The application follows a layered architecture with clear separation of concerns between presentation, application logic, domain calculations, and infrastructure.

## Technology Stack

### Core Technologies
- **React 19.0.0** — UI framework with modern hooks and concurrent features
- **TypeScript 5.6.3** — Type-safe development with strict mode enabled
- **Vite 8.3.8** — Fast build tool and development server
- **Tailwind CSS 4.1.1** — Utility-first CSS framework with PostCSS

### UI & Visualization
- **Lucide React 0.468.0** — Modern icon library
- **Recharts 2.15.0** — Composable charting library for data visualization

### Code Quality & Testing
- **ESLint 10.14.0** — JavaScript/TypeScript linting with flat config
- **Prettier 3.4.2** — Opinionated code formatter
- **Vitest 5.1.0** — Fast unit test runner with Vite integration
- **React Testing Library 16.1.0** — Component testing utilities
- **Playwright 1.49.1** — End-to-end testing framework

### Data Persistence
- **Browser LocalStorage** — Client-side data persistence (MVP)
- Versioned schema for future data migrations

## Application Architecture

### Layered Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Presentation Layer                      │
│                                                           │
│  - React Components (functional)                         │
│  - Pages and Layouts                                     │
│  - Forms and User Input                                  │
│  - Charts and Visualizations                             │
│  - Navigation                                            │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  Application Layer                       │
│                                                           │
│  - React Context API (state management)                  │
│  - Custom Hooks (business workflows)                     │
│  - Data Import/Export                                    │
│  - Workflow Orchestration                                │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    Domain Layer                          │
│                                                           │
│  - Business Models (TypeScript interfaces)               │
│  - Pure Calculation Functions                            │
│  - Validation Rules                                      │
│  - Business Logic                                        │
│  - **Framework-agnostic**                                │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                 Infrastructure Layer                     │
│                                                           │
│  - LocalStorage Repository                               │
│  - JSON Serialization                                    │
│  - Browser APIs                                          │
│  - Data Schema Management                                │
└─────────────────────────────────────────────────────────┘
```

## Directory Structure

```
plugwise/
├── .kiro/                      # Kiro IDE configuration
│   ├── steering/               # Development steering documents
│   └── specs/                  # Feature specifications
├── docs/                       # Project documentation
│   ├── PlugWise_PRD.md        # Product Requirements Document
│   ├── ARCHITECTURE.md         # This file
│   └── DEVELOPMENT.md          # Development guide
├── src/
│   ├── app/                    # Application layer
│   │   ├── contexts/           # React Context providers
│   │   └── hooks/              # Application-level hooks
│   ├── components/             # Presentation layer
│   │   ├── layout/             # Header, Sidebar, Navigation
│   │   ├── dashboard/          # Dashboard components
│   │   ├── appliances/         # Appliance management UI
│   │   ├── simulator/          # What-if simulator UI
│   │   ├── scenarios/          # Scenario comparison UI
│   │   └── shared/             # Reusable UI components
│   ├── pages/                  # Page-level components
│   ├── domain/                 # Domain layer (pure business logic)
│   │   ├── models/             # TypeScript type definitions
│   │   ├── calculations/       # Pure calculation functions
│   │   └── validation/         # Input validation rules
│   ├── services/               # External service integrations
│   ├── repositories/           # Infrastructure - data access
│   ├── hooks/                  # Shared React hooks
│   ├── lib/                    # Utility functions
│   ├── styles/                 # Global styles and CSS
│   ├── main.tsx                # Application entry point
│   └── App.tsx                 # Root component
├── tests/
│   ├── unit/                   # Unit tests (domain logic)
│   ├── integration/            # Integration tests (components)
│   └── e2e/                    # End-to-end tests (Playwright)
├── dist/                       # Production build output
└── node_modules/               # Dependencies

```

## Key Design Decisions

### 1. Domain Layer Isolation

**Decision:** Keep domain logic completely independent of React and browser APIs.

**Rationale:**
- Enables testing without DOM or React
- Makes calculations portable to other platforms
- Simplifies unit testing
- Improves code reusability

**Implementation:**
- All calculation functions are pure
- No React imports in `src/domain/`
- Domain types use plain TypeScript interfaces
- Calculations return plain objects

### 2. State Management with Context API

**Decision:** Use React Context API instead of external state libraries.

**Rationale:**
- Sufficient for MVP scope
- Reduces bundle size
- Leverages React's built-in capabilities
- Easier to learn for contributors

**Implementation:**
- Separate contexts by domain (Appliances, Settings, Scenarios)
- Custom hooks abstract context consumption
- State updates trigger automatic LocalStorage persistence

### 3. LocalStorage for MVP Persistence

**Decision:** Use browser LocalStorage without backend API.

**Rationale:**
- No server infrastructure required
- Fast MVP iteration
- Zero latency for data operations
- Complete user privacy (data never leaves device)

**Limitations:**
- No multi-device sync
- No collaboration features
- Limited to ~5-10MB storage
- Data loss if browser storage is cleared

**Migration Path:**
- Version schema enables future migrations
- Repository pattern abstracts storage implementation
- Can swap LocalStorage for API without changing domain logic

### 4. TypeScript Strict Mode

**Decision:** Enable all TypeScript strict checks.

**Rationale:**
- Catches errors at compile time
- Improves code maintainability
- Forces explicit null handling
- Better IDE support and refactoring

**Configuration:**
```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noFallthroughCasesInSwitch": true,
  "noUncheckedIndexedAccess": true
}
```

### 5. Path Aliases

**Decision:** Use `@/*` aliases for imports.

**Rationale:**
- Cleaner import statements
- Easier refactoring
- No relative path confusion (`../../..`)

**Configuration:**
```typescript
// vite.config.ts
resolve: {
  alias: {
    '@': resolve(__dirname, './src'),
  }
}
```

## Data Flow

### Appliance Creation Flow

```
User Input (Form)
    ↓
Validation (Domain Layer)
    ↓
ApplianceContext.addAppliance()
    ↓
State Update (React)
    ↓
LocalStorage Sync (Infrastructure)
    ↓
Re-render Components
    ↓
Recalculate Dashboard Totals
```

### Calculation Flow

```
Appliances Array
    ↓
calculateEnergy() for each appliance
    ↓
Sum total energy (kWh)
    ↓
calculateCost(totalEnergy, tariff)
    ↓
Display in Dashboard
```

## Core Domain Models

### Appliance

```typescript
interface Appliance {
  id: string;                 // Unique identifier
  name: string;               // User-provided name
  category: ApplianceCategory; // Predefined category
  powerWatts: number;         // Power rating in watts
  hoursPerDay: number;        // Daily usage hours
  daysPerPeriod: number;      // Days in billing period
  quantity: number;           // Number of units
  description?: string;       // Optional notes
}
```

### ElectricitySettings

```typescript
interface ElectricitySettings {
  tariffPerKwh: number;       // Cost per kilowatt-hour
  currency: string;           // Currency code (e.g., "Rp")
  billingPeriodDays: number;  // Billing cycle length
}
```

### Scenario

```typescript
interface Scenario {
  id: string;
  name: string;
  description: string;
  applianceOverrides: Record<string, Partial<Appliance>>;
  createdAt: Date;
}
```

## Calculation Reference

### Energy Calculation

```typescript
Energy (kWh) = (Power (W) × Hours per day × Days × Quantity) / 1000
```

**Example:**
- AC: 500W, 8 hours/day, 30 days, 1 unit
- Energy = (500 × 8 × 30 × 1) / 1000 = 120 kWh

### Cost Calculation

```typescript
Cost = Energy (kWh) × Tariff per kWh
```

**Example:**
- Energy: 120 kWh
- Tariff: Rp1,500/kWh
- Cost = 120 × 1,500 = Rp180,000

### Scenario Comparison

```typescript
Difference (%) = ((Simulated - Baseline) / Baseline) × 100
```

## Testing Strategy

### Unit Tests (Vitest)

**Target:** Domain layer functions

**Coverage:** 100% for `src/domain/`

**Examples:**
- Energy calculation with reference cases from PRD
- Cost calculation accuracy
- Validation rule enforcement
- Edge case handling (zero, negative, boundary values)

### Integration Tests (React Testing Library)

**Target:** Component interactions with business logic

**Examples:**
- Add appliance → Dashboard updates
- Change tariff → Cost recalculates
- Form validation → Error messages display

### E2E Tests (Playwright)

**Target:** Complete user workflows

**Examples:**
- User adds appliances and sees dashboard update
- User creates scenario and compares savings
- User exports data and reimports successfully
- Data persists across page reloads

## Performance Considerations

### Optimization Strategies

1. **Memoization**
   - Use `useMemo` for expensive calculations
   - Cache dashboard totals until appliances change

2. **Debouncing**
   - Debounce LocalStorage writes (avoid write on every keystroke)
   - Debounce form validation for better UX

3. **Code Splitting**
   - Lazy load pages by route
   - Split chart library into separate chunk

4. **Calculation Efficiency**
   - Pre-calculate only when data changes
   - Avoid redundant computations in render

## Security & Privacy

### Data Security

- No sensitive data transmitted over network
- All calculations happen client-side
- No external API calls for core functionality
- JSON import validation prevents code injection

### Privacy

- No user tracking or analytics required
- No cookies needed
- No personal data collection
- Data remains local by default

## Deployment

### Build Process

```bash
npm run build
```

**Output:** `dist/` directory with optimized static files

### Hosting Requirements

- Static file hosting (no server-side logic)
- HTTPS recommended (but not required for MVP)
- CDN distribution for global access

### Deployment Targets

- **Cloudflare Pages** (recommended)
- Netlify
- Vercel
- GitHub Pages
- Any static web host

## Future Architecture Considerations

### Scalability Path

1. **API Integration**
   - Replace LocalStorage repository with API calls
   - Add authentication layer
   - Enable multi-device sync

2. **Backend Services**
   - User account management
   - Cloud data persistence
   - Shared scenario library

3. **Advanced Features**
   - Real-time collaboration
   - Smart meter integration
   - AI-powered recommendations

### Current Limitations

- **No Backend:** Cannot sync across devices
- **LocalStorage:** Limited to ~5-10MB
- **No Authentication:** Cannot protect user data
- **No Collaboration:** Single-user experience only

## References

- [Product Requirements Document](./PlugWise_PRD.md)
- [Development Guide](./DEVELOPMENT.md)
- [Kiro Steering Documents](../.kiro/steering/)
