/**
 * CostStructureForm.jsx
 * Form component for inputting cost structure data
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, X, Save, BriefcaseBusiness, Download, Upload, RefreshCw, AlertCircle, HelpCircle } from 'lucide-react';
import { isPositiveNumber, isNonNegativeNumber, isValidPercentage } from '../../utils/validators';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * Cost Structure Form component
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onSave - Callback when form is saved
 * @param {Function} props.onLoadTemplate - Callback when template is loaded
 * @param {Object} props.costAnalysis - Cost analysis state from useCostAnalysis hook
 * @returns {JSX.Element} Cost structure form component
 */
const CostStructureForm = ({ onSave, onLoadTemplate, costAnalysis }) => {
  const {
    businessType,
    directCosts,
    indirectCosts,
    timeCosts,
    targetMargin,
    expectedVolume,
    errors,
    handleBusinessTypeChange,
    addDirectCost,
    updateDirectCost,
    removeDirectCost,
    addIndirectCost,
    updateIndirectCost,
    removeIndirectCost,
    addTimeCost,
    updateTimeCost,
    removeTimeCost,
    handleTargetMarginChange,
    handleExpectedVolumeChange,
    loadIndustryTemplate,
    validateAllInputs,
    getCostStructure,
    importCostData
  } = costAnalysis;

  // Local state
  const [showTips, setShowTips] = useState(true);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  /**
   * Handle form submission
   */
  const handleSubmit = () => {
    if (validateAllInputs()) {
      const costData = getCostStructure();
      if (onSave) onSave(costData);
    }
  };

  /**
   * Handle direct cost field change
   * @param {number} index - Index of cost to update
   * @param {string} field - Field to update
   * @param {string} value - New value
   */
  const handleDirectCostChange = (index, field, value) => {
    const cost = { ...directCosts[index] };
    cost[field] = value;
    updateDirectCost(index, cost);
  };

  /**
   * Handle indirect cost field change
   * @param {number} index - Index of cost to update
   * @param {string} field - Field to update
   * @param {string} value - New value
   */
  const handleIndirectCostChange = (index, field, value) => {
    const cost = { ...indirectCosts[index] };
    cost[field] = value;
    updateIndirectCost(index, cost);
  };

  /**
   * Handle time cost field change
   * @param {number} index - Index of cost to update
   * @param {string} field - Field to update
   * @param {string} value - New value
   */
  const handleTimeCostChange = (index, field, value) => {
    const cost = { ...timeCosts[index] };
    cost[field] = value;
    updateTimeCost(index, cost);
  };

  /**
   * Handle template selection
   * @param {string} industry - Industry template to load
   */
  const handleTemplateSelect = (industry) => {
    const template = loadIndustryTemplate(industry);
    if (onLoadTemplate) onLoadTemplate(template);
  };

  /**
   * Export cost structure as JSON
   */
  const handleExport = () => {
    const costData = getCostStructure();
    const dataStr = JSON.stringify(costData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `cost-structure-export-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  /**
   * Handle import
   */
  const handleImport = () => {
    try {
      setImportError('');
      const importedData = JSON.parse(importText);
      
      // Validate basic structure
      if (!importedData.directCosts || !importedData.indirectCosts || !importedData.timeCosts) {
        setImportError('Invalid cost structure format. Missing required cost categories.');
        return;
      }
      
      const success = importCostData(importedData);
      if (success) {
        setImportDialogOpen(false);
        setImportText('');
      } else {
        setImportError('Failed to import data. Please check the format.');
      }
    } catch (error) {
      setImportError('Invalid JSON format. Please check your data.');
    }
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
    
    importCostData(emptyData);
    setConfirmResetOpen(false);
  };

  /**
   * Check if any costs have been entered
   */
  const hasCostData = () => {
    return directCosts.some(cost => cost.name || cost.amount) || 
           indirectCosts.some(cost => cost.name || cost.amount) || 
           timeCosts.some(cost => cost.name || cost.rate || cost.hours);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BriefcaseBusiness className="h-5 w-5" />
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
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Paste your JSON cost structure data below:
                  </p>
                  <textarea 
                    className="w-full h-48 p-2 border rounded-md font-mono text-sm"
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    placeholder='{"businessType":"service","directCosts":[{"name":"Materials","amount":10,"unit":"unit"}],...}'
                  />
                  {importError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{importError}</AlertDescription>
                    </Alert>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setImportDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleImport}>Import</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1" 
              onClick={handleExport}
              disabled={!hasCostData()}
            >
              <Download className="h-4 w-4" />
              Export
            </Button>

            <Dialog open={confirmResetOpen} onOpenChange={setConfirmResetOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reset Cost Structure</DialogTitle>
                </DialogHeader>
                <p>
                  Are you sure you want to reset the cost structure? This will clear all your current cost data.
                </p>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setConfirmResetOpen(false)}>Cancel</Button>
                  <Button variant="destructive" onClick={handleReset}>Reset</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
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
          
          {/* Business Type & Templates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="business-type">Business Type</Label>
              <Select 
                value={businessType} 
                onValueChange={handleBusinessTypeChange}
              >
                <SelectTrigger id="business-type" className="w-full">
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">Service Business</SelectItem>
                  <SelectItem value="product">Product Business</SelectItem>
                  <SelectItem value="subscription">Subscription Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Load Template</Label>
              <Select onValueChange={handleTemplateSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an industry template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consulting">Consulting Business</SelectItem>
                  <SelectItem value="ecommerce">E-commerce Business</SelectItem>
                  <SelectItem value="saas">SaaS Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue="direct" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="direct">Direct Costs</TabsTrigger>
              <TabsTrigger value="indirect">Indirect Costs</TabsTrigger>
              <TabsTrigger value="time">Time Costs</TabsTrigger>
            </TabsList>
            
            {/* Direct Costs Tab */}
            <TabsContent value="direct" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Enter costs directly tied to each unit of your product or service (materials, components, etc.)
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Direct costs are costs that can be directly attributed to each unit you sell.
                        For a product business, this includes materials, packaging, and per-unit labor.
                        For a service business, this includes any supplies or resources used for each client.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {directCosts.map((cost, index) => (
                <div key={`direct-${index}`} className="flex items-end gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`direct-name-${index}`}>Item</Label>
                    <Input
                      id={`direct-name-${index}`}
                      value={cost.name}
                      onChange={(e) => handleDirectCostChange(index, 'name', e.target.value)}
                      placeholder="e.g., Materials"
                    />
                  </div>
                  <div className="w-24">
                    <Label htmlFor={`direct-amount-${index}`}>Cost</Label>
                    <Input
                      id={`direct-amount-${index}`}
                      type="number"
                      value={cost.amount}
                      onChange={(e) => handleDirectCostChange(index, 'amount', e.target.value)}
                      placeholder="0.00"
                      className={errors[`directCost_${index}`] ? 'border-red-500' : ''}
                    />
                  </div>
                  <div className="w-20">
                    <Label htmlFor={`direct-unit-${index}`}>Unit</Label>
                    <Input
                      id={`direct-unit-${index}`}
                      value={cost.unit}
                      onChange={(e) => handleDirectCostChange(index, 'unit', e.target.value)}
                      placeholder="unit"
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeDirectCost(index)}
                    disabled={directCosts.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button type="button" variant="outline" size="sm" onClick={addDirectCost} className="mt-2">
                <Plus className="h-4 w-4 mr-2" /> Add Direct Cost
              </Button>
            </TabsContent>
            
            {/* Indirect Costs Tab */}
            <TabsContent value="indirect" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Enter overhead costs that are not directly tied to individual units (rent, marketing, etc.)
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Indirect costs are overhead expenses that can't be directly attributed to individual units.
                        These include rent, utilities, software subscriptions, marketing, and administrative expenses.
                        These costs will be allocated across your expected monthly volume.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {indirectCosts.map((cost, index) => (
                <div key={`indirect-${index}`} className="flex items-end gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`indirect-name-${index}`}>Item</Label>
                    <Input
                      id={`indirect-name-${index}`}
                      value={cost.name}
                      onChange={(e) => handleIndirectCostChange(index, 'name', e.target.value)}
                      placeholder="e.g., Rent"
                    />
                  </div>
                  <div className="w-24">
                    <Label htmlFor={`indirect-amount-${index}`}>Cost</Label>
                    <Input
                      id={`indirect-amount-${index}`}
                      type="number"
                      value={cost.amount}
                      onChange={(e) => handleIndirectCostChange(index, 'amount', e.target.value)}
                      placeholder="0.00"
                      className={errors[`indirectCost_${index}`] ? 'border-red-500' : ''}
                    />
                  </div>
                  <div className="w-28">
                    <Label htmlFor={`indirect-period-${index}`}>Period</Label>
                    <Select 
                      value={cost.period} 
                      onValueChange={(value) => handleIndirectCostChange(index, 'period', value)}
                    >
                      <SelectTrigger id={`indirect-period-${index}`}>
                        <SelectValue placeholder="Period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="month">Monthly</SelectItem>
                        <SelectItem value="year">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeIndirectCost(index)}
                    disabled={indirectCosts.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button type="button" variant="outline" size="sm" onClick={addIndirectCost} className="mt-2">
                <Plus className="h-4 w-4 mr-2" /> Add Indirect Cost
              </Button>
            </TabsContent>
            
            {/* Time Costs Tab */}
            <TabsContent value="time" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  For service businesses: Enter time-based costs (consultant hours, labor, etc.)
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Time costs track labor expenses based on hourly rates. 
                        For consulting or service businesses, this includes time spent by team members on each client/project.
                        Enter the hourly rate and typical hours spent per unit of service.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {timeCosts.map((cost, index) => (
                <div key={`time-${index}`} className="flex items-end gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`time-name-${index}`}>Resource</Label>
                    <Input
                      id={`time-name-${index}`}
                      value={cost.name}
                      onChange={(e) => handleTimeCostChange(index, 'name', e.target.value)}
                      placeholder="e.g., Consultant"
                    />
                  </div>
                  <div className="w-24">
                    <Label htmlFor={`time-rate-${index}`}>Hourly Rate</Label>
                    <Input
                      id={`time-rate-${index}`}
                      type="number"
                      value={cost.rate}
                      onChange={(e) => handleTimeCostChange(index, 'rate', e.target.value)}
                      placeholder="0.00"
                      className={errors[`timeCost_${index}`] ? 'border-red-500' : ''}
                    />
                  </div>
                  <div className="w-24">
                    <Label htmlFor={`time-hours-${index}`}>Hours</Label>
                    <Input
                      id={`time-hours-${index}`}
                      type="number"
                      value={cost.hours}
                      onChange={(e) => handleTimeCostChange(index, 'hours', e.target.value)}
                      placeholder="0"
                      className={errors[`timeCost_${index}`] ? 'border-red-500' : ''}
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeTimeCost(index)}
                    disabled={timeCosts.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button type="button" variant="outline" size="sm" onClick={addTimeCost} className="mt-2">
                <Plus className="h-4 w-4 mr-2" /> Add Time Cost
              </Button>
            </TabsContent>
          </Tabs>
          
          {/* Target Margin and Volume */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <div className="flex items-center gap-2">
                <Label htmlFor="target-margin">Target Profit Margin (%)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Your target profit margin is the percentage of revenue you aim to keep as profit.
                        Industry averages vary: retail (15-45%), services (20-60%), software (60-80%).
                        Higher margins provide more flexibility but may limit market competitiveness.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="target-margin"
                type="number"
                value={targetMargin * 100}
                onChange={(e) => handleTargetMarginChange(Number(e.target.value) / 100)}
                min="0"
                max="100"
                className={!isValidPercentage(targetMargin * 100) ? 'border-red-500' : ''}
              />
              {!isValidPercentage(targetMargin * 100) && (
                <p className="text-xs text-red-500 mt-1">Enter a valid percentage (0-100)</p>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Label htmlFor="expected-volume">Expected Monthly Volume</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Your expected monthly volume is the number of units, clients, or projects you
                        expect to handle each month. This is used to allocate indirect costs across 
                        your business volume for per-unit pricing calculations.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="expected-volume"
                type="number"
                value={expectedVolume}
                onChange={(e) => handleExpectedVolumeChange(e.target.value)}
                min="1"
                className={!isPositiveNumber(expectedVolume) ? 'border-red-500' : ''}
              />
              {!isPositiveNumber(expectedVolume) && (
                <p className="text-xs text-red-500 mt-1">Enter a positive number</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div>
          {costAnalysis.costBreakdown && costAnalysis.costBreakdown.total > 0 && (
            <div className="text-sm">
              <span className="font-medium">Total Cost Per Unit:</span>{' '}
              <span className="font-bold">${costAnalysis.costBreakdown.total.toFixed(2)}</span>
            </div>
          )}
        </div>
        <Button 
          type="button" 
          onClick={handleSubmit} 
          className="flex items-center gap-2"
          disabled={!isValidPercentage(targetMargin * 100) || !isPositiveNumber(expectedVolume)}
        >
          <Save className="h-4 w-4" /> Save Cost Structure
        </Button>
      </CardFooter>
    </Card>
  );
};

CostStructureForm.propTypes = {
  onSave: PropTypes.func,
  onLoadTemplate: PropTypes.func,
  costAnalysis: PropTypes.object.isRequired
};

export default CostStructureForm;