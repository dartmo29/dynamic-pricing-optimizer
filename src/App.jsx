import React, { Suspense } from 'react';
import PricingOptimizerPage from './pages/PricingOptimizerPage';

const App = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <PricingOptimizerPage />
    </Suspense>
  );
};

export default App;