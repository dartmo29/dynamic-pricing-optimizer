import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import GradualApp from './GradualApp';
import TestApp from './TestApp';

console.log("Starting Dynamic Pricing Optimizer...");

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  console.log("Application initialized successfully");
} catch (error) {
  console.error("Error during application initialization:", error);

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