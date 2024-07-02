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
import { useState } from 'react';

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
  let noData = false;

  const processedData: WorkSession[] = (data || []).flatMap(
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
    if (Object.keys(data).length === 0) noData = true;
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
              domain={[
                'dataMin',
                (dataMax) => getNextTimeUnitIncrement(dataMax),
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
      </div>
    );
};

export default DataChart;
