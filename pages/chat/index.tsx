import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';

import Chat from '../../components/Chat/Chat';
import ChatNameList from '../../components/Chat/ChatNameList';
import Container from '../../components/UI/Container';
import axiosInstance from '../../utils/axios';
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
  const [clickedNameId, setClickedNameId] = useState<string>('');
  const handleNameClick = (id: string) => {
    setClickedNameId(id);
  };
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

  return (
    <Container className='h-[85vh] w-full px-5 mx-auto my-24 rounded-l-3xl shadow grid md:grid-cols-[2fr_5fr] grid-cols-[1fr_5fr]'>
      <div className='border-y border-l rounded-l-3xl '>
        {receiverIds && (
          <ChatNameList receiverIds={receiverIds} onClick={handleNameClick} />
        )}
      </div>

      {conversationToRender ? (
        <Chat
          chats={conversationToRender.chat}
          conversation={conversationToRender}
          senderId={senderId}
          receiverId={clickedNameId}
        />
      ) : (
        <div className='text-center text-gray-400 py-5 px-2 border border-l-0'>
          Select a conversation to start chatting
        </div>
      )}
    </Container>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { jwt_refresh, jwt_access } = req.cookies;

  if (!jwt_access) {
    return { redirect: { destination: '/', permanent: false } };
  }

  try {
    const userId = getPayloadFromToken(jwt_refresh).sub;
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
