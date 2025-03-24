import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MinimalApp from './MinimalApp';
// We'll gradually work back to the main App
// import App from './App';

console.log("Starting React initialization with MinimalApp...");

try {
  // Get the root element
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  
  // Create the React root
  const root = ReactDOM.createRoot(rootElement);
  
  // Render the minimal app to test UI components
  root.render(
    <React.StrictMode>
      <MinimalApp />
      {/* We'll switch back to this once we confirm UI components are working:
      <App />
      */}
    </React.StrictMode>
  );
  
  console.log("React initialization with MinimalApp completed successfully");
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
