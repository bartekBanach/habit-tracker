import { useState } from 'react';
import Button from '../../../components/Button/Button';
import HabitSelect from '../../habits/HabitSelect';
import { selectHabitById } from '../../habits/habitsApiSlice';
import { useSelector } from 'react-redux';
import { useCreateTimerMutation } from '../timersApiSlice';
import { selectCurrentUser } from '../../auth/authSlice';

export const TimerForm = () => {
  const [selectedHabit, setSelectedHabit] = useState('');
  const habitItem = useSelector(selectHabitById(selectedHabit));
  const [createTimer] = useCreateTimerMutation();
  const { _id: userId } = useSelector(selectCurrentUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!habitItem || !userId) return;

    const formData = new FormData(e.target as HTMLFormElement);
    if (
      !formData.get('hours') &&
      !formData.get('minutes') &&
      !formData.get('seconds')
    )
      return;

    const newTimer = {
      habit: selectedHabit,
      user: userId,
      color: habitItem.color,
      duration: {
        hours: parseInt(formData.get('hours') || '0', 10),
        minutes: parseInt((formData.get('minutes') || '0') as string),
        seconds: parseInt((formData.get('seconds') || '0') as string),
      },
    };

    await createTimer(newTimer);
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
