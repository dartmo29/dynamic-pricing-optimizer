/**
 * CustomerSegmentModel.js
 * Handles customer segmentation and price elasticity modeling
 */

/**
 * Customer segment class for managing and calculating price elasticity
 */
class CustomerSegmentModel {
  constructor() {
    this.segments = [];
    this.defaultElasticity = -1.5; // Default price elasticity of demand (negative value)
  }

  /**
   * Add a customer segment
   * 
   * @param {string} name - Segment name
   * @param {number} size - Relative size (percentage or absolute number)
   * @param {number} priceElasticity - Price sensitivity (-10 to 0 scale, -10 being most elastic)
   * @param {string} description - Optional description
   * @returns {string} New segment ID
   */
  addSegment(name, size, priceElasticity, description = '') {
    const id = Date.now().toString();
    
    this.segments.push({
      id,
      name,
      size: Number(size),
      priceElasticity: Number(priceElasticity),
      description,
      willingness: this.calculateWillingnessToPay(priceElasticity)
    });
    
    return id;
  }

  /**
   * Update an existing segment
   * 
   * @param {string} id - Segment ID
   * @param {Object} data - Updated segment data
   * @returns {boolean} Success flag
   */
  updateSegment(id, data) {
    const index = this.segments.findIndex(segment => segment.id === id);
    
    if (index === -1) return false;
    
    this.segments[index] = {
      ...this.segments[index],
      ...data
    };

    // Recalculate willingness to pay if price elasticity changed
    if (data.priceElasticity !== undefined) {
      this.segments[index].willingness = this.calculateWillingnessToPay(data.priceElasticity);
    }
    
    return true;
  }

  /**
   * Remove a segment
   * 
   * @param {string} id - Segment ID
   * @returns {boolean} Success flag
   */
  removeSegment(id) {
    const initialLength = this.segments.length;
    this.segments = this.segments.filter(segment => segment.id !== id);
    return this.segments.length < initialLength;
  }

  /**
   * Get a specific segment
   * 
   * @param {string} id - Segment ID
   * @returns {Object|null} Segment data or null if not found
   */
  getSegment(id) {
    return this.segments.find(segment => segment.id === id) || null;
  }

  /**
   * Calculate willingness to pay factor based on price elasticity
   * 
   * @param {number} elasticity - Price elasticity value
   * @returns {number} Willingness to pay factor (0-2, where 1 is average)
   */
  calculateWillingnessToPay(elasticity) {
    // Convert elasticity (typically -10 to 0 scale) to willingness factor
    // Where 0 = extremely price sensitive, 2 = price insensitive
    
    // Normalize elasticity to a 0-1 scale (assuming input range of -10 to 0)
    const normalized = Math.min(Math.max(elasticity, -10), 0) / -10;
    
    // Convert to 0-2 scale where 1 is average willingness
    return 2 - normalized * 2;
  }

  /**
   * Calculate weighted elasticity across all segments
   * 
   * @returns {number} Weighted elasticity value
   */
  calculateWeightedElasticity() {
    if (this.segments.length === 0) return this.defaultElasticity;
    
    const totalSize = this.segments.reduce((sum, segment) => sum + segment.size, 0);
    
    if (totalSize === 0) return this.defaultElasticity;
    
    const weightedSum = this.segments.reduce(
      (sum, segment) => sum + (segment.priceElasticity * segment.size),
      0
    );
    
    return weightedSum / totalSize;
  }

  /**
   * Calculate demand at a given price
   * 
   * @param {number} price - Price to evaluate
   * @param {number} basePrice - Reference base price
   * @param {number} baseDemand - Reference demand at base price
   * @returns {number} Estimated demand at the given price
   */
  calculateDemandAtPrice(price, basePrice, baseDemand) {
    const elasticity = this.calculateWeightedElasticity();
    
    if (price === basePrice) return baseDemand;
    
    // Standard elasticity formula: %ΔQ/%ΔP = elasticity
    // %ΔP = (price - basePrice) / basePrice
    // %ΔQ = elasticity * %ΔP
    // newDemand = baseDemand * (1 + %ΔQ)
    
    const percentPriceChange = (price - basePrice) / basePrice;
    const percentDemandChange = elasticity * percentPriceChange;
    
    return baseDemand * (1 + percentDemandChange);
  }

  /**
   * Calculate optimal price for revenue maximization
   * 
   * @param {number} minPrice - Minimum viable price
   * @param {number} basePrice - Reference price
   * @param {number} baseDemand - Reference demand at base price
   * @returns {Object} Optimal price and expected demand
   */
  calculateOptimalPrice(minPrice, basePrice, baseDemand) {
    const elasticity = this.calculateWeightedElasticity();
    
    // For constant elasticity, revenue is maximized when elasticity = -1
    // If our elasticity is already -1, the current price is optimal
    // Otherwise, calculate the price adjustment needed
    
    if (elasticity === -1) {
      return {
        price: basePrice,
        demand: baseDemand,
        revenue: basePrice * baseDemand
      };
    }
    
    // For elasticity != -1, optimal markup is e/(e+1) where e is elasticity
    // This assumes constant elasticity, which is a simplification
    
    // Ensure minimum price is respected
    let optimalPrice = Math.max(
      basePrice * Math.abs(elasticity / (elasticity + 1)),
      minPrice
    );
    
    // If price elasticity is too close to -1, limit the price change to avoid extreme values
    if (elasticity > -1.05 && elasticity < -0.95) {
      optimalPrice = basePrice * 1.05; // Slight increase
    }
    
    const optimalDemand = this.calculateDemandAtPrice(optimalPrice, basePrice, baseDemand);
    
    return {
      price: optimalPrice,
      demand: optimalDemand,
      revenue: optimalPrice * optimalDemand
    };
  }

  /**
   * Calculate price for different segments
   * 
   * @param {number} basePrice - Standard price point
   * @returns {Array} Price recommendations for each segment
   */
  calculateSegmentPrices(basePrice) {
    return this.segments.map(segment => {
      // Adjust price based on willingness to pay
      // If willingness is 1, use base price
      // If willingness is 0, use a discount
      // If willingness is 2, use a premium
      
      const priceMultiplier = 0.5 + (segment.willingness * 0.5);
      const price = basePrice * priceMultiplier;
      
      return {
        id: segment.id,
        name: segment.name,
        priceElasticity: segment.priceElasticity,
        recommendedPrice: price,
        discount: price < basePrice ? ((basePrice - price) / basePrice) * 100 : 0,
        premium: price > basePrice ? ((price - basePrice) / basePrice) * 100 : 0,
        willingness: segment.willingness
      };
    });
  }

  /**
   * Generate sample customer segments for demonstration
   * 
   * @param {string} industry - Industry type
   * @returns {CustomerSegmentModel} Model with sample segments
   */
  static getSampleSegments(industry = 'general') {
    const model = new CustomerSegmentModel();
    
    switch (industry) {
      case 'saas':
        model.addSegment('Enterprise', 30, -0.8, 'Large organizations with complex needs');
        model.addSegment('Mid-market', 40, -1.2, 'Medium-sized businesses');
        model.addSegment('Small business', 20, -2.5, 'Price-sensitive small businesses');
        model.addSegment('Startups', 10, -4.0, 'Early-stage companies with tight budgets');
        break;
        
      case 'retail':
        model.addSegment('Luxury', 15, -0.5, 'Brand-loyal, quality-focused customers');
        model.addSegment('Mainstream', 55, -1.8, 'Value-conscious regular shoppers');
        model.addSegment('Budget', 30, -5.0, 'Price-driven discount shoppers');
        break;
        
      case 'service':
        model.addSegment('Premium', 25, -0.7, 'High-end service seekers');
        model.addSegment('Standard', 60, -1.5, 'Average service needs');
        model.addSegment('Basic', 15, -3.0, 'Essential service only');
        break;
        
      case 'general':
      default:
        model.addSegment('High-end', 20, -0.6, 'Low price sensitivity');
        model.addSegment('Mid-tier', 50, -1.5, 'Moderate price sensitivity');
        model.addSegment('Budget', 30, -3.0, 'High price sensitivity');
        break;
    }
    
    return model;
  }
}

export default CustomerSegmentModel;