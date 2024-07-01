import { useDispatch } from 'react-redux';
import { addNotification } from '../features/notifications/notifications.slice';
import getErrors from '../utils/getErrors';

const useHandleErrors = () => {
  const dispatch = useDispatch();

  const handleErrors = (error: unknown) => {
    const errors = getErrors(error);
    errors.forEach((err: BackendError) => {
      dispatch(
        addNotification({
          type: 'error',
          message: err.message,
        })
      );
    });
  };

  return handleErrors;
};

export default useHandleErrors;
