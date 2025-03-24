# Dynamic Pricing Optimizer

A comprehensive SaaS platform designed to help small businesses determine optimal pricing for their products or services. Unlike enterprise pricing tools that require significant expertise and resources, this solution is accessible, affordable, and specifically tailored to small business needs.

## Core Value Proposition

Small business owners can:
1. Stop guessing at their pricing or using simplistic cost-plus approaches
2. Make data-driven pricing decisions based on their specific market conditions
3. Understand the impact of different pricing strategies on their bottom line
4. Articulate the value of their offerings to justify optimal pricing
5. Adjust pricing strategies as market conditions change

## Features

### Cost Analysis
- Detailed cost structure breakdown (direct, indirect, time-based costs)
- Cost visualization with clear categorization
- Target margin setting and break-even analysis
- Visual representation of cost components

### Pricing Strategy
- Multiple pricing methodologies:
  - Cost-plus pricing with margin targeting
  - Competitor-based pricing with market positioning
  - Value-based pricing with differentiation analysis
  - Optimal blended approach
- Visual comparison of different strategies
- Strategy selection with detailed rationale
- Multi-dimensional competitor positioning map

### Value Assessment
- Value-to-price positioning matrix
- Competitor positioning visualization
- Customer value calculator with ROI analysis
- Value communication statements for sales conversations

### Implementation Guidance
- Strategy-specific implementation steps
- Pricing communication frameworks
- Risk assessment and mitigation strategies
- Rollout planning guidance

### Dashboard & Reporting
- Comprehensive metrics dashboard
- Strategy comparison visualizations
- Break-even analysis charts
- PDF export functionality for reports and presentations

### Guided Setup & Onboarding
- Step-by-step setup wizard
- Industry-specific templates
- Guided business profile configuration
- Intuitive cost structure setup

### Data Management & Persistence
- Local storage for saving pricing scenarios
- Import/export functionality
- Multiple pricing scenario comparison
- Session persistence for continuous work

## Technology Stack

- **Frontend**: React with TailwindCSS
- **Visualization**: Recharts for data visualization
- **State Management**: React Hooks for local state
- **UI Components**: Custom components with accessibility in mind
- **Styling**: Tailwind CSS for responsive design
- **PDF Export**: Custom PDF generation capability
- **Storage**: Browser local storage for data persistence

## Project Structure

```
src/
├── components/
│   ├── cost-analysis/        # Cost structure components
│   ├── pricing-strategy/     # Pricing strategy components
│   ├── value-assessment/     # Value assessment components
│   ├── setup/                # Setup wizard components
│   └── ui/                  # Reusable UI components
├── hooks/                   # Custom React hooks
├── lib/                     # Utility libraries
│   └── industryTemplates.js  # Industry-specific templates
├── models/                  # Data models and business logic
├── pages/                   # Page components
│   ├── PricingOptimizerPage.jsx
│   └── ValueAssessmentPage.jsx
└── utils/                   # Helper utilities
    ├── pdfExport.js         # PDF generation utilities
    └── storage.js           # Local storage utilities
```

## Development

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/dartmo29/dynamic-pricing-optimizer.git

# Install dependencies
cd dynamic-pricing-optimizer
npm install

# Start development server
npm run dev
```

### Building for Production
```bash
npm run build
```

## Key Features Added

### Industry-Specific Templates
- Pre-configured templates for SaaS, retail, professional services, and manufacturing
- Industry benchmarks and recommended pricing strategies
- Guided template selection in the setup process

### Multi-Dimensional Competitor Analysis
- Interactive competitor positioning map
- Customizable axes for different value dimensions
- Visual comparison of your offering vs. competitors

### Guided Setup Wizard
- Step-by-step onboarding process
- Intuitive data collection for new users
- Visual progress indicator and navigation

### Data Persistence
- Local storage for saving and loading pricing data
- Multiple scenario management
- Import/export functionality for data sharing

### Value Communication Framework
- Customer value calculator with ROI metrics
- Value statements for sales conversations
- Value-price positioning matrix

## Recent Updates

- Added missing components for the setup wizard
- Implemented industry template selection
- Added support for multiple pricing strategies
- Fixed path resolution for proper module imports
- Added various UI components (input, select, etc.)
- Added favicon and improved application structure

## Troubleshooting

If you encounter any issues during setup or running the application:

1. **Module Resolution Issues**:
   - Ensure you're using the latest code from the repository
   - Check that the path aliases are correctly set up in vite.config.js

2. **Component Import Errors**:
   - Make sure all UI components are properly imported
   - Check for proper usage of the @ path alias

3. **Local Storage Issues**:
   - If you experience issues with saving/loading data, try clearing your browser's local storage
   - Check browser console for any storage-related errors

## Future Enhancements

- User authentication and cloud data storage
- Advanced market analysis with external data sources
- Collaborative team pricing workflows
- Integration with CRM and accounting systems
- Mobile-optimized version for on-the-go pricing decisions
- Machine learning suggestions for optimal pricing points

## License

MIT

## Acknowledgments

- This project is part of a RevOps freelance business offering
- Inspired by enterprise pricing optimization tools but designed for accessibility
