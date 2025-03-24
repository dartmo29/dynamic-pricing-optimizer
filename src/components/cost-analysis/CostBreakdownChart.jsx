/**
 * CostBreakdownChart.jsx
 * Component for visualizing cost breakdown
 */

import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

/**
 * Cost Breakdown Chart component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.costBreakdown - Cost breakdown data
 * @returns {JSX.Element} Cost breakdown chart component
 */
const CostBreakdownChart = ({ costBreakdown }) => {
  // Extract cost breakdown data
  const { direct = 0, time = 0, indirect = 0, total = 0 } = costBreakdown || {};
  
  // Calculate percentages
  const getPercentage = (value) => {
    return total > 0 ? value / total : 0;
  };
  
  // Prepare chart data
  const chartData = [
    { name: 'Direct Costs', value: direct, color: '#2563eb' },
    { name: 'Time Costs', value: time, color: '#7c3aed' },
    { name: 'Indirect Costs', value: indirect, color: '#db2777' }
  ].filter(item => item.value > 0);
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow rounded border border-gray-200">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm">{formatCurrency(data.value)}</p>
          <p className="text-sm text-gray-500">{formatPercentage(getPercentage(data.value), 1)}</p>
        </div>
      );
    }
    return null;
  };
  
  // Render chart label
  const renderLabel = ({ name, value, cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    if (percent < 0.05) return null;
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs"
      >
        {formatPercentage(percent, 0)}
      </text>
    );
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cost Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        {total > 0 ? (
          <div className="space-y-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  labelLine={false}
                  label={renderLabel}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-600 font-semibold">{formatCurrency(direct)}</p>
                <p className="text-sm text-gray-600">Direct Costs</p>
                <p className="text-xs text-gray-500">{formatPercentage(getPercentage(direct))}</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-purple-600 font-semibold">{formatCurrency(time)}</p>
                <p className="text-sm text-gray-600">Time Costs</p>
                <p className="text-xs text-gray-500">{formatPercentage(getPercentage(time))}</p>
              </div>
              
              <div className="p-4 bg-pink-50 rounded-lg">
                <p className="text-pink-600 font-semibold">{formatCurrency(indirect)}</p>
                <p className="text-sm text-gray-600">Indirect Costs</p>
                <p className="text-xs text-gray-500">{formatPercentage(getPercentage(indirect))}</p>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-xl font-bold">{formatCurrency(total)}</p>
              <p className="text-gray-600">Total Cost Per Unit</p>
              <p className="text-xs text-gray-500 mt-1">
                Minimum viable price at {formatPercentage(costBreakdown.targetMargin || 0.3)} margin: 
                <span className="font-bold"> {formatCurrency(total / (1 - (costBreakdown.targetMargin || 0.3)))}</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Enter your cost structure to see the breakdown</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

CostBreakdownChart.propTypes = {
  costBreakdown: PropTypes.shape({
    direct: PropTypes.number,
    time: PropTypes.number,
    indirect: PropTypes.number,
    total: PropTypes.number,
    targetMargin: PropTypes.number
  })
};

export default CostBreakdownChart;