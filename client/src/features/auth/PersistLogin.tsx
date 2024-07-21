import { useRefreshTokenMutation } from './authApiSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';

const PersistLogin = () => {
  const [refresh, { isUninitialized, isLoading, isError, isSuccess }] =
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
  if (isLoading) content = <p>Loading...</p>;
  else if (isError) content = <p>Please login again</p>;
  else if (isSuccess && trueSuccess) content = <Outlet />;
  else if (token && isUninitialized) content = <Outlet />;

  return content;
};

export default PersistLogin;
