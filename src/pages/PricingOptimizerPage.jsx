/**
 * PricingOptimizerPage.jsx
 * Main page component for the pricing optimizer
 */

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { FileText, DollarSign, TrendingUp, BarChart } from 'lucide-react';

// Hooks
import useCostAnalysis from '../hooks/useCostAnalysis';
import usePricingStrategy from '../hooks/usePricingStrategy';

// Cost Analysis Components
import CostStructureForm from '../components/cost-analysis/CostStructureForm';
import CostBreakdownChart from '../components/cost-analysis/CostBreakdownChart';
import BreakEvenAnalysisChart from '../components/cost-analysis/BreakEvenAnalysisChart';

// Pricing Strategy Components
import MarketPositionSelector from '../components/pricing-strategy/MarketPositionSelector';
import CompetitorForm from '../components/pricing-strategy/CompetitorForm';
import ValueFactorForm from '../components/pricing-strategy/ValueFactorForm';
import PricingStrategyDashboard from '../components/pricing-strategy/PricingStrategyDashboard';
import ImplementationGuidance from '../components/pricing-strategy/ImplementationGuidance';

// PDF Export
import { exportToPdf as exportPricing } from '../utils/pdfExport';

/**
 * PDF Export Button component
 */
const PdfExportButton = ({ exportType, data, label }) => {
  const handleExport = () => {
    if (exportType === 'pricing' || exportType === 'dashboard') {
      exportPricing(data, exportType);
    }
  };
  
  return (
    <Button onClick={handleExport} className="flex items-center gap-2">
      <FileText className="h-4 w-4" />
      {label || 'Export to PDF'}
    </Button>
  );
};

/**
 * Pricing Optimizer Page component
 * 
 * @returns {JSX.Element} Main page component
 */
const PricingOptimizerPage = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('cost-analysis');
  
  // Use cost analysis hook
  const costAnalysis = useCostAnalysis();
  
  // Use pricing strategy hook with the cost model
  const pricingStrategy = usePricingStrategy(costAnalysis.costModel);
  
  // Effect to switch to pricing tab after cost structure saved
  useEffect(() => {
    if (costAnalysis.costBreakdown.total > 0 && activeTab === 'cost-analysis') {
      // Delay switching to pricing tab to allow animation to complete
      const timeout = setTimeout(() => {
        setActiveTab('pricing-strategies');
      }, 500);
      
      return () => clearTimeout(timeout);
    }
  }, [costAnalysis.costBreakdown.total, activeTab]);
  
  /**
   * Handle cost structure save
   * @param {Object} costData - Cost structure data
   */
  const handleCostStructureSave = (costData) => {
    // This happens automatically through the hook, but we could add something here
    console.log('Cost structure saved:', costData);
  };
  
  /**
   * Prepare export data for PDF
   */
  const getExportData = () => {
    return {
      costAnalysis,
      pricingStrategy
    };
  };
  
  // Get recommended price
  const getRecommendedPrice = () => {
    if (!pricingStrategy.priceRecommendations || 
        !pricingStrategy.selectedStrategy || 
        !pricingStrategy.priceRecommendations[pricingStrategy.selectedStrategy]) {
      return 0;
    }
    
    return pricingStrategy.priceRecommendations[pricingStrategy.selectedStrategy].price;
  };
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Dynamic Pricing Optimizer</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="cost-analysis" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Cost Analysis
          </TabsTrigger>
          <TabsTrigger value="pricing-strategies" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" /> Pricing Strategies
          </TabsTrigger>
          <TabsTrigger value="implementation" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" /> Implementation
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" /> Dashboard
          </TabsTrigger>
        </TabsList>
        
        {/* Cost Analysis Tab */}
        <TabsContent value="cost-analysis">
          <div className="grid md:grid-cols-2 gap-6">
            <CostStructureForm 
              onSave={handleCostStructureSave} 
              costAnalysis={costAnalysis} 
            />
            
            <div className="space-y-6">
              <CostBreakdownChart costBreakdown={{
                ...costAnalysis.costBreakdown, 
                targetMargin: costAnalysis.targetMargin
              }} />
              
              {costAnalysis.costBreakdown.total > 0 && getRecommendedPrice() > 0 && (
                <BreakEvenAnalysisChart 
                  costBreakdown={costAnalysis.costBreakdown}
                  targetMargin={costAnalysis.targetMargin}
                  price={getRecommendedPrice()}
                  monthlyVolume={costAnalysis.expectedVolume}
                />
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Pricing Strategies Tab */}
        <TabsContent value="pricing-strategies">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-6">
              <MarketPositionSelector 
                position={pricingStrategy.marketPosition} 
                onPositionChange={pricingStrategy.handleMarketPositionChange} 
              />
              
              <CompetitorForm 
                competitors={pricingStrategy.competitors}
                onAddCompetitor={pricingStrategy.addCompetitor}
                onUpdateCompetitor={pricingStrategy.updateCompetitor}
                onRemoveCompetitor={pricingStrategy.removeCompetitor}
                errors={pricingStrategy.errors}
              />
              
              <ValueFactorForm 
                valueFactors={pricingStrategy.valueFactors}
                onAddValueFactor={pricingStrategy.addValueFactor}
                onUpdateValueFactor={pricingStrategy.updateValueFactor}
                onRemoveValueFactor={pricingStrategy.removeValueFactor}
                errors={pricingStrategy.errors}
              />
            </div>
            
            <div className="md:col-span-2">
              <PricingStrategyDashboard 
                recommendations={pricingStrategy.priceRecommendations}
                selectedStrategy={pricingStrategy.selectedStrategy}
                onSelectStrategy={pricingStrategy.selectStrategy}
              />
              
              {Object.keys(pricingStrategy.priceRecommendations).length > 0 && (
                <div className="flex justify-end mt-6">
                  <PdfExportButton
                    exportType="pricing"
                    data={getExportData()}
                    label="Export Strategies to PDF"
                  />
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Implementation Tab */}
        <TabsContent value="implementation">
          {pricingStrategy.implementationGuidance ? (
            <div className="space-y-6">
              <ImplementationGuidance 
                guidance={pricingStrategy.implementationGuidance} 
                strategyName={pricingStrategy.selectedStrategy} 
              />
              
              <div className="flex justify-end">
                <PdfExportButton
                  exportType="pricing"
                  data={getExportData()}
                  label="Export Implementation Plan to PDF"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No implementation plan available</h3>
              <p className="text-gray-500 mb-4">
                Please complete the Cost Analysis and select a Pricing Strategy to generate an implementation plan.
              </p>
              <Button onClick={() => setActiveTab('cost-analysis')}>
                Go to Cost Analysis
              </Button>
            </div>
          )}
        </TabsContent>
        
        {/* Dashboard Tab */}
        <TabsContent value="dashboard">
          {(costAnalysis.costBreakdown.total > 0 && Object.keys(pricingStrategy.priceRecommendations).length > 0) ? (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-medium mb-2">Cost Per Unit</h3>
                  <p className="text-3xl font-bold">
                    ${costAnalysis.costBreakdown.total.toFixed(2)}
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-medium mb-2">Recommended Price</h3>
                  <p className="text-3xl font-bold">
                    ${pricingStrategy.priceRecommendations[pricingStrategy.selectedStrategy].price.toFixed(2)}
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-medium mb-2">Profit Margin</h3>
                  <p className="text-3xl font-bold">
                    {(pricingStrategy.priceRecommendations[pricingStrategy.selectedStrategy].margin * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <CostBreakdownChart costBreakdown={{
                  ...costAnalysis.costBreakdown, 
                  targetMargin: costAnalysis.targetMargin
                }} />
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-medium mb-4">Pricing Strategy Comparison</h3>
                  <div className="space-y-4">
                    {Object.entries(pricingStrategy.priceRecommendations).map(([strategy, rec]) => (
                      <div key={strategy} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{
                            {
                              'cost-plus': 'Cost-Plus',
                              'competitor': 'Competitor-Based',
                              'value': 'Value-Based',
                              'optimal': 'Optimal Blend'
                            }[strategy]
                          }</p>
                          <p className="text-sm text-gray-500">
                            {(rec.margin * 100).toFixed(0)}% margin
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${rec.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <BreakEvenAnalysisChart 
                costBreakdown={costAnalysis.costBreakdown}
                targetMargin={costAnalysis.targetMargin}
                price={getRecommendedPrice()}
                monthlyVolume={costAnalysis.expectedVolume}
              />
              
              <div className="flex justify-end">
                <PdfExportButton
                  exportType="dashboard"
                  data={getExportData()}
                  label="Export Dashboard to PDF"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No dashboard data available</h3>
              <p className="text-gray-500 mb-4">
                Please complete the Cost Analysis to generate your dashboard.
              </p>
              <Button onClick={() => setActiveTab('cost-analysis')}>
                Go to Cost Analysis
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PricingOptimizerPage;