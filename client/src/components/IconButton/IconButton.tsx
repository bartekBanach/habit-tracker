import { ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void;
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'transparent';
  size?: 'noPadding' | 'small' | 'medium' | 'large';
};

const iconButtonVariants = cva(
  'flex items-center justify-center rounded-md space-x-2',
  {
    variants: {
      color: {
        primary: 'bg-blue-500 hover:bg-blue-300 text-white shadow-md',
        secondary:
          'bg-white hover:bg-gray text-black hover:text-gray-400 -200 shadow-md',
        transparent: 'bg-opacity-0 shadow-none',
      },

      size: {
        noPadding: 'p-0 text-m',
        small: 'p-2 text-s',
        medium: 'p-4 text-m',
        large: 'p-4 text-lg',
      },
      disabled: {
        true: 'opacity-50 text-gray-400',
        false: '',
      },
    },
    defaultVariants: {
      color: 'secondary',
      size: 'small',
      disabled: false,
    },
  }
);

const IconButton = ({
  className,
  onClick,
  children,
  color,
  size,
  disabled,
  ...props
}: IconButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(iconButtonVariants({ size, color, disabled }), className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
