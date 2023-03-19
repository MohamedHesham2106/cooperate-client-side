import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';

import { getCookie, getPayloadFromToken } from '../utils/cookie';

interface SocketContextValue {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextValue>({ socket: null });
interface SocketProviderProps {
  url: string;
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({
  url,

  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userId, setUserId] = useState<IUser['_id'] | undefined>(
    getPayloadFromToken(getCookie('jwt_refresh'))?.sub
  );
  useEffect(() => {
    const newSocket = io(url);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [url]);
  useEffect(() => {
    const handleConnect = () => {
      console.log('Connected to server');
      if (userId) {
        socket?.emit('userId', { userId, socketId: socket.id });
      }
    };
    const handleDisconnect = () => {
      console.log('Disconnecting from server');
    };
    const handleError = (error: any) => {
      console.log('Socket connection error:', error);
    };
    socket?.on('connect', handleConnect);
    socket?.on('disconnect', handleDisconnect);
    socket?.on('error', handleError);
    return () => {
      socket?.off('connect', handleConnect);
      socket?.off('disconnect', handleDisconnect);
      socket?.off('error', handleError);
    };
  }, [socket, userId]);

  const value: SocketContextValue = useMemo(() => {
    return {
      socket: socket,
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
export const useSocket = (): SocketContextValue => useContext(SocketContext);
