/**
 * MarketPositionSelector.jsx
 * Component for selecting market positioning
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { TrendingDown, TrendingUp, Minimize2, ArrowRight } from 'lucide-react';

/**
 * Market Position Selector component
 * 
 * @param {Object} props - Component props
 * @param {string} props.marketPosition - Current market position
 * @param {Function} props.onPositionChange - Callback when position changes
 * @param {Function} props.onContinue - Callback when continue button is clicked
 * @returns {JSX.Element} Market position selector component
 */
const MarketPositionSelector = ({ marketPosition, onPositionChange, onContinue }) => {
  // Define position options
  const positionOptions = [
    {
      id: 'budget',
      title: 'Budget',
      description: 'Lower price point, appealing to cost-conscious customers',
      icon: <TrendingDown className="h-5 w-5 text-blue-500" />,
      activeClass: 'bg-blue-50 border-blue-300 ring-1 ring-blue-300',
      inactiveClass: 'border-gray-200 hover:border-blue-200'
    },
    {
      id: 'mid-market',
      title: 'Mid-Market',
      description: 'Balanced price point with moderate value',
      icon: <Minimize2 className="h-5 w-5 text-gray-500" />,
      activeClass: 'bg-gray-50 border-gray-300 ring-1 ring-gray-300',
      inactiveClass: 'border-gray-200 hover:border-gray-200'
    },
    {
      id: 'premium',
      title: 'Premium',
      description: 'Higher price point, emphasizing superior value',
      icon: <TrendingUp className="h-5 w-5 text-purple-500" />,
      activeClass: 'bg-purple-50 border-purple-300 ring-1 ring-purple-300',
      inactiveClass: 'border-gray-200 hover:border-purple-200'
    }
  ];

  // Handle continue button click
  const handleContinue = () => {
    if (typeof onContinue === 'function') {
      onContinue();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Market Positioning</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Select how you want to position your offering in the market relative to competitors.
            This influences pricing strategy recommendations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {positionOptions.map((option) => (
              <div
                key={option.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  marketPosition === option.id ? option.activeClass : option.inactiveClass
                }`}
                onClick={() => onPositionChange(option.id)}
              >
                <div className="flex items-center mb-2">
                  {option.icon}
                  <h3 className="font-medium ml-2">{option.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            ))}
          </div>
          
          <div className="pt-4 text-sm text-gray-500">
            {marketPosition === 'budget' && (
              <p>
                Budget positioning focuses on competitive pricing to attract price-sensitive customers.
                This strategy typically requires higher volume or lower costs to remain profitable.
              </p>
            )}
            {marketPosition === 'mid-market' && (
              <p>
                Mid-market positioning balances price and value, appealing to the broadest customer base.
                This strategy provides flexibility and is the most common approach.
              </p>
            )}
            {marketPosition === 'premium' && (
              <p>
                Premium positioning emphasizes your superior value to justify higher prices.
                This strategy works best when you have clear differentiators from competitors.
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pt-4">
        <Button 
          onClick={handleContinue}
          className="flex items-center gap-1"
        >
          Continue to Competitors <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

MarketPositionSelector.propTypes = {
  marketPosition: PropTypes.oneOf(['budget', 'mid-market', 'premium']).isRequired,
  onPositionChange: PropTypes.func.isRequired,
  onContinue: PropTypes.func
};

export default MarketPositionSelector;
