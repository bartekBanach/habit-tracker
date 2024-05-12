import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  intent?: 'primary' | 'secondary';
  disabled?: boolean;
};

const Button = ({ className, intent, disabled, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ intent, disabled }), className)}
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
      true: 'opacity-50',
      false: '',
    },
    defaultVariants: {
      intent: 'primary',
      disabled: false,
    },
  },
});
export default Button;
