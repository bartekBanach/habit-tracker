import {
  useGetHabitsByUserQuery,
  useUpdateHabitMutation,
} from '../habitsApiSlice';
import { FaEdit } from 'react-icons/fa';
import IconButton from '../../../components/IconButton/IconButton';
import Modal from '../../../components/Modal/Modal';
import { useState } from 'react';
import HabitEditForm from '../HabitEditForm';

const HabitsList = () => {
  const { data: habits } = useGetHabitsByUserQuery();
  const [editOpened, setEditOpened] = useState(false);
  const [updateHabit] = useUpdateHabitMutation();
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  const handleModalClose = () => {
    setEditOpened(false);
    setSelectedHabit(null);
  };

  const handleModalOpen = (habit: Habit) => {
    setSelectedHabit(habit);
    setEditOpened(true);
  };
  const handleUpdateHabit = async (id: string, habit: NewHabit) => {
    await updateHabit({ id, habit });
    handleModalClose();
  };

  if (habits)
    return (
      <ul className="flex flex-col text-white gap-2 shadow-md p-5">
        {habits.map((item: Habit) => (
          <li
            className="flex justify-between shadow-md border rounded-md py-2 px-4"
            key={item._id}
            style={{ backgroundColor: `${item.color}` }}
          >
            {item.name}
            <IconButton onClick={() => handleModalOpen(item)}>
              <FaEdit />
            </IconButton>
          </li>
        ))}
        {selectedHabit && (
          <Modal
            header="Edit habit"
            isOpened={editOpened}
            onClose={handleModalClose}
          >
            <HabitEditForm
              habitId={selectedHabit._id}
              habit={selectedHabit}
              onSubmit={handleUpdateHabit}
            />
          </Modal>
        )}
      </ul>
    );
};

export default HabitsList;
