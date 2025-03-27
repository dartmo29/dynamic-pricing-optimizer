# CostDataImport Component Documentation

## Overview
The `CostDataImport` component provides functionality for importing cost structure data into the Dynamic Pricing Optimizer application. It supports importing data from both JSON text input and file uploads, with validation to ensure the data matches the expected format.

## Features

### Import Methods
1. **JSON Text**: Direct input of JSON-formatted cost structure data
2. **File Upload**: Upload JSON files containing cost structure data

### Validation & Error Handling
- Automatic validation of imported data structure
- Detailed error messages for invalid inputs
- Type checking for critical fields
- Required fields validation

### User Guidance
- Example data structure provided
- Load example button for quick testing
- Documentation of expected data format
- Visual error indicators

## Usage

```jsx
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import CostDataImport from '../components/cost-analysis/CostDataImport';

const ImportDialog = ({ onImport }) => {
  const [open, setOpen] = React.useState(false);
  
  const handleImport = (data) => {
    const success = onImport(data);
    if (success) {
      setOpen(false);
    }
    return success;
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Import Cost Data</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Cost Data</DialogTitle>
        </DialogHeader>
        <CostDataImport onImport={handleImport} />
      </DialogContent>
    </Dialog>
  );
};

export default ImportDialog;
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `onImport` | Function | Required. Callback function that is called when data is successfully imported. Should return a boolean indicating success or failure. |

## Expected Data Format

The component expects data in the following format:

```json
{
  "businessType": "service",
  "directCosts": [
    { "name": "Materials", "amount": 25, "unit": "unit" },
    { "name": "Packaging", "amount": 2.5, "unit": "unit" }
  ],
  "indirectCosts": [
    { "name": "Rent", "amount": 1200, "period": "month" },
    { "name": "Marketing", "amount": 500, "period": "month" }
  ],
  "timeCosts": [
    { "name": "Labor", "rate": 20, "hours": 2 }
  ],
  "targetMargin": 0.3,
  "expectedVolume": 50
}
```

### Required Fields
- `directCosts`: Array of direct costs
- `indirectCosts`: Array of indirect costs
- `timeCosts`: Array of time-based costs

### Optional Fields
- `businessType`: "service", "product", or "subscription" (defaults to "service")
- `targetMargin`: Target profit margin as decimal (0.3 = 30%)
- `expectedVolume`: Expected monthly sales/clients volume

## Validation Rules

The component performs the following validations:
1. Valid JSON structure
2. Object with required cost arrays
3. Valid business type (if provided)
4. Valid target margin between 0-1 (if provided)
5. Positive expected volume (if provided)

## Dependencies

- React UI components: Tabs, Button, Input, Alert
- Lucide icons: Code, FileUp, Upload, AlertCircle
- File handling using FileReader API