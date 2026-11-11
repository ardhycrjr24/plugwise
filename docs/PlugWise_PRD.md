# PlugWise --- Product Requirements Document (PRD)

**Project:** PlugWise\
**Tagline:** Understand your energy. Control your costs.\
**Hackathon:** Kiroween 2026\
**Proposed category:** Frankenstein\
**Product type:** Responsive web application\
**Development environment:** Kiro IDE\
**Document version:** 1.0\
**Status:** Initial product specification

------------------------------------------------------------------------

## 1. Product Overview

PlugWise is a lightweight electricity consumption calculator and
scenario simulator. It helps users understand how household appliances
contribute to estimated electricity consumption and costs.

Users can register appliances, enter power ratings and usage schedules,
calculate estimated energy consumption, and compare alternative usage
scenarios.

PlugWise combines four capabilities:

1.  Appliance-based electricity calculation.
2.  Electricity cost estimation.
3.  What-if usage simulation.
4.  Energy consumption analysis and visualization.

The MVP works locally in the browser and does not require smart meters,
IoT devices, user accounts, or external APIs.

## 2. Problem Statement

Many electricity users see their electricity bill but do not understand
which appliances contribute most to their consumption.

Common difficulties include:

-   Understanding the difference between watts (W) and kilowatt-hours
    (kWh).
-   Estimating the monthly energy use of individual appliances.
-   Estimating the cost associated with an appliance's usage.
-   Comparing the impact of different usage schedules.
-   Identifying which appliances have the greatest estimated
    contribution to total consumption.

PlugWise addresses these problems through transparent calculations and
interactive simulations.

## 3. Product Goals

### 3.1 Primary Goals

-   Calculate estimated electricity consumption per appliance.
-   Calculate estimated electricity costs using a user-configurable
    tariff.
-   Visualize appliance consumption and cost distribution.
-   Allow users to simulate alternative usage schedules without changing
    their original data.
-   Help users understand the estimated impact of usage changes.

### 3.2 Non-Goals

The MVP will not:

-   Measure actual electrical consumption.
-   Connect to smart meters or IoT devices.
-   Access electricity provider accounts.
-   Predict an official electricity bill.
-   Control electrical appliances.
-   Guarantee or claim actual electricity savings.
-   Require user registration or cloud infrastructure.

All results must be described as estimates based on user-provided
inputs.

## 4. Target Users

### Primary Users

-   Household electricity users.
-   Students living in rented rooms or boarding houses.
-   Remote workers.
-   People interested in understanding and managing electricity costs.

### User Personas

**Persona A --- Household User**\
Wants to identify which household appliances contribute most to
estimated electricity consumption.

**Persona B --- Student or Renter**\
Wants to estimate electricity expenses for appliances used in a rented
room.

**Persona C --- Remote Worker**\
Wants to estimate the electricity cost of computers, monitors, air
conditioners, and other work equipment.

## 5. Core Features

### 5.1 Appliance Manager

Users can add and manage electrical appliances.

**Fields:**

-   Appliance name.
-   Appliance category.
-   Power rating in watts (W).
-   Daily usage duration in hours.
-   Usage days per billing period.
-   Quantity.
-   Optional description.

**Operations:**

-   Add appliance.
-   Edit appliance.
-   Delete appliance.
-   Duplicate appliance.
-   View individual consumption and estimated cost.

**Initial categories:**

-   Cooling.
-   Computing.
-   Lighting.
-   Kitchen.
-   Entertainment.
-   Other.

### 5.2 Electricity Calculator

The application calculates estimated energy consumption using:

`Energy (kWh) = (Power (W) × Hours per day × Days × Quantity) / 1000`

Estimated cost:

`Estimated cost = Energy (kWh) × Tariff per kWh`

The tariff must be configurable by the user. Any prefilled tariff must
be clearly identified as an example, not as a universal or officially
verified tariff.

### 5.3 Dashboard

The dashboard displays:

-   Total estimated consumption for the selected billing period.
-   Total estimated electricity cost.
-   Number of registered appliances.
-   Highest-consuming appliance.
-   Consumption distribution by category.
-   Appliance consumption ranking.

Charts should include:

-   Energy consumption by appliance.
-   Estimated cost distribution.
-   Category comparison.

### 5.4 What-if Simulator

The What-if Simulator is the signature feature of PlugWise.

Users can change appliance usage assumptions in a separate scenario
without modifying the original appliance records.

Example:

-   Original AC usage: 8 hours per day.
-   Simulated AC usage: 4 hours per day.
-   Compare estimated kWh and cost before and after the change.

The simulator displays:

-   Baseline consumption.
-   Simulated consumption.
-   Energy difference in kWh.
-   Baseline estimated cost.
-   Simulated estimated cost.
-   Estimated cost difference.
-   Percentage change, where mathematically meaningful.

Simulation results must be calculated from the actual inputs in the
application. They must not be hardcoded.

### 5.5 Scenario Comparison

Users can compare a baseline against one or more alternative usage
scenarios.

The MVP should support:

-   Creating a scenario from current appliance data.
-   Changing usage values within the scenario.
-   Comparing baseline and scenario totals.
-   Showing energy and estimated cost differences.
-   Naming and deleting saved scenarios.

The UI must clearly distinguish estimated savings from actual realized
savings.

### 5.6 Data Management

MVP data management includes:

-   Automatic local persistence.
-   Export appliance and scenario data to JSON.
-   Import previously exported JSON.
-   Reset local demo data.

No account registration is required.

## 6. MVP Scope

The MVP must include:

1.  Responsive dashboard.
2.  Appliance CRUD operations.
3.  Configurable electricity tariff.
4.  Electricity consumption calculation.
5.  Estimated cost calculation.
6.  What-if simulator.
7.  Scenario comparison.
8.  Consumption charts.
9.  Local persistence.
10. JSON import and export.
11. Automated tests.

### Excluded from MVP

-   AI recommendations.
-   Smart meter integration.
-   IoT integrations.
-   User authentication.
-   Cloud synchronization.
-   Multi-user support.
-   Native mobile applications.
-   Real-time electricity monitoring.
-   Official utility billing integrations.

## 7. Technology Stack

### Frontend

-   React.
-   TypeScript with strict mode.
-   Vite.
-   Tailwind CSS.
-   Lucide React icons.

### Visualization

-   Recharts.

### Data Persistence

-   Browser LocalStorage for the MVP.
-   Versioned application data schema.

### Testing

-   Vitest.
-   React Testing Library.
-   Playwright.

### Code Quality

-   ESLint.
-   Prettier.
-   TypeScript strict mode.

### Deployment

-   Cloudflare Pages or another static web hosting platform.

The core application must work without an external API.

## 8. Architecture

Use a modular frontend architecture with clear separation between
presentation, application logic, domain calculations, and
infrastructure.

### 8.1 Presentation Layer

Responsible for:

-   Pages.
-   UI components.
-   Forms.
-   Charts.
-   Navigation.
-   User feedback and validation messages.

### 8.2 Application Layer

Responsible for:

-   Appliance management workflows.
-   Calculation orchestration.
-   Scenario creation and comparison.
-   Data import and export.

### 8.3 Domain Layer

Responsible for:

-   Appliance model.
-   Electricity settings and tariff.
-   Energy consumption calculations.
-   Cost calculations.
-   Scenario comparison rules.
-   Input validation rules.

### 8.4 Infrastructure Layer

Responsible for:

-   LocalStorage repository.
-   JSON import and export.
-   Browser persistence.

Business calculations must be independent of React components and
browser storage.

## 9. Data Model

### 9.1 Appliance

-   `id`: string
-   `name`: string
-   `category`: string
-   `powerWatts`: number
-   `hoursPerDay`: number
-   `daysPerPeriod`: number
-   `quantity`: number
-   `description`: optional string

### 9.2 ElectricitySettings

-   `tariffPerKwh`: number
-   `currency`: string
-   `billingPeriodDays`: number

### 9.3 Scenario

-   `id`: string
-   `name`: string
-   `description`: string
-   `applianceOverrides`: object keyed by appliance ID
-   `createdAt`: date/time

### 9.4 CalculationResult

-   `totalEnergyKwh`: number
-   `estimatedCost`: number
-   `baselineEnergyKwh`: optional number
-   `energyDifferenceKwh`: optional number
-   `baselineEstimatedCost`: optional number
-   `costDifference`: optional number
-   `percentageDifference`: optional number

## 10. Calculation Requirements and Reference Cases

All calculations must use consistent units and sufficient internal
precision. Rounding should occur for display, not prematurely during
intermediate calculations.

### 10.1 Energy Formula

`Energy (kWh) = (Power (W) × Hours per day × Days × Quantity) / 1000`

### 10.2 Estimated Cost Formula

`Estimated cost = Energy (kWh) × Tariff per kWh`

### 10.3 Reference Scenario

Assume a 30-day billing period and a sample tariff of Rp1,500/kWh.

  Appliance     Power   Hours/day   Days          Energy
  ----------- ------- ----------- ------ ---------------
  AC            500 W           8     30         120 kWh
  Laptop         65 W           8     30        15.6 kWh
  LED lamp       10 W          10     30           3 kWh
  **Total**                                **138.6 kWh**

Estimated cost:

`138.6 × Rp1,500 = Rp207,900`

### 10.4 What-if Reference Scenario

Change AC usage from 8 hours/day to 4 hours/day.

-   Original AC consumption: 120 kWh/month.
-   Simulated AC consumption: 60 kWh/month.
-   Energy difference: 60 kWh/month.
-   Estimated cost difference: Rp90,000/month.
-   New total consumption: 78.6 kWh/month.
-   New estimated total cost: Rp117,900/month.

These reference values must be covered by automated tests.

## 11. Validation Rules

-   Appliance name cannot be empty.
-   Power rating must be greater than zero.
-   Daily usage must be greater than zero and no more than 24 hours.
-   Usage days must be an integer between 1 and the configured billing
    period limit.
-   Quantity must be a positive integer.
-   Electricity tariff cannot be negative.
-   Currency must be selected from supported display options.
-   Invalid imported JSON must be rejected with an understandable error.
-   Duplicate IDs must be handled safely during import.
-   Invalid values must never silently produce misleading results.

The application should explain that actual appliance power draw may vary
from the nominal rating, especially for appliances with variable loads
or thermostatic operation.

## 12. User Interface Direction

### Design Principles

-   Modern energy analytics dashboard.
-   Dark-first visual theme.
-   Professional and minimal interface.
-   Electric amber and blue accent colors.
-   Clear typography and hierarchy.
-   Responsive desktop and mobile layouts.
-   Accessible color contrast.
-   Avoid decorative complexity that obscures the calculations.

### Primary Navigation

1.  Dashboard.
2.  Appliances.
3.  Simulator.
4.  Scenarios.
5.  Settings.

### Dashboard Sections

-   Summary cards.
-   Consumption overview.
-   Highest energy consumers.
-   Cost breakdown.
-   Quick simulation action.

## 13. Performance and Reliability

-   Core calculations must run locally.
-   No external API is required for core functionality.
-   User data must survive browser refresh.
-   Dashboard and charts must update when source data changes.
-   Invalid imported data must not corrupt existing records.
-   The application must work in modern desktop and mobile browsers.
-   The application should remain usable with a practical household
    appliance dataset.

## 14. Security and Privacy

-   No account credentials are required.
-   No personal data collection is required.
-   No mandatory analytics.
-   User data is stored locally by default.
-   Imported JSON must be validated before persistence.
-   Error messages and logs must not expose unnecessary user data.
-   The application must not claim that local data is backed up
    remotely.

## 15. Testing Strategy

### 15.1 Unit Tests

Test:

-   Energy calculation.
-   Cost calculation.
-   Quantity handling.
-   Scenario overrides.
-   Scenario comparison.
-   Percentage difference.
-   Input validation.
-   Rounding and display formatting.

### 15.2 Integration Tests

Test:

-   Add appliance and verify dashboard totals.
-   Edit appliance and verify recalculation.
-   Delete appliance and verify totals.
-   Change tariff and verify estimated cost.
-   Simulate usage and verify comparison.
-   Export and import data.
-   Reload application and verify persistence.

### 15.3 End-to-End Tests

Test the complete workflow:

1.  Open the application.
2.  Add appliances.
3.  Configure tariff.
4.  View dashboard.
5.  Open What-if Simulator.
6.  Change appliance usage.
7.  Verify updated results.
8.  Save and compare a scenario.
9.  Reload and verify persisted data.

### 15.4 Boundary and Error Tests

Test:

-   Zero and negative values.
-   Empty fields.
-   Daily usage above 24 hours.
-   Invalid JSON.
-   Missing imported fields.
-   Duplicate IDs.
-   Very large but valid appliance values.

## 16. Acceptance Criteria

The MVP is complete when:

-   Users can create, edit, and delete appliances.
-   Users can configure an electricity tariff.
-   Consumption calculations match the reference cases.
-   Estimated costs match the reference cases.
-   Dashboard values update correctly.
-   What-if simulation works without changing baseline data.
-   Scenario comparison works.
-   Local persistence works.
-   JSON import and export work safely.
-   Critical automated tests pass.
-   The production build succeeds.
-   The deployed application is publicly accessible.
-   Documentation and demo materials are complete.

## 17. Kiro Development Strategy

Kiro IDE is the primary development environment for this project.

Required Kiro artifacts:

-   `.kiro/steering/`
-   `.kiro/specs/plugwise/`
-   `.kiro/hooks/` where useful.

### Steering Documents

-   `product.md`
-   `architecture.md`
-   `coding-standards.md`

### Spec Documents

-   `requirements.md`
-   `design.md`
-   `tasks.md`

### Development Workflow

1.  Define and review requirements.
2.  Review architecture and design.
3.  Generate implementation tasks.
4.  Approve tasks in manageable batches.
5.  Implement through Kiro.
6.  Run automated tests.
7.  Review generated changes.
8.  Update documentation.

Do not claim to have used a Kiro feature that was not actually used.
Keep the Kiro project artifacts and relevant development history in the
public repository.

## 18. Demo Strategy

The demo must communicate one clear story:

"Most people do not know how much electricity their everyday appliances
consume. PlugWise makes those costs visible and lets users explore
alternative usage scenarios."

### Demonstration Sequence

1.  Introduce the problem.
2.  Open PlugWise.
3.  Add an AC, laptop, and LED lamp.
4.  Display monthly consumption and estimated cost.
5.  Open What-if Simulator.
6.  Reduce AC usage from 8 to 4 hours/day.
7.  Show the difference in estimated consumption and cost.
8.  Conclude with the practical benefit.

The demo must use the actual working application and real calculations.
Do not use fabricated UI results or mockups as evidence of working
functionality.

## 19. Hackathon Submission Strategy

**Target category:** Frankenstein (subject to final confirmation against
the official category definitions).

Submission materials:

-   Public GitHub repository.
-   Open-source license.
-   Complete `.kiro` directory.
-   Working application URL.
-   English project description.
-   Public YouTube demonstration video under three minutes.
-   Explanation of how Kiro was used.
-   Testing instructions.

The project must satisfy the official Kiroween new-project and
submission-period rules.

Any pre-existing work or code incorporated into the project must be
disclosed as required by the official rules. Do not misrepresent reused
work as newly created.

## 20. Project Success Metrics

-   Calculation correctness: 100% for defined reference cases.
-   Critical automated tests: passing.
-   Core workflows: passing end-to-end.
-   No known critical application errors.
-   Public demo accessible.
-   Submission materials complete and consistent.

## 21. Future Enhancements

Not part of the MVP:

-   Smart plug integration.
-   Actual meter data import.
-   Regional electricity tariff presets.
-   Appliance efficiency comparisons.
-   Advanced usage pattern analysis.
-   AI-assisted energy recommendations.

These features should only be considered after the MVP is complete and
stable.
