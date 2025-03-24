/**
 * utils.js
 * Utility functions for the application
 */

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and merges Tailwind CSS classes
 * 
 * @param  {...any} inputs - Class names or conditional class name objects
 * @returns {string} Merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as currency
 * 
 * @param {number} value - The value to format
 * @param {string} currency - The currency symbol (default: '$')
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted currency string
 */
export function formatCurrency(value, currency = '$', decimals = 2) {
  return `${currency}${value.toFixed(decimals)}`;
}

/**
 * Format a number as a percentage
 * 
 * @param {number} value - The value to format (0-1)
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string} Formatted percentage string
 */
export function formatPercentage(value, decimals = 0) {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Calculate the weighted average of values
 * 
 * @param {Array<number>} values - Array of values
 * @param {Array<number>} weights - Array of weights
 * @returns {number} Weighted average
 */
export function weightedAverage(values, weights) {
  if (values.length !== weights.length || values.length === 0) {
    return 0;
  }
  
  const sum = weights.reduce((acc, val) => acc + val, 0);
  
  if (sum === 0) {
    return 0;
  }
  
  const weightedSum = values.reduce((acc, val, index) => acc + val * weights[index], 0);
  
  return weightedSum / sum;
}

/**
 * Truncate a string to a maximum length
 * 
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 50) {
  if (!text || text.length <= maxLength) {
    return text;
  }
  
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Get a color based on a value in a range
 * 
 * @param {number} value - The value
 * @param {number} min - Minimum value in the range
 * @param {number} max - Maximum value in the range
 * @param {Array<string>} colors - Array of color codes from low to high
 * @returns {string} Color code
 */
export function getColorForValue(value, min, max, colors = ['#EF4444', '#F59E0B', '#10B981']) {
  const normalized = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const index = Math.floor(normalized * (colors.length - 1));
  
  return colors[index];
}

/**
 * Check if a value is a number (including string numbers)
 * 
 * @param {any} value - The value to check
 * @returns {boolean} Whether the value is a number
 */
export function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * Deep clone an object
 * 
 * @param {Object} obj - The object to clone
 * @returns {Object} Cloned object
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
