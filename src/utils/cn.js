/**
 * cn.js
 * Utility for conditionally joining CSS class names together
 * Based on clsx and tailwind-merge for handling Tailwind class conflicts
 */

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names and handles Tailwind class conflicts
 * 
 * @param  {...any} inputs - Class names to combine
 * @returns {string} - Combined class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
