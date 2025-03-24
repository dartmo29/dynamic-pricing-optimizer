/**
 * ValueFactorForm.jsx
 * Form component for inputting value factors
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Plus, X, Star, ArrowUp } from 'lucide-react';
import { isWithinRange } from '../../utils/validators';

/**
 * Value Factor Form component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.valueFactors - Array of value factor objects
 * @param {Function} props.onAddValueFactor - Callback when factor is added
 * @param {Function} props.onUpdateValueFactor - Callback when factor is updated
 * @param {Function} props.onRemoveValueFactor - Callback when factor is removed
 * @param {Object} props.errors - Validation errors
 * @returns {JSX.Element} Value factor form component
 */
const ValueFactorForm = ({ 
  valueFactors,
  onAddValueFactor,
  onUpdateValueFactor,
  onRemoveValueFactor,
  errors = {}
}) => {
  /**
   * Handle value factor field change
   * @param {number} index - Index of factor to update
   * @param {string} field - Field to update
   * @param {string|number} value - New value
   */
  const handleValueFactorChange = (index, field, value) => {
    const factor = { ...valueFactors[index] };
    factor[field] = value;
    onUpdateValueFactor(index, factor);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Value Differentiation</span>
          <div className="text-sm font-normal text-gray-500 flex items-center">
            <Star className="h-4 w-4 mr-1" />
            <span>What makes your offering unique</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {valueFactors.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              <p>Add value factors to improve your pricing strategy</p>
            </div>
          ) : (
            valueFactors.map((factor, index) => (
              <div key={`factor-${index}`} className="border p-4 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Value Factor {index + 1}</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveValueFactor(index)}
                  >
                    <X className="h-4 w-4 mr-1" /> Remove
                  </Button>
                </div>
                
                <div>
                  <Label htmlFor={`factor-name-${index}`}>Factor Name</Label>
                  <Input
                    id={`factor-name-${index}`}
                    value={factor.name}
                    onChange={(e) => handleValueFactorChange(index, 'name', e.target.value)}
                    placeholder="e.g., Quality, Service, Speed"
                    className={errors[`valueFactor_${index}_name`] ? 'border-red-500' : ''}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor={`factor-importance-${index}`}>
                      Importance to Customers (1-10)
                    </Label>
                    <span className="font-medium">{factor.importance}</span>
                  </div>
                  <Slider
                    id={`factor-importance-${index}`}
                    min={1}
                    max={10}
                    step={1}
                    value={[factor.importance]}
                    onValueChange={(value) => handleValueFactorChange(index, 'importance', value[0])}
                    className={errors[`valueFactor_${index}_importance`] ? 'border-red-500' : ''}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Not Important</span>
                    <span>Very Important</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor={`factor-score-${index}`}>
                      Your Performance (1-10)
                    </Label>
                    <span className="font-medium">{factor.score}</span>
                  </div>
                  <Slider
                    id={`factor-score-${index}`}
                    min={1}
                    max={10}
                    step={1}
                    value={[factor.score]}
                    onValueChange={(value) => handleValueFactorChange(index, 'score', value[0])}
                    className={errors[`valueFactor_${index}_score`] ? 'border-red-500' : ''}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <ArrowUp className={`h-4 w-4 ${factor.score >= 7 ? 'text-green-500' : 'text-gray-400'}`} />
                    <span className="text-sm ml-1">
                      {factor.score >= 7 ? 'Strong differentiator' : 'Potential area for improvement'}
                    </span>
                  </div>
                  <div className="text-sm font-medium">
                    Score: {factor.importance * factor.score}
                  </div>
                </div>
              </div>
            ))
          )}
          
          <Button type="button" variant="outline" onClick={onAddValueFactor} className="w-full">
            <Plus className="h-4 w-4 mr-2" /> Add Value Factor
          </Button>
          
          {valueFactors.length > 0 && (
            <div className="text-sm text-gray-500 italic">
              <p>
                Adding value factors helps the system understand your unique strengths
                and how they can support premium pricing. These factors describe what makes
                your offering better than competitors.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

ValueFactorForm.propTypes = {
  valueFactors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      importance: PropTypes.number,
      score: PropTypes.number
    })
  ).isRequired,
  onAddValueFactor: PropTypes.func.isRequired,
  onUpdateValueFactor: PropTypes.func.isRequired,
  onRemoveValueFactor: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default ValueFactorForm;