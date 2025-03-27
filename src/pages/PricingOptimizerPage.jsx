import React, { useState, useEffect } from 'react';
import MarketPositionSelector from '../components/pricing-strategy/MarketPositionSelector';

const PricingOptimizerPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate any initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pricing Optimizer</h1>
      <div className="grid gap-6">
        <MarketPositionSelector />
      </div>
    </div>
  );
};

export default PricingOptimizerPage;