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
  timeUnit: string;
}

const TimeIntervalSelector: React.FC<WeekSelectorProps> = ({
  onIntervalChange,
  isDisabled,
  from,
  to,
  formatting,
  timeUnit,
}) => {
  const formattedFrom = format(from, formatting);
  const formattedTo = format(to, formatting);

  const handleTimeIntervalChange = (direction: 'prev' | 'next'): void => {
    onIntervalChange(direction);
  };

  const isCurrentTimeInterval = () => {
    let result = false;
    if (timeUnit === 'week') {
      result = isAfter(add(from, { weeks: 1 }), new Date());
    } else if (timeUnit === 'month') {
      result = isAfter(add(from, { months: 1 }), new Date());
    } else {
      result = isAfter(add(from, { years: 1 }), new Date());
    }
    return result;
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex items-center gap-2">
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
          disabled={isDisabled || isCurrentTimeInterval()}
          onClick={() => handleTimeIntervalChange('next')}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TimeIntervalSelector;
