import Image from 'next/image';
import { FC, useEffect, useState } from 'react';

import { formatDateForChat } from '../../utils/date';

interface IProps {
  user: IUser;
  onClick: (id: string | undefined) => void;
  latestMessage?: IChat;
}

const ChatName: FC<IProps> = ({ user, onClick, latestMessage }) => {
  const handleClick = () => {
    onClick(user._id);
  };
  const [date, setDate] = useState<string | undefined>();
  useEffect(() => {
    if (latestMessage?.createdAt) {
      setDate(formatDateForChat(new Date(latestMessage?.createdAt)));
    }
  }, [latestMessage?.createdAt]);

  return (
    <li>
      <div
        onClick={handleClick}
        className='flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none'
      >
        {user?.imageUrl ? (
          <Image
            src={user.imageUrl}
            width={35}
            height={35}
            className='rounded-full'
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
            <span className='block ml-2 font-semibold capitalize text-gray-600 text-base'>
              {user?.first_name} {user?.last_name}
            </span>
          </div>
          <div className='flex gap-2 ml-2  items-center'>
            <span className='text-sm text-gray-600'>
              {latestMessage?.message}
            </span>
            <span className=' text-xs pt-1  text-gray-400'>{date}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ChatName;
