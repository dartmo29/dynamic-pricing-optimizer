# CostStructureForm Component Documentation

## Overview
The `CostStructureForm` component is a comprehensive form for inputting and managing cost structure data in the Dynamic Pricing Optimizer application. It allows users to define their business costs across different categories, which are then used for pricing calculations and recommendations.

## Features

### Business Information
- Select business type (service, product, subscription)
- Load industry-specific templates with pre-populated cost data

### Cost Categories
The form manages three main cost categories:
1. **Direct Costs**: Costs directly tied to each unit (materials, components, etc.)
2. **Indirect Costs**: Overhead expenses not directly tied to individual units (rent, software, etc.)
3. **Time Costs**: Hours-based costs primarily for service businesses (consultant time, labor, etc.)

### Additional Settings
- Target profit margin (percentage)
- Expected monthly volume (units/clients)

### Data Management
- Import cost data from JSON
- Export cost structure to JSON file
- Reset functionality to clear all cost data
- Save functionality to commit changes

### User Guidance
- Tooltips explaining each cost category and input field
- Tips for accurate pricing calculations
- Visual indicators for validation errors

## Usage

```jsx
import React from 'react';
import CostStructureForm from '../components/cost-analysis/CostStructureForm';
import useCostAnalysis from '../hooks/useCostAnalysis';

const CostAnalysisPage = () => {
  const costAnalysis = useCostAnalysis();
  
  const handleSave = (costData) => {
    console.log('Cost structure saved:', costData);
    // Additional processing as needed
  };
  
  return (
    <div>
      <h1>Cost Analysis</h1>
      <CostStructureForm 
        onSave={handleSave} 
        costAnalysis={costAnalysis} 
      />
    </div>
  );
};

export default CostAnalysisPage;
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `costAnalysis` | Object | Required. The cost analysis state from the `useCostAnalysis` hook. |
| `onSave` | Function | Optional. Callback function that is called when the form is saved. Receives the cost structure data as a parameter. |
| `onLoadTemplate` | Function | Optional. Callback function that is called when a template is loaded. Receives the template cost model as a parameter. |

## Related Components

The CostStructureForm works with several companion components:

- **CostDataImport**: Handles importing cost data from JSON text or files
- **CostBreakdownChart**: Visualizes the breakdown of costs by category
- **BreakEvenAnalysisChart**: Shows break-even analysis based on cost structure

## Dependencies

- React UI components: Card, Tabs, Input, Label, Select, Button, Alert, Dialog, Tooltip
- Lucide icons: Plus, X, Save, BriefcaseBusiness, Download, Upload, RefreshCw, AlertCircle, HelpCircle
- Utility functions: validators, cn (class name utility)

## Implementation Notes

- The component uses the `useCostAnalysis` hook for all cost-related state management
- Validation is performed before saving to ensure data integrity
- The form remembers its state between renders through the hook's persistence
- Industry templates provide quick starting points for different business types