/**
 * usePricingStrategy.js
 * Custom hook for managing pricing strategy state and calculations
 */

import { useState, useEffect, useCallback } from 'react';
import PricingModel from '../models/PricingModel';
import { 
  isValidCompetitor, 
  isValidValueFactor, 
  isValidCustomerSegment 
} from '../utils/validators';

/**
 * Custom hook for managing pricing strategies
 * @param {Object} costModel - CostModel instance
 * @returns {Object} Pricing strategy state and handlers
 */
const usePricingStrategy = (costModel) => {
  // Initialize pricing model
  const [pricingModel, setPricingModel] = useState(() => {
    return costModel ? new PricingModel(costModel) : null;
  });
  
  // State for market positioning
  const [marketPosition, setMarketPosition] = useState(pricingModel ? pricingModel.marketPosition : 'mid-market');
  
  // State for competitors
  const [competitors, setCompetitors] = useState(pricingModel ? pricingModel.competitors : []);
  
  // State for value factors
  const [valueFactors, setValueFactors] = useState(pricingModel ? pricingModel.valueFactors : []);
  
  // State for customer segments
  const [customerSegments, setCustomerSegments] = useState(pricingModel ? pricingModel.customerSegments : []);
  
  // State for pricing recommendations
  const [priceRecommendations, setPriceRecommendations] = useState({});
  
  // State for selected strategy
  const [selectedStrategy, setSelectedStrategy] = useState('optimal');
  
  // State for implementation guidance
  const [implementationGuidance, setImplementationGuidance] = useState(null);
  
  // State to track if the pricing model has been modified
  const [isDirty, setIsDirty] = useState(false);
  
  // State for validation errors
  const [errors, setErrors] = useState({});
  
  /**
   * Effect to set pricing model when cost model changes
   */
  useEffect(() => {
    if (costModel) {
      setPricingModel(new PricingModel(costModel));
      setIsDirty(true);
    }
  }, [costModel]);
  
  /**
   * Update the pricing model with current state values
   */
  const updatePricingModel = useCallback(() => {
    if (!costModel) return null;
    
    const updatedModel = new PricingModel(costModel);
    
    // Set market position
    updatedModel.setMarketPosition(marketPosition);
    
    // Add competitors
    competitors.forEach(competitor => {
      if (isValidCompetitor(competitor)) {
        updatedModel.addCompetitor(competitor.name, competitor.price, competitor.attributes);
      }
    });
    
    // Add value factors
    valueFactors.forEach(factor => {
      if (isValidValueFactor(factor)) {
        updatedModel.addValueFactor(factor.name, factor.importance, factor.score);
      }
    });
    
    // Add customer segments
    customerSegments.forEach(segment => {
      if (isValidCustomerSegment(segment)) {
        updatedModel.addCustomerSegment(segment.name, segment.size, segment.priceElasticity);
      }
    });
    
    // Update pricing model
    setPricingModel(updatedModel);
    
    // Generate new price recommendations
    const recommendations = {
      'cost-plus': updatedModel.getPriceRecommendation('cost-plus'),
      'competitor': updatedModel.getPriceRecommendation('competitor'),
      'value': updatedModel.getPriceRecommendation('value'),
      'optimal': updatedModel.getPriceRecommendation('optimal')
    };
    
    setPriceRecommendations(recommendations);
    
    // Generate implementation guidance for selected strategy
    setImplementationGuidance(updatedModel.getImplementationGuidance(selectedStrategy));
    
    // Reset dirty flag
    setIsDirty(false);
    
    return updatedModel;
  }, [costModel, marketPosition, competitors, valueFactors, customerSegments, selectedStrategy]);
  
  /**
   * Effect to update pricing model when state changes
   */
  useEffect(() => {
    if (isDirty) {
      updatePricingModel();
    }
  }, [isDirty, updatePricingModel]);
  
  /**
   * Handle market position change
   * @param {string} position - New market position
   */
  const handleMarketPositionChange = (position) => {
    setMarketPosition(position);
    setIsDirty(true);
  };
  
  /**
   * Add a new competitor
   * @returns {Object} New competitor object
   */
  const addCompetitor = () => {
    const newCompetitor = { name: '', price: '', attributes: {} };
    setCompetitors([...competitors, newCompetitor]);
    setIsDirty(true);
    return newCompetitor;
  };
  
  /**
   * Update a competitor
   * @param {number} index - Index of competitor to update
   * @param {Object} updatedCompetitor - Updated competitor object
   */
  const updateCompetitor = (index, updatedCompetitor) => {
    const newCompetitors = [...competitors];
    newCompetitors[index] = updatedCompetitor;
    setCompetitors(newCompetitors);
    setIsDirty(true);
  };
  
  /**
   * Remove a competitor
   * @param {number} index - Index of competitor to remove
   */
  const removeCompetitor = (index) => {
    const newCompetitors = [...competitors];
    newCompetitors.splice(index, 1);
    setCompetitors(newCompetitors);
    setIsDirty(true);
  };
  
  /**
   * Add a new value factor
   * @returns {Object} New value factor object
   */
  const addValueFactor = () => {
    const newFactor = { name: '', importance: 5, score: 7 };
    setValueFactors([...valueFactors, newFactor]);
    setIsDirty(true);
    return newFactor;
  };
  
  /**
   * Update a value factor
   * @param {number} index - Index of factor to update
   * @param {Object} updatedFactor - Updated factor object
   */
  const updateValueFactor = (index, updatedFactor) => {
    const newFactors = [...valueFactors];
    newFactors[index] = updatedFactor;
    setValueFactors(newFactors);
    setIsDirty(true);
  };
  
  /**
   * Remove a value factor
   * @param {number} index - Index of factor to remove
   */
  const removeValueFactor = (index) => {
    const newFactors = [...valueFactors];
    newFactors.splice(index, 1);
    setValueFactors(newFactors);
    setIsDirty(true);
  };
  
  /**
   * Add a new customer segment
   * @returns {Object} New customer segment object
   */
  const addCustomerSegment = () => {
    const newSegment = { name: '', size: 100, priceElasticity: 5 };
    setCustomerSegments([...customerSegments, newSegment]);
    setIsDirty(true);
    return newSegment;
  };
  
  /**
   * Update a customer segment
   * @param {number} index - Index of segment to update
   * @param {Object} updatedSegment - Updated segment object
   */
  const updateCustomerSegment = (index, updatedSegment) => {
    const newSegments = [...customerSegments];
    newSegments[index] = updatedSegment;
    setCustomerSegments(newSegments);
    setIsDirty(true);
  };
  
  /**
   * Remove a customer segment
   * @param {number} index - Index of segment to remove
   */
  const removeCustomerSegment = (index) => {
    const newSegments = [...customerSegments];
    newSegments.splice(index, 1);
    setCustomerSegments(newSegments);
    setIsDirty(true);
  };
  
  /**
   * Select a pricing strategy
   * @param {string} strategy - Strategy to select
   */
  const selectStrategy = (strategy) => {
    setSelectedStrategy(strategy);
    
    // Update implementation guidance for new strategy
    if (pricingModel) {
      setImplementationGuidance(pricingModel.getImplementationGuidance(strategy));
    }
  };
  
  /**
   * Validate all inputs
   * @returns {boolean} True if all inputs are valid
   */
  const validateAllInputs = () => {
    const validationErrors = {};
    
    // Validate competitors
    competitors.forEach((competitor, index) => {
      if (!isValidCompetitor(competitor)) {
        validationErrors[`competitor_${index}`] = true;
      }
    });
    
    // Validate value factors
    valueFactors.forEach((factor, index) => {
      if (!isValidValueFactor(factor)) {
        validationErrors[`valueFactor_${index}`] = true;
      }
    });
    
    // Validate customer segments
    customerSegments.forEach((segment, index) => {
      if (!isValidCustomerSegment(segment)) {
        validationErrors[`customerSegment_${index}`] = true;
      }
    });
    
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
  
  /**
   * Get current pricing strategy settings as an exportable object
   * @returns {Object} Pricing strategy object
   */
  const getPricingStrategySettings = () => {
    return {
      marketPosition,
      competitors: [...competitors],
      valueFactors: [...valueFactors],
      customerSegments: [...customerSegments],
      selectedStrategy
    };
  };
  
  /**
   * Force a recalculation of price recommendations
   */
  const recalculateRecommendations = () => {
    updatePricingModel();
  };
  
  return {
    // State
    pricingModel,
    marketPosition,
    competitors,
    valueFactors,
    customerSegments,
    priceRecommendations,
    selectedStrategy,
    implementationGuidance,
    errors,
    
    // Handlers
    handleMarketPositionChange,
    addCompetitor,
    updateCompetitor,
    removeCompetitor,
    addValueFactor,
    updateValueFactor,
    removeValueFactor,
    addCustomerSegment,
    updateCustomerSegment,
    removeCustomerSegment,
    selectStrategy,
    validateAllInputs,
    getPricingStrategySettings,
    recalculateRecommendations
  };
};

export default usePricingStrategy;