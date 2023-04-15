import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';

import { useAuthenticate } from './AuthProvider';
import { useSocket } from './SocketContext';
import CustomToast from '../components/UI/CustomToast';
import { fetcher } from '../utils/axios';
import { isAuthenticated } from '../utils/cookie';

type INotificationContext = {
  notifications: INotification[];
  sendNotification: (
    user: string | undefined,
    target: string | undefined,
    destination: string | undefined,
    feedback: string | undefined
  ) => void;
};

const NotificationContext = createContext<INotificationContext>({
  notifications: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  sendNotification: () => {},
});

const useNotification = () => useContext(NotificationContext);
interface IProps {
  children: React.ReactNode;
}

const NotificationProvider: React.FC<IProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const { socket } = useSocket();
  const { uuid } = useAuthenticate();

  const { data: notify } = useSWR(
    isAuthenticated() ? `/api/notification/${uuid}` : '',
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
  const handleNewData = (newData: INotification[]) => {
    setNotifications(newData);
  };
  useEffect(() => {
    if (notify) {
      handleNewData(notify.notifications);
    }
  }, [notify]);

  const sendNotification = useCallback(
    (
      user: string | undefined,
      target: string | undefined,
      feedback: string | undefined,
      destination: string | undefined
    ): void => {
      socket &&
        socket.emit('new-notification', {
          user,
          target,
          feedback,
          destination,
        });
    },
    [socket]
  );

  const handleNotificationReceived = useCallback(
    (notification: INotification) => {
      toast.custom((t) => <CustomToast notification={notification} t={t} />, {
        duration: 7000, // set duration to Infinity to prevent auto-dismissal
      });
    },
    []
  );
  useEffect(() => {
    if (socket) {
      socket.on('receive-notification', handleNotificationReceived);
    }

    return () => {
      if (socket) {
        socket.off('receive-notification', handleNotificationReceived);
      }
    };
  }, [handleNotificationReceived, socket]);

  const value = useMemo(
    () => ({
      notifications,
      sendNotification,
    }),
    [notifications, sendNotification]
  ) as INotificationContext;
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, useNotification };
