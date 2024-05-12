import React from 'react';
import { format } from 'date-fns';
import Button from '../Button/Button';

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
    <div>
      <Button
        intent="secondary"
        disabled={isDisabled}
        onClick={() => handleTimeIntervalChange('prev')}
      >
        Previous
      </Button>

      <span>
        {formattedFrom} - {formattedTo}
      </span>

      <Button
        intent="secondary"
        disabled={isDisabled}
        onClick={() => handleTimeIntervalChange('next')}
      >
        Next{' '}
      </Button>
    </div>
  );
};

export default TimeIntervalSelector;
