/**
 * CostStructure.jsx
 * Main component for managing and displaying cost structure data
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, Save, AlertCircle, Download, Upload, RefreshCw, Briefcase } from 'lucide-react';

import CostStructureForm from './CostStructureForm';
import CostBreakdownChart from './CostBreakdownChart';
import BreakEvenAnalysisChart from './BreakEvenAnalysisChart';
import CostDataImport from './CostDataImport';

/**
 * CostStructure component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.costAnalysis - Cost analysis state from useCostAnalysis hook
 * @param {Function} props.onSave - Callback when cost structure is saved
 * @param {Function} props.onContinue - Callback to continue to next section
 * @param {boolean} props.showCharts - Whether to show charts (default: true)
 * @returns {JSX.Element} CostStructure component
 */
const CostStructure = ({ costAnalysis, onSave, onContinue, showCharts = true }) => {
  const [activeTab, setActiveTab] = useState('form');
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [showTips, setShowTips] = useState(true);

  /**
   * Handle saving cost structure
   * @param {Object} costData - Cost structure data
   */
  const handleSave = (costData) => {
    if (onSave) {
      onSave(costData);
    }
  };

  /**
   * Handle importing cost data
   * @param {Object} importedData - Imported cost data
   */
  const handleImport = (importedData) => {
    const success = costAnalysis.importCostData(importedData);
    
    if (success) {
      setImportDialogOpen(false);
      costAnalysis.recalculateCostBreakdown();
    }
    
    return success;
  };

  /**
   * Export cost structure as JSON
   */
  const handleExport = () => {
    const costData = costAnalysis.getCostStructure();
    const dataStr = JSON.stringify(costData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `cost-structure-export-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  /**
   * Reset cost structure to empty state
   */
  const handleReset = () => {
    // Create a new empty cost structure
    const emptyData = {
      businessType: 'service',
      directCosts: [{ name: '', amount: '', unit: 'unit' }],
      indirectCosts: [{ name: '', amount: '', period: 'month' }],
      timeCosts: [{ name: '', rate: '', hours: '' }],
      targetMargin: 0.30,
      expectedVolume: 100
    };
    
    handleImport(emptyData);
  };

  /**
   * Check if cost structure is valid and has data
   */
  const hasCostData = costAnalysis.costBreakdown && costAnalysis.costBreakdown.total > 0;

  return (
    <div className="space-y-6">
      {/* Main Card */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Cost Structure
              </CardTitle>
              <CardDescription>
                Define your business costs to calculate optimal pricing
              </CardDescription>
            </div>
            
            <div className="flex gap-2">
              <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Upload className="h-4 w-4" />
                    Import
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Import Cost Data</DialogTitle>
                  </DialogHeader>
                  <CostDataImport onImport={handleImport} />
                </DialogContent>
              </Dialog>

              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1" 
                onClick={handleExport}
                disabled={!hasCostData}
              >
                <Download className="h-4 w-4" />
                Export
              </Button>

              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleReset}
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="form">Cost Structure Form</TabsTrigger>
              {showCharts && <TabsTrigger value="analysis" disabled={!hasCostData}>Cost Analysis</TabsTrigger>}
            </TabsList>
            
            <TabsContent value="form">
              <div className="space-y-4">
                {showTips && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Tips for accurate pricing</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc pl-5 mt-2 text-sm">
                        <li>Include all direct costs associated with each unit of your product/service</li>
                        <li>Don't forget overhead costs like rent, utilities, and software</li>
                        <li>For service businesses, track time costs separately</li>
                        <li>Set a realistic target margin based on your industry</li>
                      </ul>
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="mt-2 p-0 h-auto" 
                        onClick={() => setShowTips(false)}
                      >
                        Dismiss
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}
                
                <CostStructureForm 
                  onSave={handleSave} 
                  costAnalysis={costAnalysis} 
                />
              </div>
            </TabsContent>
            
            {showCharts && (
              <TabsContent value="analysis">
                <div className="space-y-6">
                  <CostBreakdownChart 
                    costBreakdown={{
                      ...costAnalysis.costBreakdown, 
                      targetMargin: costAnalysis.targetMargin
                    }} 
                  />
                  
                  {hasCostData && (
                    <BreakEvenAnalysisChart 
                      costBreakdown={costAnalysis.costBreakdown}
                      targetMargin={costAnalysis.targetMargin}
                      price={costAnalysis.costModel.calculateMinimumViablePrice()}
                      monthlyVolume={costAnalysis.expectedVolume}
                    />
                  )}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
        
        {onContinue && (
          <CardFooter className="flex justify-between">
            <div>
              {hasCostData && (
                <div className="text-sm">
                  <span className="font-medium">Minimum Viable Price:</span>{' '}
                  <span className="font-bold">${costAnalysis.costModel.calculateMinimumViablePrice().toFixed(2)}</span>{' '}
                  <span className="text-gray-500">
                    (at {(costAnalysis.targetMargin * 100).toFixed(0)}% margin)
                  </span>
                </div>
              )}
            </div>
            <Button 
              onClick={onContinue}
              disabled={!hasCostData}
              className="flex items-center gap-1"
            >
              Continue 
              <FileText className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

CostStructure.propTypes = {
  costAnalysis: PropTypes.object.isRequired,
  onSave: PropTypes.func,
  onContinue: PropTypes.func,
  showCharts: PropTypes.bool,
};

export default CostStructure;