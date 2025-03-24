/**
 * ValuePropositionEditor.jsx
 * Component for creating and editing value propositions
 */

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Plus, Trash, Save } from 'lucide-react';

/**
 * Value Proposition Editor component
 * 
 * @param {Object} props Component props
 * @param {Object} props.valueProposition Current value proposition data
 * @param {Function} props.onUpdate Callback for updating value proposition
 * @returns {JSX.Element} Value Proposition Editor component
 */
const ValuePropositionEditor = ({ valueProposition = {}, onUpdate }) => {
  // State for form data
  const [formData, setFormData] = useState({
    statement: valueProposition.statement || '',
    targetMarket: valueProposition.targetMarket || '',
    primaryBenefit: valueProposition.primaryBenefit || '',
    differentiator: valueProposition.differentiator || '',
    uniqueFactors: valueProposition.uniqueFactors || []
  });
  
  // State for new unique factor
  const [newFactor, setNewFactor] = useState('');
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('builder');
  
  // Update form data when props change
  useEffect(() => {
    setFormData({
      statement: valueProposition.statement || '',
      targetMarket: valueProposition.targetMarket || '',
      primaryBenefit: valueProposition.primaryBenefit || '',
      differentiator: valueProposition.differentiator || '',
      uniqueFactors: valueProposition.uniqueFactors || []
    });
  }, [valueProposition]);
  
  /**
   * Handle input change
   * 
   * @param {Object} e Event object
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  /**
   * Add a unique factor
   */
  const addUniqueFactor = () => {
    if (!newFactor.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      uniqueFactors: [...prev.uniqueFactors, newFactor.trim()]
    }));
    
    setNewFactor('');
  };
  
  /**
   * Remove a unique factor
   * 
   * @param {number} index Index of factor to remove
   */
  const removeUniqueFactor = (index) => {
    setFormData(prev => ({
      ...prev,
      uniqueFactors: prev.uniqueFactors.filter((_, i) => i !== index)
    }));
  };
  
  /**
   * Save value proposition
   */
  const handleSave = () => {
    onUpdate(formData);
  };
  
  /**
   * Generate value proposition statement
   */
  const generateStatement = () => {
    const { targetMarket, primaryBenefit, differentiator } = formData;
    
    if (!targetMarket || !primaryBenefit || !differentiator) {
      return;
    }
    
    const statement = `For ${targetMarket}, our solution ${primaryBenefit} unlike competitors who ${differentiator}.`;
    
    setFormData(prev => ({
      ...prev,
      statement
    }));
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="builder">Value Proposition Builder</TabsTrigger>
          <TabsTrigger value="statement">Statement Editor</TabsTrigger>
        </TabsList>
        
        {/* Builder Tab */}
        <TabsContent value="builder">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Define Your Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Market
                    </label>
                    <Input
                      name="targetMarket"
                      value={formData.targetMarket}
                      onChange={handleInputChange}
                      placeholder="Who are your customers? (e.g., small service businesses)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Primary Benefit
                    </label>
                    <Input
                      name="primaryBenefit"
                      value={formData.primaryBenefit}
                      onChange={handleInputChange}
                      placeholder="What problem do you solve? (e.g., helps optimize pricing)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Key Differentiator
                    </label>
                    <Input
                      name="differentiator"
                      value={formData.differentiator}
                      onChange={handleInputChange}
                      placeholder="How are you different? (e.g., rely on guesswork)"
                    />
                  </div>
                  
                  <Button 
                    className="w-full mt-4 flex items-center gap-2"
                    onClick={generateStatement}
                    disabled={!formData.targetMarket || !formData.primaryBenefit || !formData.differentiator}
                  >
                    Generate Statement
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Unique Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newFactor}
                      onChange={(e) => setNewFactor(e.target.value)}
                      placeholder="Add a unique factor of your offering"
                      onKeyPress={(e) => e.key === 'Enter' && addUniqueFactor()}
                    />
                    <Button
                      onClick={addUniqueFactor}
                      disabled={!newFactor.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    {formData.uniqueFactors.length === 0 ? (
                      <p className="text-sm text-gray-500">
                        No unique factors added yet. Add the key points that make your offering special.
                      </p>
                    ) : (
                      formData.uniqueFactors.map((factor, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>{factor}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 h-8 w-8 p-0"
                            onClick={() => removeUniqueFactor(index)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Statement Tab */}
        <TabsContent value="statement">
          <Card>
            <CardHeader>
              <CardTitle>Value Proposition Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Value Proposition
                  </label>
                  <textarea
                    name="statement"
                    value={formData.statement}
                    onChange={handleInputChange}
                    placeholder="For [target market], our solution [primary benefit] unlike competitors who [differentiator]."
                    className="w-full p-2 border border-gray-300 rounded-md min-h-[120px]"
                  />
                </div>
                
                {formData.statement && (
                  <div className="p-4 bg-blue-50 rounded-md">
                    <h3 className="font-medium text-blue-800 mb-2">Your Value Proposition:</h3>
                    <p className="text-blue-700">{formData.statement}</p>
                  </div>
                )}
                
                <Button 
                  className="mt-4 flex items-center gap-2"
                  onClick={handleSave}
                >
                  <Save className="h-4 w-4" /> Save Value Proposition
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ValuePropositionEditor;