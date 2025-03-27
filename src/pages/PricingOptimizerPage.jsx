
import React, { useState } from 'react';
import MarketPositionSelector from '../components/pricing-strategy/MarketPositionSelector';
import PricingStrategyDashboard from '../components/pricing-strategy/PricingStrategyDashboard';
import ImplementationGuidance from '../components/pricing-strategy/ImplementationGuidance';

const PricingOptimizerPage = () => {
  const [marketPosition, setMarketPosition] = useState('mid-market');
  const [selectedStrategy, setSelectedStrategy] = useState('cost-plus');
  const [competitors] = useState([]);

  const handlePositionChange = (position) => {
    setMarketPosition(position);
  };

  const handleStrategySelect = (strategy) => {
    setSelectedStrategy(strategy);
  };

  return (
    <div className="space-y-6">
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
