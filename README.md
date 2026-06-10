# The Fifty Project

## 🎯 Overview

**The Fifty Project** is a transparent, impact-driven charitable initiative that distributes **₹1 crore (10 million rupees)** across **50 vetted causes**. Each cause receives exactly **₹2 lakh**, with complete transparency and accountability. Every rupee is tracked, documented, and shown on camera.

## 📋 What This Website Does

This web application is the digital hub for The Fifty Project, providing:

- **Cause Discovery**: Browse and explore 50 carefully selected charitable causes
- **Transparent Ledger**: Real-time tracking of fund deployment and impact metrics
- **Cause Details**: In-depth information about each cause including:
  - Organization background and vetting credentials
  - Problem statements and counterintuitive facts
  - Impact metrics and deployment status
  - Video documentation and receipt links
- **Live Tracking**: Monitor which causes are funded, queued, or coming next
- **Multi-Pillar Classification**: Causes organized across four impact areas:
  - **Human** - Programs benefiting human welfare
  - **Animal** - Animal welfare and conservation
  - **Environment** - Environmental sustainability
  - **Resilience** - Crisis preparedness and resilience

## 🌟 Key Features

### 1. **Cause Management**
- 50 distinct causes, each with complete metadata
- Status tracking: Funded, Up Next, or Queued
- Geographic distribution (India and Global focus)
- Vetting credentials from trusted evaluators

### 2. **Transparency Dashboard**
- Real-time statistics on deployed funds
- Lives impacted tracking
- Remaining funds allocation view
- Ledger strip showing deployment progress

### 3. **Interactive Navigation**
- Home tab with project overview
- Causes tab for browsing and filtering
- About tab explaining the project philosophy
- Ledger tab for financial transparency
- Detailed cause views with rich content

### 4. **Multimedia Integration**
- YouTube video documentation for each cause
- Receipt and proof links
- Donation capability for each cause
- Vetting review access

### 5. **Currency Support**
- Currency converter for global audiences
- Multi-currency donation support

## 💻 Technology Stack

- **Frontend**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (inferred from component structure)
- **Animation**: Motion (framer-motion alternative)
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/
│   ├── HomeTab.tsx          # Project overview and introduction
│   ├── CausesTab.tsx        # Browse and filter 50 causes
│   ├── CauseDetail.tsx      # Detailed view of individual cause
│   ├── AboutTab.tsx         # Project philosophy and methodology
│   ├── LedgerTab.tsx        # Financial transparency and statistics
│   ├── CauseCard.tsx        # Cause preview component
│   ├── LedgerStrip.tsx      # Progress visualization
│   ├── CurrencyConverter.tsx # Multi-currency support
│   └── Navbar.tsx           # Main navigation
├── App.tsx                  # Main application container
├── main.tsx                 # Entry point
├── types.ts                 # TypeScript interfaces and types
├── data.ts                  # Cause database and metadata
└── index.css                # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Running

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## 📊 Data Model

### Cause Object
Each cause contains:
- **Identity**: Fraction (e.g., "01/50"), Name, Hook
- **Classification**: Pillar (human/animal/environment/resilience), Status
- **Financials**: Amount (₹2 lakh), Transfer date
- **Organization**: Name, Vetting credentials, 80G tax status
- **Content**: Problem statement, Organization details, Math behind impact
- **Links**: YouTube documentation, Receipt URL, Vetting review, Donation URL

### Ledger Statistics
- Causes funded count
- Total funds deployed
- Funds remaining for deployment
- Lives impacted estimate

## 🎯 Core Philosophy

The Fifty Project embodies three core principles:

1. **Finite & Focused**: 50 causes, fixed amount per cause—no ambiguity
2. **Transparent & Traceable**: Every rupee tracked, documented, and shown on camera
3. **Properly Vetted**: Each cause is evaluated by established charitable evaluators

## 📝 License

This project is licensed under the Apache License 2.0 (SPDX-License-Identifier: Apache-2.0)

---

**For more information** or to contribute, please visit the project's main documentation or contact the team.
