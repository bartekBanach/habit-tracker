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
  addMonths,
  millisecondsToHours,
  differenceInDays,
  differenceInMonths,
  hoursToMilliseconds,
  startOfMonth,
} from 'date-fns';
import { selectHabitsByUser } from '../habitsApiSlice';
import { selectGoalByHabit } from '../../goals/goalsApiSlice';
import { useSelector } from 'react-redux';
import { formatTime } from '../../../utils/timeUtils';
import { useGetUserHabitsQuery } from '../habitsApiSlice';

type DayData = Record<string, number | string>;
type AccumulatedData = Record<string, DayData>;

interface DataChartProps {
  data: WorkSession[] | undefined;
  from: Date;
  to: Date;
  habitId: string;
  timeUnit: string;
}

const DataChart = ({ data, from, to, habitId, timeUnit }: DataChartProps) => {
  const { data: habits } = useGetUserHabitsQuery();
  const habitsSet = new Set<Habit>();
  const goal = useSelector(selectGoalByHabit(habitId));
  let noData = false;

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
        const day =
          timeUnit === 'year'
            ? format(startOfMonth(item.finishedAt), 'MM/dd/yyyy')
            : format(startOfDay(item.finishedAt), 'MM/dd/yyyy');
        if (!acc[day]) {
          acc[day] = { name: day };
        }
        acc[day][item.habit] =
          ((acc[day][item.habit] || 0) as number) + item.timeDuration;
        return acc;
      }, {})
    : {};

  const fillMissingDays = (data: AccumulatedData): AccumulatedData => {
    if (Object.keys(data).length === 0) noData = true;
    const currentPeriodData: AccumulatedData = {};
    const daysAmount = Math.abs(differenceInDays(from, to));

    for (let i = 0; i <= daysAmount; i++) {
      const currentDate = addDays(from, i);
      const formattedDate = format(currentDate, 'MM/dd/yyyy');

      if (!data[formattedDate]) {
        currentPeriodData[formattedDate] = { name: formattedDate };
      } else {
        currentPeriodData[formattedDate] = data[formattedDate];
      }
    }
    return currentPeriodData;
  };

  const fillMissingMonths = (data: AccumulatedData): AccumulatedData => {
    if (Object.keys(data).length === 0) noData = true;
    const currentPeriodData: AccumulatedData = {};
    const monthsAmount = Math.abs(differenceInMonths(from, to));

    for (let i = 0; i <= monthsAmount; i++) {
      const currentDate = addMonths(from, i);
      const formattedDate = format(currentDate, 'MM/dd/yyyy');

      if (!data[formattedDate]) {
        currentPeriodData[formattedDate] = { name: formattedDate };
      } else {
        currentPeriodData[formattedDate] = data[formattedDate];
      }
    }
    return currentPeriodData;
  };

  const chartData: DayData[] = Object.values(
    timeUnit === 'year'
      ? fillMissingMonths(accumulatedData)
      : fillMissingDays(accumulatedData)
  );

  const chartKeys = Array.from(habitsSet);

  const formatDate = (date: string) => {
    if (timeUnit === 'week') {
      const day = format(date, 'EEEE');
      return day;
    } else if (timeUnit === 'month') {
      return format(date, 'dd/MM');
    } else {
      return format(date, 'MMMM');
    }
  };

  const getNextTimeUnitIncrement = (maxValue: number) => {
    const maxValueInHours = millisecondsToHours(maxValue);
    const hoursToAdd = Math.max(Math.floor(maxValueInHours / 5), 1);
    return hoursToMilliseconds(maxValueInHours + hoursToAdd);
  };

  if (chartData)
    return (
      <div className="relative w-full h-80">
        {noData && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 z-10">
            <p className="text-xl font-semibold text-gray-400">
              No data recorded for this period.
            </p>
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
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
            <Tooltip labelFormatter={formatDate} formatter={formatTime} />
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 30, right: 30 }}
              tick={{ fill: '#6b7280' }}
              tickFormatter={formatDate}
            />
            <YAxis
              tick={{ fill: '#6b7280' }}
              tickFormatter={formatTime}
              type="number"
              scale="time"
              domain={[
                'dataMin',
                (dataMax: number) => getNextTimeUnitIncrement(dataMax),
              ]}
              allowDataOverflow
            />
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
            {goal && goal.type === 'daily' && timeUnit !== 'year' && (
              <ReferenceLine
                y={goal.requiredTimeAmount}
                stroke="#3b82f6"
                strokeWidth={3}
                strokeDasharray="10 6"
                label={{
                  value: `Daily Goal (${formatTime(goal.requiredTimeAmount)})`,
                  position: 'top',
                  fill: '#3b82f6',
                  fontSize: 14,
                  fontWeight: '600',
                  dy: -10,
                }}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
};

export default DataChart;
