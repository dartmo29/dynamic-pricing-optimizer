
import React, { useState } from 'react';
import MarketPositionSelector from '../components/pricing-strategy/MarketPositionSelector';
import PricingStrategyDashboard from '../components/pricing-strategy/PricingStrategyDashboard';
import ImplementationGuidance from '../components/pricing-strategy/ImplementationGuidance';

const PricingOptimizerPage = () => {
  const [marketPosition, setMarketPosition] = useState('mid-market');
  const [selectedStrategy, setSelectedStrategy] = useState('cost-plus');
  const [competitors] = useState([
    { name: 'Competitor A', price: 100 },
    { name: 'Competitor B', price: 120 }
  ]);

  const handlePositionChange = (position) => {
    setMarketPosition(position);
  };

  const handleStrategySelect = (strategy) => {
    setSelectedStrategy(strategy);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Dynamic Pricing Optimizer</h1>
      
      <MarketPositionSelector
        marketPosition={marketPosition}
        onPositionChange={handlePositionChange}
      />

      <PricingStrategyDashboard
        marketPosition={marketPosition}
        selectedStrategy={selectedStrategy}
        onSelectStrategy={handleStrategySelect}
        competitors={competitors}
      />

      <ImplementationGuidance
        strategyName={selectedStrategy}
        competitors={competitors}
      />
    </div>
  );
};

export default PricingOptimizerPage;
