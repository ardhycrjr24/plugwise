# PlugWise Coding Standards

## TypeScript Conventions

### Strict Mode
- **Strict mode must be enabled** in `tsconfig.json`
- No use of `any` type except in truly exceptional cases (must be documented)
- Prefer `unknown` over `any` when type is genuinely unknown
- Use `as const` for literal types and constant objects

### Type Definitions
```typescript
// ✅ Good: Explicit interface definitions
interface Appliance {
  id: string;
  name: string;
  powerWatts: number;
  hoursPerDay: number;
}

// ✅ Good: Type aliases for unions and complex types
type ApplianceCategory = 'Cooling' | 'Computing' | 'Lighting' | 'Kitchen' | 'Entertainment' | 'Other';

// ❌ Bad: Using any
function processData(data: any) { }

// ✅ Good: Using unknown with type guards
function processData(data: unknown) {
  if (isValidData(data)) {
    // Safe to use data here
  }
}
```

### Null Safety
- Use optional chaining `?.` and nullish coalescing `??`
- Prefer `null` over `undefined` for intentionally missing values
- Use optional properties (`property?: type`) for truly optional fields

```typescript
// ✅ Good
const name = appliance?.name ?? 'Unnamed';

// ❌ Bad
const name = appliance && appliance.name ? appliance.name : 'Unnamed';
```

### Type Inference
- Let TypeScript infer types when obvious
- Explicitly type function parameters and return types
- Explicitly type complex objects and public APIs

```typescript
// ✅ Good: Inferred variable type
const count = 5;

// ✅ Good: Explicit function signature
function calculateEnergy(appliance: Appliance): number {
  // implementation
}

// ❌ Bad: Over-annotation
const count: number = 5;
```

## React Component Conventions

### Component Definition
- Use **function components** exclusively
- Use **TypeScript** for all components
- Define prop interfaces with descriptive names

```typescript
// ✅ Good: Function component with typed props
interface ApplianceCardProps {
  appliance: Appliance;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ApplianceCard({ appliance, onEdit, onDelete }: ApplianceCardProps) {
  return (
    // JSX
  );
}

// ❌ Bad: Anonymous arrow function export
export default ({ appliance }: any) => {
  // ...
};
```

### Hooks Usage
- Follow React Hooks rules (use ESLint plugin)
- Custom hooks must start with `use` prefix
- Extract complex logic into custom hooks
- Keep hooks focused on single responsibility

```typescript
// ✅ Good: Custom hook for data fetching
function useAppliances() {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Hook logic
  
  return { appliances, loading, addAppliance, removeAppliance };
}
```

### Component Organization
```typescript
// 1. Imports
import { useState } from 'react';
import { Appliance } from '@/domain/models';

// 2. Types/Interfaces
interface Props {
  // ...
}

// 3. Component
export function MyComponent({ prop }: Props) {
  // 4. Hooks (in consistent order)
  const [state, setState] = useState();
  const context = useContext(SomeContext);
  const { data } = useCustomHook();
  
  // 5. Event handlers
  const handleClick = () => {
    // handler logic
  };
  
  // 6. Render helpers (if needed)
  const renderItem = (item: Item) => {
    // render logic
  };
  
  // 7. Early returns
  if (!data) return <Loading />;
  
  // 8. Main render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Props Destructuring
- Destructure props in function signature
- Use default values for optional props when appropriate

```typescript
// ✅ Good
function Button({ label, onClick, disabled = false }: ButtonProps) {
  // ...
}

// ❌ Bad
function Button(props: ButtonProps) {
  const label = props.label;
  const onClick = props.onClick;
  // ...
}
```

## Naming Conventions

### Variables and Functions
- Use `camelCase` for variables and functions
- Use descriptive names that reveal intent
- Boolean variables should use `is`, `has`, `should` prefix

```typescript
// ✅ Good
const totalEnergyKwh = calculateTotalEnergy(appliances);
const isLoading = true;
const hasError = false;

// ❌ Bad
const total = calc(app);
const loading = true;
const error = false;
```

### Components and Types
- Use `PascalCase` for components and type names
- Component names should be nouns
- Props interfaces should end with `Props`

```typescript
// ✅ Good
interface ApplianceFormProps {
  // ...
}

function ApplianceForm({ }: ApplianceFormProps) {
  // ...
}

// ❌ Bad
interface applianceFormPropsType {
  // ...
}

function appliance_form() {
  // ...
}
```

### Files and Directories
- Use `kebab-case` for file and directory names
- Component files should match component name: `ApplianceCard.tsx`
- Index files for barrel exports: `index.ts`
- Test files should match source: `appliance-card.test.tsx`

```
src/
├── components/
│   ├── appliances/
│   │   ├── ApplianceCard.tsx
│   │   ├── ApplianceForm.tsx
│   │   └── index.ts
│   └── shared/
│       ├── Button.tsx
│       └── Modal.tsx
├── domain/
│   ├── calculations/
│   │   ├── energy.ts
│   │   └── cost.ts
│   └── models/
│       └── appliance.ts
```

### Constants
- Use `UPPER_SNAKE_CASE` for true constants
- Use `camelCase` for configuration objects

```typescript
// ✅ Good
const MAX_HOURS_PER_DAY = 24;
const DEFAULT_TARIFF_PER_KWH = 1500;

const applianceCategories = [
  'Cooling',
  'Computing',
  'Lighting',
] as const;
```

## File Organization

### Directory Structure
```
src/
├── app/                 # Application layer
│   ├── contexts/        # React contexts
│   └── hooks/           # Application-level hooks
├── components/          # UI components
│   ├── layout/          # Layout components
│   ├── dashboard/       # Dashboard components
│   ├── appliances/      # Appliance management
│   ├── simulator/       # What-if simulator
│   ├── scenarios/       # Scenario comparison
│   └── shared/          # Reusable components
├── pages/               # Page-level components
├── domain/              # Business logic
│   ├── models/          # Type definitions
│   ├── calculations/    # Pure calculation functions
│   └── validation/      # Validation rules
├── services/            # External services (if needed)
├── repositories/        # Data access layer
├── hooks/               # Shared React hooks
├── lib/                 # Utility functions
├── styles/              # Global styles
└── main.tsx             # Application entry point

tests/
├── unit/                # Unit tests
├── integration/         # Integration tests
└── e2e/                 # End-to-end tests
```

### Import Organization
1. React and external libraries
2. Internal absolute imports (domain, repositories)
3. Relative imports (local components)
4. Style imports

```typescript
// ✅ Good: Organized imports
import { useState, useEffect } from 'react';
import { Zap, TrendingUp } from 'lucide-react';

import { calculateEnergy } from '@/domain/calculations/energy';
import { Appliance } from '@/domain/models/appliance';
import { useAppliances } from '@/app/hooks/use-appliances';

import { ApplianceCard } from './ApplianceCard';
import { ApplianceForm } from './ApplianceForm';

import './appliances.css';
```

### Path Aliases
Configure TypeScript path aliases for cleaner imports:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

// Usage
import { calculateEnergy } from '@/domain/calculations/energy';
```

## Error Handling

### Validation Errors
- Return validation results as objects, not exceptions
- Provide user-friendly error messages

```typescript
// ✅ Good: Validation result pattern
interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

function validateAppliance(appliance: Partial<Appliance>): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (!appliance.name?.trim()) {
    errors.name = 'Appliance name is required';
  }
  
  if (!appliance.powerWatts || appliance.powerWatts <= 0) {
    errors.powerWatts = 'Power rating must be greater than zero';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
```

### Error Boundaries
- Use React Error Boundaries for component errors
- Provide fallback UI and recovery options

```typescript
// ✅ Good: Error boundary with fallback
class ErrorBoundary extends Component<Props, State> {
  // Error boundary implementation
  render() {
    if (this.state.hasError) {
      return <ErrorFallback onReset={this.resetError} />;
    }
    return this.props.children;
  }
}
```

### Try-Catch Usage
- Use try-catch for external operations (LocalStorage, JSON parsing)
- Log errors for debugging
- Provide user feedback

```typescript
// ✅ Good: Error handling for localStorage
function saveToLocalStorage(key: string, data: unknown): boolean {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    return false;
  }
}
```

## Validation Rules

### Input Validation
- Validate at form level before submission
- Validate at domain level before calculations
- Provide immediate feedback for invalid inputs

### Specific Rules from PRD
```typescript
// Appliance validation
- name: non-empty string
- powerWatts: number > 0
- hoursPerDay: 0 < number ≤ 24
- daysPerPeriod: 1 ≤ integer ≤ billingPeriodDays
- quantity: positive integer

// Settings validation
- tariffPerKwh: number ≥ 0
- billingPeriodDays: positive integer
- currency: non-empty string
```

## Testing Expectations

### Unit Tests
- Test all calculation functions with reference cases from PRD
- Test validation logic with edge cases
- Test utility functions independently
- Target 100% coverage for domain layer

```typescript
// ✅ Good: Comprehensive calculation test
describe('calculateEnergy', () => {
  it('should calculate energy correctly for AC', () => {
    const appliance: Appliance = {
      id: '1',
      name: 'AC',
      category: 'Cooling',
      powerWatts: 500,
      hoursPerDay: 8,
      daysPerPeriod: 30,
      quantity: 1,
    };
    
    expect(calculateEnergy(appliance)).toBe(120); // kWh
  });
  
  it('should handle multiple quantities', () => {
    // ...
  });
  
  it('should handle fractional hours', () => {
    // ...
  });
});
```

### Integration Tests
- Test component interactions
- Test state management flows
- Verify data persistence

```typescript
// ✅ Good: Integration test
it('should add appliance and update dashboard', async () => {
  render(<App />);
  
  const addButton = screen.getByRole('button', { name: /add appliance/i });
  await userEvent.click(addButton);
  
  // Fill form
  await userEvent.type(screen.getByLabelText(/name/i), 'AC');
  await userEvent.type(screen.getByLabelText(/power/i), '500');
  
  // Submit
  await userEvent.click(screen.getByRole('button', { name: /save/i }));
  
  // Verify dashboard updates
  expect(screen.getByText(/total: 120 kWh/i)).toBeInTheDocument();
});
```

### E2E Tests
- Test complete user workflows
- Verify persistence across reloads
- Test critical paths end-to-end

## Accessibility Expectations

### Semantic HTML
- Use semantic elements (`button`, `nav`, `main`, `article`)
- Avoid `div` and `span` soup

### ARIA Labels
- Provide `aria-label` for icon-only buttons
- Use `aria-describedby` for form help text
- Use `role` attributes when semantic HTML isn't sufficient

```tsx
// ✅ Good: Accessible button
<button
  onClick={onDelete}
  aria-label="Delete appliance"
  className="icon-button"
>
  <Trash2 size={16} />
</button>
```

### Keyboard Navigation
- Ensure all interactive elements are keyboard accessible
- Manage focus for modals and dialogs
- Provide visible focus indicators

### Color Contrast
- Ensure WCAG AA contrast ratios (4.5:1 for normal text)
- Don't rely solely on color to convey information
- Test with dark and light themes

## Code Quality Rules

### DRY (Don't Repeat Yourself)
- Extract repeated logic into functions or hooks
- Use configuration objects for repeated patterns
- Create reusable components

### SOLID Principles (Adapted for React)
- **Single Responsibility:** Each function/component has one purpose
- **Open/Closed:** Components open for extension via props
- **Dependency Inversion:** Depend on abstractions (interfaces), not concretions

### Code Comments
- Write self-documenting code (descriptive names)
- Comment "why" not "what"
- Document complex algorithms
- Use JSDoc for public APIs

```typescript
// ❌ Bad: Obvious comment
// Increment counter
count++;

// ✅ Good: Explains why
// Reset to 1 instead of 0 because billing periods start at day 1
const billingDay = (currentDay % billingPeriodDays) + 1;

/**
 * Calculates estimated energy consumption for an appliance.
 * 
 * Formula: Energy (kWh) = (Power (W) × Hours per day × Days × Quantity) / 1000
 * 
 * @param appliance - The appliance to calculate energy for
 * @returns Energy consumption in kilowatt-hours (kWh)
 */
export function calculateEnergy(appliance: Appliance): number {
  // implementation
}
```

### Code Formatting
- Use Prettier for automatic formatting
- Configure ESLint for consistent style
- Run formatters before committing

### Performance
- Use `React.memo` for expensive pure components
- Use `useMemo` for expensive calculations
- Use `useCallback` for stable function references
- Avoid premature optimization

```typescript
// ✅ Good: Memoized expensive calculation
const totalEnergy = useMemo(
  () => calculateTotalEnergy(appliances),
  [appliances]
);
```

## Git Commit Conventions

Use conventional commit format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(appliances): add appliance duplication feature

fix(calculations): correct energy calculation for fractional hours

test(domain): add reference case tests from PRD

docs(readme): update installation instructions
```

## Code Review Checklist

### Before Submitting
- [ ] All tests pass
- [ ] TypeScript compiles without errors
- [ ] ESLint passes with no warnings
- [ ] Prettier formatting applied
- [ ] No console.log statements (use proper logging)
- [ ] Accessibility requirements met
- [ ] Performance considerations addressed

### During Review
- [ ] Code follows established patterns
- [ ] Naming is clear and consistent
- [ ] Logic is well-tested
- [ ] Edge cases are handled
- [ ] Error handling is appropriate
- [ ] Documentation is updated

## Anti-Patterns to Avoid

### React Anti-Patterns
- ❌ Mutating state directly
- ❌ Using index as key in lists
- ❌ Overusing useEffect
- ❌ Prop drilling (use Context instead)
- ❌ Massive components (break them down)

### TypeScript Anti-Patterns
- ❌ Using `any` type
- ❌ Type assertions (`as`) without justification
- ❌ Ignoring TypeScript errors with `@ts-ignore`
- ❌ Over-complex generic types

### General Anti-Patterns
- ❌ Magic numbers (use named constants)
- ❌ Deeply nested conditionals
- ❌ God objects/components
- ❌ Premature abstraction
- ❌ Ignoring error cases
