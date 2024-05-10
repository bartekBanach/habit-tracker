import React from 'react';
import { format } from 'date-fns';

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
      <button
        disabled={isDisabled}
        onClick={() => handleTimeIntervalChange('prev')}
      >
        Previous Week
      </button>
      <span>
        {formattedFrom} - {formattedTo}
      </span>
      <button
        disabled={isDisabled}
        onClick={() => handleTimeIntervalChange('next')}
      >
        Next Week
      </button>
    </div>
  );
};

export default TimeIntervalSelector;
