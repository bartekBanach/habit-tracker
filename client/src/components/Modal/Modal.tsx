import { ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';
import IconButton from '../IconButton/IconButton';

interface ModalProps {
  children: ReactNode;
  isOpened: boolean;
  onClose: () => void;
  header: string;
}
const Modal = ({ children, isOpened, onClose, header }: ModalProps) => {
  if (isOpened)
    return (
      <div
        className="inset-0 bg-black fixed bottom-0 z-50 bg-opacity-10 flex justify-center items-center"
        onClick={onClose}
      >
        <div
          className="p-5 bg-white shadow-md text-black text-center rounded-md "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-row justify-between items-center">
            <h3 className="text-xl">{header}</h3>
            <IconButton onClick={onClose}>
              <IoClose />
            </IconButton>
          </div>
          {children}
        </div>
      </div>
    );
};

export default Modal;
