import React, { useEffect, useState } from 'react';
import ComponentTest from '../components/testing/ComponentTest';

// Import UI components for testing
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';

/**
 * ComponentTestPage
 * A page to test individual UI components in isolation
 */
const ComponentTestPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [availableComponents, setAvailableComponents] = useState({});
  
  // Try to load and initialize the components
  useEffect(() => {
    const loadComponents = async () => {
      try {
        // Initialize component map
        const componentMap = {};
        
        // Attempt to load Button component
        try {
          componentMap['Button'] = props => <Button {...props} />;
          console.log('Button component loaded successfully');
        } catch (error) {
          console.error('Failed to load Button component:', error);
        }
        
        // Attempt to load Input component
        try {
          componentMap['Input'] = props => <Input {...props} />;
          console.log('Input component loaded successfully');
        } catch (error) {
          console.error('Failed to load Input component:', error);
        }
        
        // Attempt to load Card component
        try {
          // Create a complete Card example
          componentMap['Card'] = props => (
            <Card>
              <CardHeader>
                <CardTitle>{props.title || 'Card Title'}</CardTitle>
                {props.description && <CardDescription>{props.description}</CardDescription>}
              </CardHeader>
              <CardContent>
                {props.children || 'Card Content'}
              </CardContent>
              {props.footerContent && (
                <CardFooter>
                  {props.footerContent}
                </CardFooter>
              )}
            </Card>
          );
          console.log('Card component loaded successfully');
        } catch (error) {
          console.error('Failed to load Card component:', error);
        }
        
        // Attempt to load Tabs component
        try {
          // Create a complete Tabs example
          componentMap['Tabs'] = props => (
            <Tabs defaultValue={props.defaultTab || 'tab1'}>
              <TabsList>
                <TabsTrigger value="tab1">{props.tab1Label || 'Tab 1'}</TabsTrigger>
                <TabsTrigger value="tab2">{props.tab2Label || 'Tab 2'}</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                {props.tab1Content || 'Tab 1 Content'}
              </TabsContent>
              <TabsContent value="tab2">
                {props.tab2Content || 'Tab 2 Content'}
              </TabsContent>
            </Tabs>
          );
          console.log('Tabs component loaded successfully');
        } catch (error) {
          console.error('Failed to load Tabs component:', error);
        }
        
        // Attempt to load Dialog component
        try {
          // Create a complete Dialog example
          componentMap['Dialog'] = props => (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">{props.triggerText || 'Open Dialog'}</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{props.title || 'Dialog Title'}</DialogTitle>
                  <DialogDescription>
                    {props.description || 'Dialog description goes here.'}
                  </DialogDescription>
                </DialogHeader>
                {props.children || 'Dialog Content'}
              </DialogContent>
            </Dialog>
          );
          console.log('Dialog component loaded successfully');
        } catch (error) {
          console.error('Failed to load Dialog component:', error);
        }
        
        // Set the available components
        setAvailableComponents(componentMap);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize component test page:', error);
        setLoadError(error.message);
        setIsLoading(false);
      }
    };
    
    loadComponents();
  }, []);
  
  // If still loading, show a loading indicator
  if (isLoading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" role="status"></div>
          <p className="mt-4 text-gray-600">Loading component test environment...</p>
        </div>
      </div>
    );
  }
  
  // If there was an error loading, show error message
  if (loadError) {
    return (
      <div className="p-10 flex items-center justify-center min-h-screen">
        <div className="max-w-md p-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <h1 className="text-xl font-bold mb-4">Component Test Error</h1>
          <p className="mb-3">There was an error initializing the component test environment:</p>
          <pre className="p-3 bg-red-100 rounded text-sm overflow-auto">
            {loadError}
          </pre>
          <p className="mt-4">
            Please check the browser console for more details.
          </p>
        </div>
      </div>
    );
  }
  
  // If there are no components available, show a message
  if (Object.keys(availableComponents).length === 0) {
    return (
      <div className="p-10 flex items-center justify-center min-h-screen">
        <div className="max-w-md p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700">
          <h1 className="text-xl font-bold mb-4">No Components Available</h1>
          <p>
            No UI components could be loaded for testing. This may indicate an issue with the UI component library.
          </p>
          <p className="mt-4">
            Please check the browser console for more details.
          </p>
        </div>
      </div>
    );
  }
  
  // Render the component test UI
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">UI Component Test</h1>
          <p className="text-gray-600">
            Test individual UI components in isolation to identify any rendering issues.
          </p>
        </header>
        
        <main className="mb-8">
          {/* Component Test utility */}
          <ComponentTest components={availableComponents} />
        </main>
        
        <footer className="pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {Object.keys(availableComponents).length} components available for testing
            </p>
            <p className="text-sm text-gray-500">
              Check console for detailed error messages
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ComponentTestPage;