import React from 'react';
import MarketPositionSelector from '../components/pricing-strategy/MarketPositionSelector';

const PricingOptimizerPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pricing Optimizer</h1>
      <MarketPositionSelector />
    </div>
  );
};

export default PricingOptimizerPage;