import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import Spinner from '../../../components/Spinner/Spinner';
import Timer from './Timer';
import { DragEndEvent } from '@dnd-kit/core';
import { RiTimerFill } from 'react-icons/ri';
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

interface TimersListContentProps {
  sortedTimers: Timer[];
  isLoading: boolean;
  isError: boolean;
  isEditingList: boolean;
  onUpdateOrder: (updatedTimers: Timer[]) => void;
}

const TimersListContent: React.FC<TimersListContentProps> = ({
  sortedTimers,
  isLoading,
  isError,
  isEditingList,
  onUpdateOrder,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sortedTimers.findIndex((item) => item._id === active.id);
    const newIndex = sortedTimers.findIndex((item) => item._id === over.id);
    const updatedTimers = arrayMove(sortedTimers, oldIndex, newIndex);
    onUpdateOrder(updatedTimers);
  };

  if (isLoading) return <Spinner size="large" />;
  if (isError)
    return (
      <p className="text-xl text-gray-400 text-center">{`Couldn't load timers due to network error.`}</p>
    );

  return (
    <>
      {sortedTimers.length === 0 ? (
        <div className="flex flex-col items-center">
          <RiTimerFill className="text-5xl text-gray-500" />
          <p className="text-2xl font-semibold">{`You don't have any timers.`}</p>
          <p className="text-lg text-gray-400">{`Press '+' to add a new timer.`}</p>
        </div>
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
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
    </>
  );
};

export default TimersListContent;
