import HabitsList from '../../features/habits/HabitsList/HabitsList';
import GoalsList from '../../features/goals/GoalsList';
import TimersList from '../../features/timers/components/TimersList';
import HabitsStats from '../../features/habits/HabitsStats/HabitsStats';
import Button from '../../components/Button/Button';
import { useState } from 'react';

const User = () => {
  const [activeComponent, setActiveComponent] = useState('TimersList');
  const options = [
    {
      id: 0,
      label: 'Timers',
      value: 'TimersList',
      icon: '',
    },
    {
      id: 3,
      label: 'Habits',
      value: 'HabitsList',
      icon: '',
    },
    {
      id: 1,
      label: 'Goals',
      value: 'GoalsList',
      icon: '',
    },
    {
      id: 2,
      label: 'Stats',
      value: 'HabitsStats',
      icon: '',
    },
  ];
  let mobileContent;
  if (activeComponent === 'TimersList') mobileContent = <TimersList />;
  else if (activeComponent === 'HabitsList') mobileContent = <HabitsList />;
  else if (activeComponent === 'GoalsList') mobileContent = <GoalsList />;
  else mobileContent = <HabitsStats />;

  return (
    <>
      <div className="lg:hidden min-h-full">
        <div className="min-h-screen flex flex-col">{mobileContent}</div>
        <div className="sticky bottom-0 z-10 my-3 bg-white p-2 w-full flex gap-2 justify-center">
          {options.map((option) => (
            <Button
              intent={
                activeComponent === option.value ? 'primary' : 'secondary'
              }
              key={option.id}
              onClick={() => setActiveComponent(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 hidden lg:flex flex-col gap-10 p-10">
        <HabitsStats />

        <div className="grid grid-cols-5 gap-5">
          <aside className="col-span-1">
            <HabitsList />
          </aside>
          <main className="col-span-3">
            <TimersList />
          </main>
          <aside className="col-span-1">
            <GoalsList />
          </aside>
        </div>
      </div>
    </>
  );
};

export default User;
