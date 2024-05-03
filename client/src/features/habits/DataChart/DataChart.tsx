import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format, startOfDay, addDays } from 'date-fns';
import { millisecondsToMinutes } from 'date-fns';

interface DataPoint {
  name: string;
  minutes: number;
}

type AccumulatedData = Record<string, number>;

interface DataChartProps {
  data: WorkSession[] | undefined;
  startOfCurrentWeek: Date;
}

const DataChart = ({ data, startOfCurrentWeek }: DataChartProps) => {
  const accumulatedData = data
    ? data.reduce((acc: AccumulatedData, item: WorkSession) => {
        const day = format(startOfDay(item.finishedAt), 'MM/dd/yyyy');
        acc[day] = (acc[day] || 0) + item.timeDuration;
        return acc;
      }, {})
    : {};

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

  const chartData: DataPoint[] = Object.entries(
    fillMissingWeekdays(accumulatedData)
  ).map(([date, value]) => ({
    name: date,
    minutes: millisecondsToMinutes(value),
  }));
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
        <Bar dataKey="minutes" fill="orange" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DataChart;
