import { useState } from 'react';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import Button from '../../components/Button/Button';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';

interface HabitFormProps {
  habit?: Habit | null;
  onSubmit: (habit: NewHabit, id?: string) => Promise<void>;
}

const HabitForm = ({ onSubmit, habit }: HabitFormProps) => {
  const [name, setName] = useState(habit?.name ?? '');
  const [color, setColor] = useState(habit?.color ?? '#FF8A65');

  const user: User | null = useSelector(selectCurrentUser);
  if (!user) return;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (habit) {
      await onSubmit({ ...habit, name, color }, habit._id);
    } else {
      await onSubmit({ name, color, user: user._id });
      setName('');
      setColor('');
    }
  };

  const handleColorChange = (color: string) => {
    setColor(color);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 border border-gray-200 rounded-md p-5"
    >
      <div className="flex flex-wrap gap-3 items-center">
        <label htmlFor="name">Name</label>
        <input
          className="border border-gray400 p-2 rounded-md"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <ColorPicker color={color} onColorChange={handleColorChange} />

      <Button intent="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default HabitForm;
