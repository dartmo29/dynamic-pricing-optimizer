import React, { useState } from 'react';
import Card from '../ui/card';
import Button from '../ui/button';
import WizardStep from '../ui/wizard-step';

/**
 * Enhanced Industry Selection component with improved visual design
 */
const IndustrySelection = ({ onNext, onCancel }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  
  // Step configuration for the wizard
  const steps = [
    {
      label: 'Industry',
      title: 'Select Your Industry',
      description: 'Choose a template that best matches your business to get started',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20h20"></path>
          <path d="M5 4v16"></path>
          <path d="M19 4v16"></path>
          <path d="M5 4h14"></path>
          <path d="M7 8h2"></path>
          <path d="M7 12h2"></path>
          <path d="M7 16h2"></path>
          <path d="M15 8h2"></path>
          <path d="M15 12h2"></path>
          <path d="M15 16h2"></path>
        </svg>
      )
    },
    {
      label: 'Business Profile',
      title: 'Business Profile',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    {
      label: 'Cost Structure',
      title: 'Cost Structure',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      )
    },
    {
      label: 'Competitive Analysis',
      title: 'Competitive Analysis',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      )
    },
    {
      label: 'Value Proposition',
      title: 'Value Proposition',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
        </svg>
      )
    },
    {
      label: 'Complete',
      title: 'Setup Complete',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      )
    }
  ];
  
  // List of industries with details
  const industries = [
    {
      id: 'saas',
      name: 'SaaS/Subscription',
      description: 'Software-as-a-Service and subscription-based business models',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
          <path d="M12 12v9"></path>
          <path d="m8 17 4 4 4-4"></path>
        </svg>
      ),
      details: 'Optimized for recurring revenue models with metrics like MRR, LTV, and churn analysis'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce/Retail',
      description: 'Product-based retail businesses selling physical goods',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
          <path d="M3 6h18"></path>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
      ),
      details: 'Tailored for inventory-based businesses with product margin analysis and volume considerations'
    },
    {
      id: 'services',
      name: 'Professional Services',
      description: 'Service-based businesses with hourly or project-based billing',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
          <path d="M9 22v-4h6v4"></path>
          <path d="M8 6h.01"></path>
          <path d="M16 6h.01"></path>
          <path d="M12 6h.01"></path>
          <path d="M12 10h.01"></path>
          <path d="M12 14h.01"></path>
          <path d="M16 10h.01"></path>
          <path d="M16 14h.01"></path>
          <path d="M8 10h.01"></path>
          <path d="M8 14h.01"></path>
        </svg>
      ),
      details: 'Focused on time-based pricing, utilization rates, and resource allocation optimization'
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      description: 'Production businesses with complex cost structures',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
          <path d="M17 18h1"></path>
          <path d="M12 18h1"></path>
          <path d="M7 18h1"></path>
        </svg>
      ),
      details: 'Specializes in materials costing, production efficiency, and volume-based pricing'
    }
  ];
  
  // Handle industry selection
  const handleSelectIndustry = (industry) => {
    setSelectedIndustry(industry.id);
  };
  
  // Handle continuation to next step
  const handleContinue = () => {
    if (selectedIndustry && onNext) {
      onNext(selectedIndustry);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 animate-fadeIn">
      {/* Wizard Steps */}
      <WizardStep steps={steps} currentStep={0} />
      
      {/* Industry Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {industries.map((industry) => (
          <Card
            key={industry.id}
            variant={selectedIndustry === industry.id ? 'gradient' : 'default'}
            interactive
            selected={selectedIndustry === industry.id}
            onClick={() => handleSelectIndustry(industry)}
            icon={industry.icon}
            title={industry.name}
            subtitle={industry.description}
            className="h-full"
          >
            <p className="text-sm text-muted-foreground mt-2">
              {industry.details}
            </p>
            
            {selectedIndustry === industry.id && (
              <div className="flex justify-center mt-4">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Additional industry details functionality could go here
                  }}
                >
                  View Details
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        
        <Button 
          disabled={!selectedIndustry}
          onClick={handleContinue}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          }
          iconPosition="right"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default IndustrySelection;
