/**
 * CostStructure.jsx
 * Component for managing cost structure input and analysis
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Plus, Trash2, Save, ArrowRight, AlertCircle, FileDown, FileUp } from 'lucide-react';

// Import cost data import component
import CostDataImport from './CostDataImport';

/**
 * CostStructure component
 * For managing and displaying cost structure
 */
const CostStructure = ({ 
  costAnalysis,
  onSave,
  onContinue
}) => {
  // Active tab state
  const [activeTab, setActiveTab] = useState('direct');
  
  // Local state for form input
  const [directCosts, setDirectCosts] = useState(costAnalysis?.directCosts || []);
  const [indirectCosts, setIndirectCosts] = useState(costAnalysis?.indirectCosts || []);
  const [timeCosts, setTimeCosts] = useState(costAnalysis?.timeCosts || []);
  const [targetMargin, setTargetMargin] = useState(costAnalysis?.targetMargin || 0.3);
  const [expectedVolume, setExpectedVolume] = useState(costAnalysis?.expectedVolume || 100);
  
  // Validation state
  const [errors, setErrors] = useState({});
  const [showImport, setShowImport] = useState(false);

  // Update local state when costAnalysis changes
  useEffect(() => {
    if (costAnalysis) {
      setDirectCosts(costAnalysis.directCosts || []);
      setIndirectCosts(costAnalysis.indirectCosts || []);
      setTimeCosts(costAnalysis.timeCosts || []);
      setTargetMargin(costAnalysis.targetMargin || 0.3);
      setExpectedVolume(costAnalysis.expectedVolume || 100);
    }
  }, [costAnalysis]);

  // Handle adding a direct cost
  const handleAddDirectCost = () => {
    const newCost = costAnalysis.addDirectCost();
    setDirectCosts([...costAnalysis.directCosts]);
  };

  // Handle updating a direct cost
  const handleUpdateDirectCost = (index, field, value) => {
    const updatedCost = { ...directCosts[index], [field]: value };
    costAnalysis.updateDirectCost(index, updatedCost);
    setDirectCosts([...costAnalysis.directCosts]);
    
    // Clear error for this field if any
    if (errors[`directCost_${index}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`directCost_${index}`];
        return newErrors;
      });
    }
  };

  // Handle removing a direct cost
  const handleRemoveDirectCost = (index) => {
    costAnalysis.removeDirectCost(index);
    setDirectCosts([...costAnalysis.directCosts]);
  };

  // Handle adding an indirect cost
  const handleAddIndirectCost = () => {
    const newCost = costAnalysis.addIndirectCost();
    setIndirectCosts([...costAnalysis.indirectCosts]);
  };

  // Handle updating an indirect cost
  const handleUpdateIndirectCost = (index, field, value) => {
    const updatedCost = { ...indirectCosts[index], [field]: value };
    costAnalysis.updateIndirectCost(index, updatedCost);
    setIndirectCosts([...costAnalysis.indirectCosts]);
    
    // Clear error for this field if any
    if (errors[`indirectCost_${index}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`indirectCost_${index}`];
        return newErrors;
      });
    }
  };

  // Handle removing an indirect cost
  const handleRemoveIndirectCost = (index) => {
    costAnalysis.removeIndirectCost(index);
    setIndirectCosts([...costAnalysis.indirectCosts]);
  };

  // Handle adding a time cost
  const handleAddTimeCost = () => {
    const newCost = costAnalysis.addTimeCost();
    setTimeCosts([...costAnalysis.timeCosts]);
  };

  // Handle updating a time cost
  const handleUpdateTimeCost = (index, field, value) => {
    const updatedCost = { ...timeCosts[index], [field]: value };
    costAnalysis.updateTimeCost(index, updatedCost);
    setTimeCosts([...costAnalysis.timeCosts]);
    
    // Clear error for this field if any
    if (errors[`timeCost_${index}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`timeCost_${index}`];
        return newErrors;
      });
    }
  };

  // Handle removing a time cost
  const handleRemoveTimeCost = (index) => {
    costAnalysis.removeTimeCost(index);
    setTimeCosts([...costAnalysis.timeCosts]);
  };

  // Handle updating target margin
  const handleTargetMarginChange = (value) => {
    const newMargin = value[0];
    setTargetMargin(newMargin);
    costAnalysis.handleTargetMarginChange(newMargin);
  };

  // Handle updating expected volume
  const handleExpectedVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value) || 0;
    setExpectedVolume(newVolume);
    costAnalysis.handleExpectedVolumeChange(newVolume);
  };

  // Handle saving cost structure
  const handleSave = () => {
    // Validate inputs first
    const isValid = costAnalysis.validateAllInputs();
    
    if (isValid) {
      // Recalculate cost breakdown
      costAnalysis.recalculateCostBreakdown();
      
      // Call onSave callback if provided
      if (typeof onSave === 'function') {
        onSave(costAnalysis.getCostStructure());
      }
    } else {
      // Set errors from costAnalysis
      setErrors(costAnalysis.errors || {});
    }
  };

  // Handle continue button click
  const handleContinue = () => {
    handleSave();
    
    // Call onContinue callback if provided
    if (typeof onContinue === 'function') {
      onContinue();
    }
  };

  // Handle import data success
  const handleImportSuccess = (importedData) => {
    const success = costAnalysis.importCostData(importedData);
    
    if (success) {
      setDirectCosts([...costAnalysis.directCosts]);
      setIndirectCosts([...costAnalysis.indirectCosts]);
      setTimeCosts([...costAnalysis.timeCosts]);
      setTargetMargin(costAnalysis.targetMargin);
      setExpectedVolume(costAnalysis.expectedVolume);
      setShowImport(false);
    }
  };

  // Calculate cost metrics for display
  const calculateTotalDirectCost = () => {
    return directCosts.reduce((sum, cost) => sum + (parseFloat(cost.amount) || 0), 0);
  };

  const calculateTotalIndirectCost = () => {
    return indirectCosts.reduce((sum, cost) => sum + (parseFloat(cost.amount) || 0), 0);
  };

  const calculateTotalTimeCost = () => {
    return timeCosts.reduce((sum, cost) => {
      const rate = parseFloat(cost.rate) || 0;
      const hours = parseFloat(cost.hours) || 0;
      return sum + (rate * hours);
    }, 0);
  };

  const calculateIndirectCostPerUnit = () => {
    const totalIndirect = calculateTotalIndirectCost();
    return expectedVolume ? totalIndirect / expectedVolume : 0;
  };

  const calculateTotalCostPerUnit = () => {
    const directCost = calculateTotalDirectCost();
    const timeCost = calculateTotalTimeCost();
    const indirectCostPerUnit = calculateIndirectCostPerUnit();
    
    return directCost + timeCost + indirectCostPerUnit;
  };

  const calculateMinimumPrice = () => {
    const totalCost = calculateTotalCostPerUnit();
    return totalCost / (1 - targetMargin);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Cost Structure Analysis</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowImport(true)}
            className="flex items-center gap-1"
          >
            <FileUp className="h-4 w-4" /> Import
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
          >
            <FileDown className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="direct">Direct Costs</TabsTrigger>
              <TabsTrigger value="indirect">Indirect Costs</TabsTrigger>
              <TabsTrigger value="time">Time Costs</TabsTrigger>
            </TabsList>
            
            {/* Direct Costs Tab */}
            <TabsContent value="direct" className="space-y-4">
              <p className="text-sm text-gray-500">
                Direct costs are costs that can be directly attributed to each unit of your product or service.
              </p>
              
              {directCosts.map((cost, index) => (
                <div key={`direct-${index}`} className="flex gap-2 items-start">
                  <div className="grid grid-cols-2 gap-2 flex-grow">
                    <div>
                      <Input
                        placeholder="Cost Name"
                        value={cost.name}
                        onChange={(e) => handleUpdateDirectCost(index, 'name', e.target.value)}
                        className={errors[`directCost_${index}`] ? 'border-red-500' : ''}
                      />
                      {errors[`directCost_${index}`] && (
                        <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> Invalid input
                        </div>
                      )}
                    </div>
                    <div>
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={cost.amount}
                        onChange={(e) => handleUpdateDirectCost(index, 'amount', e.target.value)}
                        className="text-right"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveDirectCost(index)}
                    disabled={directCosts.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={handleAddDirectCost}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Direct Cost
              </Button>
            </TabsContent>
            
            {/* Indirect Costs Tab */}
            <TabsContent value="indirect" className="space-y-4">
              <p className="text-sm text-gray-500">
                Indirect costs are overhead expenses that cannot be directly attributed to individual units.
              </p>
              
              {indirectCosts.map((cost, index) => (
                <div key={`indirect-${index}`} className="flex gap-2 items-start">
                  <div className="grid grid-cols-3 gap-2 flex-grow">
                    <div>
                      <Input
                        placeholder="Cost Name"
                        value={cost.name}
                        onChange={(e) => handleUpdateIndirectCost(index, 'name', e.target.value)}
                        className={errors[`indirectCost_${index}`] ? 'border-red-500' : ''}
                      />
                      {errors[`indirectCost_${index}`] && (
                        <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> Invalid input
                        </div>
                      )}
                    </div>
                    <div>
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={cost.amount}
                        onChange={(e) => handleUpdateIndirectCost(index, 'amount', e.target.value)}
                        className="text-right"
                        step="1"
                        min="0"
                      />
                    </div>
                    <div>
                      <Select
                        value={cost.period}
                        onValueChange={(value) => handleUpdateIndirectCost(index, 'period', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="month">Per Month</SelectItem>
                          <SelectItem value="year">Per Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveIndirectCost(index)}
                    disabled={indirectCosts.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={handleAddIndirectCost}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Indirect Cost
              </Button>
            </TabsContent>
            
            {/* Time Costs Tab */}
            <TabsContent value="time" className="space-y-4">
              <p className="text-sm text-gray-500">
                Time costs represent the value of time spent on each unit of your product or service.
              </p>
              
              {timeCosts.map((cost, index) => (
                <div key={`time-${index}`} className="flex gap-2 items-start">
                  <div className="grid grid-cols-3 gap-2 flex-grow">
                    <div>
                      <Input
                        placeholder="Activity Name"
                        value={cost.name}
                        onChange={(e) => handleUpdateTimeCost(index, 'name', e.target.value)}
                        className={errors[`timeCost_${index}`] ? 'border-red-500' : ''}
                      />
                      {errors[`timeCost_${index}`] && (
                        <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> Invalid input
                        </div>
                      )}
                    </div>
                    <div>
                      <Input
                        type="number"
                        placeholder="Hourly Rate"
                        value={cost.rate}
                        onChange={(e) => handleUpdateTimeCost(index, 'rate', e.target.value)}
                        className="text-right"
                        step="1"
                        min="0"
                      />
                    </div>
                    <div>
                      <Input
                        type="number"
                        placeholder="Hours Per Unit"
                        value={cost.hours}
                        onChange={(e) => handleUpdateTimeCost(index, 'hours', e.target.value)}
                        className="text-right"
                        step="0.1"
                        min="0"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveTimeCost(index)}
                    disabled={timeCosts.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={handleAddTimeCost}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Time Cost
              </Button>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="expectedVolume" className="mb-1 block">
                Expected Monthly Volume
              </Label>
              <Input
                id="expectedVolume"
                type="number"
                value={expectedVolume}
                onChange={handleExpectedVolumeChange}
                className={errors.expectedVolume ? 'border-red-500' : ''}
                min="1"
                placeholder="e.g., 100 units/month"
              />
              {errors.expectedVolume && (
                <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Expected volume is required
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">
                The average number of units/services you expect to sell per month
              </p>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="targetMargin">Target Profit Margin</Label>
                <span className="text-sm font-medium">{(targetMargin * 100).toFixed(0)}%</span>
              </div>
              <Slider
                id="targetMargin"
                min={0.05}
                max={0.9}
                step={0.05}
                value={[targetMargin]}
                onValueChange={handleTargetMarginChange}
                className="mb-2"
              />
              <p className="text-xs text-gray-500">
                Your desired profit margin as a percentage of your selling price
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Cost Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Direct Costs:</span>
                  <span className="font-medium">${calculateTotalDirectCost().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Time Costs:</span>
                  <span className="font-medium">${calculateTotalTimeCost().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Monthly Indirect Costs:</span>
                  <span className="font-medium">${calculateTotalIndirectCost().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Indirect Cost per Unit:</span>
                  <span className="font-medium">
                    ${calculateIndirectCostPerUnit().toFixed(2)}
                  </span>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center font-medium">
                    <span>Total Cost per Unit:</span>
                    <span>${calculateTotalCostPerUnit().toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Target Margin:</span>
                    <span className="font-medium">{(targetMargin * 100).toFixed(0)}%</span>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center text-blue-600">
                    <span className="font-bold">Minimum Viable Price:</span>
                    <span className="font-bold">${calculateMinimumPrice().toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    This is the minimum price needed to achieve your target margin
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 space-y-3">
            <Button 
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2"
            >
              <Save className="h-4 w-4" /> Save Cost Structure
            </Button>
            
            <Button 
              onClick={handleContinue}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              Continue to Pricing <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Import Dialog */}
      {showImport && (
        <CostDataImport
          onClose={() => setShowImport(false)}
          onImport={handleImportSuccess}
        />
      )}
    </div>
  );
};

CostStructure.propTypes = {
  costAnalysis: PropTypes.object.isRequired,
  onSave: PropTypes.func,
  onContinue: PropTypes.func
};

export default CostStructure;
