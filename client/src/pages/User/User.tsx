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
    <div className="flex flex-col gap-10 p-10 ">
      <HabitsStats />

      <div className="grid grid-cols-5 gap-5">
        {user && (
          <aside className="col-span-1 flex flex-col gap-10">
            <HabitsList userId={user._id} />
            <HabitForm userId={user._id} />
          </aside>
        )}
        <main className="col-span-3 shadow-md p-10">
          <TimersList />
        </main>
        <aside className="col-span-1 shadow-md p-5">
          <h2 className="text-xl">Goals placeholder</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </aside>
      </div>
    </div>
  );
};

export default User;
