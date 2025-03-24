/**
 * ValueAssessmentMatrix.jsx
 * Matrix visualization showing the relationship between price and value
 */

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

const ValueAssessmentMatrix = ({ 
  competitors, 
  valueFactors, 
  yourPrice, 
  yourValue,
  yourName = "Your Product"
}) => {
  // Calculate the average competitor price
  const avgCompetitorPrice = useMemo(() => {
    if (!competitors || competitors.length === 0) return 0;
    const total = competitors.reduce((sum, comp) => sum + comp.price, 0);
    return total / competitors.length;
  }, [competitors]);

  // Calculate the average competitor value
  const avgCompetitorValue = useMemo(() => {
    if (!competitors || competitors.length === 0) return 0;
    const total = competitors.reduce((sum, comp) => sum + comp.overallValue, 0);
    return total / competitors.length;
  }, [competitors]);

  // Determine quadrant placement
  const getQuadrant = (price, value) => {
    if (price >= avgCompetitorPrice && value >= avgCompetitorValue) return 'premium';
    if (price >= avgCompetitorPrice && value < avgCompetitorValue) return 'overpriced';
    if (price < avgCompetitorPrice && value >= avgCompetitorValue) return 'value';
    return 'economy';
  };

  // Get your offering's quadrant
  const yourQuadrant = useMemo(() => {
    return getQuadrant(yourPrice, yourValue);
  }, [yourPrice, yourValue, avgCompetitorPrice, avgCompetitorValue]);

  // Map competitors to their quadrants
  const competitorQuadrants = useMemo(() => {
    if (!competitors) return {};
    
    return competitors.reduce((acc, comp) => {
      const quadrant = getQuadrant(comp.price, comp.overallValue);
      if (!acc[quadrant]) acc[quadrant] = [];
      acc[quadrant].push(comp);
      return acc;
    }, {});
  }, [competitors, avgCompetitorPrice, avgCompetitorValue]);

  // Get description for your positioning
  const positioningDescription = useMemo(() => {
    switch (yourQuadrant) {
      case 'premium':
        return 'Your offering is positioned as a premium solution with high value but also higher price. This works well when targeting customers who prioritize quality and features over price.';
      case 'overpriced':
        return 'Your offering appears overpriced for the value provided. Consider either reducing price or enhancing your value proposition to improve competitive positioning.';
      case 'value':
        return 'Your offering delivers excellent value at a competitive price. This is an advantageous position that can help capture market share from premium-priced competitors.';
      case 'economy':
        return 'Your offering is positioned in the economy segment. Focus on efficiency and attracting price-sensitive customers, or consider ways to enhance value perception.';
      default:
        return '';
    }
  }, [yourQuadrant]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Value-Price Positioning Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-64 mb-4 border rounded-md overflow-hidden">
          {/* Horizontal divider */}
          <div className="absolute top-1/2 left-0 right-0 border-t border-gray-300"></div>
          {/* Vertical divider */}
          <div className="absolute top-0 bottom-0 left-1/2 border-l border-gray-300"></div>
          
          {/* Quadrant labels */}
          <div className="absolute top-0 left-0 p-2 text-xs font-medium text-gray-500">HIGH VALUE / LOW PRICE</div>
          <div className="absolute top-0 right-0 p-2 text-xs font-medium text-gray-500">HIGH VALUE / HIGH PRICE</div>
          <div className="absolute bottom-0 left-0 p-2 text-xs font-medium text-gray-500">LOW VALUE / LOW PRICE</div>
          <div className="absolute bottom-0 right-0 p-2 text-xs font-medium text-gray-500">LOW VALUE / HIGH PRICE</div>
          
          {/* Quadrant names */}
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 font-bold text-green-600">VALUE LEADER</div>
          <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2 font-bold text-blue-600">PREMIUM</div>
          <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2 font-bold text-gray-600">ECONOMY</div>
          <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 font-bold text-red-600">OVERPRICED</div>
          
          {/* Your position */}
          <div 
            className={`absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-xs font-bold ${
              yourQuadrant === 'premium' ? 'bg-blue-100 text-blue-800 border-2 border-blue-500' :
              yourQuadrant === 'value' ? 'bg-green-100 text-green-800 border-2 border-green-500' :
              yourQuadrant === 'economy' ? 'bg-gray-100 text-gray-800 border-2 border-gray-500' :
              'bg-red-100 text-red-800 border-2 border-red-500'
            }`}
            style={{
              left: `${50 + ((yourPrice / avgCompetitorPrice - 1) * 50 * 0.8)}%`,
              top: `${50 - ((yourValue / avgCompetitorValue - 1) * 50 * 0.8)}%`,
            }}
            title={yourName}
          >
            YOU
          </div>
          
          {/* Competitor positions */}
          {competitors && competitors.map((comp, index) => (
            <div 
              key={index}
              className="absolute w-5 h-5 bg-gray-100 border border-gray-400 rounded-full flex items-center justify-center text-xs"
              style={{
                left: `${50 + ((comp.price / avgCompetitorPrice - 1) * 50 * 0.8)}%`,
                top: `${50 - ((comp.overallValue / avgCompetitorValue - 1) * 50 * 0.8)}%`,
              }}
              title={comp.name}
            >
              {comp.name.charAt(0)}
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 rounded-md bg-gray-50 border">
          <h4 className="font-medium mb-2">Your Positioning: {
            yourQuadrant === 'premium' ? 'Premium' :
            yourQuadrant === 'value' ? 'Value Leader' :
            yourQuadrant === 'economy' ? 'Economy' :
            'Overpriced'
          }</h4>
          <p className="text-sm text-gray-700">{positioningDescription}</p>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-green-500" />
            <span>{yourQuadrant === 'premium' || yourQuadrant === 'value' ? 'Strong value proposition' : 'Competitive pricing'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <X className="h-4 w-4 text-red-500" />
            <span>{yourQuadrant === 'premium' || yourQuadrant === 'overpriced' ? 'Premium pricing' : 'Lower perceived value'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

ValueAssessmentMatrix.propTypes = {
  competitors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    overallValue: PropTypes.number.isRequired
  })),
  valueFactors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    importance: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired
  })),
  yourPrice: PropTypes.number.isRequired,
  yourValue: PropTypes.number.isRequired,
  yourName: PropTypes.string
};

export default ValueAssessmentMatrix;