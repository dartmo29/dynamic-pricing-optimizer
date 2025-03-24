import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { PlusCircle } from 'lucide-react';

console.log("Starting React initialization with integrated App...");

// Create a simplified test app that uses UI components
const TestUIApp = () => {
  const [counter, setCounter] = useState(0);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Dynamic Pricing Optimizer</h1>
              <p className="text-sm text-gray-500">Make data-driven pricing decisions</p>
            </div>
            <div>
              <Button 
                variant="ghost"
                size="icon"
                onClick={() => alert('Button clicked!')}
                title="Test Button"
              >
                <PlusCircle className="h-5 w-5" />
              </Button>
              
              <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                Test Version
              </span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>UI Components Test</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">This tests our UI components to ensure they work correctly.</p>
              <div className="flex items-center gap-2">
                <Button 
                  onClick={() => setCounter(counter - 1)}
                  variant="outline"
                >
                  Decrease
                </Button>
                
                <span className="px-4 py-2 bg-gray-100 rounded">{counter}</span>
                
                <Button 
                  onClick={() => setCounter(counter + 1)}
                >
                  Increase
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tailwind CSS Test</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">This tests that Tailwind CSS is working properly.</p>
              <div className="flex flex-col gap-2">
                <div className="p-2 bg-blue-100 text-blue-800 rounded">Blue Item</div>
                <div className="p-2 bg-green-100 text-green-800 rounded">Green Item</div>
                <div className="p-2 bg-amber-100 text-amber-800 rounded">Amber Item</div>
                <div className="p-2 bg-red-100 text-red-800 rounded">Red Item</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Dynamic Pricing Optimizer
            </p>
            <div className="flex gap-4">
              <button className="text-sm text-gray-500 hover:text-gray-700">Help</button>
              <button className="text-sm text-gray-500 hover:text-gray-700">Privacy</button>
              <button className="text-sm text-gray-500 hover:text-gray-700">Terms</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

try {
  // Get the root element
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  
  // Create the React root
  const root = ReactDOM.createRoot(rootElement);
  
  // Render the test app with UI components
  root.render(
    <React.StrictMode>
      <TestUIApp />
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
