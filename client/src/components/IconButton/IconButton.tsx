import { ReactNode } from 'react';
interface IconButtonProps {
  onClick?: () => void;
  children: ReactNode;
}

const IconButton = ({ onClick, children }: IconButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center px-2 py-2 rounded-md shadow-md space-x-2 text-gray-500 bg-white hover:bg-gray-200"
    >
      {children}
    </button>
  );
};

export default IconButton;
