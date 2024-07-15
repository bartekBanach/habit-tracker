import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useRegisterMutation } from '../../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../features/notifications/notifications.slice';
import FormInput from '../../components/FormInput/FormInput';
import useHandleErrors from '../../hooks/useHandleErrors';

interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [register] = useRegisterMutation();
  const handleErrors = useHandleErrors();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputs = [
    {
      id: 1,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      label: 'Email',
      errorMessage: 'Email address must be valid!',
      required: true,
    },
    {
      id: 2,
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      label: 'Username',
      errorMessage: 'Username must be valid!',
      required: true,
    },
    {
      id: 3,
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
      id: 4,
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
    console.log(name, ':', value);
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
    <form
      onSubmit={(e) => {
        void (async () => {
          await handleSubmit(e);
        })();
      }}
      className="flex flex-col gap-5 rounded-md shadow-md items-center p-4 w-4/12 mx-auto"
    >
      <h2 className="text-3xl font-semibold">Register</h2>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={formData[input.name]}
          onChange={handleChange}
        />
      ))}

      <Button type="submit">Register</Button>
    </form>
  );
};

export default Register;
