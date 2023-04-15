import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import axiosInstance from '../../utils/axios';
import { formatDateForChat } from '../../utils/date';
interface IProps {
  notify: INotification;
  underline: boolean;
}
const Notify: React.FC<IProps> = ({ notify, underline }) => {
  const [date, setDate] = useState<string>('');
  useEffect(() => {
    setDate(formatDateForChat(new Date(notify.createdAt)));
  }, [notify.createdAt]);
  const handleMarkAsRead = async () => {
    if (!notify.read) {
      try {
        await axiosInstance.put(`/api/notification/${notify._id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Link
      href={`${notify.destination}`}
      onClick={handleMarkAsRead}
      className={`flex items-center px-4 py-3 ${underline && 'border-b '}  ${
        !notify.read ? 'bg-gray-200 hover:bg-gray-300' : 'hover:bg-gray-50'
      }`}
      key={notify._id}
    >
      <p className='text-gray-600 text-sm mx-2 flex flex-col gap-2'>
        <span className='font-bold'>
          {notify.target.first_name} {notify.target.last_name}
        </span>{' '}
        {notify.feedback}
        <time className='font-bold'>{date}</time>
      </p>
    </Link>
  );
};

export default Notify;
