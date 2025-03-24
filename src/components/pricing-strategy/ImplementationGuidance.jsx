/**
 * ImplementationGuidance.jsx
 * Component for displaying pricing implementation guidance
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Check, MessageSquare, LightbulbIcon } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

/**
 * Implementation Guidance component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.guidance - Implementation guidance data
 * @param {string} props.strategyName - Name of the selected strategy
 * @returns {JSX.Element} Implementation guidance component
 */
const ImplementationGuidance = ({ guidance, strategyName }) => {
  if (!guidance) return null;
  
  const strategyDisplayNames = {
    'cost-plus': 'Cost-Plus Strategy',
    'competitor': 'Competitor-Based Strategy',
    'value': 'Value-Based Strategy',
    'optimal': 'Optimal Blended Strategy'
  };
  
  const displayName = strategyDisplayNames[strategyName] || 'Pricing Strategy';
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Implementation Plan: {displayName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium mb-1">Recommended Price</h3>
            <p className="text-2xl font-bold">{formatCurrency(guidance.recommendedPrice)}</p>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-600">Estimated margin</p>
              <p className="font-medium">{formatPercentage(guidance.estimatedMargin)}</p>
            </div>
            <p className="text-sm text-gray-600 mt-3">{guidance.rationale}</p>
          </div>
          
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              Implementation Steps
            </h3>
            <div className="space-y-3">
              {guidance.implementationSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xs font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <MessageSquare className="h-5 w-5 text-blue-500 mr-2" />
              Communication Tips
            </h3>
            <ul className="space-y-2">
              {guidance.communicationTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded transition-colors">
                  <LightbulbIcon className="h-5 w-5 text-amber-500 mt-0.5" />
                  <span className="text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-4 bg-amber-50 rounded-lg text-sm">
            <p className="text-amber-800">
              <strong>Pro Tip:</strong> Test your new pricing with a small segment of customers before full implementation. 
              This allows you to gather feedback and make adjustments before rolling out widely.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

ImplementationGuidance.propTypes = {
  guidance: PropTypes.shape({
    recommendedPrice: PropTypes.number.isRequired,
    rationale: PropTypes.string.isRequired,
    estimatedMargin: PropTypes.number.isRequired,
    implementationSteps: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
      })
    ).isRequired,
    communicationTips: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  strategyName: PropTypes.string.isRequired
};

export default ImplementationGuidance;