/**
 * CostModel.js
 * Handles all calculations related to cost structure and margin analysis
 */

/**
 * Cost structure class for managing and calculating business costs
 */
class CostModel {
  constructor(businessType = 'service') {
    this.businessType = businessType; // 'service', 'product', 'subscription'
    this.directCosts = [];
    this.indirectCosts = [];
    this.timeCosts = [];
    this.targetMargin = 0.30; // Default 30% target margin
    this.expectedVolume = 100; // Default expected volume
  }

  /**
   * Add a direct cost item (material, component, direct labor)
   * @param {string} name - Name of the cost item
   * @param {number} amount - Cost amount per unit
   * @param {string} unit - Unit of measurement (optional)
   */
  addDirectCost(name, amount, unit = 'unit') {
    this.directCosts.push({
      name,
      amount: Number(amount),
      unit
    });
  }

  /**
   * Add an indirect cost item (overhead, fixed expenses)
   * @param {string} name - Name of the cost item
   * @param {number} amount - Total cost amount
   * @param {string} period - Period this cost covers (month, year)
   */
  addIndirectCost(name, amount, period = 'month') {
    this.indirectCosts.push({
      name,
      amount: Number(amount),
      period
    });
  }

  /**
   * Add a time-based cost (for service businesses)
   * @param {string} name - Name of the resource (e.g., "Senior Developer")
   * @param {number} rate - Hourly rate
   * @param {number} hours - Hours per unit of service
   */
  addTimeCost(name, rate, hours) {
    this.timeCosts.push({
      name,
      rate: Number(rate),
      hours: Number(hours)
    });
  }

  /**
   * Set the target profit margin as a decimal (0.30 = 30%)
   * @param {number} margin - Target margin as decimal
   */
  setTargetMargin(margin) {
    this.targetMargin = Number(margin);
  }

  /**
   * Set the expected volume per period
   * @param {number} volume - Expected units/clients per period
   */
  setExpectedVolume(volume) {
    this.expectedVolume = Number(volume);
  }

  /**
   * Calculate total direct costs per unit
   * @returns {number} Total direct cost per unit
   */
  calculateTotalDirectCost() {
    return this.directCosts.reduce((total, cost) => total + cost.amount, 0);
  }

  /**
   * Calculate total time-based costs per unit/service
   * @returns {number} Total time cost per unit
   */
  calculateTotalTimeCost() {
    return this.timeCosts.reduce((total, cost) => total + (cost.rate * cost.hours), 0);
  }

  /**
   * Calculate allocated indirect cost per unit
   * @returns {number} Allocated indirect cost per unit
   */
  calculateAllocatedIndirectCost() {
    // Sum all monthly indirect costs
    const monthlyIndirectCosts = this.indirectCosts.reduce((total, cost) => {
      // Convert yearly costs to monthly
      const monthlyCost = cost.period === 'year' ? cost.amount / 12 : cost.amount;
      return total + monthlyCost;
    }, 0);

    // Divide by expected monthly volume to get per-unit allocation
    return monthlyIndirectCosts / this.expectedVolume;
  }

  /**
   * Calculate total cost per unit including all cost types
   * @returns {number} Total cost per unit
   */
  calculateTotalCostPerUnit() {
    const directCost = this.calculateTotalDirectCost();
    const timeCost = this.calculateTotalTimeCost();
    const indirectCost = this.calculateAllocatedIndirectCost();
    
    return directCost + timeCost + indirectCost;
  }

  /**
   * Calculate minimum viable price based on costs and target margin
   * @returns {number} Minimum price to achieve target margin
   */
  calculateMinimumViablePrice() {
    const totalCost = this.calculateTotalCostPerUnit();
    // Formula: Price = Cost / (1 - Target Margin)
    return totalCost / (1 - this.targetMargin);
  }

  /**
   * Calculate break-even price (just covering costs)
   * @returns {number} Break-even price
   */
  calculateBreakEvenPrice() {
    return this.calculateTotalCostPerUnit();
  }

  /**
   * Calculate break-even volume at a given price
   * @param {number} price - Price per unit
   * @returns {number} Break-even volume
   */
  calculateBreakEvenVolume(price) {
    const totalCost = this.calculateTotalCostPerUnit();
    if (price <= totalCost) return Infinity; // Price too low to break even
    
    const monthlyIndirectCosts = this.indirectCosts.reduce((total, cost) => {
      const monthlyCost = cost.period === 'year' ? cost.amount / 12 : cost.amount;
      return total + monthlyCost;
    }, 0);
    
    const contributionMargin = price - (this.calculateTotalDirectCost() + this.calculateTotalTimeCost());
    return monthlyIndirectCosts / contributionMargin;
  }

  /**
   * Calculate profit at a given price and volume
   * @param {number} price - Price per unit
   * @param {number} volume - Volume of units
   * @returns {number} Total profit
   */
  calculateProfit(price, volume) {
    const totalCost = this.calculateTotalCostPerUnit() * volume;
    const revenue = price * volume;
    return revenue - totalCost;
  }

  /**
   * Calculate margin percentage at a given price
   * @param {number} price - Price per unit
   * @returns {number} Margin as percentage (0.30 = 30%)
   */
  calculateMarginAtPrice(price) {
    const totalCost = this.calculateTotalCostPerUnit();
    return (price - totalCost) / price;
  }

  /**
   * Get cost breakdown by category
   * @returns {Object} Cost breakdown
   */
  getCostBreakdown() {
    return {
      direct: this.calculateTotalDirectCost(),
      time: this.calculateTotalTimeCost(),
      indirect: this.calculateAllocatedIndirectCost(),
      total: this.calculateTotalCostPerUnit()
    };
  }

  /**
   * Generate industry-specific template based on business type
   * @param {string} industry - Industry type
   * @returns {CostModel} Pre-populated cost model
   */
  static getIndustryTemplate(industry) {
    const model = new CostModel();
    
    switch(industry) {
      case 'consulting':
        model.businessType = 'service';
        model.addTimeCost('Consultant', 100, 5);
        model.addIndirectCost('Office Space', 2000, 'month');
        model.addIndirectCost('Software', 500, 'month');
        model.setTargetMargin(0.40);
        break;
        
      case 'ecommerce':
        model.businessType = 'product';
        model.addDirectCost('Product Cost', 15);
        model.addDirectCost('Packaging', 2);
        model.addDirectCost('Shipping', 5);
        model.addIndirectCost('Website', 300, 'month');
        model.addIndirectCost('Marketing', 2000, 'month');
        model.setExpectedVolume(200);
        model.setTargetMargin(0.45);
        break;
        
      case 'saas':
        model.businessType = 'subscription';
        model.addDirectCost('Server Cost', 0.50);
        model.addDirectCost('Support', 5);
        model.addIndirectCost('Development', 10000, 'month');
        model.addIndirectCost('Marketing', 5000, 'month');
        model.setExpectedVolume(500);
        model.setTargetMargin(0.70);
        break;
    }
    
    return model;
  }
}

export default CostModel;