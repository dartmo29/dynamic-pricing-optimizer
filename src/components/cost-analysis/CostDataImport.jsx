/**
 * CostDataImport.jsx
 * Component for importing cost data from CSV files
 */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileUp, Download, AlertCircle } from 'lucide-react';
import { 
  parseCostDataFromFile, 
  downloadSampleCostData 
} from '../../utils/importExport';

/**
 * Cost Data Import Component
 * Allows users to import cost data from CSV files or download sample templates
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onImport - Callback when data is imported successfully
 * @returns {JSX.Element} CostDataImport component
 */
const CostDataImport = ({ onImport }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  /**
   * Handle file selection
   * @param {Event} event - File input change event
   */
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    
    if (!file) return;
    
    // Reset state
    setError(null);
    setIsLoading(true);
    
    try {
      // Check file type
      if (!file.name.endsWith('.csv')) {
        throw new Error('Only CSV files are supported');
      }

      // Parse cost data from file
      const costData = await parseCostDataFromFile(file);

      // Call onImport callback with parsed data
      if (onImport) {
        onImport(costData);
      }
      
      // Close dialog
      setIsOpen(false);
    } catch (err) {
      setError(err.message || 'Failed to import cost data');
    } finally {
      setIsLoading(false);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  /**
   * Handle download sample data
   * @param {string} industry - Industry type
   */
  const handleDownloadSample = (industry) => {
    downloadSampleCostData(industry);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto" size="sm">
          <FileUp className="h-4 w-4 mr-2" /> Import Cost Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Cost Data</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-500">
            Upload a CSV file with your cost data or download a sample template to get started.
          </p>
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <label htmlFor="cost-file" className="text-sm font-medium">
              Upload CSV File
            </label>
            <input
              id="cost-file"
              type="file"
              accept=".csv"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500">
              The CSV file should include columns for Type, Name, Amount, Period, Rate, and Hours.
            </p>
          </div>
          
          <div className="pt-2 border-t border-gray-200">
            <h4 className="text-sm font-medium mb-2">Download Sample Templates</h4>
            <div className="flex flex-wrap gap-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => handleDownloadSample('service')}
              >
                <Download className="h-4 w-4 mr-2" /> Service Business
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => handleDownloadSample('retail')}
              >
                <Download className="h-4 w-4 mr-2" /> Retail Business
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => handleDownloadSample('saas')}
              >
                <Download className="h-4 w-4 mr-2" /> SaaS Business
              </Button>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

CostDataImport.propTypes = {
  onImport: PropTypes.func.isRequired
};

export default CostDataImport;
