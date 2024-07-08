import { useSelector } from 'react-redux';
import { selectHabitsByUser } from '../habits/habitsApiSlice';
import { useGetGoalsByUserQuery } from './goalsApiSlice';
import GoalItem from './GoalItem';
import { useDeleteGoalMutation } from './goalsApiSlice';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import GoalForm from './GoalForm';
import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addNotification } from '../notifications/notifications.slice';
import getErrors from '../../utils/getErrors';
import IconButton from '../../components/IconButton/IconButton';
import { IoAdd } from 'react-icons/io5';
import SectionHeader from '../../components/SectionHeader/SectionHeader';

const GoalsList = () => {
  const habits = useSelector(selectHabitsByUser);
  const [modalOpened, setModalOpened] = useState(false);

  const { data: goals } = useGetGoalsByUserQuery();
  const [deleteGoal] = useDeleteGoalMutation();
  const dispatch = useAppDispatch();

  const habitDictionary = habits?.reduce(
    (acc: Record<string, Habit>, habit) => {
      acc[habit._id] = habit;
      return acc;
    },
    {}
  );

  const goalsWithHabits = goals?.map((goal) => {
    if (!habitDictionary || !habitDictionary[goal.habit])
      return { goal: 'none', habitName: 'None', habitColor: '#' };

    const { name: habitName, color: habitColor } = habitDictionary[goal.habit];
    return { ...goal, habitName, habitColor };
  });

  const handleDelete = async (goalId: string) => {
    try {
      await deleteGoal(goalId).unwrap();

      dispatch(
        addNotification({
          type: 'success',
          message: 'Goal deleted successfully!',
        })
      );
    } catch (error: unknown) {
      const errors = getErrors(error);
      errors.forEach((err: BackendError) => {
        dispatch(
          addNotification({
            type: 'error',
            message: 'Failed to delete goal: ' + err.message,
          })
        );
      });
    }
  };
  const handleRestart = () => {};

  const handleCreate = () => {
    setModalOpened(false);
  };

  return (
    <div className=" border border-gray-300 rounded-md overflow-hidden shadow-md">
      <SectionHeader text="My Goals">
        <IconButton onClick={() => setModalOpened(true)}>
          <IoAdd />
        </IconButton>
      </SectionHeader>
      <div className="flex flex-col gap-5 p-5">
        {goalsWithHabits?.map((goal) => (
          <GoalItem
            key={goal._id}
            goal={goal}
            onDelete={handleDelete}
            onRestart={handleRestart}
          />
        ))}
      </div>

      <Modal
        header="New goal"
        isOpened={modalOpened}
        onClose={() => setModalOpened(false)}
      >
        <GoalForm onSubmit={handleCreate} />
      </Modal>
    </div>
  );
};

export default GoalsList;
