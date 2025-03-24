/**
 * SetupWizard.jsx
 * Guided setup wizard for the Dynamic Pricing Optimizer
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Building, 
  DollarSign, 
  Users, 
  Target,
  Layers
} from 'lucide-react';

// Steps
import IndustryTemplateSelector from './IndustryTemplateSelector';
import BusinessProfileForm from './BusinessProfileForm';
import InitialCostSetup from './InitialCostSetup';
import CompetitivePositioning from './CompetitivePositioning';
import ValueProposition from './ValueProposition';
import SetupComplete from './SetupComplete';

/**
 * Setup step configuration
 */
const setupSteps = [
  {
    id: 'industry',
    title: 'Industry Selection',
    description: 'Choose a template for your industry',
    icon: <Building className="h-5 w-5" />,
    component: IndustryTemplateSelector
  },
  {
    id: 'business',
    title: 'Business Profile',
    description: 'Tell us about your business',
    icon: <Layers className="h-5 w-5" />,
    component: BusinessProfileForm
  },
  {
    id: 'costs',
    title: 'Cost Structure',
    description: 'Set up your basic cost structure',
    icon: <DollarSign className="h-5 w-5" />,
    component: InitialCostSetup
  },
  {
    id: 'competition',
    title: 'Competitive Analysis',
    description: 'Understand your market position',
    icon: <Users className="h-5 w-5" />,
    component: CompetitivePositioning
  },
  {
    id: 'value',
    title: 'Value Proposition',
    description: 'Define your unique value factors',
    icon: <Target className="h-5 w-5" />,
    component: ValueProposition
  },
  {
    id: 'complete',
    title: 'Setup Complete',
    description: 'You\'re ready to optimize pricing',
    icon: <CheckCircle2 className="h-5 w-5" />,
    component: SetupComplete
  }
];

/**
 * Guided setup wizard component
 * 
 * @param {Object} props Component props
 * @param {Function} props.onComplete Callback when setup is complete
 * @param {Function} props.onCancel Callback when setup is cancelled
 * @returns {JSX.Element} Setup wizard component
 */
const SetupWizard = ({ onComplete, onCancel }) => {
  // Current step index
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  // Setup data
  const [setupData, setSetupData] = useState({
    selectedTemplate: null,
    businessProfile: {},
    costStructure: {},
    competitors: [],
    valueFactors: []
  });
  
  // Current step
  const currentStep = setupSteps[currentStepIndex];
  
  // Navigate to next step
  const handleNext = (stepData) => {
    // Update setup data with the data from the current step
    setSetupData(prev => ({
      ...prev,
      ...stepData
    }));
    
    // Move to next step if not on the last step
    if (currentStepIndex < setupSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // If on the last step, call onComplete with the setup data
      onComplete(setupData);
    }
  };
  
  // Navigate to previous step
  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  
  // Handle cancel
  const handleCancel = () => {
    onCancel();
  };
  
  // Handle data for the current step
  const handleStepDataChange = (data) => {
    // Update setup data with the data from the current step
    setSetupData(prev => ({
      ...prev,
      ...data
    }));
  };
  
  // Render current step component
  const renderStepComponent = () => {
    const StepComponent = currentStep.component;
    
    return (
      <StepComponent
        data={setupData}
        onDataChange={handleStepDataChange}
        onNext={handleNext}
        onBack={handleBack}
        onClose={handleCancel}
      />
    );
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Step progress */}
        <div className="border-b p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Setup Your Pricing Optimizer</h2>
            <span className="text-sm text-gray-500">
              Step {currentStepIndex + 1} of {setupSteps.length}
            </span>
          </div>
          
          <div className="flex items-center">
            {setupSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                {/* Step indicator */}
                <div 
                  className={`flex items-center justify-center rounded-full w-8 h-8 
                    ${index < currentStepIndex 
                      ? 'bg-green-100 text-green-600' 
                      : index === currentStepIndex 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}
                >
                  {index < currentStepIndex ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                
                {/* Step title (visible on larger screens) */}
                <div className={`ml-2 hidden sm:block ${
                  index === currentStepIndex ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}>
                  <span className="text-sm">{step.title}</span>
                </div>
                
                {/* Connector line between steps */}
                {index < setupSteps.length - 1 && (
                  <div className={`flex-grow mx-2 h-0.5 ${
                    index < currentStepIndex ? 'bg-green-200' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Step content */}
        <CardContent className="flex-grow overflow-auto p-6">
          {renderStepComponent()}
        </CardContent>
        
        {/* Navigation buttons */}
        <div className="border-t p-4 flex justify-between">
          <div>
            {currentStepIndex > 0 ? (
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                onClick={handleCancel}
              >
                Cancel
              </Button>
            )}
          </div>
          
          {currentStepIndex < setupSteps.length - 1 ? (
            <Button 
              onClick={() => handleNext({})}
              className="flex items-center gap-1"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={() => onComplete(setupData)}
              className="bg-green-600 hover:bg-green-700"
            >
              Complete Setup
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

SetupWizard.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default SetupWizard;