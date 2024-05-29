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
  Line,
} from 'recharts';
import {
  format,
  startOfDay,
  addDays,
  millisecondsToHours,
  intervalToDuration,
  millisecondsToMinutes,
  differenceInDays,
  hoursToMilliseconds,
} from 'date-fns';
import { selectHabitsByUser } from '../habitsApiSlice';
import { selectGoalByHabit } from '../../goals/goalsApiSlice';
import { useSelector } from 'react-redux';

type DayData = Record<string, number | string>;
type AccumulatedData = Record<string, DayData>;

interface DataChartProps {
  data: WorkSession[] | undefined;
  from: Date;
  to: Date;
  habitId: string;
}

const DataChart = ({ data, from, to, habitId }: DataChartProps) => {
  const habits = useSelector(selectHabitsByUser);
  const habitsSet = new Set<Habit>();
  const goal = useSelector(selectGoalByHabit(habitId));

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
          item.timeDuration;
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

  const formatTime = (value: number) => {
    const duration = intervalToDuration({ start: 0, end: value });

    if (duration.hours && duration.minutes) {
      return `${duration.hours}h ${duration.minutes}min`;
    }
    if (duration.hours) {
      return `${duration.hours}h`;
    }
    if (duration.minutes) {
      return `${duration.minutes}min`;
    }
    /*if (!duration.hours || duration.hours < 1) {
      return `${duration.minutes}min`;
    }*/
    return '';
  };

  const formatDate = (date) => {
    if (chartData.length <= 7) {
      const day = format(date, 'EEEE');
      return day;
    } else {
      return format(date, 'dd/MM');
    }
  };

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
          <Tooltip formatter={formatTime} />
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
            domain={['dataMin', `dataMax`]}
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
          {goal && goal.type === 'daily' && (
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
    );
};

export default DataChart;
