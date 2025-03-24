/**
 * MarketPositionSelector.jsx
 * Component for selecting market positioning
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingDown, TrendingUp, Minimize2 } from 'lucide-react';

/**
 * Market Position Selector component
 * 
 * @param {Object} props - Component props
 * @param {string} props.position - Current market position
 * @param {Function} props.onPositionChange - Callback when position changes
 * @returns {JSX.Element} Market position selector component
 */
const MarketPositionSelector = ({ position, onPositionChange }) => {
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
                  position === option.id ? option.activeClass : option.inactiveClass
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
            {position === 'budget' && (
              <p>
                Budget positioning focuses on competitive pricing to attract price-sensitive customers.
                This strategy typically requires higher volume or lower costs to remain profitable.
              </p>
            )}
            {position === 'mid-market' && (
              <p>
                Mid-market positioning balances price and value, appealing to the broadest customer base.
                This strategy provides flexibility and is the most common approach.
              </p>
            )}
            {position === 'premium' && (
              <p>
                Premium positioning emphasizes your superior value to justify higher prices.
                This strategy works best when you have clear differentiators from competitors.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

MarketPositionSelector.propTypes = {
  position: PropTypes.oneOf(['budget', 'mid-market', 'premium']).isRequired,
  onPositionChange: PropTypes.func.isRequired
};

export default MarketPositionSelector;