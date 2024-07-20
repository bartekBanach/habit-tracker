import { useGetUserWorkSessionsQuery } from '../../workSessions/workSessionsApiSlice';
import HabitSelect from '../HabitSelect';
import { useState } from 'react';
import SectionContainer from '../../../components/SectionContainer/SectionContainer';

import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  format,
  subWeeks,
  addWeeks,
  subMonths,
  addMonths,
  subYears,
  addYears,
} from 'date-fns';
import DataChart from '../DataChart/DataChart';
import TimeIntervalSelector from '../../../components/TimeIntervalSelector/TimeIntervalSelector';

const HabitsStats = () => {
  const [selectedHabit, setSelectedHabit] = useState('');
  const [selectedTimeUnit, setSelectedTimeUnit] = useState('week');
  const { from: startOfTimePeriod, to: endOfTimePeriod } =
    getTimePeriod(selectedTimeUnit);
  const [fromDate, setFromDate] = useState<Date>(startOfTimePeriod);
  const [toDate, setToDate] = useState<Date>(endOfTimePeriod);

  const { data: workSessions, isLoading } = useGetUserWorkSessionsQuery({
    from: format(fromDate, 'MM/dd/yyyy'),
    to: format(toDate, 'MM/dd/yyyy'),
    habitId: selectedHabit,
  });

  const handleTimeIntervalChange = (direction: string) => {
    let newFromDate: Date;
    let newToDate: Date;
    if (selectedTimeUnit === 'week') {
      newFromDate =
        direction === 'prev' ? subWeeks(fromDate, 1) : addWeeks(fromDate, 1);
      newToDate = endOfWeek(newFromDate);
    } else if (selectedTimeUnit === 'month') {
      newFromDate =
        direction === 'prev' ? subMonths(fromDate, 1) : addMonths(fromDate, 1);
      newToDate = endOfMonth(newFromDate);
    } else {
      newFromDate =
        direction === 'prev' ? subYears(fromDate, 1) : addYears(fromDate, 1);
      newToDate = endOfYear(newFromDate);
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
    } else if (timeUnit === 'month') {
      return { from: startOfMonth(currentDate), to: endOfMonth(currentDate) };
    } else {
      return { from: startOfYear(currentDate), to: endOfYear(currentDate) };
    }
  }

  const headerContent = (
    <>
      <HabitSelect
        habitId={selectedHabit}
        onHabitChange={(value) => setSelectedHabit(value)}
        allHabitsOption={true}
      />
    </>
  );

  return (
    <SectionContainer headerText="Habit stats" headerChildren={headerContent}>
      <div className="flex flex-col gap-1 items-center p-5 ">
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
          onIntervalChange={handleTimeIntervalChange}
          from={fromDate}
          to={toDate}
          isDisabled={isLoading}
          formatting={selectedTimeUnit === 'year' ? 'MMMM yyyy' : 'MMM do'}
        />
        <DataChart
          data={workSessions}
          from={fromDate}
          to={toDate}
          habitId={selectedHabit}
          timeUnit={selectedTimeUnit}
        />
      </div>
    </SectionContainer>
  );
};

export default HabitsStats;
