import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import GradualApp from './GradualApp';
import TestApp from './TestApp';

/**
 * AppSelector component for toggling between different app versions
 * with enhanced styling
 */
const AppSelector = () => {
  const [appMode, setAppMode] = useState(localStorage.getItem('dpo_app_mode') || 'main');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  // Initialize theme on first load
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };
  
  // Save app mode to localStorage when it changes
  const handleAppModeChange = (mode) => {
    setAppMode(mode);
    localStorage.setItem('dpo_app_mode', mode);
  };
  
  // Style object for the app selector buttons
  const getButtonClasses = (mode) => {
    const baseClasses = "px-3 py-1 text-sm rounded-md transition-colors duration-200";
    const activeClasses = {
      main: "bg-primary/20 text-primary font-medium",
      gradual: "bg-secondary/20 text-secondary font-medium",
      test: "bg-accent/20 text-accent font-medium"
    };
    const inactiveClasses = "bg-muted/50 text-muted-foreground hover:bg-muted";
    
    return `${baseClasses} ${appMode === mode ? activeClasses[mode] : inactiveClasses}`;
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* App mode selector */}
      <div className="fixed top-0 left-0 right-0 bg-card/90 backdrop-blur-sm border-b border-border z-50 shadow-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-primary rounded-md p-1.5">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-4 h-4 text-primary-foreground"
              >
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
            </div>
            <span className="text-sm font-medium">
              Dynamic Pricing Optimizer
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleAppModeChange('main')}
              className={getButtonClasses('main')}
            >
              Main App
            </button>
            <button
              onClick={() => handleAppModeChange('gradual')}
              className={getButtonClasses('gradual')}
            >
              Gradual App
            </button>
            <button
              onClick={() => handleAppModeChange('test')}
              className={getButtonClasses('test')}
            >
              Test App
            </button>
            
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="p-1.5 rounded-md bg-muted/50 hover:bg-muted"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-4 h-4"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-4 h-4"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* App container with top margin for the selector */}
      <div className="pt-14">
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
  
  // Add a visible error message with improved styling
  document.body.innerHTML = `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6 font-sans">
      <div class="w-full max-w-md rounded-lg border border-red-200 dark:border-red-800 bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
        <div class="bg-red-600 dark:bg-red-800 text-white p-4">
          <h1 class="text-xl font-bold">Application Error</h1>
        </div>
        <div class="p-6">
          <p class="text-gray-700 dark:text-gray-300 mb-4">There was an error initializing the application. Check the console for details.</p>
          <pre class="bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-auto text-sm text-gray-800 dark:text-gray-300 mb-4">${error.toString()}</pre>
          <button onclick="window.location.reload()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
            Reload Page
          </button>
        </div>
      </div>
    </div>
  `;
}
