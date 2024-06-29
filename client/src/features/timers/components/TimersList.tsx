import { useSelector } from 'react-redux';
import Timer from './Timer';
import { useGetTimersByUserQuery } from '../timersApiSlice';
import { selectCurrentUser } from '../../auth/authSlice';
import Modal from '../../../components/Modal/Modal';
import { TimerForm } from './TimerForm';
import IconButton from '../../../components/IconButton/IconButton';
import { IoAdd } from 'react-icons/io5';
import { useState } from 'react';
import { useCreateTimerMutation } from '../timersApiSlice';

const TimersList = () => {
  const { _id: userId } = useSelector(selectCurrentUser);
  console.log('userid', userId);
  const { data: timers, isLoading, error } = useGetTimersByUserQuery(userId);
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
  console.log('timers', timers);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading timers.</div>;
  }

  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="flex flex-row gap-3 items-center">
        <h2 className="text-xl font-semibold">Timers list</h2>
        <IconButton onClick={() => setModalOpened(true)}>
          <IoAdd />
        </IconButton>
      </div>

      <Modal
        isOpened={modalOpened}
        header="New Timer"
        onClose={() => setModalOpened(false)}
      >
        <TimerForm onSubmit={handleNewTimer} />
      </Modal>

      {!timers || timers.length === 0 ? (
        <div>No timers found.</div>
      ) : (
        <div className="grid grid-cols-2 gap-7">
          {timers.map((timer) => (
            <Timer key={timer._id} timer={timer} />
          ))}
          <div className="border shadow-md p-5">Add new timer placeholder</div>
        </div>
      )}
    </div>
  );
};

export default TimersList;
