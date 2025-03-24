/**
 * useScenarioManager.js
 * Custom hook for managing pricing scenarios
 */

import { useState, useEffect, useCallback } from 'react';
import ScenarioModel from '../models/ScenarioModel';
import { useLocalStorage } from './useLocalStorage';

/**
 * Custom hook for managing pricing scenarios
 * 
 * @param {Object} initialState - Initial state of the application
 * @returns {Object} Scenario management state and handlers
 */
const useScenarioManager = (initialState = {}) => {
  // Initialize scenario model
  const [scenarioModel] = useState(() => new ScenarioModel());
  
  // State for scenarios
  const [scenarios, setScenarios] = useState([]);
  const [activeScenarioId, setActiveScenarioId] = useState(null);
  const [comparisonResults, setComparisonResults] = useState(null);
  const [selectedScenarioIds, setSelectedScenarioIds] = useState([]);
  
  // Use local storage to persist scenarios
  const [savedScenarios, setSavedScenarios] = useLocalStorage('pricingScenarios', []);
  
  // Effect to initialize scenarios from local storage
  useEffect(() => {
    if (savedScenarios && savedScenarios.length > 0) {
      // Import scenarios into the model
      scenarioModel.importScenarios(JSON.stringify(savedScenarios));
      
      // Update state
      setScenarios(scenarioModel.getAllScenarios());
      setActiveScenarioId(scenarioModel.activeScenarioId);
    }
  }, [savedScenarios, scenarioModel]);
  
  // Effect to save scenarios to local storage when they change
  useEffect(() => {
    if (scenarios.length > 0) {
      setSavedScenarios(scenarios);
    }
  }, [scenarios, setSavedScenarios]);
  
  /**
   * Create a new scenario
   * 
   * @param {string} name - Scenario name
   * @param {Object} state - Current application state
   * @returns {string} New scenario ID
   */
  const createScenario = useCallback((name, state) => {
    const id = scenarioModel.createScenarioFromCurrentState(name, state);
    setScenarios(scenarioModel.getAllScenarios());
    setActiveScenarioId(id);
    return id;
  }, [scenarioModel]);
  
  /**
   * Update a scenario
   * 
   * @param {string} id - Scenario ID
   * @param {Object} updatedData - Updated scenario data
   * @returns {boolean} Success flag
   */
  const updateScenario = useCallback((id, updatedData) => {
    const success = scenarioModel.updateScenario(id, updatedData);
    if (success) {
      setScenarios(scenarioModel.getAllScenarios());
    }
    return success;
  }, [scenarioModel]);
  
  /**
   * Delete a scenario
   * 
   * @param {string} id - Scenario ID
   * @returns {boolean} Success flag
   */
  const deleteScenario = useCallback((id) => {
    const success = scenarioModel.deleteScenario(id);
    if (success) {
      setScenarios(scenarioModel.getAllScenarios());
      setActiveScenarioId(scenarioModel.activeScenarioId);
      
      // Remove from comparison selection if present
      if (selectedScenarioIds.includes(id)) {
        setSelectedScenarioIds(ids => ids.filter(selectedId => selectedId !== id));
      }
    }
    return success;
  }, [scenarioModel, selectedScenarioIds]);
  
  /**
   * Set active scenario
   * 
   * @param {string} id - Scenario ID
   * @returns {boolean} Success flag
   */
  const setActiveScenario = useCallback((id) => {
    const success = scenarioModel.setActiveScenario(id);
    if (success) {
      setActiveScenarioId(id);
    }
    return success;
  }, [scenarioModel]);
  
  /**
   * Get active scenario
   * 
   * @returns {Object|null} Active scenario or null if none
   */
  const getActiveScenario = useCallback(() => {
    return scenarioModel.getActiveScenario();
  }, [scenarioModel]);
  
  /**
   * Toggle scenario selection for comparison
   * 
   * @param {string} id - Scenario ID
   */
  const toggleScenarioSelection = useCallback((id) => {
    setSelectedScenarioIds(ids => {
      if (ids.includes(id)) {
        return ids.filter(selectedId => selectedId !== id);
      } else {
        return [...ids, id];
      }
    });
  }, []);
  
  /**
   * Compare selected scenarios
   * 
   * @returns {Object} Comparison results
   */
  const compareSelectedScenarios = useCallback(() => {
    if (selectedScenarioIds.length < 2) {
      setComparisonResults(null);
      return null;
    }
    
    const results = scenarioModel.compareScenarios(selectedScenarioIds);
    setComparisonResults(results);
    return results;
  }, [scenarioModel, selectedScenarioIds]);
  
  /**
   * Clear comparison results
   */
  const clearComparison = useCallback(() => {
    setComparisonResults(null);
    setSelectedScenarioIds([]);
  }, []);
  
  /**
   * Export scenarios to JSON
   * 
   * @returns {string} JSON string of all scenarios
   */
  const exportScenarios = useCallback(() => {
    return scenarioModel.exportScenarios();
  }, [scenarioModel]);
  
  /**
   * Import scenarios from JSON
   * 
   * @param {string} jsonData - JSON string containing scenarios
   * @returns {boolean} Success flag
   */
  const importScenarios = useCallback((jsonData) => {
    const success = scenarioModel.importScenarios(jsonData);
    if (success) {
      setScenarios(scenarioModel.getAllScenarios());
      setActiveScenarioId(scenarioModel.activeScenarioId);
    }
    return success;
  }, [scenarioModel]);
  
  return {
    // State
    scenarios,
    activeScenarioId,
    comparisonResults,
    selectedScenarioIds,
    
    // Handlers
    createScenario,
    updateScenario,
    deleteScenario,
    setActiveScenario,
    getActiveScenario,
    toggleScenarioSelection,
    compareSelectedScenarios,
    clearComparison,
    exportScenarios,
    importScenarios
  };
};

export default useScenarioManager;