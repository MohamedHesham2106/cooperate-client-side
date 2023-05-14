import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import Link from 'next/link';
import { FC, useEffect, useRef, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { BsFillCameraVideoFill } from 'react-icons/bs';
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
  // Initialize state variables
  const [message, setMessage] = useState<string>('');
  const { socket } = useSocket();
  const [showPicker, setShowPicker] = useState(false);
  const chatBubbleRef = useRef<HTMLDivElement>(null);
  const conversationId = conversation._id;
  const senderId = sender._id;
  const prevChatLengthRef = useRef(0);

  // Fetch receiver data using useSWR
  const { data: receiver } = useSWR(`/api/user/${receiverId}`, fetcher);

  // Scroll to the bottom of the chat bubble when a new message is received
  const scrollToBottom = () => {
    if (chatBubbleRef.current !== null) {
      chatBubbleRef.current.scrollTo({
        top: chatBubbleRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  // Event handler for input field change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMessage(value);
  };

  // Event handler for "Enter" key press in the input field
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (message === '') {
        return;
      }

      try {
        socket.emit('sendMessage', { conversationId, message, senderId });
        clearChange();
        scrollToBottom();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Event handler for sending a message
  const handleSendMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (message === '') {
      return;
    }

    try {
      socket.emit('sendMessage', { conversationId, message, senderId });
      clearChange();
    } catch (error) {
      console.error(error);
    } finally {
      scrollToBottom();
    }
  };

  // Function to clear the input field
  const clearChange = () => {
    setMessage('');
  };

  // Add a useEffect hook to scroll to the bottom when chats change
  useEffect(() => {
    if (chatBubbleRef.current !== null) {
      // Check if new messages are added to the chat
      const isNewMessageAdded = chats.length > prevChatLengthRef.current;
      // Update the previous chat length
      prevChatLengthRef.current = chats.length;

      // Scroll to the bottom if a new message is added
      if (isNewMessageAdded) {
        scrollToBottom();
      }
    }
  }, [chats.length]);

  return (
    <div className='flex flex-col  justify-between border border-t-0 lg:border-t dark:border-gray-800  dark:bg-gray-700'>
      <div className='relative '>
        <div className='w-full bg-white dark:bg-gray-800 shadow-sm p-5 flex items-center justify-end'>
          <Link href={`/call/~${conversationId}`}>
            <BsFillCameraVideoFill
              size={20}
              className='hover:text-blue-500 cursor-pointer'
            />
          </Link>
        </div>
        <div
          className='overflow-y-auto h-[70vh] p-2 grid grid-cols-12 gap-y-1 '
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
      <section className='flex  z-[2] items-center justify-between gap-2 w-full p-3 border-t border-gray-300 dark:border-gray-800  dark:bg-gray-800'>
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
