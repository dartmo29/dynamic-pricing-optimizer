/**
 * validators.js
 * Utility functions for validating inputs
 */

/**
 * Check if a value is a valid number
 * @param {any} value - Value to check
 * @returns {boolean} True if value is a valid number
 */
export const isValidNumber = (value) => {
  if (value === null || value === undefined || value === '') return false;
  return !isNaN(Number(value)) && isFinite(Number(value));
};

/**
 * Check if a value is a positive number
 * @param {any} value - Value to check
 * @returns {boolean} True if value is a positive number
 */
export const isPositiveNumber = (value) => {
  return isValidNumber(value) && Number(value) > 0;
};

/**
 * Check if a value is a non-negative number (zero or positive)
 * @param {any} value - Value to check
 * @returns {boolean} True if value is a non-negative number
 */
export const isNonNegativeNumber = (value) => {
  return isValidNumber(value) && Number(value) >= 0;
};

/**
 * Check if a value is a valid percentage (0-100)
 * @param {any} value - Value to check
 * @returns {boolean} True if value is a valid percentage
 */
export const isValidPercentage = (value) => {
  return isValidNumber(value) && Number(value) >= 0 && Number(value) <= 100;
};

/**
 * Check if a value is a valid decimal percentage (0-1)
 * @param {any} value - Value to check
 * @returns {boolean} True if value is a valid decimal percentage
 */
export const isValidDecimalPercentage = (value) => {
  return isValidNumber(value) && Number(value) >= 0 && Number(value) <= 1;
};

/**
 * Check if a value is within a specified range
 * @param {any} value - Value to check
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {boolean} True if value is within range
 */
export const isWithinRange = (value, min, max) => {
  return isValidNumber(value) && Number(value) >= min && Number(value) <= max;
};

/**
 * Check if a string is not empty
 * @param {string} value - String to check
 * @returns {boolean} True if string is not empty
 */
export const isNotEmpty = (value) => {
  return value !== null && value !== undefined && String(value).trim() !== '';
};

/**
 * Check if a value is a valid integer
 * @param {any} value - Value to check
 * @returns {boolean} True if value is an integer
 */
export const isInteger = (value) => {
  return isValidNumber(value) && Number.isInteger(Number(value));
};

/**
 * Check if a value is a valid positive integer
 * @param {any} value - Value to check
 * @returns {boolean} True if value is a positive integer
 */
export const isPositiveInteger = (value) => {
  return isInteger(value) && Number(value) > 0;
};

/**
 * Check if a value is a valid date
 * @param {any} value - Value to check
 * @returns {boolean} True if value is a valid date
 */
export const isValidDate = (value) => {
  if (!value) return false;
  const date = new Date(value);
  return !isNaN(date.getTime());
};

/**
 * Check if a value is a future date
 * @param {any} value - Value to check
 * @returns {boolean} True if value is a future date
 */
export const isFutureDate = (value) => {
  if (!isValidDate(value)) return false;
  const date = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
};

/**
 * Validate a direct cost entry
 * @param {Object} cost - Cost object to validate
 * @returns {boolean} True if cost is valid
 */
export const isValidDirectCost = (cost) => {
  return (
    cost &&
    isNotEmpty(cost.name) &&
    isValidNumber(cost.amount) &&
    isNonNegativeNumber(cost.amount)
  );
};

/**
 * Validate an indirect cost entry
 * @param {Object} cost - Cost object to validate
 * @returns {boolean} True if cost is valid
 */
export const isValidIndirectCost = (cost) => {
  return (
    cost &&
    isNotEmpty(cost.name) &&
    isValidNumber(cost.amount) &&
    isNonNegativeNumber(cost.amount) &&
    (cost.period === 'month' || cost.period === 'year')
  );
};

/**
 * Validate a time cost entry
 * @param {Object} cost - Cost object to validate
 * @returns {boolean} True if cost is valid
 */
export const isValidTimeCost = (cost) => {
  return (
    cost &&
    isNotEmpty(cost.name) &&
    isValidNumber(cost.rate) &&
    isNonNegativeNumber(cost.rate) &&
    isValidNumber(cost.hours) &&
    isNonNegativeNumber(cost.hours)
  );
};

/**
 * Validate a competitor entry
 * @param {Object} competitor - Competitor object to validate
 * @returns {boolean} True if competitor is valid
 */
export const isValidCompetitor = (competitor) => {
  return (
    competitor &&
    isNotEmpty(competitor.name) &&
    isValidNumber(competitor.price) &&
    isPositiveNumber(competitor.price)
  );
};

/**
 * Validate a value factor entry
 * @param {Object} factor - Value factor object to validate
 * @returns {boolean} True if factor is valid
 */
export const isValidValueFactor = (factor) => {
  return (
    factor &&
    isNotEmpty(factor.name) &&
    isValidNumber(factor.importance) &&
    isWithinRange(factor.importance, 1, 10) &&
    isValidNumber(factor.score) &&
    isWithinRange(factor.score, 1, 10)
  );
};

/**
 * Validate a customer segment entry
 * @param {Object} segment - Customer segment object to validate
 * @returns {boolean} True if segment is valid
 */
export const isValidCustomerSegment = (segment) => {
  return (
    segment &&
    isNotEmpty(segment.name) &&
    isValidNumber(segment.size) &&
    isPositiveNumber(segment.size) &&
    isValidNumber(segment.priceElasticity) &&
    isWithinRange(segment.priceElasticity, 1, 10)
  );
};
