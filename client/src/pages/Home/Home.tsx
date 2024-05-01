import styles from './Home.module.css';
import HabitForm from '../../features/habits/HabitForm';
import HabitsList from '../../features/habits/HabitsList/HabitsList';
import { useGetHabitsByUserQuery } from '../../features/habits/habitsApiSlice';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import TimersList from '../../components/Timer/TimersList';
import HabitsStats from '../../features/habits/HabitsStats/HabitsStats';

const Home = () => {
  const user = useSelector(selectCurrentUser);
  const {
    data: habits,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetHabitsByUserQuery(user?._id);

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
        <HabitsStats />
        <TimersList />
      </main>
    </div>
  );
};

export default Home;
