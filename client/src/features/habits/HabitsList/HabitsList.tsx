import { useGetHabitsByUserQuery } from '../habitsApiSlice';

interface HabitsListProps {
  userId: string;
}

const HabitsList = ({ userId }: HabitsListProps) => {
  const { data: habits } = useGetHabitsByUserQuery();
  if (habits)
    return (
      <ul className="flex flex-col text-white gap-2 shadow-md p-5">
        {habits.map((item: Habit) => (
          <li
            className="shadow-md border rounded-md py-2 px-4"
            key={item._id}
            style={{ backgroundColor: `${item.color}` }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    );
};

export default HabitsList;
