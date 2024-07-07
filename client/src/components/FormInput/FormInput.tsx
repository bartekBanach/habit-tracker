interface FormInputProps {}

const FormInput = (props: FormInputProps) => {
  const { label, onChange, id, errorMessage, ...inputProps } = props;

  return (
    <div className="flex flex-col gap-3 w-6/12">
      <label>{label}</label>
      <input
        className={`border border-black p-2 rounded-md peer`}
        {...inputProps}
        onChange={onChange}
      />
      <span
        className={`text-red-500 hidden peer-[&:not(:placeholder-shown):not(:focus):invalid]:block`}
      >
        {errorMessage}
      </span>
    </div>
  );
};

export default FormInput;