import { useState } from 'react';
import { useEffect } from 'react';
import styles from './Timer.module.css';

interface TimerProps {
  id: string;
  title: string;
  duration: Duration;
}

export default function Timer({ id, title, duration }: TimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(
    calculateRemainingTime(duration)
  );
  console.log(remainingTime);

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

  function getHours(milliseconds: number) {
    const diffrenceInSeconds = Math.floor(milliseconds / 1000);
    return Math.floor(diffrenceInSeconds / 60 / 60);
  }

  function getMinutes(milliseconds: number) {
    const diffrenceInSeconds = Math.floor(milliseconds / 1000);
    return Math.floor(diffrenceInSeconds / 60) % 60;
  }

  function getSeconds(milliseconds: number) {
    const diffrenceInSeconds = Math.floor(milliseconds / 1000);
    return diffrenceInSeconds % 60;
  }

  function calculateRemainingTime(duration: Duration) {
    const savedTime = localStorage.getItem(`timer_${id}`);
    if (savedTime !== null) {
      return parseInt(savedTime);
    }
    const { hours, minutes, seconds } = duration;
    return hours * 3600000 + minutes * 60000 + seconds * 1000;
  }

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <p>
        {getHours(remainingTime)}h : {getMinutes(remainingTime)}m :{' '}
        {getSeconds(remainingTime)}s
      </p>
      <div className={styles.controls}>
        <button
          disabled={!isRunning}
          onClick={() => setIsRunning(false)}
          type="button"
        >
          Pause
        </button>
        <button
          disabled={isRunning}
          onClick={() => setIsRunning(true)}
          type="button"
        >
          Start
        </button>
      </div>
    </div>
  );
}
