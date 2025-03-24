import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { ChevronRight, Settings, PlusCircle } from 'lucide-react';

// Storage utilities
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from './utils/storage';

/**
 * GradualApp - A step-by-step approach to add main App functionality
 * This allows us to identify which part is causing issues
 */
const GradualApp = () => {
  // Simple routing state 
  const [currentPage, setCurrentPage] = useState('home');
  
  // Test local storage functionality
  const [storageTest, setStorageTest] = useState({
    saved: false,
    loaded: null
  });
  
  // Test local storage operations
  const testStorage = () => {
    try {
      // Save a test value
      saveToStorage(STORAGE_KEYS.SETTINGS, { test: 'Storage test successful!' });
      setStorageTest(prev => ({ ...prev, saved: true }));
      
      // Load the test value
      const loadedData = loadFromStorage(STORAGE_KEYS.SETTINGS);
      setStorageTest(prev => ({ ...prev, loaded: loadedData }));
    } catch (error) {
      console.error("Storage test error:", error);
      setStorageTest({ 
        saved: false, 
        loaded: { error: error.message } 
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Dynamic Pricing Optimizer</h1>
              <p className="text-sm text-gray-500">Make data-driven pricing decisions</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-1"
                onClick={() => setCurrentPage(currentPage === 'home' ? 'test' : 'home')}
              >
                {currentPage === 'home' ? 'Test Page' : 'Home'} <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={testStorage}
                title="Test Storage"
              >
                <PlusCircle className="h-5 w-5" />
              </Button>
              
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                Diagnostic Mode
              </span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6">
        {currentPage === 'home' ? (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Gradual App Testing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                This is a step-by-step approach to bring back the main App functionality.
                Use the buttons above to test navigation and storage functionality.
              </p>
              
              <div className="bg-gray-100 p-4 rounded-md mb-4">
                <h3 className="font-medium mb-2">Storage Test Results:</h3>
                <p><strong>Save operation:</strong> {storageTest.saved ? 'Successful' : 'Not tested yet'}</p>
                <p><strong>Load operation:</strong> {storageTest.loaded ? 'Successful' : 'Not tested yet'}</p>
                {storageTest.loaded && (
                  <pre className="bg-white p-2 rounded mt-2 text-sm overflow-auto">
                    {JSON.stringify(storageTest.loaded, null, 2)}
                  </pre>
                )}
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline"
                >
                  Reload Page
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Test Page</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This is a test page to verify navigation functionality.</p>
            </CardContent>
          </Card>
        )}
      </main>
      
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Dynamic Pricing Optimizer
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Help</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Privacy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GradualApp;