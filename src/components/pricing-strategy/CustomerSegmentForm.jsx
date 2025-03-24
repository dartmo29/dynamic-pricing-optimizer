/**
 * CustomerSegmentForm.jsx
 * Component for managing customer segments with price elasticity
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Plus, Trash2, Edit2, Info } from 'lucide-react';
import { 
  Dialog,
  DialogContent, 
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';

/**
 * Customer Segment Form component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.segments - Customer segments array
 * @param {Function} props.onAddSegment - Function to add a segment
 * @param {Function} props.onUpdateSegment - Function to update a segment
 * @param {Function} props.onRemoveSegment - Function to remove a segment
 * @returns {JSX.Element} Customer segment form component
 */
const CustomerSegmentForm = ({ 
  segments = [], 
  onAddSegment, 
  onUpdateSegment, 
  onRemoveSegment 
}) => {
  // Form state
  const [formValues, setFormValues] = useState({
    name: '',
    size: 0,
    priceElasticity: 5
  });
  
  // Edit mode state
  const [editingId, setEditingId] = useState(null);
  
  // Dialog state for elasticity explanation
  const [elasticityDialogOpen, setElasticityDialogOpen] = useState(false);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: name === 'size' ? Number(value) : value
    }));
  };
  
  // Handle elasticity slider change
  const handleElasticityChange = (value) => {
    setFormValues(prev => ({
      ...prev,
      priceElasticity: value[0]
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formValues.name.trim() || formValues.size <= 0) {
      return;
    }
    
    if (editingId) {
      // Update existing segment
      onUpdateSegment(editingId, formValues);
      setEditingId(null);
    } else {
      // Add new segment
      onAddSegment(formValues);
    }
    
    // Reset form
    setFormValues({
      name: '',
      size: 0,
      priceElasticity: 5
    });
  };
  
  // Handle edit button click
  const handleEditClick = (segment) => {
    setFormValues({
      name: segment.name,
      size: segment.size,
      priceElasticity: segment.priceElasticity
    });
    setEditingId(segment.id);
  };
  
  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormValues({
      name: '',
      size: 0,
      priceElasticity: 5
    });
  };
  
  // Function to describe elasticity level
  const getElasticityDescription = (level) => {
    if (level <= 3) return 'Low price sensitivity';
    if (level <= 7) return 'Moderate price sensitivity';
    return 'High price sensitivity';
  };
  
  // Calculate total market size
  const totalSize = segments.reduce((sum, segment) => sum + segment.size, 0);
  
  // Calculate weighted average elasticity
  const weightedElasticity = segments.length > 0
    ? segments.reduce((sum, segment) => sum + (segment.priceElasticity * segment.size), 0) / totalSize
    : 0;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Customer Segments
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2" 
              onClick={() => setElasticityDialogOpen(true)}
            >
              <Info className="h-4 w-4 mr-1" /> What is price elasticity?
            </Button>
          </CardTitle>
          <CardDescription>
            Define your customer segments and their price sensitivity to optimize pricing strategy
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Segment Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="segment-name">Segment Name</Label>
                <Input
                  id="segment-name"
                  name="name"
                  placeholder="e.g., Enterprise Customers"
                  value={formValues.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="segment-size">Relative Size (%)</Label>
                <Input
                  id="segment-size"
                  name="size"
                  type="number"
                  placeholder="e.g., 25"
                  min="1"
                  max="100"
                  value={formValues.size || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between">
                <Label htmlFor="price-elasticity">Price Sensitivity</Label>
                <span className="text-sm text-gray-500">
                  {getElasticityDescription(formValues.priceElasticity)}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm">Low</span>
                <Slider
                  id="price-elasticity"
                  min={1}
                  max={10}
                  step={1}
                  value={[formValues.priceElasticity]}
                  onValueChange={handleElasticityChange}
                  className="flex-1"
                />
                <span className="text-sm">High</span>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              {editingId && (
                <Button type="button" variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              )}
              <Button type="submit">
                {editingId ? 'Update Segment' : (
                  <>
                    <Plus className="mr-2 h-4 w-4" /> Add Segment
                  </>
                )}
              </Button>
            </div>
          </form>
          
          {/* Segments Table */}
          {segments.length > 0 ? (
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Segment</TableHead>
                    <TableHead>Size (%)</TableHead>
                    <TableHead>Price Sensitivity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {segments.map((segment) => (
                    <TableRow key={segment.id}>
                      <TableCell>{segment.name}</TableCell>
                      <TableCell>{segment.size}%</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                segment.priceElasticity <= 3 
                                  ? 'bg-green-500'
                                  : segment.priceElasticity <= 7
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                              }`} 
                              style={{ width: `${segment.priceElasticity * 10}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{segment.priceElasticity}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditClick(segment)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => onRemoveSegment(segment.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {/* Summary */}
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Market Summary:</span>
                  <span>
                    {segments.length} segments, 
                    {' '}Average Sensitivity: {weightedElasticity.toFixed(1)}/10
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 border border-dashed rounded-md">
              <p className="text-gray-500 mb-2">No customer segments defined yet</p>
              <p className="text-sm text-gray-400">
                Add segments to create a more accurate pricing strategy
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Price Elasticity Explanation Dialog */}
      <Dialog open={elasticityDialogOpen} onOpenChange={setElasticityDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Understanding Price Elasticity</DialogTitle>
            <DialogDescription>
              Price elasticity measures how sensitive your customers are to price changes.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              On the scale of 1-10:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="font-medium">Low (1-3):</span>
                <span className="text-sm">
                  Customers are not very price-sensitive. They value quality, uniqueness, or necessity over price.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="font-medium">Moderate (4-7):</span>
                <span className="text-sm">
                  Customers consider price as one of several important factors in their purchase decision.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="font-medium">High (8-10):</span>
                <span className="text-sm">
                  Customers are very price-sensitive. Small price changes can significantly impact their buying behavior.
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Accurately rating the price sensitivity of your customer segments helps create a more effective pricing strategy. 
              Consider surveying customers or analyzing historical data to determine sensitivity levels.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setElasticityDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerSegmentForm;