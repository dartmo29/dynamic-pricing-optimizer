/**
 * ValueMapping.jsx
 * Component for mapping value to customer needs
 */

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Plus, Trash, ArrowRight, Save } from 'lucide-react';

/**
 * Value Mapping component
 * 
 * @param {Object} props Component props
 * @param {Object} props.valueProposition Value proposition data
 * @param {Object} props.valueMap Value mapping data
 * @param {Function} props.onUpdateValueMap Callback for updating value map
 * @returns {JSX.Element} Value Mapping component
 */
const ValueMapping = ({ 
  valueProposition = {}, 
  valueMap = { customerNeeds: [], valueDelivery: [] }, 
  onUpdateValueMap 
}) => {
  // State for form data
  const [formData, setFormData] = useState({
    customerNeeds: valueMap.customerNeeds || [],
    valueDelivery: valueMap.valueDelivery || []
  });
  
  // State for new entries
  const [newNeed, setNewNeed] = useState('');
  const [newValue, setNewValue] = useState('');
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('needs');
  
  // Update form data when props change
  useEffect(() => {
    setFormData({
      customerNeeds: valueMap.customerNeeds || [],
      valueDelivery: valueMap.valueDelivery || []
    });
  }, [valueMap]);
  
  /**
   * Add a customer need
   */
  const addCustomerNeed = () => {
    if (!newNeed.trim()) return;
    
    const updatedNeeds = [...formData.customerNeeds, {
      id: Date.now().toString(),
      description: newNeed.trim(),
      priority: 'medium' // Default priority
    }];
    
    setFormData(prev => ({
      ...prev,
      customerNeeds: updatedNeeds
    }));
    
    onUpdateValueMap({ customerNeeds: updatedNeeds, valueDelivery: formData.valueDelivery });
    setNewNeed('');
  };
  
  /**
   * Remove a customer need
   * 
   * @param {string} id Need ID to remove
   */
  const removeCustomerNeed = (id) => {
    const updatedNeeds = formData.customerNeeds.filter(need => need.id !== id);
    
    setFormData(prev => ({
      ...prev,
      customerNeeds: updatedNeeds
    }));
    
    onUpdateValueMap({ customerNeeds: updatedNeeds, valueDelivery: formData.valueDelivery });
  };
  
  /**
   * Update a customer need's priority
   * 
   * @param {string} id Need ID to update
   * @param {string} priority New priority value
   */
  const updateNeedPriority = (id, priority) => {
    const updatedNeeds = formData.customerNeeds.map(need => 
      need.id === id ? { ...need, priority } : need
    );
    
    setFormData(prev => ({
      ...prev,
      customerNeeds: updatedNeeds
    }));
    
    onUpdateValueMap({ customerNeeds: updatedNeeds, valueDelivery: formData.valueDelivery });
  };
  
  /**
   * Add a value delivery item
   */
  const addValueDelivery = () => {
    if (!newValue.trim()) return;
    
    const updatedValues = [...formData.valueDelivery, {
      id: Date.now().toString(),
      description: newValue.trim(),
      relatedNeeds: [] // Initially, no related needs
    }];
    
    setFormData(prev => ({
      ...prev,
      valueDelivery: updatedValues
    }));
    
    onUpdateValueMap({ customerNeeds: formData.customerNeeds, valueDelivery: updatedValues });
    setNewValue('');
  };
  
  /**
   * Remove a value delivery item
   * 
   * @param {string} id Value ID to remove
   */
  const removeValueDelivery = (id) => {
    const updatedValues = formData.valueDelivery.filter(value => value.id !== id);
    
    setFormData(prev => ({
      ...prev,
      valueDelivery: updatedValues
    }));
    
    onUpdateValueMap({ customerNeeds: formData.customerNeeds, valueDelivery: updatedValues });
  };
  
  /**
   * Toggle a relationship between a value and a need
   * 
   * @param {string} valueId Value ID
   * @param {string} needId Need ID
   */
  const toggleValueNeedRelationship = (valueId, needId) => {
    const updatedValues = formData.valueDelivery.map(value => {
      if (value.id === valueId) {
        // If the need is already in the related needs, remove it, otherwise add it
        const relatedNeeds = value.relatedNeeds?.includes(needId)
          ? value.relatedNeeds.filter(id => id !== needId)
          : [...(value.relatedNeeds || []), needId];
          
        return { ...value, relatedNeeds };
      }
      return value;
    });
    
    setFormData(prev => ({
      ...prev,
      valueDelivery: updatedValues
    }));
    
    onUpdateValueMap({ customerNeeds: formData.customerNeeds, valueDelivery: updatedValues });
  };
  
  /**
   * Get priority class for styling
   * 
   * @param {string} priority Priority level
   * @returns {string} CSS class for that priority
   */
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  /**
   * Save the value map
   */
  const handleSave = () => {
    onUpdateValueMap(formData);
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="needs">Customer Needs</TabsTrigger>
          <TabsTrigger value="value">Value Delivery</TabsTrigger>
          <TabsTrigger value="mapping">Value Mapping</TabsTrigger>
        </TabsList>
        
        {/* Customer Needs Tab */}
        <TabsContent value="needs">
          <Card>
            <CardHeader>
              <CardTitle>Customer Needs & Pain Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newNeed}
                    onChange={(e) => setNewNeed(e.target.value)}
                    placeholder="Add a customer need or pain point"
                    onKeyPress={(e) => e.key === 'Enter' && addCustomerNeed()}
                  />
                  <Button
                    onClick={addCustomerNeed}
                    disabled={!newNeed.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-4 space-y-3">
                  {formData.customerNeeds.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No customer needs added yet. What problems are your customers trying to solve?
                    </p>
                  ) : (
                    formData.customerNeeds.map((need) => (
                      <div key={need.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span>{need.description}</span>
                        <div className="flex items-center gap-2">
                          <select
                            value={need.priority}
                            onChange={(e) => updateNeedPriority(need.id, e.target.value)}
                            className={`text-xs px-2 py-1 rounded ${getPriorityClass(need.priority)}`}
                          >
                            <option value="high">High Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="low">Low Priority</option>
                          </select>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 h-8 w-8 p-0"
                            onClick={() => removeCustomerNeed(need.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                {formData.customerNeeds.length > 0 && (
                  <Button 
                    className="mt-4"
                    onClick={() => setActiveTab('value')}
                  >
                    Continue to Value Delivery
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Value Delivery Tab */}
        <TabsContent value="value">
          <Card>
            <CardHeader>
              <CardTitle>Value Delivery Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="Add a value delivery point"
                    onKeyPress={(e) => e.key === 'Enter' && addValueDelivery()}
                  />
                  <Button
                    onClick={addValueDelivery}
                    disabled={!newValue.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-4 space-y-3">
                  {formData.valueDelivery.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No value delivery points added yet. How does your offering deliver value?
                    </p>
                  ) : (
                    formData.valueDelivery.map((value) => (
                      <div key={value.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span>{value.description}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 h-8 w-8 p-0"
                          onClick={() => removeValueDelivery(value.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
                
                {formData.valueDelivery.length > 0 && (
                  <Button 
                    className="mt-4"
                    onClick={() => setActiveTab('mapping')}
                  >
                    Continue to Value Mapping
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Value Mapping Tab */}
        <TabsContent value="mapping">
          <Card>
            <CardHeader>
              <CardTitle>Map Value to Customer Needs</CardTitle>
            </CardHeader>
            <CardContent>
              {formData.customerNeeds.length === 0 || formData.valueDelivery.length === 0 ? (
                <p className="text-center py-6 text-gray-500">
                  Please add both customer needs and value delivery points before mapping them.
                </p>
              ) : (
                <div className="space-y-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="text-left py-2">Value Delivery</th>
                          {formData.customerNeeds.map((need) => (
                            <th 
                              key={need.id} 
                              className={`text-center py-2 ${getPriorityClass(need.priority)} px-2`}
                            >
                              {need.description}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {formData.valueDelivery.map((value) => (
                          <tr key={value.id} className="border-t">
                            <td className="py-3 pr-4">{value.description}</td>
                            {formData.customerNeeds.map((need) => (
                              <td key={need.id} className="text-center py-3">
                                <button
                                  className={`w-6 h-6 rounded ${
                                    value.relatedNeeds?.includes(need.id)
                                      ? 'bg-green-500 text-white'
                                      : 'bg-gray-200'
                                  }`}
                                  onClick={() => toggleValueNeedRelationship(value.id, need.id)}
                                >
                                  {value.relatedNeeds?.includes(need.id) ? '✓' : ''}
                                </button>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      className="flex items-center gap-2"
                      onClick={handleSave}
                    >
                      <Save className="h-4 w-4" /> Save Value Mapping
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ValueMapping;