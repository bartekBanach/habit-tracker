import styles from './User.module.css';
import HabitForm from '../../features/habits/HabitForm';
import HabitsList from '../../features/habits/HabitsList/HabitsList';
import { useGetHabitsByUserQuery } from '../../features/habits/habitsApiSlice';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import TimersList from '../../components/Timer/TimersList';
import HabitsStats from '../../features/habits/HabitsStats/HabitsStats';

const User = () => {
  const user = useSelector(selectCurrentUser);
  const { data: habits, isLoading } = useGetHabitsByUserQuery();

  if (isLoading) return <p>Loading.....</p>;

  if (!user)
    return (
      <>
        <p>No user</p>
      </>
    );

  if (!habits)
    return (
      <>
        <p>No habits</p>
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

export default User;
