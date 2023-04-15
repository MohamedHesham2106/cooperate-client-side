import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';

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
  const feedbackParts = notify.feedback.split(
    `${notify.user.first_name} ${notify.user.last_name}`
  );
  const messageDisplayed = (
    <Fragment>
      {feedbackParts.map((part, index) => {
        if (part) {
          if (part.toLowerCase().includes('for')) {
            const [beforeFor, afterFor] = part.toLowerCase().split('for');
            return (
              <span key={index}>
                <span className='font-normal'>{beforeFor}</span>
                <span className='font-normal '>for</span>
                <span className='font-bold text-blue-500 capitalize'>
                  {afterFor}
                </span>
              </span>
            );
          } else {
            return <span key={index}>{part}</span>;
          }
        } else {
          return (
            <span key={index} className='font-bold text-blue-500'>
              {notify.user.first_name} {notify.user.last_name}
            </span>
          );
        }
      })}
    </Fragment>
  );
  return (
    <Link
      href={`${notify.destination}`}
      onClick={handleMarkAsRead}
      className={`flex items-center px-4 py-3 hover:bg-gray-200 ${
        underline && 'border-b '
      }  ${!notify.read ? 'bg-gray-100 ' : 'bg-white hover:bg-gray-50'}`}
      key={notify._id}
    >
      <p className='text-gray-600 text-sm mx-2 flex flex-col gap-2'>
        <span className='font-bold'>
          {notify.user.first_name} {notify.user.last_name}
        </span>{' '}
        <span>{messageDisplayed}</span>
        <time className='font-bold'>{date}</time>
      </p>
    </Link>
  );
};

export default Notify;
