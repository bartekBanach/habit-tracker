import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import Spinner from '../Spinner/Spinner';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  intent?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  spinnerInside?: boolean;
};

const Button = ({
  className,
  intent,
  disabled,
  loading,
  spinnerInside = true,
  children,
  ...props
}: ButtonProps) => {
  let content;

  if (spinnerInside) {
    content = (
      <button
        className={cn(buttonVariants({ intent, disabled }), className)}
        disabled={disabled === true || loading}
        {...props}
      >
        <div className="flex gap-3 items-center justify-center">
          {children}
          {loading && <Spinner size="small" color="secondary" />}
        </div>
      </button>
    );
  } else {
    content = (
      <div className="relative">
        <button
          className={cn(buttonVariants({ intent, disabled }), className)}
          disabled={disabled === true || loading}
          {...props}
        >
          {children}
        </button>
        {loading && (
          <Spinner
            size="small"
            color="secondary"
            className="absolute left-full top-3 mx-2"
          />
        )}
      </div>
    );
  }
  return content;
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
