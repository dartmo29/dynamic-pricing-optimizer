/**
 * PricingModel.js
 * Handles calculations for different pricing strategies and recommendations
 */

import CustomerSegmentModel from './CustomerSegmentModel';

/**
 * Pricing strategy class for generating optimal pricing recommendations
 */
class PricingModel {
  constructor(costModel) {
    this.costModel = costModel;
    this.competitors = [];
    this.valueFactors = [];
    this.customerSegmentModel = new CustomerSegmentModel();
    this.marketPosition = 'mid-market'; // 'budget', 'mid-market', 'premium'
    this.baseDemand = 100; // Default reference demand
  }

  /**
   * Add a competitor for market comparison
   * @param {string} name - Competitor name
   * @param {number} price - Competitor price
   * @param {Object} attributes - Value attributes scoring (1-10)
   */
  addCompetitor(name, price, attributes = {}) {
    this.competitors.push({
      name,
      price: Number(price),
      attributes,
      overallValue: this.calculateOverallValue(attributes)
    });
  }

  /**
   * Calculate overall value score from attributes
   * @param {Object} attributes - Value attributes with scores
   * @returns {number} Overall value score
   */
  calculateOverallValue(attributes) {
    if (Object.keys(attributes).length === 0) return 5; // Default mid-value
    
    const values = Object.values(attributes);
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  /**
   * Add a value factor that differentiates your offering
   * @param {string} name - Value factor name
   * @param {number} importance - Importance to customers (1-10)
   * @param {number} score - Your score on this factor (1-10)
   */
  addValueFactor(name, importance, score) {
    this.valueFactors.push({
      name,
      importance: Number(importance),
      score: Number(score)
    });
  }

  /**
   * Add a customer segment
   * @param {string} name - Segment name
   * @param {number} size - Relative size (percentage or absolute)
   * @param {number} priceElasticity - Price sensitivity (1-10, 10 being most sensitive)
   * @param {string} description - Optional description
   * @returns {string} New segment ID
   */
  addCustomerSegment(name, size, priceElasticity, description = '') {
    // Convert priceElasticity from 1-10 scale to -10 to 0 scale
    // Where 1 = least sensitive (-0.5) and 10 = most sensitive (-10)
    const elasticity = -((priceElasticity / 10) * 9.5 + 0.5);
    return this.customerSegmentModel.addSegment(name, size, elasticity, description);
  }

  /**
   * Set base demand for elasticity calculations
   * @param {number} demand - Base demand at current price
   */
  setBaseDemand(demand) {
    this.baseDemand = Number(demand);
  }

  /**
   * Set desired market position
   * @param {string} position - 'budget', 'mid-market', or 'premium'
   */
  setMarketPosition(position) {
    if (['budget', 'mid-market', 'premium'].includes(position)) {
      this.marketPosition = position;
    } else {
      throw new Error('Market position must be "budget", "mid-market", or "premium"');
    }
  }

  /**
   * Calculate cost-plus price
   * @param {number} marginMultiplier - Multiplier for base margin (default: 1)
   * @returns {number} Recommended price
   */
  calculateCostPlusPrice(marginMultiplier = 1) {
    // Base price using cost and target margin
    const baseMinimumPrice = this.costModel.calculateMinimumViablePrice();
    
    // Apply market position adjustments
    const positionMultipliers = {
      'budget': 0.9,
      'mid-market': 1.0,
      'premium': 1.2
    };
    
    return baseMinimumPrice * positionMultipliers[this.marketPosition] * marginMultiplier;
  }

  /**
   * Calculate competitor-indexed price
   * @returns {number} Recommended price
   */
  calculateCompetitorIndexedPrice() {
    if (this.competitors.length === 0) {
      return this.calculateCostPlusPrice(); // Fall back to cost-plus
    }
    
    // Get average competitor price
    const avgCompetitorPrice = this.competitors.reduce(
      (sum, competitor) => sum + competitor.price, 0
    ) / this.competitors.length;
    
    // Calculate price based on desired market position
    const positionMultipliers = {
      'budget': 0.85,
      'mid-market': 1.0,
      'premium': 1.25
    };
    
    const basePrice = avgCompetitorPrice * positionMultipliers[this.marketPosition];
    
    // Ensure price covers costs with minimum margin
    const minimumViablePrice = this.costModel.calculateMinimumViablePrice();
    return Math.max(basePrice, minimumViablePrice);
  }

  /**
   * Calculate value-based price
   * @returns {number} Recommended price
   */
  calculateValueBasedPrice() {
    if (this.competitors.length === 0 || this.valueFactors.length === 0) {
      return this.calculateCostPlusPrice(); // Fall back to cost-plus
    }
    
    // Calculate your value score
    const valueScore = this.valueFactors.reduce(
      (sum, factor) => sum + (factor.importance * factor.score), 0
    ) / this.valueFactors.reduce((sum, factor) => sum + factor.importance, 0);
    
    // Calculate average competitor price and value
    const avgCompetitorPrice = this.competitors.reduce(
      (sum, competitor) => sum + competitor.price, 0
    ) / this.competitors.length;
    
    const avgCompetitorValue = this.competitors.reduce(
      (sum, competitor) => sum + competitor.overallValue, 0
    ) / this.competitors.length;
    
    // Calculate value-to-price ratio in the market
    const marketValueToPrice = avgCompetitorValue / avgCompetitorPrice;
    
    // Your price should reflect your relative value
    let valueBasedPrice = valueScore / marketValueToPrice;
    
    // Apply market position adjustment
    const positionMultipliers = {
      'budget': 0.9,
      'mid-market': 1.0,
      'premium': 1.15
    };
    
    valueBasedPrice *= positionMultipliers[this.marketPosition];
    
    // Ensure price covers costs with minimum margin
    const minimumViablePrice = this.costModel.calculateMinimumViablePrice();
    return Math.max(valueBasedPrice, minimumViablePrice);
  }

  /**
   * Calculate elasticity-based optimal price
   * @returns {number} Recommended price
   */
  calculateElasticityBasedPrice() {
    // Get the minimally viable price
    const minimumViablePrice = this.costModel.calculateMinimumViablePrice();
    
    // Get the base price (from competitor or cost analysis)
    const basePrice = this.competitors.length > 0 
      ? this.calculateCompetitorIndexedPrice() 
      : this.calculateCostPlusPrice();
    
    // Calculate optimal price using elasticity model
    const result = this.customerSegmentModel.calculateOptimalPrice(
      minimumViablePrice, 
      basePrice, 
      this.baseDemand
    );
    
    return result.price;
  }

  /**
   * Get price recommendation for a specific strategy
   * @param {string} strategy - 'cost-plus', 'competitor', 'value', 'elasticity', 'optimal'
   * @returns {Object} Price recommendation with explanation
   */
  getPriceRecommendation(strategy = 'optimal') {
    let price, explanation, confidenceLevel;
    
    switch (strategy) {
      case 'cost-plus':
        price = this.calculateCostPlusPrice();
        explanation = `Based on your cost structure and desired ${this.marketPosition} positioning, this price ensures your target margin of ${(this.costModel.targetMargin * 100).toFixed(0)}%.`;
        confidenceLevel = 0.8; // High confidence in cost calculations
        break;
        
      case 'competitor':
        price = this.calculateCompetitorIndexedPrice();
        explanation = `This price positions your offering in the ${this.marketPosition} segment relative to your competitors while ensuring profitability.`;
        confidenceLevel = this.competitors.length > 2 ? 0.7 : 0.5; // Confidence depends on number of competitors
        break;
        
      case 'value':
        price = this.calculateValueBasedPrice();
        explanation = `Based on your superior value in ${this.getTopValueFactors(2).join(' and ')}, this price reflects the premium value you provide.`;
        confidenceLevel = (this.competitors.length > 0 && this.valueFactors.length > 2) ? 0.75 : 0.4;
        break;

      case 'elasticity':
        price = this.calculateElasticityBasedPrice();
        explanation = `This price is optimized for revenue based on the price sensitivity of your customer segments.`;
        confidenceLevel = this.customerSegmentModel.segments.length > 0 ? 0.7 : 0.4;
        break;
        
      case 'optimal':
      default:
        // Weight the strategies based on available data
        let weights = {
          costPlus: 0.3,
          competitor: 0.25,
          value: 0.25,
          elasticity: 0.2
        };
        
        // Adjust weights based on data quality
        if (this.competitors.length < 2) weights.competitor = 0.1;
        if (this.valueFactors.length < 2) weights.value = 0.1;
        if (this.customerSegmentModel.segments.length === 0) weights.elasticity = 0.05;
        
        // Normalize weights
        const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
        Object.keys(weights).forEach(key => {
          weights[key] = weights[key] / totalWeight;
        });
        
        // Calculate weighted price
        price = (
          this.calculateCostPlusPrice() * weights.costPlus +
          this.calculateCompetitorIndexedPrice() * weights.competitor +
          this.calculateValueBasedPrice() * weights.value +
          this.calculateElasticityBasedPrice() * weights.elasticity
        );
        
        explanation = `This optimal price balances your cost structure, competitive positioning, value differentiation, and customer price sensitivity to maximize long-term profitability.`;
        confidenceLevel = 0.65; // Balanced confidence level
        break;
    }
    
    return {
      price: Math.round(price * 100) / 100, // Round to 2 decimal places
      explanation,
      confidenceLevel,
      margin: this.costModel.calculateMarginAtPrice(price),
      breakEvenVolume: this.costModel.calculateBreakEvenVolume(price)
    };
  }

  /**
   * Get price recommendations for each customer segment
   * @param {string} baseStrategy - Base strategy for reference price
   * @returns {Array} Price recommendations for each segment
   */
  getSegmentPriceRecommendations(baseStrategy = 'optimal') {
    // Get the base price recommendation
    const baseRecommendation = this.getPriceRecommendation(baseStrategy);
    const basePrice = baseRecommendation.price;
    
    // Calculate segment-specific prices
    const segmentPrices = this.customerSegmentModel.calculateSegmentPrices(basePrice);
    
    return {
      basePrice,
      baseStrategy,
      segmentPrices
    };
  }

  /**
   * Get top value factors by importance
   * @param {number} count - Number of factors to return
   * @returns {Array} Top value factor names
   */
  getTopValueFactors(count = 2) {
    const sortedFactors = [...this.valueFactors]
      .sort((a, b) => (b.importance * b.score) - (a.importance * a.score));
    
    return sortedFactors.slice(0, count).map(factor => factor.name);
  }

  /**
   * Generate price recommendations for all strategies
   * @returns {Object} Price recommendations for all strategies
   */
  getAllPriceRecommendations() {
    return {
      costPlus: this.getPriceRecommendation('cost-plus'),
      competitor: this.getPriceRecommendation('competitor'),
      value: this.getPriceRecommendation('value'),
      elasticity: this.getPriceRecommendation('elasticity'),
      optimal: this.getPriceRecommendation('optimal')
    };
  }

  /**
   * Calculate price sensitivity based on customer segments
   * @returns {number} Overall price sensitivity score (1-10)
   */
  calculatePriceSensitivity() {
    const elasticity = this.customerSegmentModel.calculateWeightedElasticity();
    
    // Convert elasticity (typically -10 to 0 scale) to sensitivity (1-10 scale)
    // Where -10 = extremely elastic = 10 sensitivity
    // And -0.5 = inelastic = 1 sensitivity
    
    return Math.min(10, Math.max(1, ((Math.abs(elasticity) - 0.5) / 9.5) * 9 + 1));
  }

  /**
   * Generate implementation guidance based on recommendations
   * @param {string} selectedStrategy - The strategy selected by the user
   * @returns {Object} Implementation guidance
   */
  getImplementationGuidance(selectedStrategy = 'optimal') {
    const recommendation = this.getPriceRecommendation(selectedStrategy);
    const priceSensitivity = this.calculatePriceSensitivity();
    const hasSegments = this.customerSegmentModel.segments.length > 0;
    
    // Generate appropriate implementation steps
    const steps = [];
    
    // Basic steps for any strategy
    steps.push({
      title: "Document your value proposition",
      description: "Clearly articulate why your price reflects the value you deliver."
    });
    
    // Add strategy-specific steps
    if (selectedStrategy === 'value') {
      steps.push({
        title: "Highlight key differentiators",
        description: `Emphasize your strengths in ${this.getTopValueFactors(2).join(' and ')} when communicating with prospects.`
      });
    }
    
    if (priceSensitivity > 7 || hasSegments) {
      steps.push({
        title: "Create tiered offerings",
        description: "Consider creating good/better/best options to capture price-sensitive segments."
      });
      
      // Add segment-specific recommendations if available
      if (hasSegments) {
        const segmentRecommendations = this.getSegmentPriceRecommendations(selectedStrategy);
        
        steps.push({
          title: "Implement segment-specific pricing",
          description: `Tailor your pricing for different segments based on their willingness to pay and needs.`
        });
      }
    }
    
    if (recommendation.price > this.calculateCostPlusPrice() * 1.2) {
      steps.push({
        title: "Strengthen proof points",
        description: "Collect case studies and testimonials that demonstrate your premium value."
      });
    }
    
    // Add testing recommendation
    steps.push({
      title: "Test your pricing",
      description: "Start with a small segment of prospects to validate this pricing approach."
    });
    
    return {
      recommendedPrice: recommendation.price,
      rationale: recommendation.explanation,
      estimatedMargin: recommendation.margin,
      implementationSteps: steps,
      communicationTips: this.getPriceCommunicationTips(selectedStrategy),
      segmentRecommendations: hasSegments ? this.getSegmentPriceRecommendations(selectedStrategy) : null
    };
  }

  /**
   * Generate communication tips for price discussions
   * @param {string} strategy - Chosen pricing strategy
   * @returns {Array} Communication tips
   */
  getPriceCommunicationTips(strategy) {
    const tips = [];
    
    // Common tips
    tips.push("Focus on value delivered rather than costs incurred");
    tips.push("Quantify ROI whenever possible to justify your pricing");
    
    // Strategy-specific tips
    switch (strategy) {
      case 'premium':
        tips.push("Emphasize unique capabilities that competitors can't match");
        tips.push("Highlight the risks/costs of choosing a lower-priced alternative");
        break;
        
      case 'competitor':
        tips.push("Create a comparison chart showing your advantages vs. similarly priced competitors");
        tips.push("Address potential objections about choosing you over established alternatives");
        break;
        
      case 'value':
        tips.push("Create case studies that demonstrate specific outcomes achieved");
        tips.push("Prepare ROI calculations customized to each prospect's situation");
        break;

      case 'elasticity':
        tips.push("Segment your messaging based on different customer groups");
        tips.push("Offer appropriate discounts or premiums based on segment price sensitivity");
        break;
    }
    
    return tips;
  }
}

export default PricingModel;