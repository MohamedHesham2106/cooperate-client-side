import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FiCopy } from 'react-icons/fi';

import Button from '../UI/Button';
import axiosInstance from '../../utils/axios';
interface IProps {
  message: IAdminMessage;
}

const SingleMessageAccordion: React.FC<IProps> = ({ message }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false); // Update state to a single boolean value
  const handleCheckboxChange = () => {
    // Remove index parameter
    setIsChecked(!isChecked); // Toggle boolean value directly
  };
  const handleMarkAsRead = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.put(`/api/message/${message._id}`);
      if (response) {
        toast.success('Message has been marked as read');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong.');
    }
  };
  const getBackgroundColor = (messageStatus: string) => {
    if (isChecked && messageStatus === 'unread') {
      return 'bg-blue-600 text-white hover:bg-blue-600';
    } else if (messageStatus === 'unread') {
      return 'bg-blue-500 text-white hover:bg-blue-600';
    } else if (isChecked && messageStatus === 'read') {
      return 'bg-gray-700 text-white hover:bg-gray-700';
    } else {
      return 'bg-gray-700 text-white hover:bg-gray-800';
    }
  };

  return (
    <div key={message._id} className='w-full rounded-b-sm '>
      <input
        type='checkbox'
        name={`panel-${message._id}`}
        id={`panel-${message._id}`}
        className='hidden'
        onChange={handleCheckboxChange}
      />
      <div
        className={`relative grid grid-cols-[11fr_0.2fr] gap-2 items-center text-lg ${getBackgroundColor(
          message.status
        )}  shadow border-b rounded-b-sm dark:border-gray-600`}
      >
        <label
          htmlFor={`panel-${message._id}`}
          className='cursor-pointer bg-transparent p-4 flex items-center gap-2'
        >
          {message.sender_id.email}
        </label>
        <div className='p-4'>
          <FiCopy
            title='Copy Email'
            onClick={(event) => {
              event.stopPropagation();
              navigator.clipboard.writeText(message.sender_id.email as string);
              toast.success('Email Copied.');
            }}
            className='cursor-pointer p-2 rounded-xl'
            size={35}
          />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isChecked && (
          <motion.article
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            }}
            exit={{ opacity: 0 }}
            className={`overflow-hidden bg-gray-100 p-4   flex flex-col gap-2 dark:text-black `}
          >
            <p className='text-lg'>
              <span className='font-bold'>Subject: </span>
              {message.subject}
            </p>
            <p>
              <span className='font-bold'>User's Name: </span>
              {message.sender_id.first_name} {message.sender_id.last_name}
            </p>
            <p
              className='whitespace-pre-wrap capitalize text-sm'
              id={`panel-${message._id}`}
            >
              {message.message}
            </p>
            <time className=' flex gap-1 items-center'>
              <span className='font-bold'>Received:</span>
              {new Date(message.createdAt).toLocaleString('en-GB', {
                dateStyle: 'long',
                timeStyle: 'short',
              })}
            </time>

            {message.status === 'unread' && (
              <div className='flex items-center justify-end'>
                <Button
                  onClick={handleMarkAsRead}
                  value={message._id}
                  className='rounded relative w-[150px] inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-blue-600 active:shadow-none shadow-lg bg-gradient-to-tr from-blue-600 to-blue-500 border-blue-700 text-white'
                >
                  <span className='absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-full group-hover:h-32 opacity-10'></span>
                  <span className='relative'>Done</span>
                </Button>
              </div>
            )}
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SingleMessageAccordion;
