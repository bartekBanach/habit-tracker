import {
  useDeleteHabitMutation,
  useUpdateHabitMutation,
  useAddHabitMutation,
  useGetUserHabitsQuery,
} from '../habitsApiSlice';
import { FaEdit } from 'react-icons/fa';
import Modal from '../../../components/Modal/Modal';
import { useState } from 'react';
import HabitForm from '../HabitForm';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import Button from '../../../components/Button/Button';
import IconButton from '../../../components/IconButton/IconButton';
import { IoAdd } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../notifications/notifications.slice';
import useHandleErrors from '../../../hooks/useHandleErrors';
import SectionContainer from '../../../components/SectionContainer/SectionContainer';

const HabitsList = () => {
  const { data: habits } = useGetUserHabitsQuery();
  const [habitModalOpened, setHabitModalOpened] = useState(false);
  const [deleteOpened, setDeleteOpened] = useState(false);

  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [deletingHabit, setDeletingHabit] = useState<string | null>(null);
  const [updateHabit, { isLoading: isUpdating }] = useUpdateHabitMutation();
  const [deleteHabit] = useDeleteHabitMutation();
  const [addHabit, { isLoading: isAdding }] = useAddHabitMutation();
  const dispatch = useDispatch();
  const handleErrors = useHandleErrors();

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
    try {
      await deleteHabit(id).unwrap();
      dispatch(
        addNotification({
          type: 'success',
          message: 'Habit deleted successfully!',
        })
      );
    } catch (error) {
      handleErrors(error);
    } finally {
      handleDeleteModalClose();
    }
  };

  const handleUpdateHabit = async (habit: Habit) => {
    try {
      await updateHabit({ id: habit._id, habit }).unwrap();
      dispatch(
        addNotification({
          type: 'success',
          message: 'Habit updated successfully!',
        })
      );
    } catch (error) {
      handleErrors(error);
    } finally {
      handleEditModalClose();
    }
  };

  const handleCreateHabit = async (habit: NewHabit) => {
    try {
      await addHabit(habit).unwrap();
      dispatch(
        addNotification({
          type: 'success',
          message: 'Habit created successfully!',
        })
      );
    } catch (error: unknown) {
      handleErrors(error);
    } finally {
      handleEditModalClose();
    }
  };

  const headerContent = (
    <>
      <IconButton onClick={() => handleEditModalOpen()}>
        <IoAdd />
      </IconButton>
    </>
  );
  if (habits)
    return (
      <SectionContainer headerText="My Habits" headerChildren={headerContent}>
        <ul className="flex flex-col gap-2 p-5">
          {habits.length === 0 && (
            <p className="text-lg text-gray-400">
              No habits yet. Click{' '}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={() => handleEditModalOpen()}
              >
                here
              </span>{' '}
              to add your first habit.
            </p>
          )}
          {habits.map((item: Habit) => (
            <li
              className="flex flex-wrap justify-between items-center shadow-md text-white border rounded-md py-2 px-4 font-semibold"
              key={item._id}
              style={{ backgroundColor: `${item.color}` }}
            >
              {item.name}
              <div className="flex flex-row gap-3">
                <IconButton
                  size="noPadding"
                  color="transparent"
                  onClick={() => handleEditModalOpen(item)}
                >
                  <FaEdit />
                </IconButton>
                <IconButton
                  size="noPadding"
                  color="transparent"
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
              isOpened={habitModalOpened}
              onClose={handleEditModalClose}
            >
              <HabitForm
                onUpdate={handleUpdateHabit}
                habit={editingHabit}
                isLoading={isUpdating}
              />
            </Modal>
          )}
          <Modal
            isOpened={habitModalOpened && !editingHabit}
            onClose={handleEditModalClose}
            header="Create new habit"
          >
            <HabitForm onCreate={handleCreateHabit} isLoading={isAdding} />
          </Modal>
          {deletingHabit && (
            <Modal
              header="Delete habit"
              isOpened={deleteOpened}
              onClose={handleDeleteModalClose}
            >
              <p>
                Are you sure you want to delete this habit? It will delete all
                you progress and associated goals.
              </p>
              <Button
                onClick={() => {
                  void (async () => {
                    await handleDeleteHabit(deletingHabit);
                  })();
                }}
              >
                Yes
              </Button>
              <Button onClick={handleDeleteModalClose}>No</Button>
            </Modal>
          )}
        </ul>
      </SectionContainer>
    );
};

export default HabitsList;
