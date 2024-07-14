import { useState } from 'react';
import { useEffect } from 'react';
import { useAddWorkSessionMutation } from '../../workSessions/workSessionsApiSlice';
import IconButton from '../../../components/IconButton/IconButton';

import { MdOutlineRestartAlt } from 'react-icons/md';

import {
  getHours,
  getMinutes,
  getSeconds,
  durationToMilliseconds,
} from '../../../utils/timeUtils';

import CircularProgressbar from '../../../components/CircularProgressbar/CircularProgressbar';
import Button from '../../../components/Button/Button';
import { useUpdateTimerMutation } from '../timersApiSlice';
import { selectHabitById } from '../../habits/habitsApiSlice';
import { useDeleteTimerMutation } from '../timersApiSlice';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrentUser } from '../../auth/authSlice';

interface TimerProps {
  timer: Timer;
}

export default function Timer({ timer }: TimerProps) {
  const {
    _id: id,
    habit: habitId,
    duration,
    remainingTime: remainingTimeDb,
  } = timer;

  const habit = useAppSelector(selectHabitById(habitId));
  const { _id: userId } = useAppSelector(selectCurrentUser);

  const habitColor = habit?.color ?? '';
  const habitName = habit?.name ?? '';

  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());
  const [addWorkSession] = useAddWorkSessionMutation();
  const [updateTimer] = useUpdateTimerMutation();
  const [deleteTimer] = useDeleteTimerMutation();

  const logTime = async () => {
    setIsRunning(false);
    await addWorkSession({
      habit: habitId,
      user: userId,
      timeDuration: durationToMilliseconds(duration) - remainingTime,
      finishedAt: new Date(),
    });
    await handleRestart();
    /*await deleteTimer(id);
    localStorage.removeItem(`timer_${id}`);*/
  };

  const updateRemainingTime = async (time: number) => {
    localStorage.setItem(`timer_${id}`, time.toString());
    await updateTimer({
      id,
      updates: { ...timer, remainingTime: time },
    });
  };

  function getRemainingTime() {
    const savedTime = localStorage.getItem(`timer_${id}`);

    if (savedTime !== null && parseInt(savedTime) < remainingTimeDb) {
      return parseInt(savedTime);
    }
    return remainingTimeDb;
  }

  const handlePlayPause = async () => {
    setIsRunning((prev) => !prev);
    await updateRemainingTime(remainingTime);
  };

  const handleRestart = async () => {
    if (isRunning) return;
    const restartedTime = durationToMilliseconds(duration);
    setRemainingTime(restartedTime);
    await updateRemainingTime(restartedTime);
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
    if (isRunning) {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        localStorage.setItem(`timer_${id}`, remainingTime.toString());
        event.preventDefault();
        event.returnValue = '';
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        localStorage.setItem(`timer_${id}`, remainingTime.toString());
      };
    }
  }, [id, remainingTime, isRunning]);

  if (!habit) return <>No matching habit!!!</>;
  if (habit)
    return (
      <div className="flex flex-col justify-center items-center border shadow-md py-6 px-7">
        <h2 className="text-xl font-semibold">{habitName}</h2>

        <CircularProgressbar
          angle={(remainingTime / durationToMilliseconds(duration)) * 360}
          text={`${getHours(remainingTime)}h : ${getMinutes(remainingTime)}m : ${getSeconds(remainingTime)}s`}
          color={habitColor}
        />
        <div className="flex flex-row justify-center items-center space-x-5">
          <Button
            onClick={() => handlePlayPause()}
            disabled={remainingTime === 0}
            type="button"
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button disabled={isRunning} onClick={() => logTime()} type="button">
            Save time
          </Button>
          <IconButton disabled={isRunning} onClick={handleRestart}>
            <MdOutlineRestartAlt />
          </IconButton>
        </div>
      </div>
    );
}
