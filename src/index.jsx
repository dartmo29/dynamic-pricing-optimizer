import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// A simple fallback component to debug rendering issues
const FallbackDebugComponent = () => {
  console.log("Fallback debug component rendering");
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>Dynamic Pricing Optimizer Debug Mode</h1>
      <p>If you can see this, basic React rendering is working.</p>
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f4f8', borderRadius: '4px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Debugging Information</h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>React Version: {React.version}</li>
          <li>Time: {new Date().toLocaleTimeString()}</li>
          <li>URL: {window.location.href}</li>
        </ul>
        <div style={{ marginTop: '15px' }}>
          <button 
            onClick={() => {
              try {
                const AppComponent = <App />;
                console.log("App component created successfully");
              } catch (err) {
                console.error("Error creating App component:", err);
              }
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Test App Component
          </button>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginLeft: '10px',
              padding: '8px 16px',
              backgroundColor: '#4b5563',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};

try {
  console.log("Starting React application initialization");
  
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Root element not found in the document");
    throw new Error("Root element not found");
  }
  
  const root = ReactDOM.createRoot(rootElement);
  console.log("React root created successfully");
  
  // Try to render the main App with a fallback
  try {
    console.log("Attempting to render App component");
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("App component rendered successfully");
  } catch (error) {
    console.error("Error rendering App component:", error);
    console.log("Falling back to debug component");
    
    // Fallback to debug component
    root.render(
      <React.StrictMode>
        <FallbackDebugComponent />
      </React.StrictMode>
    );
  }
} catch (error) {
  console.error("Critical error during initialization:", error);
  
  // Last resort: manual DOM insertion if React completely fails
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h1 style="color: #e11d48;">Critical Error</h1>
      <p>The application failed to initialize. Please check the console for details.</p>
      <pre style="background: #f1f5f9; padding: 15px; border-radius: 4px; overflow: auto;">${error.toString()}</pre>
      <button onclick="window.location.reload()" style="margin-top: 15px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Reload Page</button>
    </div>
  `;
}
