import { useGetWorkSessionsByTimeQuery } from '../../workSessions/workSessionsApiSlice';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectHabitsByUser } from '../habitsApiSlice';
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  format,
  subWeeks,
  addWeeks,
  subMonths,
  addMonths,
} from 'date-fns';
import DataChart from '../DataChart/DataChart';
import TimeIntervalSelector from '../../../components/TimeIntervalSelector/TimeIntervalSelector';

const HabitsStats = () => {
  const habits = useSelector(selectHabitsByUser);

  const [selectedHabit, setSelectedHabit] = useState('');

  const [selectedTimeUnit, setSelectedTimeUnit] = useState('week');
  const { from: startOfTimePeriod, to: endOfTimePeriod } =
    getTimePeriod(selectedTimeUnit);

  const [fromDate, setFromDate] = useState<Date>(startOfTimePeriod);
  const [toDate, setToDate] = useState<Date>(endOfTimePeriod);

  const { data: workSessions, isLoading } = useGetWorkSessionsByTimeQuery({
    from: format(fromDate, 'MM/dd/yyyy'),
    to: format(toDate, 'MM/dd/yyyy'),
    habitId: selectedHabit,
  });

  const handleTimeIntervalChange = (direction: string) => {
    console.log('direction', direction);
    console.log('from', fromDate, 'to', toDate);
    let newFromDate: Date;
    let newToDate: Date;
    if (selectedTimeUnit === 'week') {
      newFromDate =
        direction === 'prev' ? subWeeks(fromDate, 1) : addWeeks(fromDate, 1);
      newToDate = endOfWeek(newFromDate);
    } else {
      newFromDate =
        direction === 'prev' ? subMonths(fromDate, 1) : addMonths(fromDate, 1);
      newToDate = endOfMonth(newFromDate);
    }
    setFromDate(newFromDate);
    setToDate(newToDate);
  };

  const handleTimeUnitChange = (value: string) => {
    setSelectedTimeUnit(value);
    const { from, to } = getTimePeriod(value);
    setFromDate(from);
    setToDate(to);
  };

  function getTimePeriod(timeUnit: string) {
    const currentDate = new Date();
    if (timeUnit === 'week') {
      return { from: startOfWeek(currentDate), to: endOfWeek(currentDate) };
    } else {
      return { from: startOfMonth(currentDate), to: endOfMonth(currentDate) };
    }
  }

  if (habits)
    return (
      <>
        <h2>Habit stats</h2>

        <select
          name="category"
          onChange={(e) => setSelectedHabit(e.target.value)}
        >
          <option key={0} value="">
            Overall
          </option>
          {habits.map((item: Habit) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>

        <div>
          <input
            type="radio"
            id="week"
            value="week"
            checked={selectedTimeUnit === 'week'}
            onChange={(e) => handleTimeUnitChange(e.target.value)}
          />
          <label htmlFor="week">Week</label>

          <input
            type="radio"
            id="month"
            value="month"
            checked={selectedTimeUnit === 'month'}
            onChange={(e) => handleTimeUnitChange(e.target.value)}
          />
          <label htmlFor="month">Month</label>

          <input
            type="radio"
            id="year"
            value="year"
            checked={selectedTimeUnit === 'year'}
            onChange={(e) => handleTimeUnitChange(e.target.value)}
          />
          <label htmlFor="year">Year</label>
        </div>

        <TimeIntervalSelector
          onWeekChange={handleTimeIntervalChange}
          from={fromDate}
          to={toDate}
          isDisabled={isLoading}
        />
        <DataChart data={workSessions} from={fromDate} to={toDate} />
      </>
    );
};

export default HabitsStats;
