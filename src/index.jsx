import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TestApp from './TestApp';
import App from './App';
import GradualApp from './GradualApp';

// Wrapper component to toggle between different app versions
const AppSelector = () => {
  const [currentApp, setCurrentApp] = useState('test'); // Options: 'test', 'simple', 'gradual', 'full'
  
  const renderApp = () => {
    switch(currentApp) {
      case 'simple':
        return <App />;
      case 'gradual':
        return <GradualApp />;
      case 'full':
        // This will be the full app once we restore it
        return <div className="p-6 bg-red-50 text-red-600 rounded-lg">
          Full app is not yet implemented. Please use Gradual App for testing.
        </div>;
      case 'test':
      default:
        return <TestApp />;
    }
  };
  
  return (
    <div>
      <div style={{ 
        backgroundColor: "#f9fafb", 
        padding: "10px",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
      }}>
        <span style={{ fontWeight: "bold" }}>
          Running: {
            currentApp === 'test' ? 'Test App' : 
            currentApp === 'simple' ? 'Simple App' : 
            currentApp === 'gradual' ? 'Gradual Testing App' : 
            'Full App'
          }
        </span>
        <div style={{ display: "flex", gap: "8px" }}>
          <button 
            onClick={() => setCurrentApp('test')}
            style={{
              padding: "5px 10px",
              backgroundColor: currentApp === 'test' ? "#bfdbfe" : "#e5e7eb",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Test App
          </button>
          <button 
            onClick={() => setCurrentApp('simple')}
            style={{
              padding: "5px 10px",
              backgroundColor: currentApp === 'simple' ? "#bfdbfe" : "#e5e7eb",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Simple App
          </button>
          <button 
            onClick={() => setCurrentApp('gradual')}
            style={{
              padding: "5px 10px",
              backgroundColor: currentApp === 'gradual' ? "#bfdbfe" : "#e5e7eb",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Gradual App
          </button>
        </div>
      </div>
      
      <div style={{ marginTop: "40px" }}>
        {renderApp()}
      </div>
      
      {currentApp === 'test' && (
        <div style={{ 
          maxWidth: "800px", 
          margin: "30px auto",
          padding: "20px",
          backgroundColor: "#f0f9ff",
          borderRadius: "8px",
          border: "1px solid #bfdbfe"
        }}>
          <h2>App Testing Options</h2>
          <p>The test app is working correctly. Now you can try the other variants:</p>
          <ul style={{ marginLeft: "20px", marginTop: "10px", marginBottom: "15px", lineHeight: "1.5" }}>
            <li><strong>Simple App</strong> - Basic version with Tailwind styling but no complex functionality</li>
            <li><strong>Gradual App</strong> - Interactive version that lets you enable features one by one to identify issues</li>
          </ul>
          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <button 
              onClick={() => setCurrentApp('simple')}
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Try Simple App
            </button>
            <button 
              onClick={() => setCurrentApp('gradual')}
              style={{
                backgroundColor: "#8b5cf6",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Try Gradual Testing App
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

console.log("Starting React initialization with enhanced App Selector...");

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