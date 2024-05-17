import { useEffect } from 'react';
import { useState } from 'react';
import { TimerForm } from './TimerForm';
import Timer from './Timer';
import { useGetHabitsByUserQuery } from '../../features/habits/habitsApiSlice';

const TimersList = () => {
  const [timers, setTimers] = useState<Timer[]>([]);

  const { data: habits } = useGetHabitsByUserQuery();

  useEffect(() => {
    setTimers(JSON.parse(localStorage.getItem('timers') ?? '[]') as Timer[]);
  }, []);

  const deleteTimer = (timerId: string) => {
    const newTimers = timers.filter((timer) => timer.id !== timerId);
    setTimers(newTimers);
    localStorage.setItem('timers', JSON.stringify(newTimers));
  };
  if (habits)
    return (
      <div className="flex flex-col gap-10 items-center">
        <TimerForm timers={timers} setTimers={setTimers} />
        <div className="grid grid-cols-2 gap-7">
          {timers.map((item) => (
            <Timer
              key={item.id}
              id={item.id}
              habitId={item.habitId}
              title={item.title}
              color={item.color}
              duration={item.duration}
              deleteTimer={deleteTimer}
            />
          ))}
          <div className="border shadow-md p-5">Add new timer placeholder</div>
        </div>
      </div>
    );
};

export default TimersList;
