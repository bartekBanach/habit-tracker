import styles from './HabitsList.module.css';
import { useGetHabitsByUserQuery } from '../habitsApiSlice';
import { getHours, getMinutes, getSeconds } from '../../../utils/timeUtils';

interface HabitsListProps {
  userId: string;
}

const HabitsList = ({ userId }: HabitsListProps) => {
  const { data: habits } = useGetHabitsByUserQuery(userId);
  if (habits)
    return (
      <ul className={styles.container}>
        {habits.map((item: Habit) => (
          <li key={item._id}>
            {item.name} time: {getHours(item.timeSpent)}h :{' '}
            {getMinutes(item.timeSpent)}m : {getSeconds(item.timeSpent)}s
          </li>
        ))}
      </ul>
    );
};

export default HabitsList;
