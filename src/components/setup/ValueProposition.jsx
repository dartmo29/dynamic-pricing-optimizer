/**
 * ValueProposition.jsx
 * Component for setting up value factors as part of the setup wizard
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { PlusCircle, Trash2, Star, Target } from 'lucide-react';

/**
 * Value Proposition Component
 * Allows users to define their unique value factors
 */
const ValueProposition = ({ data, onDataChange, onNext }) => {
  // Initialize value factors state from data or with default empty array
  const [valueFactors, setValueFactors] = useState(data.valueFactors || []);
  
  // Form state for new value factor
  const [newValueFactor, setNewValueFactor] = useState({
    name: '',
    importance: 5,
    score: 7
  });
  
  // Validation error state
  const [errors, setErrors] = useState({});
  
  /**
   * Handle change in the new value factor form
   */
  const handleNewValueFactorChange = (field, value) => {
    setNewValueFactor({
      ...newValueFactor,
      [field]: value
    });
    
    // Clear error for this field if any
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      });
    }
  };
  
  /**
   * Validate new value factor entry
   */
  const validateValueFactor = () => {
    const validationErrors = {};
    
    if (!newValueFactor.name.trim()) {
      validationErrors.name = 'Name is required';
    }
    
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
  
  /**
   * Add new value factor to the list
   */
  const addValueFactor = () => {
    if (!validateValueFactor()) {
      return;
    }
    
    const updatedValueFactors = [
      ...valueFactors,
      {
        ...newValueFactor,
        importance: Number(newValueFactor.importance),
        score: Number(newValueFactor.score)
      }
    ];
    
    setValueFactors(updatedValueFactors);
    onDataChange({ valueFactors: updatedValueFactors });
    
    // Reset form
    setNewValueFactor({
      name: '',
      importance: 5,
      score: 7
    });
  };
  
  /**
   * Remove a value factor from the list
   */
  const removeValueFactor = (index) => {
    const updatedValueFactors = [...valueFactors];
    updatedValueFactors.splice(index, 1);
    setValueFactors(updatedValueFactors);
    onDataChange({ valueFactors: updatedValueFactors });
  };
  
  /**
   * Handle next button click
   */
  const handleNext = () => {
    onNext({ valueFactors });
  };
  
  // Suggested value factors for inspiration
  const suggestedValueFactors = [
    'Quality',
    'Service Level',
    'Response Time',
    'Reliability',
    'Durability',
    'Customization',
    'Expertise',
    'Innovation',
    'Convenience',
    'Customer Support'
  ];
  
  // Quick-add a suggested value factor
  const quickAddValueFactor = (name) => {
    // Check if this value factor already exists
    if (valueFactors.some(factor => factor.name.toLowerCase() === name.toLowerCase())) {
      return;
    }
    
    const updatedValueFactors = [
      ...valueFactors,
      {
        name,
        importance: 5,
        score: 7
      }
    ];
    
    setValueFactors(updatedValueFactors);
    onDataChange({ valueFactors: updatedValueFactors });
  };
  
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Value Proposition</h3>
        <p className="text-gray-500">
          Define what makes your offering valuable and how you compare to competitors.
          This helps determine if you can charge a premium based on your unique value.
        </p>
      </div>
      
      {/* Value factors list */}
      <div className="mb-6">
        <h4 className="text-md font-medium mb-3">Your Value Factors</h4>
        
        {valueFactors.length === 0 ? (
          <div className="p-6 border border-dashed rounded-lg text-center text-gray-500">
            <p>No value factors added yet. Add your first value factor below.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {valueFactors.map((factor, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex-grow">
                      <h5 className="font-medium">{factor.name}</h5>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Importance (1-10)</p>
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-blue-500" />
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${factor.importance * 10}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{factor.importance}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Your Score (1-10)</p>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-amber-500" />
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-amber-500 h-2 rounded-full" 
                                style={{ width: `${factor.score * 10}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{factor.score}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeValueFactor(index)}
                        title="Remove value factor"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Add value factor form */}
      <Card className="border-dashed">
        <CardContent className="p-4">
          <h4 className="font-medium mb-4">Add New Value Factor</h4>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="factorName">Factor Name</Label>
              <Input
                id="factorName"
                placeholder="e.g., Quality, Service, Expertise"
                value={newValueFactor.name}
                onChange={(e) => handleNewValueFactorChange('name', e.target.value)}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="importance">Importance to Customers (1-10)</Label>
                <span className="text-sm text-gray-500">{newValueFactor.importance}</span>
              </div>
              <Slider
                value={[newValueFactor.importance]}
                min={1}
                max={10}
                step={1}
                onValueChange={(value) => handleNewValueFactorChange('importance', value[0])}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Less Important</span>
                <span>Very Important</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="score">Your Score Relative to Competitors (1-10)</Label>
                <span className="text-sm text-gray-500">{newValueFactor.score}</span>
              </div>
              <Slider
                value={[newValueFactor.score]}
                min={1}
                max={10}
                step={1}
                onValueChange={(value) => handleNewValueFactorChange('score', value[0])}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Weaker</span>
                <span>Stronger</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button 
              onClick={addValueFactor}
              className="flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" /> Add Value Factor
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Suggested value factors */}
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Suggested Value Factors</h4>
        <div className="flex flex-wrap gap-2">
          {suggestedValueFactors.map((factor, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => quickAddValueFactor(factor)}
              className="text-xs"
              disabled={valueFactors.some(f => f.name.toLowerCase() === factor.toLowerCase())}
            >
              {factor}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Navigation button */}
      <div className="flex justify-end mt-6">
        <Button onClick={handleNext}>Continue</Button>
      </div>
    </div>
  );
};

ValueProposition.propTypes = {
  data: PropTypes.object.isRequired,
  onDataChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
};

export default ValueProposition;