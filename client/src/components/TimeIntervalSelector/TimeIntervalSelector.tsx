import React from 'react';
import { format } from 'date-fns';
import Button from '../Button/Button';
import { isAfter, add } from 'date-fns';

interface WeekSelectorProps {
  onWeekChange: (direction: string) => void;
  isDisabled: boolean;
  from: Date;
  to: Date;
}

const TimeIntervalSelector: React.FC<WeekSelectorProps> = ({
  onWeekChange,
  isDisabled,
  from,
  to,
}) => {
  const formattedFrom = format(from, 'MMM do');
  const formattedTo = format(to, 'MMM do');

  const handleTimeIntervalChange = (direction: 'prev' | 'next'): void => {
    onWeekChange(direction);
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
