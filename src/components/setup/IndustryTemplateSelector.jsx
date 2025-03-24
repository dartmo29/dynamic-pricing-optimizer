/**
 * IndustryTemplateSelector.jsx
 * Component for selecting industry-specific templates
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Cloud, ShoppingBag, Briefcase, Factory, Info } from 'lucide-react';

import { allTemplates } from '@/lib/industryTemplates';

const IndustryTemplateSelector = ({ onSelectTemplate, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  
  // Map template icons to Lucide icons
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Cloud':
        return <Cloud className="h-8 w-8" />;
      case 'ShoppingBag':
        return <ShoppingBag className="h-8 w-8" />;
      case 'Briefcase':
        return <Briefcase className="h-8 w-8" />;
      case 'Factory':
        return <Factory className="h-8 w-8" />;
      default:
        return <Info className="h-8 w-8" />;
    }
  };
  
  // Handle template selection
  const handleSelectTemplate = () => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate);
    }
  };
  
  // Format benchmark data for display
  const formatBenchmarks = (benchmarks) => {
    return Object.entries(benchmarks).map(([key, value]) => {
      // Convert camelCase to Title Case with spaces
      const formattedKey = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .replace(/Cac/g, 'CAC')
        .replace(/Ltv/g, 'LTV');
      
      return { key: formattedKey, value };
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Select Your Industry</h2>
        <p className="text-gray-500">
          Choose a template that best matches your business to get started
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {allTemplates.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate?.id === template.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedTemplate(template)}
          >
            <CardHeader className="text-center pb-2">
              <div className="mx-auto p-3 bg-blue-100 text-blue-700 rounded-full mb-2">
                {getIconComponent(template.icon)}
              </div>
              <CardTitle>{template.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <CardDescription className="min-h-12">
                {template.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-center pt-0">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(true);
                  }}>
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      {getIconComponent(template.icon)}
                      <span>{template.name} Template</span>
                    </DialogTitle>
                    <DialogDescription>
                      {template.description}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Benchmarks</h4>
                      <div className="space-y-1">
                        {formatBenchmarks(template.benchmarks).map((benchmark) => (
                          <div key={benchmark.key} className="flex justify-between text-sm">
                            <span className="text-gray-500">{benchmark.key}:</span>
                            <span className="font-medium">{benchmark.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Recommended Pricing Strategy</h4>
                      <p className="text-sm">
                        <span className="font-medium">{template.pricingStrategies.recommended.charAt(0).toUpperCase() + template.pricingStrategies.recommended.slice(1)}-based</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {template.pricingStrategies.notes}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Key Value Factors</h4>
                      <div className="space-y-1">
                        {template.competitiveFactors.map((factor) => (
                          <div key={factor.name} className="flex justify-between text-sm">
                            <span>{factor.name}</span>
                            <span className="font-medium">Importance: {factor.importance}/10</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSelectedTemplate(template);
                        setShowDetails(false);
                      }}
                    >
                      Use This Template
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          onClick={handleSelectTemplate}
          disabled={!selectedTemplate}
        >
          Continue with {selectedTemplate?.name || 'Selected Template'}
        </Button>
      </div>
    </div>
  );
};

IndustryTemplateSelector.propTypes = {
  onSelectTemplate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default IndustryTemplateSelector;