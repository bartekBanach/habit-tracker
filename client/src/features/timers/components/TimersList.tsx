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
import useHandleErrors from '../../../hooks/useHandleErrors';
import { useEffect } from 'react';
import Spinner from '../../../components/Spinner/Spinner';

const TimersList = () => {
  const { _id: userId } = useSelector(selectCurrentUser) ?? {};

  const { data: timers, isLoading, isError } = useGetUserTimersQuery();

  const [isEditingList, setIsEditingList] = useState(false);

  const [modalOpened, setModalOpened] = useState(false);
  const [createTimer] = useCreateTimerMutation();
  const handleErrors = useHandleErrors();

  useEffect(() => {
    if (timers?.length === 0) setIsEditingList(false);
  }, [timers]);

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

  let content;
  if (isLoading) {
    content = <Spinner size="large"></Spinner>;
  } else if (isError) {
    content = (
      <p className="text-xl text-gray-400 text-center">{`Couldn't load timers due to network error.`}</p>
    );
  } else
    content = (
      <>
        <div>
          {timers?.length === 0 ? (
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
            <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 p-10">
              {timers?.map((timer) => (
                <Timer
                  key={timer._id}
                  timer={timer}
                  isEditing={isEditingList}
                />
              ))}
            </div>
          )}
        </div>
        <Modal
          isOpened={modalOpened}
          header="New Timer"
          onClose={() => setModalOpened(false)}
        >
          <TimerForm onSubmit={handleNewTimer} />
        </Modal>
      </>
    );

  const headerContent = (
    <>
      <IconButton
        disabled={isError || isLoading}
        onClick={() => setModalOpened(true)}
      >
        <IoAdd />
      </IconButton>
      {!isEditingList ? (
        <IconButton
          disabled={timers?.length === 0}
          onClick={() => setIsEditingList((prev) => !prev)}
        >
          <FiEdit2 />
        </IconButton>
      ) : (
        <IconButton onClick={() => setIsEditingList((prev) => !prev)}>
          <IoMdCheckmark />
        </IconButton>
      )}
    </>
  );

  return (
    <SectionContainer headerText="Timers" headerChildren={headerContent}>
      <div className="flex-grow flex flex-col">{content}</div>
    </SectionContainer>
  );
};

export default TimersList;
