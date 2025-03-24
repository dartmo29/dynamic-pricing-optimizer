import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import GradualApp from './GradualApp';
import TestApp from './TestApp';

// Wrapper component to toggle between different app versions
const AppSelector = () => {
  const [appMode, setAppMode] = useState(localStorage.getItem('dpo_app_mode') || 'main');
  
  // Save app mode to localStorage when it changes
  const handleAppModeChange = (mode) => {
    setAppMode(mode);
    localStorage.setItem('dpo_app_mode', mode);
  };
  
  return (
    <div>
      {/* App mode selector */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="text-sm font-medium">
            Dynamic Pricing Optimizer
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleAppModeChange('main')}
              className={`px-3 py-1 text-sm rounded-md ${
                appMode === 'main' 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Main App
            </button>
            <button
              onClick={() => handleAppModeChange('gradual')}
              className={`px-3 py-1 text-sm rounded-md ${
                appMode === 'gradual' 
                  ? 'bg-indigo-100 text-indigo-700 font-medium' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Gradual App
            </button>
            <button
              onClick={() => handleAppModeChange('test')}
              className={`px-3 py-1 text-sm rounded-md ${
                appMode === 'test' 
                  ? 'bg-green-100 text-green-700 font-medium' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Test App
            </button>
          </div>
        </div>
      </div>
      
      {/* App container with top margin for the selector */}
      <div className="mt-12">
        {appMode === 'main' && <App />}
        {appMode === 'gradual' && <GradualApp />}
        {appMode === 'test' && <TestApp />}
      </div>
    </div>
  );
};

console.log("Starting Dynamic Pricing Optimizer...");

try {
  // Get the root element
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  
  // Create the React root
  const root = ReactDOM.createRoot(rootElement);
  
  // Render the app selector
  root.render(
    <React.StrictMode>
      <AppSelector />
    </React.StrictMode>
  );
  
  console.log("Application initialized successfully");
} catch (error) {
  console.error("Error during application initialization:", error);
  
  // Add a visible error message to the page
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h1 style="color: #e11d48;">Application Error</h1>
      <p>There was an error initializing the application. Check the console for details.</p>
      <pre style="background: #f1f5f9; padding: 15px; border-radius: 4px; overflow: auto;">${error.toString()}</pre>
      <button onclick="window.location.reload()" style="margin-top: 15px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Reload Page</button>
    </div>
  `;
}
