import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface TimerFormProps {
  timers: Timer[];
  setTimers: React.Dispatch<React.SetStateAction<Timer[]>>;
  habits: Habit[];
}

export const TimerForm = ({ timers, setTimers, habits }: TimerFormProps) => {
  const [selectedHabit, setSelectedHabit] = useState(
    habits[0] ? habits[0]._id : ''
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const habitItem = habits.find((habit) => habit._id === selectedHabit);
    if (!habitItem) return;

    const formData = new FormData(e.target as HTMLFormElement);
    if (
      !formData.get('hours') &&
      !formData.get('minutes') &&
      !formData.get('seconds')
    )
      return;

    const newTimer = {
      id: uuidv4(),
      //title: (formData.get('title') ?? 'Unknown') as string,
      habitId: selectedHabit,
      title: habitItem.name,
      color: habitItem.color,
      duration: {
        hours: parseInt(formData.get('hours') || '0', 10),
        minutes: parseInt((formData.get('minutes') || '0') as string),
        seconds: parseInt((formData.get('seconds') || '0') as string),
      },
    };
    setTimers((prev) => [...prev, newTimer]);
    localStorage.setItem('timers', JSON.stringify([...timers, newTimer]));
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        name="category"
        onChange={(e) => setSelectedHabit(e.target.value)}
      >
        {habits.map((item: Habit) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>

      <input name="hours" type="number" placeholder="hours"></input>
      <input name="minutes" type="number" placeholder="minutes"></input>
      <input name="seconds" type="number" placeholder="seconds"></input>

      <button type="submit">New timer</button>
    </form>
  );
};
