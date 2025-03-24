import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { ChevronRight, Settings, PlusCircle } from 'lucide-react';

/**
 * GradualApp component
 * A step-by-step approach to adding complexity back to the app
 * to identify where the issue occurs
 */
const GradualApp = () => {
  // State for tracking which components are enabled
  const [enabledFeatures, setEnabledFeatures] = useState({
    storage: false,
    pricingPage: false,
    valuePage: false,
    setupWizard: false
  });
  
  // Current page state (simplified version)
  const [currentPage, setCurrentPage] = useState('home');
  
  // Toggle a feature on/off
  const toggleFeature = (feature) => {
    setEnabledFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Dynamic Pricing Optimizer</h1>
              <p className="text-sm text-gray-500">Incremental Testing Mode</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-1"
                onClick={() => setCurrentPage('home')}
              >
                Home
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-1"
                onClick={() => setCurrentPage('debug')}
              >
                Debug Panel
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6">
        {currentPage === 'home' ? (
          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Gradual App Testing</h2>
            <p className="mb-4">
              This version of the app allows incrementally enabling features to identify where issues occur.
              Go to the Debug Panel to enable features one by one.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-6 bg-white shadow rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Debug Panel</h2>
              <p className="mb-4">
                Enable features one by one to identify where the issue occurs.
                Start with storage, then add other features incrementally.
              </p>
              
              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Local Storage</h3>
                    <p className="text-sm text-gray-500">Enable loading/saving from local storage</p>
                  </div>
                  <Button
                    variant={enabledFeatures.storage ? "default" : "outline"}
                    onClick={() => toggleFeature('storage')}
                  >
                    {enabledFeatures.storage ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Pricing Optimizer Page</h3>
                    <p className="text-sm text-gray-500">Enable the main pricing page</p>
                  </div>
                  <Button
                    variant={enabledFeatures.pricingPage ? "default" : "outline"}
                    onClick={() => toggleFeature('pricingPage')}
                    disabled={!enabledFeatures.storage}
                  >
                    {enabledFeatures.pricingPage ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Value Assessment Page</h3>
                    <p className="text-sm text-gray-500">Enable the value assessment page</p>
                  </div>
                  <Button
                    variant={enabledFeatures.valuePage ? "default" : "outline"}
                    onClick={() => toggleFeature('valuePage')}
                    disabled={!enabledFeatures.storage}
                  >
                    {enabledFeatures.valuePage ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Setup Wizard</h3>
                    <p className="text-sm text-gray-500">Enable the setup wizard component</p>
                  </div>
                  <Button
                    variant={enabledFeatures.setupWizard ? "default" : "outline"}
                    onClick={() => toggleFeature('setupWizard')}
                    disabled={!enabledFeatures.storage}
                  >
                    {enabledFeatures.setupWizard ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-yellow-50 text-yellow-800 rounded-lg">
                <h3 className="font-medium mb-2">Enabled Features Status:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Storage: {enabledFeatures.storage ? '✅ Enabled' : '❌ Disabled'}</li>
                  <li>Pricing Page: {enabledFeatures.pricingPage ? '✅ Enabled' : '❌ Disabled'}</li>
                  <li>Value Page: {enabledFeatures.valuePage ? '✅ Enabled' : '❌ Disabled'}</li>
                  <li>Setup Wizard: {enabledFeatures.setupWizard ? '✅ Enabled' : '❌ Disabled'}</li>
                </ul>
              </div>
            </div>
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
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Help</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Privacy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GradualApp;
