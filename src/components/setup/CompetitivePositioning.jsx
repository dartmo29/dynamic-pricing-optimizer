/**
 * CompetitivePositioning.jsx
 * Component for setting up competitive positioning as part of the setup wizard
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { PlusCircle, Trash2, DollarSign, BarChart } from 'lucide-react';

/**
 * Competitive Positioning Component
 * Allows users to add competitors and their positioning
 */
const CompetitivePositioning = ({ data, onDataChange, onNext }) => {
  // Initialize competitors state from data or with default empty array
  const [competitors, setCompetitors] = useState(data.competitors || []);
  const [marketPosition, setMarketPosition] = useState(data.marketPosition || 'mid-market');
  
  // Form state for new competitor
  const [newCompetitor, setNewCompetitor] = useState({ 
    name: '', 
    price: '', 
    attributes: {} 
  });
  
  // Validation error state
  const [errors, setErrors] = useState({});
  
  /**
   * Handle change in the new competitor form
   */
  const handleNewCompetitorChange = (field, value) => {
    setNewCompetitor({
      ...newCompetitor,
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
   * Handle change in attribute values for new competitor
   */
  const handleAttributeChange = (attribute, value) => {
    setNewCompetitor({
      ...newCompetitor,
      attributes: {
        ...newCompetitor.attributes,
        [attribute]: value
      }
    });
  };
  
  /**
   * Validate new competitor entry
   */
  const validateCompetitor = () => {
    const validationErrors = {};
    
    if (!newCompetitor.name.trim()) {
      validationErrors.name = 'Name is required';
    }
    
    const price = parseFloat(newCompetitor.price);
    if (isNaN(price) || price <= 0) {
      validationErrors.price = 'Enter a valid price';
    }
    
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
  
  /**
   * Add new competitor to the list
   */
  const addCompetitor = () => {
    if (!validateCompetitor()) {
      return;
    }
    
    const updatedCompetitors = [
      ...competitors,
      {
        ...newCompetitor,
        price: parseFloat(newCompetitor.price),
        overallValue: calculateOverallValue(newCompetitor.attributes)
      }
    ];
    
    setCompetitors(updatedCompetitors);
    onDataChange({ competitors: updatedCompetitors, marketPosition });
    
    // Reset form
    setNewCompetitor({
      name: '',
      price: '',
      attributes: {}
    });
  };
  
  /**
   * Remove a competitor from the list
   */
  const removeCompetitor = (index) => {
    const updatedCompetitors = [...competitors];
    updatedCompetitors.splice(index, 1);
    setCompetitors(updatedCompetitors);
    onDataChange({ competitors: updatedCompetitors, marketPosition });
  };
  
  /**
   * Calculate overall value score from attributes
   */
  const calculateOverallValue = (attributes) => {
    if (Object.keys(attributes).length === 0) return 5; // Default mid-value
    
    const values = Object.values(attributes);
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  };
  
  /**
   * Handle market position change
   */
  const handleMarketPositionChange = (position) => {
    setMarketPosition(position);
    onDataChange({ competitors, marketPosition: position });
  };
  
  /**
   * Handle next button click
   */
  const handleNext = () => {
    onNext({ competitors, marketPosition });
  };
  
  // Predefined value attributes for rating competitors
  const valueAttributes = [
    'Quality',
    'Service',
    'Features',
    'Convenience',
    'Brand'
  ];
  
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Competitive Positioning</h3>
        <p className="text-gray-500">
          Add your key competitors and how they position their offerings in the market.
          This helps determine your optimal price point relative to the competition.
        </p>
      </div>
      
      {/* Market position selector */}
      <div className="mb-6">
        <h4 className="text-md font-medium mb-3">Your Market Position</h4>
        <div className="grid grid-cols-3 gap-3">
          <div
            className={`p-4 rounded-lg border cursor-pointer ${
              marketPosition === 'budget' ? 'bg-blue-50 border-blue-500' : 'border-gray-200'
            }`}
            onClick={() => handleMarketPositionChange('budget')}
          >
            <h5 className="font-medium">Budget</h5>
            <p className="text-sm text-gray-500">Lower price, essential features</p>
          </div>
          
          <div
            className={`p-4 rounded-lg border cursor-pointer ${
              marketPosition === 'mid-market' ? 'bg-blue-50 border-blue-500' : 'border-gray-200'
            }`}
            onClick={() => handleMarketPositionChange('mid-market')}
          >
            <h5 className="font-medium">Mid-Market</h5>
            <p className="text-sm text-gray-500">Competitive price, balanced value</p>
          </div>
          
          <div
            className={`p-4 rounded-lg border cursor-pointer ${
              marketPosition === 'premium' ? 'bg-blue-50 border-blue-500' : 'border-gray-200'
            }`}
            onClick={() => handleMarketPositionChange('premium')}
          >
            <h5 className="font-medium">Premium</h5>
            <p className="text-sm text-gray-500">Higher price, superior value</p>
          </div>
        </div>
      </div>
      
      {/* Competitor list */}
      <div className="mb-6">
        <h4 className="text-md font-medium mb-3">Your Competitors</h4>
        
        {competitors.length === 0 ? (
          <div className="p-6 border border-dashed rounded-lg text-center text-gray-500">
            <p>No competitors added yet. Add your first competitor below.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {competitors.map((competitor, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-4 border-b">
                    <div>
                      <h5 className="font-medium">{competitor.name}</h5>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">${competitor.price.toFixed(2)}</span>
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeCompetitor(index)}
                        title="Remove competitor"
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
      
      {/* Add competitor form */}
      <Card className="border-dashed">
        <CardContent className="p-4">
          <h4 className="font-medium mb-4">Add New Competitor</h4>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="competitorName">Competitor Name</Label>
              <Input
                id="competitorName"
                placeholder="e.g., Competitor Inc."
                value={newCompetitor.name}
                onChange={(e) => handleNewCompetitorChange('name', e.target.value)}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <Label htmlFor="competitorPrice">Price</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <Input
                  id="competitorPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={newCompetitor.price}
                  onChange={(e) => handleNewCompetitorChange('price', e.target.value)}
                  className={`pl-6 ${errors.price ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={addCompetitor}
              className="flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" /> Add Competitor
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Navigation button */}
      <div className="flex justify-end mt-6">
        <Button onClick={handleNext}>Continue</Button>
      </div>
    </div>
  );
};

CompetitivePositioning.propTypes = {
  data: PropTypes.object.isRequired,
  onDataChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
};

export default CompetitivePositioning;