import styles from './HabitsList.module.css';

interface HabitsLsitProps {
  habits: Habit[];
}

const HabitsList = ({ habits }: HabitsLsitProps) => {
  return (
    <ul className={styles.container}>
      {habits.map((item: Habit) => (
        <li key={item._id}>{item.name}</li>
      ))}
    </ul>
  );
};

export default HabitsList;
