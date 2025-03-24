/**
 * ValueAssessmentPage.jsx
 * Page component for the value assessment tools
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, ArrowLeft, BarChart, Calculator, FileText } from 'lucide-react';
import { Link } from '@/components/ui/link';

// Value Assessment Components
import ValueAssessmentMatrix from '../components/value-assessment/ValueAssessmentMatrix';
import CustomerValueCalculator from '../components/value-assessment/CustomerValueCalculator';

// Hooks
import useCostAnalysis from '../hooks/useCostAnalysis';
import usePricingStrategy from '../hooks/usePricingStrategy';

const ValueAssessmentPage = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('value-positioning');
  
  // Use cost analysis hook
  const costAnalysis = useCostAnalysis();
  
  // Use pricing strategy hook with the cost model
  const pricingStrategy = usePricingStrategy(costAnalysis.costModel);
  
  // Calculate your value score
  const yourValueScore = useMemo(() => {
    if (!pricingStrategy.valueFactors || pricingStrategy.valueFactors.length === 0) return 0;
    
    const totalImportance = pricingStrategy.valueFactors.reduce(
      (sum, factor) => sum + factor.importance, 0
    );
    
    if (totalImportance === 0) return 0;
    
    const weightedScore = pricingStrategy.valueFactors.reduce(
      (sum, factor) => sum + (factor.importance * factor.score), 0
    );
    
    return weightedScore / totalImportance;
  }, [pricingStrategy.valueFactors]);
  
  // Get recommended price
  const recommendedPrice = useMemo(() => {
    if (!pricingStrategy.priceRecommendations || 
        !pricingStrategy.selectedStrategy || 
        !pricingStrategy.priceRecommendations[pricingStrategy.selectedStrategy]) {
      return 0;
    }
    
    return pricingStrategy.priceRecommendations[pricingStrategy.selectedStrategy].price;
  }, [pricingStrategy.priceRecommendations, pricingStrategy.selectedStrategy]);
  
  // Export to PDF (placeholder)
  const handleExportToPdf = () => {
    alert('In a full implementation, this would generate a PDF report of your value assessment.');
  };
  
  // Check if we have enough data
  const hasRequiredData = useMemo(() => {
    return costAnalysis.costBreakdown.total > 0 && 
           pricingStrategy.valueFactors.length > 0 && 
           pricingStrategy.competitors.length > 0 &&
           recommendedPrice > 0;
  }, [costAnalysis.costBreakdown.total, pricingStrategy.valueFactors, pricingStrategy.competitors, recommendedPrice]);
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Value Assessment</h1>
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" /> Back to Main Dashboard
        </Link>
      </div>
      
      {!hasRequiredData ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <h3 className="text-lg font-medium mb-2">Complete the pricing process first</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                To use the value assessment tools, you need to complete the cost analysis and 
                pricing strategy sections first.
              </p>
              <Link href="/">
                <Button>Go to Pricing Optimizer</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="value-positioning" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" /> Value-Price Positioning
              </TabsTrigger>
              <TabsTrigger value="customer-value" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" /> Customer Value Calculator
              </TabsTrigger>
            </TabsList>
            
            {/* Value Positioning Tab */}
            <TabsContent value="value-positioning">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <ValueAssessmentMatrix 
                    competitors={pricingStrategy.competitors}
                    valueFactors={pricingStrategy.valueFactors}
                    yourPrice={recommendedPrice}
                    yourValue={yourValueScore}
                  />
                </div>
                
                <div className="md:col-span-1 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium">Positioning Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Your Price</p>
                        <p className="text-lg font-bold">${recommendedPrice.toFixed(2)}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Your Value Score</p>
                        <p className="text-lg font-bold">{(yourValueScore).toFixed(1)} / 10</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Market Position</p>
                        <p className="text-lg font-bold">{pricingStrategy.marketPosition}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Pricing Strategy</p>
                        <p className="text-lg font-bold">{pricingStrategy.selectedStrategy}</p>
                      </div>
                      
                      <div className="pt-4">
                        <h4 className="text-sm font-medium mb-2">Key Value Factors</h4>
                        <ul className="space-y-2">
                          {pricingStrategy.valueFactors
                            .sort((a, b) => b.importance * b.score - a.importance * a.score)
                            .slice(0, 3)
                            .map((factor, index) => (
                              <li key={index} className="flex justify-between items-center text-sm">
                                <span>{factor.name}</span>
                                <span className="font-medium">{factor.score}/10</span>
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Button onClick={handleExportToPdf} variant="outline" className="w-full flex items-center justify-center gap-2">
                    <FileText className="h-4 w-4" /> Export Positioning Analysis
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Customer Value Calculator Tab */}
            <TabsContent value="customer-value">
              <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-6">
                <CustomerValueCalculator 
                  valueFactors={pricingStrategy.valueFactors}
                  recommendedPrice={recommendedPrice}
                />
                
                <div className="flex justify-end">
                  <Button onClick={handleExportToPdf} variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" /> Export Value Calculator to PDF
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default ValueAssessmentPage;