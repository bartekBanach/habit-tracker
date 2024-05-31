import { useState } from 'react';
import { useAddHabitMutation } from './habitsApiSlice';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
const options = [
  { id: 0, label: 'Creative', value: 'Creative' },
  { id: 1, label: 'Career', value: 'Career' },
  { id: 2, label: 'Exercise', value: 'Exercise' },
];

interface HabitsFormProps {
  userId: string;
}

const HabitForm = ({ userId }: HabitsFormProps) => {
  const [addHabit] = useAddHabitMutation();

  const [formData, setFormData] = useState({
    name: '',
    category: options[0].value,
  });

  const [color, setColor] = useState('#D9E3F0');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, category } = formData;
    setFormData({ ...formData, name: '' });

    await addHabit({ name, category, user: userId, color });
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleColorChange = (color: string) => {
    setColor(color);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-5 items-center shadow-md p-5"
    >
      <div className="flex flex-wrap gap-3 items-center">
        <label htmlFor="name">Name</label>
        <input
          className="border border-gray400 p-2 rounded-md"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <ColorPicker color={color} onColorChange={handleColorChange} />

      <div>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {options.map((item) => (
            <option key={item.id} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <Button intent="primary" type="submit">
        Create
      </Button>
    </form>
  );
};

export default HabitForm;
