import React, { useState, useEffect, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { PlusCircle, ChevronRight } from 'lucide-react';
import SetupWizard from './components/setup/SetupWizard';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from './utils/storage';

// Use dynamic imports for pages to lazy load them
const PricingOptimizerPage = React.lazy(() => import('./pages/PricingOptimizerPage'));

console.log("Starting React initialization with lazy-loaded components...");

// Error Boundary for component rendering
class ErrorBoundary extends React.Component {
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
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700">Component Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 mb-4">An error occurred in a component:</p>
            <pre className="bg-white p-3 rounded text-sm overflow-auto">
              {this.state.error?.toString()}
            </pre>
            {this.state.errorInfo && (
              <div className="mt-4">
                <p className="font-medium">Component Stack:</p>
                <pre className="bg-white p-3 rounded text-xs overflow-auto">
                  {this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}
            <Button 
              className="mt-4" 
              onClick={() => window.location.reload()}
            >
              Reload Page
            </Button>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

// Progressive App with page loading
const ProgressiveApp = () => {
  // State management (similar to main App)
  const [currentPage, setCurrentPage] = useState('test');
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  const [showPricingPage, setShowPricingPage] = useState(false);
  const [error, setError] = useState(null);
  
  // Check for setup completion
  useEffect(() => {
    try {
      const settings = loadFromStorage(STORAGE_KEYS.SETTINGS);
      console.log("Loaded settings:", settings);
      
      // Set some default settings if needed
      if (!settings) {
        saveToStorage(STORAGE_KEYS.SETTINGS, { hasCompletedSetup: true });
      }
    } catch (error) {
      console.error("Error loading settings:", error);
      setError(error.toString());
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
      setError(error.toString());
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
              <Button
                variant="outline"
                className="flex items-center gap-1"
                onClick={() => setCurrentPage(currentPage === 'test' ? 'pricing' : 'test')}
              >
                {currentPage === 'test' ? 'Show Pricing Page' : 'Back to Test'} <ChevronRight className="h-4 w-4" />
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
        {error ? (
          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700">Error Detected</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-600 mb-4">An error occurred:</p>
              <pre className="bg-white p-3 rounded text-sm overflow-auto">{error}</pre>
              <Button 
                className="mt-4" 
                onClick={() => window.location.reload()}
              >
                Reload Page
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {currentPage === 'test' && (
              <Card>
                <CardHeader>
                  <CardTitle>Page Loading Test</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    This page lets you test loading the PricingOptimizerPage component safely.
                  </p>
                  <div className="flex gap-2">
                    <Button onClick={() => setShowSetupWizard(true)}>
                      Open Setup Wizard
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowPricingPage(!showPricingPage)}
                    >
                      {showPricingPage ? 'Hide Pricing Page Preview' : 'Show Pricing Page Preview'}
                    </Button>
                  </div>
                  
                  {showPricingPage && (
                    <div className="mt-8 border rounded-lg p-4 overflow-auto max-h-96">
                      <h3 className="text-md font-medium mb-2">Pricing Page Preview:</h3>
                      <ErrorBoundary>
                        <Suspense fallback={<div className="p-8 text-center">Loading pricing page...</div>}>
                          <PricingOptimizerPage />
                        </Suspense>
                      </ErrorBoundary>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {currentPage === 'pricing' && (
              <ErrorBoundary>
                <Suspense fallback={<div className="p-8 text-center">Loading pricing page...</div>}>
                  <PricingOptimizerPage />
                </Suspense>
              </ErrorBoundary>
            )}
          </>
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
      <ErrorBoundary>
        <ProgressiveApp />
      </ErrorBoundary>
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
