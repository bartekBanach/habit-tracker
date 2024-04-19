import styles from './HabitsList.module.css';
import { useGetHabitsByUserQuery } from '../HabitsApiSlice';

const HabitsList = ({ userId }) => {
  const {
    data: habits,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetHabitsByUserQuery(userId);
  if (habits)
    return (
      <ul className={styles.container}>
        {habits.map((item: Habit) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    );
};

export default HabitsList;
