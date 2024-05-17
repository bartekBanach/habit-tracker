import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../Button/Button';
import HabitSelect from '../../features/habits/HabitSelect';
import { selectHabitById } from '../../features/habits/habitsApiSlice';
import { useSelector } from 'react-redux';

interface TimerFormProps {
  timers: Timer[];
  setTimers: React.Dispatch<React.SetStateAction<Timer[]>>;
}

export const TimerForm = ({ timers, setTimers }: TimerFormProps) => {
  const [selectedHabit, setSelectedHabit] = useState('');
  const habitItem = useSelector(selectHabitById(selectedHabit));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      <HabitSelect
        habitId={selectedHabit}
        onHabitChange={(habitId: string) => setSelectedHabit(habitId)}
      />

      <input name="hours" type="number" placeholder="hours"></input>
      <input name="minutes" type="number" placeholder="minutes"></input>
      <input name="seconds" type="number" placeholder="seconds"></input>

      <Button intent="primary" type="submit">
        New timer
      </Button>
    </form>
  );
};
