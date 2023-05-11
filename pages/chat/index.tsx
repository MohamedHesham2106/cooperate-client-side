import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';

import Chat from '../../components/Chat/Chat';
import ChatNameList from '../../components/Chat/ChatNameList';
import Container from '../../components/UI/Container';
import { useSocket } from '../../context/SocketContext';
import axiosInstance, { fetcher } from '../../utils/axios';
import { getPayloadFromToken } from '../../utils/cookie';

interface IProps {
  conversations?: IConversation[];
  senderId: string;
  receiverIds: string[];
}
const Conversation: NextPage<IProps> = ({
  conversations,
  senderId,
  receiverIds,
}) => {
  const [clickedNameId, setClickedNameId] = useState<string | undefined>();
  const [chat, setChat] = useState<IChat[]>([]);
  const { socket } = useSocket();
  const [latestMessages, setLatestMessages] = useState<IChat[] | []>(() => {
    return (
      conversations?.map((conversation: IConversation) => {
        const messages = conversation.chat;
        return messages[messages.length - 1];
      }) ?? []
    );
  });

  const conversationToRender = conversations?.find(
    (conversation: IConversation) => {
      if (
        conversation.Freelancer_id === clickedNameId ||
        conversation.client_id === clickedNameId
      ) {
        return conversation;
      }
    }
  );

  const conversationId = conversationToRender?._id;

  const fetchMessages = useCallback(async () => {
    const chats = (await axiosInstance.get(`/api/chat/${conversationId}`)).data
      .messages;
    chats && setChat(chats.filter((chat: IChat) => chat));
  }, [conversationId]);

  const { data: sender } = useSWR(`/api/user/${senderId}`, fetcher);

  const handleNameClick = (id: string | undefined) => {
    setClickedNameId(id);
  };

  useEffect(() => {
    if (conversationId) {
      fetchMessages();
      socket.emit('joinRoom', { conversationId });
      socket.on('newMessage', (data: IChat) => {
        setChat([...chat, data]);

        // Find the conversation that the new message belongs to
        const conversation = conversations?.find(
          (conv) => conv._id === data.conversation_id
        );

        // If the conversation is found, update the latest message in the conversation
        if (conversation) {
          setLatestMessages((prevLatestMessages) => {
            const newLatestMessages = [...prevLatestMessages];
            const index = newLatestMessages.findIndex(
              (latestMsg) => latestMsg?.conversation_id === data.conversation_id
            );
            if (index >= 0) {
              newLatestMessages[index] = data;
            } else {
              newLatestMessages.push(data);
            }
            return newLatestMessages.filter(Boolean);
          });
        }
      });
    }
    return () => {
      socket.off('leaveRoom');
      socket.off('newMessage');
    };
  }, [chat, conversationId, conversations, fetchMessages, socket]);

  const router = useRouter();
  useEffect(() => {
    const query = router.query.conversation;
    if (query) {
      setClickedNameId(query as string);
    }
  }, [clickedNameId, router.query]);
  return (
    <Fragment>
      <Head>
        <title>
          COO/RATE Chat | Connect with Freelancers and Clients in Real-Time
        </title>
        <meta
          name='description'
          content='COO/RATE Chat is a powerful communication tool that allows freelancers and clients to collaborate in real-time. Stay connected with your team and get your work done faster. Sign up for free today!'
        />
        <meta
          name='keywords'
          content='COO/RATE Chat, freelancing communication tool, real-time chat, collaboration tool, team communication, project management'
        />
      </Head>
      <Container className='container mx-auto my-24 px-5'>
        <div className='min-w-full rounded lg:grid lg:grid-cols-[1fr_3fr]'>
          <div>
            {receiverIds && (
              <ChatNameList
                latestMessages={latestMessages}
                receiverIds={receiverIds}
                onClick={handleNameClick}
              />
            )}
          </div>

          {conversationToRender && sender ? (
            <Chat
              chats={chat}
              conversation={conversationToRender}
              sender={sender.user}
              receiverId={clickedNameId}
            />
          ) : (
            <div className='text-center text-gray-400 py-5 px-2 border dark:border-gray-800'>
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </Container>
    </Fragment>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { jwt_refresh, jwt_access } = req.cookies;

  if (!jwt_access) {
    return { redirect: { destination: '/', permanent: false } };
  }

  try {
    const userId = getPayloadFromToken(jwt_refresh)?.sub;
    const conversations = (
      await axiosInstance.get(`/api/conversation/${userId}`)
    ).data.conversations;

    const senderId = userId;

    const receiverIds: string[] = [];

    conversations.forEach((conversation: IConversation) => {
      if (conversation.Freelancer_id === senderId) {
        receiverIds.push(conversation.client_id);
      } else if (conversation.client_id === senderId) {
        receiverIds.push(conversation.Freelancer_id);
      }
    });

    return {
      props: {
        conversations,
        senderId,
        receiverIds,
      },
    };
  } catch (error) {
    console.log(error);
    return { redirect: { destination: '/404', permanent: false } };
  }
};

export default Conversation;
