/**
 * CustomerValueCalculator.jsx
 * Component for calculating and communicating customer value
 */

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Calculator, DollarSign, Percent, Clock, Award } from 'lucide-react';

const CustomerValueCalculator = ({ valueFactors, recommendedPrice }) => {
  // State for customer inputs
  const [customerInputs, setCustomerInputs] = useState({
    currentCost: 100,
    timeValue: 50,
    riskCost: 20,
    opportunityCost: 30
  });

  // Calculate the total customer value
  const totalValue = useMemo(() => {
    const { currentCost, timeValue, riskCost, opportunityCost } = customerInputs;
    return currentCost + timeValue + riskCost + opportunityCost;
  }, [customerInputs]);

  // Calculate ROI
  const roi = useMemo(() => {
    if (!recommendedPrice || recommendedPrice === 0) return 0;
    return ((totalValue - recommendedPrice) / recommendedPrice) * 100;
  }, [totalValue, recommendedPrice]);

  // Calculate payback period (in months)
  const paybackPeriod = useMemo(() => {
    if (!recommendedPrice || totalValue === 0) return 0;
    // Simple payback calculation: price / monthly savings
    // Assuming the total value is realized over 12 months
    const monthlySavings = totalValue / 12;
    return recommendedPrice / monthlySavings;
  }, [totalValue, recommendedPrice]);

  // Calculate value statements
  const valueStatements = useMemo(() => {
    const { currentCost, timeValue, riskCost, opportunityCost } = customerInputs;
    
    return [
      {
        title: 'Direct Cost Savings',
        description: `Our solution can help you save approximately $${currentCost.toFixed(2)} compared to your current solution.`,
        icon: <DollarSign className="h-4 w-4" />,
        value: currentCost
      },
      {
        title: 'Time Savings',
        description: `By reducing the time spent on this process, our solution provides an estimated value of $${timeValue.toFixed(2)}.`,
        icon: <Clock className="h-4 w-4" />,
        value: timeValue
      },
      {
        title: 'Risk Reduction',
        description: `Our solution reduces business risks, providing an estimated value of $${riskCost.toFixed(2)}.`,
        icon: <Percent className="h-4 w-4" />,
        value: riskCost
      },
      {
        title: 'Opportunity Value',
        description: `The additional opportunities enabled by our solution provide an estimated value of $${opportunityCost.toFixed(2)}.`,
        icon: <Award className="h-4 w-4" />,
        value: opportunityCost
      }
    ];
  }, [customerInputs]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  // Handle slider changes
  const handleSliderChange = (name, value) => {
    setCustomerInputs(prev => ({
      ...prev,
      [name]: value[0]
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" /> Customer Value Calculator
        </CardTitle>
        <CardDescription>
          Calculate and communicate the total value your offering provides to customers
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Customer Value Inputs */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Customer Value Components</h3>
            
            <div className="space-y-3">
              {/* Direct Cost Savings */}
              <div>
                <div className="flex justify-between mb-1">
                  <Label htmlFor="currentCost" className="text-xs">Direct Cost Savings ($)</Label>
                  <span className="text-xs font-medium">${customerInputs.currentCost}</span>
                </div>
                <Slider
                  id="currentCost"
                  min={0}
                  max={500}
                  step={10}
                  value={[customerInputs.currentCost]}
                  onValueChange={(value) => handleSliderChange('currentCost', value)}
                  className="mb-2"
                />
                <p className="text-xs text-gray-500">The direct cost savings compared to their current solution</p>
              </div>
              
              {/* Time Savings */}
              <div>
                <div className="flex justify-between mb-1">
                  <Label htmlFor="timeValue" className="text-xs">Time Savings Value ($)</Label>
                  <span className="text-xs font-medium">${customerInputs.timeValue}</span>
                </div>
                <Slider
                  id="timeValue"
                  min={0}
                  max={300}
                  step={10}
                  value={[customerInputs.timeValue]}
                  onValueChange={(value) => handleSliderChange('timeValue', value)}
                  className="mb-2"
                />
                <p className="text-xs text-gray-500">The value of time saved using your solution</p>
              </div>
              
              {/* Risk Reduction */}
              <div>
                <div className="flex justify-between mb-1">
                  <Label htmlFor="riskCost" className="text-xs">Risk Reduction Value ($)</Label>
                  <span className="text-xs font-medium">${customerInputs.riskCost}</span>
                </div>
                <Slider
                  id="riskCost"
                  min={0}
                  max={200}
                  step={5}
                  value={[customerInputs.riskCost]}
                  onValueChange={(value) => handleSliderChange('riskCost', value)}
                  className="mb-2"
                />
                <p className="text-xs text-gray-500">The value of reduced business risks</p>
              </div>
              
              {/* Opportunity Cost */}
              <div>
                <div className="flex justify-between mb-1">
                  <Label htmlFor="opportunityCost" className="text-xs">Opportunity Value ($)</Label>
                  <span className="text-xs font-medium">${customerInputs.opportunityCost}</span>
                </div>
                <Slider
                  id="opportunityCost"
                  min={0}
                  max={200}
                  step={5}
                  value={[customerInputs.opportunityCost]}
                  onValueChange={(value) => handleSliderChange('opportunityCost', value)}
                  className="mb-2"
                />
                <p className="text-xs text-gray-500">The value of new opportunities enabled</p>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="p-4 rounded-md bg-blue-50 border border-blue-100">
            <h3 className="text-sm font-medium mb-3">Customer Value Analysis</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">Total Value to Customer</p>
                <p className="text-lg font-bold">${totalValue.toFixed(2)}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-500">Your Price</p>
                <p className="text-lg font-bold">${recommendedPrice ? recommendedPrice.toFixed(2) : '0.00'}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-500">Customer ROI</p>
                <p className="text-lg font-bold text-green-600">{roi.toFixed(0)}%</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-500">Payback Period</p>
                <p className="text-lg font-bold">{paybackPeriod.toFixed(1)} months</p>
              </div>
            </div>
            
            <div className="text-sm">
              <p className="mb-2 font-medium">Value Proposition:</p>
              <p className="text-gray-700">
                For an investment of <span className="font-medium">${recommendedPrice ? recommendedPrice.toFixed(2) : '0.00'}</span>, 
                customers receive <span className="font-medium">${totalValue.toFixed(2)}</span> in value, 
                representing a <span className="font-medium text-green-600">{roi.toFixed(0)}%</span> return on investment
                with payback in <span className="font-medium">{paybackPeriod.toFixed(1)}</span> months.
              </p>
            </div>
          </div>
          
          {/* Value Statements */}
          <div>
            <h3 className="text-sm font-medium mb-3">Value Communication Statements</h3>
            
            <div className="space-y-3">
              {valueStatements.map((statement, index) => (
                <div 
                  key={index} 
                  className="p-3 border rounded-md flex items-start gap-3"
                >
                  <div className="mt-1 p-1.5 bg-blue-100 text-blue-600 rounded-full">
                    {statement.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{statement.title}</h4>
                    <p className="text-xs text-gray-600">{statement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

CustomerValueCalculator.propTypes = {
  valueFactors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    importance: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired
  })),
  recommendedPrice: PropTypes.number
};

export default CustomerValueCalculator;