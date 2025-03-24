/**
 * useCostAnalysis.js
 * Custom hook for managing cost analysis state and calculations
 */

import { useState, useEffect, useCallback } from 'react';
import CostModel from '../models/CostModel';
import { isValidDirectCost, isValidIndirectCost, isValidTimeCost } from '../utils/validators';

/**
 * Custom hook for managing cost analysis
 * @param {Object} initialData - Optional initial cost data
 * @returns {Object} Cost analysis state and handlers
 */
const useCostAnalysis = (initialData = null) => {
  // Initialize cost model
  const [costModel, setCostModel] = useState(() => {
    if (initialData) {
      const model = new CostModel(initialData.businessType);
      
      // Load initial data if provided
      initialData.directCosts.forEach(cost => {
        if (isValidDirectCost(cost)) {
          model.addDirectCost(cost.name, cost.amount, cost.unit);
        }
      });
      
      initialData.indirectCosts.forEach(cost => {
        if (isValidIndirectCost(cost)) {
          model.addIndirectCost(cost.name, cost.amount, cost.period);
        }
      });
      
      initialData.timeCosts.forEach(cost => {
        if (isValidTimeCost(cost)) {
          model.addTimeCost(cost.name, cost.rate, cost.hours);
        }
      });
      
      if (initialData.targetMargin) {
        model.setTargetMargin(initialData.targetMargin);
      }
      
      if (initialData.expectedVolume) {
        model.setExpectedVolume(initialData.expectedVolume);
      }
      
      return model;
    }
    
    return new CostModel();
  });
  
  // State for cost structure
  const [businessType, setBusinessType] = useState(costModel.businessType);
  const [directCosts, setDirectCosts] = useState(costModel.directCosts);
  const [indirectCosts, setIndirectCosts] = useState(costModel.indirectCosts);
  const [timeCosts, setTimeCosts] = useState(costModel.timeCosts);
  const [targetMargin, setTargetMargin] = useState(costModel.targetMargin);
  const [expectedVolume, setExpectedVolume] = useState(costModel.expectedVolume);
  
  // State for cost breakdown
  const [costBreakdown, setCostBreakdown] = useState(() => costModel.getCostBreakdown());
  
  // State for validation errors
  const [errors, setErrors] = useState({});
  
  // State to track if the cost model has been modified
  const [isDirty, setIsDirty] = useState(false);

  /**
   * Update the cost model with current state values
   */
  const updateCostModel = useCallback(() => {
    const updatedModel = new CostModel(businessType);
    
    // Add direct costs
    directCosts.forEach(cost => {
      if (isValidDirectCost(cost)) {
        updatedModel.addDirectCost(cost.name, cost.amount, cost.unit);
      }
    });
    
    // Add indirect costs
    indirectCosts.forEach(cost => {
      if (isValidIndirectCost(cost)) {
        updatedModel.addIndirectCost(cost.name, cost.amount, cost.period);
      }
    });
    
    // Add time costs
    timeCosts.forEach(cost => {
      if (isValidTimeCost(cost)) {
        updatedModel.addTimeCost(cost.name, cost.rate, cost.hours);
      }
    });
    
    // Set target margin and expected volume
    updatedModel.setTargetMargin(targetMargin);
    updatedModel.setExpectedVolume(expectedVolume);
    
    // Update cost model
    setCostModel(updatedModel);
    
    // Update cost breakdown
    setCostBreakdown(updatedModel.getCostBreakdown());
    
    // Reset dirty flag
    setIsDirty(false);
    
    return updatedModel;
  }, [businessType, directCosts, indirectCosts, timeCosts, targetMargin, expectedVolume]);
  
  /**
   * Effect to update cost model when state changes
   */
  useEffect(() => {
    if (isDirty) {
      updateCostModel();
    }
  }, [isDirty, updateCostModel]);
  
  /**
   * Handle business type change
   * @param {string} type - New business type
   */
  const handleBusinessTypeChange = (type) => {
    setBusinessType(type);
    setIsDirty(true);
  };
  
  /**
   * Add a new direct cost
   * @returns {Object} New direct cost object
   */
  const addDirectCost = () => {
    const newCost = { name: '', amount: '', unit: 'unit' };
    setDirectCosts([...directCosts, newCost]);
    setIsDirty(true);
    return newCost;
  };
  
  /**
   * Update a direct cost
   * @param {number} index - Index of cost to update
   * @param {Object} updatedCost - Updated cost object
   */
  const updateDirectCost = (index, updatedCost) => {
    const newCosts = [...directCosts];
    newCosts[index] = updatedCost;
    setDirectCosts(newCosts);
    setIsDirty(true);
  };
  
  /**
   * Remove a direct cost
   * @param {number} index - Index of cost to remove
   */
  const removeDirectCost = (index) => {
    const newCosts = [...directCosts];
    newCosts.splice(index, 1);
    setDirectCosts(newCosts);
    setIsDirty(true);
  };
  
  /**
   * Add a new indirect cost
   * @returns {Object} New indirect cost object
   */
  const addIndirectCost = () => {
    const newCost = { name: '', amount: '', period: 'month' };
    setIndirectCosts([...indirectCosts, newCost]);
    setIsDirty(true);
    return newCost;
  };
  
  /**
   * Update an indirect cost
   * @param {number} index - Index of cost to update
   * @param {Object} updatedCost - Updated cost object
   */
  const updateIndirectCost = (index, updatedCost) => {
    const newCosts = [...indirectCosts];
    newCosts[index] = updatedCost;
    setIndirectCosts(newCosts);
    setIsDirty(true);
  };
  
  /**
   * Remove an indirect cost
   * @param {number} index - Index of cost to remove
   */
  const removeIndirectCost = (index) => {
    const newCosts = [...indirectCosts];
    newCosts.splice(index, 1);
    setIndirectCosts(newCosts);
    setIsDirty(true);
  };
  
  /**
   * Add a new time cost
   * @returns {Object} New time cost object
   */
  const addTimeCost = () => {
    const newCost = { name: '', rate: '', hours: '' };
    setTimeCosts([...timeCosts, newCost]);
    setIsDirty(true);
    return newCost;
  };
  
  /**
   * Update a time cost
   * @param {number} index - Index of cost to update
   * @param {Object} updatedCost - Updated cost object
   */
  const updateTimeCost = (index, updatedCost) => {
    const newCosts = [...timeCosts];
    newCosts[index] = updatedCost;
    setTimeCosts(newCosts);
    setIsDirty(true);
  };
  
  /**
   * Remove a time cost
   * @param {number} index - Index of cost to remove
   */
  const removeTimeCost = (index) => {
    const newCosts = [...timeCosts];
    newCosts.splice(index, 1);
    setTimeCosts(newCosts);
    setIsDirty(true);
  };
  
  /**
   * Update target margin
   * @param {number} margin - New target margin
   */
  const handleTargetMarginChange = (margin) => {
    setTargetMargin(Number(margin));
    setIsDirty(true);
  };
  
  /**
   * Update expected volume
   * @param {number} volume - New expected volume
   */
  const handleExpectedVolumeChange = (volume) => {
    setExpectedVolume(Number(volume));
    setIsDirty(true);
  };
  
  /**
   * Get a industry template
   * @param {string} industry - Industry type
   * @returns {Object} Cost model with industry template
   */
  const loadIndustryTemplate = (industry) => {
    const templateModel = CostModel.getIndustryTemplate(industry);
    
    setBusinessType(templateModel.businessType);
    setDirectCosts([...templateModel.directCosts]);
    setIndirectCosts([...templateModel.indirectCosts]);
    setTimeCosts([...templateModel.timeCosts]);
    setTargetMargin(templateModel.targetMargin);
    setExpectedVolume(templateModel.expectedVolume);
    
    setIsDirty(true);
    
    return templateModel;
  };
  
  /**
   * Validate all cost inputs
   * @returns {boolean} True if all inputs are valid
   */
  const validateAllInputs = () => {
    const validationErrors = {};
    
    // Validate direct costs
    directCosts.forEach((cost, index) => {
      if (!isValidDirectCost(cost)) {
        validationErrors[`directCost_${index}`] = true;
      }
    });
    
    // Validate indirect costs
    indirectCosts.forEach((cost, index) => {
      if (!isValidIndirectCost(cost)) {
        validationErrors[`indirectCost_${index}`] = true;
      }
    });
    
    // Validate time costs
    timeCosts.forEach((cost, index) => {
      if (!isValidTimeCost(cost)) {
        validationErrors[`timeCost_${index}`] = true;
      }
    });
    
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
  
  /**
   * Get the current cost structure as an exportable object
   * @returns {Object} Cost structure object
   */
  const getCostStructure = () => {
    return {
      businessType,
      directCosts: [...directCosts],
      indirectCosts: [...indirectCosts],
      timeCosts: [...timeCosts],
      targetMargin,
      expectedVolume
    };
  };
  
  /**
   * Force a recalculation of the cost breakdown
   */
  const recalculateCostBreakdown = () => {
    const updatedModel = updateCostModel();
    setCostBreakdown(updatedModel.getCostBreakdown());
  };
  
  return {
    // State
    costModel,
    businessType,
    directCosts,
    indirectCosts,
    timeCosts,
    targetMargin,
    expectedVolume,
    costBreakdown,
    errors,
    
    // Handlers
    handleBusinessTypeChange,
    addDirectCost,
    updateDirectCost,
    removeDirectCost,
    addIndirectCost,
    updateIndirectCost,
    removeIndirectCost,
    addTimeCost,
    updateTimeCost,
    removeTimeCost,
    handleTargetMarginChange,
    handleExpectedVolumeChange,
    loadIndustryTemplate,
    validateAllInputs,
    getCostStructure,
    recalculateCostBreakdown
  };
};

export default useCostAnalysis;