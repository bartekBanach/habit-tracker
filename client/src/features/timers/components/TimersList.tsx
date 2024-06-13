import { useSelector } from 'react-redux';
import Timer from './Timer';
import { useGetTimersByUserQuery } from '../timersApiSlice';
import { selectCurrentUser } from '../../auth/authSlice';
import { TimerForm } from './TimerForm';

const TimersList = () => {
  const { _id: userId } = useSelector(selectCurrentUser);
  const { data: timers, isLoading, error } = useGetTimersByUserQuery(userId);
  console.log('timers', timers);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading timers.</div>;
  }

  if (!timers || timers.length === 0) {
    return <div>No timers found.</div>;
  }

  return (
    <div className="flex flex-col gap-10 items-center">
      <TimerForm />
      <div className="grid grid-cols-2 gap-7">
        {timers.map((timer: Timer) => (
          <Timer key={timer._id} timer={timer} />
        ))}
        <div className="border shadow-md p-5">Add new timer placeholder</div>
      </div>
    </div>
  );
};

export default TimersList;
