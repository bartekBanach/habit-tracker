import GoalItem from './GoalItem';
import { useDeleteGoalMutation, useUpdateGoalMutation } from '../goalsApiSlice';
import Modal from '../../../components/Modal/Modal';
import GoalForm from './GoalForm';
import { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { addNotification } from '../../notifications/notifications.slice';
import IconButton from '../../../components/IconButton/IconButton';
import { IoAdd } from 'react-icons/io5';
import { useGetUserHabitsQuery } from '../../habits/habitsApiSlice';
import { useGetUserGoalsQuery } from '../goalsApiSlice';
import SectionContainer from '../../../components/SectionContainer/SectionContainer';
import { addMilliseconds, differenceInMilliseconds } from 'date-fns';
import useHandleErrors from '../../../hooks/useHandleErrors';

const GoalsList = () => {
  const { data: habits } = useGetUserHabitsQuery();
  const { data: goals = [] } = useGetUserGoalsQuery();

  const [deleteGoal] = useDeleteGoalMutation();
  const [updateGoal] = useUpdateGoalMutation();
  const dispatch = useAppDispatch();
  const [modalOpened, setModalOpened] = useState(false);
  const handleErrors = useHandleErrors();

  const habitDictionary = habits?.reduce(
    (acc: Record<string, Habit>, habit) => {
      acc[habit._id] = habit;
      return acc;
    },
    {}
  );

  const goalsWithHabits: GoalWithHabit[] = (goals ?? []).flatMap(
    (goal: Goal) => {
      const habit = habitDictionary?.[goal.habit];
      if (habit) {
        const { name: habitName, color: habitColor } = habit;
        return { ...goal, habitName, habitColor };
      } else {
        return [];
      }
    }
  );

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
      handleErrors(error);
    }
  };
  const handleRestart = async (goal: Goal) => {
    const { timeLimit } = goal;

    let newTimeLimit = null;
    if (timeLimit.endDate) {
      const timeLimitDuration = differenceInMilliseconds(
        timeLimit.startDate,
        timeLimit.endDate
      );
      const newStartDate = new Date();
      const newEndDate = addMilliseconds(newStartDate, timeLimitDuration);

      newTimeLimit = { startDate: newStartDate, endDate: newEndDate };
    }

    try {
      await updateGoal({
        ...goal,
        timeAmount: 0,
        timeLimit: newTimeLimit ? newTimeLimit : timeLimit,
      }).unwrap();

      dispatch(
        addNotification({
          type: 'success',
          message: 'Goal restarted successfully!',
        })
      );
    } catch (error: unknown) {
      handleErrors(error);
    }
  };

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

  if (!goals || !habits) return;
  return (
    <SectionContainer headerText="My Goals" headerChildren={headerContent}>
      <div className="flex flex-col gap-5 p-5">
        {goals.length === 0 && (
          <p className="text-lg text-gray-400">
            No goals yet. Click {`'+'`} button to add your first goal.
          </p>
        )}
        {goalsWithHabits?.map((goal: GoalWithHabit) => (
          <GoalItem
            key={goal?._id}
            goal={goal}
            onDelete={handleDelete}
            onRestart={() => {
              void (async () => {
                await handleRestart(goal);
              })();
            }}
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
