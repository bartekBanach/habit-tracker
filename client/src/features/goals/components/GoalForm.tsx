import { useState } from 'react';
import HabitSelect from '../../habits/HabitSelect';
import Button from '../../../components/Button/Button';
import {
  addWeeks,
  format,
  minutesToMilliseconds,
  hoursToMilliseconds,
} from 'date-fns';
import { useAddGoalMutation } from '../goalsApiSlice';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../notifications/notifications.slice';
import useHandleErrors from '../../../hooks/useHandleErrors';

interface GoalFormProps {
  onSubmit: () => void;
}

const GoalForm = ({ onSubmit }: GoalFormProps) => {
  const [habit, setHabit] = useState('');
  const [type, setType] = useState('daily');
  const [hoursAmount, setHoursAmount] = useState('0');
  const [minutesAmount, setMinutesAmount] = useState('0');
  const [timeLimit, setTimeLimit] = useState({
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(addWeeks(new Date(), 1), 'yyyy-MM-dd'),
  });
  const [isDeadlineEnabled, setIsDeadlineEnabled] = useState(false);

  const [addGoal, { isLoading }] = useAddGoalMutation();
  const dispatch = useDispatch();
  const handleErrors = useHandleErrors();

  const handleHabitChange = (habit: string) => {
    setHabit(habit);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addGoal({
        habit,
        status: 'in_progress',
        type,
        timeAmount: 0,
        requiredTimeAmount:
          hoursToMilliseconds(parseInt(hoursAmount)) +
          minutesToMilliseconds(parseInt(minutesAmount)),
        timeLimit: {
          startDate: timeLimit.startDate,
          endDate: isDeadlineEnabled ? timeLimit.endDate : null,
        },
      }).unwrap();
      dispatch(
        addNotification({
          type: 'success',
          message: 'Goal created successfully!',
        })
      );
    } catch (error: unknown) {
      handleErrors(error);
    }

    setHoursAmount('0');
    setMinutesAmount('0');
    onSubmit();
  };

  const handleTimeLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeLimit((prev) => ({ ...prev, endDate: e.target.value }));
  };
  return (
    <form
      onSubmit={(e) => {
        void (async () => {
          await handleSubmit(e);
        })();
      }}
      className="flex flex-col gap-3 items-center rounded-md p-5 border border-gray-200"
    >
      <HabitSelect habitId={habit} onHabitChange={handleHabitChange} />

      <div className="flex gap-3 items-center">
        <div className="flex gap-1 items-center">
          <input
            name="goal-type"
            type="radio"
            id="one-time"
            value="one_time"
            checked={type === 'one_time'}
            onChange={handleTypeChange}
          />
          <label htmlFor="one-time">One time goal</label>
        </div>
        <div className="flex gap-1 items-center">
          <input
            name="goal-type"
            type="radio"
            id="daily"
            value="daily"
            checked={type === 'daily'}
            onChange={handleTypeChange}
          />
          <label htmlFor="daily">Daily goal</label>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="deadline"
            checked={isDeadlineEnabled}
            onChange={() => setIsDeadlineEnabled((prev) => !prev)}
          />
          <label className="font-semibold text-red-500" htmlFor="deadline">
            Set deadline
          </label>
        </div>

        <div
          className={`flex gap-2 items-center ${!isDeadlineEnabled && 'opacity-30'}`}
        >
          <label htmlFor="end">end date</label>
          <input
            className="border border-gray-300 rounded-md p-2"
            type="date"
            id="end"
            value={timeLimit.endDate}
            onChange={handleTimeLimitChange}
            disabled={!isDeadlineEnabled}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center ">
        <label htmlFor="hours-amount">Hours</label>
        <input
          className="border border-gray-300 rounded-md p-2"
          type="number"
          id="hours-amount"
          value={hoursAmount}
          onChange={(e) => setHoursAmount(e.target.value)}
        ></input>
        <label htmlFor="minutes-amount">Minutes</label>
        <input
          className="border border-gray-300 rounded-md p-2"
          type="number"
          id="minutes-amount"
          value={minutesAmount}
          onChange={(e) => setMinutesAmount(e.target.value)}
        ></input>
      </div>

      <Button intent="primary" type="submit" loading={isLoading}>
        Add goal
      </Button>
    </form>
  );
};

export default GoalForm;
