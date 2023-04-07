import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { FC, useEffect, useRef, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { FaRegSmile } from 'react-icons/fa';
import useSWR from 'swr';

import ChatBubbles from './ChatBubbles';
import { useSocket } from '../../context/SocketContext';
import { fetcher } from '../../utils/axios';

interface IProps {
  sender: IUser;
  conversation: IConversation;
  chats: IChat[];
  receiverId?: string;
}

const Chat: FC<IProps> = ({ sender, conversation, chats, receiverId }) => {
  const [message, setMessage] = useState<string>('');

  const { socket } = useSocket();
  const [showPicker, setShowPicker] = useState(false);
  const chatBubbleRef = useRef<HTMLDivElement>(null);
  const conversationId = conversation._id;
  const senderId = sender._id;

  const { data: receiver } = useSWR(`/api/user/${receiverId}`, fetcher);

  useEffect(() => {
    if (chatBubbleRef.current !== null) {
      chatBubbleRef.current.scrollTop = chatBubbleRef.current.scrollHeight;
    }
  }, [chats]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMessage(value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (message === '') {
        return;
      }

      try {
        socket?.emit('sendMessage', { conversationId, message, senderId });
        clearChange();
        chatBubbleRef.current?.scrollTo(0, chatBubbleRef.current?.scrollHeight);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSendMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (message === '') {
      return;
    }

    try {
      socket?.emit('sendMessage', { conversationId, message, senderId });
      clearChange();
      chatBubbleRef.current?.scrollTo(0, chatBubbleRef.current?.scrollHeight);
    } catch (error) {
      console.error(error);
    }
  };
  const clearChange = () => {
    setMessage('');
  };

  return (
    <div className='  flex flex-col  justify-between border border-t-0 lg:border-t '>
      <div className='h-[70vh]  relative '>
        <div
          className='overflow-y-auto h-full p-2 grid grid-cols-12 gap-y-1 '
          ref={chatBubbleRef}
        >
          {sender &&
            receiver &&
            chats.map((message) => {
              const isSender = message.sender_id === senderId;
              const { first_name, last_name, imageUrl } = isSender
                ? sender
                : receiver.user;
              const name = `${first_name?.charAt(0)}${last_name?.charAt(0)}`;

              return (
                <ChatBubbles
                  key={message._id}
                  message={message.message}
                  name={name}
                  imageUrl={imageUrl}
                  isOwn={isSender}
                  createdAt={message.createdAt}
                />
              );
            })}
        </div>
        {showPicker && (
          <div className='absolute bottom-0 left-0'>
            <Picker
              data={data}
              onEmojiSelect={(emoji: any) => setMessage(message + emoji.native)}
              previewPosition='none'
              exceptEmojis={['rainbow-flag', 'rainbow']}
            />
          </div>
        )}
      </div>
      <section className='flex items-center justify-between gap-2 w-full p-3 border-t border-gray-300'>
        <button onClick={() => setShowPicker(!showPicker)}>
          <FaRegSmile />
        </button>
        <input
          value={message}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          placeholder='Message'
          className='block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700'
          name='message'
        />

        <button
          onClick={handleSendMessage}
          className='hover:bg-blue-400 py-2 px-4 rounded-md'
        >
          <AiOutlineSend />
        </button>
      </section>
    </div>
  );
};

export default Chat;
