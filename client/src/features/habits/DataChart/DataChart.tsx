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

/*interface DataPoint {
  name: string;
  minutes: number;
}*/

interface DayData {
  [key: string]: number | string;
}

interface AccumulatedData {
  [key: string]: DayData;
}

interface DataChartProps {
  data: WorkSession[] | undefined;
  startOfCurrentWeek: Date;
}

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256); // Random value for red (0-255)
  const g = Math.floor(Math.random() * 256); // Random value for green (0-255)
  const b = Math.floor(Math.random() * 256); // Random value for blue (0-255)
  return `rgb(${r},${g},${b})`; // Return RGB color string
};

const DataChart = ({ data, startOfCurrentWeek }: DataChartProps) => {
  const habitsSet = new Set();
  const accumulatedData = data
    ? data.reduce((acc: AccumulatedData, item: WorkSession) => {
        //add all encountered habits to set
        if (!habitsSet.has(item.habit)) habitsSet.add(item.habit);

        const day = format(startOfDay(item.finishedAt), 'MM/dd/yyyy');
        if (!acc[day]) {
          acc[day] = { name: day };
        }
        acc[day][item.habit] =
          ((acc[day][item.habit] || 0) as number) + item.timeDuration;
        return acc;
      }, {})
    : {};

  const fillMissingWeekdays = (data: AccumulatedData): AccumulatedData => {
    const currentWeekData: AccumulatedData = {};

    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(startOfCurrentWeek, i);
      const formattedDate = format(currentDate, 'MM/dd/yyyy');

      if (!data[formattedDate]) {
        currentWeekData[formattedDate] = { name: formattedDate };
        /*habitsSet.forEach((habit) => {
          currentWeekData[formattedDate][habit] = 0;
        });*/
        //currentWeekData[formattedDate].test = 0;
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

          {chartKeys.map((key) => (
            <Bar key={key} dataKey={key} stackId="a" fill={getRandomColor()} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
};

export default DataChart;
