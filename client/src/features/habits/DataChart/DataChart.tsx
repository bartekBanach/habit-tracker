import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import {
  format,
  startOfDay,
  addDays,
  millisecondsToHours,
  millisecondsToMinutes,
  differenceInDays,
} from 'date-fns';
import { selectHabitsByUser } from '../habitsApiSlice';
import { useSelector } from 'react-redux';

type DayData = Record<string, number | string>;
type AccumulatedData = Record<string, DayData>;

interface DataChartProps {
  data: WorkSession[] | undefined;
  from: Date;
  to: Date;
}

const DataChart = ({ data, from, to }: DataChartProps) => {
  const habits = useSelector(selectHabitsByUser);
  const habitsSet = new Set<Habit>();

  const processedData: WorkSession[] = (data ?? []).flatMap(
    (workSession: WorkSession) => {
      const habit = habits?.find((h: Habit) => workSession.habit === h._id);

      if (habit) {
        if (!habitsSet.has(habit)) habitsSet.add(habit);
        return [
          {
            ...workSession,
            habit: habit.name,
          },
        ];
      } else {
        return [];
      }
    }
  );

  const accumulatedData = processedData
    ? processedData.reduce((acc: AccumulatedData, item: WorkSession) => {
        const day = format(startOfDay(item.finishedAt), 'MM/dd/yyyy');
        if (!acc[day]) {
          acc[day] = { name: day };
        }
        acc[day][item.habit] =
          ((acc[day][item.habit] || 0) as number) +
          //millisecondsToHours(item.timeDuration);
          millisecondsToMinutes(item.timeDuration);
        return acc;
      }, {})
    : {};

  const fillMissingWeekdays = (data: AccumulatedData): AccumulatedData => {
    const currentWeekData: AccumulatedData = {};
    const daysAmount = Math.abs(differenceInDays(from, to));

    for (let i = 0; i < daysAmount; i++) {
      const currentDate = addDays(from, i);
      const formattedDate = format(currentDate, 'MM/dd/yyyy');

      if (!data[formattedDate]) {
        currentWeekData[formattedDate] = { name: formattedDate };
      } else {
        currentWeekData[formattedDate] = data[formattedDate];
      }
    }
    return currentWeekData;
  };

  const chartData: DayData[] = Object.values(
    fillMissingWeekdays(accumulatedData)
  );

  const chartKeys = Array.from(habitsSet);

  if (chartData)
    return (
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

          {chartKeys.map((item) => (
            <Bar
              key={item._id}
              dataKey={item.name}
              stackId="a"
              fill={item.color}
            />
          ))}
          <ReferenceLine
            y={1000000}
            stroke="red"
            strokeDasharray="3 3"
            label="Desired Time"
          />
        </BarChart>
      </ResponsiveContainer>
    );
};

export default DataChart;
