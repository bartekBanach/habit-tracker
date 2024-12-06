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
  differenceInDays,
  differenceInMonths,
  startOfMonth,
} from 'date-fns';
import { selectGoalByHabit } from '../../goals/goalsApiSlice';
import { useSelector } from 'react-redux';
import {
  formatTime,
  formatDate,
  formatMilliseconds,
  millisecondsToDurationStr,
  getNextTimeUnitIncrement,
} from '../../../utils/timeUtils';
import { useGetUserHabitsQuery } from '../habitsApiSlice';

type TimeIntervalData = Record<string, number | string>;
type AccumulatedData = Record<string, TimeIntervalData>;

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

  const preprocessedWorkSessions: WorkSession[] = (data ?? []).flatMap(
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

  const summarizedTimesByDate = preprocessedWorkSessions
    ? preprocessedWorkSessions.reduce(
        (acc: AccumulatedData, item: WorkSession) => {
          const intervalStartDate =
            timeUnit === 'year'
              ? format(startOfMonth(item.finishedAt), 'MM/dd/yyyy')
              : format(startOfDay(item.finishedAt), 'MM/dd/yyyy');

          if (!acc[intervalStartDate]) {
            acc[intervalStartDate] = { name: intervalStartDate };
          }
          acc[intervalStartDate][item.habit] =
            ((acc[intervalStartDate][item.habit] || 0) as number) +
            item.timeDuration;
          return acc;
        },
        {}
      )
    : {};

  const fillMissingDates = (
    data: AccumulatedData,
    unit: 'days' | 'months'
  ): AccumulatedData => {
    if (Object.keys(data).length === 0) noData = true;

    const result: AccumulatedData = {};
    const differenceFn =
      unit === 'days' ? differenceInDays : differenceInMonths;
    const addFn = unit === 'days' ? addDays : addMonths;

    const datesAmount = Math.abs(differenceFn(from, to));

    for (let i = 0; i <= datesAmount; i++) {
      const currentDate = addFn(from, i);
      const formattedDate = format(currentDate, 'MM/dd/yyyy');

      if (!data[formattedDate]) {
        result[formattedDate] = { name: formattedDate };
      } else {
        result[formattedDate] = data[formattedDate];
      }
    }

    return result;
  };

  const chartData: TimeIntervalData[] = Object.values(
    timeUnit === 'year'
      ? fillMissingDates(summarizedTimesByDate, 'months')
      : fillMissingDates(summarizedTimesByDate, 'days')
  );

  const chartKeys = Array.from(habitsSet);

  if (chartData)
    return (
      <div className="relative w-full min-w-full h-80">
        {noData && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 z-10">
            <p className="text-xl font-semibold text-gray-400">
              No data recorded for this period.
            </p>
          </div>
        )}
        <ResponsiveContainer minWidth="100%" width="100%" height="100%">
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
            <Tooltip
              labelFormatter={(label) => formatDate(label as string, timeUnit)}
              formatter={(value) =>
                millisecondsToDurationStr(value as number, 'h m')
              }
            />
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 30, right: 30 }}
              tick={{ fill: '#6b7280' }}
              tickFormatter={(label) => formatDate(label as string, timeUnit)}
            />
            <YAxis
              tick={{ fill: '#6b7280' }}
              tickFormatter={(value) => formatMilliseconds(value as number)}
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
