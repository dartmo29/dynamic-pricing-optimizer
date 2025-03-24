# Dynamic Pricing Optimizer

A SaaS platform to help small businesses determine optimal pricing for their products or services.

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
- **Market Positioning**: Analyze your pricing relative to competitors
- **Value Assessment**: Quantify your unique value proposition
- **Strategic Recommendations**: Get data-driven pricing strategy suggestions
- **Implementation Guidance**: Step-by-step guidance for rolling out new pricing

## 🏗️ Project Structure

```
dynamic-pricing-optimizer/
├── public/
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

### Pricing Strategy
The Pricing Strategy module generates optimal price recommendations based on:
- Cost-plus pricing (ensuring target margins)
- Competitor-based pricing (market positioning)
- Value-based pricing (charging based on delivered value)
- Custom blended approaches for balanced recommendations

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

- Added `ValueCommunication` component to complete the Value Assessment workflow
- Implemented Component Test for Value Communication features
- Added comprehensive documentation for Value Assessment module