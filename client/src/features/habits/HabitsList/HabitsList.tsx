import {
  useDeleteHabitMutation,
  useGetHabitsByUserQuery,
  useUpdateHabitMutation,
} from '../habitsApiSlice';
import { FaEdit } from 'react-icons/fa';
import IconButton from '../../../components/IconButton/IconButton';
import Modal from '../../../components/Modal/Modal';
import { useState } from 'react';
import HabitEditForm from '../HabitEditForm';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import Button from '../../../components/Button/Button';

const HabitsList = () => {
  const { data: habits } = useGetHabitsByUserQuery();
  const [editOpened, setEditOpened] = useState(false);
  const [deleteOpened, setDeleteOpened] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [deletingHabit, setDeletingHabit] = useState<string | null>(null);
  const [updateHabit] = useUpdateHabitMutation();
  const [deleteHabit] = useDeleteHabitMutation();

  const handleEditModalClose = () => {
    setEditOpened(false);
    setEditingHabit(null);
  };

  const handleDeleteModalOpen = (id: string) => {
    setDeletingHabit(id);
    setDeleteOpened(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteOpened(false);
    setDeletingHabit(null);
  };

  const handleEditModalOpen = (habit: Habit) => {
    setEditingHabit(habit);
    setEditOpened(true);
  };

  const handleDeleteHabit = async (id: string) => {
    await deleteHabit(id);
    handleDeleteModalClose();
  };

  const handleUpdateHabit = async (id: string, habit: NewHabit) => {
    await updateHabit({ id, habit });
    handleEditModalClose();
  };

  if (habits)
    return (
      <ul className="flex flex-col text-white gap-2 shadow-md p-5">
        {habits.map((item: Habit) => (
          <li
            className="flex justify-between items-center shadow-md border rounded-md py-2 px-4"
            key={item._id}
            style={{ backgroundColor: `${item.color}` }}
          >
            {item.name}
            <div className="flex flex-row gap-3">
              <IconButton
                background="transparent"
                size="noPadding"
                iconColor="white"
                onClick={() => handleEditModalOpen(item)}
              >
                <FaEdit />
              </IconButton>
              <IconButton
                background="transparent"
                size="noPadding"
                iconColor="white"
                onClick={() => handleDeleteModalOpen(item._id)}
              >
                <RiDeleteBin6Fill />
              </IconButton>
            </div>
          </li>
        ))}
        {editingHabit && (
          <Modal
            header="Edit habit"
            isOpened={editOpened}
            onClose={handleEditModalClose}
          >
            <HabitEditForm
              habitId={editingHabit._id}
              habit={editingHabit}
              onSubmit={handleUpdateHabit}
            />
          </Modal>
        )}
        {deletingHabit && (
          <Modal
            header="Delete habit"
            isOpened={deleteOpened}
            onClose={handleDeleteModalClose}
          >
            <p>
              Are you sure you want to delete this habit? It will delete all you
              progress and associated goals.
            </p>
            <Button onClick={() => handleDeleteHabit(deletingHabit)}>
              Yes
            </Button>
            <Button onClick={handleDeleteModalClose}>No</Button>
          </Modal>
        )}
      </ul>
    );
};

export default HabitsList;
