
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

console.log("Starting Dynamic Pricing Optimizer...");

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-md rounded-lg border border-red-200 bg-white shadow-lg">
            <div className="bg-red-600 text-white p-4">
              <h1 className="text-xl font-bold">Component Error</h1>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">A component error occurred.</p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
                {this.state.error.toString()}
              </pre>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  const root = createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );

  console.log("Application initialized successfully");
} catch (error) {
  console.error("Error during application initialization:", error);
  document.body.innerHTML = `
    <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div class="w-full max-w-md rounded-lg border border-red-200 bg-white shadow-lg">
        <div class="bg-red-600 text-white p-4">
          <h1 class="text-xl font-bold">Application Error</h1>
        </div>
        <div class="p-6">
          <p class="text-gray-700 mb-4">There was an error initializing the application.</p>
          <pre class="bg-gray-100 p-4 rounded-md overflow-auto text-sm">${error.toString()}</pre>
          <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
            Reload Page
          </button>
        </div>
      </div>
    </div>
  `;
}
