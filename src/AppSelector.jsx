import React, { useState, useEffect } from 'react';
import App from './App';
import MinimalApp from './MinimalApp';
import GradualApp from './GradualApp';
import TestApp from './TestApp';

/**
 * AppSelector - A component to switch between different app versions for testing
 */
const AppSelector = () => {
  // List of available apps
  const apps = {
    'test': { component: TestApp, name: 'Test App (No UI Components)' },
    'minimal': { component: MinimalApp, name: 'Minimal App (Basic UI Components)' },
    'gradual': { component: GradualApp, name: 'Gradual App (With Storage & Navigation)' },
    'main': { component: App, name: 'Main App (Full Application)' }
  };
  
  // Get app selection from URL or default to 'minimal'
  const getInitialApp = () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const appParam = urlParams.get('app');
      return apps[appParam] ? appParam : 'minimal';
    } catch (error) {
      console.error("Error parsing URL parameters:", error);
      return 'minimal';
    }
  };
  
  // Current app state
  const [currentApp, setCurrentApp] = useState(getInitialApp());
  
  // Update URL when app changes
  useEffect(() => {
    try {
      const url = new URL(window.location);
      url.searchParams.set('app', currentApp);
      window.history.pushState({}, '', url);
    } catch (error) {
      console.error("Error updating URL:", error);
    }
  }, [currentApp]);
  
  // Get current component
  const CurrentAppComponent = apps[currentApp].component;
  
  return (
    <div className="app-selector">
      {/* App selector controls */}
      <div 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          background: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          padding: '10px',
          maxWidth: '300px'
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
          App Version Selector
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {Object.entries(apps).map(([key, { name }]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input
                type="radio"
                id={`app-${key}`}
                name="app-selector"
                checked={currentApp === key}
                onChange={() => setCurrentApp(key)}
              />
              <label 
                htmlFor={`app-${key}`}
                style={{ 
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                {name}
              </label>
            </div>
          ))}
        </div>
        
        <div style={{ fontSize: '11px', color: '#666', marginTop: '8px' }}>
          Select different app versions to test functionality
        </div>
      </div>
      
      {/* Render the selected app */}
      <CurrentAppComponent />
    </div>
  );
};

export default AppSelector;