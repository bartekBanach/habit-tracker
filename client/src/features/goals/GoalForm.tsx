import { useState } from 'react';
import HabitSelect from '../habits/HabitSelect';
import Button from '../../components/Button/Button';
import {
  addWeeks,
  format,
  minutesToMilliseconds,
  hoursToMilliseconds,
} from 'date-fns';
import { useAddGoalMutation } from './goalsApiSlice';
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

  const [addGoal] = useAddGoalMutation();

  const handleHabitChange = (habit: string) => {
    setHabit(habit);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await addGoal({
      habit,
      status: 'in_progress',
      type,
      timeAmount: 0,
      requiredTimeAmount:
        hoursToMilliseconds(parseInt(hoursAmount)) +
        minutesToMilliseconds(parseInt(minutesAmount)),
      timeLimit,
    });

    setHoursAmount('0');
    setMinutesAmount('0');
    onSubmit();
  };

  const handleTimeLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeLimit((prev) => ({ ...prev, endDate: e.target.value }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <HabitSelect habitId={habit} onHabitChange={handleHabitChange} />
      {/*<select>
        <option>Week</option>
        <option>Month</option>
        <option>Year</option>
  </select>*/}
      <div>
        <label htmlFor="end">End date</label>
        <input
          className="border border-gray-300 rounded-md p-2"
          type="date"
          id="end"
          value={timeLimit.endDate}
          onChange={handleTimeLimitChange}
        ></input>
      </div>
      <div>
        <label htmlFor="hours-amount">Hours amount</label>
        <input
          className="border border-gray-300 rounded-md p-2"
          type="number"
          id="hours-amount"
          value={hoursAmount}
          onChange={(e) => setHoursAmount(e.target.value)}
        ></input>
        <label htmlFor="minutes-amount">Minutes amount</label>
        <input
          className="border border-gray-300 rounded-md p-2"
          type="number"
          id="minutes-amount"
          value={minutesAmount}
          onChange={(e) => setMinutesAmount(e.target.value)}
        ></input>
      </div>
      <input
        name="goal-type"
        type="radio"
        id="one-time"
        value="one_time"
        checked={type === 'one_time'}
        onChange={handleTypeChange}
      />
      <label htmlFor="one-time">One time</label>

      <input
        name="goal-type"
        type="radio"
        id="daily"
        value="daily"
        checked={type === 'daily'}
        onChange={handleTypeChange}
      />
      <label htmlFor="daily">Daily goal</label>

      <Button intent="primary" type="submit">
        Add goal
      </Button>
    </form>
  );
};

export default GoalForm;
