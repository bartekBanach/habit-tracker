import { useSelector } from 'react-redux';
import { selectHabitsByUser } from '../habits/habitsApiSlice';
import { useGetGoalsByUserQuery } from './goalsApiSlice';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { intervalToDuration } from 'date-fns';

const convertMillisecondsToDuration = (milliseconds: number) => {
  const duration = intervalToDuration({ start: 0, end: milliseconds });
  return {
    hours: duration.hours,
    minutes: duration.minutes,
    seconds: duration.seconds,
  };
};

const GoalsList = () => {
  const habits = useSelector(selectHabitsByUser);
  const { data: goals } = useGetGoalsByUserQuery();

  const parseDurationString = (timeAmount: number): string => {
    const { minutes, hours } = convertMillisecondsToDuration(timeAmount);
    const hoursStr = hours ? `${hours.toString()}h` : '0h';
    const minutesStr = minutes ? `${minutes?.toString()}m` : '';

    const durationStr = `${hoursStr}${minutesStr}`;
    return durationStr;
  };

  const habitDictionary = habits?.reduce(
    (acc: Record<string, Habit>, habit) => {
      acc[habit._id] = habit;
      return acc;
    },
    {}
  );

  const goalsWithHabits = goals?.map((goal) => {
    const { name: habitName, color: habitColor } = habitDictionary[goal.habit];
    return { ...goal, habitName, habitColor };
  });

  return (
    <>
      <h4>Goals list</h4>
      {goalsWithHabits?.map((goal) => (
        <div className="font-semibold" key={goal._id}>
          {goal.habitName}:{goal.status}
          <ProgressBar
            color={goal.habitColor}
            value={goal.timeAmount}
            maxValue={goal.requiredTimeAmount}
            label={`${parseDurationString(goal.timeAmount)}/${parseDurationString(goal.requiredTimeAmount)}`}
          />
        </div>
      ))}
    </>
  );
};

export default GoalsList;
