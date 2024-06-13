import HabitForm from '../../features/habits/HabitCreateForm';
import HabitsList from '../../features/habits/HabitsList/HabitsList';
import GoalsList from '../../features/goals/GoalsList';
import GoalForm from '../../features/goals/GoalForm';
import { useGetHabitsByUserQuery } from '../../features/habits/habitsApiSlice';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import TimersList from '../../features/timers/components/TimersList';
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
            <h2 className="text-xl text-center font-semibold">My Habits</h2>

            <HabitsList userId={user._id} />
          </aside>
        )}
        <main className="col-span-3 shadow-md p-10">
          <TimersList />
        </main>
        <aside className="col-span-1 shadow-md p-5">
          <h2 className="text-xl text-center font-semibold">My goals</h2>
          <GoalsList />
        </aside>
      </div>
    </div>
  );
};

export default User;
