/**
 * SetupComplete.jsx
 * Final step in the setup wizard showing setup completion
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronRight } from 'lucide-react';

const SetupComplete = ({ data, onNext }) => {
  // Format the setup data for display
  const formatData = () => {
    return {
      business: data.businessProfile?.businessName || 'Your Business',
      industry: data.selectedTemplate?.name || 'Custom Setup',
      costItems: [
        ...(data.costStructure?.direct || []),
        ...(data.costStructure?.indirect || []),
        ...(data.costStructure?.time || [])
      ].length,
      competitors: (data.competitors || []).length,
      valueFactors: (data.valueFactors || []).length,
      targetMargin: data.costStructure?.targetMargin 
        ? `${(data.costStructure.targetMargin * 100).toFixed(0)}%` 
        : '30%',
      expectedVolume: data.costStructure?.expectedVolume || 0
    };
  };
  
  const formattedData = formatData();
  
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center mb-8">
        <div className="bg-green-100 text-green-600 p-4 rounded-full">
          <CheckCircle2 className="h-16 w-16" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold">Setup Complete!</h2>
      <p className="text-gray-500 max-w-md mx-auto">
        Your pricing optimizer is now configured and ready to use. Here's a summary of your setup:
      </p>
      
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg border shadow-sm my-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">Business:</span>
            <span>{formattedData.business}</span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">Industry Template:</span>
            <span>{formattedData.industry}</span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">Cost Items:</span>
            <span>{formattedData.costItems}</span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">Competitors:</span>
            <span>{formattedData.competitors}</span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">Value Factors:</span>
            <span>{formattedData.valueFactors}</span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">Target Margin:</span>
            <span>{formattedData.targetMargin}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Monthly Volume:</span>
            <span>{formattedData.expectedVolume}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Next Steps</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          You're ready to start optimizing your pricing strategy. Use the tools to analyze costs, 
          compare with competitors, and find your optimal price point.
        </p>
        
        <div className="flex justify-center mt-4">
          <Button 
            onClick={() => onNext({})}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
          >
            Get Started <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

SetupComplete.propTypes = {
  data: PropTypes.object,
  onNext: PropTypes.func.isRequired
};

SetupComplete.defaultProps = {
  data: {}
};

export default SetupComplete;