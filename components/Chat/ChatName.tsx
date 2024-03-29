import Image from 'next/image';
import { FC, useEffect, useState } from 'react';

import { formatDateForChat } from '../../utils/date';

interface IProps {
  user: IUser;
  onClick: (id: string | undefined) => void;
  latestMessage?: IChat;
}

const ChatName: FC<IProps> = ({ user, onClick, latestMessage }) => {
  // Initialize state variables
  const [lastMessage, setLastMessage] = useState<string>('');
  const [date, setDate] = useState<string | undefined>();

  // Update the last message when the latestMessage changes
  useEffect(() => {
    if (latestMessage?.message) {
      setLastMessage(latestMessage?.message);
    }
  }, [latestMessage, latestMessage?.message]);

  // Handle click event
  const handleClick = () => {
    onClick(user._id);
  };

  // Update the date when the latestMessage's createdAt changes
  useEffect(() => {
    if (latestMessage?.createdAt) {
      setDate(formatDateForChat(new Date(latestMessage?.createdAt)));
    }
  }, [latestMessage?.createdAt]);

  return (
    <li>
      <div
        onClick={handleClick}
        className='dark:bg-gray-700 dark:border-gray-900 shadow flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none'
      >
        {user?.imageUrl ? (
          <Image
            src={user.imageUrl}
            width={35}
            height={35}
            className='rounded-full w-[35px] h-[35px] object-cover'
            alt={`${user._id}`}
          />
        ) : (
          <div className='flex items-center text-sm justify-center px-2 py-2 bg-orange-200 rounded-full'>
            {user?.first_name?.charAt(0).toUpperCase()}
            {user?.last_name?.charAt(0).toUpperCase()}
          </div>
        )}

        <div className='w-full pb-2'>
          <div className='flex items-center justify-between'>
            <span className='block ml-2 font-semibold capitalize text-gray-600 text-base dark:text-white'>
              {user?.first_name} {user?.last_name}
            </span>
          </div>
          <div className='flex gap-2 ml-2  items-center'>
            <span className='text-sm text-gray-600 dark:text-white'>
              {lastMessage}
            </span>
            <span className=' text-xs pt-1  text-gray-400 dark:text-white'>
              {date}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ChatName;
