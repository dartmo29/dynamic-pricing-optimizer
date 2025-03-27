import React from 'react';

/**
 * WizardStep component for creating a stylish multi-step form navigation
 */
const WizardStep = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="w-full mb-8 overflow-hidden">
      <div className="relative">
        {/* Step Progress Bar */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted -translate-y-1/2">
          <div
            className="h-full bg-primary transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
        
        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            // Determine step status
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={index} className="flex flex-col items-center">
                {/* Step Circle */}
                <button
                  className={`
                    relative z-10 flex items-center justify-center w-10 h-10 rounded-full 
                    border-2 transition-all duration-300 ease-in-out
                    ${isActive 
                      ? 'border-primary bg-primary text-primary-foreground shadow-md' 
                      : isCompleted 
                        ? 'border-primary bg-primary text-primary-foreground' 
                        : 'border-muted bg-card text-muted-foreground'
                    }
                  `}
                  onClick={() => onStepClick && onStepClick(index)}
                  disabled={!onStepClick}
                >
                  {isCompleted ? (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </button>
                
                {/* Step Label */}
                <div className="flex flex-col items-center mt-2">
                  <span className={`
                    text-xs font-medium mt-1
                    ${isActive 
                      ? 'text-primary' 
                      : isCompleted 
                        ? 'text-foreground' 
                        : 'text-muted-foreground'
                    }
                  `}>
                    {step.label}
                  </span>
                  
                  {/* Icon (Optional) */}
                  {step.icon && (
                    <span className={`
                      mt-1
                      ${isActive 
                        ? 'text-primary' 
                        : isCompleted 
                          ? 'text-foreground' 
                          : 'text-muted-foreground'
                      }
                    `}>
                      {step.icon}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Current Step Status */}
      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold mb-1">
          {steps[currentStep].title}
        </h2>
        {steps[currentStep].description && (
          <p className="text-muted-foreground">
            {steps[currentStep].description}
          </p>
        )}
      </div>
    </div>
  );
};

export default WizardStep;
