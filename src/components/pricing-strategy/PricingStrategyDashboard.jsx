/**
 * PricingStrategyDashboard.jsx
 * Component for displaying and selecting pricing strategies
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PricingStrategyCard from './PricingStrategyCard';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * Pricing Strategy Dashboard component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.recommendations - Pricing recommendations
 * @param {string} props.selectedStrategy - Currently selected strategy
 * @param {Function} props.onSelectStrategy - Callback when strategy is selected
 * @param {Array} props.customerSegments - Customer segment data
 * @returns {JSX.Element} Pricing strategy dashboard component
 */
const PricingStrategyDashboard = ({ 
  recommendations, 
  selectedStrategy, 
  onSelectStrategy,
  customerSegments = []
}) => {
  // State for showing segment pricing
  const [showSegmentPricing, setShowSegmentPricing] = useState(false);
  
  // Check if we have recommendations to display
  const hasRecommendations = recommendations && Object.keys(recommendations).length > 0;
  
  // Check if we have customer segments defined
  const hasSegments = customerSegments && customerSegments.length > 0;
  
  // Calculate segment prices based on selected strategy if available
  const calculateSegmentPrices = () => {
    if (!hasSegments || !hasRecommendations || !selectedStrategy) return [];
    
    const basePrice = recommendations[selectedStrategy].price;
    
    return customerSegments.map(segment => {
      // Adjust price based on willingness to pay (derived from price elasticity)
      const elasticityFactor = Math.max(1 - (segment.priceElasticity / 20), 0.5);
      const segmentPrice = basePrice * elasticityFactor;
      
      // Calculate discount or premium
      const priceDiffPercent = ((segmentPrice - basePrice) / basePrice) * 100;
      
      return {
        ...segment,
        price: segmentPrice,
        priceDiffPercent,
        isPremium: priceDiffPercent > 0
      };
    });
  };
  
  const segmentPrices = calculateSegmentPrices();
  
  if (!hasRecommendations) {
    return (
      <Alert variant="warning">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No pricing recommendations available</AlertTitle>
        <AlertDescription>
          Please complete your cost structure and update market positioning to generate pricing recommendations.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="pricing-strategies">
        <TabsList className="mb-4">
          <TabsTrigger value="pricing-strategies">Pricing Strategies</TabsTrigger>
          {hasSegments && (
            <TabsTrigger value="segment-pricing">Segment Pricing</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="pricing-strategies">
          <Alert>
            <AlertTitle className="font-medium">
              Choose Your Pricing Strategy
            </AlertTitle>
            <AlertDescription>
              Review each strategy and select the one that best aligns with your business goals.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
            <PricingStrategyCard 
              strategy="cost-plus"
              recommendation={recommendations['cost-plus']}
              isSelected={selectedStrategy === 'cost-plus'}
              onSelect={onSelectStrategy}
            />
            
            <PricingStrategyCard 
              strategy="competitor"
              recommendation={recommendations['competitor']}
              isSelected={selectedStrategy === 'competitor'}
              onSelect={onSelectStrategy}
            />
            
            <PricingStrategyCard 
              strategy="value"
              recommendation={recommendations['value']}
              isSelected={selectedStrategy === 'value'}
              onSelect={onSelectStrategy}
            />
            
            <PricingStrategyCard 
              strategy="optimal"
              recommendation={recommendations['optimal']}
              isSelected={selectedStrategy === 'optimal'}
              onSelect={onSelectStrategy}
            />
          </div>
        </TabsContent>
        
        {hasSegments && (
          <TabsContent value="segment-pricing">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segment Pricing</CardTitle>
                <p className="text-sm text-gray-500 mt-2">
                  Based on your selected {selectedStrategy} pricing strategy (${recommendations[selectedStrategy].price.toFixed(2)})
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {segmentPrices.map(segment => (
                    <div key={segment.id} 
                      className={`p-4 border rounded-lg ${
                        segment.isPremium 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-blue-200 bg-blue-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{segment.name}</h4>
                          <p className="text-sm text-gray-500">
                            {segment.size}% of market • Price sensitivity: {segment.priceElasticity}/10
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">${segment.price.toFixed(2)}</p>
                          <p className={`text-sm ${segment.isPremium ? 'text-green-600' : 'text-blue-600'}`}>
                            {segment.isPremium ? '+' : ''}{segment.priceDiffPercent.toFixed(1)}% 
                            {segment.isPremium ? ' premium' : ' discount'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {segmentPrices.length > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Segment Pricing Recommendations</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Consider different pricing tiers for different customer segments</li>
                      <li>Price-sensitive segments may require lower pricing or additional value to convert</li>
                      <li>Less price-sensitive segments may be willing to pay premium pricing for higher value</li>
                      <li>Test segment pricing with small portions of your audience before full rollout</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

PricingStrategyDashboard.propTypes = {
  recommendations: PropTypes.object,
  selectedStrategy: PropTypes.oneOf(['cost-plus', 'competitor', 'value', 'optimal']),
  onSelectStrategy: PropTypes.func.isRequired,
  customerSegments: PropTypes.array
};

export default PricingStrategyDashboard;