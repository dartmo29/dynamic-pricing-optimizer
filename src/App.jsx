/**
 * App.jsx
 * Main application component
 */

import React, { useState, useEffect, Suspense, ErrorBoundary } from 'react';
import PricingOptimizerPage from './pages/PricingOptimizerPage';
import ValueAssessmentPage from './pages/ValueAssessmentPage';
import { Button } from './components/ui/button';
import { ChevronRight, Settings, PlusCircle } from 'lucide-react';

// Setup Wizard
import SetupWizard from './components/setup/SetupWizard';

// Storage utilities
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from './utils/storage';

// Error Boundary Component
class ErrorBoundaryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by error boundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 max-w-lg mx-auto my-8 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
          <p className="mb-4">An error occurred in the application. Please check the console for details or try refreshing the page.</p>
          {this.state.error && (
            <div className="p-3 bg-white rounded overflow-auto max-h-60 text-sm">
              <p className="font-bold">Error:</p>
              <p className="text-red-600">{this.state.error.toString()}</p>
              {this.state.errorInfo && (
                <div className="mt-2">
                  <p className="font-bold">Component Stack:</p>
                  <pre className="mt-1 text-xs overflow-auto">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              )}
            </div>
          )}
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4"
          >
            Reload Application
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  console.log("App component rendering");
  
  // Simple routing state 
  // In a real app, we'd use React Router or similar
  const [currentPage, setCurrentPage] = useState('pricing');
  
  // Setup wizard state
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  
  // Check if this is the first time the user is using the app
  useEffect(() => {
    console.log("App useEffect running");
    try {
      const hasCompletedSetup = loadFromStorage(STORAGE_KEYS.SETTINGS)?.hasCompletedSetup;
      
      if (!hasCompletedSetup) {
        console.log("User has not completed setup, showing wizard");
        setShowSetupWizard(true);
      } else {
        console.log("User has completed setup");
      }
    } catch (error) {
      console.error("Error in App useEffect:", error);
    }
  }, []);
  
  // Handle setup wizard completion
  const handleSetupComplete = (setupData) => {
    console.log("Setup complete with data:", setupData);
    try {
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
    } catch (error) {
      console.error("Error in handleSetupComplete:", error);
    }
  };
  
  // Render the current page based on state
  const renderPage = () => {
    console.log("Rendering page:", currentPage);
    try {
      switch (currentPage) {
        case 'value-assessment':
          return <ValueAssessmentPage />;
        case 'pricing':
        default:
          return <PricingOptimizerPage />;
      }
    } catch (error) {
      console.error("Error in renderPage:", error);
      return <div>Error rendering page: {error.message}</div>;
    }
  };
  
  return (
    <ErrorBoundaryComponent>
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
    </ErrorBoundaryComponent>
  );
};

export default App;