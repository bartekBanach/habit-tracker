import React from 'react';
import { format } from 'date-fns';
import Button from '../Button/Button';
import { isAfter, add } from 'date-fns';

interface WeekSelectorProps {
  onIntervalChange: (direction: string) => void;
  isDisabled: boolean;
  from: Date;
  to: Date;
  formatting: string;
}

const TimeIntervalSelector: React.FC<WeekSelectorProps> = ({
  onIntervalChange,
  isDisabled,
  from,
  to,
  formatting,
}) => {
  const formattedFrom = format(from, formatting);
  const formattedTo = format(to, formatting);

  const handleTimeIntervalChange = (direction: 'prev' | 'next'): void => {
    onIntervalChange(direction);
  };
  return (
    <div className="flex gap-2 items-center">
      <Button
        intent="primary"
        disabled={isDisabled}
        onClick={() => handleTimeIntervalChange('prev')}
      >
        Previous
      </Button>

      <span className="text-md font-semibold">
        {formattedFrom} - {formattedTo}
      </span>

      <Button
        intent="primary"
        disabled={isDisabled || isAfter(add(from, { weeks: 1 }), new Date())}
        onClick={() => handleTimeIntervalChange('next')}
      >
        Next{' '}
      </Button>
    </div>
  );
};

export default TimeIntervalSelector;
