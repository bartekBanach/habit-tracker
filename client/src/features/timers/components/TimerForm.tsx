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
  isLoading: boolean;
}

export const TimerForm = ({ onSubmit, isLoading }: TimerFormProps) => {
  const [selectedHabit, setSelectedHabit] = useState('');
  const habitItem = useSelector(selectHabitById(selectedHabit));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!habitItem) return;

    const formData = new FormData(e.target as HTMLFormElement);

    const hours = parseInt(formData.get('hours') as string) || 0;
    const minutes = parseInt(formData.get('minutes') as string) || 0;
    const seconds = parseInt(formData.get('seconds') as string) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
      return;
    }

    await onSubmit(selectedHabit, habitItem.color, { hours, minutes, seconds });

    e.currentTarget.reset();
  };

  return (
    <form
      onSubmit={(e) => {
        void (async () => {
          await handleSubmit(e);
        })();
      }}
      className="flex flex-col gap-7 p-5"
    >
      <HabitSelect
        habitId={selectedHabit}
        onHabitChange={(habitId: string) => setSelectedHabit(habitId)}
      />

      <input name="hours" type="number" placeholder="hours"></input>
      <input name="minutes" type="number" placeholder="minutes"></input>
      <input name="seconds" type="number" placeholder="seconds"></input>

      <Button intent="primary" type="submit" loading={isLoading}>
        New timer
      </Button>
    </form>
  );
};
