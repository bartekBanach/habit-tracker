import { useGetHabitsByUserQuery } from '../habitsApiSlice';
import { FaEdit } from 'react-icons/fa';
import IconButton from '../../../components/IconButton/IconButton';
import Modal from '../../../components/Modal/Modal';
import HabitForm from '../HabitForm';
import { useState } from 'react';

interface HabitsListProps {
  userId: string;
}

const HabitsList = ({ userId }: HabitsListProps) => {
  const { data: habits } = useGetHabitsByUserQuery();
  const [editOpened, setEditOpened] = useState(false);

  const handleModalClose = () => {
    setEditOpened(false);
  };

  const handleModalOpen = () => {
    setEditOpened(true);
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
            <IconButton onClick={handleModalOpen}>
              <FaEdit />
            </IconButton>
          </li>
        ))}
        <Modal
          header="Edit habit"
          isOpened={editOpened}
          onClose={handleModalClose}
        >
          <HabitForm userId={userId} />
        </Modal>
      </ul>
    );
};

export default HabitsList;
