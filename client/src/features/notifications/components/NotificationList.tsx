import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';
interface NotificationListProps {
  children: ReactNode;
}

const NotificationList = ({ children }: NotificationListProps) => {
  return ReactDOM.createPortal(
    <ul className="fixed bottom-4 right-4 flex flex-col gap-5 min-w-96">
      <AnimatePresence initial={false}>{children}</AnimatePresence>
    </ul>,
    document.body
  );
};

export default NotificationList;
