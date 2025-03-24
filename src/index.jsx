import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TestApp from './TestApp';
import App from './App';

// Wrapper component to toggle between test and main app
const AppSelector = () => {
  const [showMainApp, setShowMainApp] = useState(false);
  
  return (
    <div>
      {showMainApp ? (
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
            <span style={{ fontWeight: "bold" }}>Running Main App</span>
            <button 
              onClick={() => setShowMainApp(false)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#e5e7eb",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Switch to Test App
            </button>
          </div>
          <div style={{ marginTop: "40px" }}>
            <App />
          </div>
        </div>
      ) : (
        <div>
          <TestApp />
          <div style={{ 
            maxWidth: "800px", 
            margin: "30px auto",
            padding: "20px",
            backgroundColor: "#f0f9ff",
            borderRadius: "8px",
            border: "1px solid #bfdbfe"
          }}>
            <h2>Ready to Try Main App?</h2>
            <p>The test app is working correctly. Now you can try loading the main application.</p>
            <button 
              onClick={() => setShowMainApp(true)}
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: "10px"
              }}
            >
              Load Main Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

console.log("Starting React initialization with App Selector...");

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
