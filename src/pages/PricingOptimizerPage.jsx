/**
 * PricingOptimizerPage.jsx
 * Main page component for the pricing optimizer
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { FileText, BarChart2 } from 'lucide-react';

// Hooks
import useCostAnalysis from '../hooks/useCostAnalysis';
import usePricingStrategy from '../hooks/usePricingStrategy';
import useScenarioManager from '../hooks/useScenarioManager';

// Components
import MarketPositionSelector from '../components/pricing-strategy/MarketPositionSelector';
import PricingStrategyDashboard from '../components/pricing-strategy/PricingStrategyDashboard';
import ImplementationGuidance from '../components/pricing-strategy/ImplementationGuidance';


const PricingOptimizerPage = ({ onNavigateToScenarios }) => {
  const [activeTab, setActiveTab] = useState('market-position');
  const [marketPosition, setMarketPosition] = useState('mid-market');
  const [selectedStrategy, setSelectedStrategy] = useState('value-based');
  const [competitors, setCompetitors] = useState([]);

  // Use hooks
  const costAnalysis = useCostAnalysis();
  const pricingStrategy = usePricingStrategy(costAnalysis.costModel);
  const scenarioManager = useScenarioManager();

  const handlePositionChange = (position) => {
    setMarketPosition(position);
  };

  const handleStrategySelect = (strategy) => {
    setSelectedStrategy(strategy);
  };

  const handleSaveAsScenario = () => {
    const currentState = {
      costAnalysis: costAnalysis.getData(),
      pricingStrategy: pricingStrategy.getData(),
      marketPosition,
      selectedStrategy
    };
    scenarioManager.createScenario(`Scenario ${Date.now()}`, currentState);
  };

  const getExportData = () => ({
    costAnalysis: costAnalysis.getData(),
    pricingStrategy: pricingStrategy.getData(),
    marketPosition,
    selectedStrategy
  });

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

          <Button className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="market-position">Market Position</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="market-position">
          <div className="space-y-6">
            <MarketPositionSelector 
              onPositionChange={handlePositionChange}
              marketPosition={marketPosition}
            />
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="space-y-6">
            <PricingStrategyDashboard 
              competitors={competitors}
              selectedStrategy={selectedStrategy}
              onSelectStrategy={handleStrategySelect}
            />

            <ImplementationGuidance 
              strategyName={selectedStrategy}
              competitors={competitors}
            />
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