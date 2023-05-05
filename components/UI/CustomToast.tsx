import Image from 'next/image';
import React from 'react';
import { toast } from 'react-hot-toast';
interface IProps {
  notification: INotification;
  t: any;
}
const CustomToast: React.FC<IProps> = ({ notification, t }) => {
  return (
    <div
      id='toast-notification'
      className='p-4 text-gray-900 border  bg-white dark:bg-gray-600 rounded-lg shadow-lg dark:border-none md:w-3/12 w-full'
      role='alert'
    >
      <div className='flex items-center mb-3'>
        <span className='mb-1 text-sm font-bold text-gray-900 dark:text-white '>
          New notification
        </span>
        <button
          onClick={() => toast.dismiss(t.id)}
          type='button'
          className='ml-auto -mx-1.5 -my-1.5 bg-white dark:bg-gray-600 dark:text-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 '
        >
          <span className='sr-only'>Close</span>
          <svg
            aria-hidden='true'
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
      </div>
      <div className='flex items-center gap-2'>
        <div className='relative '>
          <Image
            width={50}
            height={50}
            className='w-[50px] h-[50px] object-cover rounded-full shadow '
            src={
              notification.user.imageUrl
                ? notification.user.imageUrl
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            }
            alt={
              notification.user.first_name
                ? notification.user.first_name
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            }
          />
          <span className='absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full'>
            <svg
              aria-hidden='true'
              className='w-4 h-4 text-white'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z'
                clipRule='evenodd'
              ></path>
            </svg>
            <span className='sr-only'>Message icon</span>
          </span>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='text-sm font-normal'>
            <div className='font-bold text-gray-900 dark:text-blue-500 '>
              {notification.user.first_name} {notification.user.last_name}
            </div>
            <div className='text-sm font-normal dark:text-white'>
              {notification.feedback}
            </div>
            <span className='text-xs font-medium text-blue-500 '>
              {new Date(notification.createdAt).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomToast;
