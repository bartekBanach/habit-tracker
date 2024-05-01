import WeekSelector from '../../../components/WeekSelector/WeekSelector';
import { useGetWorkSessionsByTimeQuery } from '../../workSessions/workSessionsApiSlice';
import { startOfWeek, endOfWeek, format } from 'date-fns';

const HabitsStats = () => {
  const currentDate = new Date();
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 0 });

  const { data: workSessions } = useGetWorkSessionsByTimeQuery({
    from: format(startOfCurrentWeek, 'MM/dd/yyyy'),
    to: format(endOfCurrentWeek, 'MM/dd/yyyy'),
    habitId: '661ae4d58d213ec62218c84a',
  });

  const handleWeekChange = (date: Date) => {
    console.log('date', date);
  };
  return (
    <>
      <h2>Habit stats</h2>
      <WeekSelector onWeekChange={handleWeekChange} />
    </>
  );
};

export default HabitsStats;
