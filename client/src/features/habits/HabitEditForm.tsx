import { useState } from 'react';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import Button from '../../components/Button/Button';

interface HabitEditFormProps {
  habitId: string;
  habit: Habit;
  onSubmit: (id: string, habit: NewHabit) => Promise<void>;
}

const HabitEditForm = ({ habit, onSubmit }: HabitEditFormProps) => {
  const [name, setName] = useState(habit.name);
  const [color, setColor] = useState(habit.color);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setName('');
    setColor('');

    await onSubmit(habit._id, { ...habit, name, color });
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
        Update
      </Button>
    </form>
  );
};

export default HabitEditForm;
