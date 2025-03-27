
import React, { useState, useEffect } from 'react';
import MarketPositionSelector from '../components/pricing-strategy/MarketPositionSelector';
import PricingStrategyCard from '../components/pricing-strategy/PricingStrategyCard';
import SetupWizard from '../components/setup/SetupWizard';

const PricingOptimizerPage = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [marketPosition, setMarketPosition] = useState('mid-market');
  const [selectedStrategy, setSelectedStrategy] = useState('cost-plus');
  const [competitors] = useState([
    { name: 'Competitor A', price: 100 },
    { name: 'Competitor B', price: 120 }
  ]);

  useEffect(() => {
    // Simulate initialization
    setTimeout(() => setIsInitialized(true), 1000);
  }, []);

  const handleStrategySelect = (strategy) => {
    setSelectedStrategy(strategy);
  };

  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-pulse text-lg text-gray-600">
          Initializing pricing optimizer...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SetupWizard />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MarketPositionSelector 
          position={marketPosition}
          onPositionChange={setMarketPosition}
        />
        
        <PricingStrategyCard
          strategy={selectedStrategy}
          onStrategySelect={handleStrategySelect}
          competitors={competitors}
        />
      </div>
    </div>
  );
};

export default PricingOptimizerPage;
