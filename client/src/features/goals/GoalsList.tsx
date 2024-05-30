import { useSelector } from 'react-redux';
import { selectHabitsByUser } from '../habits/habitsApiSlice';
import { useGetGoalsByUserQuery } from './goalsApiSlice';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { intervalToDuration } from 'date-fns';
import { IoMdRefresh } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { useDeleteGoalMutation } from './goalsApiSlice';
import IconButton from '../../components/IconButton/IconButton';

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
  const [deleteGoal] = useDeleteGoalMutation();

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

  const handleDelete = async (goalId: string) => {
    await deleteGoal(goalId);
  };
  const handleRestart = () => {};

  return (
    <div className="flex flex-col gap-5">
      {goalsWithHabits?.map((goal) => (
        <div
          className="flex flex-col gap-3 shadow-md p-4 rounded-md"
          key={goal._id}
        >
          <div>
            <div className="flex flex-row gap-2 justify-center items-center">
              <h3 className="text-center font-semibold text-l">
                {goal.habitName}
              </h3>
              <IconButton onClick={handleRestart}>
                <IoMdRefresh />
              </IconButton>
              <IconButton onClick={() => handleDelete(goal._id)}>
                <MdDelete />
              </IconButton>
            </div>

            <h4 className="text-center text-gray-500">
              {goal.type} | {goal.status}
            </h4>
          </div>

          <ProgressBar
            color={goal.habitColor}
            value={goal.timeAmount}
            maxValue={goal.requiredTimeAmount}
            label={`${parseDurationString(goal.timeAmount)}/${parseDurationString(goal.requiredTimeAmount)}`}
          />
        </div>
      ))}
    </div>
  );
};

export default GoalsList;
