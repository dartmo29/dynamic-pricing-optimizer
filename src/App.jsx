/**
 * App.jsx
 * Main application component
 */

import React, { useState } from 'react';
import PricingOptimizerPage from './pages/PricingOptimizerPage';
import ValueAssessmentPage from './pages/ValueAssessmentPage';
import { Button } from './components/ui/button';
import { ChevronRight } from 'lucide-react';

const App = () => {
  // Simple routing state 
  // In a real app, we'd use React Router or similar
  const [currentPage, setCurrentPage] = useState('pricing');
  
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
            <div className="flex items-center gap-4">
              {currentPage === 'pricing' && (
                <Button
                  variant="outline"
                  className="flex items-center gap-1"
                  onClick={() => setCurrentPage('value-assessment')}
                >
                  Value Assessment <ChevronRight className="h-4 w-4" />
                </Button>
              )}
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
    </div>
  );
};

export default App;