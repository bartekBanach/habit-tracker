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

const TimerForm = ({ onSubmit, isLoading }: TimerFormProps) => {
  const [selectedHabit, setSelectedHabit] = useState('');
  const habitItem = useSelector(selectHabitById(selectedHabit));

  const [hours, setHours] = useState<string>('');
  const [minutes, setMinutes] = useState<string>('');
  const [seconds, setSeconds] = useState<string>('');

  const isSubmitDisabled =
    !selectedHabit || (!hours.trim() && !minutes.trim() && !seconds.trim());

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!habitItem) return;

    const timerDuration: Duration = {
      hours: parseInt(hours, 10) || 0,
      minutes: parseInt(minutes, 10) || 0,
      seconds: parseInt(seconds, 10) || 0,
    };

    if (
      timerDuration.hours === 0 &&
      timerDuration.minutes === 0 &&
      timerDuration.seconds === 0
    ) {
      return;
    }

    await onSubmit(selectedHabit, habitItem.color, timerDuration);

    setHours('');
    setMinutes('');
    setSeconds('');
  };

  return (
    <form
      onSubmit={(e) => {
        void (async () => {
          await handleSubmit(e);
        })();
      }}
      className="flex flex-col gap-9 p-5"
    >
      <div className="flex flex-col gap-6">
        <HabitSelect
          habitId={selectedHabit}
          onHabitChange={(habitId: string) => setSelectedHabit(habitId)}
          label="Habit:"
        />

        <div className="flex flex-col items-start gap-3">
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="hours" className="font-semibold">
              Hours:
            </label>
            <input
              type="number"
              id="hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Enter hours"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="minutes" className="font-semibold">
              Minutes:
            </label>
            <input
              type="number"
              id="minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              placeholder="Enter minutes"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="seconds" className="font-semibold">
              Seconds:
            </label>
            <input
              type="number"
              id="seconds"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              placeholder="Enter seconds"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <Button
        intent="primary"
        type="submit"
        loading={isLoading}
        disabled={isSubmitDisabled}
      >
        New timer
      </Button>
    </form>
  );
};

export default TimerForm;
