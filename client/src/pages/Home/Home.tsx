import { useEffect, useState } from 'react';
import Timer from '../../components/Timer/Timer';
import styles from './Home.module.css';
import HabitForm from '../../features/habits/HabitForm';
import HabitsList from '../../features/habits/HabitsList/HabitsList';
import { useGetHabitsByUserQuery } from '../../features/habits/habitsApiSlice';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { TimerForm } from '../../components/Timer/TimerForm';

const Home = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const user = useSelector(selectCurrentUser);
  const {
    data: habits,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetHabitsByUserQuery(user?._id);

  useEffect(() => {
    setTimers(JSON.parse(localStorage.getItem('timers') ?? '[]') as Timer[]);
  }, []);

  const deleteTimer = (timerId: string) => {
    const newTimers = timers.filter((timer) => timer.id !== timerId);
    setTimers(newTimers);
    localStorage.setItem('timers', JSON.stringify(newTimers));
  };

  if (isLoading) return <p>Loading.....</p>;

  if (!habits || !user)
    return (
      <>
        <p>No user</p>
      </>
    );

  return (
    <div className={styles.container}>
      {user && (
        <aside>
          <HabitsList userId={user._id} />
          <HabitForm userId={user._id} />
        </aside>
      )}

      <main>
        <TimerForm habits={habits} timers={timers} setTimers={setTimers} />
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
      </main>
    </div>
  );
};

export default Home;
