import { useState } from 'react';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import Button from '../../components/Button/Button';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';

interface HabitFormProps {
  habit?: Habit | null;
  onCreate?: (habit: NewHabit) => Promise<void>;
  onUpdate?: (habit: Habit) => Promise<void>;
}

const HabitForm = ({ onCreate, onUpdate, habit }: HabitFormProps) => {
  const [name, setName] = useState(habit?.name ?? '');
  const [color, setColor] = useState(habit?.color ?? '#FF8A65');

  const { _id: userId } = useSelector(selectCurrentUser) ?? {};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return;

    if (habit && onUpdate) {
      await onUpdate({ ...habit, name, color });
    } else if (onCreate) {
      await onCreate({ name, color, user: userId });
      setName('');
      setColor('');
    }
  };

  const handleColorChange = (color: string) => {
    setColor(color);
  };

  return (
    <form
      onSubmit={(e) => {
        void (async () => {
          await handleSubmit(e);
        })();
      }}
      className="flex flex-col items-center gap-5 border border-gray-200 rounded-md p-5"
    >
      <div className="flex flex-col items-start flex-wrap gap-3">
        <div className="flex gap-2 items-center">
          <label className="font-semibold" htmlFor="name">
            Name
          </label>
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

        <div className="flex gap-2">
          <span className="font-semibold">Color</span>
          <ColorPicker color={color} onColorChange={handleColorChange} />
        </div>
      </div>

      <Button intent="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default HabitForm;
