/**
 * InitialCostSetup.jsx
 * Simple cost structure setup form for the guided setup wizard
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const InitialCostSetup = ({ data, onDataChange, onNext }) => {
  // Cost structure state
  const [costStructure, setCostStructure] = useState({
    direct: data.costStructure?.direct || [{ name: 'Materials/Components', amount: 10 }],
    indirect: data.costStructure?.indirect || [{ name: 'Overhead', amount: 1000, period: 'month' }],
    time: data.costStructure?.time || [{ name: 'Labor', rate: 25, hours: 1 }],
    targetMargin: data.costStructure?.targetMargin || 0.3,
    expectedVolume: data.costStructure?.expectedVolume || 100
  });
  
  // Active tab
  const [activeTab, setActiveTab] = useState('direct');
  
  // Error state
  const [errors, setErrors] = useState({});
  
  // Update parent component data when form changes
  useEffect(() => {
    onDataChange({ costStructure });
  }, [costStructure, onDataChange]);
  
  // Add a direct cost item
  const addDirectCost = () => {
    setCostStructure(prev => ({
      ...prev,
      direct: [...prev.direct, { name: '', amount: 0 }]
    }));
  };
  
  // Add an indirect cost item
  const addIndirectCost = () => {
    setCostStructure(prev => ({
      ...prev,
      indirect: [...prev.indirect, { name: '', amount: 0, period: 'month' }]
    }));
  };
  
  // Add a time cost item
  const addTimeCost = () => {
    setCostStructure(prev => ({
      ...prev,
      time: [...prev.time, { name: '', rate: 0, hours: 0 }]
    }));
  };
  
  // Remove a direct cost item
  const removeDirectCost = (index) => {
    setCostStructure(prev => ({
      ...prev,
      direct: prev.direct.filter((_, i) => i !== index)
    }));
  };
  
  // Remove an indirect cost item
  const removeIndirectCost = (index) => {
    setCostStructure(prev => ({
      ...prev,
      indirect: prev.indirect.filter((_, i) => i !== index)
    }));
  };
  
  // Remove a time cost item
  const removeTimeCost = (index) => {
    setCostStructure(prev => ({
      ...prev,
      time: prev.time.filter((_, i) => i !== index)
    }));
  };
  
  // Update a direct cost item
  const updateDirectCost = (index, field, value) => {
    setCostStructure(prev => {
      const updatedCosts = [...prev.direct];
      updatedCosts[index] = {
        ...updatedCosts[index],
        [field]: field === 'amount' ? parseFloat(value) || 0 : value
      };
      return { ...prev, direct: updatedCosts };
    });
    
    // Clear any error for this field
    if (errors[`direct_${index}_${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`direct_${index}_${field}`];
        return newErrors;
      });
    }
  };
  
  // Update an indirect cost item
  const updateIndirectCost = (index, field, value) => {
    setCostStructure(prev => {
      const updatedCosts = [...prev.indirect];
      updatedCosts[index] = {
        ...updatedCosts[index],
        [field]: field === 'amount' ? parseFloat(value) || 0 : value
      };
      return { ...prev, indirect: updatedCosts };
    });
    
    // Clear any error for this field
    if (errors[`indirect_${index}_${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`indirect_${index}_${field}`];
        return newErrors;
      });
    }
  };
  
  // Update a time cost item
  const updateTimeCost = (index, field, value) => {
    setCostStructure(prev => {
      const updatedCosts = [...prev.time];
      updatedCosts[index] = {
        ...updatedCosts[index],
        [field]: field === 'rate' || field === 'hours' ? parseFloat(value) || 0 : value
      };
      return { ...prev, time: updatedCosts };
    });
    
    // Clear any error for this field
    if (errors[`time_${index}_${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`time_${index}_${field}`];
        return newErrors;
      });
    }
  };
  
  // Update target margin
  const updateTargetMargin = (value) => {
    setCostStructure(prev => ({
      ...prev,
      targetMargin: value[0]
    }));
  };
  
  // Update expected volume
  const handleVolumeChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setCostStructure(prev => ({
      ...prev,
      expectedVolume: value
    }));
    
    // Clear any error for this field
    if (errors.expectedVolume) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.expectedVolume;
        return newErrors;
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Check for empty names in direct costs
    costStructure.direct.forEach((cost, index) => {
      if (!cost.name) {
        newErrors[`direct_${index}_name`] = 'Name is required';
      }
    });
    
    // Check for empty names in indirect costs
    costStructure.indirect.forEach((cost, index) => {
      if (!cost.name) {
        newErrors[`indirect_${index}_name`] = 'Name is required';
      }
    });
    
    // Check for empty names in time costs
    costStructure.time.forEach((cost, index) => {
      if (!cost.name) {
        newErrors[`time_${index}_name`] = 'Name is required';
      }
    });
    
    // Check expected volume
    if (!costStructure.expectedVolume) {
      newErrors.expectedVolume = 'Expected monthly volume is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onNext({ costStructure });
    }
  };
  
  // Calculate total costs
  const calculateTotalDirectCost = () => {
    return costStructure.direct.reduce((sum, cost) => sum + cost.amount, 0);
  };
  
  const calculateTotalIndirectCost = () => {
    return costStructure.indirect.reduce((sum, cost) => sum + cost.amount, 0);
  };
  
  const calculateTotalTimeCost = () => {
    return costStructure.time.reduce((sum, cost) => sum + (cost.rate * cost.hours), 0);
  };
  
  // Calculate total cost per unit
  const calculateTotalCostPerUnit = () => {
    const directCost = calculateTotalDirectCost();
    const timeCost = calculateTotalTimeCost();
    const indirectCostPerUnit = costStructure.expectedVolume 
      ? calculateTotalIndirectCost() / costStructure.expectedVolume 
      : 0;
    
    return directCost + timeCost + indirectCostPerUnit;
  };
  
  // Calculate minimum price
  const calculateMinimumPrice = () => {
    const totalCost = calculateTotalCostPerUnit();
    return totalCost / (1 - costStructure.targetMargin);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Cost Structure</h2>
        <p className="text-gray-500">
          Set up your basic cost structure to calculate your minimum viable price
        </p>
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
              
              {costStructure.direct.map((cost, index) => (
                <div key={`direct-${index}`} className="flex gap-2 items-start">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-grow">
                    <div>
                      <Input
                        placeholder="Cost Name"
                        value={cost.name}
                        onChange={(e) => updateDirectCost(index, 'name', e.target.value)}
                        className={errors[`direct_${index}_name`] ? 'border-red-500' : ''}
                      />
                      {errors[`direct_${index}_name`] && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors[`direct_${index}_name`]}
                        </div>
                      )}
                    </div>
                    <div>
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={cost.amount}
                        onChange={(e) => updateDirectCost(index, 'amount', e.target.value)}
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
                    onClick={() => removeDirectCost(index)}
                    disabled={costStructure.direct.length === 1}
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
                onClick={addDirectCost}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Direct Cost
              </Button>
            </TabsContent>
            
            {/* Indirect Costs Tab */}
            <TabsContent value="indirect" className="space-y-4">
              <p className="text-sm text-gray-500">
                Indirect costs are overhead expenses that cannot be directly attributed to individual units.
              </p>
              
              {costStructure.indirect.map((cost, index) => (
                <div key={`indirect-${index}`} className="flex gap-2 items-start">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 flex-grow">
                    <div>
                      <Input
                        placeholder="Cost Name"
                        value={cost.name}
                        onChange={(e) => updateIndirectCost(index, 'name', e.target.value)}
                        className={errors[`indirect_${index}_name`] ? 'border-red-500' : ''}
                      />
                      {errors[`indirect_${index}_name`] && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors[`indirect_${index}_name`]}
                        </div>
                      )}
                    </div>
                    <div>
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={cost.amount}
                        onChange={(e) => updateIndirectCost(index, 'amount', e.target.value)}
                        className="text-right"
                        step="1"
                        min="0"
                      />
                    </div>
                    <div>
                      <Select
                        value={cost.period}
                        onValueChange={(value) => updateIndirectCost(index, 'period', value)}
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
                    onClick={() => removeIndirectCost(index)}
                    disabled={costStructure.indirect.length === 1}
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
                onClick={addIndirectCost}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Indirect Cost
              </Button>
            </TabsContent>
            
            {/* Time Costs Tab */}
            <TabsContent value="time" className="space-y-4">
              <p className="text-sm text-gray-500">
                Time costs represent the value of time spent on each unit of your product or service.
              </p>
              
              {costStructure.time.map((cost, index) => (
                <div key={`time-${index}`} className="flex gap-2 items-start">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 flex-grow">
                    <div>
                      <Input
                        placeholder="Activity Name"
                        value={cost.name}
                        onChange={(e) => updateTimeCost(index, 'name', e.target.value)}
                        className={errors[`time_${index}_name`] ? 'border-red-500' : ''}
                      />
                      {errors[`time_${index}_name`] && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors[`time_${index}_name`]}
                        </div>
                      )}
                    </div>
                    <div>
                      <Input
                        type="number"
                        placeholder="Hourly Rate"
                        value={cost.rate}
                        onChange={(e) => updateTimeCost(index, 'rate', e.target.value)}
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
                        onChange={(e) => updateTimeCost(index, 'hours', e.target.value)}
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
                    onClick={() => removeTimeCost(index)}
                    disabled={costStructure.time.length === 1}
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
                onClick={addTimeCost}
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
                value={costStructure.expectedVolume}
                onChange={handleVolumeChange}
                className={errors.expectedVolume ? 'border-red-500' : ''}
                min="1"
                placeholder="e.g., 100 units/month"
              />
              {errors.expectedVolume && (
                <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.expectedVolume}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">
                The average number of units/services you expect to sell per month
              </p>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="targetMargin">Target Profit Margin</Label>
                <span className="text-sm font-medium">{(costStructure.targetMargin * 100).toFixed(0)}%</span>
              </div>
              <Slider
                id="targetMargin"
                min={0.05}
                max={0.9}
                step={0.05}
                value={[costStructure.targetMargin]}
                onValueChange={updateTargetMargin}
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
                    ${(costStructure.expectedVolume ? calculateTotalIndirectCost() / costStructure.expectedVolume : 0).toFixed(2)}
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
                    <span className="font-medium">{(costStructure.targetMargin * 100).toFixed(0)}%</span>
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
        </div>
      </div>
      
      <div className="border-t pt-4 mt-6">
        <div className="flex justify-end">
          <Button type="submit">Continue</Button>
        </div>
      </div>
    </form>
  );
};

InitialCostSetup.propTypes = {
  data: PropTypes.object,
  onDataChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
};

InitialCostSetup.defaultProps = {
  data: {}
};

export default InitialCostSetup;