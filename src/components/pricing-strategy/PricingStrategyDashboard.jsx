/**
 * PricingStrategyDashboard.jsx
 * Component for displaying and selecting pricing strategies
 */

import React from 'react';
import PropTypes from 'prop-types';
import PricingStrategyCard from './PricingStrategyCard';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

/**
 * Pricing Strategy Dashboard component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.recommendations - Pricing recommendations
 * @param {string} props.selectedStrategy - Currently selected strategy
 * @param {Function} props.onSelectStrategy - Callback when strategy is selected
 * @returns {JSX.Element} Pricing strategy dashboard component
 */
const PricingStrategyDashboard = ({ 
  recommendations, 
  selectedStrategy, 
  onSelectStrategy 
}) => {
  // Check if we have recommendations to display
  const hasRecommendations = recommendations && Object.keys(recommendations).length > 0;
  
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
      <Alert>
        <AlertTitle className="font-medium">
          Choose Your Pricing Strategy
        </AlertTitle>
        <AlertDescription>
          Review each strategy and select the one that best aligns with your business goals.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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
    </div>
  );
};

PricingStrategyDashboard.propTypes = {
  recommendations: PropTypes.object,
  selectedStrategy: PropTypes.oneOf(['cost-plus', 'competitor', 'value', 'optimal']),
  onSelectStrategy: PropTypes.func.isRequired
};

export default PricingStrategyDashboard;