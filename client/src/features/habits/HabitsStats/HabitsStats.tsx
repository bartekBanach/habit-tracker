import WeekSelector from '../../../components/WeekSelector/WeekSelector';
import { useGetWorkSessionsByTimeQuery } from '../../workSessions/workSessionsApiSlice';
import { startOfWeek, endOfWeek, format } from 'date-fns';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectHabitsByUser } from '../habitsApiSlice';
import DataChart from '../DataChart/DataChart';

const HabitsStats = () => {
  const habits = useSelector(selectHabitsByUser);

  const [selectedHabit, setSelectedHabit] = useState('');

  const currentDate = new Date();
  const startOfCurrentWeek = startOfWeek(currentDate);
  const endOfCurrentWeek = endOfWeek(currentDate);

  const [fromDate, setFromDate] = useState<Date>(startOfCurrentWeek);
  const [toDate, setToDate] = useState<Date>(endOfCurrentWeek);

  const { data: workSessions, isLoading } = useGetWorkSessionsByTimeQuery({
    from: format(fromDate, 'MM/dd/yyyy'),
    to: format(toDate, 'MM/dd/yyyy'),
    habitId: selectedHabit,
  });

  console.log('workSessions', workSessions);

  const handleWeekChange = (from: Date, to: Date) => {
    setFromDate(from);
    setToDate(to);
  };

  if (habits)
    return (
      <>
        <h2>Habit stats</h2>

        {
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
        }

        <WeekSelector onWeekChange={handleWeekChange} isDisabled={isLoading} />
        <DataChart data={workSessions} startOfCurrentWeek={fromDate} />
      </>
    );
};

export default HabitsStats;
