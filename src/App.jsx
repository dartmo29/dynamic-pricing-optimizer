/**
 * App.jsx
 * Main application component with enhanced visual design
 */

import React, { useState, useEffect } from 'react';
import { Settings, BarChart2, LineChart, Info } from 'lucide-react';

// Core UI Components
import Layout from './components/ui/layout';
import Card from './components/ui/card';
import Button from './components/ui/button';

// Storage utilities
import { STORAGE_KEYS, saveToStorage, loadFromStorage } from './utils/storage';

// Pages
import PricingOptimizerPage from './pages/PricingOptimizerPage';
import ValueAssessmentPage from './pages/ValueAssessmentPage';
import ScenarioComparisonPage from './pages/ScenarioComparisonPage';

// Setup Wizard
import IndustrySelection from './components/setup/industry-selection';

const App = () => {
  // Simple routing state
  // In a real app, we'd use React Router or similar
  const [currentPage, setCurrentPage] = useState('pricing');

  // Setup wizard state
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  
  // Current app state (Main App, Gradual App, etc.)
  const [currentApp, setCurrentApp] = useState('Main App');

  // Error state in case something fails
  const [error, setError] = useState(null);

  // Check if this is the first time the user is using the app
  useEffect(() => {
    try {
      const settings = loadFromStorage(STORAGE_KEYS.SETTINGS);
      const hasCompletedSetup = settings?.hasCompletedSetup;

      if (!hasCompletedSetup) {
        setShowSetupWizard(true);
      }
    } catch (err) {
      console.error('Error checking setup status:', err);
      setError('Failed to load settings. Please refresh the page or check browser storage permissions.');
    }
  }, []);

  // Handle setup wizard completion
  const handleSetupComplete = (setupData) => {
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
    } catch (err) {
      console.error('Error saving setup data:', err);
      setError('Failed to save setup data. Please try again or check browser storage permissions.');
    }
  };

  // Handle navigation between pages
  const handleNavigateToScenarios = () => {
    setCurrentPage('scenarios');
  };

  const handleNavigateToPricing = () => {
    setCurrentPage('pricing');
  };

  const handleNavigateToValueAssessment = () => {
    setCurrentPage('value-assessment');
  };

  // Render the current page based on state
  const renderContent = () => {
    // If showing setup wizard
    if (showSetupWizard) {
      return (
        <IndustrySelection 
          onNext={handleSetupComplete}
          onCancel={() => setShowSetupWizard(false)}
        />
      );
    }
    
    // Handle different app states
    if (currentApp === 'Main App') {
      switch (currentPage) {
        case 'value-assessment':
          return <ValueAssessmentPage onNavigateToPricing={handleNavigateToPricing} />;
        case 'scenarios':
          return <ScenarioComparisonPage onNavigateToPricing={handleNavigateToPricing} />;
        case 'pricing':
        default:
          return (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Pricing Optimizer</h1>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNavigateToValueAssessment}
                    icon={<Info size={16} />}
                  >
                    Value Assessment
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNavigateToScenarios}
                    icon={<BarChart2 size={16} />}
                  >
                    Scenarios
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSetupWizard(true)}
                    aria-label="Start Setup Wizard"
                  >
                    <Settings size={18} />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card
                  title="Current Strategy"
                  variant="gradient"
                  icon={<LineChart size={20} />}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">$199.99</p>
                      <p className="text-sm text-muted-foreground">Optimal Price</p>
                    </div>
                    <p className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                      Value-Based
                    </p>
                  </div>
                </Card>
                
                <Card
                  title="Key Metrics"
                  icon={<BarChart2 size={20} />}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Profit Margin</span>
                      <span className="font-medium">42.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Break-even</span>
                      <span className="font-medium">$114.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Competition</span>
                      <span className="font-medium">$179.99 avg</span>
                    </div>
                  </div>
                </Card>
                
                <Card
                  title="Setup Status"
                  icon={<Settings size={20} />}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Cost Structure</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Complete</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Competitors</span>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Partial</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Value Assessment</span>
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">Incomplete</span>
                    </div>
                  </div>
                </Card>
              </div>
              
              <PricingOptimizerPage onNavigateToScenarios={handleNavigateToScenarios} />
            </div>
          );
      }
    } else if (currentApp === 'Gradual App') {
      return (
        <div className="p-6 rounded-lg bg-card border border-border animate-fadeIn">
          <h2 className="text-xl font-bold mb-4">Gradual App Testing</h2>
          <p className="mb-4 text-muted-foreground">This version allows you to gradually enable features to isolate issues.</p>
          
          <div className="space-y-4">
            <div className="p-4 border border-border rounded-lg bg-card">
              <h3 className="font-medium mb-2">Enable Basic Features</h3>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline">Local Storage</Button>
                <Button size="sm" variant="outline">UI Components</Button>
                <Button size="sm" variant="outline">Data Processing</Button>
              </div>
            </div>
            
            <div className="p-4 border border-border rounded-lg bg-card">
              <h3 className="font-medium mb-2">Enable Advanced Features</h3>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline">Charts & Visualization</Button>
                <Button size="sm" variant="outline">PDF Export</Button>
                <Button size="sm" variant="outline">Data Import</Button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (currentApp === 'Test App') {
      return (
        <div className="p-6 rounded-lg bg-card border border-border animate-fadeIn">
          <h2 className="text-xl font-bold mb-4">Component Test</h2>
          <p className="mb-4 text-muted-foreground">Test individual UI components in isolation.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="Button Styles">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">Primary</Button>
                  <Button size="sm" variant="secondary">Secondary</Button>
                  <Button size="sm" variant="outline">Outline</Button>
                  <Button size="sm" variant="ghost">Ghost</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="destructive">Destructive</Button>
                  <Button size="sm" variant="success">Success</Button>
                  <Button size="sm" variant="warning">Warning</Button>
                  <Button size="sm" variant="info">Info</Button>
                </div>
              </div>
            </Card>
            
            <Card title="Card Variants">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-card border border-border rounded-md text-center text-sm">Default</div>
                <div className="p-2 bg-gradient-to-tr from-primary/10 via-card to-accent/10 border border-border rounded-md text-center text-sm">Gradient</div>
                <div className="p-2 bg-muted border border-border rounded-md text-center text-sm">Filled</div>
                <div className="p-2 bg-card border-2 border-primary rounded-md text-center text-sm">Outline</div>
              </div>
            </Card>
          </div>
        </div>
      );
    }
    
    // Fallback
    return <div>Unknown app state</div>;
  };

  // If there's an error, show an error message
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card variant="destructive" className="w-full max-w-md mx-auto">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Error</h2>
            <p className="mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Reload Page
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
};

export default App;
