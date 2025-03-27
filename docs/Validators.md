# Validators

The validators module provides utility functions for validating data throughout the Dynamic Pricing Optimizer application. These functions ensure data integrity and provide consistent validation rules across components.

## Basic Validation Functions

### Number Validation

- **isValidNumber(value)**: Checks if a value is a valid number
- **isPositiveNumber(value)**: Checks if a value is a positive number (greater than 0)
- **isNonNegativeNumber(value)**: Checks if a value is zero or a positive number
- **isInteger(value)**: Checks if a value is a valid integer
- **isPositiveInteger(value)**: Checks if a value is a positive integer

### Range Validation

- **isValidPercentage(value)**: Checks if a value is a valid percentage (0-100)
- **isValidDecimalPercentage(value)**: Checks if a value is a valid decimal percentage (0-1)
- **isWithinRange(value, min, max)**: Checks if a value is within a specified range

### String Validation

- **isNotEmpty(value)**: Checks if a string is not empty

### Date Validation

- **isValidDate(value)**: Checks if a value is a valid date
- **isFutureDate(value)**: Checks if a value is a future date

## Entity Validation Functions

These functions validate specific entity types used in the application:

### Cost Structure Validation

- **isValidDirectCost(cost)**: Validates a direct cost entry
- **isValidIndirectCost(cost)**: Validates an indirect cost entry
- **isValidTimeCost(cost)**: Validates a time cost entry
- **isValidBusinessType(type)**: Validates a business type ("service", "product", or "subscription")
- **validateCostStructure(costStructure)**: Validates an entire cost structure object

### Other Entity Validation

- **isValidCompetitor(competitor)**: Validates a competitor entry
- **isValidValueFactor(factor)**: Validates a value factor entry
- **isValidCustomerSegment(segment)**: Validates a customer segment entry
- **isValidArray(arr)**: Validates that an array exists and is not empty

## Import/Export Validation

- **validateJsonImport(jsonText)**: Validates JSON text for import, checking structure and data validity

## Usage Examples

### Basic Validation

```javascript
import { isPositiveNumber, isValidPercentage } from '../utils/validators';

// Validate form inputs
const isValidInput = isPositiveNumber(quantity) && isValidPercentage(discountRate);
```

### Entity Validation

```javascript
import { isValidDirectCost, isValidIndirectCost } from '../utils/validators';

// Validate cost before adding to the model
if (isValidDirectCost(newCost)) {
  costModel.addDirectCost(newCost.name, newCost.amount, newCost.unit);
}
```

### Full Structure Validation

```javascript
import { validateCostStructure } from '../utils/validators';

// Validate imported cost structure
const validation = validateCostStructure(importedData);
if (validation.success) {
  // Process valid data
} else {
  // Show error message
  console.error(validation.error);
}
```

### JSON Import Validation

```javascript
import { validateJsonImport } from '../utils/validators';

// Validate JSON text for import
const result = validateJsonImport(jsonText);
if (result.success) {
  // Use validated data
  const validData = result.data;
} else {
  // Handle validation error
  showError(result.error);
}
```

## Return Values

Most validators return a boolean indicating whether the validation passed. However, some validators return objects with additional information:

### validateCostStructure Return Value

```javascript
{
  success: boolean, // Whether validation passed
  error: string     // Error message (only when success is false)
}
```

### validateJsonImport Return Value

```javascript
{
  success: boolean, // Whether validation passed
  data: Object,     // Parsed and validated data (only when success is true)
  error: string     // Error message (only when success is false)
}
```

## Implementation Notes

- Validators are pure functions with no side effects
- They focus on data validation, not data transformation
- The functions are designed to be composable and reusable
- All validator functions handle null and undefined values gracefully