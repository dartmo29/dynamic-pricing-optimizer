/**
 * PricingOptimizerPage.jsx
 * Main page component for the pricing optimizer
 */

import React, { useState } from 'react';
import MarketPositionSelector from '../components/pricing-strategy/MarketPositionSelector';
import PricingStrategyDashboard from '../components/pricing-strategy/PricingStrategyDashboard';
import ImplementationGuidance from '../components/pricing-strategy/ImplementationGuidance';

const PricingOptimizerPage = () => {
  const [marketPosition, setMarketPosition] = useState('mid-market');
  const [selectedStrategy, setSelectedStrategy] = useState(null);

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
        onSelectStrategy={handleStrategySelect}
      />

      <ImplementationGuidance
        strategyName={selectedStrategy}
      />
    </div>
  );
};

export default PricingOptimizerPage;