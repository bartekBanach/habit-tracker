import { useRef } from 'react';
interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  id: string;
  errorText: string;
  error: boolean;
  placeholder: string;
  label: string;
  type: string;
  required: boolean;
}
const Input = ({
  id,
  error = false,
  errorText = '',
  placeholder = '',
  label = '',
  type = 'text',
  required = false,

  ...rest
}: InputProps) => {
  const inputRef = useRef();
  return (
    <div>
      <div
        className={`w-1/4 mx-auto border transition duration-150 ease-in-out ${
          error
            ? 'focus-within:border-red border-red'
            : 'focus-within:border-primary border-gray-gray4'
        }`}
        onClick={() => inputRef.current.focus()}
      >
        <label
          htmlFor={id}
          className={`text-xs text-primary font-light placeholder-gray-gray4 px-2 pt-1.5`}
        >
          {label} {required && <span className="text-red">*</span>}{' '}
        </label>
        <input
          ref={inputRef}
          type={type}
          className={`w-full px-2 pb-1.5 text-black outline-none text-base font-light rounded-md`}
          id={id}
          placeholder={placeholder}
          {...rest}
        />
      </div>
      {error && <p className="text-xs pl-2    text-red mb-4">{errorText}</p>}
    </div>
  );
};

export default Input;
