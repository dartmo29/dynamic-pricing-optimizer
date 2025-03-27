import React from 'react';
import { Button } from '../ui/button';
import PropTypes from 'prop-types';

const MarketPositionSelector = ({ marketPosition, onPositionChange }) => {
  const positions = ['budget', 'mid-market', 'premium'];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Market Position</h2>
      <div className="flex gap-4">
        {positions.map((position) => (
          <Button
            key={position}
            onClick={() => onPositionChange(position)}
            variant={marketPosition === position ? 'default' : 'outline'}
          >
            {position.charAt(0).toUpperCase() + position.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
};

MarketPositionSelector.propTypes = {
  marketPosition: PropTypes.oneOf(['budget', 'mid-market', 'premium']).isRequired,
  onPositionChange: PropTypes.func.isRequired,
};

export default MarketPositionSelector;