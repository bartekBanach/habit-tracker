import { useState } from 'react';
import { useEffect } from 'react';
import { useAddWorkSessionMutation } from '../../workSessions/workSessionsApiSlice';
import IconButton from '../../../components/IconButton/IconButton';
import { IoClose } from 'react-icons/io5';
import { GrRefresh } from 'react-icons/gr';
import { FaPlay, FaPause } from 'react-icons/fa';

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
import useHandleErrors from '../../../hooks/useHandleErrors';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../notifications/notifications.slice';

interface TimerProps {
  timer: Timer;
  isEditing: boolean;
}

export default function Timer({ timer, isEditing }: TimerProps) {
  const {
    _id: id,
    habit: habitId,
    duration,
    remainingTime: remainingTimeDb,
  } = timer;

  const habit = useAppSelector(selectHabitById(habitId));
  const { _id: userId } = useAppSelector(selectCurrentUser) ?? {};

  const habitColor = habit?.color ?? '';
  const habitName = habit?.name ?? '';

  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());
  const [addWorkSession, { isLoading: isSaveLoading }] =
    useAddWorkSessionMutation();
  const [updateTimer] = useUpdateTimerMutation();
  const [deleteTimer] = useDeleteTimerMutation();
  const handleErrors = useHandleErrors();
  const dispatch = useDispatch();

  const logTime = async () => {
    setIsRunning(false);
    if (!userId) return;

    try {
      if (!userId) {
        throw new Error('User unauthenthicated.');
      }
      await addWorkSession({
        habit: habitId,
        user: userId,
        timeDuration: durationToMilliseconds(duration) - remainingTime,
      }).unwrap();
      await handleRestart();

      dispatch(
        addNotification({
          type: 'success',
          message: 'Work session logged in database.',
        })
      );
    } catch (error: unknown) {
      console.log('COUGHT ERROR!!!', error);
      handleErrors(error);
    }
  };

  const updateRemainingTime = async (time: number) => {
    await updateTimer({
      id,
      updates: { ...timer, remainingTime: time },
    }).unwrap();
    //localStorage.setItem(`timer_${id}`, time.toString());
    //setRemainingTime(time);
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

  const handleDelete = async (id: string) => {
    await deleteTimer(id);
    localStorage.removeItem(`timer_${id}`);
  };

  const handleRestart = async () => {
    if (isRunning) return;
    const restartedTime = durationToMilliseconds(duration);
    localStorage.setItem(`timer_${id}`, restartedTime.toString());
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

  if (!habit || !userId) return;
  return (
    <div
      className={`flex flex-col justify-center items-center border shadow-md py-6 px-7 `}
    >
      <h2
        className={` bg-white shadow-md rounded-md p-1 relative w-full flex justify-center items-center jusitfy-center gap-3 text-xl font-semibold`}
      >
        {habitName}
        {isEditing && (
          <IconButton className="absolute top-0 right-0">
            <IoClose
              onClick={() => {
                void (async () => {
                  await handleDelete(id);
                })();
              }}
            />
          </IconButton>
        )}
      </h2>

      <div
        className={`${isEditing && 'opacity-50'} w-full flex flex-col justify-center items-center`}
      >
        <CircularProgressbar
          angle={(remainingTime / durationToMilliseconds(duration)) * 360}
          text={`${getHours(remainingTime)}h : ${getMinutes(remainingTime)}m : ${getSeconds(remainingTime)}s`}
          color={habitColor}
        />
        <div className="flex flex-row justify-between items-center gap-8">
          <div className="flex gap-4">
            <IconButton
              size="large"
              color="primary"
              onClick={() => {
                void (async () => {
                  await handlePlayPause();
                })();
              }}
              disabled={remainingTime === 0 || isEditing}
              type="button"
            >
              {isRunning ? <FaPause /> : <FaPlay />}
            </IconButton>
            <IconButton
              size="large"
              disabled={isRunning || isEditing}
              onClick={() => {
                void (async () => {
                  await handleRestart();
                })();
              }}
            >
              <GrRefresh />
            </IconButton>
          </div>

          <Button
            disabled={isRunning || isEditing}
            onClick={() => {
              void (async () => {
                await logTime();
              })();
            }}
            type="button"
            className="bg-green-500"
            loading={isSaveLoading}
            spinnerInside={false}
          >
            Save time
          </Button>
        </div>
      </div>
    </div>
  );
}
