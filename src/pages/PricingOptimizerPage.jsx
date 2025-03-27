/**
 * PricingOptimizerPage.jsx
 * Main page component for the pricing optimizer
 */

import React, { useState, useEffect } from 'react';
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
        setActiveTab('customer-segments');
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
   * Handle continuing to customer segments
   */
  const handleContinueToCustomerSegments = () => {
    setActiveTab('customer-segments');
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
    const defaultName = `${pricingStrategy.selectedStrategy} Strategy (${new Date().toLocaleDateString()})`;
    
    scenarioManager.createScenario(defaultName, {
      costAnalysis,
      pricingStrategy
    });
    
    // Optionally navigate to the scenarios page
    if (typeof onNavigateToScenarios === 'function') {
      onNavigateToScenarios();
    }
  };
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dynamic Pricing Optimizer</h1>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleSaveAsScenario}
        >
          <BarChart2 className="h-4 w-4