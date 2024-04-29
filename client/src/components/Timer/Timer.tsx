import { useState } from 'react';
import { useEffect } from 'react';
import styles from './Timer.module.css';
import { useAddWorkSessionMutation } from '../../features/workSessions/workSessionsApiSlice';
import {
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
} from '../../utils/timeUtils';
import CircularProgressbar from '../CircularProgressbar/CircularProgressbar';

interface TimerProps {
  id: string;
  habitId: string;
  title: string;
  duration: Duration;
  deleteTimer: (timerId: string) => void;
}

export default function Timer({
  id,
  habitId,
  title,
  duration,
  deleteTimer,
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
    <div className={styles.container}>
      <h2>{title}</h2>

      <CircularProgressbar
        angle={(remainingTime / getMilliseconds(duration)) * 360}
        text={`${getHours(remainingTime)}h : ${getMinutes(remainingTime)}m : ${getSeconds(remainingTime)}s`}
      />
      <div className={styles.controls}>
        <button
          onClick={() => {
            setIsRunning((prev) => !prev);
          }}
          disabled={remainingTime === 0}
          type="button"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>

        <button disabled={isRunning} onClick={() => logTime()} type="button">
          Save time
        </button>
      </div>
    </div>
  );
}
