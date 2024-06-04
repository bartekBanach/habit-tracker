import { useNotifications } from '../notifications.slice';
import NotificationList from './NotificationList';
import NotificationItem from './NotificationItem';

const Notifications = () => {
  const notifications = useNotifications();
  return (
    <NotificationList>
      {notifications.map((item) => (
        <NotificationItem key={item.id} notification={item} />
      ))}
    </NotificationList>
  );
};

export default Notifications;
