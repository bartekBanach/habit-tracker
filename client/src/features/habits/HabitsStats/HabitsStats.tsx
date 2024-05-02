import WeekSelector from '../../../components/WeekSelector/WeekSelector';
import { useGetWorkSessionsByTimeQuery } from '../../workSessions/workSessionsApiSlice';
import { startOfWeek, endOfWeek, format, startOfDay } from 'date-fns';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { millisecondsToMinutes } from 'date-fns';
import { getDate } from 'date-fns';

interface ChartDataItem {
  name: string;
  hours: number;
}

interface DataPoint {
  name: string;
  minutes: number;
}

type AccumulatedData = Record<string, number>;

const HabitsStats = () => {
  const currentDate = new Date();
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 0 });

  const { data: workSessions } = useGetWorkSessionsByTimeQuery({
    from: format(startOfCurrentWeek, 'MM/dd/yyyy'),
    to: format(endOfCurrentWeek, 'MM/dd/yyyy'),
    habitId: '661ae4d58d213ec62218c84a',
  });

  const handleWeekChange = (date: Date) => {};

  const accumulatedData = workSessions
    ? workSessions.reduce((acc: AccumulatedData, item: WorkSession) => {
        const day = format(startOfDay(item.finishedAt), 'MM/dd/yyyy');
        acc[day] = (acc[day] || 0) + item.timeDuration;
        return acc;
      }, {})
    : {};

  const chartData: DataPoint[] = Object.entries(accumulatedData).map(
    ([date, value]) => ({
      name: date,
      minutes: millisecondsToMinutes(value),
    })
  );

  console.log('WORK SESSIONS', workSessions);
  console.log('CHART DATA', chartData);

  return (
    <>
      <h2>Habit stats</h2>
      <WeekSelector onWeekChange={handleWeekChange} />
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <CartesianGrid stroke="#ccc" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="minutes" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default HabitsStats;
