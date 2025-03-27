
import React, { Suspense } from 'react';
import PricingOptimizerPage from './pages/PricingOptimizerPage';

const ErrorFallback = ({ error }) => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-red-500 p-4">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  </div>
);

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

const App = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }>
        <PricingOptimizerPage />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
