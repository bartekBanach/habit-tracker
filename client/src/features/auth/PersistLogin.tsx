import { useRefreshTokenMutation } from './authApiSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { IoIosWarning } from 'react-icons/io';

const PersistLogin = () => {
  const [refresh, { isUninitialized, isLoading, isSuccess, isError }] =
    useRefreshTokenMutation();

  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
        setTrueSuccess(true);
      } catch (error) {
        console.log(error);
      }
    };

    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      if (!token) verifyRefreshToken().catch((error) => console.error(error));
    }

    return () => {
      effectRan.current = true;
    };
    // eslint-disable-next-line
  }, []);

  let content;
  if (isLoading)
    content = (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-md p-10 flex flex-col items-center gap-3 z-50">
        <Spinner size="large" />
        <p className="text-2xl text-gray-400">Loading... </p>
      </div>
    );
  else if (isError)
    content = (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-md p-10 flex flex-col items-center gap-3 z-50">
        <IoIosWarning className="text-5xl text-gray-500" />
        <p className="text-xl text-gray-400">
          Authenthication error. Please try logging in again.{' '}
        </p>
      </div>
    );
  else if (isSuccess && trueSuccess) content = <Outlet />;
  else if (token && isUninitialized) content = <Outlet />;

  return content;
};

export default PersistLogin;
