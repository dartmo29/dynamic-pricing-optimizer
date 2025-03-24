/**
 * ScenarioModel.js
 * Handles creation and comparison of different pricing scenarios
 */

/**
 * Scenario model for creating and comparing pricing scenarios
 */
class ScenarioModel {
  constructor() {
    this.scenarios = [];
    this.activeScenarioId = null;
  }

  /**
   * Create a new pricing scenario
   * 
   * @param {string} name - Scenario name
   * @param {Object} costModel - Cost model snapshot
   * @param {Object} pricingModel - Pricing model snapshot
   * @param {string} strategy - Selected pricing strategy
   * @param {Object} recommendation - Price recommendation
   * @returns {string} New scenario ID
   */
  createScenario(name, costModel, pricingModel, strategy, recommendation) {
    const id = `scenario_${Date.now()}`;
    
    // Extract only the necessary data from the models
    const scenarioData = {
      id,
      name,
      createdAt: new Date(),
      strategy,
      costStructure: {
        directCosts: costModel?.directCosts || [],
        indirectCosts: costModel?.indirectCosts || [],
        timeCosts: costModel?.timeCosts || [],
        targetMargin: costModel?.targetMargin || 0.3,
        expectedVolume: costModel?.expectedVolume || 100
      },
      pricing: {
        strategy,
        marketPosition: pricingModel?.marketPosition || 'mid-market',
        competitors: pricingModel?.competitors || [],
        valueFactors: pricingModel?.valueFactors || [],
        segments: pricingModel?.segments || []
      },
      recommendation: recommendation ? {
        price: recommendation.price,
        margin: recommendation.margin,
        explanation: recommendation.explanation
      } : null
    };
    
    this.scenarios.push(scenarioData);
    
    // Set as active scenario if it's the first one
    if (this.scenarios.length === 1) {
      this.activeScenarioId = id;
    }
    
    return id;
  }

  /**
   * Get a specific scenario
   * 
   * @param {string} id - Scenario ID
   * @returns {Object|null} Scenario data or null if not found
   */
  getScenario(id) {
    return this.scenarios.find(scenario => scenario.id === id) || null;
  }

  /**
   * Get all scenarios
   * 
   * @returns {Array} All scenarios
   */
  getAllScenarios() {
    return [...this.scenarios];
  }

  /**
   * Update a scenario
   * 
   * @param {string} id - Scenario ID
   * @param {Object} updatedData - Updated scenario data
   * @returns {boolean} Success flag
   */
  updateScenario(id, updatedData) {
    const index = this.scenarios.findIndex(scenario => scenario.id === id);
    if (index === -1) return false;
    
    this.scenarios[index] = {
      ...this.scenarios[index],
      ...updatedData,
      updatedAt: new Date()
    };
    
    return true;
  }

  /**
   * Delete a scenario
   * 
   * @param {string} id - Scenario ID
   * @returns {boolean} Success flag
   */
  deleteScenario(id) {
    const initialLength = this.scenarios.length;
    this.scenarios = this.scenarios.filter(scenario => scenario.id !== id);
    
    // If active scenario was deleted, set the first available as active
    if (this.activeScenarioId === id && this.scenarios.length > 0) {
      this.activeScenarioId = this.scenarios[0].id;
    } else if (this.scenarios.length === 0) {
      this.activeScenarioId = null;
    }
    
    return this.scenarios.length < initialLength;
  }

  /**
   * Set the active scenario
   * 
   * @param {string} id - Scenario ID
   * @returns {boolean} Success flag
   */
  setActiveScenario(id) {
    if (this.scenarios.some(scenario => scenario.id === id)) {
      this.activeScenarioId = id;
      return true;
    }
    return false;
  }

  /**
   * Get the active scenario
   * 
   * @returns {Object|null} Active scenario or null if none
   */
  getActiveScenario() {
    return this.activeScenarioId ? this.getScenario(this.activeScenarioId) : null;
  }

  /**
   * Compare multiple scenarios
   * 
   * @param {Array} scenarioIds - Array of scenario IDs to compare
   * @returns {Object} Comparison results
   */
  compareScenarios(scenarioIds) {
    const scenariosToCompare = scenarioIds
      .map(id => this.getScenario(id))
      .filter(Boolean);
    
    if (scenariosToCompare.length === 0) return null;
    
    // Prepare metrics for comparison
    const comparisonResults = {
      scenarios: scenariosToCompare.map(scenario => ({
        id: scenario.id,
        name: scenario.name,
        strategy: scenario.strategy,
        price: scenario.recommendation?.price || 0,
        margin: scenario.recommendation?.margin || 0,
        marketPosition: scenario.pricing.marketPosition,
        createdAt: scenario.createdAt
      })),
      metrics: {
        priceRange: {
          min: Math.min(...scenariosToCompare.map(s => s.recommendation?.price || 0)),
          max: Math.max(...scenariosToCompare.map(s => s.recommendation?.price || 0)),
          avg: this.calculateAverage(scenariosToCompare.map(s => s.recommendation?.price || 0))
        },
        marginRange: {
          min: Math.min(...scenariosToCompare.map(s => s.recommendation?.margin || 0)),
          max: Math.max(...scenariosToCompare.map(s => s.recommendation?.margin || 0)),
          avg: this.calculateAverage(scenariosToCompare.map(s => s.recommendation?.margin || 0))
        }
      },
      differences: {}
    };
    
    // Calculate differences between scenarios if there are multiple
    if (scenariosToCompare.length > 1) {
      // Pair-wise comparison of all scenarios
      for (let i = 0; i < scenariosToCompare.length; i++) {
        for (let j = i + 1; j < scenariosToCompare.length; j++) {
          const s1 = scenariosToCompare[i];
          const s2 = scenariosToCompare[j];
          
          const priceDiff = (s1.recommendation?.price || 0) - (s2.recommendation?.price || 0);
          const marginDiff = (s1.recommendation?.margin || 0) - (s2.recommendation?.margin || 0);
          
          const key = `${s1.id}_vs_${s2.id}`;
          comparisonResults.differences[key] = {
            scenarios: [s1.name, s2.name],
            priceDifference: priceDiff,
            priceDifferencePercent: this.calculatePercentageDifference(
              s1.recommendation?.price || 0, 
              s2.recommendation?.price || 0
            ),
            marginDifference: marginDiff,
            marginDifferencePercent: this.calculatePercentageDifference(
              s1.recommendation?.margin || 0, 
              s2.recommendation?.margin || 0
            )
          };
        }
      }
    }
    
    return comparisonResults;
  }

  /**
   * Create a scenario from the current application state
   * 
   * @param {string} name - Scenario name
   * @param {Object} state - Current application state
   * @returns {string} New scenario ID
   */
  createScenarioFromCurrentState(name, { costAnalysis, pricingStrategy }) {
    return this.createScenario(
      name,
      costAnalysis.costModel,
      pricingStrategy.pricingModel,
      pricingStrategy.selectedStrategy,
      pricingStrategy.priceRecommendations[pricingStrategy.selectedStrategy]
    );
  }

  /**
   * Calculate average of an array of numbers
   * 
   * @param {Array} values - Array of numbers
   * @returns {number} Average value
   */
  calculateAverage(values) {
    if (values.length === 0) return 0;
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  /**
   * Calculate percentage difference between two values
   * 
   * @param {number} val1 - First value
   * @param {number} val2 - Second value
   * @returns {number} Percentage difference
   */
  calculatePercentageDifference(val1, val2) {
    if (val2 === 0) return 0;
    return ((val1 - val2) / val2) * 100;
  }

  /**
   * Export scenarios to JSON
   * 
   * @returns {string} JSON string of all scenarios
   */
  exportScenarios() {
    return JSON.stringify(this.scenarios);
  }

  /**
   * Import scenarios from JSON
   * 
   * @param {string} jsonData - JSON string containing scenarios
   * @returns {boolean} Success flag
   */
  importScenarios(jsonData) {
    try {
      const importedScenarios = JSON.parse(jsonData);
      if (!Array.isArray(importedScenarios)) {
        return false;
      }
      
      // Validate each scenario has required fields
      const validScenarios = importedScenarios.filter(scenario => 
        scenario.id && scenario.name && scenario.costStructure && scenario.pricing
      );
      
      // Append valid scenarios to existing ones
      this.scenarios = [...this.scenarios, ...validScenarios];
      
      // Set active scenario if none exists
      if (!this.activeScenarioId && this.scenarios.length > 0) {
        this.activeScenarioId = this.scenarios[0].id;
      }
      
      return true;
    } catch (error) {
      console.error('Failed to import scenarios:', error);
      return false;
    }
  }
}

export default ScenarioModel;