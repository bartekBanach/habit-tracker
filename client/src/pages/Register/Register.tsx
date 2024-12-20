import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useRegisterMutation } from '../../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../features/notifications/notifications.slice';
import FormInput from '../../components/FormInput/FormInput';
import useHandleErrors from '../../hooks/useHandleErrors';
import Spinner from '../../components/Spinner/Spinner';

interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormInput {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  label: string;
  errorMessage: string;
  pattern?: string;
  required: boolean;
}

const Register = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [register, { isLoading }] = useRegisterMutation();
  const handleErrors = useHandleErrors();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log('loading status', isLoading);

  const inputs = [
    {
      id: '1',
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      label: 'Email',
      errorMessage: 'Email address must be valid!',
      required: true,
    },
    {
      id: '2',
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      label: 'Username',
      errorMessage: 'Username must be valid!',
      required: true,
    },
    {
      id: '3',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      label: 'Password',
      errorMessage:
        'Password should be 8-20 characters, contain at least 1 uppercase letter, 1 number and 1 special character!',
      pattern:
        // prettier-ignore
        '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}',
      required: true,
    },

    {
      id: '4',
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      label: 'Confirm Password',
      errorMessage: 'Passwords must match!',
      pattern: formData.password,
      required: true,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, username, password } = formData;

    try {
      await register({ email, username, password }).unwrap();
      dispatch(
        addNotification({
          type: 'success',
          message: 'User registered successfuly',
        })
      );

      navigate('/login');
    } catch (error: unknown) {
      handleErrors(error);
    } finally {
      setFormData({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <div className="p-10 flex-1 flex flex-col items-center justify-start md:justify-center bg-gray-100">
      <form
        onSubmit={(e) => {
          void (async () => {
            await handleSubmit(e);
          })();
        }}
        className=" flex flex-col gap-5 rounded-md shadow-md items-center p-4 w-full md:w-6/12 lg:w-4/12 mx-auto border"
      >
        <h2 className="text-3xl font-semibold">Register</h2>
        {inputs.map((input: RegisterFormInput) => (
          <FormInput
            key={input.id}
            {...input}
            value={formData[input.name as keyof RegisterFormData]}
            onChange={handleChange}
          />
        ))}
        <div className="relative">
          <Button type="submit">Register</Button>
          {isLoading && (
            <Spinner
              color="secondary"
              className="absolute left-full top-1 mx-3"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;
