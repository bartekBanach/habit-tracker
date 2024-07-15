import { useSelector } from 'react-redux';
import Timer from './Timer';
import { selectCurrentUser } from '../../auth/authSlice';
import Modal from '../../../components/Modal/Modal';
import { TimerForm } from './TimerForm';
import IconButton from '../../../components/IconButton/IconButton';
import { IoAdd } from 'react-icons/io5';
import { useState } from 'react';
import { useCreateTimerMutation } from '../timersApiSlice';
import { useGetUserTimersQuery } from '../timersApiSlice';
import { RiTimerFill } from 'react-icons/ri';
import SectionContainer from '../../../components/SectionContainer/SectionContainer';
import { FiEdit2 } from 'react-icons/fi';
import { IoMdCheckmark } from 'react-icons/io';

const TimersList = () => {
  const { _id: userId } = useSelector(selectCurrentUser);
  const { data: timers, isLoading, error } = useGetUserTimersQuery({});

  const [isEditingList, setIsEditingList] = useState(false);

  const [createTimer] = useCreateTimerMutation();
  const [modalOpened, setModalOpened] = useState(false);

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

    await createTimer(newTimer);
    setModalOpened(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading timers.</div>;
  }

  const headerContent = (
    <>
      <IconButton onClick={() => setModalOpened(true)}>
        <IoAdd />
      </IconButton>
      {isEditingList ? (
        <IconButton onClick={() => setIsEditingList((prev) => !prev)}>
          <IoMdCheckmark />
        </IconButton>
      ) : (
        <IconButton onClick={() => setIsEditingList((prev) => !prev)}>
          <FiEdit2 />
        </IconButton>
      )}
    </>
  );

  return (
    <SectionContainer headerText="Timers" headerChildren={headerContent}>
      <div className="items-center border overflow-hidden min-h-max">
        <Modal
          isOpened={modalOpened}
          header="New Timer"
          onClose={() => setModalOpened(false)}
        >
          <TimerForm onSubmit={handleNewTimer} />
        </Modal>

        <div className="p-10">
          {!timers || timers.length === 0 ? (
            <div className="flex flex-col items-center ">
              <RiTimerFill className="text-5xl text-gray-500" />
              <p className="text-2xl font-semibold">
                {`You don't have any timers.`}
              </p>
              <p className="text-lg text-gray-400">
                {`Press '+' to add new timer.`}
              </p>
            </div>
          ) : (
            <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 p-5">
              {timers.map((timer) => (
                <Timer
                  key={timer._id}
                  timer={timer}
                  isEditing={isEditingList}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
};

export default TimersList;
