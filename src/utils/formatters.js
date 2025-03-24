/**
 * formatters.js
 * Utility functions for formatting values in the application
 */

/**
 * Format a number as currency
 * @param {number} value - The value to format
 * @param {string} currency - The currency code (default: USD)
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = 'USD', decimals = 2) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value || 0);
};

/**
 * Format a number as a percentage
 * @param {number} value - The value to format (e.g., 0.25 for 25%)
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 0) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value || 0);
};

/**
 * Format a number with thousands separators
 * @param {number} value - The value to format
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string} Formatted number string
 */
export const formatNumber = (value, decimals = 0) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value || 0);
};

/**
 * Format a date
 * @param {Date|string} date - The date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
};

/**
 * Get a color based on a confidence level
 * @param {number} level - Confidence level (0-1)
 * @returns {Object} Color values for text and background
 */
export const getConfidenceLevelColor = (level) => {
  if (level >= 0.75) {
    return { text: 'text-green-600', bg: 'bg-green-100' };
  } else if (level >= 0.5) {
    return { text: 'text-amber-600', bg: 'bg-amber-100' };
  } else {
    return { text: 'text-red-600', bg: 'bg-red-100' };
  }
};

/**
 * Get a human-readable confidence level label
 * @param {number} level - Confidence level (0-1)
 * @returns {string} Confidence level label
 */
export const getConfidenceLevelLabel = (level) => {
  if (level >= 0.75) {
    return 'High';
  } else if (level >= 0.5) {
    return 'Medium';
  } else {
    return 'Low';
  }
};

/**
 * Truncate a long string with ellipsis
 * @param {string} str - The string to truncate
 * @param {number} length - Maximum length (default: 100)
 * @returns {string} Truncated string
 */
export const truncateString = (str, length = 100) => {
  if (!str) return '';
  if (str.length <= length) return str;
  
  return str.substring(0, length) + '...';
};

/**
 * Format a number as a compact number (K, M, B)
 * @param {number} value - The value to format
 * @returns {string} Formatted compact number
 */
export const formatCompactNumber = (value) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short'
  }).format(value || 0);
};

/**
 * Format a price range
 * @param {number} min - Minimum price
 * @param {number} max - Maximum price
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted price range
 */
export const formatPriceRange = (min, max, currency = 'USD') => {
  const minFormatted = formatCurrency(min, currency, 0);
  const maxFormatted = formatCurrency(max, currency, 0);
  
  return `${minFormatted} - ${maxFormatted}`;
};

/**
 * Format a number with a specified unit
 * @param {number} value - The value to format
 * @param {string} unit - Unit to append (e.g., 'hrs', 'units')
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string} Formatted value with unit
 */
export const formatWithUnit = (value, unit, decimals = 0) => {
  return `${formatNumber(value, decimals)} ${unit}`;
};
