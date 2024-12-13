import React from 'react';
import IconButton from '../../../components/IconButton/IconButton';
import { IoAdd } from 'react-icons/io5';
import { FiEdit2 } from 'react-icons/fi';
import { IoMdCheckmark } from 'react-icons/io';

interface TimersListHeaderProps {
  isEditingList: boolean;
  isError: boolean;
  isLoading: boolean;
  timersCount: number;
  onToggleEditing: () => void;
  onOpenModal: () => void;
}

const TimersListHeader: React.FC<TimersListHeaderProps> = ({
  isEditingList,
  isError,
  isLoading,
  timersCount,
  onToggleEditing,
  onOpenModal,
}) => (
  <>
    <IconButton disabled={isError || isLoading} onClick={onOpenModal}>
      <IoAdd />
    </IconButton>
    <IconButton disabled={timersCount === 0} onClick={onToggleEditing}>
      {isEditingList ? <IoMdCheckmark /> : <FiEdit2 />}
    </IconButton>
  </>
);

export default TimersListHeader;
