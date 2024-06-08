import React from 'react';
import IconButton from '../../components/IconButton/IconButton';
import { IoMdRefresh } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
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

const parseDurationString = (timeAmount: number): string => {
  const { minutes, hours } = convertMillisecondsToDuration(timeAmount);
  const hoursStr = hours ? `${hours.toString()}h` : '0h';
  const minutesStr = minutes ? `${minutes?.toString()}m` : '';

  const durationStr = `${hoursStr}${minutesStr}`;
  return durationStr;
};

interface GoalItemProps {
  goal: GoalWithHabit;
  onDelete: (goalId: string) => Promise<void>;
  onRestart: () => void;
}

interface GoalWithHabit extends Goal {
  habitName: string;
  habitColor: string;
}

const GoalItem: React.FC<GoalItemProps> = ({ goal, onDelete, onRestart }) => {
  return (
    <div className="flex flex-col gap-3 shadow-md p-4 rounded-md">
      <div>
        <div className="flex flex-row gap-2 justify-center items-center">
          <h3 className="text-center font-semibold text-l">{goal.habitName}</h3>
          <IconButton onClick={onRestart}>
            <IoMdRefresh />
          </IconButton>
          <IconButton onClick={() => onDelete(goal._id)}>
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
        label={`${parseDurationString(goal.timeAmount)}/${parseDurationString(
          goal.requiredTimeAmount
        )}`}
      />
    </div>
  );
};

export default GoalItem;
