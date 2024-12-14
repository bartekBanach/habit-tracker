import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../auth/authSlice';

import { useState, useEffect } from 'react';
import { useGetUserTimersQuery } from '../timersApiSlice';
import { useCreateTimerMutation } from '../timersApiSlice';
import { useUpdateMyUserPreferencesMutation } from '../../users/usersApiSlice';

import useHandleErrors from '../../../hooks/useHandleErrors';
import { getSortedTimers } from '../../../utils/helperFunctions';

import Modal from '../../../components/Modal/Modal';
import SectionContainer from '../../../components/SectionContainer/SectionContainer';

import TimerForm from './TimerForm';
import TimersListHeader from './TimersListHeader';
import TimersListContent from './TimersListContent';

const TimersList = () => {
  const { _id: userId, userPreferences } = useSelector(selectCurrentUser) ?? {};
  const timersOrder = userPreferences ? userPreferences.timersOrder : null;

  const { data: timers, isError, isLoading } = useGetUserTimersQuery();

  const [sortedTimers, setSortedTimers] = useState(timers ?? []);
  const [isEditingList, setIsEditingList] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  const [createTimer, { isLoading: isCreating }] = useCreateTimerMutation();
  const [updateUserPreferences] = useUpdateMyUserPreferencesMutation();

  const handleErrors = useHandleErrors();

  useEffect(() => {
    if (timers) {
      setSortedTimers(getSortedTimers(timers, timersOrder));
    }
  }, [timers, timersOrder]);

  useEffect(() => {
    if (timers?.length === 0) setIsEditingList(false);
  }, [timers]);

  const handleUpdateOrder = async (updatedTimers: Timer[]) => {
    const previousTimers = [...sortedTimers];
    setSortedTimers(updatedTimers);

    try {
      if (!userId) throw new Error('User unauthenticated.');
      await updateUserPreferences({
        ...userPreferences,
        timersOrder: updatedTimers.map((t) => t._id),
      }).unwrap();
    } catch (error) {
      handleErrors(error);
      setSortedTimers(previousTimers);
    }
  };

  const handleNewTimer = async (
    habitId: string,
    color: string,
    duration: Duration
  ) => {
    const newTimer = {
      habit: habitId,
      user: userId,
      color: color,
      duration: duration,
    };

    try {
      if (!userId) {
        throw new Error('User unauthenthicated.');
      }

      await createTimer(newTimer as NewTimer).unwrap();
    } catch (error: unknown) {
      handleErrors(error);
    }

    setModalOpened(false);
  };

  if (!userId) {
    return;
  }

  return (
    <SectionContainer
      headerText="Timers"
      headerChildren={
        <TimersListHeader
          isEditingList={isEditingList}
          isError={isError}
          isLoading={isLoading}
          timersCount={timers?.length ?? 0}
          onToggleEditing={() => setIsEditingList((prev) => !prev)}
          onOpenModal={() => setModalOpened(true)}
        />
      }
    >
      <div className="flex-grow flex flex-col p-10 items-center">
        <TimersListContent
          sortedTimers={sortedTimers}
          isLoading={isLoading}
          isError={isError}
          isEditingList={isEditingList}
          onUpdateOrder={(updatedTimers) => {
            void handleUpdateOrder(updatedTimers);
          }}
        />
      </div>
      <Modal
        isOpened={modalOpened}
        header="New Timer"
        onClose={() => setModalOpened(false)}
      >
        <TimerForm onSubmit={handleNewTimer} isLoading={isCreating} />
      </Modal>
    </SectionContainer>
  );
};

export default TimersList;
