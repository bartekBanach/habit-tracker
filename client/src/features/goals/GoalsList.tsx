import GoalItem from './GoalItem';
import { useDeleteGoalMutation } from './goalsApiSlice';
import Modal from '../../components/Modal/Modal';
import GoalForm from './GoalForm';
import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addNotification } from '../notifications/notifications.slice';
import getErrors from '../../utils/getErrors';
import IconButton from '../../components/IconButton/IconButton';
import { IoAdd } from 'react-icons/io5';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { useGetUserHabitsQuery } from '../habits/habitsApiSlice';
import { useGetUserGoalsQuery } from './goalsApiSlice';
import SectionContainer from '../../components/SectionContainer/SectionContainer';

const GoalsList = () => {
  const { data: habits } = useGetUserHabitsQuery();

  const [modalOpened, setModalOpened] = useState(false);

  const { data: goals } = useGetUserGoalsQuery();
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

  const headerContent = (
    <>
      <IconButton onClick={() => setModalOpened(true)}>
        <IoAdd />
      </IconButton>
    </>
  );
  if (!goals) return;

  return (
    <SectionContainer headerText="My Goals" headerChildren={headerContent}>
      <div className="flex flex-col gap-5 p-5">
        {goals.length === 0 && (
          <p className="text-lg text-gray-400">
            No goals yet. Click {`'+'`} button to add your first goal.
          </p>
        )}
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
    </SectionContainer>
  );
};

export default GoalsList;
