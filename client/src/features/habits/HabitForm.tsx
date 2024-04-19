import { useState } from 'react';
import { useAddHabitMutation } from './HabitsApiSlice';
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /*if (!user) {
      console.log('Unlogged');
      return;
    }*/
    const { name, category } = formData;
    setFormData({ ...formData, name: '' });

    await addHabit({ name, category, user: userId });
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
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

      <button type="submit">New habit</button>
    </form>
  );
};

export default HabitForm;
