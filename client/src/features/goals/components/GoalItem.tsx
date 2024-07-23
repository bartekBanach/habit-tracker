import React from 'react';
import IconButton from '../../../components/IconButton/IconButton';
import { IoMdRefresh } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import { startOfDay, endOfDay, differenceInMilliseconds } from 'date-fns';
import { millisecondsToDurationStr } from '../../../utils/timeUtils';
import { useEffect } from 'react';
import { useState } from 'react';

const getTimeLeft = (goal: Goal) => {
  const currentDate = new Date();
  let endDate = null;
  let startDate = null;

  if (goal.type === 'daily') {
    endDate = endOfDay(currentDate);
    startDate = startOfDay(currentDate);
  } else {
    endDate = goal.timeLimit.endDate as string;
    startDate = new Date(goal.timeLimit.startDate);
  }

  const millisecondsRemaining = differenceInMilliseconds(endDate, currentDate);
  const totalMilliseconds = differenceInMilliseconds(endDate, startDate);
  const percentageRemaining = (millisecondsRemaining / totalMilliseconds) * 100;

  return {
    milliseconds: millisecondsRemaining,
    percentage: percentageRemaining,
  };
};

interface GoalItemProps {
  goal: GoalWithHabit;
  onDelete: (goalId: string) => Promise<void>;
  onRestart: () => void;
}

const GoalItem: React.FC<GoalItemProps> = ({ goal, onDelete, onRestart }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(goal));

  const {
    _id: id,
    type,
    status,
    timeAmount,
    requiredTimeAmount,
    habitName,
    habitColor,
  } = goal;

  const timeLeftColor =
    timeLeft.percentage > 30 ? 'text-green-500' : 'text-red-500';
  const timeLeftStrFormat = 'd h m';
  const timeAmountStrFormat =
    timeAmount >= 60 * 60 * 1000
      ? timeAmount % (60 * 60 * 1000) === 0
        ? 'h'
        : 'h m'
      : 'm';
  const requriedTimeAmountStrFormat =
    requiredTimeAmount >= 60 * 60 * 1000
      ? requiredTimeAmount % (60 * 60 * 1000) === 0
        ? 'h'
        : 'h m'
      : 'm';

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(getTimeLeft(goal));
    }, 60000);

    return () => clearInterval(intervalId);
  }, [goal]);

  return (
    <div className="border border-gray-300 shadow-md rounded-md overflow-hidden">
      <div className="bg-gray-200 p-3 w-full flex items-center justify-between  ">
        <h3 className="text-center font-semibold text-l ">{habitName}</h3>
        <div className="flex gap-3">
          <IconButton onClick={onRestart}>
            <IoMdRefresh />
          </IconButton>
          <IconButton
            onClick={() => {
              void (async () => {
                await onDelete(id);
              })();
            }}
          >
            <MdDelete />
          </IconButton>
        </div>
      </div>

      <div className=" w-full p-5 flex flex-col items-center gap-3">
        <h4 className="text-center text-gray-500 flex items-center">
          <p>
            {type} | {status}
          </p>
        </h4>

        <p className={`text-center ${timeLeftColor}`}>
          Time left:{' '}
          {millisecondsToDurationStr(timeLeft.milliseconds, timeLeftStrFormat)}
        </p>

        <ProgressBar
          color={habitColor}
          value={timeAmount}
          maxValue={requiredTimeAmount}
          label={`${millisecondsToDurationStr(timeAmount, timeAmountStrFormat)}/${millisecondsToDurationStr(
            requiredTimeAmount,
            requriedTimeAmountStrFormat
          )}`}
        />
      </div>
    </div>
  );
};

export default GoalItem;
