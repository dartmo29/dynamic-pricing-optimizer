/**
 * industryTemplates.js
 * Industry-specific templates for pricing strategy
 */

/**
 * Template for SaaS/Subscription businesses
 */
export const saasTemplate = {
  id: 'saas',
  name: 'SaaS/Subscription',
  description: 'Software-as-a-Service and subscription-based business models',
  icon: 'Cloud',
  costStructure: {
    direct: [
      { name: 'Hosting/Infrastructure', amount: 0.5 },
      { name: 'Customer Support Per User', amount: 0.3 },
      { name: 'Third-party Services', amount: 0.2 }
    ],
    indirect: [
      { name: 'Development/Engineering', amount: 8000, period: 'month' },
      { name: 'Marketing', amount: 5000, period: 'month' },
      { name: 'Admin/Operations', amount: 3000, period: 'month' }
    ],
    time: [
      { name: 'Onboarding', rate: 75, hours: 0.1 }
    ],
    targetMargin: 0.75,
    expectedVolume: 200 // monthly users
  },
  marketPosition: 'mid-market',
  competitiveFactors: [
    { name: 'User Experience', importance: 9 },
    { name: 'Feature Set', importance: 8 },
    { name: 'Customer Support', importance: 7 },
    { name: 'Integrations', importance: 8 },
    { name: 'Reliability/Uptime', importance: 10 }
  ],
  benchmarks: {
    avgMonthlyPrice: 49.99,
    freeTrial: '14 days',
    avgContractLength: '12 months',
    avgChurnRate: '5%',
    avgCAC: 400,
    avgLTV: 2500,
    typicalMargin: '70-80%'
  },
  pricingStrategies: {
    recommended: 'value',
    notes: 'SaaS businesses typically benefit from value-based pricing, as the marginal cost of serving additional customers is very low. Focus on communicating value and differentiating features.'
  }
};

/**
 * Template for E-commerce/Retail businesses
 */
export const retailTemplate = {
  id: 'retail',
  name: 'E-commerce/Retail',
  description: 'Product-based retail businesses selling physical goods',
  icon: 'ShoppingBag',
  costStructure: {
    direct: [
      { name: 'Product Cost/COGS', amount: 15 },
      { name: 'Packaging', amount: 1.5 },
      { name: 'Shipping', amount: 5 }
    ],
    indirect: [
      { name: 'Warehousing', amount: 2000, period: 'month' },
      { name: 'Marketing', amount: 3000, period: 'month' },
      { name: 'Website Maintenance', amount: 500, period: 'month' }
    ],
    time: [
      { name: 'Order Processing', rate: 25, hours: 0.1 },
      { name: 'Customer Service', rate: 25, hours: 0.05 }
    ],
    targetMargin: 0.4,
    expectedVolume: 300 // monthly orders
  },
  marketPosition: 'mid-market',
  competitiveFactors: [
    { name: 'Product Quality', importance: 9 },
    { name: 'Price', importance: 8 },
    { name: 'Shipping Speed', importance: 7 },
    { name: 'Return Policy', importance: 6 },
    { name: 'Selection/Variety', importance: 7 }
  ],
  benchmarks: {
    avgOrderValue: 65,
    returnRate: '8%',
    conversionRate: '2.5%',
    avgCAC: 25,
    typicalMargin: '30-50%',
    inventoryTurnover: '4-6x annually'
  },
  pricingStrategies: {
    recommended: 'competitor',
    notes: 'Retail businesses often benefit from competitor-based pricing with value differentiation. Consider psychological pricing tactics and promotional strategies.'
  }
};

/**
 * Template for Professional Services businesses
 */
export const serviceTemplate = {
  id: 'service',
  name: 'Professional Services',
  description: 'Service-based businesses like consulting, legal, accounting, etc.',
  icon: 'Briefcase',
  costStructure: {
    direct: [
      { name: 'Materials/Supplies', amount: 10 }
    ],
    indirect: [
      { name: 'Office/Workspace', amount: 2000, period: 'month' },
      { name: 'Software/Tools', amount: 500, period: 'month' },
      { name: 'Insurance', amount: 300, period: 'month' },
      { name: 'Marketing', amount: 1000, period: 'month' }
    ],
    time: [
      { name: 'Service Delivery', rate: 100, hours: 5 },
      { name: 'Admin/Management', rate: 75, hours: 1 },
      { name: 'Client Communication', rate: 100, hours: 0.5 }
    ],
    targetMargin: 0.5,
    expectedVolume: 10 // monthly clients
  },
  marketPosition: 'mid-market',
  competitiveFactors: [
    { name: 'Expertise', importance: 10 },
    { name: 'Reputation', importance: 9 },
    { name: 'Response Time', importance: 7 },
    { name: 'Process Quality', importance: 8 },
    { name: 'Personalization', importance: 7 }
  ],
  benchmarks: {
    avgProjectValue: 3500,
    avgHourlyRate: 150,
    utilization: '60-70%',
    avgCAC: 500,
    typicalMargin: '40-60%',
    clientRetention: '70%'
  },
  pricingStrategies: {
    recommended: 'value',
    notes: 'Professional services firms should focus on value-based pricing rather than hourly rates when possible. Demonstrate ROI and emphasize expertise and quality.'
  }
};

/**
 * Template for Manufacturing businesses
 */
export const manufacturingTemplate = {
  id: 'manufacturing',
  name: 'Manufacturing',
  description: 'Businesses that manufacture physical products',
  icon: 'Factory',
  costStructure: {
    direct: [
      { name: 'Raw Materials', amount: 25 },
      { name: 'Direct Labor', amount: 15 },
      { name: 'Packaging', amount: 3 }
    ],
    indirect: [
      { name: 'Facility/Equipment', amount: 10000, period: 'month' },
      { name: 'Utilities', amount: 3000, period: 'month' },
      { name: 'Quality Control', amount: 2000, period: 'month' },
      { name: 'Administrative', amount: 3000, period: 'month' }
    ],
    time: [
      { name: 'Production Management', rate: 45, hours: 0.2 }
    ],
    targetMargin: 0.35,
    expectedVolume: 1000 // monthly units
  },
  marketPosition: 'mid-market',
  competitiveFactors: [
    { name: 'Product Quality', importance: 9 },
    { name: 'Production Capacity', importance: 7 },
    { name: 'Delivery Reliability', importance: 8 },
    { name: 'Price Competitiveness', importance: 8 },
    { name: 'Customization Options', importance: 6 }
  ],
  benchmarks: {
    avgUnitPrice: 85,
    productionEfficiency: '75%',
    defectRate: '2%',
    leadTime: '14 days',
    typicalMargin: '30-45%'
  },
  pricingStrategies: {
    recommended: 'cost-plus',
    notes: 'Manufacturing businesses typically use cost-plus pricing with careful attention to volume discounts and economies of scale. Consider tiered pricing for different order volumes.'
  }
};

/**
 * All available industry templates
 */
export const allTemplates = [
  saasTemplate,
  retailTemplate,
  serviceTemplate,
  manufacturingTemplate
];

/**
 * Get a template by ID
 * 
 * @param {string} templateId - The ID of the template to retrieve
 * @returns {Object|null} The template object or null if not found
 */
export function getTemplateById(templateId) {
  return allTemplates.find(template => template.id === templateId) || null;
}
