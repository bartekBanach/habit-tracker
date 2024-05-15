import { useState } from 'react';
import { useEffect } from 'react';
import { useAddWorkSessionMutation } from '../../features/workSessions/workSessionsApiSlice';
import {
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
} from '../../utils/timeUtils';
import CircularProgressbar from '../CircularProgressbar/CircularProgressbar';
import Button from '../Button/Button';

interface TimerProps {
  id: string;
  habitId: string;
  title: string;
  duration: Duration;
  deleteTimer: (timerId: string) => void;
  color: string;
}

export default function Timer({
  id,
  habitId,
  title,
  duration,
  deleteTimer,
  color,
}: TimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(
    calculateRemainingTime(duration)
  );
  const [addWorkSession] = useAddWorkSessionMutation();

  const logTime = async () => {
    setIsRunning(false);
    await addWorkSession({
      habit: habitId,
      timeDuration: getMilliseconds(duration) - remainingTime,
      finishedAt: new Date(),
    });
    localStorage.removeItem(`timer_${id}`);
    deleteTimer(id);
  };

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            setIsRunning(false);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [isRunning]);

  useEffect(() => {
    localStorage.setItem(`timer_${id}`, remainingTime.toString());
  }, [remainingTime, id]);

  function calculateRemainingTime(duration: Duration) {
    const savedTime = localStorage.getItem(`timer_${id}`);
    if (savedTime !== null) {
      return parseInt(savedTime);
    }

    return getMilliseconds(duration);
  }

  return (
    <div className="flex flex-col justify-center items-center border shadow-md py-6 px-7">
      <h2 className="text-xl font-semibold">{title}</h2>

      <CircularProgressbar
        angle={(remainingTime / getMilliseconds(duration)) * 360}
        text={`${getHours(remainingTime)}h : ${getMinutes(remainingTime)}m : ${getSeconds(remainingTime)}s`}
        color={color}
      />
      <div className="flex flex-row justify-center items-center space-x-5">
        <Button
          onClick={() => {
            setIsRunning((prev) => !prev);
          }}
          disabled={remainingTime === 0}
          type="button"
        >
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button disabled={isRunning} onClick={() => logTime()} type="button">
          Save time
        </Button>
      </div>
    </div>
  );
}
