import WeekSelector from '../../../components/WeekSelector/WeekSelector';
import { useGetWorkSessionsByTimeQuery } from '../../workSessions/workSessionsApiSlice';
import { startOfWeek, endOfWeek, format, startOfDay, addDays } from 'date-fns';
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
  Label,
} from 'recharts';
import { millisecondsToMinutes } from 'date-fns';
import { useState } from 'react';

interface DataPoint {
  name: string;
  minutes: number;
}

type AccumulatedData = Record<string, number>;

const HabitsStats = () => {
  const [selectedHabit, setSelectedHabit] = useState('');

  const currentDate = new Date();
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 0 });

  const { data: workSessions } = useGetWorkSessionsByTimeQuery({
    from: format(startOfCurrentWeek, 'MM/dd/yyyy'),
    to: format(endOfCurrentWeek, 'MM/dd/yyyy'),
    habitId: '661ae4d58d213ec62218c84a',
  });

  const handleWeekChange = (date: Date) => {};

  const fillMissingWeekdays = (data: AccumulatedData): AccumulatedData => {
    const currentWeekData: AccumulatedData = {};

    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(startOfCurrentWeek, i);
      const formattedDate = format(currentDate, 'MM/dd/yyyy');

      if (!data[formattedDate]) {
        currentWeekData[formattedDate] = 0;
      } else {
        currentWeekData[formattedDate] = data[formattedDate];
      }
    }
    return currentWeekData;
  };

  const accumulatedData = workSessions
    ? workSessions.reduce((acc: AccumulatedData, item: WorkSession) => {
        const day = format(startOfDay(item.finishedAt), 'MM/dd/yyyy');
        acc[day] = (acc[day] || 0) + item.timeDuration;
        return acc;
      }, {})
    : {};

  const chartData: DataPoint[] = Object.entries(
    fillMissingWeekdays(accumulatedData)
  ).map(([date, value]) => ({
    name: date,
    minutes: millisecondsToMinutes(value),
  }));

  return (
    <>
      <h2>Habit stats</h2>

      {/*<select
        name="category"
        onChange={(e) => setSelectedHabit(e.target.value)}
      >
        {habits.map((item: Habit) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>*/}

      <WeekSelector onWeekChange={handleWeekChange} />

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={700}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={40}
        >
          <Tooltip />
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 30, right: 30 }}
            tick={{ fill: 'white' }}
          />
          <YAxis tick={{ fill: 'white' }} />
          <Legend />
          <CartesianGrid />
          <Bar dataKey="minutes" fill="orange" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default HabitsStats;
