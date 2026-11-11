# PlugWise Development Guide

## Quick Start

### Prerequisites

- **Node.js**: 18.x or later
- **npm**: 9.x or later
- **Git**: For version control

### Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd plugwise

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Commands

### Development

```bash
# Start dev server with hot module replacement
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix auto-fixable ESLint issues
npm run lint:fix

# Check code formatting with Prettier
npm run format:check

# Format code with Prettier
npm run format
```

### Testing

```bash
# Run all tests (unit + integration)
npm run test

# Run tests in watch mode
npm run test

# Run tests once (CI mode)
npm run test:run

# Run tests with UI
npm run test:ui

# Run E2E tests with Playwright
npm run test:e2e
```

**Note:** Before running E2E tests for the first time, install Playwright browsers:

```bash
npx playwright install
```

## Project Structure

```
src/
├── app/                 # Application layer
│   ├── contexts/        # React contexts for state management
│   └── hooks/           # Application-level custom hooks
├── components/          # React components (presentation layer)
│   ├── layout/          # Page layout components
│   ├── dashboard/       # Dashboard-specific components
│   ├── appliances/      # Appliance management components
│   ├── simulator/       # What-if simulator components
│   ├── scenarios/       # Scenario comparison components
│   └── shared/          # Reusable UI components
├── pages/               # Top-level page components
├── domain/              # Business logic (framework-agnostic)
│   ├── models/          # TypeScript interfaces and types
│   ├── calculations/    # Pure calculation functions
│   └── validation/      # Input validation rules
├── services/            # External service integrations
├── repositories/        # Data access layer (LocalStorage)
├── hooks/               # Shared React hooks
├── lib/                 # Utility functions
├── styles/              # Global styles
├── main.tsx             # Application entry point
└── App.tsx              # Root component

tests/
├── unit/                # Unit tests for domain logic
├── integration/         # Integration tests for components
└── e2e/                 # End-to-end tests with Playwright
```

## Development Workflow

### 1. Create a New Feature

```bash
# Create a new branch
git checkout -b feature/your-feature-name

# Make changes
# ...

# Run tests
npm run test:run

# Check linting and formatting
npm run lint
npm run format:check
```

### 2. Testing Your Changes

**Unit Tests:** Test domain logic in isolation

```typescript
// tests/unit/calculations.test.ts
import { describe, it, expect } from 'vitest';
import { calculateEnergy } from '@/domain/calculations/energy';

describe('calculateEnergy', () => {
  it('should calculate energy correctly', () => {
    const appliance = {
      powerWatts: 500,
      hoursPerDay: 8,
      daysPerPeriod: 30,
      quantity: 1,
    };
    expect(calculateEnergy(appliance)).toBe(120);
  });
});
```

**Integration Tests:** Test component interactions

```typescript
// tests/integration/ApplianceForm.test.tsx
import { render, screen, userEvent } from '@testing-library/react';
import { ApplianceForm } from '@/components/appliances/ApplianceForm';

it('should submit appliance data', async () => {
  const onSubmit = vi.fn();
  render(<ApplianceForm onSubmit={onSubmit} />);
  
  await userEvent.type(screen.getByLabelText(/name/i), 'AC');
  await userEvent.type(screen.getByLabelText(/power/i), '500');
  await userEvent.click(screen.getByRole('button', { name: /save/i }));
  
  expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
    name: 'AC',
    powerWatts: 500,
  }));
});
```

**E2E Tests:** Test complete user flows

```typescript
// tests/e2e/appliance-flow.spec.ts
import { test, expect } from '@playwright/test';

test('should add appliance and see it in dashboard', async ({ page }) => {
  await page.goto('/');
  
  // Add appliance
  await page.click('button:has-text("Add Appliance")');
  await page.fill('input[name="name"]', 'AC');
  await page.fill('input[name="powerWatts"]', '500');
  await page.click('button:has-text("Save")');
  
  // Verify in dashboard
  await expect(page.locator('text=AC')).toBeVisible();
});
```

### 3. Commit Your Changes

Follow conventional commit format:

```bash
git add .
git commit -m "feat(appliances): add appliance duplication feature"
```

**Commit types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## Code Standards

### TypeScript

- **Strict mode enabled** — No `any` types allowed
- **Explicit return types** for functions
- **Prefer interfaces** over types for object shapes
- **Use type guards** instead of type assertions

```typescript
// ✅ Good
function calculateCost(energy: number, tariff: number): number {
  return energy * tariff;
}

// ❌ Bad
function calculateCost(energy, tariff) {
  return energy * tariff;
}
```

### React Components

- **Function components only** — No class components
- **TypeScript for all components**
- **Props destructuring** in function signature
- **Explicit prop interfaces**

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

// ❌ Bad
export default function({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}
```

### Naming Conventions

- **camelCase** — Variables and functions
- **PascalCase** — Components and types
- **UPPER_SNAKE_CASE** — Constants
- **kebab-case** — File names

```typescript
// Variables and functions
const totalEnergy = calculateTotalEnergy(appliances);

// Components and types
interface ApplianceCardProps { }
function ApplianceCard() { }

// Constants
const MAX_HOURS_PER_DAY = 24;

// Files
// appliance-card.tsx
// energy-calculator.ts
```

### Import Organization

```typescript
// 1. React and external libraries
import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

// 2. Internal absolute imports
import { calculateEnergy } from '@/domain/calculations/energy';
import { Appliance } from '@/domain/models/appliance';

// 3. Relative imports
import { ApplianceCard } from './ApplianceCard';

// 4. Styles
import './styles.css';
```

## Domain Layer Guidelines

The domain layer contains pure business logic and must remain framework-agnostic.

### Rules

1. **No React imports** in `src/domain/`
2. **Pure functions only** — No side effects
3. **No browser APIs** — No window, localStorage, etc.
4. **Framework-agnostic** — Should work in Node.js

### Example

```typescript
// ✅ Good: Pure calculation function
export function calculateEnergy(appliance: ApplianceInput): number {
  const { powerWatts, hoursPerDay, daysPerPeriod, quantity } = appliance;
  return (powerWatts * hoursPerDay * daysPerPeriod * quantity) / 1000;
}

// ❌ Bad: Side effects and React dependency
import { useState } from 'react';

export function calculateEnergy(appliance: ApplianceInput): number {
  const [result, setResult] = useState(0);
  const calc = (appliance.powerWatts * appliance.hoursPerDay) / 1000;
  localStorage.setItem('lastCalc', String(calc));
  return calc;
}
```

## State Management

### Using React Context

```typescript
// 1. Create context and provider
import { createContext, useContext, useState } from 'react';

interface ApplianceContextValue {
  appliances: Appliance[];
  addAppliance: (appliance: Appliance) => void;
  removeAppliance: (id: string) => void;
}

const ApplianceContext = createContext<ApplianceContextValue | undefined>(undefined);

export function ApplianceProvider({ children }: { children: React.ReactNode }) {
  const [appliances, setAppliances] = useState<Appliance[]>([]);

  const addAppliance = (appliance: Appliance) => {
    setAppliances(prev => [...prev, appliance]);
  };

  const removeAppliance = (id: string) => {
    setAppliances(prev => prev.filter(a => a.id !== id));
  };

  return (
    <ApplianceContext.Provider value={{ appliances, addAppliance, removeAppliance }}>
      {children}
    </ApplianceContext.Provider>
  );
}

// 2. Create custom hook for consumption
export function useAppliances() {
  const context = useContext(ApplianceContext);
  if (!context) {
    throw new Error('useAppliances must be used within ApplianceProvider');
  }
  return context;
}

// 3. Use in components
function ApplianceList() {
  const { appliances, removeAppliance } = useAppliances();
  // ...
}
```

## Styling with Tailwind CSS

### Usage

```tsx
// Utility classes
<div className="flex items-center gap-4 p-6 rounded-lg bg-gray-800">
  <Zap className="text-primary" size={24} />
  <h2 className="text-xl font-bold text-white">Energy Usage</h2>
</div>

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Content */}
</div>

// Hover and focus states
<button className="px-4 py-2 bg-primary text-gray-900 rounded-md hover:bg-primary-dark focus:ring-2 focus:ring-primary">
  Save
</button>
```

### Color Palette

- **Primary:** Amber (#f59e0b) — Energy, action
- **Accent:** Blue (#3b82f6) — Highlights, info
- **Background:** Dark gray (#171717)
- **Text:** Light gray (#fafafa)

## Debugging

### Development Tools

```bash
# TypeScript type checking
npx tsc --noEmit

# Check specific file
npx tsc --noEmit src/domain/calculations/energy.ts

# Run single test file
npx vitest tests/unit/energy.test.ts

# Debug test in browser
npm run test:ui
```

### Browser DevTools

- React Developer Tools (Chrome/Firefox extension)
- Redux DevTools (if added later)
- Network tab for API debugging (future)
- Application tab for LocalStorage inspection

### Common Issues

**Issue:** Import path errors

```bash
# Solution: Check path alias configuration in vite.config.ts
# Ensure @ points to ./src
```

**Issue:** TypeScript errors in tests

```bash
# Solution: Check tsconfig.test.json includes test files
# Ensure vitest types are installed
```

**Issue:** Tests failing unexpectedly

```bash
# Solution: Clear test cache
npx vitest run --clearCache
```

## Building for Production

### Build Process

```bash
# Create production build
npm run build

# Output: dist/ directory
# - Minified JavaScript
# - Optimized CSS
# - Asset optimization
# - Source maps (for debugging)
```

### Build Verification

```bash
# Preview production build locally
npm run preview

# Check build size
ls -lh dist/assets/
```

### Deployment

The `dist/` directory contains static files ready for deployment:

```bash
# Example: Deploy to Cloudflare Pages
npx wrangler pages publish dist

# Example: Deploy to Netlify
netlify deploy --prod --dir=dist

# Example: Deploy to Vercel
vercel --prod
```

## Troubleshooting

### Development Server Won't Start

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check port 5173 is available
lsof -i :5173
```

### Build Failures

```bash
# Check TypeScript compilation
npx tsc --noEmit

# Check for ESLint errors
npm run lint

# Clear Vite cache
rm -rf node_modules/.vite
```

### Test Failures

```bash
# Run tests with verbose output
npm run test:run -- --reporter=verbose

# Run specific test file
npm run test:run tests/unit/energy.test.ts

# Update snapshots (if using)
npm run test:run -- -u
```

## Additional Resources

- [Vite Documentation](https://vite.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)

## Getting Help

- Check [Product Requirements Document](./PlugWise_PRD.md)
- Review [Architecture Documentation](./ARCHITECTURE.md)
- Review [Kiro Steering Documents](../.kiro/steering/)
- Open an issue in the project repository

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Ensure all checks pass
6. Submit a pull request

### Pull Request Checklist

- [ ] Tests pass (`npm run test:run`)
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] Code formatted (`npm run format`)
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow convention
