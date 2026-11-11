# PlugWise Architecture Steering

## Technology Stack

### Core Technologies
- **React 19** — UI framework
- **TypeScript 5.6** — Type-safe development with strict mode enabled
- **Vite** — Build tool and development server
- **Tailwind CSS** — Utility-first CSS framework

### UI & Visualization
- **Lucide React** — Icon library
- **Recharts** — Chart and data visualization library

### Code Quality & Testing
- **ESLint** — Code linting with TypeScript and React plugins
- **Prettier** — Code formatting
- **Vitest** — Unit and integration testing
- **React Testing Library** — Component testing
- **Playwright** — End-to-end testing

### Data Persistence
- **LocalStorage** — Browser-based persistence for MVP
- Versioned application data schema for future migrations

### Deployment
- **Static Hosting** — Cloudflare Pages or similar platform
- No backend or API server required for core functionality

## Application Architecture

PlugWise follows a **layered frontend architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                  Presentation Layer                      │
│  (Pages, Components, Forms, Charts, Navigation)          │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  Application Layer                       │
│  (Workflows, Orchestration, Import/Export)               │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    Domain Layer                          │
│  (Models, Calculations, Validation, Business Rules)      │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                 Infrastructure Layer                     │
│  (LocalStorage, JSON I/O, Browser APIs)                  │
└─────────────────────────────────────────────────────────┘
```

## Layer Responsibilities

### 1. Presentation Layer (`src/components/`, `src/pages/`)

**Responsibilities:**
- Render UI components
- Handle user interactions
- Display forms and validation messages
- Render charts and visualizations
- Manage navigation
- Provide user feedback

**Rules:**
- Components should be presentational where possible
- Use React hooks for local UI state
- Delegate business logic to application or domain layers
- No direct manipulation of business calculations
- No direct access to persistence layer

**Structure:**
```
src/components/
├── layout/         # Header, sidebar, navigation
├── dashboard/      # Dashboard-specific components
├── appliances/     # Appliance management components
├── simulator/      # What-if simulator components
├── scenarios/      # Scenario comparison components
└── shared/         # Reusable UI components (buttons, cards, modals)
```

### 2. Application Layer (`src/app/`)

**Responsibilities:**
- Orchestrate workflows (add appliance, create scenario, export data)
- Coordinate between domain and infrastructure layers
- Manage application state
- Handle data import/export operations
- Control navigation and routing logic

**Rules:**
- No UI rendering logic
- No direct DOM manipulation
- Delegate calculations to domain layer
- Delegate persistence to repositories
- Validate user workflows

### 3. Domain Layer (`src/domain/`)

**Responsibilities:**
- Define core business entities (Appliance, ElectricitySettings, Scenario)
- Implement calculation logic (energy, cost, comparisons)
- Enforce validation rules
- Define business constraints
- Implement scenario comparison algorithms

**Rules:**
- **Zero dependencies on React or browser APIs**
- Pure functions for all calculations
- All calculation logic must be testable independently
- No persistence logic
- No UI concerns

**Structure:**
```
src/domain/
├── models/         # TypeScript interfaces and types
├── calculations/   # Energy and cost calculation functions
└── validation/     # Input validation rules
```

**Key Principle:** Domain logic must be framework-agnostic. All calculations should work in Node.js, browsers, or any JavaScript environment.

### 4. Infrastructure Layer (`src/repositories/`, `src/services/`)

**Responsibilities:**
- Persist and retrieve data from LocalStorage
- Handle JSON import/export
- Manage browser APIs
- Handle data schema migrations
- Provide data access interfaces

**Rules:**
- Implement repository pattern for data access
- Hide persistence implementation details
- Handle serialization/deserialization
- Validate imported data structure
- Manage data schema versioning

## State Management Strategy

### Local Component State
- Use React `useState` for UI-only state (form inputs, modal visibility, loading states)
- Keep state as close to where it's used as possible

### Application State
- Use React Context for shared application state (appliances, settings, scenarios)
- Separate contexts for different domains:
  - `ApplianceContext` — Appliance CRUD operations
  - `SettingsContext` — Electricity tariff and billing period
  - `ScenarioContext` — Scenario management and comparison

### State Persistence
- Automatically sync context state to LocalStorage
- Use custom hooks to abstract persistence logic
- Implement debouncing for frequent updates

## LocalStorage Persistence Strategy

### Data Schema
```typescript
{
  version: "1.0",
  appliances: Appliance[],
  settings: ElectricitySettings,
  scenarios: Scenario[],
  lastModified: string
}
```

### Key Design Decisions
1. **Versioning:** Include schema version for future migrations
2. **Validation:** Validate all data read from LocalStorage
3. **Error Handling:** Gracefully handle corrupted or missing data
4. **Atomicity:** Save complete snapshots, not incremental updates
5. **Backup:** Support export before destructive operations

## Calculation Engine Separation

### Design Principle
All business calculations must be **pure functions** separate from React components.

### Calculation Modules
```typescript
// src/domain/calculations/energy.ts
export function calculateEnergy(appliance: Appliance): number

// src/domain/calculations/cost.ts
export function calculateCost(energyKwh: number, tariff: number): number

// src/domain/calculations/scenario.ts
export function compareScenarios(
  baseline: Appliance[], 
  scenario: Appliance[], 
  tariff: number
): ComparisonResult
```

### Testing Strategy
- Test calculations independently from UI
- Verify against reference cases from PRD
- Test boundary conditions and edge cases
- Ensure precision and rounding consistency

## Testing Architecture

### Unit Tests (Vitest)
- Test all domain calculation functions
- Test validation rules
- Test utility functions
- **Coverage target:** 100% for domain layer

### Integration Tests (Vitest + React Testing Library)
- Test component interactions with domain logic
- Test state management flows
- Test data persistence workflows
- Verify end-to-end user workflows in memory

### End-to-End Tests (Playwright)
- Test complete user journeys
- Verify persistence across page reloads
- Test import/export functionality
- Validate responsive behavior

## Design Patterns

### Repository Pattern
Abstract data access behind repository interfaces:
```typescript
interface ApplianceRepository {
  getAll(): Appliance[]
  getById(id: string): Appliance | undefined
  save(appliance: Appliance): void
  delete(id: string): void
}
```

### Factory Pattern
Use factories for creating domain objects with defaults:
```typescript
function createAppliance(data: Partial<Appliance>): Appliance
function createScenario(name: string, appliances: Appliance[]): Scenario
```

### Observer Pattern (via React Context)
Observers (components) react to state changes in contexts without tight coupling.

## Performance Considerations

### Optimization Strategies
1. **Memoization:** Use `useMemo` for expensive calculations
2. **Debouncing:** Debounce LocalStorage writes
3. **Lazy Loading:** Code split by route
4. **Virtual Scrolling:** For large appliance lists (if needed)

### Calculation Efficiency
- Pre-calculate totals only when data changes
- Cache calculation results per render cycle
- Avoid recalculating unchanged data

## Security & Privacy

### Data Security
- No sensitive data leaves the browser
- No external API calls for core functionality
- Validate all imported JSON before processing
- Sanitize user inputs

### Privacy
- No user tracking or analytics required
- No cookies needed
- No personal data collection
- User data remains local by default

## Error Handling Strategy

### Error Categories
1. **User Input Errors:** Validation feedback in forms
2. **Calculation Errors:** Should never occur with proper validation
3. **Persistence Errors:** Fallback to in-memory state
4. **Import Errors:** Clear error messages with recovery options

### Error Boundaries
- Implement React Error Boundaries for component failures
- Graceful degradation for missing features
- User-friendly error messages
- Log errors for debugging (console only, no external logging)

## Accessibility

### Requirements
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus management for modals and forms
- Color contrast compliance (WCAG AA minimum)
- Screen reader friendly

## Browser Compatibility

### Target Browsers
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

### Polyfills
- Vite handles most modern JavaScript features
- LocalStorage is universally supported
- No special polyfills required for MVP

## Deployment Architecture

### Build Process
1. TypeScript compilation with strict checks
2. Vite production build with optimization
3. Asset bundling and code splitting
4. Static file generation

### Deployment Target
- Static file hosting (Cloudflare Pages, Netlify, Vercel, or similar)
- No server-side rendering required
- No backend API needed
- CDN distribution for global access

### Environment Configuration
- No environment variables needed for MVP
- All configuration is user-controlled in-app
- Build-time configuration only for build optimization

## Future Architecture Considerations

### Scalability
- Current architecture supports transition to:
  - Cloud persistence (API integration)
  - User authentication
  - Multi-device sync
  - Server-side calculations

### Extensibility
- Plugin architecture for future features
- API abstraction for backend integration
- Modular component structure for feature additions

## Architectural Constraints

### Must Not
- Introduce a backend server in MVP
- Use a global state management library (Redux, Zustand) unless proven necessary
- Add unnecessary abstractions or over-engineering
- Create circular dependencies between layers
- Mix business logic with UI rendering

### Must
- Keep domain layer pure and testable
- Maintain clear layer boundaries
- Write calculations as pure functions
- Test all critical calculation paths
- Document architectural decisions
- Follow React and TypeScript best practices
