# PlugWise Product Steering

## Product Identity

**PlugWise** is a lightweight electricity consumption calculator and scenario simulator designed to help users understand how household appliances contribute to estimated electricity consumption and costs.

**Tagline:** Understand your energy. Control your costs.

## Target Users

### Primary Users
- Household electricity users seeking to understand their consumption patterns
- Students living in rented rooms or boarding houses
- Remote workers tracking work-from-home energy costs
- Anyone interested in understanding and managing electricity expenses

### User Personas

**Persona A — Household User**  
Wants to identify which household appliances contribute most to estimated electricity consumption and explore ways to reduce costs.

**Persona B — Student or Renter**  
Wants to estimate electricity expenses for appliances used in a rented room to better manage their budget.

**Persona C — Remote Worker**  
Wants to estimate the electricity cost of computers, monitors, air conditioners, and other work equipment used at home.

## Main Problem

Many electricity users see their electricity bill but do not understand which appliances contribute most to their consumption. Common difficulties include:

- Understanding the difference between watts (W) and kilowatt-hours (kWh)
- Estimating the monthly energy use of individual appliances
- Estimating the cost associated with an appliance's usage
- Comparing the impact of different usage schedules
- Identifying which appliances have the greatest estimated contribution to total consumption

## Product Objectives

### Primary Goals
1. Calculate estimated electricity consumption per appliance
2. Calculate estimated electricity costs using a user-configurable tariff
3. Visualize appliance consumption and cost distribution
4. Allow users to simulate alternative usage schedules without changing their original data
5. Help users understand the estimated impact of usage changes

### Success Criteria
- Users can accurately calculate estimated consumption based on appliance specifications
- Users can simulate "what-if" scenarios to compare usage patterns
- All calculations are transparent and based on user-provided inputs
- The application works entirely in the browser without requiring external services

## Core Capabilities

### 1. Appliance Management
Users can add, edit, delete, and duplicate electrical appliances with specifications including:
- Appliance name and category
- Power rating in watts
- Daily usage duration and frequency
- Quantity
- Optional description

### 2. Electricity Calculator
Transparent calculation of energy consumption and estimated costs using:
- Energy (kWh) = (Power (W) × Hours per day × Days × Quantity) / 1000
- Estimated cost = Energy (kWh) × Tariff per kWh

### 3. Dashboard & Visualization
Comprehensive overview displaying:
- Total estimated consumption and cost
- Number of registered appliances
- Highest-consuming appliances
- Consumption distribution by category
- Visual charts for energy and cost breakdown

### 4. What-if Simulator (Signature Feature)
Interactive scenario simulation allowing users to:
- Change appliance usage assumptions without modifying original records
- Compare baseline vs. simulated consumption and costs
- View energy and cost differences with percentage changes
- Understand the impact of usage changes before implementing them

### 5. Scenario Comparison
Advanced comparison capabilities:
- Create multiple alternative usage scenarios
- Compare baseline against one or more scenarios
- Name and manage saved scenarios
- Export and import scenario data

### 6. Data Management
- Automatic local persistence using browser LocalStorage
- Export appliance and scenario data to JSON
- Import previously exported JSON
- Reset to demo data

## MVP Boundaries

### Included in MVP
1. Responsive dashboard
2. Appliance CRUD operations
3. Configurable electricity tariff
4. Electricity consumption calculation
5. Estimated cost calculation
6. What-if simulator
7. Scenario comparison
8. Consumption charts
9. Local persistence
10. JSON import and export
11. Automated tests

### Explicit Non-Goals

The MVP will **NOT**:
- Measure actual electrical consumption
- Connect to smart meters or IoT devices
- Access electricity provider accounts
- Predict an official electricity bill
- Control electrical appliances
- Guarantee or claim actual electricity savings
- Require user registration or cloud infrastructure
- Provide AI recommendations
- Support multi-user accounts
- Offer native mobile applications
- Integrate with real-time monitoring systems
- Connect to official utility billing systems

## Important Disclaimers

All results must be described as **estimates** based on user-provided inputs. The application:
- Does not measure actual consumption
- Cannot guarantee accuracy of electricity bills
- Provides estimates for educational and planning purposes only
- Should clearly explain that actual appliance power draw may vary from nominal ratings
- Must distinguish estimated savings from actual realized savings

## Application Type

- **Platform:** Responsive web application
- **Deployment:** Static web hosting (Cloudflare Pages or similar)
- **Architecture:** Frontend-only, no backend or database server required
- **Data Storage:** Browser LocalStorage for MVP
- **Access:** No user authentication or accounts needed
