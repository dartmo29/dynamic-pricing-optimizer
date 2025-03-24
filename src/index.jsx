import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { PlusCircle, ChevronRight } from 'lucide-react';
import SetupWizard from './components/setup/SetupWizard';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from './utils/storage';

// Only import one page to test
import PricingOptimizerPage from './pages/PricingOptimizerPage';

console.log("Starting React initialization with progressive App features...");

// Progressive App with increasing functionality
const ProgressiveApp = () => {
  // State management (similar to main App)
  const [currentPage, setCurrentPage] = useState('pricing');
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  const [testError, setTestError] = useState(null);
  
  // Check for setup completion (similar to main App)
  useEffect(() => {
    console.log("Running setup check effect");
    try {
      const hasCompletedSetup = loadFromStorage(STORAGE_KEYS.SETTINGS)?.hasCompletedSetup;
      console.log("Has completed setup:", hasCompletedSetup);
    } catch (error) {
      console.error("Error in setup check:", error);
      setTestError(error.toString());
    }
  }, []);
  
  // Handle setup wizard completion
  const handleSetupComplete = (setupData) => {
    console.log("Setup complete with data:", setupData);
    try {
      // Mark setup as completed
      saveToStorage(STORAGE_KEYS.SETTINGS, { hasCompletedSetup: true });
      
      // Close setup wizard
      setShowSetupWizard(false);
    } catch (error) {
      console.error("Error in handleSetupComplete:", error);
      setTestError(error.toString());
    }
  };
  
  // Simplified structure similar to App.jsx but without complex page routing
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
              <Button
                variant="outline"
                className="flex items-center gap-1"
                onClick={() => setCurrentPage('value-assessment')}
              >
                Value Assessment <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSetupWizard(true)}
                title="Start Setup Wizard"
              >
                <PlusCircle className="h-5 w-5" />
              </Button>
              
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                Test Version
              </span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6">
        {testError ? (
          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700">Test Error Detected</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-600 mb-4">An error occurred during testing:</p>
              <pre className="bg-white p-3 rounded text-sm overflow-auto">{testError}</pre>
              <Button 
                className="mt-4" 
                onClick={() => window.location.reload()}
              >
                Reload Page
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Progressive Test Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  This is a progressive test that includes core components from the main App.
                </p>
                <div className="flex gap-2">
                  <Button onClick={() => setShowSetupWizard(true)}>
                    Open Setup Wizard
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      try {
                        const testPage = <PricingOptimizerPage />;
                        console.log("PricingOptimizerPage created successfully");
                      } catch (error) {
                        console.error("Error creating PricingOptimizerPage:", error);
                        setTestError(error.toString());
                      }
                    }}
                  >
                    Test Pricing Page
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Uncomment to test actual page rendering */}
            {/* {currentPage === 'pricing' && <PricingOptimizerPage />} */}
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Dynamic Pricing Optimizer
            </p>
            <div className="flex gap-4">
              <button className="text-sm text-gray-500 hover:text-gray-700">Help</button>
              <button className="text-sm text-gray-500 hover:text-gray-700">Privacy</button>
              <button className="text-sm text-gray-500 hover:text-gray-700">Terms</button>
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

try {
  // Get the root element
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  
  // Create the React root
  const root = ReactDOM.createRoot(rootElement);
  
  // Render the progressive app
  root.render(
    <React.StrictMode>
      <ProgressiveApp />
    </React.StrictMode>
  );
  
  console.log("React initialization completed successfully");
} catch (error) {
  console.error("Error during React initialization:", error);
  
  // Add a visible error message to the page
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h1 style="color: #e11d48;">React Initialization Error</h1>
      <p>There was an error initializing React. Check the console for details.</p>
      <pre style="background: #f1f5f9; padding: 15px; border-radius: 4px; overflow: auto;">${error.toString()}</pre>
      <button onclick="window.location.reload()" style="margin-top: 15px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Reload Page</button>
    </div>
  `;
}
