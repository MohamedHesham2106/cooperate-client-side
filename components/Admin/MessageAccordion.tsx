import React, { useState } from 'react';
import { MdOutlineFilterAlt } from 'react-icons/md';

import SingleMessageAccordion from './SingleMessageAccordion';

interface IProps {
  adminMessages: IAdminMessage[];
}

const MessageAccordion: React.FC<IProps> = ({ adminMessages }) => {
  const [filterOption, setFilterOption] = useState<string>('both');

  return (
    <div className='grid grid-cols-1 w-full  rounded-md border bg-gray-200 dark:bg-gray-700 dark:border-gray-800  shadow-lg'>
      <div className='h-full  bg-gray-700 rounded-sm text-white'>
        <div className=' flex items-center rounded-t-sm overflow-hidden'>
          <div className=' p-5 bg-pink-500  text-white text-xl font-bold mr-3'>
            <MdOutlineFilterAlt size={30} />
          </div>
          <label className='flex  p-2 cursor-pointer'>
            <input
              className='my-auto transform scale-125 accent-pink-500'
              type='radio'
              value='read'
              name='filter'
              onChange={(e) => setFilterOption(e.target.value)}
            />
            <div className='title px-2'>Read</div>
          </label>

          <label className='flex radio p-2 cursor-pointer'>
            <input
              className='my-auto transform scale-125 accent-pink-500'
              type='radio'
              value='unread'
              name='filter'
              onChange={(e) => setFilterOption(e.target.value)}
            />
            <div className='title px-2'>Unread</div>
          </label>

          <label className='flex radio p-2 cursor-pointer'>
            <input
              className='my-auto transform scale-125 accent-pink-500'
              type='radio'
              value='both'
              name='filter'
              checked={filterOption === 'both'}
              onChange={(e) => setFilterOption(e.target.value)}
            />
            <div className='title px-2'>Both</div>
          </label>
        </div>
      </div>

      {adminMessages &&
        adminMessages.length > 0 &&
        adminMessages
          ?.filter((message) => {
            if (filterOption === 'both') {
              return true;
            }
            return message.status === filterOption;
          })
          ?.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          ?.map((message) => (
            <SingleMessageAccordion message={message} key={message._id} />
          ))}
    </div>
  );
};

export default MessageAccordion;
