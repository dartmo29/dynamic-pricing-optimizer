
import React from 'react';

const MarketPositionSelector = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Market Position</h2>
      <div className="space-y-4">
        <button className="w-full p-3 text-left border rounded hover:bg-blue-50">
          Premium Segment
        </button>
        <button className="w-full p-3 text-left border rounded hover:bg-blue-50">
          Mid-Market
        </button>
        <button className="w-full p-3 text-left border rounded hover:bg-blue-50">
          Value Segment
        </button>
      </div>
    </div>
  );
};

export default MarketPositionSelector;
