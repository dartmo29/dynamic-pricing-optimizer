import React, { Suspense } from 'react';
import PricingOptimizerPage from './pages/PricingOptimizerPage';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<LoadingSpinner />}>
        <PricingOptimizerPage />
      </Suspense>
    </div>
  );
};

export default App;