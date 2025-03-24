/**
 * CompetitorForm.jsx
 * Form component for inputting competitor data
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, X, InfoIcon } from 'lucide-react';
import { isPositiveNumber } from '../../utils/validators';

/**
 * Competitor Form component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.competitors - Array of competitor objects
 * @param {Function} props.onAddCompetitor - Callback when competitor is added
 * @param {Function} props.onUpdateCompetitor - Callback when competitor is updated
 * @param {Function} props.onRemoveCompetitor - Callback when competitor is removed
 * @param {Object} props.errors - Validation errors
 * @returns {JSX.Element} Competitor form component
 */
const CompetitorForm = ({ 
  competitors,
  onAddCompetitor,
  onUpdateCompetitor,
  onRemoveCompetitor,
  errors = {}
}) => {
  /**
   * Handle competitor field change
   * @param {number} index - Index of competitor to update
   * @param {string} field - Field to update
   * @param {string|Object} value - New value
   */
  const handleCompetitorChange = (index, field, value) => {
    const competitor = { ...competitors[index] };
    competitor[field] = value;
    onUpdateCompetitor(index, competitor);
  };

  /**
   * Handle attribute field change
   * @param {number} index - Index of competitor to update
   * @param {string} attribute - Attribute to update
   * @param {string} value - New value
   */
  const handleAttributeChange = (index, attribute, value) => {
    const competitor = { ...competitors[index] };
    if (!competitor.attributes) competitor.attributes = {};
    competitor.attributes[attribute] = Number(value);
    onUpdateCompetitor(index, competitor);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Competitor Analysis</span>
          <div className="text-sm font-normal text-gray-500 flex items-center">
            <InfoIcon className="h-4 w-4 mr-1" />
            <span>Adding competitors improves accuracy</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {competitors.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              <p>Add competitors to improve your pricing strategy</p>
            </div>
          ) : (
            competitors.map((competitor, index) => (
              <div key={`competitor-${index}`} className="border p-4 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Competitor {index + 1}</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveCompetitor(index)}
                  >
                    <X className="h-4 w-4 mr-1" /> Remove
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`competitor-name-${index}`}>Company Name</Label>
                    <Input
                      id={`competitor-name-${index}`}
                      value={competitor.name}
                      onChange={(e) => handleCompetitorChange(index, 'name', e.target.value)}
                      placeholder="e.g., Competitor Inc."
                      className={errors[`competitor_${index}_name`] ? 'border-red-500' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`competitor-price-${index}`}>Price</Label>
                    <Input
                      id={`competitor-price-${index}`}
                      type="number"
                      value={competitor.price}
                      onChange={(e) => handleCompetitorChange(index, 'price', e.target.value)}
                      placeholder="0.00"
                      className={errors[`competitor_${index}_price`] ? 'border-red-500' : ''}
                    />
                    {!isPositiveNumber(competitor.price) && (
                      <p className="text-xs text-red-500 mt-1">Enter a positive number</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Value Attributes (Optional)</p>
                  <p className="text-xs text-gray-500 mb-3">
                    Rate competitors on a scale of 1-10 for each attribute
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`competitor-quality-${index}`}>Quality</Label>
                      <Input
                        id={`competitor-quality-${index}`}
                        type="number"
                        min="1"
                        max="10"
                        value={competitor.attributes?.quality || ''}
                        onChange={(e) => handleAttributeChange(index, 'quality', e.target.value)}
                        placeholder="1-10"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`competitor-service-${index}`}>Service</Label>
                      <Input
                        id={`competitor-service-${index}`}
                        type="number"
                        min="1"
                        max="10"
                        value={competitor.attributes?.service || ''}
                        onChange={(e) => handleAttributeChange(index, 'service', e.target.value)}
                        placeholder="1-10"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`competitor-speed-${index}`}>Speed</Label>
                      <Input
                        id={`competitor-speed-${index}`}
                        type="number"
                        min="1"
                        max="10"
                        value={competitor.attributes?.speed || ''}
                        onChange={(e) => handleAttributeChange(index, 'speed', e.target.value)}
                        placeholder="1-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          
          <Button type="button" variant="outline" onClick={onAddCompetitor} className="w-full">
            <Plus className="h-4 w-4 mr-2" /> Add Competitor
          </Button>
          
          {competitors.length > 0 && (
            <div className="text-sm text-gray-500 italic">
              <p>
                Adding competitor prices improves the accuracy of your pricing recommendations. 
                The more information you provide, the better your results will be.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

CompetitorForm.propTypes = {
  competitors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      attributes: PropTypes.object
    })
  ).isRequired,
  onAddCompetitor: PropTypes.func.isRequired,
  onUpdateCompetitor: PropTypes.func.isRequired,
  onRemoveCompetitor: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default CompetitorForm;