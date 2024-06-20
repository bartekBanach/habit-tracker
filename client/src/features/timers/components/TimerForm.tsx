import { useState } from 'react';
import Button from '../../../components/Button/Button';
import HabitSelect from '../../habits/HabitSelect';
import { selectHabitById } from '../../habits/habitsApiSlice';
import { useSelector } from 'react-redux';

interface TimerFormProps {
  onSubmit: (
    habitId: string,
    color: string,
    duration: Duration
  ) => Promise<void>;
}

export const TimerForm = ({ onSubmit }: TimerFormProps) => {
  const [selectedHabit, setSelectedHabit] = useState('');
  const habitItem = useSelector(selectHabitById(selectedHabit));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!habitItem) return;

    const formData = new FormData(e.target as HTMLFormElement);
    if (
      !formData.get('hours') &&
      !formData.get('minutes') &&
      !formData.get('seconds')
    )
      return;

    await onSubmit(selectedHabit, habitItem.color, {
      hours: parseInt(formData.get('hours') || '0', 10),
      minutes: parseInt((formData.get('minutes') || '0') as string),
      seconds: parseInt((formData.get('seconds') || '0') as string),
    });

    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7 p-5">
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
