import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './components/ui/card';

/**
 * MinimalApp - A simplified version of the main App with minimal dependencies
 * This allows us to test if basic UI components are working
 */
const MinimalApp = () => {
  // Simple state to test interactivity
  const [count, setCount] = useState(0);
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="bg-white shadow rounded-lg mb-6">
        <div className="container mx-auto p-4">
          <h1 className="text-xl font-bold text-gray-800">Dynamic Pricing Optimizer</h1>
          <p className="text-sm text-gray-500">Make data-driven pricing decisions</p>
        </div>
      </header>
      
      <main className="container mx-auto">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Basic UI Components Test</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">This is a minimal version of the app to verify UI components are working.</p>
            <p className="mb-4">If you can see this card with proper styling, basic UI components are functioning.</p>
            <p className="font-medium">Counter: {count}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setCount(count - 1)}>Decrease</Button>
            <Button onClick={() => setCount(count + 1)}>Increase</Button>
          </CardFooter>
        </Card>
        
        <div className="flex justify-center mt-8">
          <Button 
            variant="outline" 
            className="mx-2"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        </div>
      </main>
      
      <footer className="bg-white border-t mt-12 p-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Dynamic Pricing Optimizer
      </footer>
    </div>
  );
};

export default MinimalApp;
