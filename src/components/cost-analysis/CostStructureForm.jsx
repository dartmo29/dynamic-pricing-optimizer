/**
 * CostStructureForm.jsx
 * Form component for inputting cost structure data
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, X, Save, BriefcaseBusiness } from 'lucide-react';
import { isPositiveNumber, isNonNegativeNumber, isValidPercentage } from '../../utils/validators';

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
    getCostStructure
  } = costAnalysis;

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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cost Structure</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
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
              <div className="text-sm text-gray-500 mb-2">
                Enter costs directly tied to each unit of your product or service (materials, components, etc.)
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
              <div className="text-sm text-gray-500 mb-2">
                Enter overhead costs that are not directly tied to individual units (rent, marketing, etc.)
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
              <div className="text-sm text-gray-500 mb-2">
                For service businesses: Enter time-based costs (consultant hours, labor, etc.)
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
              <Label htmlFor="target-margin">Target Profit Margin (%)</Label>
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
              <Label htmlFor="expected-volume">Expected Monthly Volume</Label>
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
          
          <Button 
            type="button" 
            onClick={handleSubmit} 
            className="w-full"
            disabled={!isValidPercentage(targetMargin * 100) || !isPositiveNumber(expectedVolume)}
          >
            <Save className="h-4 w-4 mr-2" /> Save Cost Structure
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

CostStructureForm.propTypes = {
  onSave: PropTypes.func,
  onLoadTemplate: PropTypes.func,
  costAnalysis: PropTypes.object.isRequired
};

export default CostStructureForm;