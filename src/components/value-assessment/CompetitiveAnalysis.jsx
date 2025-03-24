/**
 * CompetitiveAnalysis.jsx
 * Component for analyzing competitors
 */

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Trash, Plus, Star } from 'lucide-react';

/**
 * Competitive Analysis component
 * 
 * @param {Object} props Component props
 * @param {Array} props.competitors List of competitors
 * @param {Function} props.onAddCompetitor Callback to add a competitor
 * @param {Function} props.onUpdateCompetitor Callback to update a competitor
 * @param {Function} props.onRemoveCompetitor Callback to remove a competitor
 * @returns {JSX.Element} Competitive Analysis component
 */
const CompetitiveAnalysis = ({ 
  competitors = [], 
  onAddCompetitor, 
  onUpdateCompetitor, 
  onRemoveCompetitor 
}) => {
  // State for new competitor
  const [newCompetitor, setNewCompetitor] = useState({
    name: '',
    price: '',
    strengths: '',
    weaknesses: '',
    overallValue: 5 // Default value on a scale of 1-10
  });
  
  // State for validation errors
  const [errors, setErrors] = useState({});
  
  /**
   * Handle input change for new competitor
   * 
   * @param {Object} e - Event object
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompetitor(prev => ({
      ...prev,
      [name]: name === 'price' ? (value === '' ? '' : parseFloat(value) || 0) : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  /**
   * Handle value rating change
   * 
   * @param {string} id - Competitor ID
   * @param {number} value - New value rating
   */
  const handleValueRatingChange = (id, value) => {
    onUpdateCompetitor(id, { overallValue: value });
  };
  
  /**
   * Handle add competitor
   */
  const handleAddCompetitor = () => {
    // Validate inputs
    const validationErrors = {};
    
    if (!newCompetitor.name.trim()) {
      validationErrors.name = 'Name is required';
    }
    
    if (newCompetitor.price === '' || isNaN(newCompetitor.price)) {
      validationErrors.price = 'Valid price is required';
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Add competitor
    onAddCompetitor(newCompetitor);
    
    // Reset form
    setNewCompetitor({
      name: '',
      price: '',
      strengths: '',
      weaknesses: '',
      overallValue: 5
    });
    
    // Clear errors
    setErrors({});
  };
  
  /**
   * Render value rating stars
   * 
   * @param {number} value - Current value rating
   * @param {Function} onChange - Change handler
   * @returns {JSX.Element} Star rating component
   */
  const renderValueRating = (value, onChange) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
          <button
            key={star}
            type="button"
            className={`p-1 focus:outline-none ${star <= value ? 'text-yellow-500' : 'text-gray-300'}`}
            onClick={() => onChange(star)}
          >
            <Star className="h-4 w-4" />
          </button>
        ))}
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Competitor Analysis Form */}
        <Card>
          <CardHeader>
            <CardTitle>Add Competitor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Competitor Name
                </label>
                <Input
                  name="name"
                  value={newCompetitor.name}
                  onChange={handleInputChange}
                  placeholder="Enter competitor name"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <Input
                  name="price"
                  type="number"
                  value={newCompetitor.price}
                  onChange={handleInputChange}
                  placeholder="Enter competitor's price"
                  className={errors.price ? 'border-red-500' : ''}
                  min={0}
                  step={0.01}
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Strengths
                </label>
                <Input
                  name="strengths"
                  value={newCompetitor.strengths}
                  onChange={handleInputChange}
                  placeholder="What are they good at?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Weaknesses
                </label>
                <Input
                  name="weaknesses"
                  value={newCompetitor.weaknesses}
                  onChange={handleInputChange}
                  placeholder="What are their shortcomings?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Overall Value (1-10)
                </label>
                {renderValueRating(newCompetitor.overallValue, (value) => {
                  setNewCompetitor(prev => ({ ...prev, overallValue: value }));
                })}
              </div>
              
              <Button 
                className="w-full mt-2 flex items-center gap-2"
                onClick={handleAddCompetitor}
              >
                <Plus className="h-4 w-4" /> Add Competitor
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Competitive Landscape Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Competitive Landscape</CardTitle>
          </CardHeader>
          <CardContent>
            {competitors.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <p>No competitors added yet.</p>
                <p className="text-sm mt-2">
                  Add your competitors to analyze your market position.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Competitor</th>
                        <th className="text-left py-2">Price</th>
                        <th className="text-left py-2">Value</th>
                        <th className="text-left py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {competitors.map((competitor) => (
                        <tr key={competitor.id} className="border-b">
                          <td className="py-2 font-medium">{competitor.name}</td>
                          <td className="py-2">${competitor.price.toFixed(2)}</td>
                          <td className="py-2">
                            {renderValueRating(competitor.overallValue, (value) => {
                              handleValueRatingChange(competitor.id, value);
                            })}
                          </td>
                          <td className="py-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500"
                              onClick={() => onRemoveCompetitor(competitor.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Competitor Details */}
      {competitors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Competitor Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {competitors.map((competitor) => (
                <div 
                  key={competitor.id} 
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{competitor.name}</h3>
                    <span className="text-lg font-semibold">${competitor.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="mt-2 flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Value:</span>
                    <div className="flex items-center">
                      {[...Array(competitor.overallValue)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  
                  {competitor.strengths && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700">Strengths:</h4>
                      <p className="text-sm text-gray-600">{competitor.strengths}</p>
                    </div>
                  )}
                  
                  {competitor.weaknesses && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700">Weaknesses:</h4>
                      <p className="text-sm text-gray-600">{competitor.weaknesses}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompetitiveAnalysis;