import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

type SpinnerProps = VariantProps<typeof spinnerVariants> &
  React.HTMLAttributes<HTMLDivElement>;

const Spinner = ({ className, size, color, ...props }: SpinnerProps) => {
  return (
    <div
      className={cn(spinnerVariants({ size, color }), className)}
      {...props}
    />
  );
};

const spinnerVariants = cva('border-4 border-solid rounded-full animate-spin', {
  variants: {
    size: {
      small: 'w-4 h-4',
      medium: 'w-7 h-7',
      large: 'w-12 h-12',
    },
    color: {
      primary: 'border-gray-300 border-t-blue-500',
      secondary: 'border-gray-300 border-t-gray-500',
    },
  },
  defaultVariants: {
    size: 'medium',
    color: 'primary',
  },
});

export default Spinner;
