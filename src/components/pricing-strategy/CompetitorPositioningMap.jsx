/**
 * CompetitorPositioningMap.jsx
 * Visual representation of competitor positioning across multiple dimensions
 */

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tooltip as RechartsTooltip, ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Legend } from 'recharts';
import { formatCurrency } from '@/lib/utils';

const CompetitorPositioningMap = ({ 
  competitors, 
  valueFactors,
  yourPrice,
  yourName = "Your Product" 
}) => {
  // Default axes are price and overall value
  const [xAxis, setXAxis] = useState('price');
  const [yAxis, setYAxis] = useState('overallValue');
  
  // Get available dimensions for the chart
  const dimensions = useMemo(() => {
    // Start with price and overall value
    const dims = [
      { id: 'price', name: 'Price' },
      { id: 'overallValue', name: 'Overall Value' }
    ];
    
    // Add each value factor as a possible dimension
    if (valueFactors && valueFactors.length > 0) {
      valueFactors.forEach(factor => {
        dims.push({
          id: `factor_${factor.name.toLowerCase().replace(/\s+/g, '_')}`,
          name: factor.name
        });
      });
    }
    
    return dims;
  }, [valueFactors]);
  
  // Prepare the data for the chart
  const chartData = useMemo(() => {
    if (!competitors || competitors.length === 0) return [];
    
    // Create a map of factor names to their values for each competitor
    const factorMap = {};
    
    if (valueFactors && valueFactors.length > 0) {
      valueFactors.forEach(factor => {
        const factorId = `factor_${factor.name.toLowerCase().replace(/\s+/g, '_')}`;
        
        // Map competitor values for this factor
        competitors.forEach(comp => {
          if (!factorMap[comp.name]) {
            factorMap[comp.name] = {};
          }
          
          // Find this factor's value for this competitor
          const compFactor = comp.factors?.find(f => f.name === factor.name);
          factorMap[comp.name][factorId] = compFactor ? compFactor.score : 0;
        });
      });
    }
    
    // Create data points for competitors
    const competitorPoints = competitors.map(comp => {
      const point = {
        name: comp.name,
        price: comp.price,
        overallValue: comp.overallValue,
        type: 'competitor',
        ...factorMap[comp.name]
      };
      return point;
    });
    
    // Add your product as a data point
    const yourFactorValues = {};
    
    if (valueFactors && valueFactors.length > 0) {
      valueFactors.forEach(factor => {
        const factorId = `factor_${factor.name.toLowerCase().replace(/\s+/g, '_')}`;
        yourFactorValues[factorId] = factor.score;
      });
    }
    
    // Calculate your overall value score
    const yourOverallValue = valueFactors && valueFactors.length > 0
      ? valueFactors.reduce((sum, factor) => sum + factor.score * factor.importance, 0) / 
        valueFactors.reduce((sum, factor) => sum + factor.importance, 0)
      : 0;
    
    const yourPoint = {
      name: yourName,
      price: yourPrice,
      overallValue: yourOverallValue,
      type: 'you',
      ...yourFactorValues
    };
    
    return [...competitorPoints, yourPoint];
  }, [competitors, valueFactors, yourPrice, yourName]);
  
  // Format axis labels
  const formatAxisLabel = (axis, value) => {
    if (axis === 'price') {
      return formatCurrency(value);
    }
    if (axis === 'overallValue') {
      return `${value.toFixed(1)}/10`;
    }
    return value.toFixed(1);
  };
  
  // Get axis labels
  const getAxisName = (axisId) => {
    const dimension = dimensions.find(d => d.id === axisId);
    return dimension ? dimension.name : axisId;
  };
  
  // Custom tooltip
  const renderTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-white p-3 border rounded shadow-sm">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">
            {getAxisName(xAxis)}: {formatAxisLabel(xAxis, data[xAxis])}
          </p>
          <p className="text-sm">
            {getAxisName(yAxis)}: {formatAxisLabel(yAxis, data[yAxis])}
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  // Get domain for each axis
  const getDomain = (axis) => {
    if (!chartData || chartData.length === 0) return [0, 10];
    
    const values = chartData.map(d => d[axis]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    // Add 10% padding on each side
    const padding = (max - min) * 0.1;
    return [Math.max(0, min - padding), max + padding];
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Competitor Positioning Map</CardTitle>
        <CardDescription>
          Visualize how your product compares to competitors across different dimensions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length <= 1 ? (
          <div className="text-center p-6 bg-gray-50 rounded-md border">
            <h3 className="text-lg font-medium mb-2">Not enough data</h3>
            <p className="text-gray-700">
              Please add at least one competitor to visualize the positioning map.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Label htmlFor="x-axis" className="mb-2 block text-sm">X-Axis</Label>
                <Select value={xAxis} onValueChange={setXAxis}>
                  <SelectTrigger id="x-axis">
                    <SelectValue placeholder="Select dimension" />
                  </SelectTrigger>
                  <SelectContent>
                    {dimensions.map(dim => (
                      <SelectItem key={dim.id} value={dim.id}>{dim.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Label htmlFor="y-axis" className="mb-2 block text-sm">Y-Axis</Label>
                <Select value={yAxis} onValueChange={setYAxis}>
                  <SelectTrigger id="y-axis">
                    <SelectValue placeholder="Select dimension" />
                  </SelectTrigger>
                  <SelectContent>
                    {dimensions.map(dim => (
                      <SelectItem key={dim.id} value={dim.id}>{dim.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 30, bottom: 10, left: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number" 
                    dataKey={xAxis} 
                    name={getAxisName(xAxis)} 
                    domain={getDomain(xAxis)}
                    tickFormatter={(value) => formatAxisLabel(xAxis, value)}
                    label={{ 
                      value: getAxisName(xAxis), 
                      position: 'insideBottom', 
                      offset: -5 
                    }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey={yAxis} 
                    name={getAxisName(yAxis)} 
                    domain={getDomain(yAxis)}
                    tickFormatter={(value) => formatAxisLabel(yAxis, value)}
                    label={{ 
                      value: getAxisName(yAxis), 
                      angle: -90, 
                      position: 'insideLeft' 
                    }}
                  />
                  <ZAxis range={[60, 400]} />
                  <RechartsTooltip content={renderTooltip} />
                  <Legend />
                  
                  <Scatter 
                    name="Competitors" 
                    data={chartData.filter(d => d.type === 'competitor')} 
                    fill="#8884d8"
                  />
                  <Scatter 
                    name="Your Product" 
                    data={chartData.filter(d => d.type === 'you')} 
                    fill="#82ca9d"
                    shape="star"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 p-3 rounded-md bg-gray-50 border text-sm">
              <h4 className="font-medium mb-2">Positioning Insights</h4>
              <p className="text-gray-700">
                {xAxis === 'price' && yAxis === 'overallValue' ? (
                  `This chart shows your price-to-value ratio compared to competitors. 
                   The top-left quadrant represents best value for money, while the bottom-right shows 
                   overpriced offerings.`
                ) : (
                  `This chart compares ${getAxisName(xAxis)} and ${getAxisName(yAxis)} across competitors. 
                   Use different dimensions to identify your competitive advantages and areas for improvement.`
                )}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

CompetitorPositioningMap.propTypes = {
  competitors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    overallValue: PropTypes.number.isRequired,
    factors: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired
    }))
  })),
  valueFactors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    importance: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired
  })),
  yourPrice: PropTypes.number.isRequired,
  yourName: PropTypes.string
};

export default CompetitorPositioningMap;