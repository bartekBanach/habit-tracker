import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  intent?: 'primary' | 'secondary';
  disabled?: boolean;
  isLoading?: boolean;
};

const Button = ({
  className,
  intent,
  disabled,
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ intent, disabled }), className)}
      disabled={disabled === true || isLoading}
      {...props}
    ></button>
  );
};

const buttonVariants = cva('py-2 px-4 shadow-md rounded-md font-semibold', {
  variants: {
    intent: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-secondary text-black',
    },
    disabled: {
      true: 'opacity-30',
      false: '',
    },
  },
  defaultVariants: {
    intent: 'primary',
    disabled: false,
  },
});
export default Button;
