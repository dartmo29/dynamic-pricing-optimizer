/**
 * calculators.js
 * Utility functions for common calculations
 */

/**
 * Calculate margin from price and cost
 * @param {number} price - Selling price
 * @param {number} cost - Cost per unit
 * @returns {number} Margin as a decimal (0.30 = 30%)
 */
export const calculateMargin = (price, cost) => {
  if (!price || price <= 0 || !cost) return 0;
  return (price - cost) / price;
};

/**
 * Calculate markup from cost and desired margin
 * @param {number} cost - Cost per unit
 * @param {number} margin - Desired margin as a decimal (0.30 = 30%)
 * @returns {number} Price that achieves the desired margin
 */
export const calculatePriceFromMargin = (cost, margin) => {
  if (!cost || cost <= 0 || margin >= 1) return 0;
  return cost / (1 - margin);
};

/**
 * Calculate markup percentage from price and cost
 * @param {number} price - Selling price
 * @param {number} cost - Cost per unit
 * @returns {number} Markup percentage as a decimal (0.50 = 50%)
 */
export const calculateMarkupPercentage = (price, cost) => {
  if (!price || !cost || cost <= 0) return 0;
  return (price - cost) / cost;
};

/**
 * Calculate price from cost and markup percentage
 * @param {number} cost - Cost per unit
 * @param {number} markupPercentage - Markup percentage as a decimal (0.50 = 50%)
 * @returns {number} Price with the specified markup
 */
export const calculatePriceFromMarkup = (cost, markupPercentage) => {
  if (!cost || cost <= 0 || !markupPercentage) return 0;
  return cost * (1 + markupPercentage);
};

/**
 * Calculate break-even volume
 * @param {number} fixedCosts - Total fixed costs
 * @param {number} price - Selling price per unit
 * @param {number} variableCost - Variable cost per unit
 * @returns {number} Break-even volume in units
 */
export const calculateBreakEvenVolume = (fixedCosts, price, variableCost) => {
  if (!fixedCosts || !price || !variableCost || price <= variableCost) return Infinity;
  return fixedCosts / (price - variableCost);
};

/**
 * Calculate break-even price
 * @param {number} fixedCosts - Total fixed costs
 * @param {number} volume - Expected sales volume
 * @param {number} variableCost - Variable cost per unit
 * @returns {number} Break-even price per unit
 */
export const calculateBreakEvenPrice = (fixedCosts, volume, variableCost) => {
  if (!fixedCosts || !volume || volume <= 0 || !variableCost) return 0;
  return variableCost + (fixedCosts / volume);
};

/**
 * Calculate profit
 * @param {number} price - Selling price per unit
 * @param {number} cost - Cost per unit
 * @param {number} volume - Sales volume
 * @returns {number} Total profit
 */
export const calculateProfit = (price, cost, volume) => {
  if (!price || !cost || !volume) return 0;
  return (price - cost) * volume;
};

/**
 * Calculate revenue
 * @param {number} price - Selling price per unit
 * @param {number} volume - Sales volume
 * @returns {number} Total revenue
 */
export const calculateRevenue = (price, volume) => {
  if (!price || !volume) return 0;
  return price * volume;
};

/**
 * Calculate total cost
 * @param {number} fixedCosts - Total fixed costs
 * @param {number} variableCost - Variable cost per unit
 * @param {number} volume - Sales volume
 * @returns {number} Total cost
 */
export const calculateTotalCost = (fixedCosts, variableCost, volume) => {
  if (!fixedCosts || !variableCost || !volume) return 0;
  return fixedCosts + (variableCost * volume);
};

/**
 * Calculate average cost per unit
 * @param {number} fixedCosts - Total fixed costs
 * @param {number} variableCost - Variable cost per unit
 * @param {number} volume - Sales volume
 * @returns {number} Average cost per unit
 */
export const calculateAverageCost = (fixedCosts, variableCost, volume) => {
  if (!fixedCosts || !variableCost || !volume || volume <= 0) return 0;
  return (fixedCosts / volume) + variableCost;
};

/**
 * Calculate ROI (Return on Investment)
 * @param {number} profit - Net profit
 * @param {number} investment - Initial investment
 * @returns {number} ROI as a decimal (0.20 = 20%)
 */
export const calculateROI = (profit, investment) => {
  if (!profit || !investment || investment <= 0) return 0;
  return profit / investment;
};

/**
 * Calculate payback period
 * @param {number} investment - Initial investment
 * @param {number} annualProfit - Annual profit
 * @returns {number} Payback period in years
 */
export const calculatePaybackPeriod = (investment, annualProfit) => {
  if (!investment || !annualProfit || annualProfit <= 0) return Infinity;
  return investment / annualProfit;
};

/**
 * Calculate price elasticity of demand
 * @param {number} percentChangeQuantity - Percentage change in quantity (decimal)
 * @param {number} percentChangePrice - Percentage change in price (decimal)
 * @returns {number} Price elasticity of demand
 */
export const calculatePriceElasticity = (percentChangeQuantity, percentChangePrice) => {
  if (!percentChangeQuantity || !percentChangePrice || percentChangePrice === 0) return 0;
  return Math.abs(percentChangeQuantity / percentChangePrice);
};

/**
 * Calculate optimal price for maximizing revenue with known elasticity
 * @param {number} currentPrice - Current price
 * @param {number} elasticity - Price elasticity of demand
 * @returns {number} Optimal price for revenue maximization
 */
export const calculateOptimalPrice = (currentPrice, elasticity) => {
  if (!currentPrice || !elasticity || elasticity <= 1) return currentPrice;
  return currentPrice * (elasticity / (elasticity - 1));
};

/**
 * Calculate weighted average
 * @param {Array} values - Array of values to average
 * @param {Array} weights - Array of weights
 * @returns {number} Weighted average
 */
export const calculateWeightedAverage = (values, weights) => {
  if (!values || !weights || values.length !== weights.length || values.length === 0) return 0;
  
  const weightSum = weights.reduce((sum, weight) => sum + weight, 0);
  if (weightSum === 0) return 0;
  
  const weightedSum = values.reduce((sum, value, index) => sum + (value * weights[index]), 0);
  return weightedSum / weightSum;
};

/**
 * Calculate price from a base price and percentage change
 * @param {number} basePrice - Base price
 * @param {number} percentageChange - Percentage change as decimal (0.10 = 10%)
 * @returns {number} New price after applying percentage change
 */
export const calculatePriceChange = (basePrice, percentageChange) => {
  if (!basePrice) return 0;
  return basePrice * (1 + percentageChange);
};

/**
 * Calculate percentage difference between two values
 * @param {number} value1 - First value
 * @param {number} value2 - Second value
 * @returns {number} Percentage difference as decimal (0.10 = 10%)
 */
export const calculatePercentageDifference = (value1, value2) => {
  if (!value1 || !value2 || (value1 === 0 && value2 === 0)) return 0;
  const average = (Math.abs(value1) + Math.abs(value2)) / 2;
  return (Math.abs(value1 - value2)) / average;
};

/**
 * Calculate percentage change from a base value to a new value
 * @param {number} baseValue - Base value
 * @param {number} newValue - New value
 * @returns {number} Percentage change as decimal (0.10 = 10%)
 */
export const calculatePercentageChange = (baseValue, newValue) => {
  if (!baseValue || baseValue === 0) return 0;
  return (newValue - baseValue) / baseValue;
};
