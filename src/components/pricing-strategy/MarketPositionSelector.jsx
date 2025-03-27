
import React from 'react';
import PropTypes from 'prop-types';

const MarketPositionSelector = ({ currentPosition, onPositionChange }) => {
  const positions = [
    { id: 'budget', label: 'Budget', description: 'Competitive pricing for cost-conscious customers' },
    { id: 'mid-market', label: 'Mid-Market', description: 'Balanced value proposition with moderate pricing' },
    { id: 'premium', label: 'Premium', description: 'High-end pricing for premium features and service' }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Market Position</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {positions.map((position) => (
          <button
            key={position.id}
            onClick={() => onPositionChange(position.id)}
            className={`p-4 rounded-lg border transition-all ${
              currentPosition === position.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <h3 className="font-medium mb-2">{position.label}</h3>
            <p className="text-sm text-gray-600">{position.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

MarketPositionSelector.propTypes = {
  currentPosition: PropTypes.oneOf(['budget', 'mid-market', 'premium']).isRequired,
  onPositionChange: PropTypes.func.isRequired,
};

export default MarketPositionSelector;
