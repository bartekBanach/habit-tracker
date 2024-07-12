import { useGetUserHabitsQuery } from './habitsApiSlice';

interface HabitSelectProps {
  habitId: string;
  onHabitChange: (habit: string) => void;
  allHabitsOption?: boolean;
}

const HabitSelect = ({
  habitId,
  onHabitChange,
  allHabitsOption = false,
}: HabitSelectProps) => {
  const { data: habits } = useGetUserHabitsQuery();

  if (habits)
    return (
      <select
        className="bg-white border border-gray-300 rounded-md p-2"
        name="habit"
        onChange={(e) => onHabitChange(e.target.value)}
        value={habitId}
        required
      >
        {allHabitsOption ? (
          <option value="">All habits</option>
        ) : (
          <option value="" disabled>
            Select habit
          </option>
        )}

        {habits.map((item: Habit) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
    );
};

export default HabitSelect;
