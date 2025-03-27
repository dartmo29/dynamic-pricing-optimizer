
import React, { Suspense } from 'react';
import PricingOptimizerPage from './pages/PricingOptimizerPage';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    <span className="ml-4 text-lg text-gray-700">Loading application...</span>
  </div>
);

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <h1 className="text-2xl font-bold text-gray-800">Dynamic Pricing Optimizer</h1>
        </div>
      </header>
      <Suspense fallback={<LoadingSpinner />}>
        <main className="container mx-auto px-4 py-8">
          <PricingOptimizerPage />
        </main>
      </Suspense>
    </div>
  );
};

export default App;
