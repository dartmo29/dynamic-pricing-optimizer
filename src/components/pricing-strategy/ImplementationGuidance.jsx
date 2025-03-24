/**
 * ImplementationGuidance.jsx
 * Component for displaying pricing implementation guidance
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, MessageSquare, LightbulbIcon, Users, ArrowUp, ArrowDown } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

/**
 * Implementation Guidance component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.guidance - Implementation guidance data
 * @param {string} props.strategyName - Name of the selected strategy
 * @param {Array} props.customerSegments - Customer segment data
 * @returns {JSX.Element} Implementation guidance component
 */
const ImplementationGuidance = ({ guidance, strategyName, customerSegments = [] }) => {
  if (!guidance) return null;
  
  const strategyDisplayNames = {
    'cost-plus': 'Cost-Plus Strategy',
    'competitor': 'Competitor-Based Strategy',
    'value': 'Value-Based Strategy',
    'optimal': 'Optimal Blended Strategy'
  };
  
  const displayName = strategyDisplayNames[strategyName] || 'Pricing Strategy';
  const hasSegments = customerSegments && customerSegments.length > 0;
  
  // Calculate segment prices based on selected strategy
  const calculateSegmentPrices = () => {
    if (!hasSegments || !guidance) return [];
    
    const basePrice = guidance.recommendedPrice;
    
    return customerSegments.map(segment => {
      // Adjust price based on willingness to pay (derived from price elasticity)
      const elasticityFactor = Math.max(1 - (segment.priceElasticity / 20), 0.5);
      const segmentPrice = basePrice * elasticityFactor;
      
      // Calculate discount or premium
      const priceDiffPercent = ((segmentPrice - basePrice) / basePrice) * 100;
      
      return {
        ...segment,
        price: segmentPrice,
        priceDiffPercent,
        isPremium: priceDiffPercent > 0
      };
    });
  };
  
  const segmentPrices = calculateSegmentPrices();
  
  // Generate segment-specific implementation tips
  const generateSegmentTips = () => {
    if (!hasSegments) return [];
    
    return [
      {
        title: "Create segment-specific offerings",
        description: "Develop tiered options that align with the price sensitivity of each segment."
      },
      {
        title: "Test price elasticity",
        description: "Gradually adjust prices for different segments to validate your elasticity assumptions."
      },
      {
        title: "Communicate segment-specific value",
        description: "Emphasize different benefits for different segments based on what they value most."
      },
      {
        title: "Roll out systematically",
        description: "Start with less price-sensitive segments first, then move to more sensitive ones."
      }
    ];
  };
  
  const segmentTips = generateSegmentTips();
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Implementation Plan: {displayName}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General Guidance</TabsTrigger>
            {hasSegments && (
              <TabsTrigger value="segment-specific">
                <Users className="h-4 w-4 mr-2" /> Segment-Specific
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="general">
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
          </TabsContent>
          
          {hasSegments && (
            <TabsContent value="segment-specific">
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium mb-3">Segment-Based Pricing Recommendations</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Based on your customer segments' price sensitivity, we recommend the following segment-specific prices:
                  </p>
                  
                  <div className="space-y-3">
                    {segmentPrices.map(segment => (
                      <div key={segment.id} 
                        className={`p-3 border rounded-lg flex justify-between items-center ${
                          segment.isPremium 
                            ? 'border-green-200 bg-green-50' 
                            : 'border-blue-200 bg-blue-50'
                        }`}
                      >
                        <div>
                          <span className="font-medium">{segment.name}</span>
                          <p className="text-xs text-gray-500">
                            {segment.size}% of market • Sensitivity: {segment.priceElasticity}/10
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{formatCurrency(segment.price)}</p>
                          <div className="flex items-center text-xs">
                            {segment.isPremium ? (
                              <>
                                <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                                <span className="text-green-600">
                                  {segment.priceDiffPercent.toFixed(1)}% premium
                                </span>
                              </>
                            ) : (
                              <>
                                <ArrowDown className="h-3 w-3 text-blue-600 mr-1" />
                                <span className="text-blue-600">
                                  {Math.abs(segment.priceDiffPercent).toFixed(1)}% discount
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    Segment-Specific Implementation Steps
                  </h3>
                  <div className="space-y-3">
                    {segmentTips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-xs font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{tip.title}</h4>
                          <p className="text-sm text-gray-600">{tip.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-lg">
                  <h3 className="font-medium mb-2">Segmentation Implementation Timeline</h3>
                  <ol className="space-y-1 text-sm ml-5 list-decimal">
                    <li>Start with the least price-sensitive segment to build confidence</li>
                    <li>Gather feedback and refine your approach based on initial results</li>
                    <li>Gradually extend to more price-sensitive segments</li>
                    <li>Monitor customer response and adjust prices as needed</li>
                    <li>Optimize pricing for each segment based on actual purchase behavior</li>
                  </ol>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
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
  strategyName: PropTypes.string.isRequired,
  customerSegments: PropTypes.array
};

export default ImplementationGuidance;