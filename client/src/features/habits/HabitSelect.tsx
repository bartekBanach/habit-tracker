import { useGetUserHabitsQuery } from './habitsApiSlice';

interface Habit {
  _id: string;
  name: string;
}

interface HabitSelectProps {
  habitId: string;
  onHabitChange: (habit: string) => void;
  allHabitsOption?: boolean;
  label?: string;
}

const HabitSelect = ({
  habitId,
  onHabitChange,
  allHabitsOption = false,
  label = '',
}: HabitSelectProps) => {
  const { data: habits } = useGetUserHabitsQuery();

  if (habits)
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor="habit-select" className="font-semibold">
            {label}
          </label>
        )}
        <select
          id="habit-select"
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
      </div>
    );

  return null;
};

export default HabitSelect;
