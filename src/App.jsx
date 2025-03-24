/**
 * App.jsx
 * Main application component
 */

import React, { useState, useEffect } from 'react';
import PricingOptimizerPage from './pages/PricingOptimizerPage';
import ValueAssessmentPage from './pages/ValueAssessmentPage';
import { Button } from './components/ui/button';
import { ChevronRight, Settings, PlusCircle } from 'lucide-react';

// Setup Wizard
import SetupWizard from './components/setup/SetupWizard';

// Storage utilities
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from './utils/storage';

const App = () => {
  // Simple routing state 
  // In a real app, we'd use React Router or similar
  const [currentPage, setCurrentPage] = useState('pricing');
  
  // Setup wizard state
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  
  // Check if this is the first time the user is using the app
  useEffect(() => {
    const hasCompletedSetup = loadFromStorage(STORAGE_KEYS.SETTINGS)?.hasCompletedSetup;
    
    if (!hasCompletedSetup) {
      setShowSetupWizard(true);
    }
  }, []);
  
  // Handle setup wizard completion
  const handleSetupComplete = (setupData) => {
    // Save setup data to local storage
    if (setupData.costStructure) {
      saveToStorage(STORAGE_KEYS.COST_ANALYSIS, setupData.costStructure);
    }
    
    if (setupData.businessProfile) {
      saveToStorage(STORAGE_KEYS.BUSINESS_PROFILE, setupData.businessProfile);
    }
    
    if (setupData.competitors) {
      saveToStorage(STORAGE_KEYS.COMPETITORS, setupData.competitors);
    }
    
    if (setupData.valueFactors) {
      saveToStorage(STORAGE_KEYS.VALUE_FACTORS, setupData.valueFactors);
    }
    
    // Mark setup as completed
    saveToStorage(STORAGE_KEYS.SETTINGS, { hasCompletedSetup: true });
    
    // Close setup wizard
    setShowSetupWizard(false);
  };
  
  // Render the current page based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'value-assessment':
        return <ValueAssessmentPage />;
      case 'pricing':
      default:
        return <PricingOptimizerPage />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Dynamic Pricing Optimizer</h1>
              <p className="text-sm text-gray-500">Make data-driven pricing decisions</p>
            </div>
            <div className="flex items-center gap-2">
              {currentPage === 'pricing' && (
                <Button
                  variant="outline"
                  className="flex items-center gap-1"
                  onClick={() => setCurrentPage('value-assessment')}
                >
                  Value Assessment <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              
              {currentPage === 'value-assessment' && (
                <Button
                  variant="outline"
                  className="flex items-center gap-1"
                  onClick={() => setCurrentPage('pricing')}
                >
                  Pricing Optimizer <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSetupWizard(true)}
                title="Start Setup Wizard"
              >
                <PlusCircle className="h-5 w-5" />
              </Button>
              
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                MVP Version
              </span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6">
        {renderPage()}
      </main>
      
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Dynamic Pricing Optimizer
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Help</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Privacy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Terms</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Setup Wizard */}
      {showSetupWizard && (
        <SetupWizard
          onComplete={handleSetupComplete}
          onCancel={() => setShowSetupWizard(false)}
        />
      )}
    </div>
  );
};

export default App;