# Dynamic Pricing Optimizer

A SaaS platform to help small businesses determine optimal pricing for their products or services.

## 🎉 MVP Release - March 2025

The Dynamic Pricing Optimizer is now available as a Minimum Viable Product! This initial release includes all the core functionality needed for small businesses to analyze costs, understand market positioning, and generate data-driven pricing recommendations.

### MVP Highlights:
- Complete cost structure analysis (direct, indirect, and time-based costs)
- Market positioning and competitor analysis
- Value proposition assessment
- Customer segmentation with price elasticity modeling
- Price optimization algorithms for multiple strategies
- Implementation guidance for recommended pricing
- PDF export for reports and dashboards
- Scenario management for comparing pricing strategies

For a detailed overview of the MVP status, see [MVPSTATUS.md](MVPSTATUS.md).

## 🔧 Troubleshooting Mode

This application includes comprehensive troubleshooting features to identify and resolve rendering issues. If you're experiencing problems with the main application, we've provided several diagnostic tools to help pinpoint where the problem occurs.

### Using the Gradual Testing App

The Gradual Testing App allows you to enable features incrementally to identify which components or integrations might be causing issues.

1. Click the "Gradual App" button in the top navigation
2. Start by enabling basic features like "Local Storage"
3. Test each feature after enabling it
4. Add more complex components one by one
5. Check the logs and errors tabs for any issues

### Testing UI Components

For issues specifically with UI rendering:

1. Click the "Component Test" button in the Gradual Testing App
2. Select individual UI components to test them in isolation
3. Try different properties and configurations
4. Watch for any render errors or console warnings

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 18.x)
- NPM (>= 9.x)

### Installation

1. Clone this repository
```bash
git clone https://github.com/dartmo29/dynamic-pricing-optimizer.git
cd dynamic-pricing-optimizer
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Visit `http://localhost:5173` in your browser (or the port shown in your terminal)

## 📊 Key Features

- **Cost Analysis**: Break down your cost structure for accurate pricing foundations
- **Customer Segmentation**: Analyze price elasticity for different customer segments
- **Market Positioning**: Analyze your pricing relative to competitors
- **Value Assessment**: Quantify your unique value proposition
- **Strategic Recommendations**: Get data-driven pricing strategy suggestions
- **Implementation Guidance**: Step-by-step guidance for rolling out new pricing
- **Scenario Comparison**: Create and compare different pricing scenarios
- **Data Import/Export**: Share and reuse pricing models with JSON import/export

## 🏗️ Project Structure

```
dynamic-pricing-optimizer/
├── docs/                 # Documentation files
├── public/               # Public assets
├── src/
│   ├── components/
│   │   ├── cost-analysis/     # Cost structure components
│   │   ├── pricing-strategy/  # Strategy selection and calculation
│   │   ├── setup/             # Setup wizard components
│   │   ├── testing/           # Test utilities
│   │   ├── ui/                # Base UI components
│   │   └── value-assessment/  # Value proposition components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Core libraries
│   ├── models/                # Business logic models
│   ├── pages/                 # Page components
│   ├── utils/                 # Utility functions
│   ├── App.jsx                # Main application component
│   ├── GradualApp.jsx         # Troubleshooting application
│   ├── index.css              # Global styles
│   └── index.jsx              # Application entry point
├── MVPSTATUS.md          # MVP implementation status
├── package.json
└── README.md
```

## 📋 Module Descriptions

### Cost Analysis
The Cost Analysis module helps businesses understand their cost structure, calculate margins, and determine break-even points. It supports:
- Direct cost calculation (materials, labor, per-unit costs)
- Indirect cost allocation (overhead, marketing, administration)
- Time-based cost tracking (for service businesses)
- Margin calculation and break-even analysis
- Data import/export capabilities

### Customer Segments
The Customer Segments module helps businesses analyze and optimize pricing for different customer groups:
- Define segments with varying price sensitivity levels
- Visualize price sensitivity across customer segments
- Get segment-specific pricing recommendations
- Create tailored implementation plans for each segment

### Pricing Strategy
The Pricing Strategy module generates optimal price recommendations based on:
- Cost-plus pricing (ensuring target margins)
- Competitor-based pricing (market positioning)
- Value-based pricing (charging based on delivered value)
- Custom blended approaches for balanced recommendations

### Scenario Comparison
The Scenario Comparison module allows businesses to create and compare different pricing strategies:
- Save different pricing configurations as named scenarios
- Compare multiple scenarios side by side
- Analyze key pricing metrics across scenarios
- See detailed differences between scenarios
- Import/export scenarios for sharing or backup

### Value Assessment
The Value Assessment module helps businesses articulate and communicate their value proposition with four key components:
1. **Competitive Analysis**: Compare your offering to competitors
2. **Value Proposition Editor**: Craft a clear value statement
3. **Value Mapping**: Connect your value to customer needs
4. **Value Communication**: Create a plan to communicate your value effectively

## 🧪 Development and Testing

### Running Tests

```bash
npm run test
```

### Building for Production

```bash
npm run build
```

### Testing Individual Components

The application includes a Component Test utility for testing UI components in isolation:

1. Run the application in development mode
2. Click on "Gradual App" in the navigation
3. Click on "Component Test" in the top right
4. Select a component to test from the left sidebar
5. Adjust properties and observe rendering

## 📝 Documentation

Detailed component documentation is available in the `docs` directory:

- [CostStructureForm](docs/CostStructureForm.md) - Cost structure input form
- [CostDataImport](docs/CostDataImport.md) - Cost data import functionality
- [Deployment Guide](docs/deployment-guide.md) - Guide for deploying the application

## 🚀 Deployment

This project supports automatic deployment to Netlify via GitHub Actions. A workflow is set up to build and deploy the application whenever changes are pushed to the main branch.

### Required Secrets for Deployment

To enable automatic deployment to Netlify, you need to set up the following GitHub repository secrets:

1. **NETLIFY_AUTH_TOKEN**: 
   - Generate a personal access token in Netlify: User Settings > Applications > New access token
   - Add it as a secret in GitHub repository: Settings > Secrets > New repository secret

2. **NETLIFY_SITE_ID**:
   - Find your site ID in Netlify: Site settings > General > Site details > API ID
   - Add it as a secret in GitHub repository: Settings > Secrets > New repository secret

For more detailed deployment instructions, please see the [Deployment Guide](docs/deployment-guide.md).

## ⚠️ Common Issues and Solutions

### App Not Rendering

If the main app isn't rendering correctly:

1. Try the simplified or gradual app versions
2. Use the component test to check if UI components render individually
3. Check the browser console for JavaScript errors
4. Verify Tailwind CSS is loading properly (look for styled elements)

### Storage Issues

If you're experiencing problems with data persistence:

1. In the Gradual App, enable the "Local Storage" feature
2. Click "Test Storage" to verify reading/writing works
3. Check browser console for any localStorage-related errors
4. Ensure your browser has localStorage enabled and available

### Component Rendering Problems

If specific components aren't rendering:

1. Use the Component Test to isolate the problematic component
2. Try different property combinations
3. Check the error log for specific rendering errors
4. Look for dependency issues (one component might require another to be enabled)

## 🔄 Pulling Latest Changes

To update your local version with the latest changes:

```bash
git pull origin main
npm install  # Install any new dependencies
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📅 Recent Updates

- Added automatic deployment to Netlify
- Added comprehensive deployment documentation
- Completed MVP implementation
- Implemented CostStructure component for cost analysis
- Added PDF export functionality for reports and dashboards
- Fixed PricingOptimizerPage to properly integrate all components
- Added Market Position selection with navigation
- Enhanced CostStructureForm with improved UI and additional features
- Added CostDataImport component for importing cost data
- Fixed paths and dependencies for proper component integration
- Added comprehensive documentation for components
- Added UI components: Tooltip, Dialog, Alert
- Added customer segmentation with price elasticity analysis
- Added segment-specific pricing recommendations
- Integrated segment-based implementation guidance
- Added export/import functionality for cost data
- Enhanced user experience with improved workflow navigation
- Added ability to save and compare different pricing strategies