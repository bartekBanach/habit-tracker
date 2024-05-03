import React, { useState } from 'react';
import { startOfWeek, endOfWeek, format, subWeeks, addWeeks } from 'date-fns';

interface WeekSelectorProps {
  onWeekChange: (from: Date, to: Date) => void;
  isDisabled: boolean;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({
  onWeekChange,
  isDisabled,
}) => {
  const [from, setFrom] = useState<Date>(startOfWeek(new Date()));
  const [to, setTo] = useState(endOfWeek(from));

  const handleWeekChange = (direction: 'prev' | 'next'): void => {
    const newFromDate =
      direction === 'prev' ? subWeeks(from, 1) : addWeeks(from, 1);

    const newToDate = endOfWeek(newFromDate);
    setFrom(newFromDate);
    setTo(newToDate);

    onWeekChange(newFromDate, newToDate);
  };

  return (
    <div>
      <button disabled={isDisabled} onClick={() => handleWeekChange('prev')}>
        Previous Week
      </button>
      <span>
        {format(startOfWeek(from), 'MMM do')} -{' '}
        {format(endOfWeek(to), 'MMM do')}
      </span>
      <button disabled={isDisabled} onClick={() => handleWeekChange('next')}>
        Next Week
      </button>
    </div>
  );
};

export default WeekSelector;
