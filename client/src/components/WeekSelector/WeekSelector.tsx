import React, { useState } from 'react';
import { startOfWeek, endOfWeek, format, subWeeks, addWeeks } from 'date-fns';

interface WeekSelectorProps {
  onWeekChange: (week: Date) => void;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({ onWeekChange }) => {
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());

  const handleWeekChange = (direction: 'prev' | 'next'): void => {
    const newDate =
      direction === 'prev'
        ? subWeeks(selectedWeek, 1)
        : addWeeks(selectedWeek, 1);
    setSelectedWeek(newDate);
    onWeekChange(newDate);
  };

  return (
    <div>
      <button onClick={() => handleWeekChange('prev')}>Previous Week</button>
      <span>
        {format(startOfWeek(selectedWeek), 'MMM do')} -{' '}
        {format(endOfWeek(selectedWeek), 'MMM do')}
      </span>
      <button onClick={() => handleWeekChange('next')}>Next Week</button>
    </div>
  );
};

export default WeekSelector;
