import {
  useDeleteHabitMutation,
  useGetHabitsByUserQuery,
  useUpdateHabitMutation,
  useAddHabitMutation,
} from '../habitsApiSlice';
import { FaEdit } from 'react-icons/fa';
import IconButton from '../../../components/IconButton/IconButton';
import Modal from '../../../components/Modal/Modal';
import { useState } from 'react';
import HabitForm from '../HabitForm';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import Button from '../../../components/Button/Button';

const HabitsList = () => {
  const { data: habits } = useGetHabitsByUserQuery();
  const [habitModalOpened, setHabitModalOpened] = useState(false);
  const [deleteOpened, setDeleteOpened] = useState(false);

  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [deletingHabit, setDeletingHabit] = useState<string | null>(null);
  const [updateHabit] = useUpdateHabitMutation();
  const [deleteHabit] = useDeleteHabitMutation();
  const [addHabit] = useAddHabitMutation();

  const handleEditModalClose = () => {
    setHabitModalOpened(false);
    setEditingHabit(null);
  };

  const handleEditModalOpen = (habit?: Habit) => {
    if (habit) {
      setEditingHabit(habit);
    }
    setHabitModalOpened(true);
  };

  const handleDeleteModalOpen = (id: string) => {
    setDeletingHabit(id);
    setDeleteOpened(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteOpened(false);
    setDeletingHabit(null);
  };

  const handleDeleteHabit = async (id: string) => {
    await deleteHabit(id);
    handleDeleteModalClose();
  };

  const handleUpdateHabit = async (habit: NewHabit, id: string) => {
    await updateHabit({ id, habit });
    handleEditModalClose();
  };

  const handleCreateHabit = async (habit: NewHabit) => {
    await addHabit(habit);
    handleEditModalClose();
  };

  if (habits)
    return (
      <ul className="flex flex-col gap-2 shadow-md p-5">
        {habits.map((item: Habit) => (
          <li
            className="flex justify-between items-center shadow-md text-white border rounded-md py-2 px-4 font-semibold"
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
        <Button onClick={() => handleEditModalOpen()} intent="primary">
          New habit
        </Button>
        {editingHabit && (
          <Modal
            header="Edit habit"
            isOpened={habitModalOpened}
            onClose={handleEditModalClose}
          >
            <HabitForm
              habitId={editingHabit._id}
              habit={editingHabit}
              onSubmit={handleUpdateHabit}
            />
          </Modal>
        )}
        <Modal
          isOpened={habitModalOpened && !editingHabit}
          onClose={handleEditModalClose}
          header="Create new habit"
        >
          <HabitForm onSubmit={handleCreateHabit} />
        </Modal>
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
