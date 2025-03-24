/**
 * PricingStrategyCard.jsx
 * Component for displaying a pricing strategy recommendation
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, AlertCircle, Info, TrendingUp } from 'lucide-react';
import { formatCurrency, formatPercentage, getConfidenceLevelColor, getConfidenceLevelLabel } from '../../utils/formatters';

/**
 * Pricing Strategy Card component
 * 
 * @param {Object} props - Component props
 * @param {string} props.strategy - Strategy type ('cost-plus', 'competitor', 'value', 'optimal')
 * @param {Object} props.recommendation - Price recommendation data
 * @param {boolean} props.isSelected - Whether this strategy is selected
 * @param {Function} props.onSelect - Callback when strategy is selected
 * @returns {JSX.Element} Pricing strategy card component
 */
const PricingStrategyCard = ({ 
  strategy, 
  recommendation, 
  isSelected = false,
  onSelect
}) => {
  if (!recommendation) return null;
  
  // Define strategy-specific UI elements
  const strategyConfig = {
    'cost-plus': {
      title: 'Cost-Plus',
      description: 'Based on your costs and target margin',
      icon: <Check className="h-5 w-5 text-green-500" />,
      color: 'border-green-200',
      selectedColor: 'bg-green-50 border-green-300'
    },
    'competitor': {
      title: 'Competitor-Based',
      description: 'Based on market positioning',
      icon: <Info className="h-5 w-5 text-blue-500" />,
      color: 'border-blue-200',
      selectedColor: 'bg-blue-50 border-blue-300'
    },
    'value': {
      title: 'Value-Based',
      description: 'Based on your unique value',
      icon: <AlertCircle className="h-5 w-5 text-purple-500" />,
      color: 'border-purple-200',
      selectedColor: 'bg-purple-50 border-purple-300'
    },
    'optimal': {
      title: 'Optimal Blend',
      description: 'Balanced approach for best results',
      icon: <TrendingUp className="h-5 w-5 text-teal-500" />,
      color: 'border-teal-200',
      selectedColor: 'bg-teal-50 border-teal-300'
    }
  };
  
  const config = strategyConfig[strategy] || strategyConfig['cost-plus'];
  
  // Get confidence level text and color
  const confidenceDisplay = getConfidenceLevelColor(recommendation.confidenceLevel);
  const confidenceLabel = getConfidenceLevelLabel(recommendation.confidenceLevel);
  
  return (
    <Card 
      className={`w-full border-2 transition-all ${isSelected ? config.selectedColor : config.color}`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {config.icon}
              {config.title}
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">{config.description}</p>
          </div>
          <Badge className={`${confidenceDisplay.bg} ${confidenceDisplay.text}`}>
            {confidenceLabel} Confidence
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-3xl font-bold">{formatCurrency(recommendation.price)}</p>
            <p className="text-sm text-gray-500">Recommended Price</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-2 bg-gray-50 rounded">
              <p className="font-semibold">{formatPercentage(recommendation.margin)}</p>
              <p className="text-xs text-gray-500">Profit Margin</p>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <p className="font-semibold">{Math.round(recommendation.breakEvenVolume)}</p>
              <p className="text-xs text-gray-500">Break-Even Units</p>
            </div>
          </div>
          
          <div className="text-sm">
            <p>{recommendation.explanation}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onSelect(strategy)} 
          variant={isSelected ? "default" : "outline"}
          className="w-full"
        >
          {isSelected ? "Selected Strategy" : "Select This Strategy"}
        </Button>
      </CardFooter>
    </Card>
  );
};

PricingStrategyCard.propTypes = {
  strategy: PropTypes.oneOf(['cost-plus', 'competitor', 'value', 'optimal']).isRequired,
  recommendation: PropTypes.shape({
    price: PropTypes.number.isRequired,
    explanation: PropTypes.string.isRequired,
    confidenceLevel: PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired,
    breakEvenVolume: PropTypes.number.isRequired
  }),
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired
};

export default PricingStrategyCard;