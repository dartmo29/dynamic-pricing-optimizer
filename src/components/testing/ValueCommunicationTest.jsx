/**
 * ValueCommunicationTest.jsx
 * Test component for ValueCommunication
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import ValueCommunication from '../value-assessment/ValueCommunication';

/**
 * Test component for ValueCommunication
 * 
 * @returns {JSX.Element} ValueCommunicationTest component
 */
const ValueCommunicationTest = () => {
  // Sample value proposition data
  const [valueProposition, setValueProposition] = useState({
    statement: "We help small business owners optimize pricing strategies to increase profitability without complex software.",
    uniqueFactors: ["Easy to use", "Data-driven", "Actionable insights"],
    targetMarket: "Small business owners and freelancers",
    primaryBenefit: "Increased profit margins",
    differentiator: "Simple interface with sophisticated analysis"
  });
  
  // Sample value map data
  const [valueMap, setValueMap] = useState({
    customerNeeds: [
      {
        id: '1',
        need: "Optimize pricing without hiring consultants",
        importance: 9
      },
      {
        id: '2',
        need: "Understand competitor pricing strategies",
        importance: 8
      },
      {
        id: '3',
        need: "Justify price increases to customers",
        importance: 7
      }
    ],
    valueDelivery: [
      {
        id: '1',
        feature: "Interactive pricing calculator",
        benefits: "See immediate profit impact of pricing changes"
      },
      {
        id: '2',
        feature: "Competitor analysis tool",
        benefits: "Understand market positioning in minutes"
      },
      {
        id: '3',
        feature: "Value communication templates",
        benefits: "Confidently explain pricing to customers"
      }
    ]
  });
  
  // Sample communication data
  const [communication, setCommunication] = useState({
    keyMessages: [
      {
        id: '1',
        text: "Our tool pays for itself by finding the optimal price for your products and services.",
        audience: "Small business owners",
        context: "Website"
      },
      {
        id: '2',
        text: "Stop guessing at your prices and start using data-driven strategies.",
        audience: "Freelancers",
        context: "Social Media"
      }
    ],
    channels: [
      {
        id: '1',
        name: "LinkedIn",
        purpose: "Reach professional service providers"
      },
      {
        id: '2',
        name: "Email Newsletter",
        purpose: "Nurture existing leads and customers"
      }
    ],
    materials: [
      {
        id: '1',
        title: "Pricing Strategy Guide",
        type: "White Paper",
        description: "Comprehensive guide on pricing strategies for small businesses"
      },
      {
        id: '2',
        title: "Case Study: Freelancer Success",
        type: "Case Study",
        description: "How a freelance designer increased profit by 40% with optimal pricing"
      }
    ]
  });
  
  /**
   * Handle updating communication data
   * 
   * @param {Object} updatedData Updated communication data
   */
  const handleUpdateCommunication = (updatedData) => {
    setCommunication({
      ...communication,
      ...updatedData
    });
  };
  
  // Reset test data
  const resetTestData = () => {
    setCommunication({
      keyMessages: [],
      channels: [],
      materials: []
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ValueCommunication Component Test</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This test demonstrates the ValueCommunication component with sample data. You can add, remove, and modify the communication data.
          </p>
          <div className="flex gap-4 mb-6">
            <Button variant="outline" onClick={resetTestData}>
              Reset Test Data
            </Button>
          </div>
          
          {/* Render the component under test */}
          <ValueCommunication
            valueProposition={valueProposition}
            valueMap={valueMap}
            communication={communication}
            onUpdateCommunication={handleUpdateCommunication}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ValueCommunicationTest;