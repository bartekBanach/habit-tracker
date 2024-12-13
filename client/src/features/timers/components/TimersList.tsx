import { useSelector } from 'react-redux';
import Timer from './Timer';
import { selectCurrentUser } from '../../auth/authSlice';
import Modal from '../../../components/Modal/Modal';
import { TimerForm } from './TimerForm';
import IconButton from '../../../components/IconButton/IconButton';
import { IoAdd } from 'react-icons/io5';
import { useState } from 'react';
import { useCreateTimerMutation } from '../timersApiSlice';
import { useUpdateMyUserPreferencesMutation } from '../../users/usersApiSlice';
import { useGetUserTimersQuery } from '../timersApiSlice';
import { RiTimerFill } from 'react-icons/ri';
import SectionContainer from '../../../components/SectionContainer/SectionContainer';
import { FiEdit2 } from 'react-icons/fi';
import { IoMdCheckmark } from 'react-icons/io';
import useHandleErrors from '../../../hooks/useHandleErrors';
import { useEffect } from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

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
      let result = [];

      if (timersOrder) {
        for (const timerId of timersOrder) {
          const timer = timers.find((t) => t._id === timerId);
          if (timer) result.push(timer);
        }
        const unorderedTimers = timers.filter(
          (t) => !timersOrder.includes(t._id)
        );
        result = [...result, ...unorderedTimers];
      } else {
        result = timers;
      }

      setSortedTimers(result);
    }
  }, [timers, timersOrder]);

  useEffect(() => {
    if (timers?.length === 0) setIsEditingList(false);
  }, [timers]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = sortedTimers.findIndex((item) => item._id === active.id);
    const newIndex = sortedTimers.findIndex((item) => item._id === over.id);

    const updatedTimers = arrayMove(sortedTimers, oldIndex, newIndex);
    setSortedTimers(updatedTimers); // Temporary UI update

    try {
      if (!userId) throw new Error('User unauthenticated.');

      await updateUserPreferences({
        ...userPreferences,
        timersOrder: updatedTimers.map((t) => t._id),
      }).unwrap();
    } catch (error) {
      handleErrors(error);
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
        {sortedTimers.length === 0 ? (
          <div className="flex flex-col items-center">
            <RiTimerFill className="text-5xl text-gray-500" />
            <p className="text-2xl font-semibold">{`You don't have any timers.`}</p>
            <p className="text-lg text-gray-400">{`Press '+' to add a new timer.`}</p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(e) => {
              void (async () => {
                await handleDragEnd(e);
              })();
            }}
          >
            <SortableContext
              items={sortedTimers.map((timer) => timer._id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid gap-7 grid-cols-1 sm:grid-cols-2">
                {sortedTimers.map((timer) => (
                  <Timer
                    key={timer._id}
                    timer={timer}
                    isEditing={isEditingList}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
        <Modal
          isOpened={modalOpened}
          header="New Timer"
          onClose={() => setModalOpened(false)}
        >
          <TimerForm onSubmit={handleNewTimer} isLoading={isCreating} />
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
      <div className="flex-grow flex flex-col p-10 items-center">{content}</div>
    </SectionContainer>
  );
};

export default TimersList;
