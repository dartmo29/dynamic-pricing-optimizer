/**
 * useLocalStorage.js
 * Custom hook for persisting and retrieving data from localStorage
 */

import { useState, useEffect } from 'react';

/**
 * Custom hook for localStorage
 * 
 * @param {string} key - Storage key
 * @param {any} initialValue - Initial value if key not found
 * @returns {Array} [storedValue, setValue] - Similar to useState
 */
export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error, return initial value
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Handle errors
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  };

  // If key changes, reload value from localStorage
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : initialValue);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}" (from useEffect):`, error);
      setStoredValue(initialValue);
    }
  }, [key, initialValue]);

  // Return same format as useState
  return [storedValue, setValue];
};