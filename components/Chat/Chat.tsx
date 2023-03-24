import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { FaRegSmile } from 'react-icons/fa';
import useSWR from 'swr';

import ChatBubbles from './ChatBubbles';
import Button from '../UI/Button';
import Form from '../UI/Form';
import Input from '../UI/Input';
import { useSocket } from '../../context/SocketContext';
import axiosInstance, { fetcher } from '../../utils/axios';

interface IProps {
  senderId: string;
  receiverId: string;
  conversation: IConversation;
}

const Chat: FC<IProps> = ({ senderId, receiverId, conversation }) => {
  const [message, setMessage] = useState<string>('');
  const [chat, setChat] = useState<IChat[]>([]);
  const { socket } = useSocket();
  const [showPicker, setShowPicker] = useState(false);
  const chatBubbleRef = useRef<HTMLDivElement>(null);
  const conversationId = conversation._id;

  const fetchMessages = useCallback(async () => {
    const chats = (await axiosInstance.get(`/api/chat/${conversationId}`)).data
      .messages;
    chats && setChat(chats.filter((chat: IChat) => chat));
  }, [conversationId]);

  useEffect(() => {
    if (conversationId) {
      fetchMessages();
      if (socket) {
        socket.emit('joinRoom', { conversationId });
      }
    }
    return () => {
      socket?.emit('leaveRoom', `conversation-${conversationId}`);
    };
  }, [conversationId, fetchMessages, message, socket]);

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (data: IChat) => setChat([...chat, data]));
    }
  }, [socket, chat]);

  const { data: sender } = useSWR(`/api/user/${senderId}`, fetcher);
  const { data: receiver } = useSWR(`/api/user/${receiverId}`, fetcher);

  useEffect(() => {
    if (chatBubbleRef.current !== null) {
      chatBubbleRef.current.scrollTop = chatBubbleRef.current.scrollHeight;
    }
  }, [chat]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMessage(value);
  };
  const clearChange = () => {
    setMessage('');
  };
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      socket?.emit('sendMessage', { conversationId, message, senderId });
      clearChange();
      chatBubbleRef.current?.scrollTo(0, chatBubbleRef.current?.scrollHeight);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='border border-l-0 flex flex-col  justify-between  '>
      <div className='h-[70vh]  relative '>
        <div
          className='overflow-y-auto h-full p-2 grid grid-cols-12 gap-y-1'
          ref={chatBubbleRef}
        >
          {sender &&
            receiver &&
            chat.map((message: IChat) => (
              <ChatBubbles
                key={message._id}
                message={message.message}
                name={
                  message.sender_id === senderId
                    ? `${sender.user?.first_name?.charAt(
                        0
                      )}${sender.user?.last_name?.charAt(0)}`
                    : `${receiver.user?.first_name?.charAt(
                        0
                      )}${receiver.user?.last_name?.charAt(0)}`
                }
                isOwn={message.sender_id === senderId}
                createdAt={message.createdAt}
              />
            ))}
        </div>
        {showPicker && (
          <div className='absolute bottom-0 right-32'>
            <Picker
              data={data}
              onEmojiSelect={(emoji: any) => setMessage(message + emoji.native)}
              previewPosition='none'
              exceptEmojis={['rainbow-flag', 'rainbow']}
            />
          </div>
        )}
      </div>
      <Form
        OnSubmit={submitHandler}
        className='grid grid-cols-[9fr_1fr] gap-3 items-center bg-blue-500 p-3'
      >
        <div className='flex-grow relative'>
          <div className='relative w-full'>
            <Input
              type='text'
              name='message'
              value={message}
              onChange={handleChange}
            />

            <Button
              type='button'
              onClick={() => setShowPicker(!showPicker)}
              className='absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600'
            >
              <FaRegSmile />
            </Button>
          </div>
        </div>

        <Button
          type='submit'
          className='flex items-center justify-center bg-orange-400 shadow hover:bg-orange-500 rounded-lg text-white px-4 py-2 flex-shrink-0'
        >
          <span>Send</span>
          <span className='ml-2'></span>
        </Button>
      </Form>
    </div>
  );
};

export default Chat;
