/**
 * PricingOptimizerPage.jsx
 * Main page component for the pricing optimizer
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { FileText, DollarSign, TrendingUp, BarChart, Users, BarChart2 } from 'lucide-react';

// Hooks
import useCostAnalysis from '../hooks/useCostAnalysis';
import usePricingStrategy from '../hooks/usePricingStrategy';
import useScenarioManager from '../hooks/useScenarioManager';

// Cost Analysis Components
import CostStructure from '../components/cost-analysis/CostStructure';
import CostBreakdownChart from '../components/cost-analysis/CostBreakdownChart';
import BreakEvenAnalysisChart from '../components/cost-analysis/BreakEvenAnalysisChart';

// Pricing Strategy Components
import MarketPositionSelector from '../components/pricing-strategy/MarketPositionSelector';
import CompetitorForm from '../components/pricing-strategy/CompetitorForm';
import ValueFactorForm from '../components/pricing-strategy/ValueFactorForm';
import CustomerSegmentForm from '../components/pricing-strategy/CustomerSegmentForm';
import PricingStrategyDashboard from '../components/pricing-strategy/PricingStrategyDashboard';
import ImplementationGuidance from '../components/pricing-strategy/ImplementationGuidance';
import ScenarioManager from '../components/pricing-strategy/ScenarioManager';

// PDF Export
import { exportToPdf } from '../utils/pdfExport';

/**
 * PDF Export Button component
 */
const PdfExportButton = ({ exportType, data, label }) => {
  const handleExport = () => {
    if (exportType === 'pricing' || exportType === 'dashboard') {
      exportToPdf(data, exportType);
    }
  };
  
  return (
    <Button onClick={handleExport} className="flex items-center gap-2">
      <FileText className="h-4 w-4" />
      {label || 'Export to PDF'}
    </Button>
  );
};

PdfExportButton.propTypes = {
  exportType: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  label: PropTypes.string
};

/**
 * Pricing Optimizer Page component
 * 
 * @returns {JSX.Element} Main page component
 */
const PricingOptimizerPage = ({ onNavigateToScenarios }) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('cost-analysis');

  // Use cost analysis hook
  const costAnalysis = useCostAnalysis();

  // Use pricing strategy hook with the cost model
  const pricingStrategy = usePricingStrategy(costAnalysis.costModel);

  // State for customer segments
  const [customerSegments, setCustomerSegments] = useState([]);

  // Use scenario manager hook
  const scenarioManager = useScenarioManager();

  // Effect to switch to customer segments tab after cost structure saved
  useEffect(() => {
    if (costAnalysis.costBreakdown.total > 0 && activeTab === 'cost-analysis') {
      // Delay switching to customer segments tab to allow animation to complete
      const timeout = setTimeout(() => {
        setActiveTab('market-position');
      }, 500);
      
      return () => clearTimeout(timeout);
    }
  }, [costAnalysis.costBreakdown.total, activeTab]);

  // Effect to initialize customer segments from pricing model
  useEffect(() => {
    if (pricingStrategy.pricingModel) {
      // Check if model has segments already (can be empty array)
      if (pricingStrategy.pricingModel.segments !== undefined) {
        setCustomerSegments(pricingStrategy.pricingModel.segments);
      } else if (pricingStrategy.customerSegments) {
        // Fallback to hook state if available
        setCustomerSegments(pricingStrategy.customerSegments);
      }
    }
  }, [pricingStrategy.pricingModel, pricingStrategy.customerSegments]);

  /**
   * Handle cost structure save
   * @param {Object} costData - Cost structure data
   */
  const handleCostStructureSave = (costData) => {
    // This happens automatically through the hook, but we could add something here
    console.log('Cost structure saved:', costData);
  };

  /**
   * Handle continuing to market position
   */
  const handleContinueToMarketPosition = () => {
    setActiveTab('market-position');
  };

  /**
   * Handle continuing to competitors
   */
  const handleContinueToCompetitors = () => {
    setActiveTab('competitors');
  };

  /**
   * Handle continuing to value factors
   */
  const handleContinueToValueFactors = () => {
    setActiveTab('value-factors');
  };

  /**
   * Handle continuing to customer segments
   */
  const handleContinueToCustomerSegments = () => {
    setActiveTab('customer-segments');
  };

  /**
   * Handle continuing to recommendations
   */
  const handleContinueToRecommendations = () => {
    setActiveTab('recommendations');
  };

  /**
   * Prepare export data for PDF
   */
  const getExportData = () => {
    return {
      costAnalysis,
      pricingStrategy,
      customerSegments
    };
  };

  /**
   * Get recommended price
   */
  const getRecommendedPrice = () => {
    if (!pricingStrategy.priceRecommendations || 
        !pricingStrategy.selectedStrategy || 
        !pricingStrategy.priceRecommendations[pricingStrategy.selectedStrategy]) {
      return 0;
    }
    
    return pricingStrategy.priceRecommendations[pricingStrategy.selectedStrategy].price;
  };

  /**
   * Handle adding a customer segment
   */
  const handleAddSegment = (segment) => {
    if (pricingStrategy.pricingModel) {
      const id = pricingStrategy.pricingModel.addSegment(
        segment.name, 
        segment.size, 
        segment.priceElasticity, 
        segment.description || ''
      );
      
      // Update local state
      setCustomerSegments([...pricingStrategy.pricingModel.segments]);
      
      // Trigger recalculation
      pricingStrategy.recalculateRecommendations();
      
      return id;
    }
    return null;
  };

  /**
   * Handle updating a customer segment
   */
  const handleUpdateSegment = (id, updatedSegment) => {
    if (pricingStrategy.pricingModel) {
      const success = pricingStrategy.pricingModel.updateSegment(id, updatedSegment);
      
      if (success) {
        // Update local state
        setCustomerSegments([...pricingStrategy.pricingModel.segments]);
        
        // Trigger recalculation
        pricingStrategy.recalculateRecommendations();
      }
      
      return success;
    }
    return false;
  };

  /**
   * Handle removing a customer segment
   */
  const handleRemoveSegment = (id) => {
    if (pricingStrategy.pricingModel) {
      const success = pricingStrategy.pricingModel.removeSegment(id);
      
      if (success) {
        // Update local state
        setCustomerSegments([...pricingStrategy.pricingModel.segments]);
        
        // Trigger recalculation
        pricingStrategy.recalculateRecommendations();
      }
      
      return success;
    }
    return false;
  };

  /**
   * Save current state as a scenario
   */
  const handleSaveAsScenario = () => {
    const defaultName = `${pricingStrategy.selectedStrategy || 'Default'} Strategy (${new Date().toLocaleDateString()})`;
    
    scenarioManager.createScenario(defaultName, {
      costAnalysis: costAnalysis.getCostStructure(),
      pricingStrategy: {
        marketPosition: pricingStrategy.marketPosition,
        competitors: pricingStrategy.competitors,
        valueFactors: pricingStrategy.valueFactors,
        customerSegments,
        selectedStrategy: pricingStrategy.selectedStrategy,
        priceRecommendations: pricingStrategy.priceRecommendations
      }
    });
    
    // Optionally navigate to the scenarios page
    if (typeof onNavigateToScenarios === 'function') {
      onNavigateToScenarios();
    }
  };

  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedStrategy, setSelectedStrategy] = useState('');

  const handlePositionChange = (position) => {
    setSelectedPosition(position);
  };

  const handleStrategySelect = (strategy) => {
    setSelectedStrategy(strategy);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dynamic Pricing Optimizer</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleSaveAsScenario}
          >
            <BarChart2 className="h-4 w-4" /> Save as Scenario
          </Button>
          
          <PdfExportButton 
            exportType="pricing" 
            data={getExportData()}
            label="Export Report"
          />
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-6 mb-8">
          <TabsTrigger value="cost-analysis" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" /> Cost Analysis
          </TabsTrigger>
          <TabsTrigger value="market-position" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" /> Market Position
          </TabsTrigger>
          <TabsTrigger value="competitors" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Competitors
          </TabsTrigger>
          <TabsTrigger value="value-factors" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" /> Value Factors
          </TabsTrigger>
          <TabsTrigger value="customer-segments" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Customer Segments
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" /> Recommendations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="cost-analysis">
          <CostStructure 
            costAnalysis={costAnalysis}
            onSave={handleCostStructureSave}
            onContinue={handleContinueToMarketPosition}
          />
        </TabsContent>
        
        <TabsContent value="market-position">
          <MarketPositionSelector 
            marketPosition={pricingStrategy.marketPosition}
            onPositionChange={pricingStrategy.setMarketPosition}
            onContinue={handleContinueToCompetitors}
          />
        </TabsContent>
        
        <TabsContent value="competitors">
          <CompetitorForm 
            competitors={pricingStrategy.competitors || []}
            onAddCompetitor={pricingStrategy.addCompetitor}
            onUpdateCompetitor={pricingStrategy.updateCompetitor}
            onRemoveCompetitor={pricingStrategy.removeCompetitor}
            onContinue={handleContinueToValueFactors}
          />
        </TabsContent>
        
        <TabsContent value="value-factors">
          <ValueFactorForm 
            valueFactors={pricingStrategy.valueFactors || []}
            onAddValueFactor={pricingStrategy.addValueFactor}
            onUpdateValueFactor={pricingStrategy.updateValueFactor}
            onRemoveValueFactor={pricingStrategy.removeValueFactor}
            onContinue={handleContinueToCustomerSegments}
          />
        </TabsContent>
        
        <TabsContent value="customer-segments">
          <CustomerSegmentForm 
            segments={customerSegments}
            onAddSegment={handleAddSegment}
            onUpdateSegment={handleUpdateSegment}
            onRemoveSegment={handleRemoveSegment}
            onContinue={handleContinueToRecommendations}
          />
        </TabsContent>
        
        <TabsContent value="recommendations">
          <div className="space-y-6">
            <MarketPositionSelector 
              onPositionChange={handlePositionChange}
              currentPosition={selectedPosition}
            />

            <PricingStrategyDashboard 
              onSelectStrategy={handleStrategySelect}
              currentStrategy={selectedStrategy}
              marketPosition={selectedPosition}
            />

            <ImplementationGuidance 
              strategyName={selectedStrategy}
              marketPosition={selectedPosition}
            />
            <div className="flex justify-end mt-4">
              <PdfExportButton 
                exportType="dashboard" 
                data={getExportData()}
                label="Export Dashboard"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

PricingOptimizerPage.propTypes = {
  onNavigateToScenarios: PropTypes.func
};

export default PricingOptimizerPage;