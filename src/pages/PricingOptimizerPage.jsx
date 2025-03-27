
import React, { useState, useEffect } from 'react';
import MarketPositionSelector from '../components/pricing-strategy/MarketPositionSelector';
import PricingStrategyDashboard from '../components/pricing-strategy/PricingStrategyDashboard';
import ImplementationGuidance from '../components/pricing-strategy/ImplementationGuidance';

const PricingOptimizerPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [marketPosition, setMarketPosition] = useState('mid-market');
  const [selectedStrategy, setSelectedStrategy] = useState('cost-plus');
  const [error, setError] = useState(null);
  const [competitors] = useState([
    { name: 'Competitor A', price: 100 },
    { name: 'Competitor B', price: 120 }
  ]);

  useEffect(() => {
    try {
      // Simulate initialization
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  const handlePositionChange = (position) => {
    setMarketPosition(position);
  };

  const handleStrategySelect = (strategy) => {
    setSelectedStrategy(strategy);
  };

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dynamic Pricing Optimizer</h1>
      
      <div className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow">
          <MarketPositionSelector 
            currentPosition={marketPosition}
            onPositionChange={handlePositionChange}
          />
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <PricingStrategyDashboard 
            marketPosition={marketPosition}
            selectedStrategy={selectedStrategy}
            onStrategySelect={handleStrategySelect}
            competitors={competitors}
          />
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <ImplementationGuidance 
            strategy={selectedStrategy}
            marketPosition={marketPosition}
            competitors={competitors}
          />
        </section>
      </div>
    </div>
  );
};

export default PricingOptimizerPage;
