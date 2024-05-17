import { selectHabitsByUser } from './habitsApiSlice';
import { useSelector } from 'react-redux';

interface HabitSelectProps {
  habitId: string;
  onHabitChange: (habit: string) => void;
}

const HabitSelect = ({ habitId, onHabitChange }: HabitSelectProps) => {
  const habits = useSelector(selectHabitsByUser);
  if (habits)
    return (
      <select
        className="bg-white border border-gray-300 rounded-md p-2"
        name="habit"
        onChange={(e) => onHabitChange(e.target.value)}
        value={habitId}
      >
        <option value="" disabled>
          Select habit
        </option>
        {habits.map((item: Habit) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
    );
};

export default HabitSelect;
