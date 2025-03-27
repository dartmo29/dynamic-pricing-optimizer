/**
 * CostDataImport.jsx
 * Component for importing cost data from various sources
 */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Upload, FileUp, Code } from 'lucide-react';

/**
 * Cost Data Import component
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onImport - Callback when data is imported
 * @returns {JSX.Element} CostDataImport component
 */
const CostDataImport = ({ onImport }) => {
  // State for import methods
  const [activeTab, setActiveTab] = useState('json');
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Ref for file input
  const fileInputRef = useRef(null);

  /**
   * Process JSON import
   */
  const handleJsonImport = () => {
    setError('');
    setIsProcessing(true);
    
    try {
      const data = JSON.parse(jsonText);
      
      // Basic validation of structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid JSON structure. Expected an object.');
      }
      
      // Check required properties
      if (
        !Array.isArray(data.directCosts) || 
        !Array.isArray(data.indirectCosts) || 
        !Array.isArray(data.timeCosts)
      ) {
        throw new Error('Invalid cost structure format. Missing required cost arrays.');
      }
      
      // Validate business type
      if (data.businessType && !['service', 'product', 'subscription'].includes(data.businessType)) {
        throw new Error('Invalid business type. Must be "service", "product", or "subscription".');
      }
      
      // Validate target margin
      if (data.targetMargin !== undefined && (
        typeof data.targetMargin !== 'number' || 
        data.targetMargin < 0 || 
        data.targetMargin > 1
      )) {
        throw new Error('Invalid target margin. Must be a number between 0 and 1.');
      }
      
      // Validate expected volume
      if (data.expectedVolume !== undefined && (
        typeof data.expectedVolume !== 'number' || 
        data.expectedVolume <= 0
      )) {
        throw new Error('Invalid expected volume. Must be a positive number.');
      }
      
      // Pass to parent component
      const success = onImport(data);
      
      if (!success) {
        throw new Error('Failed to import data. The data may be valid but could not be processed.');
      }
      
      // Clear form on success
      setJsonText('');
    } catch (error) {
      setError(error.message || 'Invalid JSON format. Please check your data.');
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Handle file upload
   * @param {Event} event - File input change event
   */
  const handleFileUpload = (event) => {
    setError('');
    const file = event.target.files?.[0];
    
    if (!file) {
      setError('No file selected.');
      return;
    }
    
    // Check file type
    if (!file.name.endsWith('.json')) {
      setError('Only JSON files are supported at this time.');
      return;
    }
    
    setIsProcessing(true);
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const data = JSON.parse(content);
        
        // Same validation as JSON text
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid JSON structure. Expected an object.');
        }
        
        if (
          !Array.isArray(data.directCosts) || 
          !Array.isArray(data.indirectCosts) || 
          !Array.isArray(data.timeCosts)
        ) {
          throw new Error('Invalid cost structure format. Missing required cost arrays.');
        }
        
        // Pass to parent component
        const success = onImport(data);
        
        if (!success) {
          throw new Error('Failed to import data. The data may be valid but could not be processed.');
        }
        
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        setError(error.message || 'Invalid file format. Please check your data.');
      } finally {
        setIsProcessing(false);
      }
    };
    
    reader.onerror = () => {
      setError('Error reading file. Please try again.');
      setIsProcessing(false);
    };
    
    reader.readAsText(file);
  };

  /**
   * Render a sample of the expected JSON structure
   */
  const renderJsonSample = () => {
    const sample = {
      businessType: "service",
      directCosts: [
        { name: "Materials", amount: 25, unit: "unit" },
        { name: "Packaging", amount: 2.5, unit: "unit" }
      ],
      indirectCosts: [
        { name: "Rent", amount: 1200, period: "month" },
        { name: "Marketing", amount: 500, period: "month" }
      ],
      timeCosts: [
        { name: "Labor", rate: 20, hours: 2 }
      ],
      targetMargin: 0.3,
      expectedVolume: 50
    };
    
    return JSON.stringify(sample, null, 2);
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="json" className="flex items-center gap-2">
            <Code className="h-4 w-4" /> JSON Text
          </TabsTrigger>
          <TabsTrigger value="file" className="flex items-center gap-2">
            <FileUp className="h-4 w-4" /> File Upload
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="json" className="space-y-4">
          <p className="text-sm text-gray-500">
            Paste your JSON cost structure data below:
          </p>
          <div className="flex flex-col space-y-2">
            <textarea 
              className="w-full h-48 p-2 border rounded-md font-mono text-sm"
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder={`// Example format:\n${renderJsonSample()}`}
            />
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setJsonText(renderJsonSample())}
              >
                Load Example
              </Button>
              <Button 
                onClick={handleJsonImport}
                disabled={!jsonText.trim() || isProcessing}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Import JSON
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="file" className="space-y-4">
          <p className="text-sm text-gray-500">
            Upload a JSON file containing your cost structure data:
          </p>
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md">
            <Input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="max-w-xs"
            />
            <p className="text-xs text-gray-400 mt-2">
              Only .json files are supported
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="pt-2 border-t border-gray-200">
        <h4 className="text-sm font-medium mb-2">Expected Structure</h4>
        <p className="text-xs text-gray-500 mb-2">
          Your data should include these key properties:
        </p>
        <ul className="text-xs text-gray-500 list-disc pl-5 space-y-1">
          <li><code>businessType</code>: "service", "product", or "subscription"</li>
          <li><code>directCosts</code>: Array of direct costs (materials, etc.)</li>
          <li><code>indirectCosts</code>: Array of indirect costs (rent, etc.)</li>
          <li><code>timeCosts</code>: Array of time-based costs (labor, etc.)</li>
          <li><code>targetMargin</code>: Target profit margin as decimal (0.3 = 30%)</li>
          <li><code>expectedVolume</code>: Expected monthly sales/clients volume</li>
        </ul>
      </div>
    </div>
  );
};

CostDataImport.propTypes = {
  onImport: PropTypes.func.isRequired
};

export default CostDataImport;