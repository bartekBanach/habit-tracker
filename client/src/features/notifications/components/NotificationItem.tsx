import { ReactNode } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FaExclamation } from 'react-icons/fa';
import { FaInfoCircle } from 'react-icons/fa';
import { cn } from '../../../utils/cn';
import { IoMdClose } from 'react-icons/io';
import IconButton from '../../../components/IconButton/IconButton';
import { useAppDispatch } from '../../../app/hooks';
import { dismissNotification } from '../notifications.slice';
import { motion } from 'framer-motion';
import { ImWarning } from 'react-icons/im';
import { useIsPresent } from 'framer-motion';
import useTimeoutFn from '../../../hooks/useTimeoutFn';

export type NotificationTypes = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  /**
   * The notification id.
   */
  id: string;

  /**
   * The message of the notification
   */
  message: string;

  /**
   * An optional dismiss duration time
   *
   * @default 6000
   */
  autoHideDuration?: number;

  /**
   * The type of notification to show.
   */
  type?: NotificationTypes;

  /**
   * Optional callback function to run side effects after the notification has closed.
   */
  onClose?: () => void;

  /**
   * Optionally add an action to the notification through a ReactNode
   */
  action?: ReactNode;
}

const notificationIcons: Record<
  NonNullable<Notification['type']>,
  ReactNode
> = {
  success: <FaCheckCircle />,
  error: <FaExclamation />,
  info: <FaInfoCircle />,
  warning: <ImWarning />,
};
const notificationHeaders = {
  success: 'Success!',
  error: 'Error!',
  info: 'Info',
  warning: 'Warning!',
};

const notificationStyleVariants = {
  success: '',
  error: '',
  info: '',
  warning: '',
};

interface NotificationItemProps {
  notification: Notification;
}
const NotificationItem = ({ notification }: NotificationItemProps) => {
  const {
    id,
    autoHideDuration,
    message,
    onClose,
    type = 'info',
  } = notification;
  const dispatch = useAppDispatch();
  const isPresent = useIsPresent();

  const [, cancel, reset] = useTimeoutFn(
    () => handleDismiss(),
    autoHideDuration ?? 2000
  );

  const handleMouseEnter = () => cancel();
  const handleMouseLeave = () => reset();

  const handleDismiss = () => {
    if (isPresent) {
      dispatch(dismissNotification(id));
    }
  };
  return (
    <motion.li
      className={cn(
        'w-full bg-white shadow-md rounded-md px-5 py-6 flex justify-between items-center',
        notificationStyleVariants[type]
      )}
      layout
      initial={{ y: 500, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, y: { duration: 0.3 } }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-center gap-5">
        <div className="text-l">{notificationIcons[type]}</div>
        <p>{message}</p>
      </div>
      <IconButton
        background={'transparent'}
        size="noPadding"
        iconSize="extraLarge"
        onClick={handleDismiss}
      >
        <IoMdClose />
      </IconButton>
    </motion.li>
  );
};

export default NotificationItem;
