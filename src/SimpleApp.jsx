import React, { useState } from 'react';

/**
 * Simplified App component with minimal dependencies
 * This version has the same structure as the main App but with minimal functionality
 */
const SimpleApp = () => {
  // Simple state for testing
  const [currentTab, setCurrentTab] = useState('home');
  
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
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => setCurrentTab('home')}
              >
                Home
              </button>
              <button 
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                onClick={() => setCurrentTab('about')}
              >
                About
              </button>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                MVP Version
              </span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6">
        {currentTab === 'home' ? (
          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Welcome to the Simple App</h2>
            <p className="mb-4">
              This is a simplified version of the main application with minimal dependencies.
              If you can see this, the basic structure is working correctly.
            </p>
            <p>
              Current tab: <strong>{currentTab}</strong>
            </p>
          </div>
        ) : (
          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4">About This App</h2>
            <p className="mb-4">
              The Dynamic Pricing Optimizer helps small businesses determine optimal pricing
              for their products or services based on various factors.
            </p>
            <p>
              Current tab: <strong>{currentTab}</strong>
            </p>
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

export default SimpleApp;
