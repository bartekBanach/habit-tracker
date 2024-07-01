import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../../features/auth/authSlice';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../features/notifications/notifications.slice';
import getErrors from '../../utils/getErrors';
import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/Button/Button';
import useHandleErrors from '../../hooks/useHandleErrors';

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const handleErrors = useHandleErrors();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [login, isLoading] = useLoginMutation();
  const dispatch = useDispatch();

  const inputs = [
    {
      id: 1,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      label: 'Email',
      required: true,
    },

    {
      id: 3,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      label: 'Password',
      required: true,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const { accessToken } = (await login({ email, password }).unwrap()) as {
        accessToken: string;
      };

      const decoded = jwtDecode(accessToken);
      const { _id } = decoded.UserInfo;

      dispatch(setCredentials({ token: accessToken, email, _id }));
      setFormData({ email: '', password: '' });
      dispatch(
        addNotification({
          type: 'success',
          message: 'Logged in successfully.',
        })
      );
      navigate('/');
    } catch (error: unknown) {
      handleErrors(error);
      /*const errors = getErrors(error);
      errors.forEach((err: BackendError) => {
        dispatch(
          addNotification({
            type: 'error',
            message: err.message,
          })
        );
      });*/
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-md shadow-md items-center p-4 w-4/12 mx-auto"
    >
      <h2 className="text-3xl font-semibold">Login</h2>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={formData[input.name]}
          onChange={handleChange}
        />
      ))}

      <Button type="submit">Login</Button>
    </form>
  );
};

export default Login;
