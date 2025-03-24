/**
 * storage.js
 * Utility for handling local storage of application data
 */

// Storage keys
export const STORAGE_KEYS = {
  COST_ANALYSIS: 'dpo_cost_analysis',
  PRICING_STRATEGY: 'dpo_pricing_strategy',
  BUSINESS_PROFILE: 'dpo_business_profile',
  COMPETITORS: 'dpo_competitors',
  VALUE_FACTORS: 'dpo_value_factors',
  SETTINGS: 'dpo_settings',
  SCENARIOS: 'dpo_scenarios'
};

/**
 * Save data to local storage
 * 
 * @param {string} key Storage key
 * @param {any} data Data to store
 * @returns {boolean} Success status
 */
export const saveToStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
    return true;
  } catch (error) {
    console.error('Error saving to local storage:', error);
    return false;
  }
};

/**
 * Load data from local storage
 * 
 * @param {string} key Storage key
 * @param {any} defaultValue Default value if not found
 * @returns {any} Retrieved data or default value
 */
export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return defaultValue;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error('Error loading from local storage:', error);
    return defaultValue;
  }
};

/**
 * Remove data from local storage
 * 
 * @param {string} key Storage key
 * @returns {boolean} Success status
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from local storage:', error);
    return false;
  }
};

/**
 * Clear all application data from local storage
 * 
 * @returns {boolean} Success status
 */
export const clearAppStorage = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing app storage:', error);
    return false;
  }
};

/**
 * Save a pricing scenario
 * 
 * @param {string} name Scenario name
 * @param {Object} data Scenario data
 * @returns {boolean} Success status
 */
export const saveScenario = (name, data) => {
  try {
    // Get existing scenarios
    const scenarios = loadFromStorage(STORAGE_KEYS.SCENARIOS, {});
    
    // Add new scenario with timestamp
    scenarios[name] = {
      ...data,
      createdAt: new Date().toISOString()
    };
    
    // Save updated scenarios
    return saveToStorage(STORAGE_KEYS.SCENARIOS, scenarios);
  } catch (error) {
    console.error('Error saving scenario:', error);
    return false;
  }
};

/**
 * Load a specific scenario
 * 
 * @param {string} name Scenario name
 * @returns {Object|null} Scenario data or null if not found
 */
export const loadScenario = (name) => {
  try {
    const scenarios = loadFromStorage(STORAGE_KEYS.SCENARIOS, {});
    return scenarios[name] || null;
  } catch (error) {
    console.error('Error loading scenario:', error);
    return null;
  }
};

/**
 * Get all saved scenarios
 * 
 * @returns {Object} Map of scenario names to data
 */
export const getAllScenarios = () => {
  return loadFromStorage(STORAGE_KEYS.SCENARIOS, {});
};

/**
 * Delete a scenario
 * 
 * @param {string} name Scenario name
 * @returns {boolean} Success status
 */
export const deleteScenario = (name) => {
  try {
    const scenarios = loadFromStorage(STORAGE_KEYS.SCENARIOS, {});
    
    if (!scenarios[name]) {
      return false;
    }
    
    // Remove the scenario
    delete scenarios[name];
    
    // Save updated scenarios
    return saveToStorage(STORAGE_KEYS.SCENARIOS, scenarios);
  } catch (error) {
    console.error('Error deleting scenario:', error);
    return false;
  }
};

/**
 * Export all application data as JSON
 * 
 * @returns {string} JSON string of all data
 */
export const exportAllData = () => {
  try {
    const exportData = {};
    
    Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
      exportData[key] = loadFromStorage(storageKey);
    });
    
    return JSON.stringify(exportData, null, 2);
  } catch (error) {
    console.error('Error exporting data:', error);
    return null;
  }
};

/**
 * Import application data from JSON
 * 
 * @param {string} jsonData JSON string of application data
 * @returns {boolean} Success status
 */
export const importAllData = (jsonData) => {
  try {
    const importData = JSON.parse(jsonData);
    
    Object.entries(importData).forEach(([key, data]) => {
      if (STORAGE_KEYS[key] && data !== null) {
        saveToStorage(STORAGE_KEYS[key], data);
      }
    });
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};
