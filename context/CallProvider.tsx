import { useRouter } from 'next/router';
import { createContext, useCallback, useEffect, useState } from 'react';
import { Toast, toast } from 'react-hot-toast';

import { useSocket } from './SocketContext';
import CallToast from '../components/UI/CallToast';

const CallContext = createContext(null);

type Props = {
  children: JSX.Element;
};
interface ICall {
  conversation_id: string;
  Caller: string;
}

export const CallProvider: React.FC<Props> = ({ children }) => {
  const { socket } = useSocket();
  const [hasShownToast, setHasShownToast] = useState(false);
  const router = useRouter();

  const handleCall = useCallback(
    (data: ICall) => {
      if (
        !hasShownToast &&
        `/call/${router.query.conversationId}` !==
          `/call/~${data.conversation_id}`
      ) {
        toast.custom(
          (t) => (
            <CallToast
              conversation_id={data.conversation_id}
              t={t}
              caller={data.Caller}
            />
          ),
          {
            duration: Infinity,
          }
        );
        setHasShownToast(true);
      }
    },
    [hasShownToast, router.query.conversationId]
  );

  useEffect(() => {
    socket.on('call', handleCall);
    return () => {
      socket.off('call', handleCall);
    };
  }, [handleCall, socket]);

  return <CallContext.Provider value={null}>{children}</CallContext.Provider>;
};
