import { ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

interface IconButtonProps extends VariantProps<typeof iconButtonVariants> {
  onClick?: () => void;
  children: ReactNode;
  iconColor?: string;
}

const iconButtonVariants = cva(
  'flex items-center justify-center rounded-md space-x-2',
  {
    variants: {
      background: {
        default: 'bg-white hover:bg-gray-200 shadow-md',
        transparent: 'bg-opacity-0 shadow-none',
      },
      size: {
        noPadding: 'p-0 text-m',
        small: 'p-2 text-s',
        medium: 'p-4 text-m',
        large: 'p-6 text-l',
      },
    },
    defaultVariants: {
      background: 'default',
      size: 'small',
    },
  }
);

const IconButton = ({
  onClick,
  children,
  iconColor = 'text-gray-500',
  background,
  size,
}: IconButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${iconButtonVariants({ background, size })} ${iconColor}`}
    >
      {children}
    </button>
  );
};

export default IconButton;
