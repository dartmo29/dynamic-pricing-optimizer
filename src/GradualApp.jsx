import React, { useState, useEffect } from 'react';
import { ChevronRight, Settings, PlusCircle } from 'lucide-react';

// Import storage utilities
import { STORAGE_KEYS, saveToStorage, loadFromStorage } from './utils/storage';

/**
 * Enhanced GradualApp component
 * A step-by-step approach to adding complexity back to the app
 * to identify where the issue occurs
 */
const GradualApp = () => {
  // State for tracking which components are enabled
  const [enabledFeatures, setEnabledFeatures] = useState({
    // Core functionality
    storage: false,
    
    // UI Components
    ui_button: false,
    ui_input: false,
    ui_card: false,
    ui_tabs: false,
    ui_dialog: false,
    
    // Specialized Components
    cost_analysis: false,
    pricing_strategy: false,
    value_assessment: false,
    
    // Pages
    pricing_page: false,
    value_page: false,
    
    // Wizards
    setup_wizard: false
  });
  
  // Log state for debugging
  const [logs, setLogs] = useState([]);
  
  // Error state
  const [errors, setErrors] = useState([]);
  
  // Current page state
  const [currentPage, setCurrentPage] = useState('home');
  
  // Add a log entry
  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [
      { message, timestamp, type },
      ...prev.slice(0, 99) // Keep last 100 logs
    ]);
  };
  
  // Add an error
  const addError = (message, details = null) => {
    const timestamp = new Date().toLocaleTimeString();
    setErrors(prev => [
      { message, details, timestamp },
      ...prev.slice(0, 19) // Keep last 20 errors
    ]);
    addLog(`ERROR: ${message}`, 'error');
  };
  
  // Toggle a feature on/off
  const toggleFeature = (feature) => {
    try {
      setEnabledFeatures(prev => {
        const newState = {
          ...prev,
          [feature]: !prev[feature]
        };
        
        addLog(`${newState[feature] ? 'Enabled' : 'Disabled'} feature: ${feature}`);
        return newState;
      });
    } catch (error) {
      addError(`Failed to toggle ${feature}`, error.toString());
    }
  };
  
  // Test storage functionality
  const testStorage = () => {
    try {
      if (!enabledFeatures.storage) {
        addLog('Storage feature is not enabled. Enable it first.', 'warning');
        return;
      }
      
      // Try writing to localStorage
      const testData = { test: true, timestamp: Date.now() };
      const success = saveToStorage('dpo_test', testData);
      
      if (success) {
        // Try reading from localStorage
        const readData = loadFromStorage('dpo_test');
        if (readData && readData.test === true) {
          addLog('Storage test successful! Write and read operations working.', 'success');
        } else {
          addError('Storage read test failed. Could not verify read operation.');
        }
      } else {
        addError('Storage write test failed. Could not save to localStorage.');
      }
    } catch (error) {
      addError('Storage test exception occurred', error.toString());
    }
  };
  
  // Clear all logs
  const clearLogs = () => {
    setLogs([]);
    addLog('Logs cleared');
  };
  
  // Clear all errors
  const clearErrors = () => {
    setErrors([]);
    addLog('Errors cleared');
  };
  
  // Group features for display
  const featureGroups = [
    {
      title: 'Core Functionality',
      features: [
        { key: 'storage', label: 'Local Storage', description: 'Enable loading/saving from local storage' }
      ]
    },
    {
      title: 'UI Components',
      features: [
        { key: 'ui_button', label: 'Button Component', description: 'Basic button UI component' },
        { key: 'ui_input', label: 'Input Components', description: 'Form input components' },
        { key: 'ui_card', label: 'Card Component', description: 'Card container component' },
        { key: 'ui_tabs', label: 'Tabs Component', description: 'Tabbed interface component' },
        { key: 'ui_dialog', label: 'Dialog Component', description: 'Modal dialog component' }
      ]
    },
    {
      title: 'Specialized Components',
      features: [
        { key: 'cost_analysis', label: 'Cost Analysis', description: 'Cost structure components', dependencies: ['storage', 'ui_input', 'ui_card'] },
        { key: 'pricing_strategy', label: 'Pricing Strategy', description: 'Strategy selection and calculation', dependencies: ['storage', 'ui_tabs', 'ui_input'] },
        { key: 'value_assessment', label: 'Value Assessment', description: 'Value proposition components', dependencies: ['storage', 'ui_input'] }
      ]
    },
    {
      title: 'Pages',
      features: [
        { key: 'pricing_page', label: 'Pricing Page', description: 'Main pricing optimizer page', dependencies: ['storage', 'cost_analysis', 'pricing_strategy'] },
        { key: 'value_page', label: 'Value Page', description: 'Value assessment page', dependencies: ['storage', 'value_assessment'] }
      ]
    },
    {
      title: 'Wizards',
      features: [
        { key: 'setup_wizard', label: 'Setup Wizard', description: 'Initial setup wizard', dependencies: ['storage', 'ui_dialog', 'ui_tabs'] }
      ]
    }
  ];
  
  // Check if a feature has missing dependencies
  const hasMissingDependencies = (feature) => {
    // Find the feature in our groups
    for (const group of featureGroups) {
      const foundFeature = group.features.find(f => f.key === feature);
      if (foundFeature && foundFeature.dependencies) {
        // Check if any dependency is not enabled
        return foundFeature.dependencies.some(dep => !enabledFeatures[dep]);
      }
    }
    return false;
  };
  
  // Get missing dependencies for a feature
  const getMissingDependencies = (feature) => {
    // Find the feature in our groups
    for (const group of featureGroups) {
      const foundFeature = group.features.find(f => f.key === feature);
      if (foundFeature && foundFeature.dependencies) {
        // Return all dependencies that are not enabled
        return foundFeature.dependencies.filter(dep => !enabledFeatures[dep]);
      }
    }
    return [];
  };
  
  // Format timestamp for display
  const formatTime = (timestamp) => {
    return timestamp;
  };
  
  // Export diagnostic info for troubleshooting
  const exportDiagnostics = () => {
    try {
      const diagnosticData = {
        enabledFeatures,
        logs,
        errors,
        browserInfo: {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          language: navigator.language,
          cookiesEnabled: navigator.cookieEnabled
        },
        timestamp: new Date().toISOString()
      };
      
      // Create a downloadable file
      const blob = new Blob([JSON.stringify(diagnosticData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create a temporary link and click it
      const a = document.createElement('a');
      a.href = url;
      a.download = `dpo-diagnostics-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      addLog('Diagnostic information exported successfully', 'success');
    } catch (error) {
      addError('Failed to export diagnostics', error.toString());
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Dynamic Pricing Optimizer</h1>
              <p className="text-sm text-gray-500">Gradual Testing Mode</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`px-3 py-1.5 rounded-md ${currentPage === 'home' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                onClick={() => setCurrentPage('home')}
              >
                Home
              </button>
              <button
                className={`px-3 py-1.5 rounded-md ${currentPage === 'features' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                onClick={() => setCurrentPage('features')}
              >
                Features
              </button>
              <button
                className={`px-3 py-1.5 rounded-md ${currentPage === 'logs' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                onClick={() => setCurrentPage('logs')}
              >
                Logs {logs.length > 0 && <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-200 rounded-full">{logs.length}</span>}
              </button>
              <button
                className={`px-3 py-1.5 rounded-md ${currentPage === 'errors' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}
                onClick={() => setCurrentPage('errors')}
              >
                Errors {errors.length > 0 && <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-200 rounded-full">{errors.length}</span>}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6">
        {currentPage === 'home' && (
          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Gradual App Testing</h2>
            <p className="mb-4">
              This utility helps troubleshoot the Dynamic Pricing Optimizer by incrementally enabling features to identify where issues occur.
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">How to use this tool:</h3>
              <ol className="list-decimal pl-5 space-y-2 text-blue-900">
                <li>Go to the <strong>Features</strong> tab to enable components one by one</li>
                <li>Start with <strong>Local Storage</strong> and <strong>UI Components</strong></li>
                <li>Check the <strong>Logs</strong> tab to see what actions have been performed</li>
                <li>If errors occur, check the <strong>Errors</strong> tab for details</li>
                <li>Use the test buttons to verify each component's functionality</li>
              </ol>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h3 className="font-semibold text-indigo-800 mb-2">Features Enabled:</h3>
                <p className="text-indigo-700 mb-3">
                  {Object.entries(enabledFeatures).filter(([_, enabled]) => enabled).length} of {Object.keys(enabledFeatures).length} features
                </p>
                <div className="w-full bg-white rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${(Object.entries(enabledFeatures).filter(([_, enabled]) => enabled).length / Object.keys(enabledFeatures).length) * 100}%` }}></div>
                </div>
              </div>
              
              <div className="p-4 bg-emerald-50 rounded-lg">
                <h3 className="font-semibold text-emerald-800 mb-2">Quick Actions:</h3>
                <div className="flex flex-wrap gap-2">
                  <button 
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-md text-sm hover:bg-emerald-700"
                    onClick={() => setCurrentPage('features')}
                  >
                    Manage Features
                  </button>
                  <button 
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                    onClick={testStorage}
                  >
                    Test Storage
                  </button>
                  <button 
                    className="px-3 py-1.5 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700"
                    onClick={exportDiagnostics}
                  >
                    Export Diagnostics
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {currentPage === 'features' && (
          <div className="space-y-6">
            {featureGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="p-6 bg-white shadow rounded-lg">
                <h2 className="text-xl font-bold mb-4">{group.title}</h2>
                
                <div className="space-y-4">
                  {group.features.map((feature, featureIndex) => {
                    const isDisabled = feature.dependencies && hasMissingDependencies(feature.key);
                    const missingDeps = feature.dependencies ? getMissingDependencies(feature.key) : [];
                    
                    return (
                      <div key={featureIndex} className={`flex items-center justify-between p-3 rounded-lg ${isDisabled ? 'bg-gray-100' : 'bg-gray-50'}`}>
                        <div>
                          <h3 className="font-medium">{feature.label}</h3>
                          <p className="text-sm text-gray-500">{feature.description}</p>
                          {isDisabled && missingDeps.length > 0 && (
                            <p className="text-xs text-amber-600 mt-1">
                              Requires: {missingDeps.join(', ')}
                            </p>
                          )}
                        </div>
                        <button
                          className={`px-3 py-1.5 rounded-md ${
                            enabledFeatures[feature.key] 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                          } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          onClick={() => !isDisabled && toggleFeature(feature.key)}
                          disabled={isDisabled}
                        >
                          {enabledFeatures[feature.key] ? 'Enabled' : 'Disabled'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {currentPage === 'logs' && (
          <div className="p-6 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Activity Logs</h2>
              <button
                className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded-md text-sm hover:bg-gray-300"
                onClick={clearLogs}
              >
                Clear Logs
              </button>
            </div>
            
            {logs.length === 0 ? (
              <div className="p-4 bg-gray-50 rounded-lg text-gray-500 text-center">
                No logs recorded yet. Enable features and interact with the app to generate logs.
              </div>
            ) : (
              <div className="divide-y">
                {logs.map((log, index) => (
                  <div key={index} className={`py-2 px-3 ${
                    log.type === 'error' ? 'bg-red-50' : 
                    log.type === 'warning' ? 'bg-amber-50' : 
                    log.type === 'success' ? 'bg-green-50' : 
                    index % 2 === 0 ? 'bg-gray-50' : ''
                  }`}>
                    <div className="flex items-start">
                      <span className="text-xs text-gray-500 w-24 flex-shrink-0">{formatTime(log.timestamp)}</span>
                      <span className={`flex-grow ${
                        log.type === 'error' ? 'text-red-700' : 
                        log.type === 'warning' ? 'text-amber-700' : 
                        log.type === 'success' ? 'text-green-700' : 
                        'text-gray-700'
                      }`}>
                        {log.message}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {currentPage === 'errors' && (
          <div className="p-6 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Error Log</h2>
              <button
                className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded-md text-sm hover:bg-gray-300"
                onClick={clearErrors}
              >
                Clear Errors
              </button>
            </div>
            
            {errors.length === 0 ? (
              <div className="p-4 bg-green-50 rounded-lg text-green-700 text-center">
                No errors reported. Everything is working correctly!
              </div>
            ) : (
              <div className="space-y-4">
                {errors.map((error, index) => (
                  <div key={index} className="p-3 bg-red-50 rounded-lg">
                    <div className="flex items-start">
                      <span className="text-xs text-gray-500 w-24 flex-shrink-0">{formatTime(error.timestamp)}</span>
                      <div className="flex-grow">
                        <p className="text-red-700 font-medium">{error.message}</p>
                        {error.details && (
                          <pre className="mt-2 p-2 bg-red-100 rounded text-xs text-red-800 overflow-auto">
                            {error.details}
                          </pre>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Dynamic Pricing Optimizer - Troubleshooting Mode
            </p>
            <div className="flex gap-4">
              <span className="text-sm text-gray-500">
                {Object.entries(enabledFeatures).filter(([_, enabled]) => enabled).length} of {Object.keys(enabledFeatures).length} features enabled
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GradualApp;