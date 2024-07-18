import { ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

/*interface IconButtonProps extends VariantProps<typeof iconButtonVariants> {
  onClick?: () => void;
  children: ReactNode;
  iconColor?: string;
}*/

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void;
  children: ReactNode;
  iconColor?: string;
};

const iconButtonVariants = cva(
  'flex items-center justify-center rounded-md space-x-2',
  {
    variants: {
      background: {
        default: 'bg-white hover:bg-gray-200 shadow-md',
        transparent: 'bg-opacity-0 shadow-none',
      },
      iconSize: {
        small: 'text-s',
        medium: 'text-m',
        large: 'text-l',
        extraLarge: 'text-xl',
      },
      size: {
        noPadding: 'p-0 text-m',
        small: 'p-2 text-s',
        medium: 'p-4 text-m',
        large: 'p-6 text-l',
      },
      disabled: {
        true: 'opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      background: 'default',
      size: 'small',
      iconSize: 'medium',
    },
  }
);

const IconButton = ({
  className,
  onClick,
  children,
  iconColor = 'text-gray-500',
  iconSize,
  background,
  size,
  disabled,
  ...props
}: IconButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      //className={`${iconButtonVariants({ background, size, iconSize })} ${iconColor} ${className}`}
      className={cn(
        iconButtonVariants({ background, size, iconSize, disabled }),
        className,
        iconColor
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
