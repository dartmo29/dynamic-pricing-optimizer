import React, { useState } from 'react';

/**
 * ComponentTest.jsx
 * A utility component for testing UI components individually
 */

const ComponentTest = ({ components = {} }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [testProps, setTestProps] = useState({});
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [testError, setTestError] = useState(null);
  
  // Log to the internal console
  const log = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setConsoleOutput(prev => [
      { message, timestamp, type },
      ...prev.slice(0, 49) // Keep last 50 logs
    ]);
  };
  
  // Add an error to the console
  const logError = (message, details = null) => {
    setTestError({ message, details });
    log(message, 'error');
  };
  
  // Clear the console
  const clearConsole = () => {
    setConsoleOutput([]);
    log('Console cleared');
  };
  
  // Select a component for testing
  const selectComponent = (componentName) => {
    setSelectedComponent(componentName);
    setTestProps({});
    setTestError(null);
    log(`Selected component: ${componentName}`);
  };
  
  // Update a test property value
  const updatePropValue = (propName, value) => {
    setTestProps(prev => ({
      ...prev,
      [propName]: value
    }));
    log(`Updated prop "${propName}" to: ${value}`);
  };
  
  // Render the selected component with the current test props
  const renderTestComponent = () => {
    if (!selectedComponent || !components[selectedComponent]) {
      return (
        <div className="p-10 bg-gray-100 rounded-lg text-center text-gray-500">
          Select a component to test
        </div>
      );
    }
    
    try {
      const Component = components[selectedComponent];
      return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <Component {...testProps} />
        </div>
      );
    } catch (error) {
      logError(`Error rendering component: ${error.message}`, error.stack);
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <h3 className="font-medium">Render Error:</h3>
          <p>{error.message}</p>
        </div>
      );
    }
  };
  
  // Get prop types for the selected component
  const getComponentProps = () => {
    if (!selectedComponent || !components[selectedComponent]) return [];
    
    // These are just example props - in a real implementation,
    // we would extract them from the component definition
    const componentPropMap = {
      'Button': [
        { name: 'variant', type: 'select', options: ['default', 'outline', 'ghost', 'link'] },
        { name: 'size', type: 'select', options: ['default', 'sm', 'lg'] },
        { name: 'children', type: 'text', default: 'Button Text' },
        { name: 'disabled', type: 'boolean' }
      ],
      'Input': [
        { name: 'type', type: 'select', options: ['text', 'number', 'email', 'password'] },
        { name: 'placeholder', type: 'text', default: 'Enter text...' },
        { name: 'disabled', type: 'boolean' }
      ],
      'Card': [
        { name: 'children', type: 'text', default: 'Card Content' },
        { name: 'className', type: 'text' }
      ],
      'Dialog': [
        { name: 'title', type: 'text', default: 'Dialog Title' },
        { name: 'description', type: 'text', default: 'Dialog description goes here.' },
        { name: 'open', type: 'boolean', default: true }
      ]
    };
    
    return componentPropMap[selectedComponent] || [];
  };
  
  // Render prop controls for the selected component
  const renderPropControls = () => {
    const props = getComponentProps();
    
    if (props.length === 0) {
      return (
        <div className="p-4 bg-gray-50 rounded-lg text-gray-500 text-center">
          No configurable props available
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {props.map((prop) => (
          <div key={prop.name} className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">{prop.name}</label>
            
            {prop.type === 'text' && (
              <input
                type="text"
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                value={testProps[prop.name] !== undefined ? testProps[prop.name] : (prop.default || '')}
                onChange={(e) => updatePropValue(prop.name, e.target.value)}
              />
            )}
            
            {prop.type === 'boolean' && (
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  checked={testProps[prop.name] !== undefined ? testProps[prop.name] : (prop.default || false)}
                  onChange={(e) => updatePropValue(prop.name, e.target.checked)}
                />
                <span className="text-sm text-gray-500">Enabled</span>
              </label>
            )}
            
            {prop.type === 'select' && (
              <select
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                value={testProps[prop.name] !== undefined ? testProps[prop.name] : (prop.default || prop.options[0])}
                onChange={(e) => updatePropValue(prop.name, e.target.value)}
              >
                {prop.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Component Selection */}
      <div className="md:col-span-1 p-6 bg-white shadow rounded-lg">
        <h2 className="text-lg font-bold mb-4">Components</h2>
        
        <div className="space-y-2">
          {Object.keys(components).map((componentName) => (
            <button
              key={componentName}
              className={`w-full text-left px-3 py-2 rounded-md ${
                selectedComponent === componentName 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
              }`}
              onClick={() => selectComponent(componentName)}
            >
              {componentName}
            </button>
          ))}
        </div>
      </div>
      
      {/* Main Testing Area */}
      <div className="md:col-span-2 space-y-6">
        {/* Component Preview */}
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-bold mb-4">Preview</h2>
          {renderTestComponent()}
        </div>
        
        {/* Props Configuration */}
        {selectedComponent && (
          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-lg font-bold mb-4">Properties</h2>
            {renderPropControls()}
          </div>
        )}
        
        {/* Console Output */}
        <div className="p-6 bg-white shadow rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Console</h2>
            <button
              className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded-md text-sm hover:bg-gray-300"
              onClick={clearConsole}
            >
              Clear
            </button>
          </div>
          
          <div className="bg-gray-900 text-gray-300 p-3 rounded-lg h-40 overflow-y-auto font-mono text-sm">
            {consoleOutput.length === 0 ? (
              <div className="text-gray-500">No output yet</div>
            ) : (
              consoleOutput.map((entry, index) => (
                <div key={index} className={`${
                  entry.type === 'error' ? 'text-red-400' : 
                  entry.type === 'warning' ? 'text-yellow-400' : 
                  entry.type === 'success' ? 'text-green-400' : 
                  'text-gray-300'
                }`}>
                  <span className="text-gray-500">[{entry.timestamp}]</span> {entry.message}
                </div>
              ))
            )}
          </div>
          
          {testError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <h3 className="font-medium">Error Details:</h3>
              {testError.details && (
                <pre className="mt-1 p-2 bg-red-100 rounded text-xs text-red-800 overflow-auto max-h-32">
                  {testError.details}
                </pre>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComponentTest;