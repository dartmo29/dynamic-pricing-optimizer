/**
 * BreakEvenAnalysisChart.jsx
 * Component for visualizing break-even analysis
 */

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ReferenceLine,
  ResponsiveContainer,
  Label
} from 'recharts';

const BreakEvenAnalysisChart = ({ 
  costBreakdown, 
  targetMargin, 
  price, 
  monthlyVolume 
}) => {
  // Calculate fixed costs (indirect costs)
  const fixedCosts = costBreakdown.indirect || 0;
  
  // Calculate variable costs per unit
  const variableCostsPerUnit = (costBreakdown.direct || 0) + (costBreakdown.time || 0);
  
  // Calculate contribution margin per unit
  const contributionMargin = price - variableCostsPerUnit;
  
  // Calculate break-even point in units
  const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fixedCosts / contributionMargin) : Infinity;
  
  // Calculate break-even point in revenue
  const breakEvenRevenue = breakEvenUnits * price;
  
  // Generate data for the chart
  const chartData = useMemo(() => {
    // If we can't calculate a meaningful break-even, return empty data
    if (contributionMargin <= 0 || breakEvenUnits === Infinity) {
      return [];
    }
    
    // Determine a reasonable range for the chart
    // Go from 0 to 2x the break-even point or to monthly volume, whichever is greater
    const maxUnits = Math.max(breakEvenUnits * 2, monthlyVolume);
    const step = Math.max(1, Math.floor(maxUnits / 10)); // Create about 10 data points
    
    const data = [];
    for (let units = 0; units <= maxUnits; units += step) {
      const revenue = units * price;
      const totalCost = fixedCosts + (units * variableCostsPerUnit);
      const profit = revenue - totalCost;
      
      data.push({
        units,
        revenue,
        totalCost,
        profit,
      });
    }
    
    return data;
  }, [price, fixedCosts, variableCostsPerUnit, contributionMargin, breakEvenUnits, monthlyVolume]);
  
  // Format values for the tooltip
  const formatCurrency = (value) => `$${value.toFixed(2)}`;
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm text-xs">
          <p className="font-medium">{`Units: ${label}`}</p>
          <p className="text-blue-600">{`Revenue: ${formatCurrency(payload[0].value)}`}</p>
          <p className="text-red-600">{`Total Cost: ${formatCurrency(payload[1].value)}`}</p>
          <p className={payload[2].value >= 0 ? "text-green-600" : "text-red-600"}>
            {`Profit: ${formatCurrency(payload[2].value)}`}
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Break-Even Analysis</CardTitle>
        <CardDescription>
          Visualize your fixed costs, variable costs, and break-even point
        </CardDescription>
      </CardHeader>
      <CardContent>
        {contributionMargin <= 0 ? (
          <div className="text-center p-6 bg-gray-50 rounded-md border">
            <h3 className="text-lg font-medium mb-2 text-red-600">Break-Even Point Not Calculable</h3>
            <p className="text-gray-700 mb-4">
              Your price (${price.toFixed(2)}) is less than your variable costs per unit 
              (${variableCostsPerUnit.toFixed(2)}), resulting in a negative contribution margin.
            </p>
            <p className="text-gray-600">
              To achieve profitability, either increase your price or reduce your variable costs.
            </p>
          </div>
        ) : (
          <>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="units" 
                    label={{ 
                      value: 'Units Sold', 
                      position: 'insideBottom', 
                      offset: -5 
                    }} 
                  />
                  <YAxis tickFormatter={value => `$${value}`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <ReferenceLine 
                    x={breakEvenUnits} 
                    stroke="#FF8C00" 
                    strokeDasharray="3 3"
                    label={{ 
                      value: 'Break-Even', 
                      position: 'top',
                      fill: '#FF8C00', 
                      fontSize: 12 
                    }} 
                  />
                  
                  {monthlyVolume > 0 && (
                    <ReferenceLine 
                      x={monthlyVolume} 
                      stroke="#4CAF50" 
                      strokeDasharray="3 3"
                      label={{ 
                        value: 'Current Volume', 
                        position: 'top',
                        fill: '#4CAF50', 
                        fontSize: 12 
                      }} 
                    />
                  )}
                  
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    name="Revenue" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="totalCost" 
                    stroke="#EF4444" 
                    name="Total Cost" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#10B981" 
                    name="Profit" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                <p className="text-xs text-gray-600 mb-1">Break-Even Units</p>
                <p className="text-lg font-bold">{breakEvenUnits}</p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                <p className="text-xs text-gray-600 mb-1">Break-Even Revenue</p>
                <p className="text-lg font-bold">${breakEvenRevenue.toFixed(2)}</p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                <p className="text-xs text-gray-600 mb-1">Contribution Margin</p>
                <p className="text-lg font-bold">${contributionMargin.toFixed(2)}</p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                <p className="text-xs text-gray-600 mb-1">CM Ratio</p>
                <p className="text-lg font-bold">{((contributionMargin / price) * 100).toFixed(1)}%</p>
              </div>
            </div>
            
            {monthlyVolume > 0 && (
              <div className="mt-4 p-3 rounded-md bg-gray-50 border">
                <h4 className="font-medium mb-2">Current Status</h4>
                <p className="text-sm text-gray-700">
                  {monthlyVolume < breakEvenUnits ? (
                    `You are currently operating at a loss. You need to sell ${breakEvenUnits - monthlyVolume} more units per month to break even.`
                  ) : (
                    `You are currently profitable. You are selling ${monthlyVolume - breakEvenUnits} units above your break-even point.`
                  )}
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

BreakEvenAnalysisChart.propTypes = {
  costBreakdown: PropTypes.shape({
    direct: PropTypes.number,
    indirect: PropTypes.number,
    time: PropTypes.number,
    total: PropTypes.number
  }).isRequired,
  targetMargin: PropTypes.number,
  price: PropTypes.number.isRequired,
  monthlyVolume: PropTypes.number
};

BreakEvenAnalysisChart.defaultProps = {
  targetMargin: 0.3,
  monthlyVolume: 0
};

export default BreakEvenAnalysisChart;