import { useEffect } from 'react';
import { useState } from 'react';
import { TimerForm } from './TimerForm';
import Timer from './Timer';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useGetHabitsByUserQuery } from '../../features/habits/habitsApiSlice';
import styles from './TimersList.module.css';

const TimersList = () => {
  const [timers, setTimers] = useState<Timer[]>([]);

  const user = useSelector(selectCurrentUser);
  const {
    data: habits,
    isLoading,
    isError,
  } = useGetHabitsByUserQuery(user?._id);

  useEffect(() => {
    setTimers(JSON.parse(localStorage.getItem('timers') ?? '[]') as Timer[]);
  }, []);

  const deleteTimer = (timerId: string) => {
    const newTimers = timers.filter((timer) => timer.id !== timerId);
    setTimers(newTimers);
    localStorage.setItem('timers', JSON.stringify(newTimers));
  };
  return (
    <div>
      <TimerForm habits={habits} timers={timers} setTimers={setTimers} />
      <div className={styles.timersGrid}>
        {timers.map((item) => (
          <Timer
            key={item.id}
            id={item.id}
            habitId={item.habitId}
            title={item.title}
            duration={item.duration}
            deleteTimer={deleteTimer}
          />
        ))}
      </div>
    </div>
  );
};

export default TimersList;
