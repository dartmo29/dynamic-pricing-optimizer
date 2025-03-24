/**
 * PricingModel.js
 * Handles calculations for different pricing strategies and recommendations
 */

/**
 * Pricing strategy class for generating optimal pricing recommendations
 */
class PricingModel {
  constructor(costModel) {
    this.costModel = costModel;
    this.competitors = [];
    this.valueFactors = [];
    this.customerSegments = [];
    this.marketPosition = 'mid-market'; // 'budget', 'mid-market', 'premium'
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
   */
  addCustomerSegment(name, size, priceElasticity) {
    this.customerSegments.push({
      name,
      size: Number(size),
      priceElasticity: Number(priceElasticity)
    });
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
   * Get price recommendation for a specific strategy
   * @param {string} strategy - 'cost-plus', 'competitor', 'value', 'optimal'
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
        
      case 'optimal':
      default:
        // Weight the strategies based on available data
        let weights = {
          costPlus: 0.4,
          competitor: 0.3,
          value: 0.3
        };
        
        // Adjust weights based on data quality
        if (this.competitors.length < 2) weights.competitor = 0.1;
        if (this.valueFactors.length < 2) weights.value = 0.1;
        
        // Normalize weights
        const totalWeight = weights.costPlus + weights.competitor + weights.value;
        weights = {
          costPlus: weights.costPlus / totalWeight,
          competitor: weights.competitor / totalWeight,
          value: weights.value / totalWeight
        };
        
        // Calculate weighted price
        price = (
          this.calculateCostPlusPrice() * weights.costPlus +
          this.calculateCompetitorIndexedPrice() * weights.competitor +
          this.calculateValueBasedPrice() * weights.value
        );
        
        explanation = `This optimal price balances your cost structure, competitive positioning, and value differentiation to maximize long-term profitability.`;
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
      optimal: this.getPriceRecommendation('optimal')
    };
  }

  /**
   * Calculate price sensitivity based on customer segments
   * @returns {number} Overall price sensitivity score (1-10)
   */
  calculatePriceSensitivity() {
    if (this.customerSegments.length === 0) return 5; // Default medium sensitivity
    
    return this.customerSegments.reduce(
      (sum, segment) => sum + (segment.priceElasticity * segment.size), 0
    ) / this.customerSegments.reduce((sum, segment) => sum + segment.size, 0);
  }

  /**
   * Generate implementation guidance based on recommendations
   * @param {string} selectedStrategy - The strategy selected by the user
   * @returns {Object} Implementation guidance
   */
  getImplementationGuidance(selectedStrategy = 'optimal') {
    const recommendation = this.getPriceRecommendation(selectedStrategy);
    const priceSensitivity = this.calculatePriceSensitivity();
    
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
    
    if (priceSensitivity > 7) {
      steps.push({
        title: "Create tiered offerings",
        description: "Consider creating good/better/best options to capture price-sensitive segments."
      });
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
      communicationTips: this.getPriceCommunicationTips(selectedStrategy)
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
    }
    
    return tips;
  }
}

export default PricingModel;