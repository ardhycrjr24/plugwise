# PlugWise

**Understand your energy. Control your costs.**

PlugWise is a lightweight electricity consumption calculator and scenario simulator that helps users understand how household appliances contribute to estimated electricity consumption and costs.

![Phase 0: Foundation Complete](https://img.shields.io/badge/Phase-0%3A%20Foundation-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-19.0-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)

## ✨ Features

- 📊 **Appliance Management** — Track energy consumption for individual appliances
- 💰 **Cost Estimation** — Calculate estimated electricity costs with configurable tariffs
- 🔄 **What-if Simulator** — Test alternative usage scenarios without changing baseline data
- 📈 **Data Visualization** — View consumption patterns through interactive charts
- 💾 **Local Persistence** — All data stored locally in your browser
- 📤 **Import/Export** — Back up and restore your appliance data

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd plugwise

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📖 Documentation

- [Product Requirements Document](docs/PlugWise_PRD.md)
- [Architecture Documentation](docs/ARCHITECTURE.md)
- [Development Guide](docs/DEVELOPMENT.md)

## 🛠️ Technology Stack

- **React 19** — UI framework
- **TypeScript 5.6** — Type-safe development
- **Vite** — Fast build tool
- **Tailwind CSS** — Utility-first styling
- **Lucide React** — Icon library
- **Recharts** — Data visualization
- **Vitest** — Unit testing
- **Playwright** — E2E testing

## 📁 Project Structure

```
plugwise/
├── src/
│   ├── app/              # Application layer (contexts, hooks)
│   ├── components/       # React components
│   ├── domain/           # Business logic (calculations, validation)
│   ├── repositories/     # Data access layer
│   └── styles/           # Global styles
├── tests/
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # End-to-end tests
└── docs/                 # Documentation
```

## 🧪 Testing

```bash
# Run all tests
npm run test:run

# Run tests in watch mode
npm test

# Run E2E tests
npm run test:e2e

# Run with coverage
npm run test -- --coverage
```

## 🏗️ Building

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📝 Development Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# Testing
npm test                 # Run tests in watch mode
npm run test:run         # Run tests once
npm run test:ui          # Open Vitest UI
npm run test:e2e         # Run Playwright E2E tests
```

## 🎯 MVP Scope

### Included in Phase 1+
- ✅ Appliance CRUD operations
- ✅ Energy consumption calculations
- ✅ Cost estimation with configurable tariff
- ✅ What-if scenario simulator
- ✅ Data visualization charts
- ✅ Local data persistence
- ✅ JSON import/export

### Explicitly Not Included
- ❌ Smart meter integration
- ❌ IoT device connectivity
- ❌ User authentication
- ❌ Cloud synchronization
- ❌ AI recommendations
- ❌ Real-time monitoring

## 🔐 Privacy & Security

- **No data tracking** — Your usage data stays private
- **Local storage only** — Data never leaves your browser
- **No cookies required** — No tracking mechanisms
- **No accounts needed** — Use immediately without registration

## 📊 Calculation Reference

### Energy Calculation
```
Energy (kWh) = (Power (W) × Hours per day × Days × Quantity) / 1000
```

**Example:**
- AC: 500W, 8 hours/day, 30 days
- Energy = (500 × 8 × 30) / 1000 = **120 kWh**

### Cost Calculation
```
Cost = Energy (kWh) × Tariff per kWh
```

**Example:**
- Energy: 120 kWh
- Tariff: Rp1,500/kWh
- Cost = 120 × 1,500 = **Rp180,000**

## 🤝 Contributing

Contributions are welcome! Please read the [Development Guide](docs/DEVELOPMENT.md) before submitting pull requests.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm run test:run`)
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🏆 Acknowledgments

- Built with [Kiro IDE](https://kiro.dev) for Kiroween 2026 Hackathon
- Category: Frankenstein
- Created from scratch during the hackathon period

## 📞 Support

- 📧 Open an issue for bug reports
- 💡 Open an issue for feature requests
- 📖 Check documentation for usage guides

## 🗺️ Roadmap

### Phase 0: Foundation ✅
- Project initialization
- Core architecture
- Development environment

### Phase 1: Core Features (Upcoming)
- Appliance management
- Basic calculations
- Dashboard implementation

### Phase 2: Advanced Features (Future)
- What-if simulator
- Scenario comparison
- Data import/export

### Phase 3: Polish (Future)
- UI/UX improvements
- Advanced visualizations
- Performance optimization

---

**Made with ⚡ by the PlugWise Team**
